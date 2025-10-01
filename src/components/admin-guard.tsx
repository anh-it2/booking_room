'use client';
import Loading from '@/app/loading';
import { useRoleState } from '@/store/useRoleState';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const role = useRoleState((state) => state.role);
  const router = useRouter();
  useEffect(() => {
    if (role === 'USER') {
      router.push('/dashboard/user/booking');
    }
  }, [role, router]);

  if (role === 'USER') {
    return (
      <div className='relative z-50 flex h-screen w-screen items-center justify-center bg-gray-200'>
        <Loading />
      </div>
    );
  }
  return <>{children}</>;
};

export default AdminGuard;
