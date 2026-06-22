import {
    articles as allArticles,
    authors,
    categories,
    subCategories,
    tags,
    institutions,
    locations,
    courses,
    exams,
    scholarships,
} from '@/data/blog';
import type {
    Article,
    CardArticle,
    ContentType,
    Institution,
    Location,
    ResolvedArticle,
    Tag,
} from '@/data/blog/types';
import type {
    Facet, FilterParams, InitialFilters, ListingFacets, Paged, SortKey, Suggestion,
} from './listing-types';
import {
    inReadingBucket, SORT_OPTIONS, CONTENT_TYPES, INSTITUTION_TYPES, READING_TIMES, parseFilterParams,
} from './listing-types';

// Re-export shared listing types/constants so existing server imports keep working.
export type { Facet, FilterParams, InitialFilters, ListingFacets, Paged, SortKey, Suggestion };
export { SORT_OPTIONS, CONTENT_TYPES, INSTITUTION_TYPES, READING_TIMES, parseFilterParams };

// ----------------------------------------------------------------------------
// Indexed lookups (built once at module load)
// ----------------------------------------------------------------------------
const authorMap = new Map(authors.map((a) => [a.slug, a]));
const categoryMap = new Map(categories.map((c) => [c.slug, c]));
const subCategoryMap = new Map(subCategories.map((s) => [s.slug, s]));
const tagMap = new Map(tags.map((t) => [t.slug, t]));
const institutionMap = new Map(institutions.map((i) => [i.slug, i]));
const locationMap = new Map(locations.map((l) => [l.slug, l]));
const courseMap = new Map(courses.map((c) => [c.slug, c]));
const examMap = new Map(exams.map((e) => [e.slug, e]));
const scholarshipMap = new Map(scholarships.map((s) => [s.slug, s]));

export const getAuthor = (slug: string) => authorMap.get(slug);
export const getCategory = (slug: string) => categoryMap.get(slug);
export const getSubCategory = (slug: string) => subCategoryMap.get(slug);
export const getTag = (slug: string) => tagMap.get(slug);
export const getInstitution = (slug: string) => institutionMap.get(slug);
export const getLocation = (slug: string) => locationMap.get(slug);
export const getExam = (slug: string) => examMap.get(slug);

// ----------------------------------------------------------------------------
// Resolution: turn slug references into full objects for rendering
// ----------------------------------------------------------------------------
export function resolveArticle(article: Article): ResolvedArticle {
    const author = authorMap.get(article.authorSlug);
    const category = categoryMap.get(article.categorySlug);
    if (!author || !category) {
        throw new Error(`Article "${article.slug}" references missing author/category`);
    }
    return {
        ...article,
        author,
        category,
        subCategory: article.subCategorySlug ? subCategoryMap.get(article.subCategorySlug) : undefined,
        resolvedTags: article.tags.map((t) => tagMap.get(t)).filter(Boolean) as Tag[],
        institutions: (article.institutionSlugs ?? []).map((s) => institutionMap.get(s)).filter(Boolean) as Institution[],
        locations: (article.locationSlugs ?? []).map((s) => locationMap.get(s)).filter(Boolean) as Location[],
        courses: (article.courseSlugs ?? []).map((s) => courseMap.get(s)).filter(Boolean) as NonNullable<ReturnType<typeof courseMap.get>>[],
        exams: (article.examSlugs ?? []).map((s) => examMap.get(s)).filter(Boolean) as NonNullable<ReturnType<typeof examMap.get>>[],
        scholarships: (article.scholarshipSlugs ?? []).map((s) => scholarshipMap.get(s)).filter(Boolean) as NonNullable<ReturnType<typeof scholarshipMap.get>>[],
    };
}

/** Editorial format used by the Content Type filter — explicit value wins,
 *  otherwise derived from the category and title. */
export function deriveContentType(a: Article): ContentType {
    if (a.contentType) return a.contentType;
    if (a.categorySlug === 'education-news') return 'news';
    const t = a.title.toLowerCase();
    if (/\bvs\b|comparison|top \d+|\d+ (best|highest|careers|scholarships|courses|certifications)|ranking/.test(t)) return 'ranking';
    if (/review|worth it|honest assessment/.test(t)) return 'review';
    if (/guide|how to|complete|roadmap|explained|step-by-step|everything|studying in|prep plan/.test(t)) return 'guide';
    return 'article';
}

