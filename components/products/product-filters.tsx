'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { categories, brands } from '@/lib/data';
import { X } from 'lucide-react';

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Parse current filter values from URL
  const currentCategory = searchParams.get('category');
  const currentBrand = searchParams.get('brand');
  const currentMinPrice = parseInt(searchParams.get('minPrice') || '0');
  const currentMaxPrice = parseInt(searchParams.get('maxPrice') || '1000');
  const currentRating = parseInt(searchParams.get('rating') || '0');
  
  // Local state for filter values
  const [priceRange, setPriceRange] = useState<number[]>([currentMinPrice, currentMaxPrice]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    currentCategory ? [currentCategory] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    currentBrand ? [currentBrand] : []
  );
  const [minRating, setMinRating] = useState<number>(currentRating);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    
    // Update category filter
    if (selectedCategories.length > 0) {
      params.set('category', selectedCategories.join(','));
    } else {
      params.delete('category');
    }
    
    // Update brand filter
    if (selectedBrands.length > 0) {
      params.set('brand', selectedBrands.join(','));
    } else {
      params.delete('brand');
    }
    
    // Update price range
    params.set('minPrice', priceRange[0].toString());
    params.set('maxPrice', priceRange[1].toString());
    
    // Update rating
    if (minRating > 0) {
      params.set('rating', minRating.toString());
    } else {
      params.delete('rating');
    }
    
    router.push(`/products?${params.toString()}`);
  };

  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinRating(0);
    router.push('/products');
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setSelectedCategories(
      checked
        ? [...selectedCategories, categoryId]
        : selectedCategories.filter(id => id !== categoryId)
    );
  };

  const handleBrandChange = (brandId: string, checked: boolean) => {
    setSelectedBrands(
      checked
        ? [...selectedBrands, brandId]
        : selectedBrands.filter(id => id !== brandId)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={resetFilters}
          className="h-8 px-2 text-xs"
        >
          <X className="h-3.5 w-3.5 mr-1" />
          Clear All
        </Button>
      </div>
      
      <Separator />
      
      <Accordion type="multiple" defaultValue={['categories', 'brands', 'price', 'rating']} className="w-full">
        {/* Categories */}
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category.id, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={`category-${category.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Brands */}
        <AccordionItem value="brands">
          <AccordionTrigger>Brands</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`brand-${brand.id}`}
                    checked={selectedBrands.includes(brand.id)}
                    onCheckedChange={(checked) => 
                      handleBrandChange(brand.id, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={`brand-${brand.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {brand.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Price Range */}
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                min={0}
                max={1000}
                step={1}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between">
                <div className="w-[45%]">
                  <Label htmlFor="min-price" className="text-xs text-muted-foreground">
                    Min
                  </Label>
                  <Input
                    id="min-price"
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="h-8"
                  />
                </div>
                <div className="w-[45%]">
                  <Label htmlFor="max-price" className="text-xs text-muted-foreground">
                    Max
                  </Label>
                  <Input
                    id="max-price"
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="h-8"
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Rating */}
        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`rating-${rating}`}
                    checked={minRating === rating}
                    onCheckedChange={(checked) => 
                      setMinRating(checked ? rating : 0)
                    }
                  />
                  <Label 
                    htmlFor={`rating-${rating}`}
                    className="text-sm cursor-pointer flex items-center"
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg 
                        key={i} 
                        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                    <span className="ml-1">& Up</span>
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Button onClick={applyFilters} className="w-full">Apply Filters</Button>
    </div>
  );
}