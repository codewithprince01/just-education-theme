import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MapPin, Star, CalendarDays } from 'lucide-react';
import type { InstitutionType } from '@/data/blog/types';
import { getInstitution, getByInstitutionSlug, buildFacets, cardsFrom } from '@/lib/blog/queries';
import { parseFilterParams } from '@/lib/blog/listing-types';
import { composeListingSeo, type ListingScope } from '@/lib/blog/listing-seo';
import BlogArchive from './BlogArchive';

interface Config {
    slug: string;
    allowed: InstitutionType[];
    eyebrow: string;
    /** the URL segment for this archive, e.g. "university" */
    segment: string;
    /** awaited Next.js searchParams */
    sp: Record<string, string | string[] | undefined>;
}

function resolve(slug: string, allowed: InstitutionType[]) {
    const inst = getInstitution(slug);
    if (!inst || !allowed.includes(inst.type)) return null;
    return inst;
}

function scopeFor(slug: string, allowed: InstitutionType[], eyebrow: string, segment: string): ListingScope | null {
    const inst = resolve(slug, allowed);
    if (!inst) return null;
    const where = [inst.city, inst.state, inst.country].filter(Boolean).join(', ');
    return {
        kind: 'institution',
        name: inst.name,
        slug: inst.slug,
        basePath: `/blog/${segment}/${inst.slug}`,
        baseDescription: inst.description ?? `${eyebrow} insights, news and guides about ${inst.name}${where ? ` in ${where}` : ''} on Just Education.`,
    };
}

/** Shared generateMetadata for all institution archive routes. */
export function institutionMetadata({ slug, allowed, eyebrow, segment, sp }: Config): Metadata {
    const scope = scopeFor(slug, allowed, eyebrow, segment);
    if (!scope) return { title: 'Not found' };
    const { filters, page } = parseFilterParams(sp);
    return composeListingSeo(scope, filters, page).metadata;
}

// Shared archive page body for university/college/coaching/school/institute.
export default function InstitutionArchive({ slug, allowed, eyebrow, segment, sp }: Config) {
    const inst = resolve(slug, allowed);
    if (!inst) notFound();
    const scope = scopeFor(slug, allowed, eyebrow, segment)!;

    const { filters, page } = parseFilterParams(sp);
    const seo = composeListingSeo(scope, filters, page);
    const resolved = getByInstitutionSlug(slug);
    const where = [inst.city, inst.state, inst.country].filter(Boolean).join(', ');

    return (
        <BlogArchive
            eyebrow={eyebrow}
            title={seo.h1}
            description={inst.description}
            breadcrumbs={seo.breadcrumbs}
            articles={cardsFrom(resolved)}
            facets={buildFacets(resolved)}
            basePath={scope.basePath}
            initial={filters}
            page={page}
            headerExtra={
                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-blue-100">
                    {where && (
                        <span className="inline-flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" /> {where}
                        </span>
                    )}
                    {inst.established && (
                        <span className="inline-flex items-center gap-1.5">
                            <CalendarDays className="w-4 h-4" /> Est. {inst.established}
                        </span>
                    )}
                    {inst.rating && (
                        <span className="inline-flex items-center gap-1.5">
                            <Star className="w-4 h-4 fill-amber-300 text-amber-300" /> {inst.rating} rating
                        </span>
                    )}
                </div>
            }
        />
    );
}
