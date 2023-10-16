import { Router } from 'express';
import { injectable, inject } from 'tsyringe';
import { verifyJWT } from '../middleware/jwt.middleware';
import { NoteController } from '../controllers/note.controller';
import { requestValidator } from '../middleware/validator.middleware';
import { insertNoteSchema, updateNoteSchema } from '../db/schemas/note.schema';

@injectable()
export class NoteRoute {
  public router: Router;

  constructor(@inject(NoteController) private readonly controller: NoteController) {
    this.router = Router();
  }

  routes(): Router {
    this.router.use(verifyJWT);

    this.router.get('/', this.controller.getNotes);
    this.router.post('/', requestValidator('body', insertNoteSchema), this.controller.createNote);
    this.router.put('/:id', requestValidator('body', updateNoteSchema), this.controller.updateNote);
    this.router.delete('/:id', this.controller.deleteNote);

    return this.router;
  }
}
