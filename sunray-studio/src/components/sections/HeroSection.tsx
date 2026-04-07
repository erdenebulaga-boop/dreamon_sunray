"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  { image: "/hero/hero-1.png", alt: "Sunray Studio" },
  { image: "/hero/hero-2.png", alt: "Арьс арчилгаа" },
  { image: "/hero/hero-3.png", alt: "Гоо сайхны төхөөрөмжүүд" },
];

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);

  const handlePrev = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-white">
      <Swiper
        onSwiper={setSwiperRef}
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        speed={1000}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full min-h-[85vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative min-h-[85vh]">
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover object-center"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation arrows */}
      <div className="absolute bottom-8 right-6 z-20 flex items-center gap-3 md:right-12">
        <button
          onClick={handlePrev}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/20 backdrop-blur-sm text-white transition-all duration-300 hover:bg-black/40"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Slide indicators */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => swiperRef?.slideToLoop(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeIndex === i
                  ? "w-8 bg-white"
                  : "w-1.5 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/20 backdrop-blur-sm text-white transition-all duration-300 hover:bg-black/40"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 1.2,
          delay: 0.8,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className="absolute bottom-0 left-0 right-0 z-20 h-[1px] origin-left bg-gradient-to-r from-gold/40 via-gold/20 to-transparent"
      />
    </section>
  );
}
