# Mama Mia's Pizzeria

## Overview

Mama Mia's Pizzeria is a full-stack restaurant website for an authentic Italian pizzeria in Dubai Marina. The application provides a complete online ordering system with menu browsing, cart management, checkout process, table reservations, and customer testimonials. Built with a modern React frontend and Express backend, it features real-time order tracking via WebSockets and a comprehensive design system following Italian restaurant aesthetics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, built using Vite as the build tool and development server.

**Routing**: Wouter for client-side routing, providing a lightweight alternative to React Router with similar functionality.

**UI Component Library**: Radix UI primitives with shadcn/ui styling system, configured in "new-york" style variant. Components follow a consistent design pattern with support for variants, sizes, and hover/active states through CVA (class-variance-authority).

**State Management**: 
- TanStack Query (React Query) for server state management with configured defaults for no refetching on window focus and infinite stale time
- Local storage for cart persistence across sessions
- WebSocket connections for real-time order status updates

**Styling**: Tailwind CSS with custom design tokens defined in CSS variables. The design system implements an Italian restaurant theme with custom colors (Italian Red #B22222, Italian Green #009246, Italian Cream #FFF8E7) and spacing units based on Tailwind's default scale.

**Form Handling**: React Hook Form with Zod validation schemas for type-safe form validation.

### Backend Architecture

**Framework**: Express.js running on Node.js with TypeScript.

**API Design**: RESTful endpoints under `/api` namespace:
- `/api/menu` - Menu items CRUD operations
- `/api/orders` - Order management and creation
- `/api/reservations` - Table reservation handling
- `/api/testimonials` - Customer review management
- `/api/timeline` - Restaurant history/milestones

**Real-time Communication**: WebSocket server using the `ws` library, running on the same HTTP server as Express. Implements a subscription model where clients can subscribe to specific order numbers for real-time status updates.

**Session Management**: Express sessions backed by PostgreSQL using `connect-pg-simple` for persistent session storage.

**Development Server**: Custom Vite middleware integration in development mode, with HMR support. Production mode serves static built files.

### Data Layer

**ORM**: Drizzle ORM with Neon serverless PostgreSQL driver for database operations.

**Database Schema**:
- `menu_items` - Product catalog with categories, pricing, images, and availability flags
- `orders` - Order headers with customer information, delivery details, and status tracking
- `order_items` - Line items linking orders to menu items with quantities
- `reservations` - Table booking requests with guest count and special requirements
- `testimonials` - Customer reviews with approval workflow
- `timeline` - Restaurant history milestones for the About page

**Schema Validation**: Drizzle-Zod integration generates Zod schemas from database schema definitions, ensuring type safety between database and application layers.

**Connection Pooling**: Uses Neon's serverless connection pooling with WebSocket support for optimal performance.

### Design System

**Component Patterns**: 
- Card-based layouts with consistent elevation through shadow utilities
- Hover and active states using custom Tailwind utilities (`hover-elevate`, `active-elevate-2`)
- Responsive grid systems for menu items, features, and testimonials
- Hero sections with background images and gradient overlays

**Image Handling**: Static image mapping system that imports generated images at build time and maps them to database URLs, ensuring optimal bundling and caching.

**Typography**: Custom font stack with serif fonts for branding and sans-serif for body content, defined via CSS custom properties.

**Color System**: HSL-based color tokens with alpha channel support, enabling consistent theming across components and supporting future dark mode implementation.

## External Dependencies

### Core Framework Dependencies
- **React 18** - Frontend UI library
- **Express** - Backend HTTP server
- **Vite** - Build tool and development server with HMR
- **TypeScript** - Type system for both frontend and backend

### Database & ORM
- **Drizzle ORM** (`drizzle-orm`) - Type-safe database toolkit
- **@neondatabase/serverless** - Neon PostgreSQL serverless driver
- **drizzle-zod** - Zod schema generation from Drizzle schemas
- **connect-pg-simple** - PostgreSQL session store for Express

### UI Component Libraries
- **Radix UI** - Extensive collection of unstyled, accessible UI primitives (accordion, alert-dialog, avatar, checkbox, dialog, dropdown-menu, hover-card, label, navigation-menu, popover, progress, radio-group, scroll-area, select, separator, slider, switch, tabs, toast, toggle, tooltip)
- **shadcn/ui** - Pre-built component patterns using Radix primitives
- **Tailwind CSS** - Utility-first CSS framework
- **class-variance-authority** - Component variant styling
- **cmdk** - Command palette component
- **embla-carousel-react** - Carousel/slider functionality

### Data Fetching & Forms
- **@tanstack/react-query** - Server state management and caching
- **React Hook Form** - Form state management
- **@hookform/resolvers** - Form validation resolvers
- **Zod** - Schema validation library
- **date-fns** - Date manipulation utilities

### Real-time Communication
- **ws** - WebSocket server and client implementation

### Routing
- **wouter** - Lightweight client-side routing

### Development Tools
- **Replit plugins** - Development environment integrations for error handling, cartographer, and dev banner
- **esbuild** - Backend bundler for production builds
- **tsx** - TypeScript execution for development

### Asset Management
Generated images are stored in `attached_assets/generated_images/` and imported via the image mapping system to ensure proper bundling and optimization.