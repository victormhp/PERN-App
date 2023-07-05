import { emailValidation, passwordValidation, usernameValidation } from '../utils/validate';
import { type User } from '../../server/db/schemas/user.schema';
import { Input } from '../components';
import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm';

function Register() {
  const {
    data: user,
    errors,
    isFormInvalid,
    handleChange,
    handleSubmit,
  } = useForm<User>({
    validations: {
      email: emailValidation,
      password: passwordValidation,
      username: usernameValidation,
    },
    onSubmit: () => alert('User submitted!'),
  });

  return (
    <form className='w-full max-w-lg space-y-10 text-center' onSubmit={handleSubmit}>
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
          handleChange={handleChange('username')}
        />
      </div>
      <div>
        <div className='mb-5'>
          <button
            type='submit'
            disabled={isFormInvalid}
            className='disabled: relative w-4/6 rounded-full bg-purple-500 px-6 py-3 text-sm font-medium transition-all hover:scale-105 focus:scale-105 disabled:cursor-not-allowed disabled:opacity-50  sm:w-1/2 sm:text-base'
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
