"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { Dialog as SheetPrimitive } from "radix-ui";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const { items, removeItem, updateQuantity, totalPrice, isOpen, setIsOpen } =
    useCart();
  const { t, locale } = useI18n();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex w-full flex-col p-0 sm:max-w-[420px]" showCloseButton={false}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <SheetTitle className="flex items-center gap-2.5 text-base font-semibold text-navy">
            <ShoppingBag className="h-5 w-5" />
            {t("cart.title")} ({items.length})
          </SheetTitle>
          <SheetPrimitive.Close className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-gray-500">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
              <ShoppingBag className="h-8 w-8 text-gray-300" />
            </div>
            <p className="text-base font-medium text-gray-700">{t("cart.empty")}</p>
            <Button
              onClick={() => setIsOpen(false)}
              variant="outline"
              className="min-h-[44px] border-gray-200 text-sm font-medium"
            >
              {t("cart.continueShopping")}
            </Button>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="space-y-5">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="relative h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded-xl bg-warm-gray">
                      <Image
                        src={item.product.image}
                        alt={
                          locale === "mn"
                            ? item.product.name.mn
                            : item.product.name.en
                        }
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between py-0.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-gold-dark">
                            {item.product.brand}
                          </p>
                          <p className="text-sm font-medium leading-snug text-gray-900 line-clamp-1">
                            {locale === "mn"
                              ? item.product.name.mn
                              : item.product.name.en}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-navy">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-sm font-bold text-navy">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  {t("cart.total")}
                </span>
                <span className="text-lg font-bold text-navy">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <p className="mt-2 text-center text-xs text-gray-400">
                {t("cart.freeShipping")}
              </p>
              <Link href="/checkout" onClick={() => setIsOpen(false)}>
                <Button className="mt-4 w-full min-h-[48px] rounded-xl bg-navy text-white hover:bg-navy/90 text-sm font-semibold tracking-wide">
                  {t("cart.checkout")}
                </Button>
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
