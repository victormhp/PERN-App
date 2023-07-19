import { useState, forwardRef, type InputHTMLAttributes } from 'react';
import { Icons } from '../Icons';
import { cn } from '@/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;
  const handleShowPassword = () => setShowPassword((prevShow: boolean) => !prevShow);

  return (
    <div className='relative'>
      <input
        type={inputType}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />

      {type === 'password' ? (
        <div
          className='absolute bottom-2 right-0 mr-3 flex cursor-pointer items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          tabIndex={0}
          onClick={handleShowPassword}
        >
          {showPassword ? <Icons.hide className='stroke-ring' /> : <Icons.show className='stroke-ring' />}
        </div>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
