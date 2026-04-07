"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, Mail, Calendar, Phone, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { useUser } from "@/lib/user";
import { categories, type Category } from "@/data/products";

export function Header() {
  const { totalItems, setIsOpen: setCartOpen } = useCart();
  const { isLoggedIn, user, setIsOpen: setUserOpen } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navCategories = Object.entries(categories) as [
    Category,
    (typeof categories)[Category],
  ][];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top info bar */}
      <div className="bg-gray-50 border-b border-gray-100 text-sm tracking-wide text-gray-500 py-2 px-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-2 md:px-8">
          <div className="flex items-center gap-4">
            <a href="mailto:info@sunray.mn" className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
              <Mail className="h-3.5 w-3.5" />
              <span>info@sunray.mn</span>
            </a>
            <a href="mailto:sales@sunray.mn" className="hidden sm:flex items-center gap-1.5 hover:text-gray-900 transition-colors">
              <span>sales@sunray.mn</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Даваа - Баасан: 9:00-18:00
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              <a href="tel:+97698509999" className="hover:text-gray-900 transition-colors">9850-9999</a>
              <span>,</span>
              <a href="tel:+97698409999" className="hover:text-gray-900 transition-colors">9840-9999</a>
            </span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-gray-100 bg-white/70 backdrop-blur-xl backdrop-saturate-150">
        <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-[72px] md:px-12">
          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-11 w-11">
                <Menu className="h-6 w-6 text-navy" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-white p-0">
              <div className="flex h-16 items-center border-b px-6">
                <Link href="/" onClick={() => setMobileOpen(false)}>
                  <Image
                    src="/logo-gold.png"
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
                  Нүүр
                </Link>
                <div className="my-2 h-[1px] bg-gray-100" />
                {[
                  { label: "Бүгд", href: "/shop" },
                  { label: "Арьс арчилгаа", href: "/shop?category=skincare" },
                  { label: "Үс арчилгаа", href: "/shop?category=haircare" },
                  { label: "Багц", href: "/shop?category=sets" },
                  { label: "Бусад", href: "/shop?category=devices" },
                  { label: "Арьсны асуудал", href: "/shop?skinType=concern" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-navy hover:bg-cream transition-colors block"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="my-2 h-[1px] bg-gray-100" />
                <Link
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm text-gray-600 hover:bg-cream hover:text-navy transition-colors"
                >
                  Бидний тухай
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo — centered absolutely on mobile */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex-shrink-0 md:static md:translate-x-0">
            <Image
              src="/logo-gold.png"
              alt="Sunray Studio"
              width={160}
              height={56}
              className="h-9 w-auto md:h-10"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {[
              { label: "Бүгд", href: "/shop" },
              { label: "Арьс арчилгаа", href: "/shop?category=skincare" },
              { label: "Үс арчилгаа", href: "/shop?category=haircare" },
              { label: "Багц", href: "/shop?category=sets" },
              { label: "Бусад", href: "/shop?category=devices" },
              { label: "Арьсны асуудал", href: "/shop?skinType=concern" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-md px-3 py-2 text-base font-semibold tracking-wide text-gray-700 hover:bg-cream hover:text-navy transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              className="relative h-[60px] w-[60px] text-gray-500 hover:text-navy hover:bg-cream"
              onClick={() => setUserOpen(true)}
            >
              <User className="h-9 w-9" />
              {isLoggedIn && (
                <span className={`absolute right-2 top-2 h-2.5 w-2.5 rounded-full ${user?.status === "unconfirmed" ? "bg-amber-400" : "bg-gold"}`} />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-[60px] w-[60px] text-gray-500 hover:text-navy hover:bg-cream"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="h-9 w-9" />
              {totalItems > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-navy">
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
