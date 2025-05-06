'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Settings,
  BarChart,
  Truck,
  Clock,
  DollarSign,
  MessageSquare,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export default function SellerSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  
  const routes = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/seller',
      active: pathname === '/seller',
    },
    {
      label: 'Products',
      icon: Package,
      href: '/seller/products',
      active: pathname?.startsWith('/seller/products'),
    },
    {
      label: 'Orders',
      icon: ShoppingBag,
      href: '/seller/orders',
      active: pathname?.startsWith('/seller/orders'),
    },
    {
      label: 'Inventory',
      icon: Truck,
      href: '/seller/inventory',
      active: pathname?.startsWith('/seller/inventory'),
    },
    {
      label: 'Sales',
      icon: DollarSign,
      href: '/seller/sales',
      active: pathname?.startsWith('/seller/sales'),
    },
    {
      label: 'Promotions',
      icon: Clock,
      href: '/seller/promotions',
      active: pathname?.startsWith('/seller/promotions'),
    },
    {
      label: 'Analytics',
      icon: BarChart,
      href: '/seller/analytics',
      active: pathname?.startsWith('/seller/analytics'),
    },
    {
      label: 'Messages',
      icon: MessageSquare,
      href: '/seller/messages',
      active: pathname?.startsWith('/seller/messages'),
    },
    {
      label: 'Settings',
      icon: Settings,
      href: '/seller/settings',
      active: pathname?.startsWith('/seller/settings'),
    },
    {
      label: 'Help',
      icon: HelpCircle,
      href: '/seller/help',
      active: pathname?.startsWith('/seller/help'),
    },
  ];

  return (
    <div className="flex flex-col h-screen border-r w-64 bg-card">
      <div className="p-6">
        <Link href="/seller" className="flex items-center space-x-2">
          <ShoppingBag className="h-6 w-6" />
          <span className="font-bold text-xl">ShopHub</span>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">Seller Dashboard</p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={route.active ? 'secondary' : 'ghost'}
              className={cn('w-full justify-start', route.active && 'font-medium')}
              asChild
            >
              <Link href={route.href}>
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => logout()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}