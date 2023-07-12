import { useMenuStore } from '../store/menuStore';
import { useState } from 'react';
import { BinIcon, NotesIcon } from './Icons';
import MenuButton from './UI/MenuButton';

interface MenuSection {
  name: string;
  Icon: React.ComponentType;
}

const menuSections: MenuSection[] = [
  { name: 'Notes', Icon: NotesIcon },
  { name: 'Bin', Icon: BinIcon },
];

function Menu() {
  const [active, setActive] = useState('Notes');
  const isMenuOpen = useMenuStore((state) => state.isMenuOpen);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const menuButton: HTMLDivElement = event.currentTarget;
    setActive(menuButton.title);
  };

  return (
    <aside
      className={`group fixed z-50 h-full overflow-hidden border-r border-transparent bg-zinc-900 transition-all ${
        isMenuOpen ? 'w-72 shadow-menu sm:w-72 sm:shadow-none' : 'w-16 sm:w-20'
      }`}
    >
      <div className='flex flex-col py-2'>
        {menuSections.map((item) => (
          <MenuButton key={item.name} name={item.name} active={active} isMenuOpen={isMenuOpen} Icon={item.Icon} onClick={handleClick} />
        ))}
      </div>
    </aside>
  );
}

export default Menu;
