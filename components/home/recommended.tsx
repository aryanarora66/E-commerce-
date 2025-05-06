import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/products/product-card';
import { getRecommendedProducts } from '@/lib/services/product-service';

export default async function RecommendedForYou() {
  const products = await getRecommendedProducts();

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Recommended For You</h2>
          <p className="text-muted-foreground">Based on your browsing history</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/products">View More</Link>
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