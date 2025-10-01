import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import RoomListingPage from '@/features/room/admin/components/room-listing';

import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs/server';
export const metadata = {
  title: 'Dashboard: Locations'
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  // const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Meeting Room'
            description='Manage meeting room (Server side table functionalities.)'
          />
          <Link href='/dashboard/admin/location' className={cn(buttonVariants())}>
            <IconPlus /> Add New
          </Link>
        </div>
        <Separator />
        
        <RoomListingPage />
      </div>
    </PageContainer>
  );
}
