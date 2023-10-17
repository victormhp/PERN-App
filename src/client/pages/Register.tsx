import { Input, Button, Form, FormField, FormItem, FormLabel, FormControl, FormMessage, Icons } from '@/components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store';
import { type RegisterUser, registerUserSchema } from '../../server/db/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

function Register() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();

  const form = useForm<RegisterUser>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (user: RegisterUser) => {
    const resRegister = await register(user);

    if (resRegister) {
      const accessToken: string = resRegister.data.accessToken;
      setAuth(accessToken);
      navigate('/');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full max-w-xs space-y-8 text-center sm:max-w-lg'>
        <h2 className='text-3xl font-bold text-primary'>Sign Up to PERN Notes</h2>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='text-start'>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type='text' aria-describedby='uidnote' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='text-start'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='text' aria-describedby='email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='text-start'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' aria-describedby='pwdnote' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <div className='mb-5'>
            <Button
              type='submit'
              disabled={form.formState.isSubmitting}
              className='w-64 bg-purple-500 font-semibold text-zinc-50 transition-transform hover:scale-95 hover:bg-purple-500 focus-visible:scale-95 focus-visible:bg-purple-500 focus-visible:ring-purple-500'
            >
              {form.formState.isSubmitting ? <Icons.loader className='animate-spin' /> : 'REGISTER'}
            </Button>
          </div>
          <p className='text-cetner text-xs sm:text-sm'>
            Have an account?
            <Link
              to='/'
              className='ml-2 rounded-md font-bold text-purple-500 duration-150 hover:text-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2'
            >
              LOG IN
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}

export default Register;
