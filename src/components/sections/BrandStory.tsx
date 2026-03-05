"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/motion";

export function BrandStory() {
  const { t, locale } = useI18n();

  return (
    <section className="bg-navy relative overflow-hidden py-20 md:py-28">
      {/* Subtle decorative element */}
      <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute -left-32 -bottom-32 h-64 w-64 rounded-full bg-gold/5 blur-3xl" />
      <div className="grain absolute inset-0" />

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
              {/* Gold border accent */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
            </div>
          </FadeIn>

          {/* Text */}
          <FadeIn direction="right" delay={0.2}>
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
                {locale === "mn" ? "\u0411\u0438\u0434\u043d\u0438\u0439 \u0442\u04af\u04af\u0445" : "Our Story"}
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold text-white md:text-4xl lg:text-5xl">
                {t("home.brandStoryTitle")}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-gray-400">
                {t("home.brandStoryText")}
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-400">
                {t("home.brandStoryText2")}
              </p>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-3 gap-8">
                {[
                  { value: "500+", label: locale === "mn" ? "\u0421\u044d\u0442\u0433\u044d\u0433\u0434\u044d\u043b" : "Reviews" },
                  { value: "20+", label: locale === "mn" ? "\u0411\u04af\u0442\u044d\u044d\u0433\u0434\u044d\u0445\u04af\u04af\u043d" : "Products" },
                  { value: "5+", label: locale === "mn" ? "\u0411\u0440\u044d\u043d\u0434" : "Brands" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-3xl font-semibold text-gold md:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
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
