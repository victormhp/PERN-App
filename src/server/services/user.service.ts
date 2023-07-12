import { users, type User, type NewUser } from '../db/schemas/user.schema';
import { injectable } from 'tsyringe';
import db from '../db/dbConnection';
import { eq } from 'drizzle-orm';
import { hashPassword } from '../utils/bcrypt.helpers';

@injectable()
export class UserService {
  public async getUsers(): Promise<User[]> {
    const getUsers: User[] = await db.select().from(users);
    return getUsers;
  }

  public async getUserById(id: string): Promise<User | undefined> {
    const userID = Number(id);
    const [getUser]: User[] = await db.select().from(users).where(eq(users.id, userID));
    return getUser;
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const [getUser]: User[] = await db.select().from(users).where(eq(users.email, email));
    return getUser;
  }

  public async getUserByUsername(username: string): Promise<User | undefined> {
    const [getUser]: User[] = await db.select().from(users).where(eq(users.username, username));
    return getUser;
  }

  public async createUser(userData: NewUser): Promise<User | undefined> {
    const hashedPassword = await hashPassword(userData.password);

    const newUser = {
      username: userData.username,
      email: userData.email,
      password: hashedPassword.toString(),
    };

    const [createUserData] = await db.insert(users).values(newUser).returning();
    return createUserData;
  }

  public updateUser = async (id: string, userData: NewUser): Promise<User[]> => {
    const userID = Number(id);
    const updateUserData: User[] = await db.update(users).set(userData).where(eq(users.id, userID)).returning();

    return updateUserData;
  };

  public deleteUser = async (id: string): Promise<User[]> => {
    const userID = Number(id);
    const deleteUserData: User[] = await db.delete(users).where(eq(users.id, userID)).returning();

    return deleteUserData;
  };
}
