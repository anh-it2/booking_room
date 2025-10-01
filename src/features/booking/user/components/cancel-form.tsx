'use client'
import { Button } from '@/components/ui/button'
import { baseUrl } from '@/config/baseUrl'
import { Booking } from '@/constants/apiBooking'
import { deleteApi } from '@/lib/apiFetch'
import { useLoadingState } from '@/store/useLoadingState'
import React from 'react'

interface CellActionProps {
  id: number,
  onClose: () => void,
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>
}
const CancelForm = ({onClose, id, setBookings}:CellActionProps) => {

  const loading = useLoadingState((state) => state.loading)
  const setLoading = useLoadingState((state) => state.setLoading)
  const onCancel = async (id:number) =>{
    setLoading(true)
    await deleteApi(`${baseUrl}/api/client/booking/${id}`)
     setBookings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'CANCELLED' } : item
      )
  )
    setLoading(false)
  }

  return (
    <div className='flex flex-col gap-5'>
      <div>
        <h1 className='font-bold text-xl'>Are you sure?</h1>
        <sub className='font-semibold text-gray-500'>This action can be undone</sub>
      </div>
      <div className='flex flex-row gap-2 justify-around'>
        <Button className='cursor-pointer' onClick={onClose}>Cancel</Button>
        <Button variant='destructive' onClick={() => onCancel(id)}>Continue</Button>
      </div>
    </div>
  )
}

export default CancelForm