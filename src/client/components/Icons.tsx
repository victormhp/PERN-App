import { type SVGProps } from 'react';

export const Icons = {
  bulb: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
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
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='currentColor' viewBox='0 0 36 36' {...props}>
      <path d='M14 4H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM6 14V6h8v8Z' />
      <path d='M30 4h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-8 10V6h8v8Z' />
      <path d='M14 20H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2ZM6 30v-8h8v8Z' />
      <path d='M30 20h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2Zm-8 10v-8h8v8Z' />
      <path fill='none' d='M0 0h36v36H0z' />
    </svg>
  ),
  list: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='currentColor' viewBox='0 0 36 36' {...props}>
      <path d='M14 4H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2ZM6 14v-8h24v8Z' />
      <path d='M14 20H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2ZM6 30v-8h24v8Z' />
      <path fill='none' d='M0 0h36v36H0z' />
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
};
