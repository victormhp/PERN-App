import { emailValidation, passwordValidation, usernameValidation } from '../utils';
import { Input } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks';
import { useAuthStore } from '../store';
import { type RegisterCredentials } from '../models/auth.models';

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
  } = useForm<RegisterCredentials>({
    validations: {
      email: emailValidation,
      password: passwordValidation,
      username: usernameValidation,
    },
    onSubmit: async () => {
      const resRegister = await register(user);

      if (resRegister) {
        const accessToken = resRegister.data.accessToken;
        setAuth(accessToken);
        setData({} as RegisterCredentials);
        navigate('/dashboard');
      }
    },
  });

  return (
    <form className='w-full max-w-lg space-y-10 text-center' onSubmit={handleSubmit} noValidate>
      <h2 className='text-3xl font-bold'>Create Account</h2>
      <div className='w-full max-w-lg rounded-md text-start'>
        <Input
          id='email'
          name='email'
          label="What's your email?"
          type='email'
          placeholder='Enter your email'
          ariaDescribedby='emailnote'
          value={user.email ?? ''}
          errors={errors.email ?? ''}
          validateOnSubmit={validSubmit}
          handleChange={handleChange('email')}
        />
        <Input
          id='password'
          name='password'
          label='Create a password'
          type='password'
          placeholder='Create a password'
          ariaDescribedby='pwdnote'
          value={user.password ?? ''}
          errors={errors.password ?? ''}
          validateOnSubmit={validSubmit}
          handleChange={handleChange('password')}
        />
        <Input
          id='username'
          name='username'
          label='What should we call you?'
          type='text'
          placeholder='Enter a profile name'
          ariaDescribedby='uidnote'
          value={user.username ?? ''}
          errors={errors.username ?? ''}
          validateOnSubmit={validSubmit}
          handleChange={handleChange('username')}
        />
      </div>
      <div>
        <div className='mb-5'>
          <button
            type='submit'
            className='disabled: relative w-4/6 rounded-full bg-purple-500 px-6 py-3 text-sm font-medium transition-all hover:scale-105 focus-visible:scale-105 sm:w-1/2 sm:text-base'
          >
            CREATE ACCOUNT
          </button>
        </div>
        <p className='text-cetner text-xs sm:text-sm'>
          Have an account?
          <Link to='/login' className='ml-2 font-bold text-purple-400 duration-150 hover:text-zinc-200 focus:text-zinc-200'>
            LOG IN
          </Link>
        </p>
      </div>
    </form>
  );
}

export default Register;
