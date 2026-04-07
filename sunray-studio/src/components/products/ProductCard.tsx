"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Check, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/data/products";

function useCountdown(endDate?: string) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!endDate) return;

    function update() {
      const now = new Date().getTime();
      const end = new Date(endDate!).getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft("");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeLeft(`${days} хоног`);
      } else {
        setTimeLeft(`${hours} цаг`);
      }
    }

    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [endDate]);

  return timeLeft;
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem, items } = useCart();
  const isInCart = items.some((item) => item.product.id === product.id);
  const countdown = useCountdown(product.saleEndsAt);

  const activeBadges = product.badges ?? (product.badge ? [product.badge] : []);

  const badgeConfig = {
    bestseller: {
      label: "Бестселлер",
      className: "bg-gold text-white border-0",
    },
    new: {
      label: "Шинэ",
      className: "bg-navy text-white border-0",
    },
    sale: {
      label: product.discountPercent ? `-${product.discountPercent}%` : "Хямдрал",
      className: "bg-red-600 text-white border-0",
    },
  };

  return (
    <div className="relative flex flex-col">
      {/* Image container */}
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-square overflow-hidden rounded-xl bg-warm-gray"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badges + Countdown */}
        {(activeBadges.length > 0 || countdown) && (
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {activeBadges.map((b) => (
              <Badge
                key={b}
                className={`text-xs font-semibold uppercase tracking-wider w-fit ${badgeConfig[b].className}`}
              >
                {badgeConfig[b].label}
              </Badge>
            ))}
            {countdown && activeBadges.includes("sale") && (
              <Badge className="flex items-center gap-1 w-fit bg-white text-red-600 border border-red-100 text-xs font-semibold normal-case tracking-wider">
                <Clock className="h-3 w-3" />
                {countdown}
              </Badge>
            )}
          </div>
        )}

      </Link>

      {/* Product info */}
      <div className="mt-4 flex flex-col gap-1.5">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold-dark">
          {product.brand}
        </p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-base font-medium leading-snug text-gray-900 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-baseline gap-2 mt-0.5">
          {product.discountPercent ? (
            <>
              <span className="text-lg font-bold text-red-600">
                {formatPrice(Math.round(product.price * (1 - product.discountPercent / 100)))}
              </span>
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <>
              <span className="text-lg font-bold text-navy">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </>
          )}
        </div>

        {/* Add to cart button */}
        <button
          onClick={() => addItem(product)}
          className={`mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-colors duration-200 ${
            isInCart
              ? "bg-navy text-white"
              : "bg-gray-100 text-gray-900 hover:bg-navy hover:text-white active:bg-navy active:text-white"
          }`}
        >
          {isInCart ? (
            <>
              <Check className="h-4 w-4" strokeWidth={2.5} />
              Сагсанд нэмэгдсэн
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" />
              Сагсанд хийх
            </>
          )}
        </button>
      </div>
    </div>
  );
}
