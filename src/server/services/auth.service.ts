import { type Secret, sign, type SignOptions } from 'jsonwebtoken';
import { type PayloadToken } from '../types/custom';
import { type User } from '../db/schemas/user.schema';
import { UserService } from './user.service';
import { Config } from '../config/env.config';
import { checkPassword } from '../helpers/bcrypt.helpers';
import { injectable, inject } from 'tsyringe';

@injectable()
export class AuthService extends Config {
  constructor(@inject(UserService) private readonly userService: UserService) {
    super();
  }

  public async validateUser(username: string, password: string): Promise<User | null> {
    const userByUsername = await this.userService.getUserByUsername(username);

    if (userByUsername != null) {
      const isMatch = await checkPassword(password, userByUsername.password);
      if (isMatch) {
        return userByUsername;
      }
    }

    return null;
  }

  public async getDecodedUser(username: string): Promise<User | null> {
    const decodedUser = await this.userService.getUserByUsername(username);
    return decodedUser;
  }

  public generateAccessToken(payload: PayloadToken): string {
    const secret: Secret = this.getEnv('ACCESS_TOKEN_SECRET');

    const options: SignOptions = {
      expiresIn: '15m',
    };

    return sign(payload, secret, options);
  }

  public generateRefreshToken(payload: PayloadToken): string {
    const secret: Secret = this.getEnv('REFRESH_TOKEN_SECRET');

    const options: SignOptions = {
      expiresIn: '7d',
    };

    return sign(payload, secret, options);
  }
}
