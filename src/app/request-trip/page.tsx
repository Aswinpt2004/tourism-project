import Link from "next/link";
import { Sparkles } from "lucide-react";
import { TripRequestWizard } from "@/components/trip-request/TripRequestWizard";

export default function RequestTripPage() {
  return (
    <section className="min-h-screen bg-[var(--kerala-cream)] pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--kerala-gold)]">
            Custom trip request
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-stone-900 md:text-4xl">
            Post your trip — guides bid
          </h1>
          <p className="mt-3 text-stone-600 leading-relaxed">
            Set your budget and preferences. Local guides in your destination receive
            your request and respond with offers.
          </p>
          <p className="mt-4 text-sm text-stone-500">
            Have a rough itinerary first?{" "}
            <Link href="/plan-trip" className="text-[var(--kerala-green)] font-medium hover:underline">
              Refine it with AI →
            </Link>
          </p>
        </div>

        <div className="mx-auto max-w-2xl rounded-xl border border-[var(--kerala-border)] bg-white p-6 md:p-10 shadow-sm">
          <TripRequestWizard />
        </div>
      </div>
    </section>
  );
}
