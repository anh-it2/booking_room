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
import { Location } from '@/constants/apiLocation';
import { postApi, putApi } from '@/lib/apiFetch';
import { zodResolver } from '@hookform/resolvers/zod';
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
  name: z.string().min(2, {
    message: `Location's name must be at least 2 characters.`
  }),
  address: z
    .string()
    .min(2, { message: 'Address must be at least 2 characters' }),
  postalCode: z.string(),
  city: z.string(),
  country: z.string(),
  description: z.string(),
  active: z.boolean()
});

export default function LocationForm({
  initialData,
  pageTitle,
  confirmBtn,
  id
}: {
  initialData: Location | undefined;
  pageTitle: string;
  confirmBtn: string;
  id: number;
}) {
  const defaultValues = {
    name: initialData?.name || '',
    address: initialData?.address || '',
    city: initialData?.city || '',
    postalCode: initialData?.postalCode || '',
    country: initialData?.country || '',
    description: initialData?.description || '',
    active: initialData?.active || true
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (pageTitle === '' || confirmBtn === '') {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [pageTitle, confirmBtn]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (pageTitle === 'Create Location') {
      setLoading(true);

      await postApi(`${baseUrl}/api/locations`, {}, values);
      router.replace('/dashboard/admin/location');
    } else if (pageTitle === 'Edit Location') {
      setLoading(true);

      await putApi(`${baseUrl}/api/locations/${id}`, {}, values);
      router.replace('/dashboard/admin/location');
    }
  }

  return (
    <>
      {loading ? (
        <FormCardSkeleton />
      ) : (
        <Card className='mx-auto w-full'>
          <CardHeader>
            <CardTitle className='text-left text-2xl font-bold'>
              {pageTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'
              >
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{`Location's Name`}</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter location name' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='address'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Enter address of location'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='postalCode'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Enter address of location'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='mx-auto flex gap-20'>
                    <FormField
                      control={form.control}
                      name='active'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Trạng thái</FormLabel>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(value === 'true')
                            }
                            value={field.value.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select City' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='true'>
                                Đang hoạt động
                              </SelectItem>
                              <SelectItem value='false'>
                                Đã ngừng hoạt động
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='city'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select City' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='Hà Nội'>Hà Nội</SelectItem>
                              <SelectItem value='T.P HCM'>
                                Hồ Chí Minh
                              </SelectItem>
                              <SelectItem value='Đà Nẵng'>Đà Nẵng</SelectItem>
                              <SelectItem value='Hải Phòng'>
                                Hải Phòng
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='country'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value}
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
                <Button type='submit'>{confirmBtn}</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </>
  );
}
