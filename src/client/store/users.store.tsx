import { create } from 'zustand';
import { type AxiosInstance } from 'axios';
import { type User } from '../../db/schemas/user.schema';

interface State {
  users: User | null;
}

interface Actions {
  getUser: (axios: AxiosInstance, signali: AbortSignal) => Promise<void>;
}

export const useUsersStore = create<State & Actions>((set) => ({
  users: null,
  getUser: async (axios: AxiosInstance, signal: AbortSignal) => {
    try {
      const response = await axios.get('/users', { signal });
      console.log(response);
      set({ users: response.data.data });
    } catch (error) {
      console.log(error);
    }
  },
}));
