import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  token: string | null;
  isAuth: boolean;
}

interface Actions {
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: null,
      isAuth: false,
      setToken: (token: string) =>
        set(() => ({
          token,
          isAuth: !!token,
        })),
      logout: () => set(() => ({ token: null, isAuth: false })),
    }),
    {
      name: 'auth',
    }
  )
);
