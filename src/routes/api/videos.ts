import { Router } from 'express';
import { db } from '../../database';

const router = Router();

router.get('/list', async (req, res) => {
  try {
    const userProfile: any = req['user'];
    const {
      rows: userRows,
    } = await db.query('SELECT role FROM users WHERE id=$1', [userProfile.id]);

    if (!userRows.length) {
      return res.status(400).json({ error: 'User Not Found' });
    }

    const user = userRows[0];

    if (['PAID_USER', 'ADMIN_USER'].includes(user.role)) {
      const { rows: result } = await db.query(
        'SELECT vdo.id, vdo.title, vdo.content, vdo.video_url, vdo.content_type, vdo.views, vdo.updated_at, vdo.created_at, vdo.user_id, u.fullname FROM videos vdo left join users u on vdo.user_id  = u.id'
      );
      res.json(result);
    } else {
      const { rows: result } = await db.query(
        "SELECT vdo.id, vdo.title, vdo.content, vdo.video_url, vdo.content_type, vdo.views, vdo.updated_at, vdo.created_at, vdo.user_id, u.fullname FROM videos vdo left join users u on vdo.user_id  = u.id WHERE content_type='FREE'"
      );
      res.json(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
