import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import UserRoomViewPage from '@/features/room/user/components/user-room-view-page';
import { Suspense } from 'react';


export const metadata = {
  title: 'Dashboard : Location View'
};

type PageProps = { params: Promise<{roomId: string}> };

export default async function Page({params}: PageProps) {
  const roomId = (await params).roomId 
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <UserRoomViewPage roomId={roomId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
