import AdminNav from '@/components/organisms/main/adminNav/AdminNav';
import React from 'react';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-100 flex flex-col lg:flex-row text-stone-800 font-sans">
      {/* 🧭 Sidebar Navigation - Rendered once at layout frame boundary */}
      <AdminNav  />

      {/* 🏛️ Active Main Content Canvas View Router Output */}
      <main className="grow p-4 sm:p-8 space-y-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}