"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") as Category | null;
  const subParam = searchParams.get("sub");

  const [activeCategory, setActiveCategory] = useState<Category | "all">(
    categoryParam || "all"
  );
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(
    subParam || null
  );
  const [sortBy, setSortBy] = useState<string>("featured");

  useEffect(() => {
    setActiveCategory(categoryParam || "all");
    setActiveSubcategory(subParam || null);
  }, [categoryParam, subParam]);

  const filtered = useMemo(() => {
    let result =
      activeCategory === "all"
        ? products
        : products.filter((p) => p.category === activeCategory);

    if (activeSubcategory) {
      result = result.filter((p) => p.subcategory === activeSubcategory);
    }

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
  }, [activeCategory, activeSubcategory, sortBy]);

  const activeSubcategories = activeCategory !== "all"
    ? categories[activeCategory].subcategories
    : [];

  const categoryEntries = Object.entries(categories) as [
    Category,
    (typeof categories)[Category],
  ][];

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 md:py-16">
      {/* Page header */}
      <FadeIn className="mb-10">
        <h1 className="font-display text-3xl font-semibold text-navy md:text-4xl">
          {activeCategory === "all"
            ? "Бүх бүтээгдэхүүн"
            : activeSubcategory
              ? (() => {
                  const sub = categories[activeCategory].subcategories.find(s => s.key === activeSubcategory);
                  return sub ? sub.name : categories[activeCategory].name;
                })()
              : categories[activeCategory].name}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          {filtered.length} бүтээгдэхүүн
        </p>
      </FadeIn>

      {/* Filters */}
      <div className="mb-10 flex flex-col gap-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="order-first md:order-last h-10 min-w-[180px] w-fit rounded-full border border-gray-200 bg-white px-5 text-sm tracking-wide text-gray-600 shadow-none focus-visible:ring-gold/30">
              <SelectValue placeholder="Эрэмбэлэх" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border border-gray-100 bg-white shadow-lg">
              <SelectItem value="featured" className="rounded-lg text-sm tracking-wide">Эрэмбэлэх</SelectItem>
              <SelectItem value="price-asc" className="rounded-lg text-sm tracking-wide">Үнэ: Багаас их рүү</SelectItem>
              <SelectItem value="price-desc" className="rounded-lg text-sm tracking-wide">Үнэ: Ихээс бага рүү</SelectItem>
              <SelectItem value="rating" className="rounded-lg text-sm tracking-wide">Үнэлгээ өндөр</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2 overflow-x-auto scrollbar-none -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap md:overflow-visible">
            <button
              className={`min-h-[40px] flex-shrink-0 rounded-full px-5 text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                activeCategory === "all"
                  ? "bg-navy text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-navy/30 hover:text-navy"
              }`}
              onClick={() => { setActiveCategory("all"); setActiveSubcategory(null); }}
            >
              Бүгд
            </button>
            {categoryEntries.map(([key, cat]) => (
              <button
                key={key}
                className={`min-h-[40px] flex-shrink-0 rounded-full px-5 text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === key
                    ? "bg-navy text-white"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-navy/30 hover:text-navy"
                }`}
                onClick={() => { setActiveCategory(key); setActiveSubcategory(null); }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Subcategory filters */}
        {activeSubcategories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activeSubcategories.map((sub) => (
              <button
                key={sub.key}
                className={`min-h-[36px] rounded-full px-4 text-sm font-medium tracking-wide transition-all duration-300 flex items-center gap-1.5 ${
                  activeSubcategory === sub.key
                    ? "bg-gold/15 text-navy border border-gold/30"
                    : "border border-gray-200 bg-white text-gray-500 hover:border-gold/30 hover:text-navy"
                }`}
                onClick={() => setActiveSubcategory(activeSubcategory === sub.key ? null : sub.key)}
              >
                {sub.name}
                {activeSubcategory === sub.key && (
                  <svg className="h-3.5 w-3.5 text-navy/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product grid */}
      <StaggerContainer
        key={activeCategory + (activeSubcategory || "") + sortBy}
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
            Бүтээгдэхүүн олдсонгүй
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
