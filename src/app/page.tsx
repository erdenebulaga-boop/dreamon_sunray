"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { BrandStory } from "@/components/sections/BrandStory";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <FeaturedProducts />
      <CategoriesSection />
      <BrandStory />
    </>
  );
}
