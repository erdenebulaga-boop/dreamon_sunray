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
    <section className="bg-[#111827] py-20 md:py-25">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <FadeIn className="text-center mb-10">
          <h2 className="font-display text-3xl font-semibold text-gray-100 md:text-4xl">
            Онцлох бүтээгдэхүүн
          </h2>
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
