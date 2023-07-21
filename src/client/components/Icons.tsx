import { type SVGProps } from 'react';

export const Icons = {
  bulb: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      className='lucide lucide-lightbulb'
      {...props}
    >
      <path d='M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5M9 18h6M10 22h4' />
    </svg>
  ),
  trash: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      className='lucide lucide-trash-2'
      {...props}
    >
      <path d='M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6' />
    </svg>
  ),
  moon: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      className='lucide lucide-moon'
      {...props}
    >
      <path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' />
    </svg>
  ),
  sun: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      className='lucide lucide-sun'
      {...props}
    >
      <circle cx={12} cy={12} r={4} />
      <path d='M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41' />
    </svg>
  ),
  menu: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      className='lucide lucide-menu'
      {...props}
    >
      <path d='M4 12h16M4 6h16M4 18h16' />
    </svg>
  ),
  grid: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='lucide lucide-layout-grid'
      {...props}
    >
      <rect width='7' height='7' x='3' y='3' rx='1' />
      <rect width='7' height='7' x='14' y='3' rx='1' />
      <rect width='7' height='7' x='14' y='14' rx='1' />
      <rect width='7' height='7' x='3' y='14' rx='1' />
    </svg>
  ),
  list: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='lucide lucide-layout-grid'
      {...props}
    >
      <rect width='18' height='7' x='3' y='3' rx='1' />
      <rect width='18' height='7' x='3' y='14' rx='1' />
    </svg>
  ),
  alert: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      stroke='currentColor'
      strokeWidth={0}
      width={24}
      height={24}
      viewBox='0 0 24 24'
      {...props}
    >
      <g fill='#dc2626' stroke='none'>
        <path d='M12 6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1ZM12 16a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z' />
        <path
          fillRule='evenodd'
          d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2ZM4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0Z'
          clipRule='evenodd'
        />
      </g>
    </svg>
  ),
  show: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      className='lucide lucide-eye'
      {...props}
    >
      <path d='M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z' />
      <circle cx={12} cy={12} r={3} />
    </svg>
  ),
  hide: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      className='lucide lucide-eye-off'
      {...props}
    >
      <path d='M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68' />
      <path d='M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61M2 2l20 20' />
    </svg>
  ),
  close: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      className='lucide lucide-x'
      {...props}
    >
      <path d='M18 6 6 18M6 6l12 12' />
    </svg>
  ),
  undo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      className='lucide lucide-undo-2'
      {...props}
    >
      <path d='M9 14 4 9l5-5' />
      <path d='M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11' />
    </svg>
  ),
  redo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      className='lucide lucide-redo-2'
      {...props}
    >
      <path d='m15 14 5-5-5-5' />
      <path d='M20 9H9.5A5.5 5.5 0 0 0 4 14.5v0A5.5 5.5 0 0 0 9.5 20H13' />
    </svg>
  ),
  palette: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      className='lucide lucide-palette'
      {...props}
    >
      <circle cx={13.5} cy={6.5} r={0.5} />
      <circle cx={17.5} cy={10.5} r={0.5} />
      <circle cx={8.5} cy={7.5} r={0.5} />
      <circle cx={6.5} cy={12.5} r={0.5} />
      <path d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z' />
    </svg>
  ),
  tag: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      className='lucide lucide-tag'
      {...props}
    >
      <path d='M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2ZM7 7h.01' />
    </svg>
  ),
  archive: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      className='lucide lucide-archive'
      {...props}
    >
      <rect width={20} height={5} x={2} y={4} rx={2} />
      <path d='M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9M10 13h4' />
    </svg>
  ),
};
