import { type Request, type Response, type NextFunction, type RequestHandler } from 'express';
import { injectable, inject } from 'tsyringe';
import { NoteService } from '../services/note.service';
import { insertNoteSchema, type UpdateNote, type NewNote, type Note, updateNoteSchema } from '../db/schemas/note.schema';
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
      const noteData: NewNote = insertNoteSchema.parse(req.body);
      const note = await this.service.createNote(noteData);
      res.status(201).json({ note });
    } catch (err) {
      next(err);
    }
  };

  public updateNote: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const noteId = req.params?.id;
      const noteData: UpdateNote = updateNoteSchema.parse(req.body);
      assertIsDefined(noteId);

      const note = await this.service.updateNote(noteId, noteData);
      res.status(201).json({ note });
    } catch (err) {
      next(err);
    }
  };

  public deleteNote: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const noteId = req.params?.id;
      assertIsDefined(noteId);

      const note = await this.service.deleteNote(noteId);
      res.status(201).json({ note });
    } catch (err) {
      next(err);
    }
  };
}
