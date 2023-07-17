import { type Response, type NextFunction, type Request, type RequestHandler } from 'express';
import { type Secret, verify } from 'jsonwebtoken';
import { type PayloadToken } from '../typings/custom';
import 'dotenv/config';

export const verifyJWT: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const validAuthHeader = authHeader?.startsWith('Bearer ');

  if (!validAuthHeader) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const secret: Secret = process.env.ACCESS_TOKEN_SECRET ?? '';
  const token: string = authHeader?.split(' ')[1] ?? '';

  verify(token, secret, (err, decoded) => {
    if (err != null) return res.status(403).json({ message: 'Forbidden' });
    req.user = decoded as PayloadToken;
    next();
  });
};