/** Project a resolved article down to the compact, serializable card shape. */
export function toCard(a: ResolvedArticle): CardArticle {
    return {
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        coverImage: a.coverImage,
        category: { slug: a.category.slug, name: a.category.name, accent: a.category.accent },
        author: { slug: a.author.slug, name: a.author.name, avatar: a.author.avatar },
        resolvedTags: a.resolvedTags.map((t) => ({ slug: t.slug, name: t.name })),
        tags: a.tags,
        subCategorySlug: a.subCategorySlug,
        institutionSlugs: a.institutionSlugs,
        institutionTypes: [...new Set(a.institutions.map((i) => i.type))],
        locationSlugs: a.locationSlugs,
        primaryLocation: a.locations[0]?.name,
        examSlugs: a.examSlugs ?? [],
        contentType: deriveContentType(a),
        publishedAt: a.publishedAt,
        updatedAt: a.updatedAt,
        readingMinutes: a.readingMinutes,
        views: a.views,
        likes: a.likes,
        shares: Math.round(a.views * 0.035 + a.likes * 0.6),
        rating: a.rating,
        ratingCount: a.ratingCount,
        trending: a.trending,
        featured: a.featured,
        editorsPick: a.editorsPick,
    };
}

export const cardsFrom = (list: ResolvedArticle[]): CardArticle[] => list.map(toCard);

const byNewest = (a: Article, b: Article) =>
    Date.parse(b.publishedAt) - Date.parse(a.publishedAt);

/** All published articles, newest first. */
export function getAllArticles(): Article[] {
    return [...allArticles].sort(byNewest);
}

export function getAllResolved(): ResolvedArticle[] {
    return getAllArticles().map(resolveArticle);
}

export function getArticleBySlug(slug: string): ResolvedArticle | undefined {
    const found = allArticles.find((a) => a.slug === slug);
    return found ? resolveArticle(found) : undefined;
}

// ----------------------------------------------------------------------------
// Homepage section selectors
// ----------------------------------------------------------------------------
export const getFeatured = (limit = 5) =>
    getAllResolved().filter((a) => a.featured).slice(0, limit);

export const getTrending = (limit = 6) =>
    [...getAllResolved()].filter((a) => a.trending).sort((a, b) => b.views - a.views).slice(0, limit);

export const getEditorsPicks = (limit = 4) =>
    getAllResolved().filter((a) => a.editorsPick).slice(0, limit);

export const getMostViewed = (limit = 6) =>
    [...getAllResolved()].sort((a, b) => b.views - a.views).slice(0, limit);

export const getLatest = (limit = 6) => getAllResolved().slice(0, limit);

export const getRecentlyUpdated = (limit = 5) =>
    getAllResolved()
        .filter((a) => a.updatedAt)
        .sort((a, b) => Date.parse(b.updatedAt!) - Date.parse(a.updatedAt!))
        .slice(0, limit);

export const getRecommended = (limit = 4) =>
    [...getAllResolved()].sort((a, b) => b.rating - a.rating || b.likes - a.likes).slice(0, limit);

/** Articles within a category (by category slug). */
export const getByCategorySlug = (slug: string, limit?: number) => {
    const list = getAllResolved().filter((a) => a.categorySlug === slug);
    return limit ? list.slice(0, limit) : list;
};

/** Institutions related to an article: those it links, supplemented by more of
 *  the same types so the discovery blocks are always populated. */
export function getRelatedInstitutions(article: ResolvedArticle, limit = 5): Institution[] {
    const linked = article.institutions;
    const linkedSlugs = new Set(linked.map((i) => i.slug));
    const types = new Set(linked.map((i) => i.type));
    const supplement = institutions.filter(
        (i) => !linkedSlugs.has(i.slug) && (types.size === 0 || types.has(i.type)),
    );
    return [...linked, ...supplement].slice(0, limit);
}

