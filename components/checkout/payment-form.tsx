'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CreditCard, ShieldCheck } from 'lucide-react';

const paymentSchema = z.object({
  paymentMethod: z.enum(['creditCard', 'paypal']),
  cardNumber: z.string().regex(/^\d{16}$/, 'Card number must be 16 digits').optional(),
  cardholderName: z.string().min(2, 'Cardholder name is required').optional(),
  expiryMonth: z.string().min(1, 'Month is required').optional(),
  expiryYear: z.string().min(1, 'Year is required').optional(),
  cvv: z.string().regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits').optional(),
}).refine(
  (data) => {
    if (data.paymentMethod === 'creditCard') {
      return !!data.cardNumber && !!data.cardholderName && !!data.expiryMonth && !!data.expiryYear && !!data.cvv;
    }
    return true;
  },
  {
    message: 'Credit card details are required',
  }
);

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  onSubmit: (data: PaymentFormValues) => void;
}

export default function PaymentForm({ onSubmit }: PaymentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: 'creditCard',
      cardNumber: '',
      cardholderName: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
    },
  });
  
  const watchPaymentMethod = form.watch('paymentMethod');
  
  const handleSubmit = (values: PaymentFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      onSubmit(values);
      setIsSubmitting(false);
    }, 600);
  };
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => (currentYear + i).toString());

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Payment Method</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-3"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="creditCard" id="creditCard" />
                    </FormControl>
                    <FormLabel htmlFor="creditCard" className="font-normal cursor-pointer flex items-center">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Credit or Debit Card
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="paypal" id="paypal" />
                    </FormControl>
                    <FormLabel htmlFor="paypal" className="font-normal cursor-pointer flex items-center">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.5 8.5H18C17.1716 8.5 16.5 9.17157 16.5 10V11.5H19.5V13.5H16.5V18.5H14.5V13.5H12.5V11.5H14.5V9.5C14.5 7.84315 15.8431 6.5 17.5 6.5H19.5V8.5Z" fill="#1877F2"/>
                        <path d="M4 7.5C4 5.84315 5.34315 4.5 7 4.5H17C18.6569 4.5 20 5.84315 20 7.5V16.5C20 18.1569 18.6569 19.5 17 19.5H7C5.34315 19.5 4 18.1569 4 16.5V7.5Z" stroke="#1877F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      PayPal
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {watchPaymentMethod === 'creditCard' && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="1234 5678 9012 3456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="cardholderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cardholder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="expiryMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Month</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="MM" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => {
                          const month = (i + 1).toString().padStart(2, '0');
                          return (
                            <SelectItem key={month} value={month}>
                              {month}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="expiryYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="YY" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input placeholder="123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}
        
        <div className="flex items-center space-x-2 bg-muted/50 p-3 rounded-md text-sm">
          <ShieldCheck className="h-4 w-4 text-green-500" />
          <p className="text-muted-foreground">
            Your payment information is encrypted and secure.
          </p>
        </div>
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
              Processing...
            </span>
          ) : (
            'Continue to Review'
          )}
        </Button>
      </form>
    </Form>
  );
}