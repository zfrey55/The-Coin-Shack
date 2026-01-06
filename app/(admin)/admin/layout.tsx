'use client';
import { useStore } from '@/lib/store';
import { redirect } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { AdminNav } from '@/components/admin/AdminNav';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const isAdmin = useStore((state: { isAdmin: () => boolean }) => state.isAdmin());
  
  useEffect(() => {
    if (!isAdmin) {
      redirect('/');
    }
  }, [isAdmin]);
  
  if (!isAdmin) return null;
  
  return (
    <div className="min-h-screen">
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-display">Admin Dashboard</h1>
        </div>
      </nav>
      <AdminNav />
      {children}
    </div>
  );
}

