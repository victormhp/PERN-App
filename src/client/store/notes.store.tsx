import { type AxiosResponse, type AxiosInstance } from 'axios';
import { create } from 'zustand';
import { type NewNote, type Note, type UpdateNote } from '../../db/schemas/note.schema';

interface State {
  currentNote: Note | null;
  notes: Note[];
}

interface Actions {
  setCurrentNote: (note: Note | null) => void;
  getNotes: (axios: AxiosInstance) => Promise<AxiosResponse<any, any> | undefined>;
  createNote: (noteData: NewNote, axios: AxiosInstance) => Promise<AxiosResponse<any, any> | undefined>;
  updateNote: (noteId: number, noteData: UpdateNote, axios: AxiosInstance) => Promise<AxiosResponse<any, any> | undefined>;
  deleteNote: (noteId: number, axios: AxiosInstance) => Promise<AxiosResponse<any, any> | undefined>;
}

export const useNotesStore = create<State & Actions>((set) => ({
  currentNote: null,
  notes: [],
  setCurrentNote: (note: Note | null) => {
    set(() => ({ currentNote: note }));
  },
  getNotes: async (axios: AxiosInstance) => {
    try {
      const res = await axios.get('/api/notes');
      const fetchedNotes = res.data.notes;

      set((state) => {
        if (JSON.stringify(state.notes) !== JSON.stringify(fetchedNotes)) {
          return { notes: fetchedNotes };
        }
        return state;
      });

      return res;
    } catch (error) {
      console.error(error);
    }
  },
  createNote: async (noteData: NewNote, axios: AxiosInstance) => {
    try {
      const res = await axios.post('/api/notes', noteData);
      const createdNote = res.data.note;
      set((state) => ({ notes: [...state.notes, createdNote] }));

      return res;
    } catch (error) {
      console.error(error);
    }
  },
  updateNote: async (noteId: number, noteData: UpdateNote, axios: AxiosInstance) => {
    try {
      const res = await axios.put(`/api/notes/${noteId}`, noteData);
      const updatedNote = res.data.note;
      set((state) => ({
        notes: state.notes.map((note) => (note.id === updatedNote.id ? { ...note, ...updatedNote } : note)),
      }));

      return res;
    } catch (error) {
      console.error(error);
    }
  },
  deleteNote: async (noteId: number, axios: AxiosInstance) => {
    try {
      const res = await axios.delete(`/api/notes/${noteId}`);
      const deletedNote = res.data.note;
      set((state) => ({
        notes: state.notes.filter((note) => note.id !== deletedNote.id),
      }));

      return res;
    } catch (error) {
      console.error(error);
    }
  },
}));
