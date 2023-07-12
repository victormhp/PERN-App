import { injectable } from 'tsyringe';
import db from '../db/dbConnection';
import { eq } from 'drizzle-orm';
import { type Note, notes, type NewNote } from '../db/schemas/note.schema';

@injectable()
export class NoteService {
  public async getNotes(userId: number): Promise<Note[]> {
    const getNotes: Note[] = await db.select().from(notes).where(eq(notes.userId, userId));
    return getNotes;
  }

  // ????
  public async getNoteById(id: string): Promise<Note | undefined> {
    const noteId = Number(id);
    const [getNote]: Note[] = await db.select().from(notes).where(eq(notes.id, noteId));
    return getNote;
  }

  public async createNote(noteData: NewNote): Promise<Note | undefined> {
    const [createNoteData] = await db.insert(notes).values(noteData).returning();
    return createNoteData;
  }

  public updateNote = async (id: string, noteData: NewNote): Promise<Note[]> => {
    const noteId = Number(id);
    const updateNoteData: Note[] = await db.update(notes).set(noteData).where(eq(notes.id, noteId)).returning();

    return updateNoteData;
  };

  public deleteNote = async (id: string): Promise<Note[]> => {
    const noteId = Number(id);
    const deleteNoteData: Note[] = await db.delete(notes).where(eq(notes.id, noteId)).returning();

    return deleteNoteData;
  };
}
