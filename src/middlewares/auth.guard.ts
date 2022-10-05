import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export async function authGuard(
  req: Request & { user: any },
  res: Response,
  next: NextFunction
) {
  let headers = req.headers;
  if (!('authorization' in headers) || !headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  let token = headers.authorization.slice(7);
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
}
