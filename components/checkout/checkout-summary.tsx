import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import { ShieldCheck } from 'lucide-react';
import { Product } from '@/types';

interface CheckoutSummaryProps {
  items: Product[];
}

export default function CheckoutSummary({ items }: CheckoutSummaryProps) {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="w-16 h-16 bg-muted rounded-md overflow-hidden">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm leading-tight">{item.name}</p>
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Separator />
        
        {/* Order Details */}
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax (7%)</span>
            <span>{formatPrice(tax)}</span>
          </div>
        </div>
        
        <Separator />
        
        {/* Total */}
        <div className="flex justify-between font-medium text-lg">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
        
        {/* Security Badge */}
        <div className="mt-4 flex items-center justify-center gap-2 bg-muted/50 p-3 rounded-lg">
          <ShieldCheck className="h-4 w-4 text-green-500" />
          <span className="text-xs text-muted-foreground">
            Secure Checkout • SSL Encrypted
          </span>
        </div>
        
        {/* Shipping Badge */}
        {shipping === 0 && (
          <Badge variant="outline" className="w-full justify-center bg-green-500/10 hover:bg-green-500/10 text-green-500 border-green-500/20">
            Free Shipping
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}