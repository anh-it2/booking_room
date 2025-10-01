import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import LocationViewPage from '@/features/locations/admin/components/location-view-page';

import { Suspense } from 'react';


export const metadata = {
  title: 'Dashboard : Location View'
};

type PageProps = { params: Promise<{locationId: string}> };

export default async function Page({params}: PageProps) {
  const locationId = (await params).locationId 
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <LocationViewPage locationId={locationId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
