'use client';

import { useState } from 'react';
import { getProduct } from '@/lib/services/product-service';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductGallery({ productId }: { productId: string }) {
  const product = getProduct(productId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  
  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };
  
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    setZoomPosition({ x, y });
  };

  return (
    <div className="space-y-4">
      <div 
        className={cn(
          "relative overflow-hidden rounded-lg border bg-muted",
          isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
        )}
      >
        <div 
          className="absolute top-2 right-2 z-10 rounded-full bg-background/80 p-2 text-foreground backdrop-blur-sm"
          onClick={handleZoomToggle}
        >
          <ZoomIn className="h-5 w-5" />
        </div>
        
        <button 
          onClick={handlePrevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 p-2 text-foreground backdrop-blur-sm"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <button 
          onClick={handleNextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 p-2 text-foreground backdrop-blur-sm"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        
        <AspectRatio 
          ratio={1}
          onMouseMove={handleMouseMove}
          onClick={handleZoomToggle}
        >
          <div className="h-full w-full">
            <img
              src={product.images[currentImageIndex]}
              alt={`${product.name} - Image ${currentImageIndex + 1}`}
              className={cn(
                "h-full w-full object-cover transition-all",
                isZoomed && "scale-150"
              )}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`,
                    }
                  : undefined
              }
            />
          </div>
        </AspectRatio>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {product.images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "cursor-pointer overflow-hidden rounded-md border-2",
              index === currentImageIndex
                ? "border-primary"
                : "border-transparent hover:border-muted-foreground/50"
            )}
            onClick={() => handleThumbnailClick(index)}
          >
            <AspectRatio ratio={1}>
              <img
                src={image}
                alt={`${product.name} - Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </AspectRatio>
          </div>
        ))}
      </div>
    </div>
  );
}