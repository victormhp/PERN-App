import { create } from 'zustand';

interface State {
  accessToken: string;
  isAuth: boolean;
}

interface Actions {
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<State & Actions>((set) => ({
  accessToken: '',
  isAuth: false,
  setToken: (accessToken) =>
    set(() => ({
      accessToken,
      isAuth: true,
    })),
  logout: () => set(() => ({ accessToken: '', isAuth: false })),
}));
