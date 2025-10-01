'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { baseUrl } from '@/config/baseUrl'
import { Profile } from '@/constants/apiProfile'
import { putApi } from '@/lib/apiFetch'
import { useLoadingState } from '@/store/useLoadingState'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'


const formSchema = z.object({
    fullName: z.string().min(2,{
        message: "Full Name must be at least 2 characters"
    }),
    phoneNumber: z.string().refine((value) => value ==='' || value.length === 10,{
        message:'Phone number must have 10 characters'
    }),
    department: z.string(),
    avatarUrl: z.string().optional()
})

const UserProfile = ({initData}:{initData: Profile | undefined}) => {

  const defaultValues = {
    fullName: initData?.fullName ||'',
    phoneNumber: initData?.phoneNumber || '',
    department: initData?.department || '',
    avatarUrl: ''
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  })

  const loading = useLoadingState((state) => state.loading)
  const setLoading = useLoadingState((state) => state.setLoading)
  async function onSubmit(values: z.infer<typeof formSchema>) {
      setLoading(true)
      await putApi(`${baseUrl}/api/profile`,{}, values)
      setLoading(false)
    }

  return (
     <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter full name' value={initData?.username??''} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
              <FormField
                control={form.control}
                name='fullName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter user name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter email' value={initData?.email??''} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                <FormField
                control={form.control}
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      value={initData?.role??''}
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
            <Button type='submit' className='cursor-pointer'>Update</Button>
          </form>
      </Form>
  )
}

export default UserProfile