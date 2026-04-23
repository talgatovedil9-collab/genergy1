"use client";

import { useState, useMemo } from "react";
import { products } from "@/data/mock";
import { ProductCard } from "@/components/ProductCard";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const viscosityOptions = ["0W-20", "5W-30", "5W-40", "10W-30", "10W-40", "15W-40", "20W-50"];
const typeOptions = [
  { id: "engine", label: "Моторные масла" },
  { id: "transmission", label: "Трансмиссионные" },
  { id: "hydraulic", label: "Гидравлические" },
  { id: "antifreeze", label: "Антифризы" },
  { id: "grease", label: "Смазки" },
];

interface CatalogPageProps {
  onProductClick?: (productId: string) => void;
}

export function CatalogPage({ onProductClick }: CatalogPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedViscosity, setSelectedViscosity] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "stock" | "name">("name");

  const filteredProducts = useMemo(() => {
    let result = products;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.viscosity.toLowerCase().includes(q) ||
          p.specs.api?.toLowerCase().includes(q)
      );
    }

    if (selectedViscosity.length > 0) {
      result = result.filter((p) => selectedViscosity.includes(p.viscosity));
    }

    if (selectedTypes.length > 0) {
      result = result.filter((p) => selectedTypes.includes(p.type));
    }

    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "stock":
        result = [...result].sort((a, b) => b.stock - a.stock);
        break;
      default:
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [searchQuery, selectedViscosity, selectedTypes, sortBy]);

  const toggleViscosity = (v: string) => {
    setSelectedViscosity((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );
  };

  const toggleType = (t: string) => {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const clearFilters = () => {
    setSelectedViscosity([]);
    setSelectedTypes([]);
    setSearchQuery("");
  };

  const activeFiltersCount = selectedViscosity.length + selectedTypes.length;

  return (
    <div className="animate-fade-in px-4 pt-4 md:px-6 md:pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-txt-primary">Каталог</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors border",
            showFilters || activeFiltersCount > 0
              ? "bg-primary/10 border-primary/30 text-primary"
              : "bg-surface border-border text-txt-secondary hover:text-txt-primary"
          )}
        >
          <SlidersHorizontal size={16} />
          <span className="hidden sm:inline">Фильтры</span>
          {activeFiltersCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-txt-muted" />
        <input
          type="text"
          placeholder="Поиск по каталогу..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-2xl bg-surface border border-border py-3.5 pl-11 pr-4 text-sm text-txt-primary placeholder:text-txt-muted focus:border-primary focus:outline-none transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-surface"
          >
            <X size={16} className="text-txt-muted" />
          </button>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-4 rounded-2xl bg-surface border border-border p-4 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-txt-primary">Фильтры</h3>
            <button
              onClick={clearFilters}
              className="text-xs text-primary hover:text-primary-hover transition-colors"
            >
              Сбросить
            </button>
          </div>

          {/* Type Filter */}
          <div className="mb-4">
            <p className="text-xs text-txt-muted mb-2 uppercase tracking-wider">Тип продукции</p>
            <div className="flex flex-wrap gap-2">
              {typeOptions.map((type) => (
                <button
                  key={type.id}
                  onClick={() => toggleType(type.id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium border transition-all",
                    selectedTypes.includes(type.id)
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "bg-background border-border text-txt-secondary hover:text-txt-primary"
                  )}
                >
                  <div className={cn("h-3.5 w-3.5 rounded border", selectedTypes.includes(type.id) ? "bg-primary border-primary" : "border-txt-muted")}>
                    {selectedTypes.includes(type.id) && (
                      <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 text-white">
                        <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Viscosity Filter */}
          <div>
            <p className="text-xs text-txt-muted mb-2 uppercase tracking-wider">Вязкость</p>
            <div className="flex flex-wrap gap-2">
              {viscosityOptions.map((v) => (
                <button
                  key={v}
                  onClick={() => toggleViscosity(v)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-medium border transition-all",
                    selectedViscosity.includes(v)
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "bg-background border-border text-txt-secondary hover:text-txt-primary"
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sort & Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-txt-muted">{filteredProducts.length} товаров</p>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="appearance-none rounded-lg bg-surface border border-border px-3 py-1.5 pr-8 text-xs text-txt-secondary focus:border-primary focus:outline-none"
          >
            <option value="name">По названию</option>
            <option value="price-asc">Цена ↑</option>
            <option value="price-desc">Цена ↓</option>
            <option value="stock">Наличие</option>
          </select>
          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-txt-muted pointer-events-none" />
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 pb-6">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              variant="grid" 
              onClick={() => onProductClick?.(product.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Search size={40} className="text-txt-muted mb-3" />
          <p className="text-sm text-txt-secondary">Товары не найдены</p>
          <p className="text-xs text-txt-muted mt-1">Попробуйте изменить фильтры или поисковый запрос</p>
          <button
            onClick={clearFilters}
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  );
}
