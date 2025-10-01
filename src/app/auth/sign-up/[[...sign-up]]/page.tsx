import AuthNavbar from '@/components/layout/auth/AuthNavbar';
import SignUpViewPage from '@/features/auth/components/sign-up-view';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication | Sign Up',
  description: 'Sign Up page for authentication.'
};

export default async function Page() {
  return (
    <>
      <AuthNavbar path='Login' link='/auth/sign-in'/>
      <SignUpViewPage />
    </>
)
}
