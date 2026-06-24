import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getInstitutionBySlug, getAllInstitutionSlugs } from '@/data/institutions';
import { getTutorBySlug, getAllTutorSlugs } from '@/data/tutors';
import InstitutionDetailClient from '@/components/institution-detail/InstitutionDetailClient';
import TutorDetailClient from '@/components/tutor-detail/TutorDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const institutionSlugs = getAllInstitutionSlugs().map((slug) => ({ slug }));
  const tutorSlugs = getAllTutorSlugs().map((slug) => ({ slug }));
  return [...institutionSlugs, ...tutorSlugs];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const tutor = getTutorBySlug(slug);
  if (tutor) {
    return {
      title: `${tutor.name} — ${tutor.typeLabel} in ${tutor.location} | Just Education`,
      description: tutor.tagline,
    };
  }

  const institution = getInstitutionBySlug(slug);
  if (!institution) return { title: 'Not Found' };
  return {
    title: `${institution.name} — ${institution.metrics.location} | Just Education`,
    description: institution.description,
  };
}

export default async function InstitutionDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Tutors use the dedicated tutor detail experience, served under the same
  // unified /institutions/[slug] route for full architectural compatibility.
  const tutor = getTutorBySlug(slug);
  if (tutor) return <TutorDetailClient tutor={tutor} />;

  const institution = getInstitutionBySlug(slug);
  if (!institution) notFound();
  return <InstitutionDetailClient institution={institution} />;
}
