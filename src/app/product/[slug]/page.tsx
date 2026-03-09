"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Check,
  Minus,
  Plus,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import {
  getProductBySlug,
  products,
  categories,
} from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { t, locale } = useI18n();
  const { addItem } = useCart();

  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const name = locale === "mn" ? product.name.mn : product.name.en;
  const description =
    locale === "mn" ? product.description.mn : product.description.en;
  const categoryLabel =
    locale === "mn"
      ? categories[product.category].mn
      : categories[product.category].en;

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

  const badgeConfig = {
    bestseller: {
      label: locale === "mn" ? "Бестселлер" : "Bestseller",
      className: "bg-gold text-white border-0",
    },
    new: {
      label: locale === "mn" ? "Шинэ" : "New",
      className: "bg-navy text-white border-0",
    },
    sale: {
      label: locale === "mn" ? "Хямдрал" : "Sale",
      className: "bg-red-600 text-white border-0",
    },
  };

  // Generate SKU from product slug
  const sku = "SR" + product.id.padStart(4, "0") + product.slug.substring(0, 4).toUpperCase();

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 md:px-12 md:py-12">
      {/* Breadcrumb */}
      <FadeIn>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="transition-colors hover:text-navy">
            {locale === "mn" ? "Нүүр" : "Home"}
          </Link>
          <span>/</span>
          <Link href="/shop" className="transition-colors hover:text-navy">
            {locale === "mn" ? "Дэлгүүр" : "Shop"}
          </Link>
          <span>/</span>
          <Link
            href={`/shop?category=${product.category}`}
            className="transition-colors hover:text-navy"
          >
            {categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-gray-700">{name}</span>
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
                alt={name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {product.badge && (
                <Badge
                  className={`absolute left-4 top-4 text-[10px] font-semibold uppercase tracking-wider ${badgeConfig[product.badge].className}`}
                >
                  {badgeConfig[product.badge].label}
                </Badge>
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
                      alt={`${name} ${i + 1}`}
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark">
              {categoryLabel}
            </p>

            {/* Name + In Stock */}
            <div className="mt-2 flex items-start gap-3">
              <h1 className="font-display text-2xl font-semibold text-navy md:text-3xl">
                {name}
              </h1>
              {product.inStock && (
                <Badge className="mt-1.5 flex-shrink-0 whitespace-nowrap border-0 bg-green-50 text-[10px] font-semibold text-green-700">
                  <Check className="mr-1 h-3 w-3" />
                  {t("product.inStock")}
                </Badge>
              )}
            </div>

            {/* SKU */}
            <p className="mt-2 text-xs text-gray-400">
              SKU: <span className="font-medium text-gray-500">{sku}</span>
            </p>

            {/* Price */}
            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold text-navy">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-5 text-sm leading-relaxed text-gray-600">
              {description}
            </p>

            {/* Size */}
            {product.size && (
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                  {t("product.size")}
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
              <div className="flex h-12 items-center rounded-xl border border-gray-200">
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
                className="h-12 min-w-[160px] rounded-xl border-2 border-navy bg-white px-6 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                {t("product.addToCart")}
              </Button>

              {/* Buy Now */}
              <Link href="/checkout">
                <Button
                  onClick={() => {
                    for (let i = 0; i < quantity; i++) addItem(product, false);
                  }}
                  className="h-12 min-w-[140px] rounded-xl bg-navy px-6 text-sm font-semibold text-white hover:bg-navy/90"
                >
                  {locale === "mn" ? "Шууд авах" : "Buy Now"}
                </Button>
              </Link>

            </div>

            {/* Meta info */}
            <div className="mt-8 space-y-2 border-t border-gray-100 pt-6">
              <p className="text-xs text-gray-500">
                <span className="font-medium text-gray-700">
                  {t("product.brand")}:
                </span>{" "}
                {product.brand}
              </p>
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-medium text-gray-700">
                  {locale === "mn" ? "Шошго" : "Tags"}:
                </span>
                {product.tags.map((tag, idx) => (
                  <span key={tag} className="text-xs text-gray-500">
                    {tag}
                    {idx < product.tags.length - 1 && ","}
                  </span>
                ))}
              </div>
              {/* Share */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs font-medium text-gray-700">
                  {locale === "mn" ? "Хуваалцах" : "Share"}:
                </span>
                <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:border-navy hover:text-navy">
                  <Share2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Tabs Section */}
      <div className="mt-16 md:mt-24">
        {/* Tab headers */}
        <div className="flex gap-0 overflow-x-auto border-b border-gray-200 scrollbar-none">
          {(
            [
              {
                key: "description" as const,
                label: locale === "mn" ? "Тайлбар" : "Description",
              },
              {
                key: "howToUse" as const,
                label:
                  locale === "mn" ? "Хэрэглэх заавар" : "How to Use",
              },
              {
                key: "ingredients" as const,
                label: locale === "mn" ? "Орц найрлага" : "Ingredients",
              },
              {
                key: "storage" as const,
                label: locale === "mn" ? "Хадгалах нөхцөл" : "Storage",
              },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative whitespace-nowrap border-0 bg-transparent px-6 py-4 text-sm font-medium outline-none transition-colors focus:outline-none focus-visible:outline-none ${
                activeTab === tab.key
                  ? "text-navy"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-navy" />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="py-10">
          {/* Description */}
          {activeTab === "description" && (
            <FadeIn>
              <div className="max-w-3xl space-y-4">
                <p className="text-base font-medium leading-relaxed text-gray-900">
                  {description}
                </p>
                <p className="text-sm leading-relaxed text-gray-500">
                  {locale === "mn"
                    ? "Бүтээгдэхүүний заавраас дэлгэрэнгүй мэдээллийг аваарай. Хэрэглэхийн өмнө арьсны тестийг хийхийг зөвлөж байна."
                    : "Please refer to the product packaging for detailed information. We recommend doing a patch test before use."}
                </p>
              </div>
            </FadeIn>
          )}

          {/* How to Use */}
          {activeTab === "howToUse" && (
            <FadeIn>
              <div className="max-w-3xl space-y-4">
                {product.howToUse ? (
                  <p className="text-base leading-relaxed text-gray-700">
                    {locale === "mn" ? product.howToUse.mn : product.howToUse.en}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">
                    {locale === "mn"
                      ? "Бүтээгдэхүүний савны заавраас дэлгэрэнгүй мэдээллийг аваарай."
                      : "Please refer to the product packaging for usage instructions."}
                  </p>
                )}
              </div>
            </FadeIn>
          )}

          {/* Ingredients */}
          {activeTab === "ingredients" && (
            <FadeIn>
              <div className="max-w-3xl space-y-4">
                {product.ingredients ? (
                  <p className="text-sm leading-relaxed text-gray-700">
                    {locale === "mn"
                      ? product.ingredients.mn
                      : product.ingredients.en}
                  </p>
                ) : (
                  <div className="max-w-2xl">
                    <table className="w-full text-sm">
                      <tbody className="divide-y divide-gray-100">
                        <tr>
                          <td className="w-40 py-3 font-medium text-gray-700">
                            {t("product.brand")}
                          </td>
                          <td className="py-3 text-gray-600">{product.brand}</td>
                        </tr>
                        {product.size && (
                          <tr>
                            <td className="py-3 font-medium text-gray-700">
                              {t("product.size")}
                            </td>
                            <td className="py-3 text-gray-600">{product.size}</td>
                          </tr>
                        )}
                        <tr>
                          <td className="py-3 font-medium text-gray-700">
                            {locale === "mn" ? "Ангилал" : "Category"}
                          </td>
                          <td className="py-3 text-gray-600">{categoryLabel}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </FadeIn>
          )}

          {/* Storage */}
          {activeTab === "storage" && (
            <FadeIn>
              <div className="max-w-3xl space-y-4">
                {product.storage ? (
                  <p className="text-base leading-relaxed text-gray-700">
                    {locale === "mn" ? product.storage.mn : product.storage.en}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">
                    {locale === "mn"
                      ? "Сэрүүн, хуурай газар, нарны шууд тусгалаас зайлсхийж хадгална."
                      : "Store in a cool, dry place away from direct sunlight."}
                  </p>
                )}
              </div>
            </FadeIn>
          )}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-8 border-t border-gray-100 pt-16 md:pt-24">
          <FadeIn>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              {locale === "mn" ? "Танд бас таалагдах" : "You May Also Like"}
            </span>
            <h2 className="mt-2 font-display text-2xl font-semibold text-navy md:text-3xl">
              {t("product.relatedProducts")}
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
