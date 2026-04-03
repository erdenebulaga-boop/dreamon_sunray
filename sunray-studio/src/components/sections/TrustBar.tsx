"use client";

import { Shield, Award, Truck, HeadphonesIcon } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

const badges = [
  { icon: Shield, label: "Салонд туршигдсан" },
  { icon: Award, label: "Чанартай бүтээгдэхүүн" },
  { icon: Truck, label: "100,000₮+ үнэгүй хүргэлт" },
  { icon: HeadphonesIcon, label: "Мэргэжлийн зөвлөгөө" },
];

export function TrustBar() {
  return (
    <section className="border-b border-gray-100 bg-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4 md:gap-8 md:px-12 md:py-10">
        {badges.map((badge, i) => {
          const Icon = badge.icon;
          return (
            <FadeIn key={badge.label} delay={i * 0.1} direction="up">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-gold/20 bg-gold/5">
                  <Icon className="h-5 w-5 text-gold-dark" strokeWidth={1.5} />
                </div>
                <span className="text-sm font-medium leading-tight text-navy">
                  {badge.label}
                </span>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
