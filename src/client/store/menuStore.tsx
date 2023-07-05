import { create } from 'zustand';

interface MenuState {
  isMenuOpen: boolean;
  isMenuClicked: boolean;
  toggleMenu: () => void;
  hoverMenu: () => void;
}

export const useMenuStore = create<MenuState>((set) => ({
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
