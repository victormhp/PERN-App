import { Button, Icons } from '@/components';
import { useTheme } from '@/hooks';
import { useConfigStore } from '@/store';

function ToggleTheme() {
  const isDark = useConfigStore((state) => state.isDark);
  const handleTheme = useConfigStore((state) => state.toogleDark);
  const ThemeIcon = isDark ? Icons.sun : Icons.moon;

  useTheme();

  return (
    <Button variant='ghost' size='icon' onClick={handleTheme}>
      <ThemeIcon />
    </Button>
  );
}

export default ToggleTheme;
