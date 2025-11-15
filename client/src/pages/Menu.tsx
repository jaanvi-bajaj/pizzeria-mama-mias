import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MenuItem from "@/components/MenuItem";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { imageMap } from "@/lib/imageMap";
import heroImage from '@assets/generated_images/assorted_pizzas_overhead_875141dc.png';
import type { MenuItem as MenuItemType } from "@shared/schema";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [cartCount, setCartCount] = useState(0);
  const { toast } = useToast();

  const { data: menuItems = [], isLoading } = useQuery<MenuItemType[]>({
    queryKey: ["/api/menu"],
  });

  const categories = ["All Items", "Pizzas", "Appetizers", "Salads", "Desserts", "Beverages"];

  const filteredItems = activeCategory === "All Items" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0));
  };

  useEffect(() => {
    updateCartCount();
  }, []);

  const handleAddToCart = (itemId: string) => {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((i: any) => i.id === itemId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ 
        id: item.id,
        name: item.name, 
        description: item.description,
        price: parseFloat(item.price),
        category: item.category,
        imageUrl: item.imageUrl,
        quantity: 1 
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation cartItemCount={cartCount} />
        <Hero
          backgroundImage={heroImage}
          title="Our Menu"
          subtitle="Discover our authentic Italian dishes"
          height="h-[50vh]"
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading menu...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation cartItemCount={cartCount} />
      
      <Hero
        backgroundImage={heroImage}
        title="Our Menu"
        subtitle="Discover our authentic Italian dishes"
        height="h-[50vh]"
      />

      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                data-testid={`button-filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <MenuItem
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                price={parseFloat(item.price)}
                category={item.category}
                image={imageMap[item.imageUrl] || item.imageUrl}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
