"use client";

import { ReactNode } from "react";
import { AppProvider } from "@/hooks/useApp";
import { Navbar } from "@/components/Navbar";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        <main className="pb-24 md:pb-8">{children}</main>
        <Navbar />
      </div>
    </AppProvider>
  );
}
