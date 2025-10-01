import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import UserViewPage from '@/features/user_management/components/user-view-page';
import { Suspense } from 'react';


export const metadata = {
  title: 'Dashboard : User View'
};

type PageProps = { params: Promise<{userId: string}> };

export default async function Page({params}: PageProps) {
  const userId = (await params).userId 
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <UserViewPage userId={userId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
