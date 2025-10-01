'use client'
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { initData } from '@/constants/apiLocation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProductTable } from './product-tables';
import { columns } from './product-tables/columns';

type ProductListingPage = {};

export default  function ProductListingPage({}: ProductListingPage) {

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
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() =>{

    async function fetchData() {

      setLoading(true)

      await initData.initialize()
      const data = initData.getLocations(filters)
      setLocations(data.locations)

      setLoading(false)
    }
    fetchData()
  },[page, search??'', pageLimit, active??''])
  
  return ( 
    <>
      {loading ? <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2}/> 
      :<ProductTable
           data={locations}
           totalItems={locations.length}
           columns={columns}
         />}
    </>
  );
}
