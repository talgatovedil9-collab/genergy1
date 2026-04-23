"use client";

import { useState } from "react";
import { useApp } from "@/hooks/useApp";
import { user, orders as mockOrders } from "@/data/mock";
import { ArrowLeft, MapPin, Calendar, MessageSquare, CheckCircle2, ChevronRight, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Order } from "@/types";

interface CheckoutPageProps {
  onBack: () => void;
  onSuccess: (order: Order) => void;
}

export function CheckoutPage({ onBack, onSuccess }: CheckoutPageProps) {
  const { cart, cartTotal, clearCart } = useApp();
  const [step, setStep] = useState<"form" | "confirm" | "success">("form");
  const [deliveryAddress, setDeliveryAddress] = useState(user.address);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bonusUsed = 0; // simplified
  const bonusEarned = Math.floor(cartTotal * 0.1);

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newOrder: Order = {
        id: String(Date.now()),
        number: String(12346 + mockOrders.length),
        date: new Date().toLocaleDateString("ru-RU"),
        status: "accepted",
        items: [...cart],
        total: cartTotal,
        bonusEarned,
        bonusUsed,
        deliveryAddress,
        deliveryDate: deliveryDate || "Ориентировочно через 3 дня",
        comment,
      };
      onSuccess(newOrder);
      clearCart();
      setStep("success");
      setIsSubmitting(false);
    }, 1500);
  };

  if (step === "success") {
    return (
      <div className="animate-fade-in flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10 mb-4">
          <CheckCircle2 size={40} className="text-success" />
        </div>
        <h2 className="text-xl font-bold text-txt-primary">Заказ принят!</h2>
        <p className="mt-2 text-sm text-txt-secondary">Мы начали его обработку</p>
        <div className="mt-6 rounded-2xl bg-surface border border-border p-4 w-full max-w-sm">
          <p className="text-xs text-txt-muted">Номер заказа</p>
          <p className="text-lg font-bold text-txt-primary">№ {12346 + mockOrders.length}</p>
          <p className="mt-1 text-xs text-txt-muted">от {new Date().toLocaleDateString("ru-RU")}</p>
        </div>
        <div className="mt-4 rounded-2xl bg-surface border border-border p-4 w-full max-w-sm">
          <p className="text-xs text-txt-muted">Начислено бонусов</p>
          <p className="text-lg font-bold text-primary">+{bonusEarned} COM</p>
        </div>
        <button
          onClick={onBack}
          className="mt-6 w-full max-w-sm rounded-2xl bg-primary py-4 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
        >
          Перейти к заказам
        </button>
      </div>
    );
  }

  if (step === "confirm") {
    return (
      <div className="animate-fade-in px-4 pt-4 md:px-6 md:pt-6 pb-32">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setStep("form")} className="rounded-xl p-2 hover:bg-surface">
            <ArrowLeft size={20} className="text-txt-secondary" />
          </button>
          <h1 className="text-xl font-bold text-txt-primary">Подтверждение</h1>
        </div>

        <div className="rounded-2xl bg-surface border border-border p-4 space-y-4">
          <div>
            <p className="text-xs text-txt-muted uppercase tracking-wider">Получатель</p>
            <p className="mt-1 text-sm font-medium text-txt-primary">{user.companyName}</p>
            <p className="text-xs text-txt-secondary">{deliveryAddress}</p>
          </div>
          <div className="border-t border-border pt-3">
            <p className="text-xs text-txt-muted uppercase tracking-wider">Доставка</p>
            <p className="mt-1 text-sm font-medium text-txt-primary">Склад поставщика</p>
            <p className="text-xs text-txt-secondary">г. Бишкек, ул. Логвиненко, 1</p>
          </div>
          <div className="border-t border-border pt-3">
            <p className="text-xs text-txt-muted uppercase tracking-wider">Дата доставки</p>
            <p className="mt-1 text-sm font-medium text-txt-primary">{deliveryDate || "Ориентировочно через 3 дня"}</p>
          </div>
          {comment && (
            <div className="border-t border-border pt-3">
              <p className="text-xs text-txt-muted uppercase tracking-wider">Комментарий</p>
              <p className="mt-1 text-sm text-txt-secondary">{comment}</p>
            </div>
          )}
        </div>

        <div className="mt-5 rounded-2xl bg-surface border border-border p-4">
          <p className="text-xs text-txt-muted uppercase tracking-wider mb-3">Товары</p>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-lg">🛢️</span>
                <div>
                  <p className="text-sm text-txt-primary">{item.name}</p>
                  <p className="text-xs text-txt-muted">{item.quantity} шт × {item.price.toLocaleString()} COM</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-txt-primary">{(item.price * item.quantity).toLocaleString()} COM</p>
            </div>
          ))}
          <div className="border-t border-border pt-3 mt-3 flex justify-between">
            <span className="text-base font-semibold text-txt-primary">Итого</span>
            <span className="text-xl font-bold text-txt-primary">{cartTotal.toLocaleString()} COM</span>
          </div>
        </div>

        <button
          onClick={handleConfirm}
          disabled={isSubmitting}
          className={cn(
            "mt-5 w-full rounded-2xl py-4 text-sm font-semibold text-white transition-all",
            isSubmitting ? "bg-txt-muted cursor-not-allowed" : "bg-primary hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20"
          )}
        >
          {isSubmitting ? "Обработка..." : "Подтвердить заказ"}
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in px-4 pt-4 md:px-6 md:pt-6 pb-32">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="rounded-xl p-2 hover:bg-surface">
          <ArrowLeft size={20} className="text-txt-secondary" />
        </button>
        <h1 className="text-xl font-bold text-txt-primary">Оформление заказа</h1>
      </div>

      {/* Recipient */}
      <div className="rounded-2xl bg-surface border border-border p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <MapPin size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-txt-primary">{user.companyName}</p>
              <p className="text-xs text-txt-secondary">{deliveryAddress}</p>
            </div>
          </div>
          <button className="text-xs text-primary hover:text-primary-hover">Изменить</button>
        </div>
      </div>

      {/* Delivery */}
      <div className="rounded-2xl bg-surface border border-border p-4 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Truck size={18} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-txt-primary">Доставка</p>
            <p className="text-xs text-txt-secondary">Склад поставщика · Бесплатно</p>
          </div>
        </div>
      </div>

      {/* Delivery Date */}
      <div className="rounded-2xl bg-surface border border-border p-4 mb-4">
        <div className="flex items-center gap-3">
          <Calendar size={18} className="text-primary" />
          <div className="flex-1">
            <p className="text-sm font-medium text-txt-primary">Дата доставки</p>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="mt-1 w-full rounded-lg bg-background border border-border px-3 py-2 text-sm text-txt-primary focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Comment */}
      <div className="rounded-2xl bg-surface border border-border p-4 mb-4">
        <div className="flex items-center gap-3 mb-2">
          <MessageSquare size={18} className="text-primary" />
          <p className="text-sm font-medium text-txt-primary">Комментарий к заказу</p>
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Укажите комментарий (необязательно)"
          rows={3}
          className="w-full rounded-lg bg-background border border-border px-3 py-2 text-sm text-txt-primary placeholder:text-txt-muted focus:border-primary focus:outline-none resize-none"
        />
      </div>

      {/* Summary */}
      <div className="rounded-2xl bg-surface border border-border p-4 mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-txt-muted">Товары на сумму</span>
          <span className="text-txt-primary">{cartTotal.toLocaleString()} COM</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-txt-muted">Доставка</span>
          <span className="text-success">Бесплатно</span>
        </div>
        <div className="border-t border-border pt-2 flex justify-between">
          <span className="text-base font-semibold text-txt-primary">Итого</span>
          <span className="text-xl font-bold text-txt-primary">{cartTotal.toLocaleString()} COM</span>
        </div>
      </div>

      <button
        onClick={() => setStep("confirm")}
        className="w-full rounded-2xl bg-primary py-4 text-sm font-semibold text-white hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20 transition-all"
      >
        Подтвердить заказ
      </button>
    </div>
  );
}
