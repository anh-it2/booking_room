'use client';

import FormCardSkeleton from '@/components/form-card-skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { baseUrl } from '@/config/baseUrl';
import { postApi, putApi } from '@/lib/apiFetch';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@sentry/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// const MAX_FILE_SIZE = 5000000;
// const ACCEPTED_IMAGE_TYPES = [
//   'image/jpeg',
//   'image/jpg',
//   'image/png',
//   'image/webp'
// ];

const formSchema = z.object({
  // image: z
  //   .any()
  //   .refine((files) => files?.length == 1, 'Image is required.')
  //   .refine(
  //     (files) => files?.[0]?.size <= MAX_FILE_SIZE,
  //     `Max file size is 5MB.`
  //   )
  //   .refine(
  //     (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //     '.jpg, .jpeg, .png and .webp files are accepted.'
  //   ),
  username: z.string().min(2, {
    message: `User name must be at least 2 characters.`
  }),
  email: z.string().email({message: 'Invalid email address'}),
  fullName: z.string().min(2,{
    message: 'Full Name must be at least 2 characters'
  }),
  phone: z
  .string()
  .refine(
    (val) => val === "" || val.length === 10,
    { message: "The phone number must have 10 characters" }
  ),
  role: z.enum(["ADMIN", "USER"]),
  avatarUrl: z.string(),
  department: z.string(),
  password: z
    .string()
    .min(6,{message: 'Password must be at least 6 characters'})
    .max(20,{message: "Password must be at most 20 characters"})
    .regex(/[a-z]/,{message: "Password must be at least one lowercase letter"})
    .regex(/[A-Z]/,{message: "Password must be at least one uppercase letter"})
    .regex(/[0-9]/,{message: "Password must be at least one number"})
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
  active: z.boolean()
});

const editUserSchema = formSchema.omit({password: true})
const addUserSchema = formSchema

export default function UserForm({
  initialData,
  pageTitle,
  confirmBtn,
  id
}: {
  initialData: User | undefined;
  pageTitle: string;
  confirmBtn: string;
  id:number
}) {
  const defaultValues = {
    username: initialData?.username || '',
    email: initialData?.email || '',
    fullName: initialData?.fullName || '',
    phone: initialData?.phone ||'',
    role: initialData?.role || 'USER',
    avatarUrl: initialData?.avatarUrl || '',
    department: initialData?.department || '',
    active: initialData?.active || true,
    password: initialData?.password || ''
  };

  type AddUserFormValue = z.infer<typeof addUserSchema>
  type EditUserFormValue = z.infer<typeof editUserSchema>
  const form = useForm<AddUserFormValue | EditUserFormValue>({
    resolver: zodResolver(pageTitle === 'Create New User'? addUserSchema : editUserSchema),
    values: defaultValues
  });

  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if(pageTitle ==='' || confirmBtn ===''){
      setLoading(true)
    }else{
      setLoading(false)
    }
  },[pageTitle, confirmBtn])

  async function onSubmit(values: AddUserFormValue | EditUserFormValue) {
    console.log('123')
    if(pageTitle === 'Create New User'){
      setLoading(true)

      await postApi(`${baseUrl}/api/admin/users`,{},values)
      router.replace('/dashboard/admin/users')
    } else if(pageTitle === 'Edit User'){
      setLoading(true)

      try {
        await putApi(`${baseUrl}/api/admin/users/${id}`,{},values)
        router.replace('/dashboard/admin/users')
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <>
      {loading? <FormCardSkeleton />
      :<Card className='mx-auto w-full '>
        <CardHeader>
          <CardTitle className='text-left text-2xl font-bold'>
            {pageTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='fullName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter full name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter user name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter email' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                { pageTitle === 'Create New User' && <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter password' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />}
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter phone number' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex gap-20 '>
                  {pageTitle === 'Edit User' && <FormField
                      control={form.control}
                      name='active'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Trạng thái</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(value === "true")}
                            value={field.value.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select City' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='true'>Đang hoạt động</SelectItem>
                              <SelectItem value='false'>Đã ngừng hoạt động</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />}
                    <FormField
                      control={form.control}
                      name='role'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select Role' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='ADMIN'>Admin</SelectItem>
                              <SelectItem value='USER'>User</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
              </div>
              <FormField
                control={form.control}
                name='department'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Enter user department'
                        className='resize-none'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit'>{confirmBtn}</Button>
            </form>
          </Form>
        </CardContent>
      </Card>}
    </>
  );
}
