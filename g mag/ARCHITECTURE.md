
# G-Energy B2B Architecture

## Component Hierarchy

```
┌─────────────────────────────────────────┐
│           layout.tsx (Server)            │
│  ┌─────────────────────────────────────┐ │
│  │         Providers.tsx (Client)       │ │
│  │  ┌───────────────────────────────┐  │ │
│  │  │      AppShell.tsx (Client)     │  │ │
│  │  │  ┌─────────────────────────┐  │  │ │
│  │  │  │    Navbar.tsx (Client)   │  │  │ │
│  │  │  └─────────────────────────┘  │  │ │
│  │  │  ┌─────────────────────────┐  │  │ │
│  │  │  │   [Active Page View]     │  │  │ │
│  │  │  │  • HomePage              │  │  │ │
│  │  │  │  • CatalogPage           │  │  │ │
│  │  │  │  • ProductDetailPage     │  │  │ │
│  │  │  │  • CartPage              │  │  │ │
│  │  │  │  • CheckoutPage          │  │  │ │
│  │  │  │  • OrdersPage            │  │  │ │
│  │  │  │  • LoyaltyPage           │  │  │ │
│  │  │  │  • ProfilePage           │  │  │ │
│  │  │  │  • QuickOrderPage        │  │  │ │
│  │  │  └─────────────────────────┘  │  │ │
│  │  └───────────────────────────────┘  │ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## State Management (React Context)

```
AppProvider (useApp.ts)
├── cart: CartItem[]
│   ├── addToCart(item)
│   ├── removeFromCart(id)
│   ├── updateQuantity(id, qty)
│   └── clearCart()
├── cartTotal: number (computed)
├── cartCount: number (computed)
├── orders: Order[]
│   └── addOrder(order)
├── activeTab: string
│   └── setActiveTab(tab)
└── All state persisted in memory (mock data)
```

## View Routing (AppShell)

```
Navbar Tab ──► View State ──► Rendered Component
─────────────────────────────────────────────────
home          → home         → HomePage
              → quick-order  → QuickOrderPage
catalog       → catalog      → CatalogPage
              → product      → ProductDetailPage
cart          → cart         → CartPage
              → checkout     → CheckoutPage
orders        → orders       → OrdersPage
profile       → profile      → ProfilePage
              → loyalty      → LoyaltyPage
```

## Data Flow

```
User Action
    │
    ▼
[Component] ──► useApp() ──► State Update ──► Re-render
    │                              │
    ▼                              ▼
[Mock Data] ◄─────────────────── [Context]
```

## Color System

```
Primary:    #FF6A00  (Orange)     → Buttons, accents, active states
Background: #0B0B0C  (Black)     → Page background
Surface:      #1A1A1D  (Dark Gray)  → Cards, panels
Border:       #2A2A2E  (Gray)       → Dividers, outlines
Text Primary:   #FFFFFF  (White)      → Headings, important text
Text Secondary: #A1A1AA  (Light Gray) → Descriptions, labels
Text Muted:     #71717A  (Gray)       → Hints, disabled text
Success:      #22C55E  (Green)      → Stock, positive actions
Warning:      #F59E0B  (Yellow)     → Low stock, alerts
```

## Product Types

```
engine        → Моторные масла
transmission  → Трансмиссионные
hydraulic     → Гидравлические
antifreeze    → Антифризы
grease        → Смазки
```

## File Count

```
Configuration:  5 files (package, tsconfig, tailwind, postcss, next)
App Router:     2 files (layout, page)
Components:    17 files (pages + shared + shell + providers)
Hooks:          1 file  (useApp)
Data:           1 file  (mock)
Types:          1 file  (index)
Utils:          1 file  (utils)
Styles:         1 file  (globals)
Documentation:  1 file  (README)
─────────────────────────────────────
Total:         30 files
```
