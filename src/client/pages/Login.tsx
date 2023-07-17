import { passwordValidation, usernameValidation } from '../utils';
import { Input, Icons } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { useForm } from '../hooks';
import { useState } from 'react';
import { type LoginUser } from '../../db/schemas/user.schema';

function Login() {
  const [unauthorized, setUnauthorized] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const {
    data: user,
    setData,
    errors,
    validSubmit,
    handleChange,
    handleSubmit,
  } = useForm<LoginUser>({
    validations: {
      username: usernameValidation,
      password: passwordValidation,
    },
    onSubmit: async () => {
      const resLogin = await login(user);

      if (resLogin) {
        const accessToken: string = resLogin.data.accessToken;
        setAuth(accessToken);
        setData({} as LoginUser);
        navigate('/dashboard');
      } else {
        setUnauthorized(true);
      }
    },
  });

  return (
    <form className='w-full max-w-lg text-center' onSubmit={handleSubmit} noValidate>
      <h2 className='text-3xl font-bold'>Log In to PERN Notes</h2>
      {unauthorized ? (
        <div
          aria-label='Error indicator'
          className='mt-8 flex select-none items-center rounded bg-red-500 bg-opacity-20 p-2 text-sm text-red-500'
        >
          <Icons.alert />
          <span className='ml-1'>The username or password is incorrect. Please try again.</span>
        </div>
      ) : null}
      <div className='my-14 w-full max-w-lg space-y-14 rounded-md text-start'>
        <Input
          id='username'
          name='username'
          label='Username'
          type='text'
          ariaDescribedby='uidnote'
          value={user.username ?? ''}
          errors={errors.username ?? ''}
          validateOnSubmit={validSubmit}
          handleChange={handleChange('username')}
        />
        <Input
          id='password'
          name='password'
          label='Password'
          type='password'
          ariaDescribedby='pwdnote'
          value={user.password ?? ''}
          errors={errors.password ?? ''}
          validateOnSubmit={validSubmit}
          handleChange={handleChange('password')}
        />
      </div>
      <div className='m-5'>
        <button
          type='submit'
          className='disabled: relative w-4/6 rounded-full bg-purple-500 px-6 py-3 text-sm font-medium transition-all hover:scale-105 focus-visible:scale-105 sm:w-1/2 sm:text-base'
        >
          Log In
        </button>
      </div>
      <p className='text-cetner text-xs sm:text-sm'>
        Don&apos;t have an account?
        <Link to='/register' className='ml-2 font-bold text-purple-400 duration-150 hover:text-zinc-200 focus:text-zinc-200'>
          SIGN UP
        </Link>
      </p>
    </form>
  );
}

export default Login;
