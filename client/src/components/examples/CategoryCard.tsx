import CategoryCard from '../CategoryCard'
import { Pizza, Salad, Wine } from "lucide-react"

export default function CategoryCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
      <CategoryCard
        icon={Pizza}
        title="Specialty Pizzas"
        description="From classic Margherita to our signature Quattro Formaggi"
        onClick={() => console.log('Pizza category clicked')}
      />
      <CategoryCard
        icon={Salad}
        title="Fresh Appetizers"
        description="Start your meal with authentic Italian antipasti"
        onClick={() => console.log('Appetizers category clicked')}
      />
      <CategoryCard
        icon={Wine}
        title="Premium Drinks"
        description="Fine wines and refreshing beverages to complement your meal"
        onClick={() => console.log('Drinks category clicked')}
      />
    </div>
  )
}
