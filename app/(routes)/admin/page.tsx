'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/admin-sidebar';
import AdminOverview from '@/components/admin/overview';
import { useAuth } from '@/hooks/use-auth';

export default function AdminPage() {
  const router = useRouter();
  const { user, status } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && status !== 'loading') {
      if (!user || user.role !== 'admin') {
        router.push('/login');
      }
    }
  }, [mounted, status, user, router]);

  if (!mounted || status === 'loading' || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-lg">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (user.role !== 'admin') {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <AdminOverview />
      </div>
    </div>
  );
}