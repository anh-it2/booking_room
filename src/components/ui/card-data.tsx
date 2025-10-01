'use client';
import Loading from '@/app/loading';
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { timeToDate } from '@/features/profile/utils/convert-time-to-date';
import { Time } from '@/features/profile/utils/format-time-range';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './button';

const CardData = ({
  data,
  startTime,
  endTime,
  titleBooking
}: {
  data: any;
  startTime: Time | undefined;
  endTime: Time | undefined;
  titleBooking: string;
}) => {
  const router = useRouter();
  const start = timeToDate(startTime);
  const end = timeToDate(endTime);
  const [loading, setLoading] = useState<boolean>(false);
  const handleBookClick = () => {
    if (start === undefined || end === undefined) {
      toast.warning('have something wrong');
    } else {
      setLoading(true);
      router.push(
        `/dashboard/user/booking/new?meetingRoomId=${data.id}&startTime=${encodeURIComponent(start?.toISOString())}&endTime=${encodeURIComponent(end?.toISOString())}&title=${titleBooking}`
      );
    }
  };
  return (
    <Card className='mb-4 shadow-md'>
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
        <CardDescription className='flex flex-col'>
          <div>
            <span className='font-bold'>Location:</span> {data.location.address}
          </div>
          <div>
            <span className='font-bold'>City: </span>
            {data.location.city}
          </div>
          <div>
            <span className='font-bold'>Status: </span>
            {data.active ? 'Đang hoạt động' : 'Đã ngừng hoạt động'}
          </div>
        </CardDescription>
        <CardAction>
          {loading ? (
            <Loading />
          ) : (
            <Button
              size='sm'
              className='cursor-pointer bg-blue-500 text-white hover:bg-blue-700'
              onClick={handleBookClick}
            >
              Book
            </Button>
          )}
        </CardAction>
      </CardHeader>
    </Card>
  );
};

export default CardData;
