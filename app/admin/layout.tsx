import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AdminNav from '@/components/organisms/main/adminNav/AdminNav';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Fetch the session directly on the server
  const session = await getServerSession();

  // 2. If no session, redirect immediately (server-side redirect)
  if (!session) {
    redirect('/login');
  }

  // 3. If session exists, render the dashboard
  return (
    <div className="min-h-screen bg-stone-100 flex flex-col lg:flex-row text-stone-800 font-sans">
      <AdminNav />
      <main className="grow p-4 sm:p-8 space-y-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}