"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { products, categories, type Category } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/ui/motion";
import { Suspense } from "react";

function ShopContent() {
  const { t, locale } = useI18n();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") as Category | null;

  const [activeCategory, setActiveCategory] = useState<Category | "all">(
    categoryParam || "all"
  );
  const [sortBy, setSortBy] = useState<string>("featured");

  useEffect(() => {
    setActiveCategory(categoryParam || "all");
  }, [categoryParam]);

  const filtered = useMemo(() => {
    let result =
      activeCategory === "all"
        ? products
        : products.filter((p) => p.category === activeCategory);

    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [activeCategory, sortBy]);

  const categoryEntries = Object.entries(categories) as [
    Category,
    (typeof categories)[Category],
  ][];

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 md:py-16">
      {/* Page header */}
      <FadeIn className="mb-10">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
          {locale === "mn" ? "\u0414\u044d\u043b\u0433\u04af\u04af\u0440" : "Shop"}
        </span>
        <h1 className="mt-2 font-display text-3xl font-semibold text-navy md:text-4xl">
          {activeCategory === "all"
            ? t("nav.allProducts")
            : locale === "mn"
              ? categories[activeCategory].mn
              : categories[activeCategory].en}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          {filtered.length}{" "}
          {locale === "mn" ? "\u0431\u04af\u0442\u044d\u044d\u0433\u0434\u044d\u0445\u04af\u04af\u043d" : "products"}
        </p>
      </FadeIn>

      {/* Filters */}
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            className={`min-h-[40px] rounded-full px-5 text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
              activeCategory === "all"
                ? "bg-navy text-white"
                : "border border-gray-200 bg-white text-gray-600 hover:border-navy/30 hover:text-navy"
            }`}
            onClick={() => setActiveCategory("all")}
          >
            {t("filters.all")}
          </button>
          {categoryEntries.map(([key, cat]) => (
            <button
              key={key}
              className={`min-h-[40px] rounded-full px-5 text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                activeCategory === key
                  ? "bg-navy text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-navy/30 hover:text-navy"
              }`}
              onClick={() => setActiveCategory(key)}
            >
              {locale === "mn" ? cat.mn : cat.en}
            </button>
          ))}
        </div>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="h-10 min-w-[180px] rounded-full border border-gray-200 bg-white px-5 text-xs tracking-wide text-gray-600 shadow-none focus-visible:ring-gold/30">
            <SelectValue placeholder={t("filters.sortBy")} />
          </SelectTrigger>
          <SelectContent className="rounded-xl border border-gray-100 bg-white shadow-lg">
            <SelectItem value="featured" className="rounded-lg text-xs tracking-wide">{t("filters.sortBy")}</SelectItem>
            <SelectItem value="price-asc" className="rounded-lg text-xs tracking-wide">{t("filters.priceLowHigh")}</SelectItem>
            <SelectItem value="price-desc" className="rounded-lg text-xs tracking-wide">{t("filters.priceHighLow")}</SelectItem>
            <SelectItem value="rating" className="rounded-lg text-xs tracking-wide">{t("filters.rating")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product grid */}
      <StaggerContainer
        key={activeCategory + sortBy}
        className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 md:gap-8"
      >
        {filtered.map((product) => (
          <StaggerItem key={product.id}>
            <ProductCard product={product} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
          <p className="font-display text-xl">
            {locale === "mn"
              ? "\u0411\u04af\u0442\u044d\u044d\u0433\u0434\u044d\u0445\u04af\u04af\u043d \u043e\u043b\u0434\u0441\u043e\u043d\u0433\u04af\u0439"
              : "No products found"}
          </p>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense>
      <ShopContent />
    </Suspense>
  );
}
