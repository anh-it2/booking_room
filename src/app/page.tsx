'use client';
import { useRoleState } from '@/store/useRoleState';
import { useEffect } from 'react';

export default function Page() {
  const role = useRoleState((state) => state.role);
  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken !== null) {
      if (role === 'ADMIN') {
        window.location.href = 'dashboard/admin/location';
      } else {
        window.location.href = 'dashboard/user/booking';
      }
    } else {
      window.location.href = 'auth/sign-in';
    }
  }, [role]);

  return null;
}
