"use client";

import { useApp } from "@/hooks/useApp";
import { user } from "@/data/mock";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CartPageProps {
  onCheckout: () => void;
}

export function CartPage({ onCheckout }: CartPageProps) {
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useApp();
  const [useBonus, setUseBonus] = useState(false);
  const [bonusAmount, setBonusAmount] = useState(0);

  const maxBonus = Math.min(user.bonusBalance, cartTotal);
  const finalTotal = cartTotal - (useBonus ? bonusAmount : 0);
  const bonusEarned = Math.floor(finalTotal * 0.1);

  if (cart.length === 0) {
    return (
      <div className="animate-fade-in flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-surface border border-border mb-4">
          <ShoppingBag size={36} className="text-txt-muted" />
        </div>
        <h2 className="text-lg font-semibold text-txt-primary">Корзина пуста</h2>
        <p className="mt-1 text-sm text-txt-muted">Добавьте товары из каталога</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in px-4 pt-4 md:px-6 md:pt-6 pb-32">
      <h1 className="text-xl font-bold text-txt-primary mb-4">Корзина ({cartCount})</h1>

      {/* Cart Items */}
      <div className="space-y-3">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-3 rounded-2xl bg-surface border border-border p-3">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-background">
              <span className="text-2xl">🛢️</span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-txt-primary">{item.name}</h3>
              <p className="text-xs text-txt-muted">{item.volume} л</p>
              <p className="mt-1 text-sm font-bold text-txt-primary">{item.price.toLocaleString()} COM</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button
                onClick={() => removeFromCart(item.id)}
                className="rounded-lg p-1 text-txt-muted hover:text-red-400 transition-colors"
              >
                <Trash2 size={16} />
              </button>
              <div className="flex items-center gap-2 rounded-lg bg-background border border-border px-2 py-1">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="rounded p-0.5 hover:bg-surface"
                >
                  <Minus size={14} className="text-txt-secondary" />
                </button>
                <span className="min-w-[20px] text-center text-sm font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="rounded p-0.5 hover:bg-surface"
                >
                  <Plus size={14} className="text-txt-secondary" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bonus Section */}
      <div className="mt-5 rounded-2xl bg-surface border border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag size={18} className="text-primary" />
            <span className="text-sm font-medium text-txt-primary">Использовать бонусы</span>
          </div>
          <button
            onClick={() => {
              setUseBonus(!useBonus);
              if (!useBonus) setBonusAmount(maxBonus);
            }}
            className={cn(
              "relative h-7 w-12 rounded-full transition-colors",
              useBonus ? "bg-primary" : "bg-border"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform",
                useBonus ? "translate-x-5" : "translate-x-0.5"
              )}
            />
          </button>
        </div>
        {useBonus && (
          <div className="mt-3 animate-fade-in">
            <div className="flex items-center justify-between text-xs text-txt-muted mb-2">
              <span>Доступно: {user.bonusBalance.toLocaleString()} COM</span>
              <span>Макс: {maxBonus.toLocaleString()} COM</span>
            </div>
            <input
              type="range"
              min={0}
              max={maxBonus}
              value={bonusAmount}
              onChange={(e) => setBonusAmount(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="mt-2 text-center">
              <span className="text-sm font-semibold text-primary">{bonusAmount.toLocaleString()} COM</span>
            </div>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mt-5 rounded-2xl bg-surface border border-border p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-txt-muted">Товары на сумму</span>
          <span className="text-txt-primary">{cartTotal.toLocaleString()} COM</span>
        </div>
        {useBonus && bonusAmount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-txt-muted">Бонусы</span>
            <span className="text-primary">-{bonusAmount.toLocaleString()} COM</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-txt-muted">Доставка</span>
          <span className="text-success">Бесплатно</span>
        </div>
        <div className="border-t border-border pt-2 flex justify-between">
          <span className="text-base font-semibold text-txt-primary">Итого</span>
          <span className="text-xl font-bold text-txt-primary">{finalTotal.toLocaleString()} COM</span>
        </div>
        <p className="text-xs text-success text-right">+{bonusEarned} бонусов будет начислено</p>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        className="mt-5 w-full rounded-2xl bg-primary py-4 text-sm font-semibold text-white hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20 transition-all"
      >
        <span className="flex items-center justify-center gap-2">
          Оформить заказ <ArrowRight size={18} />
        </span>
      </button>
    </div>
  );
}
