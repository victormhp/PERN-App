import { Outlet } from 'react-router-dom';
import { Menu, Navigation } from '../components';

function DashLayout() {
  return (
    <>
      <Navigation />
      <main className='flex overflow-hidden'>
        <Menu />
        <Outlet />
      </main>
    </>
  );
}

export default DashLayout;
