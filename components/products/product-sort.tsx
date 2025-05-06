'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ProductSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState(searchParams.get('sort') || 'featured');

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    
    if (sort) {
      params.set('sort', sort);
    } else {
      params.delete('sort');
    }
    
    router.push(`/products?${params.toString()}`);
  }, [sort, router, searchParams]);

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
      <Select value={sort} onValueChange={setSort}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured">Featured</SelectItem>
          <SelectItem value="newest">Newest Arrivals</SelectItem>
          <SelectItem value="price-low">Price: Low to High</SelectItem>
          <SelectItem value="price-high">Price: High to Low</SelectItem>
          <SelectItem value="rating">Highest Rated</SelectItem>
          <SelectItem value="popularity">Popularity</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}