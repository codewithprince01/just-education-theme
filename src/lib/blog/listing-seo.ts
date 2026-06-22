import type { Metadata } from 'next';
import type { InitialFilters } from './listing-types';
import { serializeFilters, activeFilterDimensions } from './listing-types';
import { getLocation, getExam } from './queries';
import { absoluteUrl, SITE_NAME, DEFAULT_OG_IMAGE } from './config';
import type { Crumb } from './seo';

export interface ListingScope {
    kind: 'category' | 'tag' | 'location' | 'institution' | 'author' | 'all';
    /** Display name of the scope entity, e.g. "Universities", "Delhi". */
    name: string;
    slug?: string;
    /** Canonical base path, e.g. /blog/category/universities. */
    basePath: string;
    /** The scope's own description, used when no filters are applied. */
    baseDescription?: string;
}

export interface ComposedListingSeo {
    h1: string;
    breadcrumbs: Crumb[];
    metadata: Metadata;
    indexable: boolean;
}

// Education-category scopes that read naturally with a "Top" prefix.
const TOP_CATEGORIES = new Set(['universities', 'colleges', 'schools', 'coaching-centers', 'institutes', 'libraries']);

function mostSpecificLocationName(f: InitialFilters): string | undefined {
    const pick = (slugs?: string[]) => (slugs && slugs.length ? getLocation(slugs[0])?.name : undefined);
    return pick(f.cities) ?? pick(f.states) ?? pick(f.countries);
}

function singleExamName(f: InitialFilters): string | undefined {
    if (f.exams && f.exams.length === 1) return getExam(f.exams[0])?.name;
    return undefined;
}

/**
 * Build the dynamic H1, breadcrumbs and full metadata for a listing from its
 * scope + the active URL filters. This is what powers titles like
 * "Top Universities in Delhi" or "JEE Main Coaching Centers in Kota".
 */
export function composeListingSeo(
    scope: ListingScope,
    filters: InitialFilters,
    page = 1,
): ComposedListingSeo {
    const locName = scope.kind === 'location' ? undefined : mostSpecificLocationName(filters);
    const examName = singleExamName(filters);

    // --- H1 -----------------------------------------------------------------
    let core: string;
    if (scope.kind === 'location') {
        core = `Education in ${scope.name}`;
    } else if (examName && scope.kind === 'category') {
        core = `${examName} ${scope.name}`;
    } else if (scope.kind === 'category' && TOP_CATEGORIES.has(scope.slug ?? '')) {
        core = `Top ${scope.name}`;
    } else {
        core = scope.name;
    }
    const h1 = locName ? `${core} in ${locName}` : core;

    // --- Title & description ------------------------------------------------
    const metaTitle = `${h1} | ${SITE_NAME}`;
    const hasFilters = !!filters.q || activeFilterDimensions(filters) > 0;
    const description = hasFilters
        ? `Browse ${scope.name} articles${locName ? ` in ${locName}` : ''}${examName ? ` for ${examName}` : ''}${filters.q ? ` matching “${filters.q}”` : ''} — guides, news, rankings and expert insights on ${SITE_NAME}.`
        : scope.baseDescription ?? `Explore ${scope.name} articles, guides and news on ${SITE_NAME}.`;

    // --- Canonical & robots -------------------------------------------------
    const qs = serializeFilters(filters, page);
    const canonicalPath = qs ? `${scope.basePath}?${qs}` : scope.basePath;
    const canonical = absoluteUrl(canonicalPath);
    // Index the scope page + up to two filter facets; noindex deep/searchy
    // combinations to prevent thin / duplicate content.
    const indexable = !filters.q && activeFilterDimensions(filters) <= 2;

    // --- Breadcrumbs --------------------------------------------------------
    const breadcrumbs: Crumb[] = [
        { name: 'Home', url: '/' },
        { name: 'Insights', url: '/blog' },
    ];
    const scopeIsTerminal = !locName && !examName;
    breadcrumbs.push({ name: scope.name, url: scopeIsTerminal ? undefined : scope.basePath });
    if (locName) {
        const locTerminal = !examName;
        breadcrumbs.push({
            name: locName,
            url: locTerminal ? undefined : `${scope.basePath}?${serializeFilters({ ...filters, exams: [] })}`,
        });
    }
    if (examName) breadcrumbs.push({ name: examName });

    const metadata: Metadata = {
        title: metaTitle,
        description,
        alternates: { canonical },
        robots: indexable ? undefined : { index: false, follow: true },
        openGraph: {
            type: 'website',
            title: metaTitle,
            description,
            url: canonical,
            siteName: SITE_NAME,
            images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: h1 }],
        },
        twitter: { card: 'summary_large_image', title: metaTitle, description, images: [DEFAULT_OG_IMAGE] },
    };

    return { h1, breadcrumbs, metadata, indexable };
}
