'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Star, ThumbsUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getProduct } from '@/lib/services/product-service';

export default function ProductTabs({ productId }: { productId: string }) {
  const product = getProduct(productId);
  const { toast } = useToast();
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        variant: "destructive",
        title: "Rating required",
        description: "Please select a rating before submitting your review.",
      });
      return;
    }
    
    if (reviewText.trim().length < 5) {
      toast({
        variant: "destructive",
        title: "Review too short",
        description: "Please provide more details in your review.",
      });
      return;
    }
    
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });
    
    setReviewText('');
    setRating(0);
  };
  
  // Calculate rating distribution
  const ratingCounts = {
    5: Math.floor(product.reviewCount * 0.65),
    4: Math.floor(product.reviewCount * 0.2),
    3: Math.floor(product.reviewCount * 0.1),
    2: Math.floor(product.reviewCount * 0.03),
    1: Math.floor(product.reviewCount * 0.02),
  };

  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid grid-cols-4 w-full mb-6">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="reviews">
          Reviews ({product.reviewCount})
        </TabsTrigger>
        <TabsTrigger value="faq">FAQ</TabsTrigger>
      </TabsList>
      
      <TabsContent value="description" className="space-y-4">
        <div className="prose max-w-none dark:prose-invert prose-a:text-primary">
          <h3>About this item</h3>
          <p>{product.description}</p>
          
          {product.longDescription && 
            <div dangerouslySetInnerHTML={{ __html: product.longDescription }} />
          }
          
          {product.features && (
            <>
              <h3>Key Features</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="specifications" className="space-y-4">
        {product.specifications ? (
          <div className="bg-muted/50 rounded-lg overflow-hidden">
            <table className="w-full">
              <tbody>
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <tr 
                    key={key} 
                    className={index % 2 === 0 ? 'bg-background/50' : 'bg-muted/30'}
                  >
                    <td className="font-medium p-3 border-b">{key}</td>
                    <td className="p-3 border-b">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted-foreground">No specifications available for this product.</p>
        )}
      </TabsContent>
      
      <TabsContent value="reviews" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
              <h3 className="text-2xl font-bold">{product.rating}</h3>
              <div className="flex my-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className="h-5 w-5 fill-current" 
                    fill={star <= Math.floor(product.rating) ? "currentColor" : "none"}
                    color={star <= Math.floor(product.rating) ? "hsl(var(--chart-4))" : "hsl(var(--muted))"}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Based on {product.reviewCount} reviews
              </p>
              
              <div className="w-full space-y-2 mt-4">
                {[5, 4, 3, 2, 1].map((num) => (
                  <div key={num} className="flex items-center gap-2">
                    <span className="text-sm w-1">{num}</span>
                    <Star className="h-3.5 w-3.5 fill-current text-yellow-400" />
                    <Progress 
                      value={(ratingCounts[num as keyof typeof ratingCounts] / product.reviewCount) * 100} 
                      className="h-2"
                    />
                    <span className="text-xs text-muted-foreground w-8">
                      {Math.round((ratingCounts[num as keyof typeof ratingCounts] / product.reviewCount) * 100)}%
                    </span>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-4">Write a Review</Button>
            </div>
          </div>
          
          <div className="col-span-2 space-y-6">
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-semibold">Customer Reviews</h3>
                <p className="text-sm text-muted-foreground">
                  Showing 3 of {product.reviewCount} reviews
                </p>
              </div>
              
              {/* Review 1 */}
              <div className="border-b pb-6">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://i.pravatar.cc/150?img=17" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">John Doe</span>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className="h-4 w-4 fill-current" 
                        fill={star <= 5 ? "currentColor" : "none"}
                        color={star <= 5 ? "hsl(var(--chart-4))" : "hsl(var(--muted))"}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Verified Purchase · July 15, 2025</p>
                <h4 className="font-medium mb-1">Excellent quality and performance</h4>
                <p className="text-sm">
                  I've been using this product for a month now and I'm extremely satisfied with my purchase. The quality is outstanding and it performs even better than I expected.
                </p>
                <div className="flex items-center mt-3 text-sm">
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    Helpful (12)
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8">
                    Report
                  </Button>
                </div>
              </div>
              
              {/* Review 2 */}
              <div className="border-b pb-6">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://i.pravatar.cc/150?img=24" />
                      <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">Alice Smith</span>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className="h-4 w-4 fill-current" 
                        fill={star <= 4 ? "currentColor" : "none"}
                        color={star <= 4 ? "hsl(var(--chart-4))" : "hsl(var(--muted))"}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Verified Purchase · June 30, 2025</p>
                <h4 className="font-medium mb-1">Great value for money</h4>
                <p className="text-sm">
                  This product offers excellent value for the price. The features are comprehensive and the build quality is solid. Would recommend to anyone looking for a good balance of quality and affordability.
                </p>
                <div className="flex items-center mt-3 text-sm">
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    Helpful (8)
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8">
                    Report
                  </Button>
                </div>
              </div>
              
              {/* Review 3 */}
              <div>
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://i.pravatar.cc/150?img=32" />
                      <AvatarFallback>RJ</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">Robert Johnson</span>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className="h-4 w-4 fill-current" 
                        fill={star <= 5 ? "currentColor" : "none"}
                        color={star <= 5 ? "hsl(var(--chart-4))" : "hsl(var(--muted))"}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Verified Purchase · June 12, 2025</p>
                <h4 className="font-medium mb-1">Exceeded my expectations</h4>
                <p className="text-sm">
                  I wasn't sure what to expect when I ordered this, but I'm happy to report that it has exceeded all my expectations. The attention to detail is impressive and the functionality is exactly what I needed.
                </p>
                <div className="flex items-center mt-3 text-sm">
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    Helpful (15)
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8">
                    Report
                  </Button>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              Load More Reviews
            </Button>
            
            <div className="pt-6 border-t space-y-4">
              <h3 className="font-semibold">Write a Review</h3>
              <form onSubmit={handleReviewSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Rating</label>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="p-1"
                        >
                          <Star 
                            className="h-6 w-6 fill-current transition-colors" 
                            fill={(hoveredRating || rating) >= star ? "currentColor" : "none"}
                            color={(hoveredRating || rating) >= star ? "hsl(var(--chart-4))" : "hsl(var(--muted))"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Your Review</label>
                    <Textarea
                      placeholder="Share your experience with this product..."
                      rows={4}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                    />
                  </div>
                  <Button type="submit">Submit Review</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="faq" className="space-y-4">
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="font-medium mb-2">Is this product compatible with Model X?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, this product is fully compatible with Model X and all other models in the series.
            </p>
          </div>
          <div className="border-b pb-4">
            <h3 className="font-medium mb-2">What is the warranty period?</h3>
            <p className="text-sm text-muted-foreground">
              This product comes with a 2-year manufacturer warranty that covers all defects in materials and workmanship.
            </p>
          </div>
          <div className="border-b pb-4">
            <h3 className="font-medium mb-2">How long does shipping take?</h3>
            <p className="text-sm text-muted-foreground">
              Standard shipping takes 3-5 business days. Express shipping (additional fee) takes 1-2 business days.
            </p>
          </div>
          <div className="border-b pb-4">
            <h3 className="font-medium mb-2">Can I return this item if I'm not satisfied?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, we offer a 30-day money-back guarantee. If you're not completely satisfied, you can return the product for a full refund.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I contact customer support?</h3>
            <p className="text-sm text-muted-foreground">
              You can reach our customer support team via email at support@shophub.com or by phone at 1-800-123-4567, Monday through Friday, 9 AM to 5 PM EST.
            </p>
          </div>
          
          <div className="pt-4 border-t">
            <form className="flex space-x-2">
              <input
                type="text"
                placeholder="Ask a question..."
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button type="submit">Submit</Button>
            </form>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}