"use client";

import { useState } from "react";
import { useApp } from "@/hooks/useApp";
import { products } from "@/data/mock";
import { Search, Plus, Minus, ShoppingCart, ArrowRight, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickOrderPageProps {
  onDone: () => void;
}

export function QuickOrderPage({ onDone }: QuickOrderPageProps) {
  const { addToCart, cart, cartTotal, updateQuantity, removeFromCart, setActiveTab } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [quickItems, setQuickItems] = useState<{ id: string; qty: number }[]>([]);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.viscosity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addQuickItem = (id: string) => {
    setQuickItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id, qty: 1 }];
    });
  };

  const updateQuickQty = (id: string, delta: number) => {
    setQuickItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const handleAddToCart = () => {
    quickItems.forEach((qi) => {
      const product = products.find((p) => p.id === qi.id);
      if (product) addToCart({ ...product, quantity: qi.qty });
    });
    setActiveTab("cart");
    onDone();
  };

  const quickTotal = quickItems.reduce((sum, qi) => {
    const p = products.find((x) => x.id === qi.id);
    return sum + (p?.price || 0) * qi.qty;
  }, 0);

  return (
    <div className="animate-fade-in px-4 pt-4 md:px-6 md:pt-6 pb-32">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-txt-primary">Быстрый заказ</h1>
        <button onClick={onDone} className="text-sm text-txt-muted hover:text-txt-primary">Закрыть</button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-txt-muted" />
        <input
          type="text"
          placeholder="Введите артикул товара..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-2xl bg-surface border border-border py-3.5 pl-11 pr-4 text-sm text-txt-primary placeholder:text-txt-muted focus:border-primary focus:outline-none"
        />
      </div>

      {/* Quick Items */}
      {quickItems.length > 0 && (
        <div className="mb-4 rounded-2xl bg-surface border border-border p-3 space-y-2">
          <p className="text-xs text-txt-muted uppercase tracking-wider mb-2">Добавленные товары</p>
          {quickItems.map((qi) => {
            const p = products.find((x) => x.id === qi.id);
            if (!p) return null;
            return (
              <div key={qi.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🛢️</span>
                  <div>
                    <p className="text-xs font-medium text-txt-primary">{p.name}</p>
                    <p className="text-[10px] text-txt-muted">{p.price.toLocaleString()} COM</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuickQty(qi.id, -1)} className="rounded p-1 hover:bg-background">
                    <Minus size={14} className="text-txt-secondary" />
                  </button>
                  <span className="min-w-[20px] text-center text-sm font-semibold">{qi.qty}</span>
                  <button onClick={() => updateQuickQty(qi.id, 1)} className="rounded p-1 hover:bg-background">
                    <Plus size={14} className="text-txt-secondary" />
                  </button>
                  <button onClick={() => updateQuickQty(qi.id, -qi.qty)} className="rounded p-1 hover:bg-background ml-1">
                    <Trash2 size={14} className="text-red-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Product List */}
      <div className="space-y-2">
        {filtered.map((product) => {
          const qi = quickItems.find((i) => i.id === product.id);
          return (
            <div
              key={product.id}
              className="flex items-center gap-3 rounded-xl bg-surface border border-border p-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background">
                <span className="text-xl">🛢️</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-txt-primary truncate">{product.name}</p>
                <p className="text-xs text-txt-muted">{product.volume} л · {product.viscosity}</p>
                <p className="text-xs text-success">В наличии: {product.stock} шт</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-txt-primary">{product.price.toLocaleString()} COM</p>
                {qi ? (
                  <div className="flex items-center gap-1 mt-1">
                    <button onClick={() => updateQuickQty(product.id, -1)} className="rounded p-0.5 hover:bg-background">
                      <Minus size={12} className="text-txt-secondary" />
                    </button>
                    <span className="text-xs font-semibold w-4 text-center">{qi.qty}</span>
                    <button onClick={() => updateQuickQty(product.id, 1)} className="rounded p-0.5 hover:bg-background">
                      <Plus size={12} className="text-txt-secondary" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addQuickItem(product.id)}
                    className="mt-1 flex items-center gap-1 rounded-lg bg-primary/10 px-2 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                  >
                    <Plus size={12} /> Добавить
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Bar */}
      {quickItems.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 z-40 px-4 md:static md:px-0 md:mt-4 md:mb-0">
          <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
            <div className="rounded-2xl bg-surface border border-border p-4 shadow-lg shadow-black/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-txt-muted">{quickItems.reduce((s, i) => s + i.qty, 0)} позиций</span>
                <span className="text-lg font-bold text-txt-primary">{quickTotal.toLocaleString()} COM</span>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
              >
                <span className="flex items-center justify-center gap-2">
                  Добавить в корзину <ArrowRight size={16} />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