/** Related articles: same category first, then shared tags, excluding self. */
export function getRelatedArticles(article: ResolvedArticle, limit = 4): ResolvedArticle[] {
    const pool = getAllResolved().filter((a) => a.slug !== article.slug);
    const scored = pool
        .map((a) => {
            let score = 0;
            if (a.categorySlug === article.categorySlug) score += 5;
            score += a.tags.filter((t) => article.tags.includes(t)).length * 2;
            if (a.authorSlug === article.authorSlug) score += 1;
            const sharedInst = (a.institutionSlugs ?? []).filter((s) =>
                (article.institutionSlugs ?? []).includes(s),
            ).length;
            score += sharedInst * 2;
            return { a, score };
        })
        .filter((x) => x.score > 0)
        .sort((x, y) => y.score - x.score || y.a.views - x.a.views);
    const related = scored.slice(0, limit).map((x) => x.a);
    // Backfill with newest if not enough strong matches.
    if (related.length < limit) {
        for (const a of pool) {
            if (related.length >= limit) break;
            if (!related.includes(a)) related.push(a);
        }
    }
    return related;
}

// ----------------------------------------------------------------------------
// Archive selectors (taxonomy pages)
// ----------------------------------------------------------------------------
export const getByTagSlug = (slug: string) =>
    getAllResolved().filter((a) => a.tags.includes(slug));

export const getByAuthorSlug = (slug: string) =>
    getAllResolved().filter((a) => a.authorSlug === slug);

export const getByInstitutionSlug = (slug: string) =>
    getAllResolved().filter((a) => (a.institutionSlugs ?? []).includes(slug));

export const getByLocationSlug = (slug: string) =>
    getAllResolved().filter((a) => (a.locationSlugs ?? []).includes(slug));

export const getBySubCategorySlug = (slug: string) =>
    getAllResolved().filter((a) => a.subCategorySlug === slug);

/** Count of published articles per category slug. */
export function getCategoryCounts(): Record<string, number> {
    const counts: Record<string, number> = {};
    for (const a of allArticles) counts[a.categorySlug] = (counts[a.categorySlug] ?? 0) + 1;
    return counts;
}

// ----------------------------------------------------------------------------
// Sorting
// ----------------------------------------------------------------------------
export function sortArticles<T extends ResolvedArticle>(list: T[], sort: SortKey): T[] {
    const arr = [...list];
    switch (sort) {
        case 'all':
            return arr.sort(
                (a, b) =>
                    Number(!!b.featured) - Number(!!a.featured) ||
                    Number(!!b.trending) - Number(!!a.trending) ||
                    Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
            );
        case 'oldest':
            return arr.sort((a, b) => Date.parse(a.publishedAt) - Date.parse(b.publishedAt));
        case 'popular':
            return arr.sort((a, b) => b.views - a.views);
        case 'most-popular':
            return arr.sort((a, b) => b.likes - a.likes);
        case 'shared':
            return arr.sort((a, b) => Math.round(b.views * 0.035 + b.likes * 0.6) - Math.round(a.views * 0.035 + a.likes * 0.6));
        case 'trending':
            return arr.sort((a, b) => Number(b.trending) - Number(a.trending) || b.views - a.views);
        case 'rating':
            return arr.sort((a, b) => b.rating - a.rating || (b.ratingCount ?? 0) - (a.ratingCount ?? 0));
        case 'title-asc':
            return arr.sort((a, b) => a.title.localeCompare(b.title));
        case 'recently-updated':
            return arr.sort(
                (a, b) =>
                    Date.parse(b.updatedAt ?? b.publishedAt) - Date.parse(a.updatedAt ?? a.publishedAt),
            );
        case 'latest':
        default:
            return arr.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
    }
}

// ----------------------------------------------------------------------------
// Filtering & search
// ----------------------------------------------------------------------------
/** Build the searchable text blob for an article (keyword search). */
function searchableText(a: ResolvedArticle): string {
    const parts = [
        a.title,
        a.subtitle ?? '',
        a.excerpt,
        a.category.name,
        a.subCategory?.name ?? '',
        a.author.name,
        ...a.resolvedTags.map((t) => t.name),
        ...a.institutions.map((i) => i.name),
        ...a.locations.map((l) => l.name),
        ...a.courses.map((c) => `${c.name} ${c.degree ?? ''}`),
        ...a.exams.map((e) => e.name),
        ...a.scholarships.map((s) => s.name),
        ...a.content.map((b) => ('text' in b ? b.text : '')),
    ];
    return parts.join(' ').toLowerCase();
}

