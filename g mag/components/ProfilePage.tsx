"use client";

import { useState } from "react";
import { user } from "@/data/mock";
import { notifications } from "@/data/mock";
import { useApp } from "@/hooks/useApp";
import {
  User,
  Building2,
  FileText,
  MapPin,
  Users,
  CreditCard,
  Bell,
  LogOut,
  ChevronRight,
  Package,
  Gift,
  AlertCircle,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ProfilePage() {
  const { setActiveTab } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);

  const menuItems = [
    { icon: Building2, label: "Профиль компании", value: user.companyName },
    { icon: FileText, label: "Реквизиты и договор", value: "ИНН " + user.inn },
    { icon: MapPin, label: "Адреса доставки", value: user.address },
    { icon: Users, label: "Сотрудники", value: "3 пользователя" },
    { icon: CreditCard, label: "Способы оплаты", value: "Безналичный расчёт" },
    { icon: Bell, label: "Уведомления", value: `${notifications.filter((n) => !n.read).length} новых`, action: () => setShowNotifications(true) },
  ];

  if (showNotifications) {
    return (
      <div className="animate-fade-in px-4 pt-4 md:px-6 md:pt-6 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setShowNotifications(false)}
            className="rounded-xl p-2 hover:bg-surface"
          >
            <ChevronRight size={20} className="text-txt-secondary rotate-180" />
          </button>
          <h1 className="text-xl font-bold text-txt-primary">Уведомления</h1>
        </div>
        <div className="space-y-2">
          {notifications.map((n) => {
            const icons = {
              order: Package,
              bonus: Gift,
              promo: AlertCircle,
              reminder: Clock,
            };
            const Icon = icons[n.type];
            return (
              <div
                key={n.id}
                className={cn(
                  "flex items-start gap-3 rounded-xl border p-3",
                  n.read ? "bg-surface border-border" : "bg-primary/5 border-primary/20"
                )}
              >
                <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", n.read ? "bg-background" : "bg-primary/10")}>
                  <Icon size={16} className={n.read ? "text-txt-muted" : "text-primary"} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={cn("text-sm font-medium", n.read ? "text-txt-secondary" : "text-txt-primary")}>
                      {n.title}
                    </p>
                    {!n.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                  </div>
                  <p className="mt-0.5 text-xs text-txt-muted">{n.message}</p>
                  <p className="mt-1 text-[10px] text-txt-muted">{n.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in px-4 pt-4 md:px-6 md:pt-6 pb-6 space-y-5">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
          <span className="text-2xl font-bold text-primary">G</span>
        </div>
        <div>
          <h1 className="text-lg font-bold text-txt-primary">{user.companyName}</h1>
          <p className="text-xs text-txt-muted">ИНН {user.inn}</p>
        </div>
      </div>

      {/* Menu */}
      <div className="rounded-2xl bg-surface border border-border overflow-hidden">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={item.action || (() => {})}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-surface-hover transition-colors",
                index !== menuItems.length - 1 && "border-b border-border"
              )}
            >
              <Icon size={18} className="text-txt-muted shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-txt-primary">{item.label}</p>
                <p className="text-xs text-txt-muted truncate">{item.value}</p>
              </div>
              <ChevronRight size={16} className="text-txt-muted shrink-0" />
            </button>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setActiveTab("orders")}
          className="flex flex-col items-center gap-2 rounded-2xl bg-surface border border-border p-4 hover:border-primary/30 transition-colors"
        >
          <Package size={24} className="text-primary" />
          <span className="text-xs font-medium text-txt-primary">Мои заказы</span>
        </button>
        <button
          onClick={() => setActiveTab("home")}
          className="flex flex-col items-center gap-2 rounded-2xl bg-surface border border-border p-4 hover:border-primary/30 transition-colors"
        >
          <Gift size={24} className="text-primary" />
          <span className="text-xs font-medium text-txt-primary">Бонусы</span>
        </button>
      </div>

      {/* Logout */}
      <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-surface border border-border py-3.5 text-sm text-red-400 hover:bg-red-400/5 transition-colors">
        <LogOut size={16} />
        Выйти
      </button>
    </div>
  );
}
