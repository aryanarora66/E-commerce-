'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types';
import { CheckCircle, Tag } from 'lucide-react';

interface CartSummaryProps {
  items: Product[];
}

export default function CartSummary({ items }: CartSummaryProps) {
  const { toast } = useToast();
  const [promoCode, setPromoCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [appliedCode, setAppliedCode] = useState<string | null>(null);

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.07;
  const total = subtotal - discount + shipping + tax;

  const handleApplyCoupon = () => {
    if (!promoCode.trim()) return;
    
    setIsApplying(true);
    
    // Simulate API call for coupon validation
    setTimeout(() => {
      if (promoCode.toUpperCase() === 'SAVE10') {
        const discountAmount = subtotal * 0.1;
        setDiscount(discountAmount);
        setAppliedCode(promoCode.toUpperCase());
        toast({
          title: "Coupon applied",
          description: `You saved ${formatPrice(discountAmount)}!`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Invalid coupon",
          description: "The coupon code you entered is invalid or expired.",
        });
      }
      setIsApplying(false);
    }, 600);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Promo Code Input */}
        <div className="space-y-2">
          <div className="text-sm font-medium flex items-center">
            <Tag className="h-4 w-4 mr-1" />
            Promo Code
          </div>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              disabled={isApplying || !!appliedCode}
            />
            <Button 
              onClick={handleApplyCoupon} 
              disabled={isApplying || !!appliedCode}
              className="shrink-0"
            >
              {isApplying ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2 h-3 w-3 border-2 border-current border-t-transparent rounded-full"></span>
                  Applying
                </span>
              ) : (
                'Apply'
              )}
            </Button>
          </div>
          
          {appliedCode && (
            <div className="text-xs flex items-center text-green-600 dark:text-green-500">
              <CheckCircle className="h-3 w-3 mr-1" />
              <span>
                <span className="font-medium">{appliedCode}</span> has been applied to your order
              </span>
            </div>
          )}
        </div>
        
        <Separator />
        
        {/* Order Details */}
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600 dark:text-green-500">
              <span>Discount</span>
              <span>-{formatPrice(discount)}</span>
            </div>
          )}
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
        
        {/* Additional Information */}
        {shipping === 0 && (
          <div className="text-xs text-green-600 dark:text-green-500 text-center">
            You qualify for free shipping!
          </div>
        )}
      </CardContent>
    </Card>
  );
}