export function filterArticles(list: ResolvedArticle[], params: FilterParams): ResolvedArticle[] {
    const q = params.q?.trim().toLowerCase();
    const title = params.title?.trim().toLowerCase();

    return list.filter((a) => {
        if (q && !searchableText(a).includes(q)) return false;
        if (title && !a.title.toLowerCase().includes(title)) return false;
        if (params.categories?.length && !params.categories.includes(a.categorySlug)) return false;
        if (params.subCategories?.length && (!a.subCategorySlug || !params.subCategories.includes(a.subCategorySlug)))
            return false;
        if (params.tags?.length && !params.tags.some((t) => a.tags.includes(t))) return false;
        if (params.authors?.length && !params.authors.includes(a.authorSlug)) return false;
        if (params.institutions?.length && !params.institutions.some((s) => (a.institutionSlugs ?? []).includes(s)))
            return false;
        if (params.locations?.length && !params.locations.some((s) => (a.locationSlugs ?? []).includes(s)))
            return false;
        if (params.courses?.length && !params.courses.some((s) => (a.courseSlugs ?? []).includes(s)))
            return false;
        if (params.exams?.length && !params.exams.some((s) => (a.examSlugs ?? []).includes(s)))
            return false;
        if (params.scholarships?.length && !params.scholarships.some((s) => (a.scholarshipSlugs ?? []).includes(s)))
            return false;
        if (params.degree && !a.courses.some((c) => c.degree === params.degree)) return false;
        if (params.examType && !a.exams.some((e) => e.type === params.examType)) return false;
        if (params.scholarshipType && !a.scholarships.some((s) => s.type === params.scholarshipType))
            return false;
        if (params.minRating && a.rating < params.minRating) return false;
        if (params.featured && !a.featured) return false;
        if (params.dateFrom && Date.parse(a.publishedAt) < Date.parse(params.dateFrom)) return false;
        if (params.dateTo && Date.parse(a.publishedAt) > Date.parse(params.dateTo)) return false;
        return true;
    });
}

// ----------------------------------------------------------------------------
// Facets (for filter sidebars) and pagination
// ----------------------------------------------------------------------------
function countFacet(list: ResolvedArticle[], pick: (a: ResolvedArticle) => string[]): Map<string, number> {
    const m = new Map<string, number>();
    for (const a of list) for (const s of pick(a)) m.set(s, (m.get(s) ?? 0) + 1);
    return m;
}

const locationsOfType = (a: ResolvedArticle, type: Location['type']): string[] =>
    a.locations.filter((l) => l.type === type).map((l) => l.slug);

/** Derive the universal filter options + live counts from a working set. */
export function buildFacets(list: ResolvedArticle[]): ListingFacets {
    const ct = countFacet(list, (a) => [deriveContentType(a)]);
    const cat = countFacet(list, (a) => [a.categorySlug]);
    const countries = countFacet(list, (a) => locationsOfType(a, 'country'));
    const states = countFacet(list, (a) => locationsOfType(a, 'state'));
    const cities = countFacet(list, (a) => locationsOfType(a, 'city'));
    const instTypes = countFacet(list, (a) => [...new Set(a.institutions.map((i) => i.type))]);
    const ex = countFacet(list, (a) => a.examSlugs ?? []);

    const toFacets = (m: Map<string, number>, name: (slug: string) => string): Facet[] =>
        [...m.entries()]
            .map(([slug, count]) => ({ slug, name: name(slug), count }))
            .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

    // Fixed-order facets keep a stable, label-driven order.
    const fixedFacets = (
        defs: { slug: string; name: string }[],
        count: (slug: string) => number,
    ): Facet[] =>
        defs.map((d) => ({ slug: d.slug, name: d.name, count: count(d.slug) })).filter((f) => f.count > 0);

    const readingTime: Facet[] = READING_TIMES.map((r) => ({
        slug: r.slug,
        name: r.name,
        count: list.filter((a) => inReadingBucket(a.readingMinutes, r.slug)).length,
    })).filter((f) => f.count > 0);

    return {
        contentTypes: fixedFacets(CONTENT_TYPES, (s) => ct.get(s) ?? 0),
        categories: toFacets(cat, (s) => categoryMap.get(s)?.name ?? s),
        countries: toFacets(countries, (s) => locationMap.get(s)?.name ?? s),
        states: toFacets(states, (s) => locationMap.get(s)?.name ?? s),
        cities: toFacets(cities, (s) => locationMap.get(s)?.name ?? s),
        institutionTypes: fixedFacets(INSTITUTION_TYPES, (s) => instTypes.get(s) ?? 0),
        exams: toFacets(ex, (s) => examMap.get(s)?.name ?? s),
        readingTime,
    };
}

