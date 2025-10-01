'use client'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Location } from '@/constants/apiLocation'
import { useLoadingState } from '@/store/useLoadingState'
import { TooltipArrow } from '@radix-ui/react-tooltip'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
const UserAction = ({data}:{data:Location}) => {

    const [hover, setHover] = useState<boolean>(false)
    const loading = useLoadingState((state) => state.loading)
    const setLoading = useLoadingState((state) => state.setLoading)
    const router = useRouter()

    const handleBookClick = () =>{
      setLoading(true)
      router.push(`/dashboard/admin/room/new?locationId=${data.id}`)
    }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant='outline' onClick={handleBookClick} className='flex items-center bg-blue-500 hover:bg-blue-600 text-white hover:text-white shadow-sm w-9 h-9 rounded-md cursor-pointer'>
          <Plus className='h-4 w-4'/>
        </Button>
      </TooltipTrigger>
      <TooltipContent className='bg-blue-600 text-white shadow-md'>
        <span>Create new meeting room</span>
        <TooltipArrow className="fill-blue-600" />
      </TooltipContent>
    </Tooltip>
  )
}

export default UserAction