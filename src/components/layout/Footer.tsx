import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--kerala-border)] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--kerala-deep)]">
                <span className="text-sm font-bold text-white">UK</span>
              </div>
              <span className="text-base font-semibold text-stone-900">Unexplored Kerala</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-stone-600 leading-relaxed">
              A guide-first marketplace for authentic Kerala travel. Book local experts,
              plan with AI, or let guides compete for your custom trip.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-stone-900">Explore</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-stone-600">
              <li><Link href="/destinations/trivandrum" className="hover:text-[var(--kerala-green)]">Destinations</Link></li>
              <li><Link href="/plan-trip" className="hover:text-[var(--kerala-green)]">AI Trip Planner</Link></li>
              <li><Link href="/request-trip" className="hover:text-[var(--kerala-green)]">Custom Trip Request</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-stone-900">Guides</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-stone-600">
              <li><Link href="/become-guide" className="hover:text-[var(--kerala-green)]">Register</Link></li>
              <li><Link href="/dashboard/guide" className="hover:text-[var(--kerala-green)]">Dashboard</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--kerala-border)] pt-8 text-xs text-stone-500">
          © 2026 Unexplored Kerala. Empowering local communities.
        </div>
      </div>
    </footer>
  );
}
