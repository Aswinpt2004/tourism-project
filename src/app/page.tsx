import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { DestinationGrid } from "@/components/home/DestinationGrid";
import { ExperienceGallery } from "@/components/home/ExperienceGallery";
import { AIPlannerPromo } from "@/components/home/AIPlannerPromo";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturedGuides } from "@/components/home/FeaturedGuides";

export default function HomePage() {
  return (
    <>
      <Hero />
      <DestinationGrid />
      <ExperienceGallery />
      <AIPlannerPromo />
      <HowItWorks />
      <FeaturedGuides />
    </>
  );
}
