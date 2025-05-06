'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CheckoutSummary from '@/components/checkout/checkout-summary';
import AddressForm from '@/components/checkout/address-form';
import PaymentForm from '@/components/checkout/payment-form';
import OrderReview from '@/components/checkout/order-review';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Truck, CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { items } = useCart();
  const [step, setStep] = useState('address');
  const [addressData, setAddressData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  const handleAddressSubmit = (data: any) => {
    setAddressData(data);
    setStep('payment');
  };

  const handlePaymentSubmit = (data: any) => {
    setPaymentData(data);
    setStep('review');
  };

  const handlePlaceOrder = () => {
    // In a real application, this would submit the order to the backend
    toast({
      title: "Order placed successfully!",
      description: "Your order has been received and is being processed.",
    });
    router.push('/checkout/success');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs value={step} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="address" disabled={step !== 'address'}>
                <Truck className="h-4 w-4 mr-2" />
                Shipping
              </TabsTrigger>
              <TabsTrigger value="payment" disabled={step !== 'payment' && step !== 'review'}>
                <CreditCard className="h-4 w-4 mr-2" />
                Payment
              </TabsTrigger>
              <TabsTrigger value="review" disabled={step !== 'review'}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Review
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="address" className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
              <Separator className="mb-6" />
              <AddressForm onSubmit={handleAddressSubmit} />
            </TabsContent>
            
            <TabsContent value="payment" className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
              <Separator className="mb-6" />
              <PaymentForm onSubmit={handlePaymentSubmit} />
            </TabsContent>
            
            <TabsContent value="review" className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>
              <Separator className="mb-6" />
              <OrderReview 
                addressData={addressData} 
                paymentData={paymentData}
                items={items}
                onPlaceOrder={handlePlaceOrder}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-1">
          <CheckoutSummary items={items} />
        </div>
      </div>
    </div>
  );
}