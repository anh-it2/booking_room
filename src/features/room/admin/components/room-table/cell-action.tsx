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
import { Room } from '@/constants/apiRoom';
import { deleteApi } from '@/lib/apiFetch';
import { useLoadingState } from '@/store/useLoadingState';
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CellActionProps {
  data: Room,
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>
}

export const CellAction: React.FC<CellActionProps> = ({ data, setRooms }) => {
  const loading = useLoadingState((state) => state.loading)
  const setLoading = useLoadingState((state) => state.setLoading)
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async (id: number): Promise<void> => {
    setLoading(true)
    await deleteApi(`${baseUrl}/api/rooms/${id}`)
    setOpen(false)
    setLoading(false)
    setRooms(prev => prev.filter(item => item.id !== id))
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
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
            onClick={() => {
              setLoading(true)
              router.push(`/dashboard/admin/room/${data.id}`)
            }}
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
