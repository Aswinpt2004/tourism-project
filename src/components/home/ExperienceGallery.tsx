"use client";

import { keralaImages } from "@/lib/images";
import { HoverImage } from "@/components/ui/hover-image";

/** Editorial photo grid showcasing Kerala experiences */
export function ExperienceGallery() {
  return (
    <section className="section-pad bg-white border-y border-[var(--kerala-border)]">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--kerala-gold)]">
            Experiences
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-stone-900 md:text-4xl">
            Kerala beyond the brochure
          </h2>
          <p className="mt-3 text-stone-600 leading-relaxed">
            Hover to explore the kinds of journeys our local guides lead every day.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2 md:h-[520px]">
          <HoverImage
            src={keralaImages.experiences[0].src}
            alt={keralaImages.experiences[0].alt}
            caption={keralaImages.experiences[0].caption}
            className="rounded-xl md:row-span-2 h-64 md:h-auto"
            aspect="auto"
          />
          <HoverImage
            src={keralaImages.experiences[1].src}
            alt={keralaImages.experiences[1].alt}
            caption={keralaImages.experiences[1].caption}
            className="rounded-xl h-56 md:h-auto"
            aspect="auto"
          />
          <HoverImage
            src={keralaImages.experiences[2].src}
            alt={keralaImages.experiences[2].alt}
            caption={keralaImages.experiences[2].caption}
            className="rounded-xl h-56 md:h-auto"
            aspect="auto"
          />
          <HoverImage
            src={keralaImages.experiences[4].src}
            alt={keralaImages.experiences[4].alt}
            caption={keralaImages.experiences[4].caption}
            className="rounded-xl h-56 md:h-auto md:col-span-1"
            aspect="auto"
          />
          <HoverImage
            src={keralaImages.experiences[5].src}
            alt={keralaImages.experiences[5].alt}
            caption={keralaImages.experiences[5].caption}
            className="rounded-xl h-56 md:h-auto"
            aspect="auto"
          />
        </div>
      </div>
    </section>
  );
}
