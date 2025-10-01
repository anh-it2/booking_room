'use client'
import { baseUrl } from '@/config/baseUrl';
import { Booking } from '@/constants/apiBooking';
import { getApi } from '@/lib/apiFetch';
import { useLoadingState } from '@/store/useLoadingState';
import { useEffect, useState } from 'react';
import UserBookingForm from './user-booking-form';

type TBookingViewPageProps = {
  bookingId: string;
};

export default function UserBookingViewPage({
  bookingId
}: TBookingViewPageProps) {

  const [booking, setBooking] = useState<Booking>()
  const [pageTitle, setPageTitle] = useState<string>('')
  const [confirmBtn, setConfirmBtn] = useState<string>('')
  const setLoading = useLoadingState((state) => state.setLoading)

  useEffect(() =>{
    async function fetchLocationById(id: number){
      const res = await getApi(`${baseUrl}/api/client/booking/${id}`)
      const json = await res.json()
      const data = json.data as Booking
      setBooking(data)
      setPageTitle('Edit Booking')
      setConfirmBtn('Confirm Edit')
    }
    if(bookingId !== 'new'){
      fetchLocationById(Number(bookingId))
    }else{
      setPageTitle('Create New Booking')
      setConfirmBtn('Add')
      setLoading(false)
    }
  },[])

  return <UserBookingForm initialData={booking} pageTitle={pageTitle} confirmBtn={confirmBtn} id={Number(bookingId)}/>
  
}
