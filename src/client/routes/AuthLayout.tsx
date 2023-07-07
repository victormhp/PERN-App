import { Outlet } from 'react-router-dom';
import { NavLoggedOut } from '../components';

function AuthLayout() {
  return (
    <>
      <header className='border-b border-zinc-600'>
        <NavLoggedOut />
      </header>
      <main className='flex flex-1 items-center justify-center overflow-hidden'>
        <Outlet />
      </main>
    </>
  );
}

export default AuthLayout;
