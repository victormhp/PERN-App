import { emailValidation, passwordValidation } from '../utils';
import { Input } from '../components';
import { type User } from '../models/user';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { useAuthStore } from '../store';
import { useForm } from '../hooks';

function Login() {
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  const {
    data: user,
    errors,
    validSubmit,
    handleChange,
    handleSubmit,
  } = useForm<User>({
    validations: {
      email: emailValidation,
      password: passwordValidation,
    },
    onSubmit: async () => {
      const resLogin = await loginUser(user.email, user.password);
      if (resLogin) {
        setToken(resLogin.data.accessToken);
        navigate('/dashboard');
      }
    },
  });

  return (
    <form className='w-full max-w-lg space-y-10 text-center' onSubmit={handleSubmit} noValidate>
      <h2 className='text-3xl font-bold'>Log In to PERN Notes</h2>
      <div className='w-full max-w-lg rounded-md text-start'>
        <Input
          id='email'
          name='email'
          label='Email'
          type='email'
          ariaDescribedby='emailnote'
          value={user.email ?? ''}
          errors={errors.email ?? ''}
          validateOnSubmit={validSubmit}
          handleChange={handleChange('email')}
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
      <div>
        <div className='mb-5'>
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
      </div>
    </form>
  );
}

export default Login;
