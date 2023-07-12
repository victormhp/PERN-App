import { Router } from 'express';
import { injectable, inject } from 'tsyringe';
import verifyJWT from '../middleware/jwt.middleware';
import { NoteController } from '../controllers/note.controller';
import { requestValidator } from '../middleware/validator.middleware';
import { createNoteSchema } from '../db/schemas/note.schema';

@injectable()
export class NoteRoute {
  public router: Router;

  constructor(@inject(NoteController) private readonly controller: NoteController) {
    this.router = Router();
  }

  routes(): Router {
    this.router.use(verifyJWT);

    this.router.get('/', this.controller.getNotes);
    this.router.post('/', requestValidator('body', createNoteSchema), this.controller.createNote);

    return this.router;
  }
}
