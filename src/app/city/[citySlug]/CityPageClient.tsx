"use client";

import { cityMeta } from '@/data/cityData';
import CityHero from '@/components/city/CityHero';
import PopularAreas from '@/components/city/PopularAreas';
import CityMap from '@/components/city/CityMap';
import InstitutionsBrowserClient from '@/components/shared/InstitutionsBrowserClient';

interface CityPageClientProps {
  citySlug: string;
  initialType?: string;
}

export default function CityPageClient({ citySlug, initialType }: CityPageClientProps) {
  const city = cityMeta[citySlug] || cityMeta.pune;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-16" id="city-page">
      <CityHero city={city} cityName={city.name} />

      {/* Unified browser — city pre-selected, all types available */}
      <InstitutionsBrowserClient initialCity={citySlug} initialType={initialType} />

      <PopularAreas cityName={city.name} citySlug={citySlug} />
      <CityMap city={city} cityName={city.name} />
    </div>
  );
}
