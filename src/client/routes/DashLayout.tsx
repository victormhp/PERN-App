import { Outlet } from 'react-router-dom';
import { Menu, NavLoggedIn } from '../components';

function DashLayout() {
  return (
    <>
      <header className='border-b border-zinc-500'>
        <NavLoggedIn />
      </header>
      <main className='flex overflow-hidden'>
        <Menu />
        <Outlet />
      </main>
    </>
  );
}

export default DashLayout;
