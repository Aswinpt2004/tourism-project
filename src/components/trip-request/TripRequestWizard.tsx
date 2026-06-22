"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  Users,
  IndianRupee,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/card";
import { destinations } from "@/lib/mock-data";
import { formatINR } from "@/lib/utils";
import type { TripRequestFormData } from "@/lib/types";

const interestOptions = [
  "Nature & Trekking",
  "Local Food",
  "Temples & Culture",
  "Beach & Water",
  "Wildlife",
  "Photography",
  "Adventure Sports",
  "Village Experience",
  "Ayurveda & Wellness",
  "Night Life",
];

const travelStyles = ["Relaxed", "Adventure", "Family-friendly", "Budget", "Luxury", "Wellness"];

const steps = ["Destination", "Trip Details", "Interests", "Budget & Post"];

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? 300 : -300, opacity: 0 }),
};

/** Multi-step wizard for custom trip requests (reverse bidding) */
export function TripRequestWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<TripRequestFormData>({
    destination: "",
    destinationSlug: "",
    duration: 2,
    budget: 5000,
    groupSize: 2,
    interests: [],
    travelStyle: "Relaxed",
    description: "",
  });

  const goNext = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const toggleInterest = (interest: string) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const selectDestination = (name: string, slug: string) => {
    setForm((prev) => ({ ...prev, destination: name, destinationSlug: slug }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // In production: POST to API, notify guides in area
    setTimeout(() => router.push("/dashboard/customer"), 2500);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100"
        >
          <Check className="h-10 w-10 text-emerald-600" />
        </motion.div>
        <h2 className="mt-6 text-2xl font-bold text-slate-900">Request Posted!</h2>
        <p className="mt-3 max-w-md text-slate-600">
          Guides in {form.destination} have been notified. Sit back — offers will arrive soon.
        </p>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-6 flex items-center gap-2 text-sm text-emerald-600"
        >
          <Send className="h-4 w-4" />
          Redirecting to your dashboard...
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-slate-500 mb-2">
          {steps.map((s, i) => (
            <span key={s} className={i <= step ? "text-emerald-600 font-medium" : ""}>
              {s}
            </span>
          ))}
        </div>
        <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Step 0: Destination */}
          {step === 0 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-emerald-600" />
                Where do you want to go?
              </h2>
              <p className="mt-2 text-slate-600">Guides in this area will receive your request.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {destinations.map((dest) => (
                  <motion.button
                    key={dest.slug}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => selectDestination(dest.name, dest.slug)}
                    className={`rounded-2xl border-2 p-4 text-left transition-colors ${
                      form.destinationSlug === dest.slug
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-slate-200 hover:border-emerald-300"
                    }`}
                  >
                    <p className="font-semibold text-slate-900">{dest.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{dest.guideCount} guides available</p>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Trip details */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="h-6 w-6 text-emerald-600" />
                Trip details
              </h2>
              <div className="mt-6 space-y-5">
                <div>
                  <label className="text-sm font-medium text-slate-700">Duration (days)</label>
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
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                    <Users className="h-4 w-4" /> Group size
                  </label>
                  <Input
                    type="number"
                    min={1}
                    max={20}
                    value={form.groupSize}
                    onChange={(e) => setForm({ ...form, groupSize: Number(e.target.value) })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Travel style</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {travelStyles.map((style) => (
                      <button
                        key={style}
                        onClick={() => setForm({ ...form, travelStyle: style })}
                        className={`rounded-full px-4 py-1.5 text-sm border transition-colors ${
                          form.travelStyle === style
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                            : "border-slate-200 text-slate-600 hover:border-emerald-300"
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Interests */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-emerald-600" />
                What interests you?
              </h2>
              <p className="mt-2 text-slate-600">Select all that apply — guides will tailor their offers.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {interestOptions.map((interest) => (
                  <motion.button
                    key={interest}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleInterest(interest)}
                    className={`rounded-full px-4 py-2 text-sm border transition-all ${
                      form.interests.includes(interest)
                        ? "border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                        : "border-slate-200 text-slate-600 hover:border-emerald-300"
                    }`}
                  >
                    {interest}
                  </motion.button>
                ))}
              </div>
              <div className="mt-6">
                <label className="text-sm font-medium text-slate-700">Additional notes</label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Need hidden places, local food, kid-friendly spots..."
                  className="mt-1.5"
                />
              </div>
            </div>
          )}

          {/* Step 3: Budget & summary */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <IndianRupee className="h-6 w-6 text-emerald-600" />
                Set your budget
              </h2>
              <p className="mt-2 text-slate-600">
                Guides can accept this amount or send a counter-offer.
              </p>

              <div className="mt-6">
                <div className="flex items-center gap-4">
                  <Input
                    type="range"
                    min={1000}
                    max={50000}
                    step={500}
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
                    className="flex-1 accent-emerald-600"
                  />
                  <span className="text-2xl font-bold text-emerald-700 min-w-[120px] text-right">
                    {formatINR(form.budget)}
                  </span>
                </div>
                <Input
                  type="number"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
                  className="mt-3"
                />
              </div>

              {/* Summary card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6"
              >
                <h3 className="font-semibold text-slate-900">Your request summary</h3>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Destination</dt>
                    <dd className="font-medium">{form.destination || "—"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Duration</dt>
                    <dd className="font-medium">{form.duration} days</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Group</dt>
                    <dd className="font-medium">{form.groupSize} people</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Budget</dt>
                    <dd className="font-bold text-emerald-700">{formatINR(form.budget)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Interests</dt>
                    <dd className="font-medium text-right max-w-[200px]">
                      {form.interests.join(", ") || "—"}
                    </dd>
                  </div>
                </dl>
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="mt-8 flex justify-between">
        <Button
          variant="ghost"
          onClick={goBack}
          disabled={step === 0}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>

        {step < steps.length - 1 ? (
          <Button
            onClick={goNext}
            disabled={step === 0 && !form.destinationSlug}
            className="gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="gold"
            onClick={handleSubmit}
            disabled={!form.destinationSlug}
            className="gap-2"
          >
            <Send className="h-4 w-4" />
            Post Request to Guides
          </Button>
        )}
      </div>
    </div>
  );
}
