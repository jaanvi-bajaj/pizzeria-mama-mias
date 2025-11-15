import { db } from "./index";
import { menuItems, timeline, awards } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(menuItems);
  await db.delete(timeline);
  await db.delete(awards);

  // Seed menu items
  const menuData = [
    { name: "Margherita", description: "Classic tomato sauce, fresh mozzarella, basil", price: "12.00", category: "Pizzas", imageUrl: "/assets/margherita.png", available: true },
    { name: "Pepperoni", description: "Tomato sauce, mozzarella, pepperoni", price: "14.00", category: "Pizzas", imageUrl: "/assets/pepperoni.png", available: true },
    { name: "Quattro Formaggi", description: "Four cheese blend: mozzarella, parmesan, gorgonzola, fontina", price: "16.00", category: "Pizzas", imageUrl: "/assets/quattro.png", available: true },
    { name: "Vegetarian", description: "Bell peppers, mushrooms, onions, olives, tomatoes", price: "15.00", category: "Pizzas", imageUrl: "/assets/vegetarian.png", available: true },
    { name: "Meat Lovers", description: "Pepperoni, sausage, bacon, ham", price: "18.00", category: "Pizzas", imageUrl: "/assets/meat.png", available: true },
    { name: "Bruschetta", description: "Toasted bread, tomatoes, garlic, basil", price: "8.00", category: "Appetizers", imageUrl: "/assets/bruschetta.png", available: true },
    { name: "Garlic Bread", description: "Fresh baked with garlic butter", price: "6.00", category: "Appetizers", imageUrl: "/assets/garlic.png", available: true },
    { name: "Mozzarella Sticks", description: "Crispy fried with marinara sauce", price: "9.00", category: "Appetizers", imageUrl: "/assets/mozzarella.png", available: true },
    { name: "Caesar Salad", description: "Romaine, parmesan, croutons, Caesar dressing", price: "10.00", category: "Salads", imageUrl: "/assets/caesar.png", available: true },
    { name: "Caprese Salad", description: "Fresh mozzarella, tomatoes, basil, balsamic", price: "12.00", category: "Salads", imageUrl: "/assets/caprese.png", available: true },
    { name: "Tiramisu", description: "Classic Italian coffee-flavored dessert", price: "8.00", category: "Desserts", imageUrl: "/assets/tiramisu.png", available: true },
    { name: "Cannoli", description: "Sicilian pastry with sweet ricotta filling", price: "7.00", category: "Desserts", imageUrl: "/assets/cannoli.png", available: true },
    { name: "Italian Soda", description: "Flavored sparkling water", price: "4.00", category: "Beverages", imageUrl: "/assets/soda.png", available: true },
    { name: "Coffee", description: "Espresso, Cappuccino, Latte", price: "4.00", category: "Beverages", imageUrl: "/assets/coffee.png", available: true },
  ];

  await db.insert(menuItems).values(menuData);

  // Seed timeline
  const timelineData = [
    { year: "1985", title: "Opening Day", description: "Jaanvi Bajaj opened the first location in Naples", order: 1 },
    { year: "1995", title: "Expansion", description: "Opened second location due to popular demand", order: 2 },
    { year: "2005", title: "International Growth", description: "First international location in Dubai", order: 3 },
    { year: "2015", title: "30th Anniversary", description: "Celebrating three decades of excellence", order: 4 },
    { year: "2020", title: "Digital Transformation", description: "Launched online ordering and delivery", order: 5 },
    { year: "2025", title: "Today", description: "Serving thousands of happy customers across multiple locations", order: 6 },
  ];

  await db.insert(timeline).values(timelineData);

  // Seed awards
  const awardsData = [
    { year: "2024", title: "Michelin Bib Gourmand", organization: "Michelin Guide", description: "Recognized for exceptional quality food at moderate prices", order: 1 },
    { year: "2023", title: "Best Italian Restaurant Dubai", organization: "Dubai Food Awards", description: "Voted #1 Italian restaurant in Dubai by local food critics", order: 2 },
    { year: "2023", title: "TripAdvisor Travelers' Choice", organization: "TripAdvisor", description: "Among the top 10% of restaurants worldwide based on reviews", order: 3 },
    { year: "2022", title: "Best Pizza in UAE", organization: "Middle East Food Excellence Awards", description: "Awarded for authentic Neapolitan pizza craftsmanship", order: 4 },
    { year: "2021", title: "Hospitality Excellence Award", organization: "Dubai Tourism", description: "Outstanding service and customer satisfaction", order: 5 },
  ];

  await db.insert(awards).values(awardsData);

  console.log("Database seeded successfully!");
}

seed()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
