import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/products/product-card';
import { getDeals } from '@/lib/services/product-service';

export default async function DealsSection() {
  const deals = await getDeals();

  return (
    <section className="bg-muted/50 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Badge variant="default" className="mb-2">Limited Time</Badge>
          <h2 className="text-2xl font-bold">Deals of the Day</h2>
          <p className="text-muted-foreground">Hurry up! These deals won't last long</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/deals">See All Deals</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {deals.map(deal => (
          <ProductCard key={deal.id} product={deal} />
        ))}
      </div>
    </section>
  );
}