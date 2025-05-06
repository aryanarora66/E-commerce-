'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';
import { formatPrice } from '@/lib/utils';
import { 
  ArrowUp, 
  ArrowDown,
  Users, 
  ShoppingBag, 
  DollarSign,
  BarChart as BarChartIcon,
  Eye,
  MoreHorizontal,
  ArrowUpRight 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminOverview() {
  // Sample data for charts
  const revenueData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 5000 },
    { name: 'Mar', revenue: 6000 },
    { name: 'Apr', revenue: 7500 },
    { name: 'May', revenue: 8500 },
    { name: 'Jun', revenue: 7800 },
    { name: 'Jul', revenue: 9500 },
    { name: 'Aug', revenue: 11000 },
    { name: 'Sep', revenue: 10500 },
    { name: 'Oct', revenue: 12000 },
    { name: 'Nov', revenue: 15000 },
    { name: 'Dec', revenue: 16500 },
  ];
  
  const categoryData = [
    { name: 'Electronics', value: 35 },
    { name: 'Clothing', value: 25 },
    { name: 'Home & Kitchen', value: 15 },
    { name: 'Books', value: 10 },
    { name: 'Beauty', value: 15 },
  ];
  
  const topProducts = [
    { name: 'Wireless Earbuds', sales: 145, revenue: 7250, growth: 12.5 },
    { name: 'Smart Watch', sales: 132, revenue: 13200, growth: 8.3 },
    { name: 'Bluetooth Speaker', sales: 97, revenue: 5820, growth: -3.7 },
    { name: 'Laptop Sleeve', sales: 89, revenue: 2670, growth: 5.1 },
    { name: 'Phone Case', sales: 76, revenue: 1520, growth: 1.8 },
  ];
  
  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, Admin! Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Download Report</Button>
          <Button>
            <Eye className="mr-2 h-4 w-4" />
            View Store
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <h3 className="text-2xl font-bold">{formatPrice(128456)}</h3>
              <div className="flex items-center text-sm text-green-600">
                <ArrowUp className="h-4 w-4 mr-1" />
                12.5%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">+$12,234 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Orders</p>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <h3 className="text-2xl font-bold">1,234</h3>
              <div className="flex items-center text-sm text-green-600">
                <ArrowUp className="h-4 w-4 mr-1" />
                8.3%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">+286 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Customers</p>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <h3 className="text-2xl font-bold">3,567</h3>
              <div className="flex items-center text-sm text-green-600">
                <ArrowUp className="h-4 w-4 mr-1" />
                5.7%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">+453 new customers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
              <BarChartIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <h3 className="text-2xl font-bold">3.2%</h3>
              <div className="flex items-center text-sm text-red-600">
                <ArrowDown className="h-4 w-4 mr-1" />
                0.4%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">-0.1% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-5">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue for the current year</CardDescription>
              </div>
              <Tabs defaultValue="revenue">
                <TabsList className="h-8">
                  <TabsTrigger value="revenue" className="text-xs">Revenue</TabsTrigger>
                  <TabsTrigger value="orders" className="text-xs">Orders</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[300px] px-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
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
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary)/0.2)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Top performing categories</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Selling Products</CardTitle>
                <CardDescription>Products with highest sales volume</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{product.name}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="mr-4">{product.sales} units sold</span>
                      <span>{formatPrice(product.revenue)}</span>
                    </div>
                  </div>
                  <div className={`flex items-center ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.growth >= 0 ? (
                      <ArrowUp className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(product.growth)}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button asChild variant="ghost" className="w-full">
              <a href="/admin/products">View All Products</a>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer orders</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Order #45692</p>
                  <p className="text-sm text-muted-foreground">12 minutes ago</p>
                </div>
                <Badge variant="outline">Processing</Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Order #45691</p>
                  <p className="text-sm text-muted-foreground">43 minutes ago</p>
                </div>
                <Badge variant="outline">Shipped</Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Order #45690</p>
                  <p className="text-sm text-muted-foreground">1 hour ago</p>
                </div>
                <Badge variant="outline">Delivered</Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Order #45689</p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
                <Badge variant="outline">Delivered</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button asChild variant="ghost" className="w-full">
              <a href="/admin/orders">View All Orders</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}