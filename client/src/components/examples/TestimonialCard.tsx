import TestimonialCard from '../TestimonialCard'

export default function TestimonialCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      <TestimonialCard
        name="John Smith"
        rating={5}
        comment="Best pizza in Dubai! The wood-fired oven makes all the difference."
        date="January 10, 2025"
      />
      <TestimonialCard
        name="Sarah Johnson"
        rating={5}
        comment="Authentic Italian taste. Feels like eating in Naples!"
        date="January 8, 2025"
      />
      <TestimonialCard
        name="Ahmed Al-Mansouri"
        rating={4}
        comment="Great atmosphere and delicious food. Highly recommended!"
        date="January 5, 2025"
      />
    </div>
  )
}
