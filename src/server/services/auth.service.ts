import { type Secret, sign, type SignOptions } from 'jsonwebtoken';
import { type NewUser, type User } from '../db/schemas/user.schema';
import { type PayloadToken } from '../types/custom';
import { UserService } from './user.service';
import { checkPassword } from '../utils/bcrypt.helpers';
import { injectable, inject } from 'tsyringe';
import { Config } from '../config/env.config';

@injectable()
export class AuthService extends Config {
  constructor(@inject(UserService) private readonly userService: UserService) {
    super();
  }

  public async registerUser(userData: NewUser) {
    return await this.userService.createUser(userData);
  }

  public async validateUser(username: string, password: string): Promise<User | null> {
    const userByEmail = await this.userService.getUserByEmail(username);

    if (userByEmail) {
      const isMatch = await checkPassword(password, userByEmail.password);
      if (isMatch) {
        return userByEmail;
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
