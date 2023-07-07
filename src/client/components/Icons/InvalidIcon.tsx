function InvalidIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='#dc2626' strokeWidth={0} width={16} height={16} viewBox='0 0 24 24'>
      <g fill='#dc2626' stroke='none'>
        <path d='M12 6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1ZM12 16a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z' />
        <path
          fillRule='evenodd'
          d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2ZM4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0Z'
          clipRule='evenodd'
        />
      </g>
    </svg>
  );
}

export default InvalidIcon;
