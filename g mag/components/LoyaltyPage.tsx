"use client";

import { useState } from "react";
import { user, bonusHistory } from "@/data/mock";
import { LoyaltyWidget } from "@/components/LoyaltyWidget";
import { ArrowLeft, Star, ArrowUpRight, ArrowDownRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function LoyaltyPage() {
  const [tab, setTab] = useState<"earned" | "spent">("earned");

  const filteredHistory = bonusHistory.filter((h) =>
    tab === "earned" ? h.type === "credit" : h.type === "debit"
  );

  return (
    <div className="animate-fade-in px-4 pt-4 md:px-6 md:pt-6 pb-6 space-y-5">
      <h1 className="text-xl font-bold text-txt-primary">Программа лояльности</h1>

      <LoyaltyWidget />

      {/* History Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab("earned")}
          className={cn(
            "flex-1 rounded-xl py-2.5 text-xs font-medium transition-all border",
            tab === "earned"
              ? "bg-primary/10 border-primary/30 text-primary"
              : "bg-surface border-border text-txt-secondary"
          )}
        >
          Начисления
        </button>
        <button
          onClick={() => setTab("spent")}
          className={cn(
            "flex-1 rounded-xl py-2.5 text-xs font-medium transition-all border",
            tab === "spent"
              ? "bg-primary/10 border-primary/30 text-primary"
              : "bg-surface border-border text-txt-secondary"
          )}
        >
          Списания
        </button>
      </div>

      {/* History List */}
      <div className="space-y-2">
        {filteredHistory.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl bg-surface border border-border p-3"
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg",
                  item.type === "credit" ? "bg-success/10" : "bg-red-400/10"
                )}
              >
                {item.type === "credit" ? (
                  <ArrowUpRight size={16} className="text-success" />
                ) : (
                  <ArrowDownRight size={16} className="text-red-400" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-txt-primary">{item.description}</p>
                <p className="text-xs text-txt-muted">{item.date}</p>
              </div>
            </div>
            <span
              className={cn(
                "text-sm font-bold",
                item.type === "credit" ? "text-success" : "text-red-400"
              )}
            >
              {item.type === "credit" ? "+" : "-"}{item.amount} COM
            </span>
          </div>
        ))}
      </div>

      <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-surface border border-border py-3 text-xs text-txt-secondary hover:text-txt-primary transition-colors">
        История начислений <ChevronRight size={14} />
      </button>
    </div>
  );
}
