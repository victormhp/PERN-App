import { injectable } from 'tsyringe';
import { type Request, type Response, Router } from 'express';
import path from 'path';

@injectable()
export class RootRoute {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  routes(): Router {
    this.router.get('^/$|/index(.html)?', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
    });

    return this.router;
  }
}
