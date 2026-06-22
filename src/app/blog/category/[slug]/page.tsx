import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categories } from '@/data/blog';
import { getCategory, getByCategorySlug, getTopTagsForCategory, buildFacets, cardsFrom } from '@/lib/blog/queries';
import { routes } from '@/lib/blog/config';
import { parseFilterParams } from '@/lib/blog/listing-types';
import { composeListingSeo, type ListingScope } from '@/lib/blog/listing-seo';
import BlogArchive from '@/components/blog/BlogArchive';

export const dynamicParams = false;

export function generateStaticParams() {
    return categories.map((c) => ({ slug: c.slug }));
}

type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function scopeFor(slug: string): ListingScope | null {
    const category = getCategory(slug);
    if (!category) return null;
    return {
        kind: 'category',
        name: category.name,
        slug: category.slug,
        basePath: routes.category(category.slug),
        baseDescription: category.description,
    };
}

export async function generateMetadata({ params, searchParams }: Props) {
    const { slug } = await params;
    const scope = scopeFor(slug);
    if (!scope) return { title: 'Category not found' };
    const { filters, page } = parseFilterParams(await searchParams);
    return composeListingSeo(scope, filters, page).metadata;
}

export default async function CategoryPage({ params, searchParams }: Props) {
    const { slug } = await params;
    const scope = scopeFor(slug);
    if (!scope) notFound();
    const category = getCategory(slug)!;

    const { filters, page } = parseFilterParams(await searchParams);
    const seo = composeListingSeo(scope, filters, page);
    const resolved = getByCategorySlug(slug);
    const trendingTags = getTopTagsForCategory(slug, 8);

    return (
        <BlogArchive
            eyebrow="Category"
            title={seo.h1}
            description={category.description}
            breadcrumbs={seo.breadcrumbs}
            articles={cardsFrom(resolved)}
            facets={buildFacets(resolved)}
            basePath={scope.basePath}
            initial={filters}
            page={page}
            showCategoryFilter={false}
            headerExtra={
                <div className="mt-5 space-y-3">
                    {category.subCategories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {category.subCategories.map((sc) => (
                                <span key={sc.slug} className="text-xs font-semibold text-blue-50 bg-white/10 border border-white/15 rounded-full px-3 py-1.5">
                                    {sc.name}
                                </span>
                            ))}
                        </div>
                    )}
                    {trendingTags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-wide text-orange-300">Trending tags:</span>
                            {trendingTags.map((t) => (
                                <Link key={t.slug} href={routes.tag(t.slug)} className="text-xs font-semibold text-blue-50 hover:text-orange-300 transition-colors">
                                    #{t.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            }
        />
    );
}
