import { type Request, type Response, type NextFunction } from 'express';
import { type User, type NewUser } from '../db/schemas/user.schema';
import { UserService } from '../services/user.service';
import { injectable, inject } from 'tsyringe';

@injectable()
export class UserController {
  constructor(@inject(UserService) private readonly service: UserService) {}

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: User[] = await this.service.getUsers();
      res.status(201).json({ data });
    } catch (err) {
      next(err);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const userID = Number(id);
      const userData = await this.service.getUserById(userID);

      if (userData != null) {
        const { password, ...filteredUserData } = userData;
        res.status(201).json({ data: filteredUserData });
      } else {
        res.status(400).json({ message: 'No user with that ID' });
      }
    } catch (err) {
      next(err);
    }
  };

  public udpateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const userData: NewUser = req.body;
      const updatedUserData = await this.service.updateUser(id, userData);

      res.status(201).json({ data: updatedUserData });
    } catch (err) {
      next(err);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const deletedUser = await this.service.deleteUser(id);

      res.status(201).json({ data: deletedUser });
    } catch (err) {
      next(err);
    }
  };
}
