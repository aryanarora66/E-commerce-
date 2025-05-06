'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
  badgeText?: string;
  image: string;
  position?: string;
}

const slides: HeroSlide[] = [
  {
    id: 1,
    title: "Summer Collection 2025",
    subtitle: "Discover the latest trends and styles for the hot season",
    cta: "Shop Now",
    ctaLink: "/products?collection=summer",
    badgeText: "New Arrivals",
    image: "https://images.pexels.com/photos/5868722/pexels-photo-5868722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 2,
    title: "Tech Gadgets",
    subtitle: "Up to 40% off on selected electronics",
    cta: "Explore Deals",
    ctaLink: "/products?category=electronics&sale=true",
    badgeText: "Limited Time",
    image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    position: "object-right-bottom",
  },
  {
    id: 3,
    title: "Home & Living",
    subtitle: "Transform your space with our curated collection",
    cta: "Discover More",
    ctaLink: "/products?category=home",
    image: "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 500);
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Hero Image */}
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-center transition-opacity duration-100",
          isTransitioning ? "opacity-0" : "opacity-100",
          slide.position || "object-center"
        )}
        style={{ backgroundImage: `url(${slide.image})` }} 
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-start text-white">
        <div
          className={cn(
            "max-w-xl transition-all duration-100",
            isTransitioning ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
          )}
        >
          {slide.badgeText && (
            <Badge className="mb-4 bg-primary text-primary-foreground hover:bg-primary/90">
              {slide.badgeText}
            </Badge>
          )}
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h1>
          <p className="text-lg md:text-xl mb-6">{slide.subtitle}</p>
          <Button asChild size="lg" className="font-medium">
            <Link href={slide.ctaLink}>
              {slide.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              currentSlide === index
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}