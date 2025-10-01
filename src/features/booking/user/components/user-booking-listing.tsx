'use client'

import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { initData } from '@/constants/apiUserBooking';
import { generateToken } from '@/features/profile/utils/generateToken';
import { useLoadingState } from '@/store/useLoadingState';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { BookingTable } from './booking-table';
import { bookingColumns } from './booking-table/bookingColumn';

type BookingListingPage = {};

export default  function UserBookingListingPage({}: BookingListingPage) {

  
  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get('page')??"1")
  const search = searchParams.get('room')
  const pageLimit = parseInt(searchParams.get('perPage')??"10")
  const status = searchParams.get('status')
  const filters = {
    page,
    limit: pageLimit,
    ...(search && {search}),
    ...(status && {status: status})
  }
  const [bookings, setBookings] = useState<any>([])
  const loading = useLoadingState((state) => state.loading);
  const setLoading = useLoadingState((state) => state.setLoading)
  const [totalItems, setTotalItems] = useState<number>(0)
//   useEffect(() => {
//   const messaging = getMessaging(app)
//   const unsubscribe = onMessage(messaging, (payload) => {
//     toast.warning(payload?.notification?.title ?? "Thông báo mới", {
//       description: payload?.notification?.body,
//     })
//   })
//   return () => unsubscribe()
// }, [])
  useEffect(() =>{

    async function fetchData() {
      setLoading(true)
      await initData.initialize()
      const res = initData.getUserBookings(filters)
      
      const data = res.bookings
      const sortedData = [...data].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      
      setTotalItems(res.total_bookings)
      setBookings(sortedData)
      await generateToken()
      setLoading(false)
    }
    fetchData()
  },[page, search??'', pageLimit, status??''])
  
  return (
    <>
    {loading? <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2}/>
    :  <BookingTable
        data={bookings}
        totalItems={totalItems}
        columns={bookingColumns(setBookings)}
      />}
    </>
  );
}
