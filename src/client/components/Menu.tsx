import { useMenuStore } from '../store/menu.store';
import { Icons } from './Icons';
import { useState } from 'react';
import MenuButton from './ui/MenuButton';

interface MenuSection {
  name: string;
  Icon: React.ComponentType;
}

const menuSections: MenuSection[] = [
  { name: 'Notes', Icon: Icons.bulb },
  { name: 'Trash', Icon: Icons.trash },
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
      className={`group fixed z-10 h-full overflow-hidden border-r border-transparent bg-zinc-900 transition-all ${
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
