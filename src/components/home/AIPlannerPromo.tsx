"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoverImage } from "@/components/ui/hover-image";
import { keralaImages } from "@/lib/images";

/** Homepage promo for AI trip planner */
export function AIPlannerPromo() {
  return (
    <section className="section-pad bg-[var(--kerala-deep)] text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <HoverImage
            src={keralaImages.planner.map}
            alt="Planning a route through Kerala"
            caption="From rough idea to day-by-day plan"
            className="rounded-xl order-2 lg:order-1"
            overlay="dark"
          />
          <div className="order-1 lg:order-2">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--kerala-gold)]">
              <Sparkles className="h-4 w-4" />
              AI Trip Studio
            </p>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl text-balance">
              Have a rough plan? We&apos;ll shape it into something real.
            </h2>
            <p className="mt-4 text-white/75 leading-relaxed max-w-lg">
              Describe your trip in plain language — &ldquo;Day 1 temples, Day 2 beach,
              hidden food spots&rdquo;. AI reorganizes timings, fixes pacing, and builds
              an itinerary you can customize before sending to guides.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-white/70">
              <li>· Write your idea — no rigid form required</li>
              <li>· AI corrects unrealistic schedules and suggests local stops</li>
              <li>· Edit every activity, then post to guides for bids</li>
            </ul>
            <Link href="/plan-trip" className="inline-block mt-8">
              <Button variant="gold" size="lg" className="gap-2">
                Open AI Trip Planner
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
