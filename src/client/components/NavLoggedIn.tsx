import { DarkModeIcon, GridViewIcon, ListViewIcon, MenuIcon } from './Icons';
import { useAuthStore, useMenuStore, useNotesStore } from '../store';
import { useClickOutside } from '../hooks';
import { useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import NavButton from './UI/NavButton';

function NavLoggedIn() {
  const [profileMenu, setProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const view = useNotesStore((state) => state.view);
  const toggleView = useNotesStore((state) => state.toggleView);
  const ViewIcon = view === 'grid' ? ListViewIcon : GridViewIcon;

  const toggleMenu = useMenuStore((state) => state.toggleMenu);
  const handleProfileMenu = () => setProfileMenu((prev) => !prev);

  const handleClickOutside = () => setProfileMenu(false);
  const handleLogout = useAuthStore((state) => state.logout);

  useClickOutside(profileMenuRef, handleClickOutside);

  return (
    <nav className='flex items-center justify-between bg-zinc-900 px-2 sm:px-4'>
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
          <NavButton name='Views' Icon={ViewIcon} onClick={toggleView} />
        </div>
        <div className='relative' ref={profileMenuRef}>
          <div className='mx-3 h-7 w-7 cursor-pointer rounded-full bg-purple-400' tabIndex={0} onClick={handleProfileMenu} />
          {profileMenu ? (
            <div className='absolute right-2 top-11 rounded-md border border-zinc-700 bg-zinc-900 px-2 py-3 text-center'>
              <ul className='flex flex-col gap-4'>
                <li>
                  <Link to='/' className='cursor-pointer rounded px-3 py-2 transition-all hover:bg-zinc-800 hover:bg-opacity-60'>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to='/login'
                    className='cursor-pointer rounded px-3 py-2 transition-all hover:bg-zinc-800 hover:bg-opacity-60'
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default NavLoggedIn;
