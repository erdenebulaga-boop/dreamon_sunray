"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const { locale } = useI18n();
  const { addItem } = useCart();

  const name = locale === "mn" ? product.name.mn : product.name.en;

  const badgeConfig = {
    bestseller: {
      label: locale === "mn" ? "\u0411\u0435\u0441\u0442\u0441\u0435\u043b\u043b\u0435\u0440" : "Bestseller",
      className: "bg-gold text-white border-0",
    },
    new: {
      label: locale === "mn" ? "\u0428\u0438\u043d\u044d" : "New",
      className: "bg-navy text-white border-0",
    },
    sale: {
      label: locale === "mn" ? "\u0425\u044f\u043c\u0434\u0440\u0430\u043b" : "Sale",
      className: "bg-red-600 text-white border-0",
    },
  };

  return (
    <div className="group relative flex flex-col">
      {/* Image container */}
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-square overflow-hidden rounded-xl bg-warm-gray"
      >
        <Image
          src={product.image}
          alt={name}
          fill
          className="object-cover transition-all duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-navy/0 transition-all duration-300 group-hover:bg-navy/5" />

        {product.badge && (
          <Badge
            className={`absolute left-3 top-3 text-[10px] font-semibold uppercase tracking-wider ${badgeConfig[product.badge].className}`}
          >
            {badgeConfig[product.badge].label}
          </Badge>
        )}

        {/* Quick add button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            addItem(product);
          }}
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg opacity-0 translate-y-2 transition-all duration-300 hover:bg-navy hover:text-white group-hover:opacity-100 group-hover:translate-y-0"
        >
          <ShoppingBag className="h-4 w-4" />
        </button>
      </Link>

      {/* Product info */}
      <div className="mt-4 flex flex-col gap-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gold-dark">
          {product.brand}
        </p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-medium leading-snug text-gray-900 line-clamp-2 transition-colors duration-200 group-hover:text-navy">
            {name}
          </h3>
        </Link>
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="text-base font-bold text-navy">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
