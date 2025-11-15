import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TestimonialCard from "@/components/TestimonialCard";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from '@assets/generated_images/happy_diners_together_882df976.png';

const reviews = [
  { name: "John Smith", rating: 5, comment: "Best pizza in Dubai! The wood-fired oven makes all the difference.", date: "January 10, 2025" },
  { name: "Sarah Johnson", rating: 5, comment: "Authentic Italian taste. Feels like eating in Naples!", date: "January 8, 2025" },
  { name: "Ahmed Al-Mansouri", rating: 4, comment: "Great atmosphere and delicious food. Highly recommended!", date: "January 5, 2025" },
];

export default function Testimonials() {
  const [cartCount, setCartCount] = useState(0);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    review: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0));
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!/^[A-Za-z\s]+$/.test(formData.name) && formData.name.length > 0) {
      newErrors.name = "Name must contain only letters";
    }
    if (rating === 0) {
      newErrors.rating = "Please select a rating";
    }
    if (formData.review.length < 10 || formData.review.length > 500) {
      newErrors.review = "Review must be between 10 and 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      console.log("Review submitted:", { ...formData, rating });
      toast({
        title: "Thank you for your review!",
        description: "It has been submitted for approval.",
      });
      setFormData({ name: "", review: "" });
      setRating(0);
      setErrors({});
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation cartItemCount={cartCount} />
      
      <Hero
        backgroundImage={heroImage}
        title="Customer Testimonials"
        subtitle="See what our customers are saying about us"
        height="h-[50vh]"
      />

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="mb-16">
            <CardHeader>
              <CardTitle>Leave a Review</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    data-testid="input-reviewer-name"
                  />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label>Rating *</Label>
                  <div className="flex gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        data-testid={`button-rating-${star}`}
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            star <= (hoverRating || rating)
                              ? 'fill-chart-3 text-chart-3'
                              : 'text-muted'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {errors.rating && <p className="text-sm text-destructive mt-1">{errors.rating}</p>}
                </div>

                <div>
                  <Label htmlFor="review">Your Review *</Label>
                  <Textarea
                    id="review"
                    value={formData.review}
                    onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                    rows={4}
                    placeholder="Tell us about your experience..."
                    data-testid="input-review-text"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.review.length}/500 characters
                  </p>
                  {errors.review && <p className="text-sm text-destructive mt-1">{errors.review}</p>}
                </div>

                <Button type="submit" size="lg" data-testid="button-submit-review">
                  Submit Review
                </Button>
              </form>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <TestimonialCard key={index} {...review} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
