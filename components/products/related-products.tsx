import { getRelatedProducts } from '@/lib/services/product-service';
import ProductCard from '@/components/products/product-card';

export default async function RelatedProducts({ productId }: { productId: string }) {
  const products = await getRelatedProducts(productId);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} hideActions />
      ))}
    </div>
  );
}