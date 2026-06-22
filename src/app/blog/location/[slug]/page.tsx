import { notFound } from 'next/navigation';
import { locations } from '@/data/blog';
import { getLocation, getByLocationSlug, buildFacets, cardsFrom } from '@/lib/blog/queries';
import { routes } from '@/lib/blog/config';
import { parseFilterParams } from '@/lib/blog/listing-types';
import { composeListingSeo, type ListingScope } from '@/lib/blog/listing-seo';
import BlogArchive from '@/components/blog/BlogArchive';

export const dynamicParams = false;

const TYPE_LABEL: Record<string, string> = { city: 'City', state: 'State', country: 'Country' };

export function generateStaticParams() {
    return locations.map((l) => ({ slug: l.slug }));
}

type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function scopeFor(slug: string): ListingScope | null {
    const location = getLocation(slug);
    if (!location) return null;
    return {
        kind: 'location',
        name: location.name,
        slug: location.slug,
        basePath: routes.location(location.slug),
        baseDescription: `Universities, colleges, exams and education insights for ${location.name}.`,
    };
}

export async function generateMetadata({ params, searchParams }: Props) {
    const { slug } = await params;
    const scope = scopeFor(slug);
    if (!scope) return { title: 'Location not found' };
    const { filters, page } = parseFilterParams(await searchParams);
    return composeListingSeo(scope, filters, page).metadata;
}

export default async function LocationPage({ params, searchParams }: Props) {
    const { slug } = await params;
    const scope = scopeFor(slug);
    if (!scope) notFound();
    const location = getLocation(slug)!;

    const { filters, page } = parseFilterParams(await searchParams);
    const seo = composeListingSeo(scope, filters, page);
    const resolved = getByLocationSlug(slug);
    const where = [location.state, location.country].filter(Boolean).join(', ');

    return (
        <BlogArchive
            eyebrow={`${TYPE_LABEL[location.type] ?? 'Location'}${where ? ` · ${where}` : ''}`}
            title={seo.h1}
            description={scope.baseDescription}
            breadcrumbs={seo.breadcrumbs}
            articles={cardsFrom(resolved)}
            facets={buildFacets(resolved)}
            basePath={scope.basePath}
            initial={filters}
            page={page}
        />
    );
}
