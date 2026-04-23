"use client";

import { useState } from "react";
import { orders as mockOrders } from "@/data/mock";
import { OrderCard } from "@/components/OrderCard";
import { Order } from "@/types";
import { OrderTracker } from "@/components/OrderTracker";
import { ArrowLeft, ClipboardList } from "lucide-react";

export function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const filteredOrders = mockOrders.filter((order) => {
    if (filter === "active") return ["accepted", "processing", "shipped"].includes(order.status);
    if (filter === "completed") return order.status === "delivered";
    return true;
  });

  if (selectedOrder) {
    return (
      <div className="animate-fade-in">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
          <div className="flex items-center gap-3 px-4 py-3 md:px-6">
            <button
              onClick={() => setSelectedOrder(null)}
              className="rounded-xl p-2 hover:bg-surface"
            >
              <ArrowLeft size={20} className="text-txt-secondary" />
            </button>
            <h1 className="text-lg font-bold text-txt-primary">Заказ №{selectedOrder.number}</h1>
          </div>
        </div>
        <OrderTracker order={selectedOrder} />
      </div>
    );
  }

  return (
    <div className="animate-fade-in px-4 pt-4 md:px-6 md:pt-6 pb-6">
      <h1 className="text-xl font-bold text-txt-primary mb-4">История заказов</h1>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {[
          { id: "all" as const, label: "Все" },
          { id: "active" as const, label: "Активные" },
          { id: "completed" as const, label: "Выполненные" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-xl px-4 py-2 text-xs font-medium transition-all border ${
              filter === f.id
                ? "bg-primary/10 border-primary/30 text-primary"
                : "bg-surface border-border text-txt-secondary hover:text-txt-primary"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filteredOrders.length > 0 ? (
        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onClick={() => setSelectedOrder(order)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ClipboardList size={40} className="text-txt-muted mb-3" />
          <p className="text-sm text-txt-secondary">Заказы не найдены</p>
        </div>
      )}
    </div>
  );
}
