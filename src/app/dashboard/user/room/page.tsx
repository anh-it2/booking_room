import PageContainer from '@/components/layout/page-container';
import AddNewButton from '@/components/ui/AddNewButton';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import UserRoomListingPage from '@/features/room/user/components/user-room-listing';
import { searchParamsCache } from '@/lib/searchparams';
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
          <AddNewButton text="User doesn't have permission to create a new Meeting Room"/>
        </div>
        <Separator />
        
        <UserRoomListingPage />
      </div>
    </PageContainer>
  );
}
