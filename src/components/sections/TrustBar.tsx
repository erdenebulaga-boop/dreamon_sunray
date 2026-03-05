"use client";

import { Shield, Award, Truck, HeadphonesIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/motion";

const icons = [Shield, Award, Truck, HeadphonesIcon];
const keys = [
  "home.trustBadge1",
  "home.trustBadge2",
  "home.trustBadge3",
  "home.trustBadge4",
];

export function TrustBar() {
  const { t } = useI18n();

  return (
    <section className="border-b border-gray-100 bg-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4 md:gap-8 md:px-12 md:py-10">
        {keys.map((key, i) => {
          const Icon = icons[i];
          return (
            <FadeIn key={key} delay={i * 0.1} direction="up">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-gold/20 bg-gold/5">
                  <Icon className="h-5 w-5 text-gold-dark" strokeWidth={1.5} />
                </div>
                <span className="text-sm font-medium leading-tight text-navy">
                  {t(key)}
                </span>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
