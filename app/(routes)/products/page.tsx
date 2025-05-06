import { Suspense } from 'react';
import ProductFilters from '@/components/products/product-filters';
import ProductList from '@/components/products/product-list';
import ProductSort from '@/components/products/product-sort';
import Loading from '@/components/ui/loading';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { HomeIcon } from 'lucide-react';

export default function ProductsPage() {
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
          <BreadcrumbLink href="/products">All Products</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="w-full md:w-1/4 lg:w-1/5">
          <ProductFilters />
        </div>
        <div className="w-full md:w-3/4 lg:w-4/5">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">All Products</h1>
            <ProductSort />
          </div>
          <Suspense fallback={<Loading />}>
            <ProductList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}