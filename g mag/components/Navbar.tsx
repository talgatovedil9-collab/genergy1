"use client";

import { Home, Grid3X3, ClipboardList, ShoppingCart, User } from "lucide-react";
import { useApp } from "@/hooks/useApp";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "home", label: "Главная", icon: Home },
  { id: "catalog", label: "Каталог", icon: Grid3X3 },
  { id: "orders", label: "Заказы", icon: ClipboardList },
  { id: "cart", label: "Корзина", icon: ShoppingCart },
  { id: "profile", label: "Профиль", icon: User },
];

export function Navbar() {
  const { activeTab, setActiveTab, cartCount } = useApp();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-lg border-t border-border md:static md:border-t-0 md:bg-transparent md:backdrop-blur-none">
      <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        <div className="flex items-center justify-around px-2 py-2 md:py-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 tap-highlight md:flex-row md:gap-2 md:px-4",
                  isActive
                    ? "text-primary"
                    : "text-txt-muted hover:text-txt-secondary"
                )}
              >
                <div className="relative">
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  {tab.id === "cart" && cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className={cn("text-[10px] md:text-sm font-medium", isActive && "font-semibold")}>
                  {tab.label}
                </span>
                {isActive && (
                  <span className="absolute -bottom-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-primary md:hidden" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
