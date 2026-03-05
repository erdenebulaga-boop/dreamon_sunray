"use client";

import { useI18n } from "@/lib/i18n";
import { getFeaturedProducts } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export function FeaturedProducts() {
  const { t } = useI18n();
  const featured = getFeaturedProducts();

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <FadeIn className="text-center mb-14">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
            Curated Selection
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy md:text-4xl">
            {t("home.featuredTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-gray-500">
            {t("home.featuredSubtitle")}
          </p>
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
