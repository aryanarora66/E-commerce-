'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SellerSidebar from '@/components/seller/seller-sidebar';
import SellerOverview from '@/components/seller/overview';
import { useAuth } from '@/hooks/use-auth';

export default function SellerPage() {
  const router = useRouter();
  const { user, status } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && status !== 'loading') {
      if (!user || user.role !== 'seller') {
        router.push('/login');
      }
    }
  }, [mounted, status, user, router]);

  if (!mounted || status === 'loading' || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-lg">Loading seller dashboard...</p>
        </div>
      </div>
    );
  }

  if (user.role !== 'seller') {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <SellerSidebar />
      <div className="flex-1 p-8">
        <SellerOverview />
      </div>
    </div>
  );
}