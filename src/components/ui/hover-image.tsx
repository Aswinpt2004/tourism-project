"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HoverImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  aspect?: "square" | "video" | "portrait" | "wide" | "auto";
  overlay?: "dark" | "light" | "none";
}

const aspectMap = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/10]",
  auto: "",
};

/** Editorial image block with zoom + caption reveal on hover */
export function HoverImage({
  src,
  alt,
  caption,
  className,
  imageClassName,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 33vw",
  aspect = "wide",
  overlay = "dark",
}: HoverImageProps) {
  return (
    <motion.figure
      className={cn(
        "group relative overflow-hidden bg-stone-200",
        aspect !== "auto" && aspectMap[aspect],
        className
      )}
      whileHover="hover"
      initial="rest"
    >
      <motion.div
        className="absolute inset-0"
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.07 },
        }}
        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn("object-cover", imageClassName)}
        />
      </motion.div>

      {overlay !== "none" && (
        <motion.div
          className={cn(
            "absolute inset-0 pointer-events-none",
            overlay === "dark"
              ? "bg-gradient-to-t from-stone-950/75 via-stone-950/20 to-transparent"
              : "bg-gradient-to-t from-white/80 via-white/20 to-transparent"
          )}
          variants={{
            rest: { opacity: 0.55 },
            hover: { opacity: 0.92 },
          }}
          transition={{ duration: 0.4 }}
        />
      )}

      {caption && (
        <figcaption className="absolute inset-x-0 bottom-0 p-4 md:p-5">
          <motion.p
            className="text-sm font-medium text-white md:text-base"
            variants={{
              rest: { y: 8, opacity: 0.7 },
              hover: { y: 0, opacity: 1 },
            }}
            transition={{ duration: 0.35 }}
          >
            {caption}
          </motion.p>
          <motion.div
            className="mt-2 h-0.5 w-0 bg-[var(--kerala-gold)]"
            variants={{
              rest: { width: 0 },
              hover: { width: 48 },
            }}
            transition={{ duration: 0.4, delay: 0.05 }}
          />
        </figcaption>
      )}

      {/* Subtle border highlight on hover */}
      <motion.div
        className="absolute inset-0 ring-1 ring-inset ring-white/0 pointer-events-none"
        variants={{
          rest: { boxShadow: "inset 0 0 0 0 rgba(255,255,255,0)" },
          hover: { boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.25)" },
        }}
      />
    </motion.figure>
  );
}
