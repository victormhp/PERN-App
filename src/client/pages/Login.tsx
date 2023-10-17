import { Input, Button, Form, FormField, FormItem, FormLabel, FormControl, FormMessage, Icons } from '@/components';
import { useAuthStore } from '@/store';
import { type LoginUser, loginUserSchema } from '../../server/db/schemas';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

function Login() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const form = useForm<LoginUser>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (user: LoginUser) => {
    const resLogin = await login(user);

    if (resLogin) {
      const accessToken: string = resLogin.data.accessToken;
      setAuth(accessToken);
      navigate('/dashboard');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full max-w-xs space-y-8 text-center sm:max-w-lg'>
        <h2 className='text-3xl font-bold text-primary'>Log In to PERN Notes</h2>
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
        <div className='m-5'>
          <Button
            type='submit'
            disabled={form.formState.isSubmitting}
            className='w-64 bg-purple-500 font-semibold text-zinc-50 transition-transform hover:scale-95 hover:bg-purple-500 focus-visible:scale-95 focus-visible:bg-purple-500 focus-visible:ring-purple-500'
          >
            {form.formState.isSubmitting ? <Icons.loader className='animate-spin' /> : 'LOGIN'}
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
    </Form>
  );
}

export default Login;
