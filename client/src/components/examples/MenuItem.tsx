import MenuItem from '../MenuItem'
import margheritaImage from '@assets/generated_images/margherita_pizza_closeup_1463e6d1.png'
import pepperoniImage from '@assets/generated_images/pepperoni_pizza_07cfb34a.png'
import vegImage from '@assets/generated_images/vegetarian_pizza_c5399f68.png'

export default function MenuItemExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      <MenuItem
        id="margherita"
        name="Margherita"
        description="Classic tomato sauce, fresh mozzarella, basil"
        price={12}
        category="Pizza"
        image={margheritaImage}
        onAddToCart={(id) => console.log(`Added ${id} to cart`)}
      />
      <MenuItem
        id="pepperoni"
        name="Pepperoni"
        description="Tomato sauce, mozzarella, pepperoni"
        price={14}
        category="Pizza"
        image={pepperoniImage}
        onAddToCart={(id) => console.log(`Added ${id} to cart`)}
      />
      <MenuItem
        id="vegetarian"
        name="Vegetarian"
        description="Bell peppers, mushrooms, onions, olives, tomatoes"
        price={15}
        category="Pizza"
        image={vegImage}
        onAddToCart={(id) => console.log(`Added ${id} to cart`)}
      />
    </div>
  )
}
