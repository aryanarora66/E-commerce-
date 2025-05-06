import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { brands } from '@/lib/data';

export default function TopBrands() {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Top Brands</h2>
        <p className="text-muted-foreground">Shop from your favorite brands</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {brands.map((brand) => (
          <Link 
            key={brand.id} 
            href={`/products?brand=${brand.id}`}
            className="block group"
          >
            <Card className="overflow-hidden transition-all duration-200 group-hover:shadow-md">
              <CardContent className="p-4 flex items-center justify-center h-28">
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  className="max-h-16 max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}