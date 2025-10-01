'use client'
import { Button } from '@/components/ui/button'
import { Room } from '@/constants/apiRoom'
import { useLoadingState } from '@/store/useLoadingState'
import { EyeOpenIcon } from '@radix-ui/react-icons'
import { EyeClosedIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
const UserAction = ({data}:{data:Room}) => {

    const [hover, setHover] = useState<boolean>(false)
    const loading = useLoadingState((state) => state.loading)
    const setLoading = useLoadingState((state) => state.setLoading)
    const router = useRouter()

    const handleBookClick = () =>{
      setLoading(true)
      router.push(`/dashboard/user/booking/new?meetingRoomId=${data.id}`)
    }
    const handleViewClick = () =>{
      setLoading(true)
      router.push(`/dashboard/user/room/${data.id}`)
    }

  return (
    <div className='flex gap-2'>
      <Button 
      size='sm' variant='secondary' className='cursor-pointer' 
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleViewClick}
      >
        {hover? <EyeOpenIcon className={`text-blue-500 size-5 transition-opacity duration-500 ${hover? "opacity-100":"opacity-0"}`}/>
        :<EyeClosedIcon className={`text-blue-500 size-5 transition-opacity duration-500 ${hover? "opacity-0":"opacity-100"}`}/>}
      </Button>
      <Button size='sm' className='bg-blue-500 text-white hover:bg-blue-700 cursor-pointer' onClick={handleBookClick}>
        Book
      </Button>

    </div>
  )
}

export default UserAction