'use client'
import Loading from '@/app/loading'
import { useRoleState } from '@/store/useRoleState'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const UserGuard = ({children}:{children: React.ReactNode}) => {
    const role = useRoleState((state) => state.role)
    const router = useRouter()
    useEffect(() => {
        if(role==='ADMIN') {router.push('/dashboard/admin/location')}
    },[role, router])

    if( role === 'ADMIN'){
        return <div className='bg-gray-200 z-50 relative h-screen w-screen flex items-center justify-center'>
            <Loading />
        </div>
    }
  return (
    <>
        {children}
    </>
  )
}

export default UserGuard