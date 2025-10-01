import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Booking } from '@/constants/apiBooking'
import { Check, X } from 'lucide-react'
import React from 'react'
import ApproveForm from '../approve-form'
import RejectForm from '../reject-form'


type AdminAction = {
    data: Booking,
    setBookings: React.Dispatch<React.SetStateAction<Booking[]>>
}

const AdminAction = ({data, setBookings}: AdminAction) => {
  return (
    <div className='flex flex-row gap-2'>
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='default' size='sm' className='bg-green-500 hover:bg-green-600 cursor-pointer'><Check /></Button>
            </PopoverTrigger>
            <PopoverContent className="z-50 bg-white p-4 rounded shadow-md">
                <ApproveForm data={data} setBookings={setBookings}/>
            </PopoverContent>
        </Popover>

        <Popover>
            <PopoverTrigger asChild>
                <Button variant='destructive' size='sm'><X /></Button>
            </PopoverTrigger>
            <PopoverContent>
                <RejectForm data={data} setBookings={setBookings}/>
            </PopoverContent>
        </Popover>

    </div>
  )
}

export default AdminAction