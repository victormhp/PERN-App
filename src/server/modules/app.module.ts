import { registry, injectable, container } from 'tsyringe';
import { UserRoute } from '../routes/user.routes';
import { RootRoute } from '../routes/root.routes';
import { AuthRoute } from '../routes/auth.routes';
import { type Router } from 'express';

@registry([
  {
    token: 'UserRoute',
    useFactory: (): Router => {
      return container.resolve(UserRoute).routes();
    },
  },
  {
    token: 'AuthRoute',
    useFactory: (): Router => {
      return container.resolve(AuthRoute).routes();
    },
  },
  {
    token: 'RootRoute',
    useFactory: (): Router => {
      return container.resolve(RootRoute).routes();
    },
  },
])
@injectable()
export class AppModule {}
