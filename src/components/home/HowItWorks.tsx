"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    num: "01",
    title: "Choose a destination",
    description: "Browse Trivandrum, Munnar, Wayanad and more. See verified guides operating in each region.",
  },
  {
    num: "02",
    title: "Plan with AI or post a request",
    description: "Write your rough itinerary — AI refines it into a realistic day-by-day plan you can edit. Or post your budget and let guides bid.",
  },
  {
    num: "03",
    title: "Travel with a local expert",
    description: "Book a guide's package or accept the best counter-offer. Experience Kerala through someone who lives there.",
  },
];

export function HowItWorks() {
  return (
    <section className="section-pad bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--kerala-gold)]">
              How it works
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-900 md:text-4xl">
              A marketplace built around guides
            </h2>
            <p className="mt-4 text-stone-600 leading-relaxed">
              Traditional travel sites sell rooms and fixed packages. We connect you
              directly with local experts — and let you shape the trip before you book.
            </p>
            <Link href="/plan-trip" className="inline-block mt-8">
              <Button className="gap-2">
                Try the AI planner
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="space-y-0 divide-y divide-[var(--kerala-border)] border border-[var(--kerala-border)] rounded-xl overflow-hidden">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-6 bg-white p-6 md:p-8">
                <span className="text-2xl font-semibold text-[var(--kerala-sand)] shrink-0">
                  {step.num}
                </span>
                <div>
                  <h3 className="font-semibold text-stone-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-stone-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
