"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Users,
  IndianRupee,
  Clock,
  CheckCircle,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/card";
import { formatINR } from "@/lib/utils";
import type { TripRequest } from "@/lib/types";
import { useState } from "react";

interface TripRequestCardProps {
  request: TripRequest;
  /** Guide view: show accept/bid actions */
  guideView?: boolean;
  onAccept?: (requestId: string) => void;
  onBid?: (requestId: string, price: number, message: string) => void;
}

/** Card shown to guides when a customer posts a custom trip request */
export function TripRequestCard({
  request,
  guideView = false,
  onAccept,
  onBid,
}: TripRequestCardProps) {
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidPrice, setBidPrice] = useState(request.budget);
  const [bidMessage, setBidMessage] = useState("");

  const timeAgo = new Date(request.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.01 }}
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg"
    >
      {/* Live pulse indicator for open requests */}
      {request.status === "open" && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 animate-pulse" />
      )}

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant={request.status === "open" ? "live" : "default"}>
                {request.status === "open" ? "● Live Request" : request.status}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="h-3 w-3" />
                {timeAgo}
              </span>
            </div>
            <h3 className="mt-2 text-lg font-bold text-slate-900">
              {request.customerName}&apos;s Trip
            </h3>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Budget</p>
            <p className="text-xl font-bold text-emerald-700">{formatINR(request.budget)}</p>
          </div>
        </div>

        {/* Trip meta */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin className="h-4 w-4 text-emerald-600" />
            {request.destination}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Calendar className="h-4 w-4 text-emerald-600" />
            {request.duration} days
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Users className="h-4 w-4 text-emerald-600" />
            {request.groupSize} people
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <IndianRupee className="h-4 w-4 text-emerald-600" />
            {request.travelStyle}
          </div>
        </div>

        {/* Interests tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {request.interests.map((interest) => (
            <Badge key={interest} variant="outline" className="text-[10px]">
              {interest}
            </Badge>
          ))}
        </div>

        {request.description && (
          <p className="mt-3 text-sm text-slate-600 bg-slate-50 rounded-xl p-3">
            &ldquo;{request.description}&rdquo;
          </p>
        )}

        {/* Existing bids (customer view) */}
        {request.bids.length > 0 && (
          <div className="mt-4 border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {request.bids.length} offer{request.bids.length > 1 ? "s" : ""} received
            </p>
            <div className="mt-3 space-y-3">
              {request.bids.map((bid) => (
                <motion.div
                  key={bid.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 rounded-xl border border-slate-200 p-3"
                >
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={bid.guideAvatar}
                      alt={bid.guideName}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-slate-900">{bid.guideName}</p>
                      <p className="font-bold text-emerald-700">{formatINR(bid.price)}</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{bid.message}</p>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {bid.includes.map((item) => (
                        <span key={item} className="text-[10px] bg-emerald-50 text-emerald-700 rounded px-1.5 py-0.5">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  {!guideView && (
                    <Button size="sm" variant="outline" className="shrink-0 self-center">
                      Accept
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Guide actions */}
        {guideView && request.status === "open" && (
          <div className="mt-4 border-t border-slate-100 pt-4">
            {!showBidForm ? (
              <div className="flex gap-3">
                <Button
                  className="flex-1 gap-2"
                  onClick={() => onAccept?.(request.id)}
                >
                  <CheckCircle className="h-4 w-4" />
                  Accept {formatINR(request.budget)}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => setShowBidForm(true)}
                >
                  <MessageSquare className="h-4 w-4" />
                  Counter Offer
                </Button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-3"
              >
                <div>
                  <label className="text-sm font-medium">Your price</label>
                  <Input
                    type="number"
                    value={bidPrice}
                    onChange={(e) => setBidPrice(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Message to customer</label>
                  <Textarea
                    value={bidMessage}
                    onChange={(e) => setBidMessage(e.target.value)}
                    placeholder="What's included in your offer..."
                    className="mt-1"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="gold"
                    className="flex-1"
                    onClick={() => {
                      onBid?.(request.id, bidPrice, bidMessage);
                      setShowBidForm(false);
                    }}
                  >
                    Send Offer
                  </Button>
                  <Button variant="ghost" onClick={() => setShowBidForm(false)}>
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
