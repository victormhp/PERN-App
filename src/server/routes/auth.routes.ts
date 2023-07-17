import { AuthController } from '../controllers/auth.controller';
import { injectable, inject } from 'tsyringe';
import { Router } from 'express';
import { loginUserSchema, registerUserSchema } from '../../db/schemas/user.schema';
import { requestValidator } from '../middleware/validator.middleware';

@injectable()
export class AuthRoute {
  public router: Router;

  constructor(@inject(AuthController) private readonly controller: AuthController) {
    this.router = Router();
  }

  routes(): Router {
    this.router.post('/register', requestValidator('body', registerUserSchema), this.controller.register);
    this.router.post('/login', requestValidator('body', loginUserSchema), this.controller.login);
    this.router.get('/refresh', this.controller.refresh);
    this.router.post('/logout', this.controller.logout);

    return this.router;
  }
}
