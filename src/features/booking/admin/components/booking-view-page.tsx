'use client'
import { baseUrl } from '@/config/baseUrl';
import { Booking } from '@/constants/apiBooking';
import { getApi } from '@/lib/apiFetch';
import { useEffect, useState } from 'react';
import BookingForm from './booking-form';

type TBookingViewPageProps = {
  bookingId: string;
};

export default function BookingViewPage({
  bookingId
}: TBookingViewPageProps) {

  const [booking, setBooking] = useState<Booking>()
  const [pageTitle, setPageTitle] = useState<string>('')
  const [confirmBtn, setConfirmBtn] = useState<string>('')

  useEffect(() =>{
    async function fetchLocationById(id: number){
      const res = await getApi(`${baseUrl}/api/admin/booking/${id}`)
      const json = await res.json()
      const data = json.data as Booking
      setBooking(data)
      setPageTitle('Edit Booking')
      setConfirmBtn('Confirm Edit')
    }
    if(bookingId !== 'new'){
      fetchLocationById(Number(bookingId))
    }
  },[])

  return <BookingForm initialData={booking} pageTitle={pageTitle} confirmBtn={confirmBtn} id={Number(bookingId)}/>
  
}
