'use client'
import Loading from '@/app/loading'
import { useRoleState } from '@/store/useRoleState'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const AdminGuard = ({children}:{children: React.ReactNode}) => {
    const role = useRoleState((state) => state.role)
    console.log(role)
    const router = useRouter()
    useEffect(() => {
        if(role==='USER') {router.push('/dashboard/user/booking')}
    },[role, router])

    if( role === 'USER'){
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

export default AdminGuard