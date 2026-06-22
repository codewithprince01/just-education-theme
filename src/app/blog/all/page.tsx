import { FileText, LayoutGrid, Users, Building2, Sparkles } from 'lucide-react';
import { categories, authors, institutions } from '@/data/blog';
import { getAllResolved, buildFacets, cardsFrom, parseFilterParams } from '@/lib/blog/queries';
import { activeFilterDimensions } from '@/lib/blog/listing-types';
import { composeListingSeo, type ListingScope } from '@/lib/blog/listing-seo';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import BlogArchive from '@/components/blog/BlogArchive';

const ALL_BASE = '/blog/all';

function scope(): ListingScope {
    return {
        kind: 'all',
        name: 'All Articles',
        basePath: ALL_BASE,
        baseDescription:
            'Browse every article on Just Education — universities, colleges, exams, scholarships, study abroad, careers and more, all in one place.',
    };
}

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ searchParams }: Props) {
    const { filters, page } = parseFilterParams(await searchParams);
    return composeListingSeo(scope(), filters, page).metadata;
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
    return (
        <div className="flex items-center gap-2.5 bg-white/10 border border-white/15 rounded-xl px-3.5 py-2.5 backdrop-blur-sm">
            <span className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-300 flex items-center justify-center flex-shrink-0">
                {icon}
            </span>
            <span>
                <span className="block text-xl font-black leading-none">{value}</span>
                <span className="block text-[11px] uppercase tracking-wide text-blue-200 mt-1">{label}</span>
            </span>
        </div>
    );
}

// "All Articles" — the no-filter, browse-everything view with numbered pagination.
export default async function AllArticlesPage({ searchParams }: Props) {
    const { filters, page } = parseFilterParams(await searchParams);
    const all = getAllResolved();
    const seo = composeListingSeo(scope(), filters, page);

    // Show the premium custom hero on the unfiltered view; when the user
    // applies a filter, fall back to the default filter-aware header.
    const isFiltered = activeFilterDimensions(filters) > 0 || !!filters.q;

    const hero = isFiltered ? undefined : (
        <section className="relative bg-gradient-to-br from-[#0B3C5D] via-[#0D4B75] to-[#126094] text-white overflow-hidden">
            <div className="absolute -top-20 -left-16 w-80 h-80 rounded-full bg-orange-500/25 blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-28 -right-10 w-[28rem] h-[28rem] rounded-full bg-blue-300/10 blur-3xl" aria-hidden="true" />
            <div
                className="absolute inset-0 opacity-[0.06]"
                aria-hidden="true"
                style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '22px 22px' }}
            />
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-9 md:py-12">
                <div className="[&_a]:text-blue-200 [&_a:hover]:text-orange-300 [&_span]:text-blue-100">
                    <Breadcrumbs items={seo.breadcrumbs} />
                </div>
                <span className="inline-flex items-center gap-2 mt-2 bg-white/10 border border-white/15 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest text-orange-300">
                    <Sparkles className="w-3.5 h-3.5" /> The Knowledge Hub
                </span>
                <h1 className="text-3xl md:text-5xl font-black mt-3 leading-[1.05] max-w-4xl">
                    Every education insight, <span className="text-orange-400">in one place.</span>
                </h1>
                <p className="text-blue-100 mt-3 max-w-2xl text-sm md:text-base leading-relaxed">
                    Browse all <span className="font-bold text-white">{all.length}</span> expert articles across universities,
                    colleges, exams, scholarships, study abroad and careers — filter to find exactly what you need.
                </p>
                <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl">
                    <Stat icon={<FileText className="w-5 h-5" />} value={all.length} label="Articles" />
                    <Stat icon={<LayoutGrid className="w-5 h-5" />} value={categories.length} label="Categories" />
                    <Stat icon={<Users className="w-5 h-5" />} value={authors.length} label="Expert Authors" />
                    <Stat icon={<Building2 className="w-5 h-5" />} value={institutions.length} label="Institutions" />
                </div>
            </div>
        </section>
    );

    return (
        <BlogArchive
            eyebrow="All Articles"
            title={seo.h1}
            description="Every guide, news update and insight in one place — filter to narrow it down."
            breadcrumbs={seo.breadcrumbs}
            articles={cardsFrom(all)}
            facets={buildFacets(all)}
            basePath={ALL_BASE}
            initial={filters}
            page={page}
            hero={hero}
        />
    );
}
