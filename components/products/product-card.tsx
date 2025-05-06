'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/use-cart';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  hideActions?: boolean;
}

export default function ProductCard({ product, hideActions = false }: ProductCardProps) {
  const { toast } = useToast();
  const { addItem } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const discountPercentage = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100) 
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      addItem(product);
      setIsLoading(false);
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
      });
    }, 500);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-md group relative">
        {/* Product Image */}
        <div className="relative pt-[100%] bg-muted/50 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <Badge className="absolute top-2 left-2 bg-destructive hover:bg-destructive">
              {discountPercentage}% OFF
            </Badge>
          )}
          
          {/* Actions */}
          {!hideActions && (
            <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-8 w-8" 
                onClick={handleAddToWishlist}
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-8 w-8" 
                onClick={handleAddToCart}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <ShoppingCart className="h-4 w-4" />
                )}
              </Button>
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          {/* Category/Brand */}
          <p className="text-xs text-muted-foreground mb-1">
            {product.category} • {product.brand}
          </p>
          
          {/* Title */}
          <h3 className="font-medium line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center text-sm mb-2">
            <div className="flex mr-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className="h-3.5 w-3.5 mr-0.5 fill-current" 
                  strokeWidth={1.5}
                  fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                  color={i < Math.floor(product.rating) ? "hsl(var(--chart-4))" : "hsl(var(--muted))"}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>
          
          {/* Price */}
          <div className="flex items-center">
            <span className="font-semibold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}