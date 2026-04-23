"use client";

import { Trophy, ChevronRight, Star } from "lucide-react";
import { user } from "@/data/mock";
import { cn } from "@/lib/utils";

const tierConfig = {
  silver: { label: "SILVER", color: "text-gray-300", bg: "bg-gray-500/20", border: "border-gray-500/30", next: "gold" },
  gold: { label: "GOLD", color: "text-yellow-400", bg: "bg-yellow-400/20", border: "border-yellow-400/30", next: "platinum" },
  platinum: { label: "PLATINUM", color: "text-purple-400", bg: "bg-purple-400/20", border: "border-purple-400/30", next: null },
};

export function LoyaltyWidget({ compact = false }: { compact?: boolean }) {
  const tier = tierConfig[user.loyaltyTier];
  const progress = Math.min((user.totalSpent / user.tierThreshold) * 100, 100);
  const remaining = user.tierThreshold - user.totalSpent;

  if (compact) {
    return (
      <div className="rounded-2xl bg-surface border border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", tier.bg, tier.border, "border")}>
              <Trophy size={20} className={tier.color} />
            </div>
            <div>
              <p className="text-xs text-txt-muted">Бонусный баланс</p>
              <p className="text-xl font-bold text-txt-primary">{user.bonusBalance.toLocaleString()} <span className="text-sm font-normal text-txt-secondary">COM</span></p>
            </div>
          </div>
          <div className="text-right">
            <span className={cn("inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] font-bold", tier.bg, tier.color, tier.border, "border")}>
              <Star size={10} />
              {tier.label}
            </span>
            <p className="mt-1 text-[10px] text-txt-muted">+{user.bonusPending} ожидает</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-surface border border-border p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-txt-muted uppercase tracking-wider">Ваш уровень</p>
          <h2 className={cn("mt-1 text-2xl font-bold tracking-wide", tier.color)}>{tier.label}</h2>
        </div>
        <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl", tier.bg, tier.border, "border")}>
          <Trophy size={28} className={tier.color} />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-txt-muted">{user.totalSpent.toLocaleString()} COM</span>
          <span className="text-txt-muted">{user.tierThreshold.toLocaleString()} COM</span>
        </div>
        <div className="mt-2 h-2.5 w-full rounded-full bg-background overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary-hover transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-txt-muted">
          До следующего уровня: <span className="text-txt-primary font-medium">{remaining.toLocaleString()} COM</span>
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-background p-3 border border-border">
          <p className="text-xs text-txt-muted">Бонусный баланс</p>
          <p className="mt-1 text-lg font-bold text-txt-primary">{user.bonusBalance.toLocaleString()} <span className="text-xs font-normal">COM</span></p>
        </div>
        <div className="rounded-xl bg-background p-3 border border-border">
          <p className="text-xs text-txt-muted">Ожидает начисления</p>
          <p className="mt-1 text-lg font-bold text-primary">{user.bonusPending.toLocaleString()} <span className="text-xs font-normal">COM</span></p>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-background p-3 border border-border">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Star size={16} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-txt-primary">Как копить бонусы</p>
            <p className="text-xs text-txt-muted">Получайте 10% бонусами с каждой покупки</p>
          </div>
        </div>
      </div>
    </div>
  );
}
