import { Outlet } from 'react-router-dom';
import { NavHome } from '@/components';

function HomeLayout() {
  return (
    <>
      <header className='border-b border-border z-50'>
        <NavHome />
      </header>
      <main className='flex flex-1 items-center justify-center'>
        <Outlet />
      </main>
    </>
  );
}

export default HomeLayout;
