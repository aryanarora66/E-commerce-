'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/use-cart';
import { Trash2, ShoppingCart, Heart } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { getWishlist } from '@/lib/services/user-service';

export default function WishlistItems() {
  const { toast } = useToast();
  const { addItem } = useCart();
  const [items, setItems] = useState(getWishlist());
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  
  const handleRemoveItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your wishlist.",
    });
  };
  
  const handleAddToCart = (item: any) => {
    setIsLoading(prev => ({ ...prev, [item.id]: true }));
    
    // Simulate API call
    setTimeout(() => {
      addItem(item);
      setIsLoading(prev => ({ ...prev, [item.id]: false }));
      
      toast({
        title: "Added to cart",
        description: `${item.name} has been added to your cart.`,
      });
    }, 600);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-10 border rounded-lg">
        <Heart className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
        <p className="text-muted-foreground mb-4">
          Save items you love for later by clicking the heart icon on product pages.
        </p>
        <Button asChild>
          <a href="/products">Discover Products</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative pt-[100%]">
              <img
                src={item.images[0]}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium line-clamp-1">{item.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {item.brand}
              </p>
              <div className="flex justify-between items-center">
                <span className="font-semibold">
                  {formatPrice(item.price)}
                </span>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleAddToCart(item)}
                    disabled={isLoading[item.id]}
                  >
                    {isLoading[item.id] ? (
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <ShoppingCart className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}