// ----------------------------------------------------------------------------
// Homepage discovery: education-type & location stats
// ----------------------------------------------------------------------------
export interface EducationTypeStat {
    type: string;
    name: string;
    count: number;
    trending: boolean;
}

/** Article counts per institution type, for "Browse by Education Type". */
export function getEducationTypeStats(): EducationTypeStat[] {
    const resolved = getAllResolved();
    return INSTITUTION_TYPES.map((t) => {
        const matching = resolved.filter((a) => a.institutions.some((i) => i.type === t.slug));
        return {
            type: t.slug,
            name: t.name,
            count: matching.length,
            trending: matching.some((a) => a.trending),
        };
    });
}

/** Popular states & cities (with content), for "Browse by Location". */
export function getLocationStats(): { states: Facet[]; cities: Facet[] } {
    const facets = buildFacets(getAllResolved());
    return { states: facets.states, cities: facets.cities };
}

/** Top tags within a category (for the category hero). */
export function getTopTagsForCategory(slug: string, limit = 8): Tag[] {
    const counts = new Map<string, number>();
    for (const a of allArticles) {
        if (a.categorySlug !== slug) continue;
        for (const t of a.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    return [...counts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([s]) => tagMap.get(s))
        .filter(Boolean) as Tag[];
}

/** Tags that co-occur with a given tag (for the tag hero "related tags"). */
export function getRelatedTags(tagSlug: string, limit = 8): Tag[] {
    const counts = new Map<string, number>();
    for (const a of allArticles) {
        if (!a.tags.includes(tagSlug)) continue;
        for (const t of a.tags) if (t !== tagSlug) counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    return [...counts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([s]) => tagMap.get(s))
        .filter(Boolean) as Tag[];
}

/** Categories that articles with this tag belong to (for the tag hero). */
export function getRelatedCategoriesForTag(tagSlug: string, limit = 6) {
    const counts = new Map<string, number>();
    for (const a of allArticles) {
        if (!a.tags.includes(tagSlug)) continue;
        counts.set(a.categorySlug, (counts.get(a.categorySlug) ?? 0) + 1);
    }
    return [...counts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([s]) => categoryMap.get(s))
        .filter(Boolean);
}

export function paginate<T>(items: T[], page: number, pageSize: number): Paged<T> {
    const total = items.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(Math.max(1, page), totalPages);
    const start = (safePage - 1) * pageSize;
    return {
        items: items.slice(start, start + pageSize),
        page: safePage,
        pageSize,
        total,
        totalPages,
        hasPrev: safePage > 1,
        hasNext: safePage < totalPages,
    };
}

// ----------------------------------------------------------------------------
// Search suggestions & trending searches (for the smart search box)
// ----------------------------------------------------------------------------
/** Lightweight index for the autocomplete search box (client-filterable). */
export function getSuggestionIndex(): Suggestion[] {
    const fromArticles: Suggestion[] = getAllArticles().map((a) => ({
        type: 'article',
        label: a.title,
        href: `/blog/${a.slug}`,
    }));
    const fromCategories: Suggestion[] = categories.map((c) => ({
        type: 'category',
        label: c.name,
        href: `/blog/category/${c.slug}`,
    }));
    const fromTags: Suggestion[] = tags.map((t) => ({
        type: 'tag',
        label: t.name,
        href: `/blog/${t.slug}`,
    }));
    const fromInstitutions: Suggestion[] = institutions.map((i) => ({
        type: 'institution',
        label: i.name,
        href: institutionHref(i.type, i.slug),
    }));
    return [...fromArticles, ...fromCategories, ...fromTags, ...fromInstitutions];
}

function institutionHref(type: string, slug: string): string {
    const seg =
        type === 'university'
            ? 'university'
            : type === 'college'
              ? 'college'
              : type === 'coaching'
                ? 'coaching'
                : type === 'school'
                  ? 'school'
                  : 'institute';
    return `/blog/${seg}/${slug}`;
}

export const TRENDING_SEARCHES = [
    'JEE Main 2026',
    'Study in USA',
    'NEET counselling',
    'Scholarships 2026',
    'CUET admissions',
    'IIT Bombay placements',
];

export const POPULAR_TAGS = tags.slice(0, 14);
