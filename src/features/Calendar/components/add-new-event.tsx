'use client';
import Loading from '@/app/loading';
import { Button } from '@/components/ui/button';
import CardData from '@/components/ui/card-data';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { initData, Room } from '@/constants/apiRoom';
import {
  formatTimeRange,
  Time
} from '@/features/profile/utils/format-time-range';
import React, { SetStateAction, useEffect, useState } from 'react';
import { toast } from 'sonner';

type AddNewEventProp = {
  startTime: Time | undefined;
  endTime: Time | undefined;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<SetStateAction<boolean>>;
};

const AddnewEvent = ({
  startTime,
  endTime,
  dialogOpen,
  setDialogOpen
}: AddNewEventProp) => {
  const [step, setStep] = useState<number>(1);
  const [titleBooking, setTitleBooking] = useState<string>('');
  const [rooms, setRooms] = useState<Room[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const handleNextClick = () => {
    if (titleBooking === '') {
      toast.warning("The meeting's name can't be empty");
    } else {
      setStep((prev) => prev + 1);
    }
  };
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await initData.initialize();
      const rooms = initData.getRooms({ page: 1, limit: 9999 });
      setRooms(rooms.rooms);
      setLoading(false);
    }
    fetchData();
  }, []);
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className='p-10'>
        <DialogHeader>
          <DialogTitle className='text-red-500'>
            {step === 1 && 'Thời gian tổ chức: '}
            {step === 2 && 'Danh sách các phòng họp'}
            {step === 1 && (
              <span className='font-no text-xl/7 text-black'>
                {formatTimeRange(startTime, endTime)}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>
        {step === 1 && (
          <div className='flex flex-col gap-3'>
            <input
              type='text'
              className='h-10 px-1 text-xl'
              autoFocus
              placeholder='Nhập tên cuộc họp'
              value={titleBooking}
              onChange={(e) => setTitleBooking(e.target.value)}
            />
            <Button
              variant='destructive'
              className='bg-blue-500 py-2 text-xl hover:bg-blue-600'
              onClick={handleNextClick}
            >
              Tiếp
            </Button>
          </div>
        )}
        {step === 2 && (
          <div>
            {loading && titleBooking !== undefined ? (
              <Loading />
            ) : (
              <ScrollArea className='h-[40vh]'>
                {rooms?.map((item, index) => (
                  <CardData
                    data={item}
                    key={index}
                    startTime={startTime}
                    endTime={endTime}
                    titleBooking={titleBooking}
                  />
                ))}
              </ScrollArea>
            )}
            <div className='flex flex-row justify-center gap-2'>
              <Button
                variant='destructive'
                className='bg-blue-500 py-2 text-xl hover:bg-blue-600'
                onClick={() => setStep((prev) => prev - 1)}
              >
                Trước
              </Button>
              <Button
                variant='destructive'
                className='bg-blue-500 py-2 text-xl hover:bg-blue-600'
                onClick={() => setDialogOpen(false)}
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddnewEvent;
