'use client';
import Loading from '@/app/loading';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { baseUrl } from '@/config/baseUrl';
import { useRoleState } from '@/store/useRoleState';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import GithubSignInButton from './github-auth-button';

// type UserFormValue = {
//   email: z.string().email({'ben tren'})
// }

type AuthMode = 'signin' | 'signup';

export default function UserAuthForm({ mode }: { mode: AuthMode }) {
  const loginSchema = z.object({
    email: z.string().email({ message: 'Enter a valid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(20, { message: 'Password must be at most 20 characters' })
      .regex(/[a-z]/, {
        message: 'Password must be at least one lowercase letter'
      })
      .regex(/[A-Z]/, {
        message: 'Password must be at least one uppercase letter'
      })
      .regex(/[0-9]/, { message: 'Password must be at least one number' })
      .regex(/[^A-Za-z0-9]/, {
        message: 'Password must contain at least one special character'
      })
  });

  const signUpSchema = loginSchema
    .extend({
      confirmPassword: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' })
        .max(20, { message: 'Password must be at most 20 characters' })
        .regex(/[a-z]/, {
          message: 'Password must be at least one lowercase letter'
        })
        .regex(/[A-Z]/, {
          message: 'Password must be at least one uppercase letter'
        })
        .regex(/[0-9]/, { message: 'Password must be at least one number' })
        .regex(/[^A-Za-z0-9]/, {
          message: 'Password must contain at least one special character'
        })
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Confirm Password must match with password',
      path: ['confirmPassword']
    });

  type LoginFormValue = z.infer<typeof loginSchema>;
  type SignupFormValue = z.infer<typeof signUpSchema>;
  type UserFormValue = LoginFormValue | SignupFormValue;

  const setRole = useRoleState((state) => state.setRole);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const form = useForm<LoginFormValue | SignupFormValue>({
    resolver: zodResolver(mode === 'signin' ? loginSchema : signUpSchema),
    defaultValues:
      mode === 'signin'
        ? {
            email: '',
            password: ''
          }
        : {
            email: '',
            password: '',
            confirmPassword: ''
          }
  });

  const onSubmit = async (data: UserFormValue) => {
    if (mode === 'signin') {
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const res = await response.json();

        if (res.status === 200) {
          sessionStorage.setItem('accessToken', res.data.accessToken);
          try {
            const response = await fetch(`${baseUrl}/api/auth/me`, {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`
              }
            });
            const data = await response.json();
            setRole(data.data.role);
            if (data.data.role === 'ADMIN') {
              router.push('/dashboard/admin/location');
            } else if (data.data.role === 'USER') {
              router.push('/dashboard/user/booking');
            }
          } catch (error) {
            console.error(error);
          }
        } else if (res.status === 401) {
          setError('Invalid email or password');
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setLoading(true);

      const response = fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const res = await (await response).json();
      setRole(res.data.role);
      router.push('dashboard/user/booking');
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex w-full flex-col items-center gap-2 space-y-2 rounded-xl border-2 border-amber-100 border-gray-200 bg-gray-50 px-3 py-5 shadow-md'
        >
          {mode === 'signin' ? (
            <div>
              <h1 className='text-3xl font-semibold text-blue-600'>
                Welcome Back
              </h1>
              <span className='text-xl font-medium text-gray-600'>
                Login to your account
              </span>
            </div>
          ) : (
            <div className='flex flex-col items-center'>
              <h1 className='text-2xl font-semibold text-blue-600'>
                Welcome To Our Website
              </h1>
              <span className='text-xl font-medium text-gray-600'>
                Register your account
              </span>
            </div>
          )}
          <FormField
            control={form.control} //gán cả form cho controller
            name='email'
            render={(
              { field } //trả về 1 react element
            ) => (
              <FormItem className='w-full'>
                <FormLabel className='text-xl text-gray-600'>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='demo@gmail.com'
                    className='border-gray-300 focus-visible:border-blue-500 focus-visible:ring-blue-200'
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control} //gán cả form cho controller
            name='password'
            render={(
              { field } //trả về 1 react element
            ) => (
              <FormItem className='w-full'>
                <FormLabel className='text-xl text-gray-600'>
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder=''
                    className='border-gray-300 focus-visible:border-blue-500 focus-visible:ring-blue-200'
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {mode === 'signup' && (
            <FormField
              control={form.control} //gán cả form cho controller
              name='confirmPassword'
              render={(
                { field } //trả về 1 react element
              ) => (
                <FormItem className='w-full'>
                  <FormLabel className='text-xl text-gray-600'>
                    Confrim Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder=''
                      className='border-gray-300 focus-visible:border-blue-500 focus-visible:ring-blue-200'
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button
            disabled={loading}
            className='mt-2 ml-auto w-full cursor-pointer bg-blue-600 text-xl font-semibold text-white hover:bg-blue-700'
            type='submit'
          >
            {loading ? <Loading /> : 'Sign In'}
          </Button>
          <div className='relative flex items-center'>
            <div className='border-red flex-grow border-t'></div>
            <span className='mx-4 text-xs font-medium text-gray-500'>
              Or continue with
            </span>
            <div className='flex-grow border-t border-gray-300'></div>
          </div>

          <GithubSignInButton />
          <span className='text-xl text-red-500'>{error}</span>
        </form>
      </Form>
    </>
  );
}
