import { TripPlanStudio } from "@/components/planner/TripPlanStudio";
import { HoverImage } from "@/components/ui/hover-image";
import { keralaImages } from "@/lib/images";

export const metadata = {
  title: "AI Trip Planner — Unexplored Kerala",
  description: "Suggest your rough Kerala trip plan. AI refines it into a realistic itinerary you can customize.",
};

export default function PlanTripPage() {
  return (
    <>
      {/* Page header with imagery */}
      <section className="relative border-b border-[var(--kerala-border)] bg-[var(--kerala-cream)]">
        <div className="mx-auto max-w-7xl px-4 md:px-8 pt-28 pb-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--kerala-gold)]">
                AI Trip Studio
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-stone-900 md:text-5xl text-balance">
                Suggest a plan. We refine it. You make it yours.
              </h1>
              <p className="mt-4 text-stone-600 leading-relaxed max-w-lg">
                Tell us what you have in mind — even if it&apos;s messy. Our AI reorganizes
                your days, fixes unrealistic pacing, and builds a proper itinerary you can edit before
                sending it to local guides.
              </p>
            </div>
            <HoverImage
              src={keralaImages.experiences[0].src}
              alt={keralaImages.experiences[0].alt}
              caption={keralaImages.experiences[0].caption}
              className="rounded-xl shadow-lg"
              priority
            />
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <TripPlanStudio />
        </div>
      </section>
    </>
  );
}
