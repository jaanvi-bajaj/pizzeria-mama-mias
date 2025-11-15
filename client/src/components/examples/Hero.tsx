import Hero from '../Hero'
import { Button } from "@/components/ui/button"
import heroImage from '@assets/generated_images/wood_fired_pizza_oven_3d7e9d1a.png'

export default function HeroExample() {
  return (
    <Hero
      backgroundImage={heroImage}
      title="Welcome to Mama Mia's Pizzeria"
      subtitle="Authentic Italian Pizza Made with Love Since 1985"
    >
      <div className="flex flex-wrap gap-4 justify-center">
        <Button size="lg" data-testid="button-view-menu">
          View Menu
        </Button>
        <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20" data-testid="button-open-app">
          Open Full App
        </Button>
      </div>
    </Hero>
  )
}
