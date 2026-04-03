"use client";

import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { CartProvider } from "@/lib/cart";
import { UserProvider } from "@/lib/user";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { UserDrawer } from "@/components/layout/UserDrawer";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <CartProvider>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CartDrawer />
        <UserDrawer />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              fontFamily: "inherit",
              borderRadius: "12px",
            },
          }}
        />
      </CartProvider>
    </UserProvider>
  );
}
