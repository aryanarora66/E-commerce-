import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/products/product-card';
import { getFeaturedProducts } from '@/lib/services/product-service';

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <p className="text-muted-foreground">Handpicked by our experts</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/products">View All</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}