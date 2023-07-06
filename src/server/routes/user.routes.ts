import { type RequestHandler, Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { injectable, inject } from 'tsyringe';
import verifyJWT from '../middleware/jwt.middleware';

@injectable()
export class UserRoute {
  public router: Router;

  constructor(@inject(UserController) private readonly controller: UserController) {
    this.router = Router();
  }

  routes(): Router {
    this.router.use(verifyJWT as RequestHandler);

    this.router.get('/users', this.controller.getUsers);
    this.router.get('/users/:id', this.controller.getUserById);
    this.router.put('/users/:id', this.controller.udpateUser);
    this.router.delete('/users/:id', this.controller.deleteUser);

    return this.router;
  }
}
