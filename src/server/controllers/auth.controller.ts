import { type Request, type Response, type NextFunction } from 'express';
import { loginUserSchema, registerUserSchema } from '../db/schemas/user.schema';
import { type PayloadToken } from '../types/custom';
import { type Secret, verify } from 'jsonwebtoken';
import { AuthService } from '../services/auth.service';
import { injectable, inject } from 'tsyringe';
import { Config } from '../config/env.config';

@injectable()
export class AuthController extends Config {
  constructor(@inject(AuthService) private readonly service: AuthService) {
    super();
  }

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData = registerUserSchema.parse(req.body);
      const registerUser = await this.service.registerUser(userData);

      res.status(201).json({ data: registerUser });
    } catch (err) {
      next(err);
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = loginUserSchema.parse(req.body);

    const validUser = await this.service.validateUser(email, password);

    if (validUser === null) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const payload: PayloadToken = {
      username: validUser.username,
    };

    const accessToken = this.service.generateAccessToken(payload);
    const refreshToken = this.service.generateRefreshToken(payload);

    // Create secure cookie with refresh token
    res.cookie('jwt', refreshToken, {
      httpOnly: true, // accessible only by web server
      secure: true, // https
      sameSite: 'none', // cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiry: set to match rT
    });

    // Send accessToken containing username and roles
    res.json({ accessToken });
  };

  public refresh = (req: Request, res: Response): void => {
    const cookies = req.cookies;

    if (cookies?.jwt === undefined) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const refreshToken: string = cookies.jwt;
    const secret: Secret = this.getEnv('REFRESH_TOKEN_SECRET');

    verify(refreshToken, secret, async (err, decoded) => {
      if (err != null) return res.status(403).json({ message: 'Forbidden' });

      const username = (decoded as PayloadToken).username;
      const decodedUser = await this.service.getDecodedUser(username);

      if (decodedUser === null) return res.status(401).json({ message: 'Unauthorized' });

      const payload: PayloadToken = {
        username: decodedUser.username,
      };
      const accessToken = this.service.generateAccessToken(payload);

      res.json({ accessToken });
    });
  };

  public logout = (req: Request, res: Response): void => {
    const cookies = req.cookies;

    if (cookies?.jwt === undefined) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.json({ message: 'Cookie cleared' });
  };
}
