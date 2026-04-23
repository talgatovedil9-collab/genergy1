"use client";

import { Plus, Minus, Check } from "lucide-react";
import { Product } from "@/types";
import { useApp } from "@/hooks/useApp";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  variant?: "grid" | "list" | "compact";
  onClick?: () => void;
}

export function ProductCard({ product, variant = "grid", onClick }: ProductCardProps) {
  const { addToCart, cart, updateQuantity } = useApp();
  const [added, setAdded] = useState(false);

  const cartItem = cart.find((item) => item.id === product.id);
  const inCart = !!cartItem;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ ...product, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  const handleQtyChange = (e: React.MouseEvent, delta: number) => {
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + delta);
    }
  };

  if (variant === "compact") {
    return (
      <div
        onClick={onClick}
        className="flex items-center gap-3 rounded-xl bg-surface p-3 border border-border cursor-pointer hover:border-primary/30 transition-colors"
      >
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-background">
          <span className="text-2xl">🛢️</span>
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-sm font-medium text-txt-primary">{product.name}</h4>
          <p className="text-xs text-txt-muted">{product.volume} л</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-txt-primary">{product.price.toLocaleString()} COM</p>
          <p className="text-[10px] text-success">В наличии: {product.stock} шт</p>
        </div>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div
        onClick={onClick}
        className="flex items-center gap-4 rounded-2xl bg-surface p-4 border border-border cursor-pointer hover:border-primary/30 transition-all"
      >
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-background">
          <span className="text-3xl">🛢️</span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-txt-primary">{product.name}</h3>
          <div className="mt-1 flex flex-wrap gap-1">
            {product.specs.api && (
              <span className="rounded-md bg-background px-2 py-0.5 text-[10px] font-medium text-txt-secondary border border-border">
                {product.specs.api}
              </span>
            )}
            {product.specs.acea && (
              <span className="rounded-md bg-background px-2 py-0.5 text-[10px] font-medium text-txt-secondary border border-border">
                {product.specs.acea}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-txt-muted">В наличии: {product.stock} шт</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <p className="text-lg font-bold text-txt-primary">{product.price.toLocaleString()} <span className="text-sm font-normal text-txt-secondary">COM</span></p>
          {inCart ? (
            <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-2 py-1">
              <button onClick={(e) => handleQtyChange(e, -1)} className="rounded p-1 hover:bg-primary/20">
                <Minus size={14} className="text-primary" />
              </button>
              <span className="min-w-[20px] text-center text-sm font-semibold text-primary">{cartItem.quantity}</span>
              <button onClick={(e) => handleQtyChange(e, 1)} className="rounded p-1 hover:bg-primary/20">
                <Plus size={14} className="text-primary" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg transition-all",
                added ? "bg-success text-white" : "bg-primary text-white hover:bg-primary-hover"
              )}
            >
              {added ? <Check size={16} /> : <Plus size={18} />}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col rounded-2xl bg-surface border border-border overflow-hidden cursor-pointer hover:border-primary/30 transition-all"
    >
      <div className="relative flex aspect-square items-center justify-center bg-background p-4">
        <span className="text-6xl transition-transform group-hover:scale-110 duration-300">🛢️</span>
        {product.stock < 20 && (
          <span className="absolute top-3 left-3 rounded-lg bg-warning/90 px-2 py-1 text-[10px] font-bold text-black">
            Мало
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-semibold text-txt-primary line-clamp-2">{product.name}</h3>
        <p className="mt-1 text-xs text-txt-muted">{product.volume} л · {product.viscosity}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {product.specs.api && (
            <span className="rounded bg-background px-1.5 py-0.5 text-[10px] text-txt-secondary border border-border">
              {product.specs.api}
            </span>
          )}
        </div>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-txt-primary">{product.price.toLocaleString()}</p>
            <p className="text-[10px] text-txt-muted">COM</p>
          </div>
          {inCart ? (
            <div className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-2 py-1.5">
              <button onClick={(e) => handleQtyChange(e, -1)} className="rounded p-0.5 hover:bg-primary/20">
                <Minus size={14} className="text-primary" />
              </button>
              <span className="min-w-[18px] text-center text-sm font-semibold text-primary">{cartItem.quantity}</span>
              <button onClick={(e) => handleQtyChange(e, 1)} className="rounded p-0.5 hover:bg-primary/20">
                <Plus size={14} className="text-primary" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-xl transition-all",
                added ? "bg-success text-white" : "bg-primary text-white hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20"
              )}
            >
              {added ? <Check size={18} /> : <Plus size={20} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
