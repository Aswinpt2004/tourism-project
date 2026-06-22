"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MapPin,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HoverImage } from "@/components/ui/hover-image";
import { destinations } from "@/lib/mock-data";
import { keralaImages } from "@/lib/images";
import { formatINR } from "@/lib/utils";
import type { PlanActivity, PlanDay, RefinedTripPlan, UserPlanInput } from "@/lib/types";

const interestOptions = [
  "Nature & Trekking",
  "Local Food",
  "Temples & Culture",
  "Beach",
  "Wildlife",
  "Photography",
  "Adventure",
  "Village Life",
];

type Step = "suggest" | "refined" | "customize";

/** Tourist suggests a rough plan → AI refines → user customizes */
export function TripPlanStudio() {
  const [step, setStep] = useState<Step>("suggest");
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState<"ai" | "local">("local");
  const [form, setForm] = useState({
    destination: "",
    destinationSlug: "",
    duration: 3,
    budget: 8000,
    groupSize: 2,
    travelStyle: "Relaxed",
    roughPlan: "",
    interests: [] as string[],
  });
  const [plan, setPlan] = useState<RefinedTripPlan | null>(null);

  const toggleInterest = (item: string) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(item)
        ? prev.interests.filter((i) => i !== item)
        : [...prev.interests, item],
    }));
  };

  const handleRefine = async () => {
    if (!form.destinationSlug || !form.roughPlan.trim()) return;
    setLoading(true);

    const payload: UserPlanInput = {
      destination: form.destination,
      destinationSlug: form.destinationSlug,
      duration: form.duration,
      budget: form.budget,
      groupSize: form.groupSize,
      travelStyle: form.travelStyle,
      roughPlan: form.roughPlan,
      interests: form.interests,
    };

    try {
      const res = await fetch("/api/plan/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.plan) {
        setPlan(data.plan);
        setSource(data.source);
        setStep("refined");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateActivity = (dayIndex: number, actIndex: number, field: keyof PlanActivity, value: string | number) => {
    if (!plan) return;
    const days = [...plan.days];
    const activities = [...days[dayIndex].activities];
    activities[actIndex] = { ...activities[actIndex], [field]: value };
    days[dayIndex] = { ...days[dayIndex], activities };
    setPlan({ ...plan, days });
  };

  const addActivity = (dayIndex: number) => {
    if (!plan) return;
    const days = [...plan.days];
    days[dayIndex].activities.push({
      id: Math.random().toString(36).slice(2, 9),
      time: "10:00 AM",
      title: "New activity",
      description: "Describe this stop",
      location: "",
      estimatedCost: 0,
    });
    setPlan({ ...plan, days });
  };

  const removeActivity = (dayIndex: number, actIndex: number) => {
    if (!plan) return;
    const days = [...plan.days];
    days[dayIndex].activities = days[dayIndex].activities.filter((_, i) => i !== actIndex);
    setPlan({ ...plan, days });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
      {/* Main panel */}
      <div className="rounded-xl border border-[var(--kerala-border)] bg-white shadow-sm">
        <div className="border-b border-[var(--kerala-border)] px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {(["suggest", "refined", "customize"] as Step[]).map((s, i) => (
              <span
                key={s}
                className={`text-xs font-medium uppercase tracking-wider ${
                  step === s ? "text-[var(--kerala-green)]" : "text-stone-400"
                }`}
              >
                {i + 1}. {s === "suggest" ? "Your idea" : s === "refined" ? "AI plan" : "Customize"}
                {i < 2 && <span className="mx-2 text-stone-300">→</span>}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            {step === "suggest" && (
              <motion.div
                key="suggest"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-stone-900">
                    Describe your dream Kerala trip
                  </h2>
                  <p className="mt-2 text-stone-600 text-sm leading-relaxed">
                    Write your rough plan in your own words — half-formed ideas are fine.
                    Our AI will reorganize timings, fix pacing, and suggest realistic stops.
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-stone-700">Destination</label>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {destinations.map((d) => (
                      <button
                        key={d.slug}
                        type="button"
                        onClick={() => setForm({ ...form, destination: d.name, destinationSlug: d.slug })}
                        className={`rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${
                          form.destinationSlug === d.slug
                            ? "border-[var(--kerala-green)] bg-[var(--kerala-cream)] text-[var(--kerala-deep)]"
                            : "border-[var(--kerala-border)] hover:border-stone-400"
                        }`}
                      >
                        {d.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="text-sm font-medium text-stone-700">Days</label>
                    <Input
                      type="number"
                      min={1}
                      max={14}
                      value={form.duration}
                      onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-stone-700">Group size</label>
                    <Input
                      type="number"
                      min={1}
                      value={form.groupSize}
                      onChange={(e) => setForm({ ...form, groupSize: Number(e.target.value) })}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-stone-700">Budget (₹)</label>
                    <Input
                      type="number"
                      min={1000}
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-stone-700">Interests</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {interestOptions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleInterest(item)}
                        className={`rounded-full px-3 py-1 text-xs border transition-colors ${
                          form.interests.includes(item)
                            ? "border-[var(--kerala-green)] bg-[var(--kerala-green)] text-white"
                            : "border-[var(--kerala-border)] text-stone-600 hover:border-stone-400"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-stone-700">
                    Your rough plan <span className="text-stone-400">(required)</span>
                  </label>
                  <Textarea
                    value={form.roughPlan}
                    onChange={(e) => setForm({ ...form, roughPlan: e.target.value })}
                    placeholder="Example: Day 1 temple and market, Day 2 Kovalam beach and seafood, Day 3 backwaters. We want hidden spots, not tourist traps. Kids aged 8 and 12."
                    className="mt-1.5 min-h-[140px]"
                  />
                </div>

                <Button
                  onClick={handleRefine}
                  disabled={loading || !form.destinationSlug || !form.roughPlan.trim()}
                  className="w-full sm:w-auto gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Refining your plan…
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Refine with AI
                    </>
                  )}
                </Button>
              </motion.div>
            )}

            {(step === "refined" || step === "customize") && plan && (
              <motion.div
                key="plan"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <Badge variant="outline" className="mb-2">
                      {source === "ai" ? "AI refined" : "Smart local refinement"}
                    </Badge>
                    <h2 className="text-2xl font-semibold text-stone-900">{plan.title}</h2>
                    <p className="mt-2 text-sm text-stone-600 leading-relaxed">{plan.summary}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-stone-500">Est. budget</p>
                    <p className="text-xl font-semibold text-[var(--kerala-green)]">
                      {formatINR(plan.estimatedBudget)}
                    </p>
                  </div>
                </div>

                {plan.aiNotes.length > 0 && (
                  <div className="rounded-lg bg-[var(--kerala-cream)] border border-[var(--kerala-sand)] p-4">
                    <p className="flex items-center gap-2 text-sm font-medium text-[var(--kerala-deep)]">
                      <Lightbulb className="h-4 w-4" />
                      What we improved
                    </p>
                    <ul className="mt-2 space-y-1">
                      {plan.aiNotes.map((note) => (
                        <li key={note} className="text-sm text-stone-600 flex gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--kerala-moss)] mt-0.5" />
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {plan.days.map((day, dayIndex) => (
                  <DayBlock
                    key={day.day}
                    day={day}
                    editable={step === "customize"}
                    onEditActivity={(actIndex, field, value) =>
                      updateActivity(dayIndex, actIndex, field, value)
                    }
                    onAddActivity={() => addActivity(dayIndex)}
                    onRemoveActivity={(actIndex) => removeActivity(dayIndex, actIndex)}
                  />
                ))}

                <div className="flex flex-wrap gap-3 pt-4 border-t border-[var(--kerala-border)]">
                  {step === "refined" && (
                    <Button onClick={() => setStep("customize")} variant="outline" className="gap-2">
                      <Pencil className="h-4 w-4" />
                      Customize this plan
                    </Button>
                  )}
                  {step === "customize" && (
                    <Link href={`/request-trip?destination=${plan.destinationSlug}`}>
                      <Button className="gap-2">
                        Post to local guides
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  <Button variant="ghost" onClick={() => setStep("suggest")}>
                    Start over
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Side imagery */}
      <aside className="hidden lg:block space-y-4">
        <HoverImage
          src={keralaImages.planner.collage}
          alt="Travellers planning a Kerala journey"
          caption="Craft your journey, your way"
          aspect="portrait"
          className="rounded-xl"
        />
        <div className="rounded-xl border border-[var(--kerala-border)] bg-[var(--kerala-cream)] p-5">
          <p className="text-sm font-medium text-[var(--kerala-deep)]">How it works</p>
          <ol className="mt-3 space-y-3 text-sm text-stone-600">
            <li className="flex gap-2">
              <span className="font-semibold text-[var(--kerala-green)]">1.</span>
              Write your rough idea — no perfect format needed.
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-[var(--kerala-green)]">2.</span>
              AI fixes timing, routes, and budget realism.
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-[var(--kerala-green)]">3.</span>
              Edit every stop, then send to guides for bids.
            </li>
          </ol>
        </div>
      </aside>
    </div>
  );
}

function DayBlock({
  day,
  editable,
  onEditActivity,
  onAddActivity,
  onRemoveActivity,
}: {
  day: PlanDay;
  editable: boolean;
  onEditActivity: (actIndex: number, field: keyof PlanActivity, value: string | number) => void;
  onAddActivity: () => void;
  onRemoveActivity: (actIndex: number) => void;
}) {
  return (
    <div className="rounded-lg border border-[var(--kerala-border)] overflow-hidden">
      <div className="bg-stone-50 px-4 py-3 border-b border-[var(--kerala-border)]">
        <p className="text-xs font-medium uppercase tracking-wider text-stone-500">Day {day.day}</p>
        <p className="font-medium text-stone-900">{day.title}</p>
      </div>
      <div className="divide-y divide-[var(--kerala-border)]">
        {day.activities.map((act, i) => (
          <div key={act.id} className="px-4 py-3">
            {editable ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={act.time}
                    onChange={(e) => onEditActivity(i, "time", e.target.value)}
                    className="w-28 text-xs"
                  />
                  <Input
                    value={act.title}
                    onChange={(e) => onEditActivity(i, "title", e.target.value)}
                    className="flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveActivity(i)}
                    className="p-2 text-stone-400 hover:text-red-600"
                    aria-label="Remove activity"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <Textarea
                  value={act.description}
                  onChange={(e) => onEditActivity(i, "description", e.target.value)}
                  className="text-sm min-h-[60px]"
                />
              </div>
            ) : (
              <div className="flex gap-4">
                <span className="text-xs font-medium text-[var(--kerala-gold)] w-16 shrink-0 pt-0.5">
                  {act.time}
                </span>
                <div>
                  <p className="font-medium text-stone-900">{act.title}</p>
                  <p className="text-sm text-stone-600 mt-0.5">{act.description}</p>
                  {act.location && (
                    <p className="text-xs text-stone-400 mt-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {act.location}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {editable && (
        <button
          type="button"
          onClick={onAddActivity}
          className="flex w-full items-center justify-center gap-2 py-3 text-sm text-[var(--kerala-green)] hover:bg-stone-50"
        >
          <Plus className="h-4 w-4" />
          Add activity
        </button>
      )}
    </div>
  );
}
