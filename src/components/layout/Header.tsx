"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, Mail, Calendar, Phone, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { useUser } from "@/lib/user";
import { categories, type Category } from "@/data/products";

export function Header() {
  const { t, locale, setLocale } = useI18n();
  const { totalItems, setIsOpen: setCartOpen } = useCart();
  const { isLoggedIn, setIsOpen: setUserOpen } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navCategories = Object.entries(categories) as [
    Category,
    (typeof categories)[Category],
  ][];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top info bar */}
      <div className="bg-navy text-xs tracking-wide text-gray-300 py-2 px-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-2 md:px-8">
          <div className="flex items-center gap-4">
            <a href="mailto:info@sunray.mn" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="h-3.5 w-3.5" />
              <span>info@sunray.mn</span>
            </a>
            <a href="mailto:sales@sunray.mn" className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors">
              <span>sales@sunray.mn</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {locale === "mn" ? "Даваа - Баасан: 9:00-18:00" : "Mon - Fri: 9:00-18:00"}
            </span>
            <a href="tel:+97698509999" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="h-3.5 w-3.5" />
              <span>9850-9999</span>
            </a>
          </div>
        </div>
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
                  <div key={key}>
                    <Link
                      href={`/shop?category=${key}`}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-4 py-3 text-sm font-medium text-navy hover:bg-cream transition-colors block"
                    >
                      {locale === "mn" ? cat.mn : cat.en}
                    </Link>
                    {cat.subcategories.length > 0 && (
                      <div className="ml-4">
                        {cat.subcategories.map((sub) => (
                          <Link
                            key={sub.key}
                            href={`/shop?category=${key}&sub=${sub.key}`}
                            onClick={() => setMobileOpen(false)}
                            className="rounded-lg px-4 py-2.5 text-sm text-gray-500 hover:bg-cream hover:text-navy transition-colors block"
                          >
                            {locale === "mn" ? sub.mn : sub.en}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
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
              <div key={key} className="group relative">
                <Link
                  href={`/shop?category=${key}`}
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-[13px] tracking-wide text-gray-500 hover:bg-cream hover:text-navy transition-colors"
                >
                  {locale === "mn" ? cat.mn : cat.en}
                  {cat.subcategories.length > 0 && (
                    <ChevronDown className="h-3 w-3 opacity-50 transition-transform group-hover:rotate-180" />
                  )}
                </Link>
                {cat.subcategories.length > 0 && (
                  <div className="invisible absolute left-0 top-full z-50 min-w-[180px] pt-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="rounded-xl border border-gray-100 bg-white py-1.5 shadow-lg">
                      <Link
                        href={`/shop?category=${key}`}
                        className="block px-4 py-2.5 text-[13px] font-medium text-navy hover:bg-cream transition-colors"
                      >
                        {locale === "mn" ? "Бүгд" : "All"}
                      </Link>
                      <div className="mx-3 my-1 h-[1px] bg-gray-100" />
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub.key}
                          href={`/shop?category=${key}&sub=${sub.key}`}
                          className="block px-4 py-2.5 text-[13px] text-gray-600 hover:bg-cream hover:text-navy transition-colors"
                        >
                          {locale === "mn" ? sub.mn : sub.en}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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
              className="h-11 min-w-[44px] px-2.5 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-navy hover:bg-cream"
              onClick={() => setLocale(locale === "mn" ? "en" : "mn")}
              title={locale === "mn" ? "English" : "\u041c\u043e\u043d\u0433\u043e\u043b"}
            >
              {locale === "mn" ? "EN" : "MN"}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-11 w-11 text-gray-500 hover:text-navy hover:bg-cream"
              onClick={() => setUserOpen(true)}
            >
              <User className="h-[18px] w-[18px]" />
              {isLoggedIn && (
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-gold" />
              )}
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
