"use client";

import { ChevronRight, RotateCcw, Package, Truck, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { Order } from "@/types";
import { useApp } from "@/hooks/useApp";
import { cn } from "@/lib/utils";

interface OrderCardProps {
  order: Order;
  onClick?: () => void;
  showRepeat?: boolean;
}

const statusConfig = {
  accepted: { label: "Принят", icon: Clock, color: "text-primary", bg: "bg-primary/10", border: "border-primary/30" },
  processing: { label: "Собирается", icon: Loader2, color: "text-warning", bg: "bg-warning/10", border: "border-warning/30" },
  shipped: { label: "Отгружен", icon: Truck, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/30" },
  delivered: { label: "Доставлен", icon: CheckCircle2, color: "text-success", bg: "bg-success/10", border: "border-success/30" },
  cancelled: { label: "Отменён", icon: Package, color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/30" },
};

export function OrderCard({ order, onClick, showRepeat = true }: OrderCardProps) {
  const { addToCart } = useApp();
  const status = statusConfig[order.status];
  const StatusIcon = status.icon;

  const handleRepeat = (e: React.MouseEvent) => {
    e.stopPropagation();
    order.items.forEach((item) => addToCart({ ...item, quantity: item.quantity }));
  };

  return (
    <div
      onClick={onClick}
      className="rounded-2xl bg-surface border border-border p-4 cursor-pointer hover:border-primary/30 transition-all"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-txt-primary">№ {order.number}</h3>
            <span className={cn("flex items-center gap-1 rounded-lg px-2 py-0.5 text-[11px] font-medium", status.bg, status.color, status.border, "border")}>
              <StatusIcon size={12} />
              {status.label}
            </span>
          </div>
          <p className="mt-1 text-xs text-txt-muted">{order.date}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-txt-primary">{order.total.toLocaleString()} <span className="text-xs font-normal text-txt-secondary">COM</span></p>
          <p className="text-[10px] text-success">+{order.bonusEarned} бонусов</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="flex -space-x-2">
          {order.items.slice(0, 3).map((item, i) => (
            <div key={i} className="flex h-8 w-8 items-center justify-center rounded-lg bg-background border-2 border-surface text-sm">
              🛢️
            </div>
          ))}
          {order.items.length > 3 && (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background border-2 border-surface text-[10px] text-txt-muted">
              +{order.items.length - 3}
            </div>
          )}
        </div>
        <p className="text-xs text-txt-muted">{order.items.length} позиций</p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        {showRepeat && (
          <button
            onClick={handleRepeat}
            className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
          >
            <RotateCcw size={14} />
            Повторить заказ
          </button>
        )}
        <button className="ml-auto flex items-center gap-1 text-xs text-txt-muted hover:text-txt-secondary transition-colors">
          Подробнее <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
