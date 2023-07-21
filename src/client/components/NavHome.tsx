import { NavLink } from 'react-router-dom';

function NavHome() {
  return (
    <nav className='flex items-center justify-between px-4'>
      <div className='flex items-center gap-x-2  sm:gap-x-4'>
        <NavLink to='/' className='inline-flex items-center'>
          <img src='/logo.png' alt='Logo' className='h-[54px] w-[54px] p-2' />
          <h1 className='hidden text-2xl font-semibold tracking-wide text-purple-500 sm:block'>
            PERN <span className='font-medium text-primary'>Notes</span>
          </h1>
        </NavLink>
      </div>
      <div className='flex gap-x-4'>
        <NavLink
          to='/login'
          className='rounded-md px-4 py-2 text-sm font-semibold transition-colors hover:bg-accent hover:text-accent-foreground'
        >
          Log In
        </NavLink>
        <NavLink
          to='/register'
          className='rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-purple-500'
        >
          Sign Up
        </NavLink>
      </div>
    </nav>
  );
}

export default NavHome;
