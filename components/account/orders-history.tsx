'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/utils';
import { getOrders } from '@/lib/services/order-service';
import { Search, Eye, FileText } from 'lucide-react';

export default function OrdersHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const orders = getOrders();
  
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'default';
      case 'processing':
        return 'secondary';
      case 'shipped':
        return 'outline';
      case 'canceled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="canceled">Canceled</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <OrdersTable 
            orders={filteredOrders} 
            getBadgeVariant={getBadgeVariant} 
          />
        </TabsContent>
        
        <TabsContent value="processing" className="mt-4">
          <OrdersTable 
            orders={filteredOrders.filter(o => o.status === 'processing')} 
            getBadgeVariant={getBadgeVariant} 
          />
        </TabsContent>
        
        <TabsContent value="shipped" className="mt-4">
          <OrdersTable 
            orders={filteredOrders.filter(o => o.status === 'shipped')} 
            getBadgeVariant={getBadgeVariant} 
          />
        </TabsContent>
        
        <TabsContent value="delivered" className="mt-4">
          <OrdersTable 
            orders={filteredOrders.filter(o => o.status === 'delivered')} 
            getBadgeVariant={getBadgeVariant} 
          />
        </TabsContent>
        
        <TabsContent value="canceled" className="mt-4">
          <OrdersTable 
            orders={filteredOrders.filter(o => o.status === 'canceled')} 
            getBadgeVariant={getBadgeVariant} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function OrdersTable({ 
  orders, 
  getBadgeVariant 
}: { 
  orders: any[], 
  getBadgeVariant: (status: string) => string 
}) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No orders found.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge variant={getBadgeVariant(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{formatPrice(order.total)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    asChild
                  >
                    <Link href={`/account/orders/${order.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    asChild
                  >
                    <Link href={`/account/orders/${order.id}/invoice`}>
                      <FileText className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}