import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
    Sparkles, Flame, Clock, Eye, RefreshCw, Newspaper, Layers, FileText,
    ThumbsUp, Tag as TagIcon, ArrowRight,
} from 'lucide-react';

import type { Category } from '@/data/blog/types';
import {
    getFeatured, getTrending, getLatest, getEditorsPicks, getMostViewed,
    getRecentlyUpdated, getByCategorySlug, getCategory, getSuggestionIndex,
    cardsFrom, parseFilterParams,
    TRENDING_SEARCHES, POPULAR_TAGS,
} from '@/lib/blog/queries';
import { routes, BLOG_NAME, BLOG_TAGLINE } from '@/lib/blog/config';
import { serializeFilters } from '@/lib/blog/listing-types';
import { buildArchiveMetadata, organizationSchema, blogSchema } from '@/lib/blog/seo';

import SearchBar from '@/components/blog/SearchBar';
import CategoryNavBar from '@/components/blog/CategoryNavBar';
import HeroFeatured from '@/components/blog/HeroFeatured';
import SectionHeading from '@/components/blog/SectionHeading';
import ArticleCard from '@/components/blog/ArticleCard';
import CategorySection from '@/components/blog/CategorySection';
import TopicSection from '@/components/blog/TopicSection';
import NewsletterCTA from '@/components/blog/NewsletterCTA';
import JsonLd from '@/components/blog/JsonLd';

// /blog is the editorial home; any filter/search lives on /blog/all.
export const metadata: Metadata = buildArchiveMetadata({
    title: BLOG_NAME,
    description: BLOG_TAGLINE,
    path: routes.home,
});

// Categories shown as tabs in the horizontal navigation bar (in order).
const NAV_SLUGS = [
    'universities', 'colleges', 'coaching-centers', 'schools', 'institutes', 'libraries',
    'study-abroad', 'scholarships', 'admissions', 'career-guidance',
];
const TOPIC_SLUGS = ['study-abroad', 'scholarships', 'admissions', 'career-guidance'] as const;

