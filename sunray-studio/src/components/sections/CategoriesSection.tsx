"use client";

import Link from "next/link";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { ArrowUpRight } from "lucide-react";

const skinTypeCategories = [
  {
    label: "Бүх төрөл",
    href: "/shop",
    image: "/products/rexri-sun-cream.jpg",
  },
  {
    label: "Хуурай",
    href: "/shop?skinType=dry",
    image: "/products/sunray-shampoo-blue.jpg",
  },
  {
    label: "Холимог",
    href: "/shop?skinType=combination",
    image: "/products/sunray-cushion-compact.jpg",
  },
  {
    label: "Эмзэг",
    href: "/shop?skinType=sensitive",
    image: "/products/rexri-complete-set.jpg",
  },
];

export function CategoriesSection() {
  return (
    <section className="relative bg-[#111827] py-20 md:py-25 overflow-hidden">
      {/* Wavy background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <svg
          className="absolute -top-1 left-0 w-full text-gold/[0.04]"
          viewBox="0 0 1440 120"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,0 L0,0 Z" />
        </svg>
        <svg
          className="absolute -bottom-1 left-0 w-full text-gold/[0.04]"
          viewBox="0 0 1440 120"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,60 C240,0 480,120 720,60 C960,0 1200,120 1440,60 L1440,120 L0,120 Z" />
        </svg>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-gold/[0.03] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-9">
        <FadeIn className="text-center mb-14">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
            Ангилал
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-gray-100 md:text-4xl">
            Арьсны төрлөөр харах
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-gray-400">
            Таны арьсны төрөлд тохирсон бүтээгдэхүүнийг олоорой
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {skinTypeCategories.map((cat) => (
            <StaggerItem key={cat.label}>
              <Link
                href={cat.href}
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl"
              >
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent transition-all duration-500 group-hover:from-navy/90" />

                <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4 text-white" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display text-lg font-semibold text-white md:text-xl">
                    {cat.label}
                  </h3>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
