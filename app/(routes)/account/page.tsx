'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AccountNav from '@/components/account/account-nav';
import AccountInfo from '@/components/account/account-info';
import OrdersHistory from '@/components/account/orders-history';
import AddressList from '@/components/account/address-list';
import WishlistItems from '@/components/account/wishlist-items';
import AccountSettings from '@/components/account/account-settings';
import { useAuth } from '@/hooks/use-auth';

export default function AccountPage() {
  const router = useRouter();
  const { user, status } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && status === 'unauthenticated') {
      router.push('/login');
    }
  }, [mounted, status, router]);

  if (!mounted || status === 'loading' || !user) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-lg">Loading account information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <AccountNav />
        </div>
        
        <div className="md:col-span-3">
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid grid-cols-5 w-full mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="addresses">Addresses</TabsTrigger>
                  <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <h2 className="text-xl font-semibold mb-4">Account Overview</h2>
                  <Separator className="mb-6" />
                  <AccountInfo user={user} />
                </TabsContent>
                
                <TabsContent value="orders">
                  <h2 className="text-xl font-semibold mb-4">Order History</h2>
                  <Separator className="mb-6" />
                  <OrdersHistory />
                </TabsContent>
                
                <TabsContent value="addresses">
                  <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>
                  <Separator className="mb-6" />
                  <AddressList />
                </TabsContent>
                
                <TabsContent value="wishlist">
                  <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>
                  <Separator className="mb-6" />
                  <WishlistItems />
                </TabsContent>
                
                <TabsContent value="settings">
                  <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                  <Separator className="mb-6" />
                  <AccountSettings user={user} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}