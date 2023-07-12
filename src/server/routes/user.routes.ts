import { Router } from 'express';
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
    this.router.use(verifyJWT);

    this.router.get('/', this.controller.getUsers);
    this.router.get('/:id', this.controller.getUserById);
    this.router.put('/:id', this.controller.udpateUser);
    this.router.delete('/:id', this.controller.deleteUser);

    return this.router;
  }
}
