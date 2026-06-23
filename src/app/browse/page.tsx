import type { Metadata } from 'next';
import InstitutionsBrowserClient from '@/components/shared/InstitutionsBrowserClient';

interface PageProps {
  searchParams: Promise<{
    city?: string;
    type?: string;
    q?: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Browse Institutions in India – Fees, Rankings & Reviews | JustEducation',
  description:
    'Browse top universities, colleges, schools, coaching centres and more across India. Filter by city, type and course.',
};

export default async function BrowsePage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-16">
      <InstitutionsBrowserClient
        key={`${params.city ?? ''}|${params.type ?? ''}|${params.q ?? ''}`}
        initialCity={params.city}
        initialType={params.type}
        initialSearch={params.q}
      />
    </div>
  );
}
