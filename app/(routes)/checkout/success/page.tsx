import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Home, Package } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);
  
  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <div className="max-w-xl w-full">
        <div className="flex justify-center mb-8">
          <div className="bg-primary/10 rounded-full p-6">
            <CheckCircle className="h-16 w-16 text-primary" />
          </div>
        </div>
        
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Order Confirmed!</CardTitle>
            <CardDescription className="text-lg mt-2">
              Thank you for your purchase
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-muted rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="font-medium">{orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                  <p className="font-medium">{estimatedDelivery.toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">What's Next?</h3>
              <Separator className="mb-4" />
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                    <Package className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Preparing your order</p>
                    <p className="text-sm text-muted-foreground">We'll notify you when your order ships.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                    <Home className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Delivery to your address</p>
                    <p className="text-sm text-muted-foreground">Your order will be delivered in 3-5 business days.</p>
                  </div>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button asChild className="w-full">
              <Link href="/account/orders">Track Your Order</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}