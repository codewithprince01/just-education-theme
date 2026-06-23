import type { Metadata } from 'next';
import InstitutionsBrowserClient from '@/components/shared/InstitutionsBrowserClient';

interface PageProps {
  searchParams: Promise<{
    city?: string;
    type?: string;
    state?: string;
    affiliation?: string;
    feeRange?: string;
    minRating?: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Browse Institutions in India – Fees, Rankings & Reviews | JustEducation',
  description:
    'Browse top universities, colleges, schools, coaching centres and more across India. Filter by city, state, type, fees, affiliation and rating.',
};

export default async function BrowsePage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-16">
      <InstitutionsBrowserClient
        initialCity={params.city}
        initialType={params.type}
        initialState={params.state}
        initialAffiliation={params.affiliation}
        initialFeeRange={params.feeRange}
        initialMinRating={params.minRating}
      />
    </div>
  );
}
