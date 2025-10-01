'use client'

import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { initData } from '@/constants/apiUsers';
import { useLoadingState } from '@/store/useLoadingState';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserTable } from './users-table';
import { userColumns } from './users-table/userColumn';

type ProductListingPage = {};

export default  function UserListingPage({}: ProductListingPage) {

  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get('page')??"1")
  const search = searchParams.get('username')
  const pageLimit = parseInt(searchParams.get('perPage')??"10")
  const active = searchParams.get('active')
  const filters = {
    page,
    limit: pageLimit,
    ...(search && {search}),
    ...(active && {active: active})
  }
  const [users, setUsers] = useState<any>([])
  const loading = useLoadingState((state) => state.loading)
  const setLoading = useLoadingState((state) => state.setLoading)
  const [totalItems, setTotalItems] = useState<number>(0)
  useEffect(() =>{

    async function fetchData() {

      setLoading(true)
      await initData.initialize()
      const data = initData.getUsers(filters)
      setTotalItems(data.total_users)
      setUsers(data.users)
      setLoading(false)
    }
    fetchData()
  },[page, search??'', pageLimit, active??''])
  
  return (
    <>
    {loading? <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2}/>
    :  <UserTable
        data={users}
        totalItems={totalItems}
        columns={userColumns(setUsers)}
      />}
    </>
  );
}
