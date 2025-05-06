'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  Settings,
  Boxes,
  Tags,
  BarChart,
  Store,
  Bell,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  
  const routes = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/admin',
      active: pathname === '/admin',
    },
    {
      label: 'Products',
      icon: Package,
      href: '/admin/products',
      active: pathname?.startsWith('/admin/products'),
    },
    {
      label: 'Categories',
      icon: Boxes,
      href: '/admin/categories',
      active: pathname?.startsWith('/admin/categories'),
    },
    {
      label: 'Orders',
      icon: ShoppingBag,
      href: '/admin/orders',
      active: pathname?.startsWith('/admin/orders'),
    },
    {
      label: 'Customers',
      icon: Users,
      href: '/admin/customers',
      active: pathname?.startsWith('/admin/customers'),
    },
    {
      label: 'Sellers',
      icon: Store,
      href: '/admin/sellers',
      active: pathname?.startsWith('/admin/sellers'),
    },
    {
      label: 'Marketing',
      icon: Tags,
      href: '/admin/marketing',
      active: pathname?.startsWith('/admin/marketing'),
    },
    {
      label: 'Analytics',
      icon: BarChart,
      href: '/admin/analytics',
      active: pathname?.startsWith('/admin/analytics'),
    },
    {
      label: 'Notifications',
      icon: Bell,
      href: '/admin/notifications',
      active: pathname?.startsWith('/admin/notifications'),
    },
    {
      label: 'Settings',
      icon: Settings,
      href: '/admin/settings',
      active: pathname?.startsWith('/admin/settings'),
    },
  ];

  return (
    <div className="flex flex-col h-screen border-r w-64 bg-card">
      <div className="p-6">
        <Link href="/admin" className="flex items-center space-x-2">
          <ShoppingBag className="h-6 w-6" />
          <span className="font-bold text-xl">ShopHub</span>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">Admin Dashboard</p>
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