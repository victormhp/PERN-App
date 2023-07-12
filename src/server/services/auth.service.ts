import { type Secret, sign, type SignOptions } from 'jsonwebtoken';
import { type NewUser, type User } from '../db/schemas/user.schema';
import { type PayloadToken } from '../typings/custom';
import { UserService } from './user.service';
import { checkPassword } from '../utils/bcrypt.helpers';
import { injectable, inject } from 'tsyringe';
import { Config } from '../config/env.config';

@injectable()
export class AuthService extends Config {
  constructor(@inject(UserService) private readonly userService: UserService) {
    super();
  }

  public async registerUser(userData: NewUser): Promise<User | undefined> {
    return await this.userService.createUser(userData);
  }

  public async isRegistered(email: string): Promise<boolean> {
    const userByEmail = await this.userService.getUserByEmail(email);

    if (userByEmail) return true;
    return false;
  }

  public async validateUsername(username: string): Promise<User | undefined> {
    const userByUsername = await this.userService.getUserByUsername(username);
    if (userByUsername) return userByUsername;
  }

  public async validatePassword(username: string, password: string): Promise<boolean> {
    const userByUsername = await this.userService.getUserByUsername(username);

    if (userByUsername) {
      const isMatch = await checkPassword(password, userByUsername.password);
      if (isMatch) {
        return true;
      }
    }

    return false;
  }

  public async getDecodedUser(username: string): Promise<User | undefined> {
    const decodedUser = await this.userService.getUserByUsername(username);
    return decodedUser;
  }

  public generateAccessToken(payload: PayloadToken): string {
    const secret: Secret = this.getEnv('ACCESS_TOKEN_SECRET');

    const options: SignOptions = {
      expiresIn: '2h',
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
