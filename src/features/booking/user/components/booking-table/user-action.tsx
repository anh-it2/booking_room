'use client'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Booking } from '@/constants/apiBooking'
import { X } from 'lucide-react'
import React, { useState } from 'react'
import CancelForm from '../cancel-form'

interface CellActionProps {
  data: Booking,
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>
}

const UserAction = ({data, setBookings}:CellActionProps) => {

  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className='flex flex-row gap-2'>
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant='destructive' size='sm'><X /></Button>
            </PopoverTrigger>
            <PopoverContent>
              <CancelForm onClose={() => setOpen(false)} id={data.id} setBookings={setBookings}/>
            </PopoverContent>
        </Popover>
    </div>
  )
}

export default UserAction