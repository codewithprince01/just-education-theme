import type { CardArticle } from '@/data/blog/types';
import type { InitialFilters, ListingFacets } from '@/lib/blog/listing-types';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import BlogListing from './BlogListing';
import JsonLd from './JsonLd';
import { blogSchema, breadcrumbSchema, type Crumb } from '@/lib/blog/seo';
import { absoluteUrl, routes } from '@/lib/blog/config';

interface BlogArchiveProps {
    eyebrow: string;
    title: string;
    description?: string;
    breadcrumbs: Crumb[];
    articles: CardArticle[];
    facets: ListingFacets;
    /** Canonical base path for the filter URLs, e.g. /blog/category/universities. */
    basePath: string;
    showCategoryFilter?: boolean;
    /** Optional rich header (e.g. author avatar, institution meta). */
    headerExtra?: React.ReactNode;
    /** Content rendered between the header and the listing (e.g. related tags). */
    intro?: React.ReactNode;
    initial?: InitialFilters;
    /** Current page (from the URL) for numbered pagination. */
    page?: number;
    /** Optional custom hero that replaces the default header band. */
    hero?: React.ReactNode;
}

/** ItemList schema of the scope's articles — helps AI / GEO search surface them. */
function itemListSchema(articles: CardArticle[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        numberOfItems: articles.length,
        itemListElement: articles.slice(0, 20).map((a, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: absoluteUrl(routes.article(a.slug)),
            name: a.title,
        })),
    };
}

// Shared shell for every taxonomy/archive page: SEO breadcrumbs + structured
// data, a branded header band, and the URL-driven interactive listing.
export default function BlogArchive({
    eyebrow,
    title,
    description,
    breadcrumbs,
    articles,
    facets,
    basePath,
    showCategoryFilter = true,
    headerExtra,
    intro,
    initial,
    page = 1,
    hero,
}: BlogArchiveProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            <JsonLd data={[breadcrumbSchema(breadcrumbs), blogSchema(), itemListSchema(articles)]} />

            {/* Hero — custom override or the default header band */}
            {hero ?? (
            <section className="relative bg-gradient-to-br from-[#0B3C5D] via-[#0D4B75] to-[#126094] text-white overflow-hidden">
                <div className="absolute -top-16 -left-10 w-72 h-72 rounded-full bg-orange-500/20 blur-3xl" aria-hidden="true" />
                <div className="absolute -bottom-24 right-0 w-96 h-96 rounded-full bg-blue-300/10 blur-3xl" aria-hidden="true" />
                {/* subtle dotted texture */}
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    aria-hidden="true"
                    style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '22px 22px' }}
                />
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10 md:py-16">
                    <div className="[&_a]:text-blue-200 [&_a:hover]:text-orange-300 [&_span]:text-blue-100">
                        <Breadcrumbs items={breadcrumbs} />
                    </div>
                    <span className="inline-flex items-center gap-2 mt-3 text-xs font-bold uppercase tracking-widest text-orange-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-400" /> {eyebrow}
                    </span>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mt-3 leading-[1.05] max-w-4xl">{title}</h1>
                    {description && (
                        <p className="text-blue-100 mt-4 max-w-2xl text-sm md:text-base leading-relaxed">
                            {description}
                        </p>
                    )}
                    {headerExtra}
                    <div className="mt-6 flex flex-wrap items-center gap-2.5">
                        <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3.5 py-1.5 text-sm font-semibold">
                            <span className="text-orange-300 font-extrabold">{articles.length}</span> article{articles.length === 1 ? '' : 's'}
                        </span>
                        <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3.5 py-1.5 text-xs font-medium text-blue-100">
                            Filter, sort &amp; explore below
                        </span>
                    </div>
                </div>
            </section>
            )}

            {/* Optional intro band (related tags, popular strip, etc.) */}
            {intro && (
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-8">{intro}</div>
            )}

            {/* Listing */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10">
                <BlogListing
                    articles={articles}
                    facets={facets}
                    basePath={basePath}
                    showCategoryFilter={showCategoryFilter}
                    initial={initial}
                    initialPage={page}
                />
            </div>
        </div>
    );
}
