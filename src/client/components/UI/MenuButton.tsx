interface Props {
  name: string;
  active: string;
  isMenuOpen: boolean;
  Icon: React.ComponentType;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function MenuButton({ name, active, isMenuOpen, Icon, onClick }: Props) {
  const activeStyles =
    active === name
      ? 'bg-purple-400 bg-opacity-30'
      : 'hover:bg-zinc-600 hover:bg-opacity-30 focus-visible:bg-zinc-600 focus-visible:bg-opacity-30';
  const widthStyles = isMenuOpen ? 'w-full rounded-r-full pl-7' : 'ml-2 sm:ml-4 w-[48px] rounded-full pl-3';
  const textStyles = isMenuOpen ? 'inline' : 'hidden';

  return (
    <div
      role='button'
      title={name}
      aria-label={name}
      tabIndex={0}
      className={`flex h-[48px] min-w-[48px] cursor-pointer items-center overflow-hidden transition-all ${activeStyles} ${widthStyles}`}
      onClick={onClick}
    >
      <div className='w-[48px] shrink-0'>
        <Icon />
      </div>
      <span className={`transition-all group-hover:inline ${textStyles}`}>{name}</span>
    </div>
  );
}

export default MenuButton;
