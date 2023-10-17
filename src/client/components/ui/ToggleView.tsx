import { Button, Icons } from '@/components';
import { useConfigStore } from '@/store';

function ToggleView() {
  const view = useConfigStore((state) => state.view);
  const handleView = useConfigStore((state) => state.toggleView);
  const ViewIcon = view === 'grid' ? Icons.list : Icons.grid;

  return (
    <Button variant='ghost' size='icon' onClick={handleView}>
      <ViewIcon />
    </Button>
  );
}

export default ToggleView;
