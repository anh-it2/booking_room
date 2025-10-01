'use client'

import { initData } from '@/constants/apiLocation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LocationTable } from './locations-table';

import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { useLoadingState } from '@/store/useLoadingState';
import { locationColumns } from './locations-table/locationColumn';

type ProductListingPage = {};

export default  function LocationListingPage({}: ProductListingPage) {

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
  const [locations, setLocations] = useState<any>([])
  const loading = useLoadingState((state) => state.loading)
  const setLoading = useLoadingState((state) => state.setLoading)
  const [totalItems, setTotalItems] = useState<number>(0)
  useEffect(() =>{

    async function fetchData() {

      setLoading(true)
      await initData.initialize()
      const data = initData.getLocations(filters)
      setTotalItems(data.total_locations)
      setLocations(data.locations)
      setLoading(false)
    }
    fetchData()
  },[page, search??'', pageLimit, active??''])
  
  return (
    <>
    {loading ? <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2}/>
    :  <LocationTable
        data={locations}
        totalItems={totalItems}
        columns={locationColumns(setLocations)}
      />}
    </>
  );
}