export default async function BlogHomePage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
    const sp = await searchParams;
    const { filters, page, hasAny } = parseFilterParams(sp);

    // Any filter/search on /blog consolidates to the canonical /blog/all
    // listing, so clearing filters there keeps you on the all-articles view.
    if (hasAny) {
        const qs = serializeFilters(filters, page);
        redirect(qs ? `/blog/all?${qs}` : '/blog/all');
    }

    // Editorial homepage.
    const featuredPool = getFeatured(5);
    const heroArticles = cardsFrom(
        featuredPool.length >= 5
            ? featuredPool
            : [...featuredPool, ...getTrending(8).filter((t) => !featuredPool.some((f) => f.slug === t.slug))].slice(0, 5),
    );
    const trending = cardsFrom(getTrending(4));
    const recent = cardsFrom(getLatest(6));
    const editorsPicks = cardsFrom(getEditorsPicks(4));
    const mostViewed = cardsFrom(getMostViewed(6));
    const recentlyUpdated = cardsFrom(getRecentlyUpdated(5));
    const index = getSuggestionIndex();
    const navCategories = NAV_SLUGS.map((s) => getCategory(s)).filter((c): c is Category => Boolean(c));

    return (
        <div className="bg-gray-50">
            <JsonLd data={[organizationSchema(), blogSchema()]} />

            {/* Hero */}
            <section className="relative bg-gradient-to-br from-[#0B3C5D] via-[#0D4B75] to-[#126094] text-white overflow-hidden">
                <div className="absolute top-0 left-10 w-72 h-72 rounded-full bg-orange-500/20 blur-3xl" aria-hidden="true" />
                <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-blue-300/10 blur-3xl" aria-hidden="true" />
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16 text-center">
                    <span className="bg-orange-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                        Education Insights
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black mt-5 leading-tight">
                        Smarter decisions start with <span className="text-orange-400">better insights</span>
                    </h1>
                    <p className="text-blue-100 mt-4 max-w-2xl mx-auto text-sm md:text-base">
                        Expert guides on universities, exams, scholarships, study abroad and careers —
                        researched for India&apos;s students and parents.
                    </p>
                    <div className="mt-8 max-w-2xl mx-auto">
                        <SearchBar index={index} trending={TRENDING_SEARCHES} />
                    </div>
                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                        {POPULAR_TAGS.slice(0, 8).map((t) => (
                            <Link
                                key={t.slug}
                                href={routes.tag(t.slug)}
                                className="text-xs font-semibold text-blue-50 bg-white/10 hover:bg-[#F57C00] hover:text-white border border-white/15 hover:border-[#F57C00] rounded-full px-3 py-1.5 transition-colors"
                            >
                                #{t.name}
                            </Link>
                        ))}
                    </div>
                    <div className="mt-6">
                        <Link
                            href="/blog/all"
                            className="inline-flex items-center gap-2 text-sm font-bold text-white bg-white/10 hover:bg-[#F57C00] border border-white/20 hover:border-[#F57C00] rounded-lg px-5 py-2.5 transition-colors"
                        >
                            Browse all articles <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Horizontal category filter / navigation bar */}
            <CategoryNavBar categories={navCategories} />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10 md:py-12 space-y-14">
                {/* Featured Stories */}
                <section>
                    <SectionHeading title="Featured Stories" icon={<Sparkles className="w-5 h-5" />} />
                    <HeroFeatured articles={heroArticles} />
                </section>

                {/* Main + sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-12">
                        {/* Trending */}
                        <section>
                            <SectionHeading title="Trending Articles" icon={<Flame className="w-5 h-5" />} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {trending.map((a) => <ArticleCard key={a.slug} article={a} />)}
                            </div>
                        </section>

                        {/* Recent */}
                        <section>
                            <SectionHeading title="Recent Articles" icon={<Clock className="w-5 h-5" />} href="/blog/all" linkLabel="View all" />
                            <div className="space-y-5">
                                {recent.slice(0, 4).map((a) => <ArticleCard key={a.slug} article={a} variant="horizontal" />)}
                            </div>
                        </section>

                        {/* Editor's picks */}
                        <section>
                            <SectionHeading title="Editor’s Picks" icon={<ThumbsUp className="w-5 h-5" />} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {editorsPicks.map((a) => <ArticleCard key={a.slug} article={a} />)}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-8">
                        <div className="sticky top-32 space-y-8">
                            {/* Most viewed */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-md p-5">
                                <h3 className="flex items-center gap-2 text-lg font-bold text-[#0B3C5D] mb-4">
                                    <Eye className="w-5 h-5 text-[#F57C00]" /> Most Viewed
                                </h3>
                                <div className="space-y-4">
                                    {mostViewed.map((a, i) => (
                                        <ArticleCard key={a.slug} article={a} variant="ranked" rank={i + 1} />
                                    ))}
                                </div>
                            </div>

                            {/* Popular tags */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-md p-5">
                                <h3 className="flex items-center gap-2 text-lg font-bold text-[#0B3C5D] mb-4">
                                    <TagIcon className="w-5 h-5 text-[#F57C00]" /> Popular Tags
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {POPULAR_TAGS.map((t) => (
                                        <Link
                                            key={t.slug}
                                            href={routes.tag(t.slug)}
                                            className="text-xs font-semibold text-gray-600 bg-gray-50 hover:bg-orange-50 hover:text-[#F57C00] border border-gray-200 hover:border-orange-200 rounded-full px-3 py-1.5 transition-colors"
                                        >
                                            #{t.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <NewsletterCTA />

                            {/* Recently updated */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-md p-5">
                                <h3 className="flex items-center gap-2 text-lg font-bold text-[#0B3C5D] mb-4">
                                    <RefreshCw className="w-5 h-5 text-[#F57C00]" /> Recently Updated
                                </h3>
                                <div className="space-y-4">
                                    {recentlyUpdated.map((a) => (
                                        <ArticleCard key={a.slug} article={a} variant="compact" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Educational News */}
                <CategorySection
                    title="Educational News"
                    subtitle="The latest policy, exam and result updates."
                    icon={<Newspaper className="w-5 h-5" />}
                    href={routes.category('education-news')}
                    articles={cardsFrom(getByCategorySlug('education-news', 4))}
                    feature
                />

                {/* Latest Updates — themed topic showcase */}
                <section>
                    <SectionHeading
                        title="Latest Updates"
                        subtitle="Fresh insights across study abroad, scholarships, admissions and careers."
                        icon={<Layers className="w-5 h-5" />}
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {TOPIC_SLUGS.map((slug) => {
                            const category = getCategory(slug);
                            if (!category) return null;
                            return (
                                <TopicSection
                                    key={slug}
                                    category={category}
                                    articles={cardsFrom(getByCategorySlug(slug, 4))}
                                />
                            );
                        })}
                    </div>
                </section>

                {/* Exam Updates */}
                <CategorySection
                    title="Exam Updates"
                    subtitle="Dates, patterns and prep for India’s biggest entrance exams."
                    icon={<FileText className="w-5 h-5" />}
                    href={routes.category('entrance-exams')}
                    articles={cardsFrom(getByCategorySlug('entrance-exams', 3))}
                />

                {/* Newsletter banner */}
                <NewsletterCTA variant="banner" />
            </div>
        </div>
    );
}
