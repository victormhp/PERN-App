import { hash, compare, genSalt } from 'bcrypt';
import 'dotenv/config';

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<Buffer> {
  const salt = await genSalt(SALT_ROUNDS);
  const hashedPassword = await hash(password, salt);

  return Buffer.from(hashedPassword);
}

export async function checkPassword(password: string, hash: string): Promise<boolean> {
  return await compare(password, hash);
}
