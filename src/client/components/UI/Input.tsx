import { HidePasswordIcon, InvalidIcon, ShowPasswordIcon } from '../Icons';
import { type ChangeEvent, useState } from 'react';

interface InputProps {
  id: string;
  name: string;
  label: string;
  type: string;
  value: string;
  placeholder?: string;
  ariaDescribedby?: string;
  errors: string;
  validateOnSubmit?: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Input({ id, name, type, label, value, placeholder, ariaDescribedby, errors, validateOnSubmit, handleChange }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [validateOnBlur, setValidateOnBlur] = useState(false);

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  const handleShowPassword = () => setShowPassword((prevShow: boolean) => !prevShow);
  const handleBlur = () => setValidateOnBlur(true);

  const showError = errors !== '' && (validateOnBlur || !validateOnSubmit);

  return (
    <div className='my-8 mb-12'>
      <label htmlFor={name} className='block pb-2 text-sm font-medium text-zinc-50'>
        {label}
      </label>
      <div className='relative'>
        <input
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          type={inputType}
          autoComplete='off'
          aria-invalid={errors ? 'false' : 'true'}
          aria-describedby={ariaDescribedby}
          className={`w-full rounded bg-transparent p-2 transition-shadow placeholder:text-zinc-700 focus:outline-none ${
            showError ? 'shadow-error-100 focus:shadow-error-150' : 'shadow-input hover:shadow-valid-100 focus:shadow-valid-150'
          }`}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {type === 'password' ? (
          <div
            className='absolute bottom-2 right-0 mr-3 flex cursor-pointer items-center text-sm'
            tabIndex={0}
            onClick={handleShowPassword}
          >
            {showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
          </div>
        ) : null}
      </div>

      {showError ? (
        <div aria-label='Error indicator' className='absolute mt-2 flex items-center text-sm text-red-500'>
          <InvalidIcon />
          <span className='ml-1'>{errors}</span>
        </div>
      ) : null}
    </div>
  );
}

export default Input;
