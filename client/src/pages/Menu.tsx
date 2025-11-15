import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MenuItem from "@/components/MenuItem";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import heroImage from '@assets/generated_images/assorted_pizzas_overhead_875141dc.png';
import margheritaImage from '@assets/generated_images/margherita_pizza_closeup_1463e6d1.png';
import pepperoniImage from '@assets/generated_images/pepperoni_pizza_07cfb34a.png';
import quattroImage from '@assets/generated_images/quattro_formaggi_pizza_0041188b.png';
import vegImage from '@assets/generated_images/vegetarian_pizza_c5399f68.png';
import meatImage from '@assets/generated_images/meat_lovers_pizza_dd15717e.png';
import bruschettaImage from '@assets/generated_images/bruschetta_appetizer_f53e1276.png';
import garlicImage from '@assets/generated_images/garlic_bread_e64c07e4.png';
import mozzImage from '@assets/generated_images/mozzarella_sticks_7571a5d6.png';
import caesarImage from '@assets/generated_images/caesar_salad_fresh_74a05919.png';
import capreseImage from '@assets/generated_images/caprese_salad_2e9982ae.png';
import tiramisuImage from '@assets/generated_images/tiramisu_dessert_1d37e56a.png';
import cannoliImage from '@assets/generated_images/cannoli_pastries_a410b18c.png';
import sodaImage from '@assets/generated_images/italian_soda_4a76c162.png';
import coffeeImage from '@assets/generated_images/cappuccino_coffee_9610f981.png';

const menuItems = [
  { id: "1", name: "Margherita", description: "Classic tomato sauce, fresh mozzarella, basil", price: 12, category: "Pizzas", image: margheritaImage },
  { id: "2", name: "Pepperoni", description: "Tomato sauce, mozzarella, pepperoni", price: 14, category: "Pizzas", image: pepperoniImage },
  { id: "3", name: "Quattro Formaggi", description: "Four cheese blend: mozzarella, parmesan, gorgonzola, fontina", price: 16, category: "Pizzas", image: quattroImage },
  { id: "4", name: "Vegetarian", description: "Bell peppers, mushrooms, onions, olives, tomatoes", price: 15, category: "Pizzas", image: vegImage },
  { id: "5", name: "Meat Lovers", description: "Pepperoni, sausage, bacon, ham", price: 18, category: "Pizzas", image: meatImage },
  { id: "6", name: "Bruschetta", description: "Toasted bread, tomatoes, garlic, basil", price: 8, category: "Appetizers", image: bruschettaImage },
  { id: "7", name: "Garlic Bread", description: "Fresh baked with garlic butter", price: 6, category: "Appetizers", image: garlicImage },
  { id: "8", name: "Mozzarella Sticks", description: "Crispy fried with marinara sauce", price: 9, category: "Appetizers", image: mozzImage },
  { id: "9", name: "Caesar Salad", description: "Romaine, parmesan, croutons, Caesar dressing", price: 10, category: "Salads", image: caesarImage },
  { id: "10", name: "Caprese Salad", description: "Fresh mozzarella, tomatoes, basil, balsamic", price: 12, category: "Salads", image: capreseImage },
  { id: "11", name: "Tiramisu", description: "Classic Italian coffee-flavored dessert", price: 8, category: "Desserts", image: tiramisuImage },
  { id: "12", name: "Cannoli", description: "Sicilian pastry with sweet ricotta filling", price: 7, category: "Desserts", image: cannoliImage },
  { id: "13", name: "Italian Soda", description: "Flavored sparkling water", price: 4, category: "Beverages", image: sodaImage },
  { id: "14", name: "Coffee", description: "Espresso, Cappuccino, Latte", price: 4, category: "Beverages", image: coffeeImage },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [cartCount, setCartCount] = useState(0);
  const { toast } = useToast();

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
      cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    });
  };

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
                {...item}
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
