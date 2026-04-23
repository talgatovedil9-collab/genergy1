"use client";

import { Order } from "@/types";
import { CheckCircle2, Clock, Loader2, Truck, Package, MapPin, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderTrackerProps {
  order: Order;
}

const timelineSteps = [
  { status: "accepted", label: "Принят", icon: Clock, time: "10:30" },
  { status: "processing", label: "Собирается", icon: Loader2, time: "11:15" },
  { status: "shipped", label: "Отгружен", icon: Truck, time: "16:45" },
  { status: "delivered", label: "Доставлен", icon: Package, time: "15:05" },
];

export function OrderTracker({ order }: OrderTrackerProps) {
  const currentIndex = timelineSteps.findIndex((s) => s.status === order.status);

  return (
    <div className="px-4 py-4 md:px-6 md:py-6 space-y-5">
      {/* Order Info */}
      <div className="rounded-2xl bg-surface border border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-txt-muted">Заказ №{order.number}</p>
            <p className="text-sm text-txt-secondary">от {order.date}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-txt-primary">{order.total.toLocaleString()} COM</p>
            <p className="text-xs text-success">+{order.bonusEarned} бонусов</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-2xl bg-surface border border-border p-5">
        <h3 className="text-sm font-semibold text-txt-primary mb-4">Статус заказа</h3>
        <div className="relative">
          {timelineSteps.map((step, index) => {
            const StepIcon = step.icon;
            const isCompleted = index <= currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <div key={step.status} className="relative flex gap-4 pb-6 last:pb-0">
                {/* Line */}
                {index < timelineSteps.length - 1 && (
                  <div
                    className={cn(
                      "absolute left-[11px] top-7 h-full w-0.5",
                      index < currentIndex ? "bg-primary" : "bg-border"
                    )}
                  />
                )}
                {/* Dot */}
                <div
                  className={cn(
                    "relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2",
                    isCompleted
                      ? "border-primary bg-primary"
                      : "border-border bg-surface"
                  )}
                >
                  {isCompleted && <CheckCircle2 size={14} className="text-white" />}
                  {isCurrent && !isCompleted && (
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  )}
                </div>
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        isCompleted ? "text-txt-primary" : "text-txt-muted"
                      )}
                    >
                      {step.label}
                    </p>
                    {isCompleted && (
                      <span className="text-xs text-txt-muted">{order.date} {step.time}</span>
                    )}
                  </div>
                  {isCurrent && order.status === "shipped" && (
                    <p className="mt-1 text-xs text-txt-secondary">Ориентировочно {order.deliveryDate}</p>
                  )}
                  {isCurrent && order.status === "delivered" && (
                    <p className="mt-1 text-xs text-success">Заказ успешно доставлен</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delivery Address */}
      <div className="rounded-2xl bg-surface border border-border p-4">
        <div className="flex items-start gap-3">
          <MapPin size={18} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-txt-primary">Доставка по адресу</p>
            <p className="mt-1 text-sm text-txt-secondary">{order.deliveryAddress}</p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="rounded-2xl bg-surface border border-border p-4">
        <h3 className="text-sm font-semibold text-txt-primary mb-3">Состав заказа</h3>
        <div className="space-y-3">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background">
                <span className="text-xl">🛢️</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-txt-primary truncate">{item.name}</p>
                <p className="text-xs text-txt-muted">{item.quantity} шт × {item.price.toLocaleString()} COM</p>
              </div>
              <p className="text-sm font-semibold text-txt-primary">{(item.price * item.quantity).toLocaleString()} COM</p>
            </div>
          ))}
        </div>
        <div className="border-t border-border mt-3 pt-3 flex justify-between">
          <span className="text-sm font-medium text-txt-primary">Итого</span>
          <span className="text-lg font-bold text-txt-primary">{order.total.toLocaleString()} COM</span>
        </div>
      </div>
    </div>
  );
}
