'use client'
import { Button } from '@/components/ui/button'
import { Location } from '@/constants/apiLocation'
import { useLoadingState } from '@/store/useLoadingState'
import { EyeOpenIcon } from '@radix-ui/react-icons'
import { EyeClosedIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
const UserAction = ({data}:{data:Location}) => {

    const [hover, setHover] = useState<boolean>(false)
    const loading = useLoadingState((state) => state.loading)
    const setLoading = useLoadingState((state) => state.setLoading)
    const router = useRouter()

  return (
    <div>
        <Button 
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className='cursor-pointer'
            variant='outline'
            onClick={() =>{
                setLoading(true)
                router.push(`/dashboard/user/location/${data.id}`)
            }}
            >
                {hover? <EyeOpenIcon className="w-5 h-5 text-blue-600 size-5 "/>
                :<EyeClosedIcon className="w-5 h-5 text-blue-600 size-5 "/>}
        </Button>
    </div>
  )
}

export default UserAction