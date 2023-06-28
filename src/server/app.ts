import { injectable, container } from 'tsyringe';
import { AppModule } from './modules/app.module';
import { Config } from './config/env.config';
import express, { type Router } from 'express';
import ViteExpress from 'vite-express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import 'dotenv/config';

@injectable()
class App extends Config {
  public app: express.Express;
  private readonly port: number;

  constructor() {
    super();
    this.app = express();
    this.port = this.getNumberEnv('PORT') ?? 3001;

    container.resolve<AppModule>(AppModule);
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  public listen(): void {
    ViteExpress.listen(this.app, this.port, () => console.log(`Listening on port http://localhost:${this.port}`));
  }

  private initializeMiddlewares(): void {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(): void {
    const authRouter = container.resolve<Router>('AuthRoute');
    const userRouter = container.resolve<Router>('UserRoute');

    this.app.use('/', authRouter);
    this.app.use('/api', userRouter);
  }
}

export default App;
