import PageContainer from "@/components/layout/page-container";
import ProfileSidebar from "@/components/layout/profile-sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { navProfileItems } from "@/constants/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default async function ProfileLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <PageContainer scrollable>
      <div className="px-15 py-10">
        <Card className="flex flex-row p-0 bg-[#f7f7f7]">
          <div className='rounded-tl-xl rounded-bl-xl'>
            <ProfileSidebar navItems={navProfileItems}/>
          </div>
          <div className="flex-1 bg-white rounded-tl-xl rounded-bl-xl border-l-2 p-10">
            <CardContent>
              {children}
            </CardContent>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}