"use client";

import Link from "next/link";
import { getFeaturedProducts } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const skinTypes = [
  { label: "Бүх төрөл", href: "/shop" },
  { label: "Хуурай", href: "/shop?skinType=dry" },
  { label: "Холимог", href: "/shop?skinType=combination" },
  { label: "Эмзэг", href: "/shop?skinType=sensitive" },
];

export function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <FadeIn className="text-center mb-10">
          <h2 className="font-display text-3xl font-semibold text-gray-900 md:text-4xl">
            Онцлох бүтээгдэхүүн
          </h2>
        </FadeIn>

        {/* Skin type filter tabs */}
        <FadeIn className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {skinTypes.map((type) => (
            <Link
              key={type.label}
              href={type.href}
              className="rounded-full border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors duration-200 hover:border-navy hover:bg-navy hover:text-white"
            >
              {type.label}
            </Link>
          ))}
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
          {featured.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
