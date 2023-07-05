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
  const hoverMenu = useMenuStore((state) => state.hoverMenu);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const menuButton: HTMLDivElement = event.currentTarget;
    setActive(menuButton.title);
  };

  return (
    <aside
      className={`group overflow-hidden pt-2 transition-all ${isMenuOpen ? 'w-64' : 'w-20 hover:w-64'} z-50`}
      onMouseEnter={hoverMenu}
      onMouseLeave={hoverMenu}
    >
      <div className='flex flex-col'>
        {menuSections.map((item) => (
          <MenuButton key={item.name} name={item.name} active={active} isMenuOpen={isMenuOpen} Icon={item.Icon} onClick={handleClick} />
        ))}
      </div>
    </aside>
  );
}

export default Menu;
