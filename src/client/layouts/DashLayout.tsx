import { Outlet } from 'react-router-dom';
import { Menu, NavLoggedIn } from '@/components';

function DashLayout() {
  return (
    <>
      <header className='fixed top-0 w-full border-b border-border'>
        <NavLoggedIn />
      </header>
      <main className='mt-14 flex h-[calc(100vh-56px)]'>
        <Menu />
        <Outlet />
      </main>
    </>
  );
}

export default DashLayout;
