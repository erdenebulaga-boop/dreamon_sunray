"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-white">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover object-center scale-105"
        >
          <source src="/benner_video.mp4" type="video/mp4" />
        </video>
        {/* Amber glow gradient — white top-center fading to warm amber at edges */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #f59e0b 100%)",
            opacity: 0.55,
          }}
        />
        {/* Extra fade on left for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-transparent" />
      </div>

      {/* Subtle bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="absolute bottom-0 left-0 right-0 h-[1px] origin-left bg-gradient-to-r from-gold/40 via-gold/20 to-transparent"
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
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
              Sunray Studio
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="hero-text-gradient font-display text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl"
          >
            {"Мэргэжлийн гоо сайхан,\nТанд хүргэх".split("\n").map((line, i) => (
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
            className="mt-6 max-w-lg text-base leading-relaxed text-gray-600 md:text-lg"
          >
            Салоны зэргийн арьс арчилгаа, үсний арчилгаа, гоо сайхны төхөөрөмжүүдийг Sunray Studio мэргэжилтнүүд сонгон танилцуулж байна.
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
              className="group min-h-[52px] bg-gold px-8 text-sm font-semibold uppercase tracking-wider text-white hover:bg-gold-dark transition-all duration-300"
            >
              <Link href="/shop">
                Дэлгүүр үзэх
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-h-[52px] border-gray-300 bg-transparent px-8 text-sm font-semibold uppercase tracking-wider text-gray-900 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
            >
              <Link href="/shop?category=sets">Цуглуулга үзэх</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
