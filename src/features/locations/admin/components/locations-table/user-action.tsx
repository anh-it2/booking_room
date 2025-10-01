'use client';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Location } from '@/constants/apiLocation';
import { useLoadingState } from '@/store/useLoadingState';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
const UserAction = ({ data }: { data: Location }) => {
  const setLoading = useLoadingState((state) => state.setLoading);
  const router = useRouter();

  const handleBookClick = () => {
    if (data.active === false) {
      toast.error('Địa điểm đã ngững hoạt động');
      return;
    }
    setLoading(true);
    router.push(`/dashboard/admin/room/new?locationId=${data.id}`);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant='outline'
          onClick={handleBookClick}
          className='flex h-9 w-9 cursor-pointer items-center rounded-md bg-blue-500 text-white shadow-sm hover:bg-blue-600 hover:text-white'
        >
          <Plus className='h-4 w-4' />
        </Button>
      </TooltipTrigger>
      <TooltipContent className='bg-blue-600 text-white shadow-md'>
        <span>Create new meeting room</span>
        <TooltipArrow className='fill-blue-600' />
      </TooltipContent>
    </Tooltip>
  );
};

export default UserAction;
