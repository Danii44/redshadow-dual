import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminDashboardClient from './AdminDashboardClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Studio Admin Portal | Red Shadow Designs',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session')?.value;

  if (session !== 'authenticated_admin') {
    redirect('/admin/login');
  }

  return <AdminDashboardClient />;
}
