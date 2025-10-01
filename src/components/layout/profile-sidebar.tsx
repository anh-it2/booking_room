'use client';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { useMediaQuery } from '@/hooks/use-media-query';
import { ProfileNavItem } from '@/types';
import { IconPhotoUp } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { Icons } from '../icons';
export const company = {
  name: 'Acme Inc',
  logo: IconPhotoUp,
  plan: 'Enterprise'
};

const tenants = [
  { id: '1', name: 'Acme Inc' },
  { id: '2', name: 'Beta Corp' },
  { id: '3', name: 'Gamma Ltd' }
];

export default function ProfileSidebar({
  navItems
}: {
  navItems: ProfileNavItem[];
}) {
  const pathname = usePathname();
  console.log(pathname);
  const { isOpen } = useMediaQuery();
  const router = useRouter();
  const handleSwitchTenant = (_tenantId: string) => {
    // Tenant switching functionality would be implemented here
  };

  const activeTenant = tenants[0];

  React.useEffect(() => {
    // Side effects based on sidebar state changes
  }, [isOpen]);

  return (
    <div className='rounded-tl-2xl border-none p-5'>
      <SidebarHeader className='text-2xl font-bold'>Account</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='text-base text-gray-500'>
            Manage your account infor
          </SidebarGroupLabel>
        </SidebarGroup>
        <SidebarContent>
          {navItems.map((item) => {
            const Icon = item.icon ? Icons[item.icon] : Icons.logo;
            return (
              <SidebarMenuItem key={item.title} className='list-none'>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={pathname === item.url}
                  className={`hover:bg-[#e6e6e6]`}
                >
                  <Link href={item.url}>
                    <Icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarContent>
      </SidebarContent>
    </div>
  );
}
