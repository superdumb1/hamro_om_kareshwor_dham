// app/(admin)/layout.tsx
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  // If no session, act like this page doesn't exist
  if (!session) {
    notFound(); 
  }

 

  return (
    <div className="flex h-screen bg-bg-primary text-text-primary">
      {/* Sidebar & Dashboard UI */}
      <aside className="w-64 bg-bg-shaded border-r border-border">
         {/* Nav links... */}
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}