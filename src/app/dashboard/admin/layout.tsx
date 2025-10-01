
import AdminGuard from '@/components/admin-guard';
import KBar from '@/components/kbar';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { navAdminItems } from '@/constants/data';
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
    <AdminGuard>
      <KBar navItems={navAdminItems}>
        {/* check màn hình và kiểm soát đóng mở sidebar */}
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar navItems={navAdminItems}/>
          <SidebarInset>
            <Header />
            {/* page main content */}
              {children}
            {/* page main content ends */}
          </SidebarInset>
        </SidebarProvider>
      </KBar>
    </AdminGuard>
  );
}
