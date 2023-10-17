import { type SVGProps } from 'react';
import { Loader2, Lightbulb, Trash2, Moon, Sun, Menu, AlertCircle, Eye, EyeOff, Undo, Redo, Palette, Tag, Archive, X } from 'lucide-react';

export const Icons = {
  loader: Loader2,
  bulb: Lightbulb,
  trash: Trash2,
  moon: Moon,
  sun: Sun,
  menu: Menu,
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
  alert: AlertCircle,
  show: Eye,
  hide: EyeOff,
  close: X,
  undo: Undo,
  redo: Redo,
  palette: Palette,
  tag: Tag,
  archive: Archive,
};
