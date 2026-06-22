"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, ShieldCheck, Languages } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { guides } from "@/lib/mock-data";
import { formatINR } from "@/lib/utils";

export function FeaturedGuides() {
  const featured = guides.slice(0, 4);

  return (
    <section className="section-pad bg-[var(--kerala-cream)]">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--kerala-gold)]">
              Local experts
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-900 md:text-4xl">
              Featured guides
            </h2>
          </div>
          <Link href="/destinations/trivandrum" className="text-sm font-medium text-[var(--kerala-green)]">
            Browse all guides →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((guide) => (
            <article
              key={guide.id}
              className="group overflow-hidden rounded-xl border border-[var(--kerala-border)] bg-white transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={guide.coverImage}
                  alt={guide.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                {guide.verified && (
                  <Badge className="absolute top-3 left-3 gap-1 bg-white/95 text-[var(--kerala-deep)] shadow-sm">
                    <ShieldCheck className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-[var(--kerala-sand)]">
                    <Image src={guide.avatar} alt={guide.name} fill className="object-cover" sizes="40px" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900">{guide.name}</h3>
                    <p className="text-xs text-stone-500">{guide.location}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <Star className="h-3.5 w-3.5 fill-[var(--kerala-gold)] text-[var(--kerala-gold)]" />
                  <span className="font-medium">{guide.rating}</span>
                  <span className="text-stone-400">({guide.reviewCount})</span>
                </div>
                <p className="mt-2 text-xs text-stone-500 flex items-center gap-1">
                  <Languages className="h-3 w-3" />
                  {guide.languages.slice(0, 2).join(", ")}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-[var(--kerala-border)] pt-4">
                  <p className="text-sm">
                    <span className="text-stone-500">From </span>
                    <span className="font-semibold text-[var(--kerala-green)]">
                      {formatINR(guide.pricePerDay)}
                    </span>
                    <span className="text-stone-400 text-xs">/day</span>
                  </p>
                  <Link href={`/guides/${guide.slug}`}>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
