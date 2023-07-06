import { registry, injectable, container } from 'tsyringe';
import { UserRoute } from '../routes/user.routes';
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
])
@injectable()
export class AppModule {}
