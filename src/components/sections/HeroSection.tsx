"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-navy">
      {/* Background image with parallax feel */}
      <div className="absolute inset-0">
        <Image
          src="/hero/hero-main.png"
          alt="Sunray Studio"
          fill
          className="object-cover object-center scale-105"
          priority
          sizes="100vw"
        />
        {/* Layered gradients for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-navy/30" />
        {/* Subtle grain texture */}
        <div className="grain absolute inset-0" />
      </div>

      {/* Decorative gold line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="absolute bottom-0 left-0 right-0 h-[1px] origin-left bg-gradient-to-r from-gold via-gold-light to-transparent"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-7xl items-center px-6 md:px-12">
        <div className="max-w-2xl py-24 md:py-32">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Sunray Studio
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            {t("hero.title").split("\n").map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-gray-300/90 md:text-lg"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button
              asChild
              size="lg"
              className="group min-h-[52px] bg-gold px-8 text-sm font-semibold uppercase tracking-wider text-navy hover:bg-gold-light transition-all duration-300"
            >
              <Link href="/shop">
                {t("hero.cta")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-h-[52px] border-white/20 bg-transparent px-8 text-sm font-semibold uppercase tracking-wider text-white hover:border-gold/40 hover:bg-white/5 transition-all duration-300"
            >
              <Link href="/shop?category=sets">{t("hero.secondary")}</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
