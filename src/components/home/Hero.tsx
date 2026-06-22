"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HoverImage } from "@/components/ui/hover-image";
import { destinations } from "@/lib/mock-data";
import { keralaImages } from "@/lib/images";

export function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const match = destinations.find(
      (d) =>
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.slug.includes(query.toLowerCase())
    );
    router.push(`/destinations/${match?.slug ?? "trivandrum"}`);
  };

  return (
    <section className="relative min-h-[92vh] bg-[var(--kerala-deep)]">
      {/* Full-width hero image */}
      <div className="absolute inset-0">
        <Image
          src={keralaImages.hero.main}
          alt="Kerala tea plantations and misty hills"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--kerala-deep)]/95 via-[var(--kerala-deep)]/75 to-[var(--kerala-deep)]/40" />
      </div>

      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-4 pb-16 pt-32 md:px-8 md:pb-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          {/* Copy */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--kerala-gold)]">
              Kerala · Guide-first travel
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-[1.1] text-white md:text-6xl text-balance">
              Travel with people who know the land
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
              Book verified local guides, plan trips with AI, or post a custom request —
              guides in your destination respond with offers.
            </p>

            <form onSubmit={handleSearch} className="mt-8 flex flex-col gap-3 sm:flex-row sm:max-w-md">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Where in Kerala?"
                className="h-12 border-0 bg-white text-stone-900 shadow-lg"
              />
              <Button type="submit" size="lg" className="h-12 shrink-0 gap-2">
                <Search className="h-4 w-4" />
                Find guides
              </Button>
            </form>

            <div className="mt-6 flex flex-wrap gap-2">
              {destinations.slice(0, 4).map((dest) => (
                <button
                  key={dest.slug}
                  type="button"
                  onClick={() => router.push(`/destinations/${dest.slug}`)}
                  className="rounded-full border border-white/25 px-3 py-1 text-xs text-white/90 hover:bg-white/10 transition-colors"
                >
                  {dest.name}
                </button>
              ))}
            </div>
          </div>

          {/* Image collage */}
          <div className="hidden lg:grid grid-cols-2 gap-3">
            <HoverImage
              src={keralaImages.hero.tea}
              alt="Tea estates in Munnar"
              caption="Tea country"
              className="rounded-lg h-48"
              overlay="dark"
            />
            <HoverImage
              src={keralaImages.hero.temple}
              alt="Kerala temple gopuram"
              caption="Living heritage"
              className="rounded-lg h-48 mt-8"
              overlay="dark"
            />
            <HoverImage
              src={keralaImages.experiences[5].src}
              alt="Traditional Kerala food"
              caption="Local cuisine"
              className="rounded-lg h-44 col-span-2"
              overlay="dark"
            />
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link href="/plan-trip">
            <Button variant="gold" size="lg" className="gap-2 w-full sm:w-auto">
              Suggest a plan — AI refines it
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/request-trip">
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              Post custom trip to guides
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
