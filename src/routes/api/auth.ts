import { Router } from 'express';
import { db } from '../../database';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';

const router = Router();

router.post('/requestOTP', async (req, res) => {
  try {
    const { msisdn } = req.body;
    if (!msisdn) {
      return res.status(400).json({ error: 'Invalid phone number' });
    }
    const { rows } = await db.query('SELECT id FROM users WHERE msisdn=$1', [
      msisdn,
    ]);
    if (!rows.length) {
      return res.status(400).json({ error: 'Account not found' });
    }
    const user = rows[0];
    const rand = () => Math.round(Math.random() * 9);
    const otp = [rand(), rand(), rand(), rand(), rand(), rand()].join('');
    const {
      rows: result,
    } = await db.query(
      'INSERT INTO verify_otp(user_id, otp_code, expired_at) VALUES ($1, $2, $3) RETURNING id',
      [user.id, otp, moment().add(5, 'minutes').toISOString()]
    );
    console.log('OTP for id: %s is %s', result[0].id, otp);
    res.json({ id: result[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/verifyOTP', async (req, res) => {
  try {
    const { id, otp } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    if (!otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }
    const {
      rows: otpRows,
    } = await db.query(
      'SELECT is_used, user_id, expired_at, otp_code FROM verify_otp WHERE id=$1',
      [id]
    );
    if (!otpRows.length) {
      return res.status(400).json({ error: 'ID does not exist' });
    }
    const result = otpRows[0];
    if (result.is_used) {
      return res.status(400).json({ error: 'Already used' });
    }
    if (moment(result.expired_at).toDate().getTime() < Date.now()) {
      return res.status(400).json({ error: 'Expired' });
    }
    if (result.otp_code !== otp) {
      return res.status(400).json({ error: 'Wrong OTP' });
    }
    await db.query('UPDATE verify_otp SET is_used=$1 WHERE id=$2', [true, id]);
    const { rows: userRows } = await db.query(
      'SELECT * FROM users WHERE id=$1',
      [result.user_id]
    );
    const user = userRows[0];
    const access_token = jwt.sign(user, JWT_SECRET, { expiresIn: '30d' });
    res.json({ access_token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
