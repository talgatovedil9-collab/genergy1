# G-Energy B2B — Портал для СТО и дилеров

## Архитектура

### Next.js 14 App Router (App Shell Pattern)

```
app/
├── layout.tsx          # Server Component — metadata, root layout
├── page.tsx            # Server Component — renders AppShell
├── globals.css         # Tailwind + CSS custom properties

components/
├── AppShell.tsx        # Client Component — view router, state management
├── Providers.tsx       # Client Component — AppProvider + Navbar wrapper
├── Navbar.tsx          # Client Component — bottom navigation
├── HomePage.tsx        # Client Component — dashboard
├── CatalogPage.tsx     # Client Component — product catalog with filters
├── ProductDetailPage.tsx # Client Component — product card
├── CartPage.tsx        # Client Component — shopping cart
├── CheckoutPage.tsx    # Client Component — order checkout flow
├── OrdersPage.tsx      # Client Component — order history
├── OrderTracker.tsx    # Client Component — order status timeline
├── LoyaltyPage.tsx     # Client Component — bonus program
├── LoyaltyWidget.tsx   # Client Component — bonus balance widget
├── ProfilePage.tsx     # Client Component — user profile
├── QuickOrderPage.tsx  # Client Component — fast order form
├── ProductCard.tsx     # Client Component — product card (grid/list/compact)
├── OrderCard.tsx       # Client Component — order card

hooks/
├── useApp.ts           # React Context — cart, orders, activeTab

data/
├── mock.ts             # Mock data — products, orders, user, notifications

types/
├── index.ts            # TypeScript interfaces

lib/
├── utils.ts            # cn() utility — tailwind-merge + clsx
```

### Server / Client Component Split

| Файл | Тип | Почему |
|------|-----|--------|
| `layout.tsx` | Server | Экспортирует `metadata`, не использует хуки |
| `page.tsx` | Server | Рендерит `AppShell` (Client Component) |
| `AppShell.tsx` | Client | Использует `useApp`, `useState`, `useEffect` |
| `Providers.tsx` | Client | Обёртка для `AppProvider` + `Navbar` |
| Все страницы | Client | Интерактивность, состояние, события |

### Цветовая система

CSS custom properties в `globals.css` через `@layer utilities`:

```css
.text-primary     → #FF6A00 (оранжевый бренд)
.text-txt-primary → #FFFFFF (белый текст)
.text-txt-secondary → #A1A1AA (серый текст)
.text-txt-muted   → #71717A (приглушённый)
.bg-primary       → #FF6A00
.bg-background    → #0B0B0C
.bg-surface       → #1A1A1D
.border-border    → #2A2A2E
```

### Функционал

1. **Главная** — баланс бонусов, быстрый заказ, промо-баннеры, популярные товары
2. **Каталог** — фильтры (вязкость, тип), сортировка, поиск
3. **Карточка товара** — характеристики, добавление в корзину
4. **Корзина** — управление количеством, использование бонусов
5. **Оформление** — адрес доставки, дата, комментарий
6. **Отслеживание** — таймлайн статусов (принят → собирается → отгружен → доставлен)
7. **Заказы** — история с фильтрами, повтор заказа в 1 клик
8. **Лояльность** — уровни (Silver/Gold/Platinum), прогресс-бар, история бонусов
9. **Профиль** — компания, уведомления, настройки
10. **Быстрый заказ** — массовое добавление товаров по артикулу

### Запуск

```bash
cd genergy-b2b
npm install
npm run dev
```

Откройте http://localhost:3000
