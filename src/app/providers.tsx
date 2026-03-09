"use client";

import type { ReactNode } from "react";
import { I18nProvider } from "@/lib/i18n";
import { CartProvider } from "@/lib/cart";
import { UserProvider } from "@/lib/user";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { UserDrawer } from "@/components/layout/UserDrawer";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <UserProvider>
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
          <UserDrawer />
        </CartProvider>
      </UserProvider>
    </I18nProvider>
  );
}
