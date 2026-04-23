"use client";

import { useState } from "react";
import { useApp } from "@/hooks/useApp";
import { products, orders, promos, user } from "@/data/mock";
import { ProductCard } from "@/components/ProductCard";
import { LoyaltyWidget } from "@/components/LoyaltyWidget";
import { OrderCard } from "@/components/OrderCard";
import { Search, Bell, Zap, ChevronRight, Tag, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface HomePageProps {
  onQuickOrder?: () => void;
  onProductClick?: (productId: string) => void;
}

export function HomePage({ onQuickOrder, onProductClick }: HomePageProps) {
  const { setActiveTab, addToCart } = useApp();
  const [searchQuery, setSearchQuery] = useState("");

  const popularProducts = products.slice(0, 4);
  const lastOrder = orders[0];

  const handleQuickReorder = () => {
    if (lastOrder) {
      lastOrder.items.forEach((item) => addToCart({ ...item, quantity: item.quantity }));
      setActiveTab("cart");
    }
  };

  return (
    <div className="animate-fade-in space-y-5 px-4 pt-4 md:px-6 md:pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-txt-muted">Добро пожаловать,</p>
          <h1 className="text-lg font-bold text-txt-primary">{user.companyName}</h1>
        </div>
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-surface border border-border hover:border-primary/30 transition-colors">
          <Bell size={20} className="text-txt-secondary" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary" />
        </button>
      </div>

      {/* Loyalty Balance */}
      <LoyaltyWidget compact />

      {/* Quick Order */}
      <button
        onClick={onQuickOrder}
        className="w-full rounded-2xl bg-primary p-4 text-left hover:bg-primary-hover transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
              <Zap size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Быстрый заказ</p>
              <p className="text-xs text-white/70">Повторить последний заказ</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-white/70" />
        </div>
      </button>

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-txt-muted" />
        <input
          type="text"
          placeholder="Поиск по каталогу..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setActiveTab("catalog")}
          className="w-full rounded-2xl bg-surface border border-border py-3.5 pl-11 pr-4 text-sm text-txt-primary placeholder:text-txt-muted focus:border-primary focus:outline-none transition-colors"
        />
      </div>

      {/* Promo Banners */}
      <div className="hide-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 md:mx-0 md:px-0">
        {promos.map((promo) => (
          <div
            key={promo.id}
            className="relative flex-shrink-0 w-[280px] rounded-2xl bg-surface border border-border overflow-hidden"
          >
            <div className="h-24 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <Tag size={32} className="text-primary" />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                  {promo.discount}
                </span>
                <span className="text-[10px] text-txt-muted">до {promo.endDate}</span>
              </div>
              <h3 className="mt-2 text-sm font-semibold text-txt-primary">{promo.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Popular Products */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-txt-primary">Популярные товары</h2>
          <button
            onClick={() => setActiveTab("catalog")}
            className="flex items-center gap-1 text-xs text-primary hover:text-primary-hover transition-colors"
          >
            Все товары <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} variant="grid" onClick={() => onProductClick?.(product.id)} />
          ))}
        </div>
      </div>

      {/* Last Order */}
      {lastOrder && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-txt-primary">Последний заказ</h2>
            <button
              onClick={() => setActiveTab("orders")}
              className="flex items-center gap-1 text-xs text-primary hover:text-primary-hover transition-colors"
            >
              История <ChevronRight size={14} />
            </button>
          </div>
          <OrderCard order={lastOrder} showRepeat={true} />
        </div>
      )}
    </div>
  );
}
