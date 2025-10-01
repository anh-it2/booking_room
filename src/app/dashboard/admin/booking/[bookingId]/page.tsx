import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import BookingViewPage from '@/features/booking/admin/components/booking-view-page';
import { Suspense } from 'react';


export const metadata = {
  title: 'Dashboard : Booking View'
};

type PageProps = { params: Promise<{bookingId: string}> };

export default async function Page({params}: PageProps) {
  const bookingId = (await params).bookingId 
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <BookingViewPage bookingId={bookingId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
