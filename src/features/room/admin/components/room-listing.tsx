'use client'

import { initData } from '@/constants/apiAdminRoom';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RoomTable } from './room-table';

import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { useLoadingState } from '@/store/useLoadingState';
import { roomColumns } from './room-table/roomColumn';


type RoomListingPage = {};

export default  function RoomListingPage({}: RoomListingPage) {

  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get('page')??"1")
  const search = searchParams.get('name')
  const pageLimit = parseInt(searchParams.get('perPage')??"10")
  const active = searchParams.get('active')
  const filters = {
    page,
    limit: pageLimit,
    ...(search && {search}),
    ...(active && {active: active})
  }
  const [rooms, setRooms] = useState<any>([])
  const loading = useLoadingState((state) => state.loading)
  const setLoading = useLoadingState((state) => state.setLoading)
  const [totalItems, setTotalItems] = useState<number>(0)
  useEffect(() =>{

    async function fetchData() {

      setLoading(true)
      await initData.initialize()
      const data = initData.getAdminRooms(filters)
      setTotalItems(data.total_rooms)
      setRooms(data.rooms)
      setLoading(false)
    }
    fetchData()
  },[page, search??'', pageLimit, active??''])
  
  return (
    <>
    {loading ? <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2}/>
    :  <RoomTable
        data={rooms}
        totalItems={totalItems}
        columns={roomColumns(setRooms)}
      />}
    </>
  );
}
