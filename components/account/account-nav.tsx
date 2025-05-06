'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  User,
  Package,
  Heart,
  Home,
  Settings,
  CreditCard,
  MessageSquare,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export default function AccountNav() {
  const pathname = usePathname();
  const { logout } = useAuth();
  
  const routes = [
    {
      href: '/account',
      label: 'Account Overview',
      icon: User,
      exact: true,
    },
    {
      href: '/account/orders',
      label: 'Orders',
      icon: Package,
    },
    {
      href: '/account/wishlist',
      label: 'Wishlist',
      icon: Heart,
    },
    {
      href: '/account/addresses',
      label: 'Addresses',
      icon: Home,
    },
    {
      href: '/account/payment-methods',
      label: 'Payment Methods',
      icon: CreditCard,
    },
    {
      href: '/account/messages',
      label: 'Messages',
      icon: MessageSquare,
    },
    {
      href: '/account/settings',
      label: 'Settings',
      icon: Settings,
    },
    {
      href: '/help',
      label: 'Help',
      icon: HelpCircle,
    },
  ];
  
  const isActiveRoute = (route: typeof routes[0]) => {
    if (route.exact) {
      return pathname === route.href;
    }
    return pathname?.startsWith(route.href);
  };

  return (
    <div className="bg-card rounded-lg shadow-sm p-4 space-y-1">
      <div className="font-medium px-2 pb-2 text-muted-foreground text-sm">Account</div>
      
      {routes.map((route) => (
        <Button
          key={route.href}
          variant="ghost"
          className={cn(
            "w-full justify-start font-normal",
            isActiveRoute(route) && "bg-muted font-medium"
          )}
          asChild
        >
          <Link href={route.href}>
            <route.icon className="mr-2 h-4 w-4" />
            {route.label}
          </Link>
        </Button>
      ))}
      
      <Button 
        variant="ghost" 
        className="w-full justify-start font-normal text-destructive hover:bg-destructive/10 hover:text-destructive"
        onClick={() => logout()}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  );
}