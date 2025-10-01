'use client';
import { useRoleState } from '@/store/useRoleState';
import { useEffect, useState } from 'react';
import Loading from './loading';

export default function Page() {
  const role = useRoleState((state) => state.role);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      if (role === 'ADMIN') {
        window.location.href = '/dashboard/admin/location';
      } else {
        window.location.href = '/dashboard/user/booking';
      }
    } else {
      window.location.href = '/auth/sign-in';
    }
  }, [role]);

  if (!mounted) return null;
  return (
    <div className='flex h-screen items-center justify-center'>
      <Loading />
    </div>
  );
}
