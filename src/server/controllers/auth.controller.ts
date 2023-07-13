import { type Request, type Response, type NextFunction, type RequestHandler } from 'express';
import { loginUserSchema, registerUserSchema } from '../db/schemas/user.schema';
import { type PayloadToken } from '../typings/custom';
import { type Secret, verify } from 'jsonwebtoken';
import { AuthService } from '../services/auth.service';
import { injectable, inject } from 'tsyringe';
import { Config } from '../config/env.config';

@injectable()
export class AuthController extends Config {
  constructor(@inject(AuthService) private readonly service: AuthService) {
    super();
  }

  public register: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).json({ Error: 'Parameters missing' });
      }

      const isRegistered = await this.service.isRegistered(email);
      if (isRegistered) {
        return res.status(409).json({ Error: 'Already registered' });
      }

      const userData = registerUserSchema.parse(req.body);
      const registerUser = await this.service.registerUser(userData);
      if (!registerUser) {
        return res.status(401).json({ Error: 'Invalid credentials' });
      }

      const payload: PayloadToken = {
        id: registerUser.id,
        username: registerUser.username,
        role: registerUser.role,
      };

      const accessToken = this.service.generateAccessToken(payload);
      const newRefreshToken = this.service.generateRefreshToken(payload);

      // Create secure cookie with refresh token
      res.cookie('jwt', newRefreshToken, {
        httpOnly: true, // accessible only by web server
        secure: true, // https
        sameSite: 'none', // cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiry: set to match rT
      });

      // Send accessToken containing id, username and roles
      res.json({ accessToken });
    } catch (err) {
      next(err);
    }
  };

  public login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = loginUserSchema.parse(req.body);
      if (!username || !password) {
        return res.status(400).json({ Error: 'Parameters missing' });
      }
      const validUser = await this.service.validateUsername(username);
      if (!validUser) {
        return res.status(401).json({ Error: 'Invalid credentials' });
      }

      const isPasswordValid = await this.service.validatePassword(username, password);
      if (!isPasswordValid) {
        return res.status(401).json({ Error: 'Invalid credentials' });
      }

      const payload: PayloadToken = {
        id: validUser.id,
        username: validUser.username,
        role: validUser.role,
      };

      const accessToken = this.service.generateAccessToken(payload);
      const newRefreshToken = this.service.generateRefreshToken(payload);

      // Create secure cookie with refresh token
      res.cookie('jwt', newRefreshToken, {
        httpOnly: true, // accessible only by web server
        secure: true, // https
        sameSite: 'none', // cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiry: set to match rT
      });

      // Send accessToken containing id, username and roles
      res.json({ accessToken });
    } catch (err) {
      next(err);
    }
  };

  public refresh: RequestHandler = (req: Request, res: Response) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken: string = cookies.jwt;
    const secret: Secret = this.getEnv('REFRESH_TOKEN_SECRET');

    verify(refreshToken, secret, async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });

      const username = (decoded as PayloadToken).username;
      const decodedUser = await this.service.getDecodedUser(username);

      if (!decodedUser) return res.status(401).json({ message: 'Unauthorized' });

      const payload: PayloadToken = {
        id: decodedUser.id,
        username: decodedUser.username,
        role: decodedUser.role,
      };
      const accessToken = this.service.generateAccessToken(payload);

      res.json({ accessToken });
    });
  };

  public logout: RequestHandler = (req: Request, res: Response) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.json({ message: 'Cookie cleared' });
  };
}
