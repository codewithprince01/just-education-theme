import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getInstitutionBySlug, getAllInstitutionSlugs } from '@/data/institutions';
import InstitutionDetailClient from '@/components/institution-detail/InstitutionDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllInstitutionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const institution = getInstitutionBySlug(slug);
  if (!institution) return { title: 'Not Found' };
  return {
    title: `${institution.name} — ${institution.metrics.location} | Just Education`,
    description: institution.description,
  };
}

export default async function InstitutionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const institution = getInstitutionBySlug(slug);
  if (!institution) notFound();
  return <InstitutionDetailClient institution={institution} />;
}
