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
import { Room } from '@/constants/apiRoom';
import { getApi, postApi, putApi } from '@/lib/apiFetch';
import { useLoadingState } from '@/store/useLoadingState';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
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
  id: z.coerce.number(),
  locationId: z.number(),
  name: z.string().min(2, {
    message: `Location's name must be at least 2 characters.`
  }),
  capacity: z.coerce.number(),
  equipments: z.string(),
  city: z.string(),
  country: z.string(),
  description: z.string(),
  active: z.boolean()
});

export default function RoomForm({
  initialData,
  pageTitle,
  confirmBtn
}: {
  initialData: Room | undefined;
  pageTitle: string | undefined;
  confirmBtn: string | undefined
}) {

  const params = useSearchParams()
  const locationId = Number(params.get('locationId'))
  const router = useRouter()
  const loading = useLoadingState((state) => state.loading)  
  const setLoading = useLoadingState((state) => state.setLoading)
  const [locationName, setLocationName] =  useState<string>('')

  useEffect(() => {
    if(pageTitle ==='' || confirmBtn ===''){
      setLoading(true)
    }else{
      setLoading(false)
    }
  },[pageTitle, confirmBtn])

  useEffect(() =>{
    const fetchData = async () =>{
      setLoading(true)
      const res = await getApi(`${baseUrl}/api/locations/${locationId}`)
      const data = await res.json()
      console.log(data)
      const name = data.data.name
      setLocationName(name)
      setLoading(false)
    }
    if(locationId !== 0) fetchData()
  },[locationId])

  const defaultValues = useMemo(() => (
    {
    id: initialData?.id || 0,
    locationId: initialData?.location.id || locationId || 0,
    name: initialData?.name || '',
    capacity: initialData?.capacity || 0,
    city: initialData?.location?.city || '',
    equipments: initialData?.equipments ||'',
    country: initialData?.location?.country || '',
    description: initialData?.description || '',
    active: initialData?.active || false
  }
  ),[initialData])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) =>{
    if(pageTitle === 'Add New Meeting Room'){
      setLoading(true)
      await postApi(`${baseUrl}/api/rooms`,{},values)
      router.push('/dashboard/admin/room')
    }else{
      setLoading(true)
      await putApi(`${baseUrl}/api/rooms/${values.id}`,{},values)
      router.push('/dashboard/admin/room')
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
            <form  className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  {pageTitle === 'Edit Meeting Room'
                  && <FormItem>
                    <FormLabel>{`Meeting Room's Id`}</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter location name' value={initialData?.id??''} readOnly/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>}

                <FormField 
                  control={form.control}
                  name='name'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>{`Meeting Room's Name`}<span className='text-red-600 mr-0'>*</span></FormLabel>
                      <FormControl>
                        <Input placeholder='Enter address of location' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormItem>
                  <FormLabel>{`Location's Id`}</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter location Id' value={initialData?.location.id || locationId || 0} readOnly/>
                  </FormControl>
                  <FormMessage />
                </FormItem>

                <FormItem>
                  <FormLabel>{`Location's Name`}</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter location name' value={initialData?.location.name??locationName} readOnly/>
                  </FormControl>
                  <FormMessage />
                </FormItem>

                <FormField 
                  control={form.control}
                  name='capacity'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Capacity</FormLabel>
                      <FormControl>
                        <Input type='number' placeholder='Enter address of location' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField 
                  control={form.control}
                  name='equipments'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Equipments</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter address of location' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <div className='flex gap-19'>

                <FormField
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
                    />

                  <FormField 
                    control={form.control}
                    name='city'
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select City' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='Hà Nội'>Hà Nội</SelectItem>
                            <SelectItem value='T.P HCM'>Hồ Chí Minh</SelectItem>
                            <SelectItem value='Đà Nẵng'>Đà Nẵng</SelectItem>
                            <SelectItem value='Hải Phòng'>Hải Phòng</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField 
                    control={form.control}
                    name='country'
                    render={({field}) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select Country' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='Việt Nam'>Việt Nam</SelectItem>
                          <SelectItem value='Lào'>Lào</SelectItem>
                          <SelectItem value='Thái Lan'>Thái Lan</SelectItem>
                          <SelectItem value='Myanmar'>Myanmar</SelectItem>
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
              name='description'
              render={({field}) => (
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
              <Button className='cursor-pointer'>{confirmBtn}</Button>
            </form>
          </Form>
        </CardContent>
      </Card>}
    </>
  );
}
