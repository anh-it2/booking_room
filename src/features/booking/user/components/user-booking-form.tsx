'use client';

import FormCardSkeleton from '@/components/form-card-skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DateTimePicker from '@/components/ui/date-time-picker';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { baseUrl } from '@/config/baseUrl';
import { Booking } from '@/constants/apiBooking';
import { convertVarientInUrl } from '@/features/profile/utils/convert-varient-in-url';
import { postApi } from '@/lib/apiFetch';
import { formatDateToBackend } from '@/lib/utils';
import { useLoadingState } from '@/store/useLoadingState';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
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
  title: z.string().max(200, {
    message: `Title'room must be not over 200 characters.`
  }),
  description: z.string().max(500,{message: 'Description must be not over 500 characters.'}),
  purpose: z.string().max(500,{message: 'Description must be not over 500 characters.'}),
  startTime: z.date(),
  endTime: z.date(),
  meetingRoomId: z.coerce.number()
}).refine((data) => data.endTime >= data.startTime,{
  message:'loi',
  path:['endTime']
});

export default function UserBookingForm({
  initialData,
  pageTitle,
  confirmBtn,
  id
}: {
  initialData: Booking | undefined;
  pageTitle: string;
  confirmBtn: string;
  id:number
}) {
  const searchParams = useSearchParams();
  const meetingRoomId = Number(searchParams.get('meetingRoomId'))
  const title = convertVarientInUrl(searchParams.get('title'))
  const startTime = convertVarientInUrl(searchParams.get('startTime'))
  const endTime = convertVarientInUrl(searchParams.get('endTime'))

  const defaultValues = useMemo(() =>  ({
    title: initialData?.title || title || '',
    description: initialData?.description || '',
    purpose: initialData?.purpose || '',
    startTime: initialData?.startTime ? new Date(initialData.startTime) : (startTime ? new Date(startTime) : new Date()),
    endTime: initialData?.endTime ? new Date(initialData.endTime) : (endTime ? new Date(endTime) : new Date),
    meetingRoomId: meetingRoomId || initialData?.meetingRoom.id || 0
    // startTime: initialData?.startTime ||'',
    // endTime: initialData?.endTime ||'',
  }),[initialData]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  const router = useRouter()

  const loading = useLoadingState((state) => state.loading)
  const setLoading = useLoadingState((state) => state.setLoading)
  useEffect(() => {
    if(pageTitle !== '') setLoading(false)
  },[initialData])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
   if(pageTitle === 'Create New Booking'){
    const id = initialData?.meetingRoom.id ? initialData.meetingRoom.id : meetingRoomId
    const payload = {
      ...values,
      startTime: formatDateToBackend(values.startTime),
      endTime: formatDateToBackend(values.endTime)
    }
    await postApi(`${baseUrl}/api/client/booking`,{}, payload)
    router.push('/dashboard/user/booking')
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
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{`Title's Meeting`}</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter title of meeting' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='purpose'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purpose</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter address of location' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='startTime'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thời gian bắt đầu</FormLabel>
                      <FormControl>
                        <DateTimePicker value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='endTime'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thời gian kết thúc</FormLabel>
                      <FormControl>
                        <DateTimePicker value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> 
                  <FormItem>
                    <FormLabel>{`Meeting's Id`}</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter address of location'  value={initialData?.meetingRoom.id? initialData.meetingRoom.id : meetingRoomId} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
              </div>
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Enter product description'
                        className='resize-none'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='cursor-pointer'>{confirmBtn}</Button>
            </form>
          </Form>
        </CardContent>
      </Card>}
    </>
  );
}
