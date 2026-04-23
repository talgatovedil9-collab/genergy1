import type { Metadata } from "next";
import "@/styles/globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "G-Energy B2B — Портал для СТО и дилеров",
  description: "B2B платформа для заказа моторных масел G-Energy. Быстрые повторные заказы, бонусная программа, отслеживание доставки.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-background text-txt-primary">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
