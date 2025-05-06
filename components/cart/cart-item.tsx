'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItemProps {
  item: Product;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateItemQuantity, removeItem } = useCart();
  const { toast } = useToast();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > 10) return;
    updateItemQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    setIsRemoving(true);
    
    setTimeout(() => {
      removeItem(item.id);
      setIsRemoving(false);
      toast({
        title: "Item removed",
        description: `${item.name} has been removed from your cart.`,
      });
    }, 300);
  };

  return (
    <div className={`flex flex-col sm:flex-row gap-4 py-4 border-b transition-opacity duration-300 ${isRemoving ? 'opacity-50' : 'opacity-100'}`}>
      <div className="flex-shrink-0">
        <Link href={`/products/${item.id}`} className="block">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-md overflow-hidden bg-muted">
            <img
              src={item.images[0]}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </div>
      
      <div className="flex-1 space-y-1 sm:space-y-2">
        <Link href={`/products/${item.id}`} className="block">
          <h3 className="font-medium leading-tight hover:text-primary transition-colors">
            {item.name}
          </h3>
        </Link>
        
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          {item.variant && (
            <span>
              {item.variantType || 'Variant'}: {item.variant.name}
            </span>
          )}
          <span>Brand: {item.brand}</span>
        </div>
        
        <div className="flex flex-wrap items-center justify-between gap-2 mt-auto pt-2">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={item.quantity >= 10}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="space-x-4 flex items-center">
            <span className="font-medium">
              {formatPrice(item.price * item.quantity)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={handleRemove}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}