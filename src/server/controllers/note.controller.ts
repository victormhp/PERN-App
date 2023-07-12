import { type Request, type Response, type NextFunction, type RequestHandler } from 'express';
import { injectable, inject } from 'tsyringe';
import { NoteService } from '../services/note.service';
import { createNoteSchema, type NewNote, type Note } from '../db/schemas/note.schema';
import { assertIsDefined } from '../utils/isDefined.helper';

@injectable()
export class NoteController {
  constructor(@inject(NoteService) private readonly service: NoteService) {}

  public getNotes: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      assertIsDefined(userId);

      const notes: Note[] = await this.service.getNotes(userId);
      res.status(201).json({ notes });
    } catch (err) {
      next(err);
    }
  };

  public createNote: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const noteData: NewNote = createNoteSchema.parse(req.body);
      const notes = await this.service.createNote(noteData);
      res.status(201).json({ notes });
    } catch (err) {
      next(err);
    }
  };
}
