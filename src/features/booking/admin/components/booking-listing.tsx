'use client'

import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { Booking, initData } from '@/constants/apiBooking';
import { useLoadingState } from '@/store/useLoadingState';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BookingTable } from './booking-table';
import { bookingColumns } from './booking-table/bookingColumn';

type BookingListingPage = {};

export default  function BookingListingPage({}: BookingListingPage) {

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
  useEffect(() =>{

    async function fetchData() {
      setLoading(true)
      await initData.initialize()
      const res = initData.getBookings(filters)
      
      const data = res.bookings
      const sortedData = [...data].sort(
        (a: Booking, b: Booking) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )

      setTotalItems(res.total_bookings)
      setBookings(sortedData)
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
