import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  view: 'grid' | 'list';
  isDark: boolean;
}

interface Actions {
  toggleView: () => void;
  toogleDark: () => void;
}

export const useConfigStore = create(
  persist<State & Actions>(
    (set) => ({
      view: 'grid',
      isDark: false,
      toggleView: () => {
        set((state) => ({ view: state.view === 'grid' ? 'list' : 'grid' }));
      },
      toogleDark: () =>
        set((state) => ({
          isDark: !state.isDark,
        })),
    }),
    { name: 'config' }
  )
);
