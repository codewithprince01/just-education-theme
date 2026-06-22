import { cityMeta } from '@/data/cityData';
// Interactive client view containing page state, sorting, and layouts
import CityPageClient from '@/app/city/[citySlug]/CityPageClient';
import { Metadata } from 'next';

interface PageProps {
    params: Promise<{
        citySlug: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { citySlug } = await params;
    const city = cityMeta[citySlug] || cityMeta.pune;
    return {
        title: `Top Institutions in ${city.name}, ${city.state} 2026 - Fees, Rankings & Reviews | JustEducation`,
        description: `Find ${city.totalColleges}+ best universities, colleges, schools, and libraries in ${city.name}. Compare fees, rankings, placements, reviews & more.`,
    };
}

export default async function CitySlugPage({ params }: PageProps) {
    const { citySlug } = await params;
    return <CityPageClient citySlug={citySlug} />;
}
