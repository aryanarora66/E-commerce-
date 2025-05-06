import { Suspense } from 'react';
import { getProducts } from '@/lib/services/product-service';
import ProductCard from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/loading';

interface ProductListProps {
  searchParams?: {
    category?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    rating?: string;
    sort?: string;
    search?: string;
    page?: string;
  };
}

export default async function ProductList({ searchParams }: ProductListProps = {}) {
  const products = await getProducts(searchParams);
  const currentPage = parseInt(searchParams?.page || '1');
  
  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-lg font-medium mb-2">No products found</h3>
        <p className="text-muted-foreground mb-4">
          Try adjusting your search or filter criteria
        </p>
        <Button variant="outline" asChild>
          <a href="/products">Clear Filters</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <div className="flex justify-center">
        <div className="flex space-x-2">
          {currentPage > 1 && (
            <Button variant="outline" size="sm" asChild>
              <a href={`/products?page=${currentPage - 1}`}>Previous</a>
            </Button>
          )}
          
          {products.length >= 20 && (
            <Button variant="outline" size="sm" asChild>
              <a href={`/products?page=${currentPage + 1}`}>Next</a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}