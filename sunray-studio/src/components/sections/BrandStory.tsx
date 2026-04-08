"use client";

import Image from "next/image";
import { FadeIn } from "@/components/ui/motion";

export function BrandStory() {
  return (
    <section className="bg-white relative overflow-hidden py-20 md:py-28">
      {/* Subtle warm accent */}
      <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-gold/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Image */}
          <FadeIn direction="left">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/hero/hero-1.png"
                alt="Sunray Studio"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-200" />
            </div>
          </FadeIn>

          {/* Text */}
          <FadeIn direction="right" delay={0.2}>
            <div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
                Бидний түүх
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold text-gray-900 md:text-4xl lg:text-5xl">
                Sunray Studio-ийн түүх
              </h2>
              <p className="mt-6 text-base leading-relaxed text-gray-600">
                &ldquo;Санрэй студи&rdquo; ХХК нь 2015 онд монгол улсынхаа хэрэглэгчдэд олон улсын дэвшилтэт гоо сайхны технологи, эмчилгээний бүтээгдэхүүнийг хүргэж, үр дүнд суурилсан мэргэжлийн үйлчилгээ үзүүлэх эрхэм зорилготойгоор үүсгэн байгуулагдсан. Санрэй салоноор дамжуулан өнөөдрийг хүртэл гоо сайхны цогц үйлчилгээг бүсгүйчүүдэд хүргэсээр ирсэн.
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                Манай компани нь арьс, үс, хумсны мэргэжлийн үйлчилгээ, гоо сайхны бараа бүтээгдэхүүний импорт худалдаа, бие галбиржуулах цогц үйлчилгээ, гоо сайхны сургалт, зөвлөгөө зэрэг чиглэлүүдээр үйл ажиллагаа явуулдаг. Чанар, итгэл, ёс зүй, үр дүнг үнэт зүйлээ болгон үйл ажиллагаагаа явуулж байна.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
