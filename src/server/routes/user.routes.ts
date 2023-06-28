import { UserController } from "../controllers/user.controller";
import { injectable, inject } from "tsyringe";
import { type RequestHandler, Router } from "express";
import verifyJWT from "../middleware/verifyToken";

@injectable()
export class UserRoute {
  public router: Router;

  constructor(
    @inject(UserController) private readonly controller: UserController
  ) {
    this.router = Router();
  }

  routes(): Router {
    this.router.use(verifyJWT as RequestHandler);

    this.router.get("/users", this.controller.getUsers);
    this.router.get("/users/:id", this.controller.getUserById);
    this.router.post("/users/register", this.controller.createUser);
    this.router.put("/users/update/:id", this.controller.udpateUser);
    this.router.delete("/users/delete/:id", this.controller.deleteUser);

    return this.router;
  }
}
