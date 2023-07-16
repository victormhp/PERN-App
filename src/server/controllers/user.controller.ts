import { type Request, type Response, type NextFunction, type RequestHandler } from 'express';
import { type User, type RegisterUser } from '../db/schemas/user.schema';
import { UserService } from '../services/user.service';
import { injectable, inject } from 'tsyringe';
import { assertIsDefined } from '../utils/isDefined.helper';

@injectable()
export class UserController {
  constructor(@inject(UserService) private readonly service: UserService) {}

  public getUsers: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: User[] = await this.service.getUsers();
      res.status(201).json({ data });
    } catch (err) {
      next(err);
    }
  };

  public getUserById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params?.id;
      assertIsDefined(id);

      const userData = await this.service.getUserById(id);
      if (userData) {
        const { password, ...filteredUserData } = userData;
        res.status(201).json({ data: filteredUserData });
      }
    } catch (err) {
      next(err);
    }
  };

  public udpateUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params?.id;
      assertIsDefined(id);

      const userData: RegisterUser = req.body;
      const updatedUserData = await this.service.updateUser(id, userData);
      res.status(201).json({ data: updatedUserData });
    } catch (err) {
      next(err);
    }
  };

  public deleteUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params?.id;
      assertIsDefined(id);

      const deletedUser = await this.service.deleteUser(id);
      res.status(201).json({ data: deletedUser });
    } catch (err) {
      next(err);
    }
  };
}
