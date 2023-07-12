import { type PayloadToken } from '../custom';

declare global {
  namespace Express {
    export interface Request {
      user?: PayloadToken;
    }
  }
}
