import { injectable } from 'tsyringe';
import db from '../../db/dbConnection';
import { eq, sql } from 'drizzle-orm';
import { notes, type Note, type NewNote, type UpdateNote } from '../../db/schemas/note.schema';

@injectable()
export class NoteService {
  public async getNotes(userId: number): Promise<Note[]> {
    const getNotes: Note[] = await db
      .select()
      .from(notes)
      .where(eq(notes.userId, userId))
      .orderBy(sql`${notes.createdAt} asc`);
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

  public updateNote = async (id: string, noteData: UpdateNote): Promise<Note | undefined> => {
    const noteId = Number(id);
    const [updateNoteData]: Note[] = await db.update(notes).set(noteData).where(eq(notes.id, noteId)).returning();

    return updateNoteData;
  };

  public deleteNote = async (id: string): Promise<Note | undefined> => {
    const noteId = Number(id);
    const [deleteNoteData]: Note[] = await db.delete(notes).where(eq(notes.id, noteId)).returning();

    return deleteNoteData;
  };
}
