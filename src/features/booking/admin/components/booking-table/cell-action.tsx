'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { baseUrl } from '@/config/baseUrl';
import { Booking } from '@/constants/apiBooking';
import { deleteApi } from '@/lib/apiFetch';
import { useLoadingState } from '@/store/useLoadingState';
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CellActionProps {
  data: Booking,
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>
}

export const CellAction: React.FC<CellActionProps> = ({ data, setBookings }) => {
  const loading = useLoadingState((state) => state.loading)
  const setLoading = useLoadingState((state) => state.setLoading)
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async (id: number): Promise<void> => {
    setLoading(true)
    await deleteApi(`${baseUrl}/api/admin/booking/${id}`)
    setOpen(false)
    setLoading(false)
    setBookings(prev => prev.filter(item => item.id !== id))
  };

  const onRedirect = () =>{
    setLoading(true)
    router.push(`/dashboard/admin/booking/${data.id}`)
  }

  return (
      <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={loading}
        onConfirm={onConfirm}
        id={data.id}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <IconDotsVertical className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => onRedirect()}
          >
            <IconEdit className='mr-2 h-4 w-4' /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <IconTrash className='mr-2 h-4 w-4' /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  
    </>
  );
};
