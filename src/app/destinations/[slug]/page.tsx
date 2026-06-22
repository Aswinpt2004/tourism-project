import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, Sparkles } from "lucide-react";
import { getDestinationBySlug, getGuidesByDestination } from "@/lib/mock-data";
import { GuideCard } from "@/components/guides/GuideCard";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/animations/motion-primitives";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();

  const areaGuides = getGuidesByDestination(slug);

  return (
    <PageTransition>
      {/* Hero banner */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-slate-900/30" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="mx-auto max-w-7xl">
            <p className="text-emerald-400 text-sm font-medium flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              Kerala, India
            </p>
            <h1 className="mt-2 text-4xl font-bold text-white md:text-6xl">{destination.name}</h1>
            <p className="mt-3 max-w-xl text-slate-300">{destination.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5 text-sm text-slate-300">
                <Users className="h-4 w-4" />
                {areaGuides.length} guides available
              </span>
              {destination.highlights.map((h) => (
                <span key={h} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-sm">
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guides listing + custom trip CTA */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        {/* Dual option banner */}
        <div className="mb-10 flex flex-col gap-4 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Two ways to explore {destination.name}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Pick a guide&apos;s fixed package below — or post a custom trip and let guides bid.
            </p>
          </div>
          <Link href={`/request-trip?destination=${slug}`}>
            <Button variant="gold" className="gap-2 shrink-0">
              <Sparkles className="h-4 w-4" />
              Plan Custom Trip
            </Button>
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Available Guides in {destination.name}
        </h2>

        {areaGuides.length === 0 ? (
          <p className="text-slate-500">No guides listed yet for this destination.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {areaGuides.map((guide, i) => (
              <GuideCard key={guide.id} guide={guide} index={i} />
            ))}
          </div>
        )}
      </section>
    </PageTransition>
  );
}
