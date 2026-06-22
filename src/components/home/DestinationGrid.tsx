"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HoverImage } from "@/components/ui/hover-image";
import { destinations } from "@/lib/mock-data";
import { destinationImage } from "@/lib/images";

export function DestinationGrid() {
  return (
    <section className="section-pad bg-[var(--kerala-cream)]">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--kerala-gold)]">
              Where to go
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-900 md:text-4xl">
              Explore by destination
            </h2>
            <p className="mt-3 max-w-lg text-stone-600">
              Each region has verified local guides — not hotel listings.
            </p>
          </div>
          <Link
            href="/destinations/trivandrum"
            className="text-sm font-medium text-[var(--kerala-green)] hover:underline"
          >
            View all destinations
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((dest) => (
            <Link key={dest.id} href={`/destinations/${dest.slug}`} className="group block">
              <HoverImage
                src={destinationImage(dest.slug)}
                alt={`${dest.name}, Kerala`}
                caption={`${dest.name} · ${dest.guideCount} guides`}
                className="rounded-xl"
                aspect="wide"
              />
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-stone-900 group-hover:text-[var(--kerala-green)] transition-colors">
                    {dest.name}
                  </h3>
                  <p className="mt-1 text-sm text-stone-600 line-clamp-2">{dest.description}</p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--kerala-border)] text-stone-500 group-hover:border-[var(--kerala-green)] group-hover:text-[var(--kerala-green)] transition-colors">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
