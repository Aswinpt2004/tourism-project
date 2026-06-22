import { notFound } from "next/navigation";
import { getGuideById, reviews } from "@/lib/mock-data";
import { GuideProfileView } from "@/components/guides/GuideProfileView";
import { PageTransition } from "@/components/animations/motion-primitives";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function GuideProfilePage({ params }: Props) {
  const { id } = await params;
  const guide = getGuideById(id);
  if (!guide) notFound();

  return (
    <PageTransition>
      <GuideProfileView guide={guide} reviews={reviews} />
    </PageTransition>
  );
}
