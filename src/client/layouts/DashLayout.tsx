import { Outlet } from 'react-router-dom';
import { Menu, NavLoggedIn } from '../components';
import { useNotesStore } from '../store';

function DashLayout() {
  const currentNote = useNotesStore((state) => state.currentNote);

  return (
    <div id='note-overlay' className={`${currentNote ? 'pointer-events-none select-none' : ''}`}>
      <header className='fixed top-0 w-full border-b border-zinc-500'>
        <NavLoggedIn />
      </header>
      <main className='mt-14 flex h-[calc(100vh-56px)]'>
        <Menu />
        <Outlet />
      </main>
    </div>
  );
}

export default DashLayout;
