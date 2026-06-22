"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TripRequestCard } from "@/components/trip-request/TripRequestCard";
import { PageTransition, FadeIn } from "@/components/animations/motion-primitives";
import { tripRequests } from "@/lib/mock-data";

/** Customer dashboard — view posted requests and incoming guide bids */
export default function CustomerDashboardPage() {
  const myRequests = tripRequests;

  return (
    <PageTransition>
      <section className="min-h-screen bg-slate-50 pt-28 pb-20">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <FadeIn className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Trips</h1>
              <p className="mt-1 text-slate-600">Track your requests and guide offers.</p>
            </div>
            <Link href="/request-trip">
              <Button variant="gold" className="gap-2">
                <Plus className="h-4 w-4" />
                New Custom Trip
              </Button>
            </Link>
          </FadeIn>

          {/* Active requests */}
          <FadeIn delay={0.1} className="mt-10">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Your Requests</h2>
            <div className="space-y-4">
              {myRequests.map((request, i) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <TripRequestCard request={request} />
                </motion.div>
              ))}
            </div>
          </FadeIn>

          {/* Empty state hint */}
          <FadeIn delay={0.2} className="mt-10 rounded-2xl border border-dashed border-slate-300 p-8 text-center">
            <MapPin className="h-8 w-8 text-slate-400 mx-auto" />
            <p className="mt-3 text-slate-600">
              Want to explore a new destination? Post a custom trip and let guides come to you.
            </p>
            <Link href="/request-trip">
              <Button className="mt-4">Plan My Trip</Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}
