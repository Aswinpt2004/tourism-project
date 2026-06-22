"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  IndianRupee,
  Calendar,
  Star,
  TrendingUp,
  MapPin,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TripRequestCard } from "@/components/trip-request/TripRequestCard";
import { PageTransition, FadeIn } from "@/components/animations/motion-primitives";
import { tripRequests } from "@/lib/mock-data";
import { formatINR } from "@/lib/utils";

/** Guide dashboard — incoming trip requests like Uber driver notifications */
export default function GuideDashboardPage() {
  const [requests, setRequests] = useState(
    tripRequests.filter((r) => r.destinationSlug === "trivandrum" || r.destinationSlug === "munnar")
  );
  const [notification, setNotification] = useState<string | null>(null);

  const handleAccept = (requestId: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: "accepted" as const } : r))
    );
    setNotification("Request accepted! Customer will be notified.");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBid = (requestId: string, price: number, message: string) => {
    setNotification(`Counter-offer of ${formatINR(price)} sent!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const stats = [
    { icon: IndianRupee, label: "This Month", value: "₹24,500", color: "text-emerald-600" },
    { icon: Calendar, label: "Bookings", value: "8", color: "text-blue-600" },
    { icon: Star, label: "Rating", value: "4.9", color: "text-amber-500" },
    { icon: TrendingUp, label: "Profile Views", value: "342", color: "text-purple-600" },
  ];

  return (
    <PageTransition>
      <section className="min-h-screen bg-slate-50 pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          {/* Header */}
          <FadeIn className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="live" className="gap-1">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  Live
                </Badge>
                <span className="text-sm text-slate-500">Guide Dashboard</span>
              </div>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">
                Welcome back, Arun
              </h1>
              <p className="mt-1 flex items-center gap-1 text-slate-600">
                <MapPin className="h-4 w-4" />
                Trivandrum, Kerala
              </p>
            </div>
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
              className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-white shadow-lg shadow-emerald-600/30"
            >
              <Bell className="h-5 w-5" />
              <span className="font-semibold">{requests.filter((r) => r.status === "open").length} new requests</span>
            </motion.div>
          </FadeIn>

          {/* Toast notification */}
          <AnimatePresence>
            {notification && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-24 right-4 z-50 flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-white shadow-xl"
              >
                <Zap className="h-4 w-4" />
                {notification}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats grid */}
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <p className="mt-3 text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          {/* Incoming requests — Uber-style */}
          <FadeIn delay={0.2} className="mt-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Bell className="h-5 w-5 text-emerald-600" />
                  Incoming Trip Requests
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Customers in your area posted these — accept or send a counter-offer.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {requests.length === 0 ? (
                <p className="text-center text-slate-500 py-12">No requests in your area right now.</p>
              ) : (
                requests.map((request, i) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <TripRequestCard
                      request={request}
                      guideView
                      onAccept={handleAccept}
                      onBid={handleBid}
                    />
                  </motion.div>
                ))
              )}
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}
