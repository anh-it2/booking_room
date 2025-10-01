'use client';

import FormCardSkeleton from '@/components/form-card-skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
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
import { Room } from '@/constants/apiRoom';
import { useLoadingState } from '@/store/useLoadingState';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
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
  id: z.number(),
  name: z.string().min(2, {
    message: `Location's name must be at least 2 characters.`
  }),
  capacity: z.number(),
  equipments: z.string(),
  city: z.string(),
  country: z.string(),
  description: z.string(),
  active: z.boolean()
});

export default function UserRoomForm({
  initialData,
}: {
  initialData: Room | undefined;
}) {
  const defaultValues = {
    id: initialData?.id || 0,
    name: initialData?.name || '',
    capacity: initialData?.capacity || 0,
    city: initialData?.location.city || '',
    equipments: initialData?.equipments ||'',
    country: initialData?.location.country || '',
    description: initialData?.description || '',
    active: initialData?.active || false
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  const router = useRouter()
  const loading = useLoadingState((state) => state.loading)  

  return (
    <>
      {loading? <FormCardSkeleton />
      :<Card className='mx-auto w-full '>
        <CardHeader>
          <CardTitle className='text-left text-2xl font-bold'>
            View Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form  className='space-y-8'>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  <FormItem>
                    <FormLabel>{`Meeting Room's Id`}</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter location name' value={initialData?.id??0} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                  <FormItem>
                    <FormLabel>{`Meeting Room's Name`}</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter address of location' value={initialData?.name??''} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                  <FormItem>
                    <FormLabel>Capacity</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter address of location' value={initialData?.capacity??''} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                  <FormItem>
                    <FormLabel>Equipments</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter address of location' value={initialData?.equipments??''} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
              <div className='flex gap-20'>

                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          value={initialData?.active.toString()}
                          disabled
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
                    
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <Select
                          value={initialData?.location.city}
                          disabled
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

                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        value={initialData?.location.country}
                        disabled
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
              </div>
            </div>
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter product description'
                      className='resize-none'
                      value={initialData?.description} readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              <Button type='button' onClick={() => router.push('/dashboard/user/room')} className='cursor-pointer'>Back</Button>
            </form>
          </Form>
        </CardContent>
      </Card>}
    </>
  );
}
