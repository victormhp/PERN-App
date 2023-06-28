import { AuthController } from '../controllers/auth.controller';
import { injectable, inject } from 'tsyringe';
import { Router } from 'express';

@injectable()
export class AuthRoute {
  public router: Router;

  constructor(@inject(AuthController) private readonly controller: AuthController) {
    this.router = Router();
  }

  routes(): Router {
    this.router.post('/login', this.controller.login);
    this.router.get('/refresh', this.controller.refresh);
    this.router.post('/logout', this.controller.logout);

    return this.router;
  }
}
