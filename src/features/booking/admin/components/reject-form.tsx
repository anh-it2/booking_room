'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { baseUrl } from '@/config/baseUrl'
import { Booking } from '@/constants/apiBooking'
import { postApi } from '@/lib/apiFetch'
import { useLoadingState } from '@/store/useLoadingState'
import { zodResolver } from '@hookform/resolvers/zod'
import { MessageSquare } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'


const formSchema = z.object({
    reason: z.string().min(2,{message:'The reason must be at least 2 characters'})
})

type RejectFormProp = {
  data: Booking,
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>
}

const RejectForm = ({data, setBookings}:RejectFormProp) => {
  const defaultValues = {
    reason:''
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  })
  const setLoading = useLoadingState((state) => state.setLoading)
  const onSubmit = async (values: z.infer<typeof formSchema>) =>{
    await postApi(`${baseUrl}/api/admin/booking/reject/${data.id}`,{}, values)
    setBookings((prev) =>
    prev.map(item =>
      item.id === data.id ? { ...item, status: 'APPROVED' } : item
    )
  )
    setLoading(false)
  }

  return (
    <Form {...form}>
        <form className='flex flex-col gap-3' onSubmit={form.handleSubmit(onSubmit)}>
             <FormField
                control={form.control}
                name='reason'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                        <MessageSquare className='w-4 h-4 text-gray-500'/>
                        <span>{data.title}</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Enter the reason for approving this booking'
                        className='resize-none'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant='destructive'>Submit</Button>
        </form>
    </Form>
  )
}

export default RejectForm