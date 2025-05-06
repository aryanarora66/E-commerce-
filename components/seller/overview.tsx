'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowUp, 
  ArrowDown,
  DollarSign,
  BarChart as BarChartIcon,
  Package,
  ShoppingBag,
  AlertTriangle,
  ExternalLink,
  Eye,
  MoreHorizontal,
  Plus
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { formatPrice } from '@/lib/utils';

export default function SellerOverview() {
  // Sample data for charts
  const revenueData = [
    { name: 'Mon', revenue: 1200 },
    { name: 'Tue', revenue: 1800 },
    { name: 'Wed', revenue: 1600 },
    { name: 'Thu', revenue: 2400 },
    { name: 'Fri', revenue: 2200 },
    { name: 'Sat', revenue: 3000 },
    { name: 'Sun', revenue: 2500 },
  ];
  
  const productPerformance = [
    { 
      name: 'Product A',
      sales: 45,
      views: 132,
      conversion: (45 / 132) * 100
    },
    { 
      name: 'Product B',
      sales: 32,
      views: 87,
      conversion: (32 / 87) * 100
    },
    { 
      name: 'Product C',
      sales: 27,
      views: 96,
      conversion: (27 / 96) * 100
    },
    { 
      name: 'Product D',
      sales: 16,
      views: 44,
      conversion: (16 / 44) * 100
    },
  ];
  
  const salesByCategory = [
    { name: 'Electronics', sales: 4000, revenue: 10400 },
    { name: 'Clothing', sales: 3000, revenue: 6000 },
    { name: 'Home', sales: 2000, revenue: 5800 },
    { name: 'Beauty', sales: 1000, revenue: 3200 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Seller Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your store performance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export Report</Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Today's Revenue</p>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <h3 className="text-2xl font-bold">{formatPrice(2546)}</h3>
              <div className="flex items-center text-sm text-green-600">
                <ArrowUp className="h-4 w-4 mr-1" />
                16.5%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">+$423 from yesterday</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">New Orders</p>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <h3 className="text-2xl font-bold">34</h3>
              <div className="flex items-center text-sm text-green-600">
                <ArrowUp className="h-4 w-4 mr-1" />
                8.3%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">+12 from yesterday</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Product Views</p>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <h3 className="text-2xl font-bold">3,427</h3>
              <div className="flex items-center text-sm text-green-600">
                <ArrowUp className="h-4 w-4 mr-1" />
                12.2%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">+486 from yesterday</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
              <BarChartIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <h3 className="text-2xl font-bold">3.6%</h3>
              <div className="flex items-center text-sm text-red-600">
                <ArrowDown className="h-4 w-4 mr-1" />
                0.8%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">-0.3% from yesterday</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Revenue</CardTitle>
            <CardDescription>Your revenue for the past 7 days</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Revenue']}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      borderColor: 'hsl(var(--border))'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ strokeWidth: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
            <CardDescription>Current stock levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Product A</p>
                  <p className="text-sm font-medium">28 in stock</p>
                </div>
                <Progress value={56} />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Product B</p>
                  <p className="text-sm font-medium">14 in stock</p>
                </div>
                <Progress value={28} />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm font-medium">Product C</p>
                    <Badge variant="destructive" className="ml-2">Low</Badge>
                  </div>
                  <p className="text-sm font-medium">4 in stock</p>
                </div>
                <Progress value={8} className="bg-red-200 dark:bg-red-900" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Product D</p>
                  <p className="text-sm font-medium">32 in stock</p>
                </div>
                <Progress value={64} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button variant="outline" className="w-full" asChild>
              <a href="/seller/inventory">View Inventory</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Orders Requiring Attention</CardTitle>
                <CardDescription>4 orders need your attention</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-md flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <p className="font-medium">Order #45692 is awaiting shipment</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    This order is due to ship today. Please prepare the package and update the tracking information.
                  </p>
                  <Button variant="link" className="px-0 h-8" asChild>
                    <a href="/seller/orders/45692">
                      Process Order
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
              
              <div className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Order #45688</p>
                    <p className="text-sm text-muted-foreground">Customer requested cancellation</p>
                  </div>
                  <Badge>Urgent</Badge>
                </div>
              </div>
              
              <div className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Order #45684</p>
                    <p className="text-sm text-muted-foreground">Item out of stock, needs substitution</p>
                  </div>
                  <Badge variant="outline">Medium</Badge>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Order #45679</p>
                    <p className="text-sm text-muted-foreground">Customer inquiry about delivery time</p>
                  </div>
                  <Badge variant="outline">Low</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Revenue distribution across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesByCategory}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    formatter={(value, name) => {
                      return [
                        name === 'revenue' ? `$${value}` : value, 
                        name === 'revenue' ? 'Revenue' : 'Units Sold'
                      ];
                    }}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      borderColor: 'hsl(var(--border))'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="sales" name="Units Sold" fill="hsl(var(--chart-2))" />
                  <Bar dataKey="revenue" name="Revenue" fill="hsl(var(--chart-1))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>Sales and conversion metrics for your top products</CardDescription>
            </div>
            <Button variant="outline" asChild>
              <a href="/seller/analytics">
                View All Analytics
              </a>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted">
                <tr>
                  <th scope="col" className="px-6 py-3">Product Name</th>
                  <th scope="col" className="px-6 py-3 text-right">Views</th>
                  <th scope="col" className="px-6 py-3 text-right">Sales</th>
                  <th scope="col" className="px-6 py-3 text-right">Conversion Rate</th>
                  <th scope="col" className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {productPerformance.map((product, i) => (
                  <tr key={i} className="bg-card border-b last:border-0">
                    <td className="px-6 py-4 font-medium">{product.name}</td>
                    <td className="px-6 py-4 text-right">{product.views}</td>
                    <td className="px-6 py-4 text-right">{product.sales}</td>
                    <td className="px-6 py-4 text-right">{product.conversion.toFixed(1)}%</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="h-8" asChild>
                        <a href={`/seller/products/${product.name.toLowerCase().replace(' ', '-')}`}>
                          View
                        </a>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}