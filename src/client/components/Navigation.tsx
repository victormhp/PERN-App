import { DarkModeIcon, GridViewIcon, MenuIcon } from './Icons';
import { useMenuStore } from '../store/menuStore';
import { NavLink } from 'react-router-dom';
import NavButton from './UI/NavButton';

function Navigation() {
  const toggleMenu = useMenuStore((state) => state.toggleMenu);

  return (
    <header className='border-b border-zinc-600'>
      <nav className='flex items-center justify-between px-4'>
        <div className='flex items-center gap-x-2  sm:gap-x-4'>
          <NavButton name='Menu' Icon={MenuIcon} onClick={toggleMenu} />
          <NavLink to='#' className='inline-flex items-center'>
            <img src='/logo.png' alt='Logo' className='h-[54px] w-[54px] p-2' />
            <h1 className='hidden text-2xl font-medium tracking-wide text-purple-400 sm:block'>
              PERN <span className='text-white'>Notes</span>
            </h1>
          </NavLink>
        </div>
        <div className='flex items-center sm:gap-x-4'>
          <div className='hidden sm:flex sm:items-center sm:gap-x-4 '>
            <NavButton name='Colors' Icon={DarkModeIcon} />
            <NavButton name='Views' Icon={GridViewIcon} />
          </div>
          <div>
            <NavLink to='#' className='mx-3 block h-7 w-7 rounded-full bg-purple-400' />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
