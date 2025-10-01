import KBar from '@/components/kbar';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import UserGuard from '@/components/user-guard';
import { navUserItems } from '@/constants/data';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Persisting the sidebar state in the cookie.
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  return (
    <UserGuard>
      <KBar navItems={navUserItems}>
        {/* check màn hình và kiểm soát đóng mở sidebar */}
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar navItems={navUserItems}/>
          <SidebarInset>
            <Header />
            {/* page main content */}
              {children}
            {/* page main content ends */}
          </SidebarInset>
        </SidebarProvider>
      </KBar>
    </UserGuard>
  );
}
