"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  Minus,
  Plus,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart";
import { formatPrice, getEffectivePrice } from "@/lib/format";
import {
  getProductBySlug,
  products,
  categories,
} from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductComments } from "@/components/products/ProductComments";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { addItem } = useCart();

  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const categoryLabel = categories[product.category].name;

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const galleryImages = product.images?.length
    ? product.images
    : [product.image];

  const [activeImg, setActiveImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "description" | "howToUse" | "ingredients" | "storage"
  >("description");

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

  // Generate SKU from product slug
  const sku = "SR" + product.id.padStart(4, "0") + product.slug.substring(0, 4).toUpperCase();

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 md:px-12 md:py-12">
      {/* Breadcrumb */}
      <FadeIn>
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="transition-colors hover:text-navy">
            Нүүр
          </Link>
          <span>/</span>
          <Link href="/shop" className="transition-colors hover:text-navy">
            Дэлгүүр
          </Link>
          <span>/</span>
          <Link
            href={`/shop?category=${product.category}`}
            className="transition-colors hover:text-navy"
          >
            {categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-gray-300">{product.name}</span>
        </div>
      </FadeIn>

      {/* Product detail */}
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
        {/* Left: Image gallery */}
        <FadeIn direction="left">
          <div>
            {/* Main image */}
            <div className="group relative aspect-square overflow-hidden rounded-2xl bg-warm-gray">
              <Image
                src={galleryImages[activeImg]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {activeBadges.length > 0 && (
                <div className="absolute left-4 top-4 flex flex-col gap-1.5">
                  {activeBadges.map((b) => (
                    <Badge
                      key={b}
                      className={`text-xs font-semibold uppercase tracking-wider w-fit ${badgeConfig[b].className}`}
                    >
                      {badgeConfig[b].label}
                    </Badge>
                  ))}
                </div>
              )}

              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImg((prev) =>
                        prev === 0 ? galleryImages.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md opacity-0 transition-all duration-300 hover:bg-white group-hover:opacity-100"
                  >
                    <ChevronLeft className="h-5 w-5 text-navy" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImg((prev) =>
                        prev === galleryImages.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md opacity-0 transition-all duration-300 hover:bg-white group-hover:opacity-100"
                  >
                    <ChevronRight className="h-5 w-5 text-navy" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="mt-4 flex gap-3">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-warm-gray transition-all duration-200 ${
                      activeImg === i
                        ? "ring-2 ring-navy ring-offset-2"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </FadeIn>

        {/* Right: Product info */}
        <FadeIn direction="right" delay={0.1}>
          <div className="flex flex-col">
            {/* Category */}
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-gold-dark">
              {categoryLabel}
            </p>

            {/* Name */}
            <h1 className="mt-2 font-display text-2xl font-semibold text-navy md:text-3xl">
              {product.name}
            </h1>

            {/* SKU */}
            <p className="mt-2 text-sm text-gray-400">
              SKU: <span className="font-medium">{sku}</span>
            </p>

            {/* Price */}
            <div className="mt-5 flex items-baseline gap-3">
              {product.discountPercent ? (
                <>
                  <span className="font-display text-2xl font-bold text-red-600">
                    {formatPrice(getEffectivePrice(product))}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <>
                  <span className="font-display text-2xl font-bold text-navy">
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

            {/* Short Description */}
            <p className="mt-3 text-sm text-gray-400">
              {product.shortDescription}
            </p>

            {/* Size */}
            {product.size && (
              <div className="mt-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-300">
                  Хэмжээ
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button className="min-h-[40px] rounded-xl border-2 border-navy bg-navy/5 px-5 text-sm font-medium text-navy">
                    {product.size}
                  </button>
                </div>
              </div>
            )}

            {/* Quantity + Add to Cart + Buy Now */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {/* Quantity */}
              <div className="flex h-12 items-center rounded-xl border border-white/20">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-full w-11 items-center justify-center text-gray-500 transition-colors hover:text-navy"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm font-semibold text-navy">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-full w-11 items-center justify-center text-gray-500 transition-colors hover:text-navy"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <Button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) addItem(product);
                }}
                className="h-12 min-w-[160px] rounded-xl border-2 border-gold bg-transparent px-6 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-white"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Сагсанд нэмэх
              </Button>

              {/* Buy Now */}
              <Link href="/checkout">
                <Button
                  onClick={() => {
                    for (let i = 0; i < quantity; i++) addItem(product, false);
                  }}
                  className="h-12 min-w-[140px] rounded-xl bg-navy px-6 text-sm font-semibold text-white hover:bg-navy/90"
                >
                  Шууд авах
                </Button>
              </Link>

            </div>

            {/* In Stock */}
            {product.inStock && (
              <div className="mt-4 flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium text-green-700">
                  Нөөцөнд байгаа
                </span>
              </div>
            )}

            {/* Meta info */}
            <div className="mt-8 space-y-2.5 border-t border-white/10 pt-6">
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">
                  Брэнд:
                </span>{" "}
                {product.brand}
              </p>
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-sm font-medium text-gray-300">
                  Шошго:
                </span>
                {product.tags.map((tag, idx) => (
                  <span key={tag} className="text-sm text-gray-500">
                    {tag}
                    {idx < product.tags.length - 1 && ","}
                  </span>
                ))}
              </div>
              {/* Share */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-sm font-medium text-gray-300">
                  Хуваалцах:
                </span>
                <button className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-gray-400 transition-colors hover:border-gold hover:text-gold">
                  <Share2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Tabs Section — Desktop: horizontal tabs, Mobile: accordion */}
      <div className="mt-16 md:mt-24">
        {(() => {
          const tabs = [
            {
              key: "description" as const,
              label: "Тайлбар",
              content: (
                <div className="max-w-3xl space-y-4">
                  <p className="text-base leading-relaxed text-gray-300">
                    {product.description}
                  </p>
                  <p className="text-base leading-relaxed text-gray-400">
                    Бүтээгдэхүүний заавраас дэлгэрэнгүй мэдээллийг аваарай. Хэрэглэхийн өмнө арьсны тестийг хийхийг зөвлөж байна.
                  </p>
                </div>
              ),
            },
            {
              key: "howToUse" as const,
              label: "Хэрэглэх заавар",
              content: (
                <div className="max-w-3xl space-y-4">
                  {product.howToUse ? (
                    <p className="text-base leading-relaxed text-gray-300">{product.howToUse}</p>
                  ) : (
                    <p className="text-base leading-relaxed text-gray-400">Бүтээгдэхүүний савны заавраас дэлгэрэнгүй мэдээллийг аваарай.</p>
                  )}
                </div>
              ),
            },
            {
              key: "ingredients" as const,
              label: "Орц найрлага",
              content: (
                <div className="max-w-3xl space-y-4">
                  {product.ingredients ? (
                    <p className="text-base leading-relaxed text-gray-300">{product.ingredients}</p>
                  ) : (
                    <div className="max-w-2xl">
                      <table className="w-full text-base">
                        <tbody className="divide-y divide-white/10">
                          <tr>
                            <td className="w-40 py-3 font-medium text-gray-300">Брэнд</td>
                            <td className="py-3 text-gray-400">{product.brand}</td>
                          </tr>
                          {product.size && (
                            <tr>
                              <td className="py-3 font-medium text-gray-300">Хэмжээ</td>
                              <td className="py-3 text-gray-400">{product.size}</td>
                            </tr>
                          )}
                          <tr>
                            <td className="py-3 font-medium text-gray-300">Ангилал</td>
                            <td className="py-3 text-gray-400">{categoryLabel}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ),
            },
            {
              key: "storage" as const,
              label: "Хадгалах нөхцөл",
              content: (
                <div className="max-w-3xl space-y-4">
                  {product.storage ? (
                    <p className="text-base leading-relaxed text-gray-300">{product.storage}</p>
                  ) : (
                    <p className="text-base leading-relaxed text-gray-400">Сэрүүн, хуурай газар, нарны шууд тусгалаас зайлсхийж хадгална.</p>
                  )}
                </div>
              ),
            },
          ];

          return (
            <>
              {/* Desktop: horizontal tabs */}
              <div className="hidden md:block">
                <div className="flex gap-0 border-b border-white/10">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`relative whitespace-nowrap border-0 bg-transparent px-6 py-4 text-base font-medium outline-none transition-colors focus:outline-none focus-visible:outline-none ${
                        activeTab === tab.key ? "text-navy" : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.key && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-navy" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="py-10">
                  {tabs.find((t) => t.key === activeTab)?.content}
                </div>
              </div>

              {/* Mobile: accordion */}
              <div className="md:hidden space-y-0 border-t border-white/10">
                {tabs.map((tab) => {
                  const isOpen = activeTab === tab.key;
                  return (
                    <div key={tab.key} className="border-b border-white/10">
                      <button
                        onClick={() => setActiveTab(isOpen ? ("" as typeof activeTab) : tab.key)}
                        className="flex w-full items-center justify-between py-4 text-left"
                      >
                        <span className={`text-base font-medium transition-colors ${isOpen ? "text-gold" : "text-gray-300"}`}>
                          {tab.label}
                        </span>
                        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px] pb-6 opacity-100" : "max-h-0 opacity-0"}`}
                      >
                        {tab.content}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })()}
      </div>

      {/* Comments */}
      <ProductComments productId={product.id} />

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-8 border-t border-white/10 pt-16 md:pt-24">
          <FadeIn>
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
              Танд бас таалагдах
            </span>
            <h2 className="mt-2 font-display text-2xl font-semibold text-navy md:text-3xl">
              Онцлох бараа
            </h2>
          </FadeIn>
          <StaggerContainer className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
            {related.map((p) => (
              <StaggerItem key={p.id}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      )}
    </div>
  );
}
