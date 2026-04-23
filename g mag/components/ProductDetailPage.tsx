"use client";

import { useState } from "react";
import { useApp } from "@/hooks/useApp";
import { products } from "@/data/mock";
import { ProductCard } from "@/components/ProductCard";
import { ArrowLeft, Heart, Share2, Plus, Minus, Check, ChevronDown, ChevronUp, Package, Award, Droplets } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductDetailPageProps {
  productId: string;
  onBack: () => void;
}

export function ProductDetailPage({ productId, onBack }: ProductDetailPageProps) {
  const { addToCart, cart, updateQuantity, setActiveTab } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [showSpecs, setShowSpecs] = useState(true);
  const [showDesc, setShowDesc] = useState(false);
  const [liked, setLiked] = useState(false);

  const product = products.find((p) => p.id === productId);
  if (!product) return null;

  const cartItem = cart.find((item) => item.id === product.id);
  const related = products.filter((p) => p.type === product.type && p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    addToCart({ ...product, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleQtyChange = (delta: number) => {
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + delta);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          <button
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface border border-border hover:border-primary/30 transition-colors"
          >
            <ArrowLeft size={20} className="text-txt-primary" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setLiked(!liked)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors",
                liked ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-surface border-border text-txt-secondary hover:text-txt-primary"
              )}
            >
              <Heart size={20} className={cn(liked && "fill-current")} />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface border border-border text-txt-secondary hover:text-txt-primary transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 md:px-6 md:py-6 space-y-5">
        {/* Image */}
        <div className="flex aspect-square items-center justify-center rounded-2xl bg-surface border border-border">
          <span className="text-8xl">🛢️</span>
        </div>

        {/* Info */}
        <div>
          <h1 className="text-xl font-bold text-txt-primary">{product.name}</h1>
          <p className="mt-1 text-sm text-txt-muted">{product.volume} л · {product.viscosity}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.specs.api && (
              <span className="rounded-lg bg-surface px-3 py-1 text-xs font-medium text-txt-secondary border border-border">
                {product.specs.api}
              </span>
            )}
            {product.specs.acea && (
              <span className="rounded-lg bg-surface px-3 py-1 text-xs font-medium text-txt-secondary border border-border">
                {product.specs.acea}
              </span>
            )}
          </div>
        </div>

        {/* Price & Stock */}
        <div className="flex items-center justify-between rounded-2xl bg-surface border border-border p-4">
          <div>
            <p className="text-2xl font-bold text-txt-primary">{product.price.toLocaleString()} <span className="text-sm font-normal text-txt-secondary">COM</span></p>
            <p className="text-xs text-success">В наличии: {product.stock} шт</p>
          </div>
          {cartItem ? (
            <div className="flex items-center gap-3 rounded-xl bg-primary/10 px-4 py-2">
              <button onClick={() => handleQtyChange(-1)} className="rounded-lg p-1 hover:bg-primary/20">
                <Minus size={18} className="text-primary" />
              </button>
              <span className="min-w-[24px] text-center text-lg font-semibold text-primary">{cartItem.quantity}</span>
              <button onClick={() => handleQtyChange(1)} className="rounded-lg p-1 hover:bg-primary/20">
                <Plus size={18} className="text-primary" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-xl bg-surface border border-border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-surface-hover rounded-l-xl"
                >
                  <Minus size={16} className="text-txt-secondary" />
                </button>
                <span className="min-w-[32px] text-center text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-surface-hover rounded-r-xl"
                >
                  <Plus size={16} className="text-txt-secondary" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        {!cartItem && (
          <button
            onClick={handleAdd}
            className={cn(
              "w-full rounded-2xl py-4 text-sm font-semibold transition-all",
              added
                ? "bg-success text-white"
                : "bg-primary text-white hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20"
            )}
          >
            {added ? (
              <span className="flex items-center justify-center gap-2">
                <Check size={18} /> Добавлено
              </span>
            ) : (
              `В корзину · ${(product.price * quantity).toLocaleString()} COM`
            )}
          </button>
        )}

        {/* Specs Accordion */}
        <div className="rounded-2xl bg-surface border border-border overflow-hidden">
          <button
            onClick={() => setShowSpecs(!showSpecs)}
            className="flex w-full items-center justify-between p-4 text-left"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-txt-primary">
              <Award size={18} className="text-primary" /> Характеристики
            </span>
            {showSpecs ? <ChevronUp size={18} className="text-txt-muted" /> : <ChevronDown size={18} className="text-txt-muted" />}
          </button>
          {showSpecs && (
            <div className="border-t border-border px-4 py-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-txt-muted">Тип</span>
                <span className="text-txt-primary font-medium">
                  {product.type === "engine" ? "Моторное масло" : product.type === "transmission" ? "Трансмиссионное" : product.type === "hydraulic" ? "Гидравлическое" : product.type === "antifreeze" ? "Антифриз" : "Смазка"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-txt-muted">Вязкость</span>
                <span className="text-txt-primary font-medium">{product.viscosity}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-txt-muted">Объём</span>
                <span className="text-txt-primary font-medium">{product.volume} л</span>
              </div>
              {product.specs.api && (
                <div className="flex justify-between text-sm">
                  <span className="text-txt-muted">Допуски API</span>
                  <span className="text-txt-primary font-medium">{product.specs.api}</span>
                </div>
              )}
              {product.specs.acea && (
                <div className="flex justify-between text-sm">
                  <span className="text-txt-muted">ACEA</span>
                  <span className="text-txt-primary font-medium">{product.specs.acea}</span>
                </div>
              )}
              {product.specs.oem && product.specs.oem.length > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-txt-muted">OEM</span>
                  <span className="text-txt-primary font-medium text-right">{product.specs.oem.join(", ")}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Description Accordion */}
        <div className="rounded-2xl bg-surface border border-border overflow-hidden">
          <button
            onClick={() => setShowDesc(!showDesc)}
            className="flex w-full items-center justify-between p-4 text-left"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-txt-primary">
              <Package size={18} className="text-primary" /> О товаре
            </span>
            {showDesc ? <ChevronUp size={18} className="text-txt-muted" /> : <ChevronDown size={18} className="text-txt-muted" />}
          </button>
          {showDesc && (
            <div className="border-t border-border px-4 py-3">
              <p className="text-sm text-txt-secondary leading-relaxed">{product.description}</p>
            </div>
          )}
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-base font-semibold text-txt-primary mb-3">Рекомендуем для вас</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} variant="compact" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
