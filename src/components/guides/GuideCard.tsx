"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShieldCheck, Languages, IndianRupee } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedCard } from "@/components/ui/card";
import { formatINR } from "@/lib/utils";
import type { Guide } from "@/lib/types";

interface GuideCardProps {
  guide: Guide;
  index?: number;
  showBookButton?: boolean;
}

/** Guide listing card — similar to hotel cards on travel sites */
export function GuideCard({ guide, index = 0, showBookButton = true }: GuideCardProps) {
  return (
    <AnimatedCard delay={index * 0.08} className="group">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={guide.coverImage}
          alt={guide.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {guide.verified && (
          <div className="absolute top-3 left-3">
            <Badge variant="verified" className="gap-1 bg-blue-500/90 text-white backdrop-blur-sm">
              <ShieldCheck className="h-3 w-3" />
              Verified
            </Badge>
          </div>
        )}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white">
            <Image src={guide.avatar} alt={guide.name} fill className="object-cover" sizes="48px" />
          </div>
          <div>
            <p className="font-semibold text-white">{guide.name}</p>
            <p className="text-xs text-slate-200">{guide.location}</p>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Rating & experience */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-slate-900">{guide.rating}</span>
            <span className="text-sm text-slate-500">({guide.reviewCount})</span>
          </div>
          <span className="text-xs text-slate-500">{guide.experienceYears} yrs exp.</span>
        </div>

        {/* Specializations */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {guide.specializations.slice(0, 3).map((spec) => (
            <Badge key={spec} variant="outline" className="text-[10px]">
              {spec}
            </Badge>
          ))}
        </div>

        {/* Languages */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
          <Languages className="h-3.5 w-3.5" />
          {guide.languages.slice(0, 3).join(" · ")}
        </div>

        {/* Price & CTA */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs text-slate-500">From</p>
            <p className="flex items-center text-lg font-bold text-emerald-700">
              <IndianRupee className="h-4 w-4" />
              {guide.pricePerDay.toLocaleString("en-IN")}
              <span className="text-xs font-normal text-slate-500">/day</span>
            </p>
          </div>
          {showBookButton && (
            <Link href={`/guides/${guide.slug}`}>
              <Button size="sm">View Profile</Button>
            </Link>
          )}
        </div>
      </div>
    </AnimatedCard>
  );
}

/** Compact guide card for bid lists */
export function GuideMiniCard({ guide }: { guide: Guide }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3"
    >
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
        <Image src={guide.avatar} alt={guide.name} fill className="object-cover" sizes="40px" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-slate-900">{guide.name}</p>
        <p className="text-xs text-slate-500">{formatINR(guide.pricePerDay)}/day</p>
      </div>
      <div className="flex items-center gap-0.5 text-amber-500">
        <Star className="h-3 w-3 fill-current" />
        <span className="text-xs font-medium">{guide.rating}</span>
      </div>
    </motion.div>
  );
}
