"use client";

import { motion } from "framer-motion";
import {
  User,
  Camera,
  Map,
  IndianRupee,
  Calendar,
  Shield,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageTransition, FadeIn } from "@/components/animations/motion-primitives";

const steps = [
  { icon: User, title: "Personal Info", desc: "Name, bio, photos" },
  { icon: Map, title: "Services", desc: "Create unlimited packages" },
  { icon: Camera, title: "Gallery", desc: "Upload tour photos" },
  { icon: IndianRupee, title: "Pricing", desc: "Daily, group, seasonal rates" },
  { icon: Calendar, title: "Availability", desc: "Manage your calendar" },
  { icon: Shield, title: "Verification", desc: "Submit documents for badge" },
];

/** Guide registration preview page (MVP UI) */
export default function BecomeGuidePage() {
  return (
    <PageTransition>
      <section className="min-h-screen bg-gradient-to-b from-emerald-950 to-slate-900 pt-28 pb-20 text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <FadeIn className="text-center max-w-2xl mx-auto">
            <Badge variant="gold" className="mb-4">Join 150+ guides</Badge>
            <h1 className="text-3xl font-bold md:text-5xl">
              Share Kerala. Earn on your terms.
            </h1>
            <p className="mt-4 text-slate-300">
              Create your profile, list services, and receive custom trip requests from tourists —
              accept or negotiate, just like ride-hailing.
            </p>
          </FadeIn>

          {/* Steps overview */}
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <step.icon className="h-6 w-6 text-emerald-400" />
                  <h3 className="mt-3 font-semibold">{step.title}</h3>
                  <p className="text-sm text-slate-400">{step.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          {/* Registration form preview */}
          <FadeIn delay={0.3}>
            <div className="mt-16 mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <h2 className="text-xl font-bold">Start your profile</h2>
              <p className="text-sm text-slate-400 mt-1">Phase 1 MVP — full auth coming soon</p>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-sm text-slate-300">Full Name</label>
                  <Input placeholder="Your name" className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-slate-500" />
                </div>
                <div>
                  <label className="text-sm text-slate-300">Bio</label>
                  <Textarea placeholder="Tell travelers about yourself..." className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-slate-500" />
                </div>
                <div>
                  <label className="text-sm text-slate-300">Primary Destination</label>
                  <Input placeholder="e.g. Trivandrum" className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-slate-500" />
                </div>
                <div>
                  <label className="text-sm text-slate-300">Daily Rate (₹)</label>
                  <Input type="number" placeholder="2500" className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-slate-500" />
                </div>

                <div className="rounded-xl border border-dashed border-white/20 p-6 text-center">
                  <Upload className="h-8 w-8 text-slate-400 mx-auto" />
                  <p className="mt-2 text-sm text-slate-400">Upload profile photo & cover image</p>
                </div>

                <Button variant="gold" className="w-full mt-2">
                  Submit for Verification
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}
