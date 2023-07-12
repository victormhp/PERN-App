import { create } from 'zustand';
import { type Note } from '../models';
import { type AxiosInstance } from 'axios';

interface State {
  notes: Note[];
}

interface Actions {
  getNotes: (axios: AxiosInstance) => Promise<void>;
  createNote: (noteData: Note, axios: AxiosInstance) => Promise<void>;
}

export const useNotesStore = create<State & Actions>((set) => ({
  notes: [],
  getNotes: async (axios: AxiosInstance) => {
    const res = await axios.get('/api/notes');
    set({ notes: res.data });
    console.log(res);
  },
  createNote: async (noteData: Note, axios: AxiosInstance) => {
    const res = await axios.post('/api/notes', noteData);
    console.log(res);
  },
}));
