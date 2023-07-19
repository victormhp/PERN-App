import { Link, useNavigate } from 'react-router-dom';
import { passwordValidation, usernameValidation } from '@/utils';
import { Input, Icons, Label, Button } from '@/components';
import { useAuthStore } from '@/store';
import { useForm } from '@/hooks';
import { useState } from 'react';
import { type LoginUser } from '../../db/schemas';

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
    <form className='w-full max-w-xs text-center sm:max-w-lg' onSubmit={handleSubmit} noValidate>
      <h2 className='text-3xl font-bold text-primary'>Log In to PERN Notes</h2>
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
        <div>
          <Label htmlFor='username'>Username</Label>
          <Input
            id='username'
            name='username'
            type='text'
            aria-describedby='uidnote'
            value={user.username ?? ''}
            onChange={handleChange('username')}
          />
        </div>
        <div>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            name='password'
            type='password'
            aria-describedby='pwdnote'
            value={user.password ?? ''}
            onChange={handleChange('password')}
          />
        </div>
      </div>
      <div className='m-5'>
        <Button
          type='submit'
          className='w-64 bg-purple-500 font-semibold text-zinc-50 transition-transform hover:scale-95 hover:bg-purple-500 focus-visible:scale-95 focus-visible:bg-purple-500 focus-visible:ring-purple-500'
        >
          LOGIN
        </Button>
      </div>
      <p className='text-cetner text-xs sm:text-sm'>
        Don&apos;t have an account?
        <Link
          to='/register'
          className='ml-2 rounded-md font-bold text-purple-500 duration-150 hover:text-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2'
        >
          SIGN UP
        </Link>
      </p>
    </form>
  );
}

export default Login;
