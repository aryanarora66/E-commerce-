import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { categories } from '@/lib/data';

export default function CategoryShowcase() {
  const displayCategories = categories.slice(0, 6);

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Shop by Category</h2>
        <p className="text-muted-foreground">Browse our top categories</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {displayCategories.map((category) => (
          <Link 
            key={category.id} 
            href={`/products?category=${category.id}`}
            className="block group"
          >
            <Card className="overflow-hidden h-full transition-all duration-200 group-hover:shadow-md">
              <div 
                className="h-36 bg-cover bg-center"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <CardContent className="p-4 text-center">
                <h3 className="font-medium">{category.name}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}