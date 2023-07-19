import { Outlet } from 'react-router-dom';
import { NavLoggedOut } from '@/components';

function AuthLayout() {
  return (
    <>
      <header className='border-b border-border'>
        <NavLoggedOut />
      </header>
      <main className='flex flex-1 items-center justify-center'>
        <Outlet />
      </main>
    </>
  );
}

export default AuthLayout;
