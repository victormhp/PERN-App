interface NavButtonProps {
  name: string;
  Icon: React.ComponentType;
  onClick?: () => void;
}

function NavButton({ name, Icon, onClick }: NavButtonProps) {
  return (
    <button
      className='flex h-[48px] w-[48px] cursor-pointer items-center justify-center rounded-full duration-150 hover:bg-zinc-600 hover:bg-opacity-30 focus-visible:bg-zinc-600 focus-visible:bg-opacity-30'
      type='button'
      role={name}
      aria-label={name}
      onClick={onClick}
    >
      <Icon />
    </button>
  );
}

export default NavButton;
