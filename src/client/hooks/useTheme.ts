import { useEffect } from 'react';
import { useConfigStore } from '../store/config.store';

function useTheme() {
  const isDark = useConfigStore((state) => state.isDark);

  const applyTheme = () => {
    const root = document.documentElement;
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
  };

  useEffect(() => {
    applyTheme();
  }, [isDark]);
}

export default useTheme;
