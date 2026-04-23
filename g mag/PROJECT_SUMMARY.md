
# G-Energy B2B E-Commerce Platform — Complete Delivery

## Project Overview
Production-ready B2B ordering platform for automotive oils (G-Energy brand).
Target users: Auto services (СТО) and Dealers.

## Key Design Decisions

### 1. App Shell Architecture
- `layout.tsx` — Server Component (exports metadata, no 'use client')
- `page.tsx` — Server Component (renders AppShell client component)
- `AppShell.tsx` — Client Component (view router, state coordination)
- `Providers.tsx` — Client Component (Context provider + Navbar wrapper)

This follows Next.js 14 best practices for Server/Client Component composition.

### 2. State Management
React Context via `useApp.ts` with:
- Cart state (add/remove/update/clear)
- Order history
- Active navigation tab
- Computed totals (cartTotal, cartCount)

No external state libraries — pure React for simplicity and bundle size.

### 3. Styling Strategy
Tailwind CSS v3 + CSS Custom Properties:
- Colors defined in `globals.css` via `@layer utilities` to avoid 
  naming conflicts with Tailwind's built-in utilities
- Dark theme only (G-Energy brand identity)
- Mobile-first responsive design

### 4. Component Design
- `ProductCard` — 3 variants: grid (catalog), list (related), compact (quick order)
- `OrderCard` — Status badges, one-click reorder, item thumbnails
- `LoyaltyWidget` — Compact (home) and full (loyalty page) modes
- `OrderTracker` — Visual timeline with animated progress

### 5. Data Layer
Mock data in `data/mock.ts` with real G-Energy product specifications:
- API SN/CF, ACEA C3, OEM approvals (MB, VW, BMW)
- 10 products across 5 categories
- 4 orders with full tracking history
- Bonus/loyalty system with tier progression

## File Inventory (26 files, ~2,600 lines)

### Configuration (5 files)
- `package.json` — Dependencies and scripts
- `tsconfig.json` — TypeScript configuration
- `tailwind.config.ts` — Tailwind theme extension
- `postcss.config.js` — PostCSS plugins
- `next.config.js` — Next.js configuration

### App Router (2 files)
- `app/layout.tsx` — Root layout (Server Component)
- `app/page.tsx` — Home page (Server Component → AppShell)

### Components (16 files)
- `AppShell.tsx` — View router and state coordination
- `Providers.tsx` — Context provider wrapper
- `Navbar.tsx` — Bottom tab navigation
- `HomePage.tsx` — Dashboard with loyalty, promos, popular products
- `CatalogPage.tsx` — Product catalog with filters and sorting
- `ProductDetailPage.tsx` — Product card with specs and add to cart
- `CartPage.tsx` — Shopping cart with bonus usage
- `CheckoutPage.tsx` — Multi-step checkout flow
- `OrdersPage.tsx` — Order history with filters
- `OrderTracker.tsx` — Order status timeline
- `LoyaltyPage.tsx` — Bonus program and history
- `LoyaltyWidget.tsx` — Bonus balance widget (compact/full)
- `ProfilePage.tsx` — User profile and notifications
- `QuickOrderPage.tsx` — Fast multi-product ordering
- `ProductCard.tsx` — Product card (grid/list/compact variants)
- `OrderCard.tsx` — Order summary card

### Data & Types (3 files)
- `types/index.ts` — TypeScript interfaces
- `data/mock.ts` — Mock data (products, orders, user, notifications)
- `lib/utils.ts` — cn() utility (clsx + tailwind-merge)

### Hooks (1 file)
- `hooks/useApp.ts` — React Context for global state

### Styles (1 file)
- `styles/globals.css` — Tailwind directives + CSS custom properties

## How to Run

```bash
cd genergy-b2b
npm install
npm run dev
```

Open http://localhost:3000

## Currency
All prices in Kyrgyz som (KGS / COM)

## Brand
G-Energy — Gazpromneft lubricants
