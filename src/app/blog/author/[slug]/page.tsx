import { notFound } from 'next/navigation';
import { authors } from '@/data/blog';
import { getAuthor, getByAuthorSlug, buildFacets, cardsFrom } from '@/lib/blog/queries';
import { routes } from '@/lib/blog/config';
import { parseFilterParams } from '@/lib/blog/listing-types';
import { composeListingSeo, type ListingScope } from '@/lib/blog/listing-seo';
import { authorSchema } from '@/lib/blog/seo';
import BlogArchive from '@/components/blog/BlogArchive';
import JsonLd from '@/components/blog/JsonLd';

export const dynamicParams = false;

export function generateStaticParams() {
    return authors.map((a) => ({ slug: a.slug }));
}

type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function scopeFor(slug: string): ListingScope | null {
    const author = getAuthor(slug);
    if (!author) return null;
    return {
        kind: 'author',
        name: author.name,
        slug: author.slug,
        basePath: routes.author(author.slug),
        baseDescription: author.bio,
    };
}

export async function generateMetadata({ params, searchParams }: Props) {
    const { slug } = await params;
    const scope = scopeFor(slug);
    if (!scope) return { title: 'Author not found' };
    const { filters, page } = parseFilterParams(await searchParams);
    const seo = composeListingSeo(scope, filters, page);
    return { ...seo.metadata, openGraph: { ...seo.metadata.openGraph, images: [getAuthor(slug)!.avatar] } };
}

export default async function AuthorPage({ params, searchParams }: Props) {
    const { slug } = await params;
    const scope = scopeFor(slug);
    if (!scope) notFound();
    const author = getAuthor(slug)!;

    const { filters, page } = parseFilterParams(await searchParams);
    const seo = composeListingSeo(scope, filters, page);
    const resolved = getByAuthorSlug(slug);

    return (
        <>
            <JsonLd data={authorSchema(author)} />
            <BlogArchive
                eyebrow="Author"
                title={seo.h1}
                description={author.bio}
                breadcrumbs={seo.breadcrumbs}
                articles={cardsFrom(resolved)}
                facets={buildFacets(resolved)}
                basePath={scope.basePath}
                initial={filters}
                page={page}
                headerExtra={
                    <div className="flex items-center gap-4 mt-5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={author.avatar}
                            alt={author.name}
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-full object-cover ring-4 ring-white/20 shadow-lg"
                        />
                        <div>
                            <p className="font-semibold text-white">{author.role}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {author.expertise.map((e) => (
                                    <span key={e} className="text-xs font-semibold text-blue-50 bg-white/10 border border-white/15 rounded-full px-2.5 py-1">
                                        {e}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            />
        </>
    );
}
