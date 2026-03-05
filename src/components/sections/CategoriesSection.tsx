"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import { categories, type Category, products } from "@/data/products";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { ArrowUpRight } from "lucide-react";

const categoryImages: Record<Category, string> = {
  skincare: "/products/rexri-sun-cream.jpg",
  haircare: "/products/sunray-shampoo-blue.jpg",
  makeup: "/products/sunray-cushion-compact.jpg",
  devices: "/products/sunray-skin-scrubber.jpg",
  sets: "/products/rexri-complete-set.jpg",
};

export function CategoriesSection() {
  const { t, locale } = useI18n();

  const categoryEntries = Object.entries(categories) as [
    Category,
    (typeof categories)[Category],
  ][];

  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <FadeIn className="text-center mb-14">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
            {locale === "mn" ? "\u0410\u043d\u0433\u0438\u043b\u0430\u043b" : "Categories"}
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy md:text-4xl">
            {t("home.categoriesTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-gray-500">
            {t("home.categoriesSubtitle")}
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-5">
          {categoryEntries.map(([key, cat]) => {
            const count = products.filter((p) => p.category === key).length;
            return (
              <StaggerItem key={key}>
                <Link
                  href={`/shop?category=${key}`}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-2xl"
                >
                  <Image
                    src={categoryImages[key]}
                    alt={locale === "mn" ? cat.mn : cat.en}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent transition-all duration-500 group-hover:from-navy/90" />

                  {/* Arrow indicator */}
                  <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4 text-white" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-display text-lg font-semibold text-white md:text-xl">
                      {locale === "mn" ? cat.mn : cat.en}
                    </h3>
                    <p className="mt-1 text-xs text-gray-300/80">
                      {count} {locale === "mn" ? "\u0431\u04af\u0442\u044d\u044d\u0433\u0434\u044d\u0445\u04af\u04af\u043d" : "products"}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
