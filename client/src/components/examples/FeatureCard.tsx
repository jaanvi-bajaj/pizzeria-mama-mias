import FeatureCard from '../FeatureCard'
import { Leaf, ChefHat, Flame } from "lucide-react"

export default function FeatureCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
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
  )
}
