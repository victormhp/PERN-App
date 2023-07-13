import { create } from 'zustand';

interface State {
  isMenuOpen: boolean;
  isMenuClicked: boolean;
}

interface Actions {
  toggleMenu: () => void;
  hoverMenu: () => void;
}

export const useMenuStore = create<State & Actions>((set) => ({
  isMenuOpen: false,
  isMenuClicked: false,
  toggleMenu: () => {
    set((state) => ({
      isMenuOpen: !state.isMenuOpen,
      isMenuClicked: !state.isMenuClicked,
    }));
  },
  hoverMenu: () => {
    set((state) => {
      if (!state.isMenuClicked) {
        return {
          isMenuOpen: !state.isMenuOpen,
        };
      }
      return state;
    });
  },
}));
