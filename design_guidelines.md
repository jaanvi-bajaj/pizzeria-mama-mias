# Mama Mia's Pizzeria Design Guidelines

## Design Approach
**Reference-Based**: Italian restaurant aesthetic inspired by traditional Italian flag colors and authentic pizzeria experiences. Warm, welcoming, and family-oriented with emphasis on heritage and authenticity.

## Color Palette
- **Italian Red**: #B22222 (Primary - CTAs, headers, accents)
- **Italian Green**: #009246 (Secondary - badges, highlights)
- **Italian Cream**: #FFF8E7 (Background, cards)
- **Dark Gray**: #1F2937 (Footer, text)
- **Yellow**: Accent for category badges
- **White**: #FFFFFF (Card backgrounds, contrast elements)

## Typography
- **Headings**: Bold, 2xl-4xl for hero sections, xl-2xl for page headers
- **Body**: Base to lg, comfortable reading with proper line-height
- **Hierarchy**: Clear distinction between h1 (hero), h2 (section headers), h3 (card titles), body text
- **Special**: Italian restaurant name can use slightly decorative font from Google Fonts (e.g., Playfair Display for logo, Open Sans/Lato for body)

## Layout System
**Spacing Units**: Use Tailwind spacing - primarily 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- **Container**: Max-width 7xl with px-4 md:px-8 lg:px-12
- **Section Padding**: py-12 md:py-16 lg:py-20
- **Card Spacing**: gap-6 md:gap-8 in grids
- **Form Fields**: mb-4 md:mb-6 between inputs

## Component Library

### Navigation
- Sticky header with white background and subtle shadow
- Logo (pizza icon) on left, navigation links centered/right
- Cart icon with badge counter (red background, white text)
- Mobile: Hamburger menu with full-screen overlay

### Hero Sections
- **Large background images** for all pages:
  - Home: Pizza in wood-fired oven (warm, appetizing, action shot)
  - Menu: Assorted pizzas on wooden table
  - About: Restaurant interior (warm lighting, cozy atmosphere)
  - Reservations: Elegant dining area setup
  - Testimonials: Happy customers enjoying meals
- Height: 60vh to 80vh with centered content
- **Overlay**: Semi-transparent dark overlay (bg-black/40) for text readability
- **CTAs on images**: Buttons with backdrop-blur-sm and semi-transparent white/red backgrounds

### Cards
- **Rounded corners**: rounded-xl (12px)
- **Shadows**: shadow-md on base, shadow-xl on hover
- **Padding**: p-6 md:p-8
- **Hover effects**: translate-y-1 and enhanced shadow transition
- **Background**: White or cream (#FFF8E7)

### Grid Layouts
- **Feature Cards**: grid-cols-1 md:grid-cols-3 gap-8
- **Menu Items**: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- **Reviews**: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6

### Buttons
- **Primary (Red)**: bg-[#B22222] text-white, hover:bg-[#8B1A1A]
- **Secondary (Outlined)**: border-2 border-[#B22222] text-[#B22222], hover with filled background
- **Padding**: px-6 py-3 md:px-8 md:py-4
- **Rounded**: rounded-lg
- **Transitions**: All 200ms ease

### Forms
- **Input fields**: border border-gray-300, rounded-lg, p-3, focus:ring-2 focus:ring-[#B22222]
- **Labels**: font-semibold mb-2 text-gray-700
- **Validation errors**: text-red-600 text-sm mt-1
- **Success messages**: Green background (#10B981) with white text, rounded-lg, p-4

### Menu Item Cards
- Image at top (aspect-ratio 4:3), rounded-t-xl
- Category badge (absolute, top-right, bg-yellow-400, rounded-full, px-3 py-1)
- Content section with p-6
- Price in bold, large text (text-2xl)
- "Add to Cart" button spans full width at bottom

### Timeline (About Page)
- Vertical line with milestone markers
- Alternating left/right content layout on desktop
- Year in large bold text, title and description in cards
- Circle indicators with Italian green fill

### Footer
- **Dark background**: bg-[#1F2937]
- **Three columns**: Contact, Hours, Location
- **Icons**: Use Font Awesome via CDN for phone, email, location
- **Text**: text-gray-300 for body, text-white for headers
- **Padding**: py-12 with divider line above

## Responsive Breakpoints
- **Mobile**: <768px (single column, stacked layout)
- **Tablet**: 768-1024px (2 columns for grids)
- **Desktop**: >1024px (3 columns, full layouts)

## Images
**Required Stock Photos** (use Pexels/Unsplash):
1. **Hero (Home)**: Pizza being pulled from wood-fired oven with flames visible
2. **Menu Hero**: Top-down shot of multiple pizzas on rustic wooden table
3. **About Hero**: Warm restaurant interior with wooden tables and ambient lighting
4. **Reservations Hero**: Elegantly set dining table with candles
5. **Testimonials Hero**: Group of people enjoying meal together
6. **Menu Items**: Individual photos for each dish (at least 15 items across categories)
7. **Footer/About**: Optional chef portrait or pizza-making action shots

## Animations
- **Minimal usage**: Smooth transitions only (200-300ms)
- **Hover states**: Scale 1.02, translate-y-1, shadow enhancements
- **Page loads**: Fade-in effects optional for cards (stagger 100ms)
- **No**: Carousels, auto-playing animations, excessive motion

## Special Elements
- **Star Ratings**: Yellow filled/outlined stars (★/☆) using unicode or SVG
- **Cart Badge**: Small circle (w-6 h-6) with count, positioned absolute on cart icon
- **Empty States**: Centered with icon, message, and CTA (e.g., "Cart is empty")
- **Customer Initials**: Colored circles (randomize from Italian flag colors) with white letter

## Accessibility
- Alt text for all images
- Proper heading hierarchy (h1 → h2 → h3)
- Form labels with for attributes
- ARIA labels for icons and interactive elements
- Focus states visible on all interactive elements (ring-2 ring-[#B22222])