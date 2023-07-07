import { NavLink } from 'react-router-dom';

function NavLoggedOut() {
  return (
    <nav className='flex items-center justify-between px-4'>
      <div className='flex items-center gap-x-2  sm:gap-x-4'>
        <NavLink to='#' className='inline-flex items-center'>
          <img src='/logo.png' alt='Logo' className='h-[54px] w-[54px] p-2' />
          <h1 className='hidden text-2xl font-medium tracking-wide text-purple-400 sm:block'>
            PERN <span className='text-white'>Notes</span>
          </h1>
        </NavLink>
      </div>
    </nav>
  );
}

export default NavLoggedOut;
