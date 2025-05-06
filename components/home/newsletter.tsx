'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Mail, CheckCircle2 } from 'lucide-react';

export default function Newsletter() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      toast({
        title: "Subscribed!",
        description: "You've been successfully subscribed to our newsletter.",
      });
    }, 1000);
  };

  return (
    <section className="bg-muted/50 rounded-lg p-8">
      <div className="max-w-3xl mx-auto text-center">
        <Mail className="h-10 w-10 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Stay Updated</h2>
        <p className="text-muted-foreground mb-6">
          Subscribe to our newsletter to receive special offers, exclusive discounts, and updates on new products.
        </p>
        
        {isSubscribed ? (
          <div className="flex items-center justify-center space-x-2 text-primary">
            <CheckCircle2 className="h-5 w-5" />
            <span>Thank you for subscribing!</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                  Subscribing...
                </span>
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        )}
        
        <p className="text-xs text-muted-foreground mt-4">
          By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
        </p>
      </div>
    </section>
  );
}