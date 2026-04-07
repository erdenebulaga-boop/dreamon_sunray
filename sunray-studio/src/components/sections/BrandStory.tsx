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
                &ldquo;Санрэй студи&rdquo; ХХК нь 2015 онд байгуулагдсан бөгөөд &ldquo;Санрэй салон&rdquo;-оор дамжуулан гоо сайхны цогц үйлчилгээг амжилттай үзүүлж байна. Бид арьс, үс, хумсны үйлчилгээ, гоо сайхны бүтээгдэхүүний импорт, худалдаа, бие галбиржуулах үйлчилгээ болон сургалт, зөвлөгөөг мэргэжлийн түвшинд хүргэдэг.
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                Манай байгууллага нь 2026 онд тохирлын гэрчилгээ авч, үйлчилгээ, бүтээгдэхүүн, үйл ажиллагаа нь стандарт, аюулгүй байдлын шаардлагыг бүрэн хангаж байгааг баталгаажуулсан.
              </p>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-3 gap-8">
                {[
                  { value: "500+", label: "Сэтгэгдэл" },
                  { value: "20+", label: "Бүтээгдэхүүн" },
                  { value: "5+", label: "Брэнд" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-3xl font-semibold text-gold md:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm uppercase tracking-wider text-gray-500">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
