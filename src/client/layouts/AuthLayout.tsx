import { Outlet } from 'react-router-dom';
import { NavAuth } from '@/components';

function AuthLayout() {
  return (
    <>
      <header className='border-b border-border z-50'>
        <NavAuth />
      </header>
      <main className='flex flex-1 items-center justify-center'>
        <Outlet />
      </main>
    </>
  );
}

export default AuthLayout;
