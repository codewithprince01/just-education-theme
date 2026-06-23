import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { instituteRegistry } from '@/data/coachingData';
import CoachingDetailClient from '@/components/coaching-detail/CoachingDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(instituteRegistry).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = instituteRegistry[slug];
  if (!data) return { title: 'Not Found' };
  return {
    title: `${data.institute.name} — ${data.institute.location} | Just Education`,
    description: data.institute.description,
  };
}

export default async function CoachingDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = instituteRegistry[slug];
  if (!data) notFound();
  return <CoachingDetailClient data={data} />;
}
