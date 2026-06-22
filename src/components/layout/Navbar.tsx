"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/destinations/trivandrum", label: "Destinations" },
  { href: "/plan-trip", label: "AI Planner" },
  { href: "/request-trip", label: "Custom Trip" },
  { href: "/become-guide", label: "For Guides" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || !isHome
          ? "bg-white/95 backdrop-blur-md border-b border-[var(--kerala-border)] shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--kerala-deep)]">
            <span className="text-sm font-bold text-white">UK</span>
          </div>
          <div>
            <span
              className={cn(
                "text-base font-semibold tracking-tight",
                scrolled || !isHome ? "text-stone-900" : "text-white"
              )}
            >
              Unexplored Kerala
            </span>
            <p
              className={cn(
                "hidden text-[11px] sm:block",
                scrolled || !isHome ? "text-stone-500" : "text-white/70"
              )}
            >
              Local guides · Authentic travel
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors relative py-1",
                  active
                    ? scrolled || !isHome
                      ? "text-[var(--kerala-green)] font-medium"
                      : "text-white font-medium"
                    : scrolled || !isHome
                      ? "text-stone-600 hover:text-stone-900"
                      : "text-white/80 hover:text-white"
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--kerala-gold)] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/dashboard/customer">
            <Button
              variant={scrolled || !isHome ? "ghost" : "secondary"}
              size="sm"
              className={!scrolled && isHome ? "border-white/30 text-white hover:bg-white/10" : ""}
            >
              My Trips
            </Button>
          </Link>
          <Link href="/plan-trip">
            <Button size="sm">Plan with AI</Button>
          </Link>
        </div>

        <button
          className={cn(
            "rounded-lg p-2 md:hidden",
            scrolled || !isHome ? "text-stone-900" : "text-white"
          )}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-[var(--kerala-border)] bg-white px-4 py-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-stone-800 border-b border-[var(--kerala-border)] last:border-0"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/plan-trip" onClick={() => setMobileOpen(false)}>
            <Button className="mt-4 w-full">Plan with AI</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
