"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { categories, type Category } from "@/data/products";

export function Header() {
  const { t, locale, setLocale } = useI18n();
  const { totalItems, setIsOpen: setCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navCategories = Object.entries(categories) as [
    Category,
    (typeof categories)[Category],
  ][];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Announcement bar */}
      <div className="bg-navy text-center text-xs tracking-wide text-gray-300 py-2.5 px-4">
        <p>{locale === "mn" ? "Ажлын цаг: 09:00 - 18:00" : "Working hours: 09:00 - 18:00"}</p>
      </div>

      {/* Main header */}
      <div className="border-b border-gray-100 bg-white/98 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-[72px] md:px-12">
          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-11 w-11">
                <Menu className="h-5 w-5 text-navy" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-white p-0">
              <div className="flex h-16 items-center border-b px-6">
                <Link href="/" onClick={() => setMobileOpen(false)}>
                  <Image
                    src="/logo-color.png"
                    alt="Sunray Studio"
                    width={140}
                    height={48}
                    className="h-9 w-auto"
                  />
                </Link>
              </div>
              <nav className="flex flex-col p-4 gap-0.5">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-navy hover:bg-cream transition-colors"
                >
                  {t("nav.home")}
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-semibold text-navy hover:bg-cream transition-colors"
                >
                  {t("nav.allProducts")}
                </Link>
                <div className="my-2 h-[1px] bg-gray-100" />
                {navCategories.map(([key, cat]) => (
                  <Link
                    key={key}
                    href={`/shop?category=${key}`}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm text-gray-600 hover:bg-cream hover:text-navy transition-colors"
                  >
                    {locale === "mn" ? cat.mn : cat.en}
                  </Link>
                ))}
                <div className="my-2 h-[1px] bg-gray-100" />
                <Link
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm text-gray-600 hover:bg-cream hover:text-navy transition-colors"
                >
                  {t("nav.about")}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo-color.png"
              alt="Sunray Studio"
              width={160}
              height={56}
              className="h-9 w-auto md:h-10"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            <Link
              href="/shop"
              className="rounded-md px-3 py-2 text-[13px] tracking-wide text-gray-500 hover:bg-cream hover:text-navy transition-colors"
            >
              {t("nav.shop")}
            </Link>
            {navCategories.map(([key, cat]) => (
              <Link
                key={key}
                href={`/shop?category=${key}`}
                className="rounded-md px-3 py-2 text-[13px] tracking-wide text-gray-500 hover:bg-cream hover:text-navy transition-colors"
              >
                {locale === "mn" ? cat.mn : cat.en}
              </Link>
            ))}
            <Link
              href="/about"
              className="rounded-md px-3 py-2 text-[13px] tracking-wide text-gray-500 hover:bg-cream hover:text-navy transition-colors"
            >
              {t("nav.about")}
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 text-gray-500 hover:text-navy hover:bg-cream"
              onClick={() => setLocale(locale === "mn" ? "en" : "mn")}
              title={locale === "mn" ? "English" : "\u041c\u043e\u043d\u0433\u043e\u043b"}
            >
              <Globe className="h-[18px] w-[18px]" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-11 w-11 text-gray-500 hover:text-navy hover:bg-cream"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {totalItems > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-navy">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
