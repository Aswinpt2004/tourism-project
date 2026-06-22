"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  ShieldCheck,
  Languages,
  MapPin,
  Clock,
  IndianRupee,
  Camera,
  Route,
  MessageCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/motion-primitives";
import { formatINR } from "@/lib/utils";
import type { Guide, Review } from "@/lib/types";

interface GuideProfileViewProps {
  guide: Guide;
  reviews: Review[];
}

export function GuideProfileView({ guide, reviews }: GuideProfileViewProps) {
  return (
    <div>
      {/* Cover + avatar */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src={guide.coverImage}
          alt={guide.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="mx-auto max-w-5xl flex items-end gap-5">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-white shadow-xl md:h-32 md:w-32"
            >
              <Image src={guide.avatar} alt={guide.name} fill className="object-cover" sizes="128px" />
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white md:text-4xl">{guide.name}</h1>
                {guide.verified && (
                  <Badge variant="verified" className="bg-blue-500 text-white gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
              <p className="mt-1 flex items-center gap-1 text-slate-300">
                <MapPin className="h-4 w-4" />
                {guide.location}
              </p>
              <div className="mt-2 flex items-center gap-3">
                <span className="flex items-center gap-1 text-amber-400">
                  <Star className="h-4 w-4 fill-current" />
                  {guide.rating} ({guide.reviewCount} reviews)
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-300">{guide.experienceYears} years experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 md:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <FadeIn>
              <section>
                <h2 className="text-xl font-bold text-slate-900">About</h2>
                <p className="mt-3 text-slate-600 leading-relaxed">{guide.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {guide.languages.map((lang) => (
                    <Badge key={lang} variant="outline" className="gap-1">
                      <Languages className="h-3 w-3" />
                      {lang}
                    </Badge>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* Services */}
            <FadeIn delay={0.1}>
              <section>
                <h2 className="text-xl font-bold text-slate-900">Services & Packages</h2>
                <div className="mt-4 space-y-3">
                  {guide.services.map((service, i) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 hover:border-emerald-300 hover:shadow-md transition-all"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">{service.name}</p>
                        <p className="text-sm text-slate-500">{service.description}</p>
                        <span className="mt-1 inline-flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="h-3 w-3" />
                          {service.duration}
                        </span>
                      </div>
                      <p className="text-lg font-bold text-emerald-700">{formatINR(service.price)}</p>
                    </motion.div>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* Itinerary sample */}
            <FadeIn delay={0.15}>
              <section>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Route className="h-5 w-5 text-emerald-600" />
                  Sample Itinerary
                </h2>
                <div className="mt-4 relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-emerald-200" />
                  {guide.itinerary.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative flex gap-4 pb-6 last:pb-0"
                    >
                      <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-emerald-700">{item.time}</p>
                        <p className="text-slate-700">{item.activity}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* Gallery */}
            <FadeIn delay={0.2}>
              <section>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Camera className="h-5 w-5 text-emerald-600" />
                  Photo Gallery
                </h2>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                  {guide.gallery.map((photo, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      className="relative aspect-square overflow-hidden rounded-2xl"
                    >
                      <Image src={photo} alt={`Gallery ${i + 1}`} fill className="object-cover" sizes="200px" />
                    </motion.div>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* Reviews */}
            <FadeIn delay={0.25}>
              <section>
                <h2 className="text-xl font-bold text-slate-900">Reviews</h2>
                <div className="mt-4 space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-slate-900">{review.author}</p>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-slate-600">{review.comment}</p>
                      <p className="mt-1 text-xs text-slate-400">{review.date}</p>
                    </div>
                  ))}
                </div>
              </section>
            </FadeIn>
          </div>

          {/* Sidebar booking card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-28 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
            >
              <p className="text-sm text-slate-500">Starting from</p>
              <p className="text-3xl font-bold text-emerald-700">
                {formatINR(guide.pricePerDay)}
                <span className="text-sm font-normal text-slate-500">/day</span>
              </p>

              <div className="mt-4 space-y-2">
                {guide.specializations.map((spec) => (
                  <Badge key={spec} variant="outline" className="mr-1">
                    {spec}
                  </Badge>
                ))}
              </div>

              <Button className="mt-6 w-full gap-2">
                <MessageCircle className="h-4 w-4" />
                Book This Guide
              </Button>

              <Link href="/request-trip" className="block mt-3">
                <Button variant="gold" className="w-full">
                  Or Post Custom Trip Request
                </Button>
              </Link>

              {guide.certifications.length > 0 && (
                <div className="mt-6 border-t border-slate-100 pt-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase">Certifications</p>
                  <ul className="mt-2 space-y-1">
                    {guide.certifications.map((cert) => (
                      <li key={cert} className="flex items-center gap-1.5 text-xs text-slate-600">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
