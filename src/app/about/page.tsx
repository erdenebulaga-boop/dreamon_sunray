"use client";

import Image from "next/image";
import { Shield, Award, HeadphonesIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0B1D3A] py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-6">
          <h1 className="text-3xl font-bold text-white md:text-5xl">
            {t("about.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            {t("about.heroText")}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/hero/hero-2.png"
                alt="Sunray Studio Salon"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {t("about.mission")}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-gray-600">
                {t("about.story")}
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                {t("about.missionText")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-center text-2xl font-bold text-gray-900 md:text-3xl">
            {t("about.values")}
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Shield,
                title: t("about.quality"),
                text: t("about.qualityText"),
              },
              {
                icon: Award,
                title: t("about.authentic"),
                text: t("about.authenticText"),
              },
              {
                icon: HeadphonesIcon,
                title: t("about.expert"),
                text: t("about.expertText"),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-8 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1D3A]/5">
                  <item.icon className="h-6 w-6 text-[#0B1D3A]" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-gray-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Image */}
      <section className="relative h-64 md:h-96">
        <Image
          src="/hero/hero-3.png"
          alt="Sunray Studio Products"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0B1D3A]/40" />
      </section>
    </div>
  );
}
