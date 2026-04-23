"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/hooks/useApp";
import { HomePage } from "@/components/HomePage";
import { CatalogPage } from "@/components/CatalogPage";
import { ProductDetailPage } from "@/components/ProductDetailPage";
import { CartPage } from "@/components/CartPage";
import { CheckoutPage } from "@/components/CheckoutPage";
import { OrdersPage } from "@/components/OrdersPage";
import { LoyaltyPage } from "@/components/LoyaltyPage";
import { ProfilePage } from "@/components/ProfilePage";
import { QuickOrderPage } from "@/components/QuickOrderPage";

type View =
  | { name: "home" }
  | { name: "catalog" }
  | { name: "product"; productId: string }
  | { name: "cart" }
  | { name: "checkout" }
  | { name: "orders" }
  | { name: "loyalty" }
  | { name: "profile" }
  | { name: "quick-order" };

export function AppShell() {
  const { activeTab, setActiveTab } = useApp();
  const [view, setView] = useState<View>({ name: "home" });

  const goTo = (v: View) => {
    setView(v);
    if (v.name === "home" || v.name === "quick-order") setActiveTab("home");
    if (v.name === "catalog" || v.name === "product") setActiveTab("catalog");
    if (v.name === "cart" || v.name === "checkout") setActiveTab("cart");
    if (v.name === "orders") setActiveTab("orders");
    if (v.name === "loyalty" || v.name === "profile") setActiveTab("profile");
  };

  useEffect(() => {
    if (activeTab === "home" && view.name !== "home" && view.name !== "quick-order") {
      setView({ name: "home" });
    }
    if (activeTab === "catalog" && view.name !== "catalog" && view.name !== "product") {
      setView({ name: "catalog" });
    }
    if (activeTab === "cart" && view.name !== "cart" && view.name !== "checkout") {
      setView({ name: "cart" });
    }
    if (activeTab === "orders" && view.name !== "orders") {
      setView({ name: "orders" });
    }
    if (activeTab === "profile" && view.name !== "profile" && view.name !== "loyalty") {
      setView({ name: "profile" });
    }
  }, [activeTab]);

  switch (view.name) {
    case "home":
      return (
        <HomePage 
          onQuickOrder={() => goTo({ name: "quick-order" })}
          onProductClick={(id) => goTo({ name: "product", productId: id })}
        />
      );
    case "catalog":
      return <CatalogPage onProductClick={(id) => goTo({ name: "product", productId: id })} />;
    case "product":
      return (
        <ProductDetailPage
          productId={view.productId}
          onBack={() => goTo({ name: "catalog" })}
        />
      );
    case "cart":
      return <CartPage onCheckout={() => goTo({ name: "checkout" })} />;
    case "checkout":
      return (
        <CheckoutPage
          onBack={() => goTo({ name: "cart" })}
          onSuccess={() => goTo({ name: "orders" })}
        />
      );
    case "orders":
      return <OrdersPage />;
    case "loyalty":
      return <LoyaltyPage />;
    case "profile":
      return <ProfilePage />;
    case "quick-order":
      return <QuickOrderPage onDone={() => goTo({ name: "home" })} />;
    default:
      return <HomePage onQuickOrder={() => goTo({ name: "quick-order" })} onProductClick={(id) => goTo({ name: "product", productId: id })} />;
  }
}
