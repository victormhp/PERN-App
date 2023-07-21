import { emailValidation, passwordValidation, usernameValidation } from '@/utils';
import { Button, Input } from '@/components';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '@/hooks';
import { useAuthStore } from '@/store';
import { type RegisterUser } from '../../db/schemas';

function Register() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();

  const {
    data: user,
    setData,
    errors,
    validSubmit,
    handleChange,
    handleSubmit,
  } = useForm<RegisterUser>({
    validations: {
      email: emailValidation,
      password: passwordValidation,
      username: usernameValidation,
    },
    onSubmit: async () => {
      const resRegister = await register(user);

      if (resRegister) {
        const accessToken: string = resRegister.data.accessToken;
        setAuth(accessToken);
        setData({} as RegisterUser);
        navigate('/dashboard');
      }
    },
  });

  return (
    <form className='w-full max-w-xs space-y-10 text-center sm:max-w-lg' onSubmit={handleSubmit} noValidate>
      <h2 className='text-3xl font-bold'>Create Account</h2>
      <div className='w-full max-w-lg space-y-14 rounded-md text-start'>
        <Input
          id='email'
          name='email'
          type='email'
          placeholder='Enter your email'
          aria-describedby='emailnote'
          value={user.email ?? ''}
          onChange={handleChange('email')}
        />
        <Input
          id='password'
          name='password'
          type='password'
          placeholder='Create a password'
          aria-describedby='pwdnote'
          value={user.password ?? ''}
          onChange={handleChange('password')}
        />
        <Input
          id='username'
          name='username'
          type='text'
          placeholder='Enter a profile name'
          aria-describedby='uidnote'
          value={user.username ?? ''}
          onChange={handleChange('username')}
        />
      </div>
      <div>
        <div className='mb-5'>
          <Button
            type='submit'
            className='w-64 bg-purple-500 font-semibold text-zinc-50 transition-transform hover:scale-95 hover:bg-purple-500 focus-visible:scale-95 focus-visible:bg-purple-500 focus-visible:ring-purple-500'
          >
            REGISTER
          </Button>
        </div>
        <p className='text-cetner text-xs sm:text-sm'>
          Have an account?
          <Link
            to='/login'
            className='ml-2 rounded-md font-bold text-purple-500 duration-150 hover:text-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2'
          >
            LOG IN
          </Link>
        </p>
      </div>
    </form>
  );
}

export default Register;
