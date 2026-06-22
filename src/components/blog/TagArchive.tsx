import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Tag as TagIcon, Folder, Flame } from 'lucide-react';
import {
    getTag, getByTagSlug, getRelatedTags, getRelatedCategoriesForTag,
    buildFacets, cardsFrom,
} from '@/lib/blog/queries';
import { routes } from '@/lib/blog/config';
import { parseFilterParams } from '@/lib/blog/listing-types';
import { composeListingSeo, type ListingScope } from '@/lib/blog/listing-seo';
import BlogArchive from './BlogArchive';
import ArticleCard from './ArticleCard';

type SP = Record<string, string | string[] | undefined>;

export function tagScope(slug: string): ListingScope | null {
    const tag = getTag(slug);
    if (!tag) return null;
    return {
        kind: 'tag',
        name: `#${tag.name}`,
        slug: tag.slug,
        basePath: routes.tag(tag.slug),
        baseDescription: `Every article tagged “${tag.name}” on Just Education.`,
    };
}

/** Shared generateMetadata for the tag archive (served at /blog/[slug]). */
export function tagMetadata(slug: string, sp: SP): Metadata {
    const scope = tagScope(slug);
    if (!scope) return { title: 'Tag not found' };
    const { filters, page } = parseFilterParams(sp);
    return composeListingSeo(scope, filters, page).metadata;
}

// Tag archive body — rendered by the /blog/[slug] dispatcher when the slug is a tag.
export default function TagArchive({ slug, sp }: { slug: string; sp: SP }) {
    const scope = tagScope(slug);
    if (!scope) notFound();

    const { filters, page } = parseFilterParams(sp);
    const seo = composeListingSeo(scope, filters, page);
    const resolved = getByTagSlug(slug);
    const relatedTags = getRelatedTags(slug, 10);
    const relatedCategories = getRelatedCategoriesForTag(slug, 6);
    const popular = cardsFrom([...resolved].sort((a, b) => b.views - a.views).slice(0, 3));

    return (
        <BlogArchive
            eyebrow="Tag"
            title={seo.h1}
            description={scope.baseDescription}
            breadcrumbs={seo.breadcrumbs}
            articles={cardsFrom(resolved)}
            facets={buildFacets(resolved)}
            basePath={scope.basePath}
            initial={filters}
            page={page}
            headerExtra={
                relatedCategories.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-2 mt-5">
                        <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-orange-300">
                            <Folder className="w-3.5 h-3.5" /> Categories:
                        </span>
                        {relatedCategories.map((c) => c && (
                            <Link key={c.slug} href={routes.category(c.slug)} className="text-xs font-semibold text-blue-50 bg-white/10 hover:bg-white/20 border border-white/15 rounded-full px-3 py-1.5 transition-colors">
                                {c.name}
                            </Link>
                        ))}
                    </div>
                ) : null
            }
            intro={
                <div className="space-y-8">
                    {popular.length > 0 && (
                        <div>
                            <h2 className="flex items-center gap-2 text-lg font-extrabold text-[#0B3C5D] mb-4">
                                <Flame className="w-5 h-5 text-[#F57C00]" /> Popular in {scope.name}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {popular.map((a) => <ArticleCard key={a.slug} article={a} />)}
                            </div>
                        </div>
                    )}
                    {relatedTags.length > 0 && (
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                            <h2 className="flex items-center gap-2 text-sm font-bold text-[#0B3C5D] uppercase tracking-wide mb-3">
                                <TagIcon className="w-4 h-4 text-[#F57C00]" /> Related Tags
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {relatedTags.map((t) => (
                                    <Link key={t.slug} href={routes.tag(t.slug)} className="text-xs font-semibold text-gray-600 bg-gray-50 hover:bg-orange-50 hover:text-[#F57C00] border border-gray-200 hover:border-orange-200 rounded-full px-3 py-1.5 transition-colors">
                                        #{t.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            }
        />
    );
}
