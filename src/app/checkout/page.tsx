"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShoppingBag, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { FadeIn } from "@/components/ui/motion";

const UB_DISTRICTS = [
  "Баянгол",
  "Баянзүрх",
  "Сүхбаатар",
  "Чингэлтэй",
  "Хан-Уул",
  "Сонгинохайрхан",
  "Налайх",
  "Багануур",
  "Багахангай",
];

export default function CheckoutPage() {
  const { t, locale } = useI18n();
  const { items, totalPrice, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const shippingFree = totalPrice >= 100000;
  const shippingCost = shippingFree ? 0 : 5000;
  const finalTotal = totalPrice + shippingCost;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const num = "SR-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setOrderNumber(num);
    setOrderPlaced(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Empty cart state
  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-6 py-20">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
          <ShoppingBag className="h-8 w-8 text-gray-300" />
        </div>
        <h1 className="mt-6 font-display text-2xl font-semibold text-navy">
          {t("checkout.emptyCart")}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          {t("checkout.emptyCartDesc")}
        </p>
        <Link href="/shop">
          <Button className="mt-8 min-h-[48px] rounded-xl bg-navy px-8 text-white hover:bg-navy/90">
            {t("checkout.goShopping")}
          </Button>
        </Link>
      </div>
    );
  }

  // Order success state
  if (orderPlaced) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-6 py-20">
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="mt-6 font-display text-3xl font-semibold text-navy">
              {t("checkout.orderPlaced")}
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-500">
              {t("checkout.orderPlacedDesc")}
            </p>
            <div className="mt-6 rounded-xl bg-cream px-6 py-4">
              <p className="text-xs text-gray-500">{t("checkout.orderNumber")}</p>
              <p className="mt-1 font-display text-xl font-semibold text-navy tracking-wider">
                {orderNumber}
              </p>
            </div>
            <Link href="/shop">
              <Button className="mt-8 min-h-[48px] rounded-xl bg-navy px-8 text-white hover:bg-navy/90">
                {t("checkout.continueShopping")}
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 md:py-16">
      {/* Header */}
      <FadeIn>
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.history.back();
          }}
          className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-navy"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("checkout.backToCart")}
        </Link>
        <h1 className="mt-4 font-display text-3xl font-semibold text-navy md:text-4xl">
          {t("checkout.title")}
        </h1>
      </FadeIn>

      <form onSubmit={handleSubmit}>
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left: Form */}
          <div className="lg:col-span-7">
            {/* Contact Information */}
            <FadeIn delay={0.1}>
              <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8">
                <h2 className="font-display text-lg font-semibold text-navy">
                  {t("checkout.contactInfo")}
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      {t("checkout.firstName")}
                    </Label>
                    <Input
                      id="firstName"
                      required
                      className="mt-1.5 min-h-[44px] rounded-xl border-gray-200 bg-gray-50/50 focus-visible:ring-gold/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      {t("checkout.lastName")}
                    </Label>
                    <Input
                      id="lastName"
                      required
                      className="mt-1.5 min-h-[44px] rounded-xl border-gray-200 bg-gray-50/50 focus-visible:ring-gold/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      {t("checkout.phone")}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder="+976"
                      className="mt-1.5 min-h-[44px] rounded-xl border-gray-200 bg-gray-50/50 focus-visible:ring-gold/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      {t("checkout.email")}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      className="mt-1.5 min-h-[44px] rounded-xl border-gray-200 bg-gray-50/50 focus-visible:ring-gold/30"
                    />
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Delivery Address */}
            <FadeIn delay={0.2}>
              <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 md:p-8">
                <h2 className="font-display text-lg font-semibold text-navy">
                  {t("checkout.deliveryAddress")}
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="district" className="text-sm font-medium text-gray-700">
                      {t("checkout.district")}
                    </Label>
                    <Select required>
                      <SelectTrigger className="mt-1.5 min-h-[44px] w-full rounded-xl border-gray-200 bg-gray-50/50 shadow-none focus-visible:ring-gold/30">
                        <SelectValue placeholder={t("checkout.selectDistrict")} />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border border-gray-100 bg-white shadow-lg">
                        {UB_DISTRICTS.map((d) => (
                          <SelectItem key={d} value={d} className="rounded-lg">
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="khoroo" className="text-sm font-medium text-gray-700">
                      {t("checkout.khoroo")}
                    </Label>
                    <Input
                      id="khoroo"
                      required
                      className="mt-1.5 min-h-[44px] rounded-xl border-gray-200 bg-gray-50/50 focus-visible:ring-gold/30"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                      {t("checkout.address")}
                    </Label>
                    <Input
                      id="address"
                      required
                      className="mt-1.5 min-h-[44px] rounded-xl border-gray-200 bg-gray-50/50 focus-visible:ring-gold/30"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                      {t("checkout.notes")}
                    </Label>
                    <Textarea
                      id="notes"
                      rows={3}
                      placeholder={t("checkout.notesPlaceholder")}
                      className="mt-1.5 rounded-xl border-gray-200 bg-gray-50/50 resize-none focus-visible:ring-gold/30"
                    />
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Place Order Button — mobile only */}
            <div className="mt-6 lg:hidden">
              <Button
                type="submit"
                className="w-full min-h-[52px] rounded-xl bg-navy text-base font-semibold text-white tracking-wide hover:bg-navy/90"
              >
                {t("checkout.placeOrder")}
              </Button>
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5" />
                  {locale === "mn" ? "Аюулгүй" : "Secure"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Truck className="h-3.5 w-3.5" />
                  {locale === "mn" ? "Хурдан хүргэлт" : "Fast delivery"}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5">
            <FadeIn delay={0.15}>
              <div className="sticky top-36 rounded-2xl border border-gray-100 bg-white p-6 md:p-8">
                <h2 className="font-display text-lg font-semibold text-navy">
                  {t("checkout.orderSummary")}
                </h2>

                {/* Items */}
                <div className="mt-6 space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-warm-gray">
                        <Image
                          src={item.product.image}
                          alt={locale === "mn" ? item.product.name.mn : item.product.name.en}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-gold-dark">
                            {item.product.brand}
                          </p>
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">
                            {locale === "mn" ? item.product.name.mn : item.product.name.en}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-400">
                            x{item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-navy whitespace-nowrap">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="mt-6 space-y-3 border-t border-gray-100 pt-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{t("checkout.subtotal")}</span>
                    <span className="font-medium text-gray-900">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{t("checkout.shipping")}</span>
                    <span className="font-medium text-gray-900">
                      {shippingFree
                        ? t("checkout.shippingFree")
                        : formatPrice(shippingCost)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                    <span className="text-base font-medium text-gray-900">
                      {t("checkout.total")}
                    </span>
                    <span className="text-xl font-bold text-navy">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </div>

                {/* Place Order — desktop */}
                <div className="mt-6 hidden lg:block">
                  <Button
                    type="submit"
                    className="w-full min-h-[52px] rounded-xl bg-navy text-base font-semibold text-white tracking-wide hover:bg-navy/90"
                  >
                    {t("checkout.placeOrder")}
                  </Button>
                  <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5" />
                      {locale === "mn" ? "Аюулгүй" : "Secure"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Truck className="h-3.5 w-3.5" />
                      {locale === "mn" ? "Хурдан хүргэлт" : "Fast delivery"}
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </form>
    </div>
  );
}
