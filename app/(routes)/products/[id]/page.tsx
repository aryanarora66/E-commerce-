import { Suspense } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { HomeIcon } from 'lucide-react';
import ProductGallery from '@/components/products/product-gallery';
import ProductInfo from '@/components/products/product-info';
import ProductTabs from '@/components/products/product-tabs';
import RelatedProducts from '@/components/products/related-products';
import Loading from '@/components/ui/loading';

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <HomeIcon className="h-4 w-4 mr-1" />
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/products">Products</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>Product Details</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <Suspense fallback={<Loading />}>
          <ProductGallery productId={params.id} />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <ProductInfo productId={params.id} />
        </Suspense>
      </div>
      
      <div className="mt-12">
        <ProductTabs productId={params.id} />
      </div>
      
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <Suspense fallback={<Loading />}>
          <RelatedProducts productId={params.id} />
        </Suspense>
      </div>
    </div>
  );
}