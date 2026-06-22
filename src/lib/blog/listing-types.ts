// Pure types & constants shared by server queries AND client components.
// IMPORTANT: this module imports NO data, so client components can use it
// without pulling the entire dummy dataset into the browser bundle.

export type SortKey =
    | 'all' // default curated order: featured -> trending -> newest
    | 'latest'
    | 'popular' // most viewed
    | 'most-popular' // most liked
    | 'shared' // most shared
    | 'trending'
    | 'rating'
    | 'recently-updated'
    | 'oldest'
    | 'title-asc';

// Sort options surfaced in the global filter UI ("All" is the default).
export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'latest', label: 'Latest' },
    { value: 'popular', label: 'Most Viewed' },
    { value: 'most-popular', label: 'Most Popular' },
    { value: 'shared', label: 'Most Shared' },
    { value: 'trending', label: 'Trending' },
];

export const CONTENT_TYPES: { slug: string; name: string }[] = [
    { slug: 'article', name: 'Articles' },
    { slug: 'news', name: 'News' },
    { slug: 'guide', name: 'Guides' },
    { slug: 'ranking', name: 'Rankings' },
    { slug: 'review', name: 'Reviews' },
];

export const INSTITUTION_TYPES: { slug: string; name: string }[] = [
    { slug: 'university', name: 'University' },
    { slug: 'college', name: 'College' },
    { slug: 'school', name: 'School' },
    { slug: 'coaching', name: 'Coaching' },
    { slug: 'institute', name: 'Institute' },
    { slug: 'library', name: 'Library' },
    { slug: 'consultant', name: 'Study Abroad Consultant' },
];

export const READING_TIMES: { slug: string; name: string }[] = [
    { slug: 'under5', name: 'Under 5 minutes' },
    { slug: '5to10', name: '5–10 minutes' },
    { slug: 'over10', name: '10+ minutes' },
];

export interface Facet {
    slug: string;
    name: string;
    count: number;
}

export interface ListingFacets {
    contentTypes: Facet[];
    categories: Facet[];
    countries: Facet[];
    states: Facet[];
    cities: Facet[];
    institutionTypes: Facet[];
    exams: Facet[];
    readingTime: Facet[];
}

/** Initial filter selections, used to deep-link/seed the listing from a URL. */
export interface InitialFilters {
    q?: string;
    contentTypes?: string[];
    categories?: string[];
    countries?: string[];
    states?: string[];
    cities?: string[];
    institutionTypes?: string[];
    exams?: string[];
    readingTime?: string[];
    sort?: SortKey;
}

const asArray = (v: string | string[] | undefined): string[] =>
    v === undefined ? [] : (Array.isArray(v) ? v : v.split(',')).map((s) => s.trim()).filter(Boolean);

/** Parse Next.js searchParams into initial filters + page + whether any were present. */
export function parseFilterParams(
    sp: Record<string, string | string[] | undefined>,
): { filters: InitialFilters; page: number; hasAny: boolean } {
    const q = typeof sp.q === 'string' ? sp.q.trim() : '';
    const filters: InitialFilters = {
        q: q || undefined,
        contentTypes: asArray(sp.contentType),
        categories: asArray(sp.category),
        countries: asArray(sp.country),
        states: asArray(sp.state),
        cities: asArray(sp.city),
        institutionTypes: asArray(sp.institutionType),
        exams: asArray(sp.exam),
        readingTime: asArray(sp.readingTime),
        sort: typeof sp.sort === 'string' ? (sp.sort as SortKey) : undefined,
    };
    const pageRaw = typeof sp.page === 'string' ? parseInt(sp.page, 10) : 1;
    const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;
    const hasAny =
        !!q ||
        !!filters.sort ||
        [
            filters.contentTypes, filters.categories, filters.countries, filters.states,
            filters.cities, filters.institutionTypes, filters.exams, filters.readingTime,
        ].some((a) => a && a.length > 0);
    return { filters, page, hasAny };
}

/**
 * Serialize filters into a STABLE, canonical query string (keys & values
 * sorted) so the same filter selection always produces the same URL — this is
 * what makes the URLs shareable, bookmarkable and duplicate-content-safe.
 */
export function serializeFilters(f: InitialFilters, page?: number): string {
    const params = new URLSearchParams();
    const add = (key: string, vals?: string[]) => {
        if (vals && vals.length) params.set(key, [...new Set(vals)].sort().join(','));
    };
    if (f.q) params.set('q', f.q);
    add('contentType', f.contentTypes);
    add('category', f.categories);
    add('country', f.countries);
    add('state', f.states);
    add('city', f.cities);
    add('institutionType', f.institutionTypes);
    add('exam', f.exams);
    add('readingTime', f.readingTime);
    if (f.sort && f.sort !== 'all') params.set('sort', f.sort);
    if (page && page > 1) params.set('page', String(page));
    params.sort();
    return params.toString();
}

/** Number of active filter dimensions (used for index/noindex decisions). */
export function activeFilterDimensions(f: InitialFilters): number {
    return [
        f.contentTypes, f.categories, f.countries, f.states, f.cities,
        f.institutionTypes, f.exams, f.readingTime,
    ].filter((a) => a && a.length > 0).length;
}

export interface FilterParams {
    q?: string;
    title?: string;
    categories?: string[];
    subCategories?: string[];
    tags?: string[];
    authors?: string[];
    institutions?: string[];
    locations?: string[];
    courses?: string[];
    exams?: string[];
    scholarships?: string[];
    degree?: string;
    examType?: string;
    scholarshipType?: string;
    minRating?: number;
    featured?: boolean;
    dateFrom?: string;
    dateTo?: string;
}

export interface Suggestion {
    type: 'article' | 'category' | 'tag' | 'institution';
    label: string;
    href: string;
}

export interface Paged<T> {
    items: T[];
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasPrev: boolean;
    hasNext: boolean;
}

/** Reading-time bucket test shared by facet building and client filtering. */
export function inReadingBucket(minutes: number, bucket: string): boolean {
    if (bucket === 'under5') return minutes < 5;
    if (bucket === '5to10') return minutes >= 5 && minutes <= 10;
    if (bucket === 'over10') return minutes > 10;
    return true;
}
