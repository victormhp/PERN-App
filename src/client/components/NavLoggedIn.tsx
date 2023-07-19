import { useAuthStore, useMenuStore, useConfigStore } from '@/store';
import { useClickOutside, useTheme } from '@/hooks';
import { useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Icons } from './Icons';
import { Button } from '@/components/ui';

function NavLoggedIn() {
  // Main menu
  const handleMenu = useMenuStore((state) => state.toggleMenu);

  // Profile menu
  const [profileMenu, setProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const handleLogout = useAuthStore((state) => state.logout);
  const handleProfileMenu = () => setProfileMenu((prev) => !prev);
  const handleCloseProfile = () => setProfileMenu(false);
  useClickOutside(profileMenuRef, handleCloseProfile);

  // Notes view (grid or list)
  const view = useConfigStore((state) => state.view);
  const handleView = useConfigStore((state) => state.toggleView);
  const ViewIcon = view === 'grid' ? Icons.list : Icons.grid;

  // Color theme (light or dark)
  const isDark = useConfigStore((state) => state.isDark);
  const handleTheme = useConfigStore((state) => state.toogleDark);
  const ThemeIcon = isDark ? Icons.sun : Icons.moon;
  useTheme();

  return (
    <nav className='flex items-center justify-between bg-background px-2 sm:px-4'>
      <div className='flex items-center gap-x-2  sm:gap-x-4'>
        <Button variant='ghost' size='icon' onClick={handleMenu}>
          <Icons.menu />
        </Button>
        <NavLink to='#' className='inline-flex items-center'>
          <img src='/logo.png' alt='Logo' className='h-[54px] w-[54px] p-2' />
          <h1 className='hidden text-2xl font-semibold tracking-wide text-purple-500 sm:block'>
            PERN <span className='font-medium text-primary'>Notes</span>
          </h1>
        </NavLink>
      </div>
      <div className='flex items-center sm:gap-x-4'>
        <div className='hidden sm:flex sm:items-center sm:gap-x-4 '>
          <Button variant='ghost' size='icon' onClick={handleTheme}>
            <ThemeIcon />
          </Button>
          <Button variant='ghost' size='icon' onClick={handleView}>
            <ViewIcon />
          </Button>
        </div>
        <div className='relative' ref={profileMenuRef}>
          <div className='mx-3 h-7 w-7 cursor-pointer rounded-full bg-purple-500' tabIndex={0} onClick={handleProfileMenu} />
          {profileMenu ? (
            <div className='absolute right-2 top-11 z-50 rounded-md border border-border bg-background px-2 py-3 text-center'>
              <ul className='flex flex-col gap-4'>
                <li>
                  <Link to='/' className='cursor-pointer rounded px-3 py-2 transition-all hover:bg-muted hover:bg-opacity-60'>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to='/login'
                    className='cursor-pointer rounded px-3 py-2 transition-all hover:bg-muted hover:bg-opacity-60'
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
