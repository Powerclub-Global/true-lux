import { notFound } from "next/navigation";
import { yachts, getYachtBySlug } from "@/lib/data/yachts";
import { formatCurrency } from "@/lib/utils";
import { BRAND } from "@/lib/constants";
import YachtDetailClient from "./yacht-detail-client";

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return yachts.map((y) => ({ slug: y.slug }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const yacht = getYachtBySlug(slug);
  if (!yacht) return { title: "Yacht Not Found" };
  return {
    title: `${yacht.name} — ${BRAND.name}`,
    description: yacht.tagline,
  };
}

// ---------------------------------------------------------------------------
// Page (Server Component)
// ---------------------------------------------------------------------------
export default async function YachtDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const yacht = getYachtBySlug(slug);
  if (!yacht) notFound();

  return <YachtDetailClient yacht={yacht} />;
}
