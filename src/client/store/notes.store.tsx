import { create } from 'zustand';
import { type NewNote, type Note } from '../models';
import { type AxiosResponse, type AxiosInstance } from 'axios';

interface State {
  view: 'grid' | 'list';
  currentNote: Note | null;
  notes: Note[];
}

interface Actions {
  toggleView: () => void;
  setCurrentNote: (note: Note | null) => void;
  getNotes: (axios: AxiosInstance) => Promise<AxiosResponse<any, any> | undefined>;
  createNote: (noteData: NewNote, axios: AxiosInstance) => Promise<AxiosResponse<any, any> | undefined>;
}

export const useNotesStore = create<State & Actions>((set) => ({
  view: 'grid',
  currentNote: null,
  notes: [],
  toggleView: () => {
    set((state) => ({ view: state.view === 'grid' ? 'list' : 'grid' }));
  },
  setCurrentNote: (note: Note | null) => {
    set(() => ({ currentNote: note }));
  },
  getNotes: async (axios: AxiosInstance) => {
    try {
      const res = await axios.get('/api/notes');
      set({ notes: res.data.notes });
      return res;
    } catch (error) {
      console.error(error);
    }
  },
  createNote: async (noteData: NewNote, axios: AxiosInstance) => {
    try {
      const res = await axios.post('/api/notes', noteData);
      const newNote = res.data.notes;
      set((state) => ({ notes: [...state.notes, newNote] }));

      return res;
    } catch (error) {
      console.error(error);
    }
  },
}));
