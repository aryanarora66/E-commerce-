'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types';
import { CheckCircle, Edit, CreditCard, User, Truck } from 'lucide-react';

interface OrderReviewProps {
  addressData: any;
  paymentData: any;
  items: Product[];
  onPlaceOrder: () => void;
}

export default function OrderReview({ 
  addressData, 
  paymentData, 
  items,
  onPlaceOrder,
}: OrderReviewProps) {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;
  
  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    
    // Simulate API call delay
    setTimeout(() => {
      onPlaceOrder();
      setIsPlacingOrder(false);
    }, 1000);
  };

  if (!addressData || !paymentData) {
    return (
      <div className="text-center py-8">
        <p>Please complete previous steps before reviewing your order.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2 text-primary" />
              <h3 className="font-medium">Shipping Address</h3>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>{addressData.fullName}</p>
              <p>{addressData.addressLine1}</p>
              {addressData.addressLine2 && <p>{addressData.addressLine2}</p>}
              <p>{addressData.city}, {addressData.state} {addressData.postalCode}</p>
              <p>{addressData.country}</p>
              <p>{addressData.phoneNumber}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="?step=address">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Link>
          </Button>
        </div>
        
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-primary" />
              <h3 className="font-medium">Payment Method</h3>
            </div>
            <div className="text-sm text-muted-foreground">
              {paymentData.paymentMethod === 'creditCard' ? (
                <p>Credit Card ending in {paymentData.cardNumber?.slice(-4)}</p>
              ) : (
                <p>PayPal</p>
              )}
            </div>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="?step=payment">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Link>
          </Button>
        </div>
        
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center">
              <Truck className="h-4 w-4 mr-2 text-primary" />
              <h3 className="font-medium">Shipping Method</h3>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Standard Shipping (3-5 business days)</p>
              <p>{shipping === 0 ? 'Free' : formatPrice(shipping)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="font-medium mb-3">Order Items ({items.length})</h3>
        <div className="space-y-4">
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
                <p className="font-medium text-sm">{item.name}</p>
                {item.variant && (
                  <p className="text-xs text-muted-foreground">
                    {item.variantType || 'Variant'}: {item.variant.name}
                  </p>
                )}
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-2">
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
        <Separator />
        <div className="flex justify-between font-medium text-lg pt-2">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
      
      <div className="bg-muted/50 p-4 rounded-md">
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium">Order Confirmation</p>
            <p className="text-muted-foreground">
              By clicking "Place Order", you agree to ShopHub's Terms of Service and Privacy Policy. 
              Your order information will be used to process your purchase.
            </p>
          </div>
        </div>
      </div>
      
      <Button 
        className="w-full" 
        size="lg" 
        onClick={handlePlaceOrder}
        disabled={isPlacingOrder}
      >
        {isPlacingOrder ? (
          <span className="flex items-center justify-center">
            <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
            Processing Order...
          </span>
        ) : (
          `Place Order • ${formatPrice(total)}`
        )}
      </Button>
    </div>
  );
}