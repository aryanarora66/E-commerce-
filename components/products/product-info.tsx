'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/utils';
import { getProduct } from '@/lib/services/product-service';
import { Star, Truck, ShieldCheck, Check, ShoppingCart, Heart, Share2, Award } from 'lucide-react';

export default function ProductInfo({ productId }: { productId: string }) {
  const { toast } = useToast();
  const { addItem } = useCart();
  const product = getProduct(productId);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0].id : null
  );
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const discountPercentage = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100) 
    : 0;
  
  const handleAddToCart = () => {
    setIsAddingToCart(true);
    
    setTimeout(() => {
      const selectedVariantObj = product.variants?.find(v => v.id === selectedVariant);
      const itemToAdd = {
        ...product,
        quantity,
        variant: selectedVariantObj,
      };
      
      addItem(itemToAdd);
      setIsAddingToCart(false);
      
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
      });
    }, 600);
  };
  
  const handleAddToWishlist = () => {
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center space-x-2 mb-2">
          {product.isNew && (
            <Badge variant="outline" className="bg-primary/10 hover:bg-primary/10 text-primary border-primary/20">
              New
            </Badge>
          )}
          {discountPercentage > 0 && (
            <Badge className="bg-destructive hover:bg-destructive">
              {discountPercentage}% OFF
            </Badge>
          )}
          {product.inStock ? (
            <Badge variant="outline" className="bg-green-500/10 hover:bg-green-500/10 text-green-500 border-green-500/20">
              In Stock
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-destructive/10 hover:bg-destructive/10 text-destructive border-destructive/20">
              Out of Stock
            </Badge>
          )}
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
        
        <div className="flex items-center mt-2 space-x-4">
          <div className="flex items-center">
            <div className="flex mr-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className="h-4 w-4 mr-0.5 fill-current" 
                  fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                  color={i < Math.floor(product.rating) ? "hsl(var(--chart-4))" : "hsl(var(--muted))"}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <span className="text-sm text-muted-foreground">
            {product.sold} sold
          </span>
        </div>
      </div>
      
      <div className="flex items-baseline space-x-3">
        <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
        {product.compareAtPrice && (
          <span className="text-lg text-muted-foreground line-through">
            {formatPrice(product.compareAtPrice)}
          </span>
        )}
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Description</p>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>
        
        {product.features && (
          <div>
            <p className="text-sm font-medium mb-2">Key Features</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-4 w-4 mr-2 mt-1 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <Separator />
      
      {product.variants && product.variants.length > 0 && (
        <div>
          <label className="text-sm font-medium mb-2 block">
            {product.variantType || 'Variant'}
          </label>
          <Select
            value={selectedVariant || undefined}
            onValueChange={(value) => setSelectedVariant(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`Select ${product.variantType || 'Variant'}`} />
            </SelectTrigger>
            <SelectContent>
              {product.variants.map((variant) => (
                <SelectItem key={variant.id} value={variant.id}>
                  {variant.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      <div>
        <label className="text-sm font-medium mb-2 block">Quantity</label>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
            disabled={quantity >= 10}
          >
            +
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <Button 
          className="flex-1" 
          size="lg" 
          onClick={handleAddToCart}
          disabled={isAddingToCart || !product.inStock}
        >
          {isAddingToCart ? (
            <>
              <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </>
          )}
        </Button>
        <Button variant="outline" size="lg" onClick={handleAddToWishlist}>
          <Heart className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Wishlist</span>
        </Button>
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4">
        <div className="flex items-start space-x-2">
          <Truck className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Free Shipping</p>
            <p className="text-xs text-muted-foreground">On orders over $35</p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <ShieldCheck className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Secure Payment</p>
            <p className="text-xs text-muted-foreground">Encrypted transactions</p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <Award className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Money Back Guarantee</p>
            <p className="text-xs text-muted-foreground">30-day returns</p>
          </div>
        </div>
      </div>
    </div>
  );
}