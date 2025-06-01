import { HeroSection } from "@/components/hero-section";
import { HeroSkeleton } from "@/components/skeletons/hero-skeleton";
import { fetchFeaturedMovie } from "@/lib/api";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<HeroSkeleton />}>
      <HeroSectionWrapper />
    </Suspense>
  );
}

async function HeroSectionWrapper() {
  const featuredMovie = await fetchFeaturedMovie();
  return <HeroSection movie={featuredMovie} />;
}
