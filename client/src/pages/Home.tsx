import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import CategoryCard from "@/components/CategoryCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Leaf, ChefHat, Flame, Pizza, Salad, Wine } from "lucide-react";
import heroImage from '@assets/generated_images/wood_fired_pizza_oven_3d7e9d1a.png';
import wineImage from '@assets/generated_images/Italian_wine_bottles_display_e86e809a.png';
import { useState, useEffect } from "react";

export default function Home() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation cartItemCount={cartCount} />
      
      <Hero
        backgroundImage={heroImage}
        title="Welcome to Mama Mia's Pizzeria"
        subtitle="Authentic Italian Pizza Made with Love Since 1985"
      >
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/menu">
            <Button size="lg" data-testid="button-view-menu">
              View Menu
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20" 
            data-testid="button-explore-app"
          >
            Explore Our App
          </Button>
        </div>
      </Hero>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Why Choose Us
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Experience the authentic taste of Italy with our traditional recipes and premium ingredients
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Leaf}
              title="Fresh Ingredients"
              description="We use only the freshest, locally-sourced ingredients for authentic Italian taste"
            />
            <FeatureCard
              icon={ChefHat}
              title="Traditional Recipes"
              description="Passed down through generations of Italian chefs from Naples"
            />
            <FeatureCard
              icon={Flame}
              title="Wood-Fired Oven"
              description="Cooked to perfection in our authentic Italian wood-fired oven"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Featured Categories
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Explore our diverse menu of authentic Italian dishes
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/menu?category=pizza">
              <CategoryCard
                icon={Pizza}
                title="Specialty Pizzas"
                description="From classic Margherita to our signature Quattro Formaggi"
              />
            </Link>
            <Link href="/menu?category=appetizers">
              <CategoryCard
                icon={Salad}
                title="Fresh Appetizers"
                description="Start your meal with authentic Italian antipasti"
              />
            </Link>
            <Link href="/menu?category=beverages">
              <CategoryCard
                icon={Wine}
                title="Premium Drinks"
                description="Fine wines and refreshing beverages to complement your meal"
              />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${wineImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Experience Our Full Restaurant App
          </h2>
          <p className="text-lg mb-8 text-white/95">
            Browse our complete menu, make reservations, and manage your orders
          </p>
          <Link href="/menu">
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20"
              data-testid="button-get-started"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
