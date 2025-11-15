import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";
import { Pizza, Heart, ChefHat, Trophy, Award as AwardIcon } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroImage from '@assets/generated_images/restaurant_interior_cozy_2610ee16.png';
import type { Timeline as TimelineType, Award } from "@shared/schema";

export default function About() {
  const [cartCount, setCartCount] = useState(0);

  const { data: timelineItems = [], isLoading } = useQuery<TimelineType[]>({
    queryKey: ["/api/timeline"],
  });

  const { data: awards = [], isLoading: awardsLoading } = useQuery<Award[]>({
    queryKey: ["/api/awards"],
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation cartItemCount={cartCount} />
      
      <Hero
        backgroundImage={heroImage}
        title="About Us"
        subtitle="Our story of passion and tradition"
        height="h-[50vh]"
      />

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Pizza}
              title="Our Story"
              description="Founded by Jaanvi Bajaj, who brought her family's traditional pizza recipes from Naples, Italy. For over three decades, we've been serving authentic Italian pizza to our community with love and dedication."
            />
            <FeatureCard
              icon={Heart}
              title="Our Philosophy"
              description="We believe in using only the finest ingredients, traditional cooking methods, and treating every customer like family. Our wood-fired oven, imported from Italy, gives our pizzas that authentic taste."
            />
            <FeatureCard
              icon={ChefHat}
              title="Our Team"
              description="Our chefs are trained in the art of traditional Italian pizza making, ensuring every pizza that leaves our kitchen meets the high standards set by Jaanvi herself."
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Our Journey Through Time
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            From our humble beginnings to becoming a beloved Italian restaurant
          </p>
          
          <div className="max-w-4xl mx-auto">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading timeline...</p>
              </div>
            ) : (
              <Timeline items={timelineItems} />
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Awards & Recognition
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're honored to be recognized for our commitment to authentic Italian cuisine and exceptional service
            </p>
          </div>

          {awardsLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading awards...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="awards-grid">
              {awards.map((award) => (
                <Card key={award.id} className="hover-elevate" data-testid={`award-card-${award.id}`}>
                  <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
                    <div className="flex items-center gap-2">
                      <AwardIcon className="w-5 h-5 text-primary" />
                      <Badge variant="secondary" data-testid={`award-year-${award.id}`}>{award.year}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-lg mb-2" data-testid={`award-title-${award.id}`}>
                      {award.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3" data-testid={`award-org-${award.id}`}>
                      {award.organization}
                    </p>
                    <p className="text-sm" data-testid={`award-desc-${award.id}`}>
                      {award.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
