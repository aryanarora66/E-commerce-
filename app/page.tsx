import { Suspense } from 'react';
import Hero from '@/components/home/hero';
import FeaturedProducts from '@/components/home/featured-products';
import CategoryShowcase from '@/components/home/category-showcase';
import DealsSection from '@/components/home/deals-section';
import TopBrands from '@/components/home/top-brands';
import RecommendedForYou from '@/components/home/recommended';
import Newsletter from '@/components/home/newsletter';
import Loading from '@/components/ui/loading';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <div className="container mx-auto px-4 py-8 space-y-16">
        <Suspense fallback={<Loading />}>
          <FeaturedProducts />
        </Suspense>
        <CategoryShowcase />
        <Suspense fallback={<Loading />}>
          <DealsSection />
        </Suspense>
        <TopBrands />
        <Suspense fallback={<Loading />}>
          <RecommendedForYou />
        </Suspense>
        <Newsletter />
      </div>
    </div>
  );
}