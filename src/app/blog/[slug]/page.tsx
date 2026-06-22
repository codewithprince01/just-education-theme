import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
    Calendar, Clock, Eye, Share2, Tag as TagIcon, Sparkles, Flame,
    BookMarked, FileText, Award,
} from 'lucide-react';

import {
    getArticleBySlug, getAllArticles, getRelatedArticles, getMostViewed, getTrending,
    getByCategorySlug, getByAuthorSlug, getRelatedInstitutions, getTag, cardsFrom,
} from '@/lib/blog/queries';
import { tags } from '@/data/blog';
import { routes, absoluteUrl } from '@/lib/blog/config';
import TagArchive, { tagMetadata } from '@/components/blog/TagArchive';
import {
    buildArticleMetadata, articleSchema, breadcrumbSchema, faqSchema,
    authorSchema, organizationSchema,
} from '@/lib/blog/seo';
import { formatDate, formatCount } from '@/lib/blog/format';

import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/blog/JsonLd';
import CategoryBadge from '@/components/blog/CategoryBadge';
import ArticleCard from '@/components/blog/ArticleCard';
import SectionHeading from '@/components/blog/SectionHeading';
import NewsletterCTA from '@/components/blog/NewsletterCTA';
import ArticleBody from '@/components/blog/article/ArticleBody';
import TableOfContents, { type TocItem } from '@/components/blog/article/TableOfContents';
import ArticleActions from '@/components/blog/article/ArticleActions';
import Gallery from '@/components/blog/article/Gallery';
import FaqAccordion from '@/components/blog/article/FaqAccordion';
import CommentsSection from '@/components/blog/article/CommentsSection';
import AuthorBio from '@/components/blog/article/AuthorBio';
import ReadingProgress from '@/components/blog/article/ReadingProgress';
import { KeyTakeaways, QuickAnswer, TrustBadges } from '@/components/blog/article/HeroExtras';
import {
    InstitutionsWidget, EntityLinks, DiscoverySection,
    coursesToLinks, examsToLinks, scholarshipsToLinks,
} from '@/components/blog/article/EntityRail';
import LeadGenWidget from '@/components/blog/article/LeadGenWidget';
import ConversionCTA from '@/components/blog/article/ConversionCTA';

// Sidebar widget for compact article lists (Popular / Trending).
function SidebarArticleList({ title, icon, items }: { title: string; icon: React.ReactNode; items: ReturnType<typeof cardsFrom> }) {
    if (items.length === 0) return null;
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-md p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-[#0B3C5D] uppercase tracking-wide mb-4">{icon} {title}</h2>
            <div className="space-y-4">
                {items.map((a) => <ArticleCard key={a.slug} article={a} variant="compact" />)}
            </div>
        </div>
    );
}

const LEAD_TOPIC: Record<string, string> = {
    'study-abroad': 'study abroad',
    'visa-guidance': 'study abroad',
    scholarships: 'scholarship',
    'entrance-exams': 'exam prep',
    universities: 'admission',
    colleges: 'admission',
    admissions: 'admission',
};

type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

// All article + tag slugs are known at build time — unknown slugs return a true 404.
export const dynamicParams = false;

// /blog/[slug] serves both articles and tag archives (article-first).
export function generateStaticParams() {
    return [
        ...getAllArticles().map((a) => ({ slug: a.slug })),
        ...tags.map((t) => ({ slug: t.slug })),
    ];
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    const { slug } = await params;
    const article = getArticleBySlug(slug);
    if (article) return buildArticleMetadata(article);
    if (getTag(slug)) return tagMetadata(slug, await searchParams);
    return { title: 'Not found' };
}

export default async function ArticlePage({ params, searchParams }: Props) {
    const { slug } = await params;
    const article = getArticleBySlug(slug);
    if (!article) {
        // Not an article — fall back to a tag archive at the same clean path.
        if (getTag(slug)) return <TagArchive slug={slug} sp={await searchParams} />;
        notFound();
    }

    const relatedInstitutions = getRelatedInstitutions(article, 5);
    const related = cardsFrom(getRelatedArticles(article, 6));
    const popular = cardsFrom(getMostViewed(6).filter((a) => a.slug !== article.slug).slice(0, 4));
    const trending = cardsFrom(getTrending(6).filter((a) => a.slug !== article.slug).slice(0, 4));
    const sameCategory = cardsFrom(getByCategorySlug(article.categorySlug).filter((a) => a.slug !== article.slug).slice(0, 3));
    const authorCount = getByAuthorSlug(article.author.slug).length;
    const shares = Math.round(article.views * 0.035 + article.likes * 0.6);

    const toc: TocItem[] = article.content
        .filter((b): b is Extract<typeof b, { type: 'heading' }> => b.type === 'heading')
        .map((b) => ({ id: b.id, text: b.text, level: b.level }));

    const keyTakeaways = article.keyTakeaways ?? toc.filter((t) => t.level === 2).map((t) => t.text).slice(0, 6);
    const quickAnswer = article.quickAnswer ?? article.excerpt;
    const articleUrl = absoluteUrl(routes.article(article.slug));

    const breadcrumbs = [
        { name: 'Home', url: '/' },
        { name: 'Insights', url: routes.home },
        { name: article.category.name, url: routes.category(article.category.slug) },
        { name: article.title },
    ];

    const schemas: object[] = [
        articleSchema(article),
        breadcrumbSchema(breadcrumbs),
        authorSchema(article.author),
        organizationSchema(),
    ];
    if (article.faqs?.length) schemas.push(faqSchema(article.faqs));

    return (
        <article className="bg-gray-50">
            <ReadingProgress />
            <JsonLd data={schemas} />

            {/* Header (above fold) */}
            <header className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-6 pb-8">
                    <Breadcrumbs items={breadcrumbs} />
                    <div className="flex items-center gap-3 mt-3 mb-4">
                        <CategoryBadge category={article.category} size="md" />
                        {article.subCategory && (
                            <Link href={routes.category(article.category.slug)} className="text-xs font-semibold text-gray-400 hover:text-[#F57C00]">
                                {article.subCategory.name}
                            </Link>
                        )}
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                        {article.title}
                    </h1>
                    {article.subtitle && <p className="text-lg text-gray-500 mt-4 leading-relaxed">{article.subtitle}</p>}

                    {/* Byline */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 text-sm text-gray-500">
                        <Link href={routes.author(article.author.slug)} className="flex items-center gap-2.5 group">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={article.author.avatar} alt={article.author.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow" />
                            <span>
                                <span className="block font-bold text-gray-900 group-hover:text-[#F57C00] transition-colors">{article.author.name}</span>
                                <span className="block text-xs text-gray-400">{article.author.role}</span>
                            </span>
                        </Link>
                        <span className="inline-flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {formatDate(article.publishedAt)}</span>
                        <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" /> {article.readingMinutes} min read</span>
                        <span className="inline-flex items-center gap-1.5"><Eye className="w-4 h-4" /> {formatCount(article.views)} views</span>
                        <span className="inline-flex items-center gap-1.5"><Share2 className="w-4 h-4" /> {formatCount(shares)} shares</span>
                    </div>

                    {/* Trust signals */}
                    <TrustBadges updatedAt={article.updatedAt} reviewer={article.author.name} />

                    {/* Actions */}
                    <div className="mt-5 pt-5 border-t border-gray-100">
                        <ArticleActions slug={article.slug} title={article.title} url={articleUrl} likes={article.likes} views={article.views} />
                    </div>
                </div>
            </header>

            {/* Smart hero — split: image on the left, summary content on the right */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                    <div className="rounded-2xl overflow-hidden shadow-lg min-h-[260px] lg:min-h-[360px]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-5 justify-center">
                        <QuickAnswer text={quickAnswer} />
                        {keyTakeaways.length > 0 && <KeyTakeaways items={keyTakeaways} />}
                    </div>
                </div>
            </div>

            {/* Body + sidebar */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
                    {/* Main */}
                    <div className="min-w-0">
                        <ArticleBody blocks={article.content} />

                        {article.gallery && <Gallery images={article.gallery} />}

                        {/* Discovery */}
                        <DiscoverySection
                            institutions={relatedInstitutions}
                            courses={article.courses}
                            exams={article.exams}
                            scholarships={article.scholarships}
                        />

                        {/* Tags */}
                        {article.resolvedTags.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-gray-200">
                                <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-500 mr-1">
                                    <TagIcon className="w-4 h-4" /> Tags:
                                </span>
                                {article.resolvedTags.map((t) => (
                                    <Link key={t.slug} href={routes.tag(t.slug)} className="text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-orange-50 hover:text-[#F57C00] rounded-full px-3 py-1.5 transition-colors">
                                        #{t.name}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Conversion CTA (by article type) */}
                        <ConversionCTA categorySlug={article.categorySlug} />

                        {/* Author */}
                        <div className="mt-10">
                            <AuthorBio author={article.author} articleCount={authorCount} />
                        </div>

                        {/* FAQ */}
                        {article.faqs?.length ? (
                            <div className="mt-10">
                                <FaqAccordion faqs={article.faqs} />
                            </div>
                        ) : null}

                        {/* Comments */}
                        <div className="mt-10">
                            <CommentsSection slug={article.slug} initialComments={article.comments ?? []} />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside>
                        <div className="sticky top-24 space-y-6 max-h-[calc(100vh-7rem)] overflow-y-auto pr-1 pb-4">
                            {toc.length > 0 && <TableOfContents items={toc} />}
                            <InstitutionsWidget title="Related Institutions" institutions={relatedInstitutions} />
                            <EntityLinks title="Related Courses" icon={<BookMarked className="w-4 h-4 text-[#F57C00]" />} items={coursesToLinks(article.courses)} />
                            <EntityLinks title="Related Exams" icon={<FileText className="w-4 h-4 text-[#F57C00]" />} items={examsToLinks(article.exams)} />
                            <EntityLinks title="Related Scholarships" icon={<Award className="w-4 h-4 text-[#F57C00]" />} items={scholarshipsToLinks(article.scholarships)} />
                            <SidebarArticleList title="Popular Articles" icon={<Sparkles className="w-4 h-4 text-[#F57C00]" />} items={popular} />
                            <SidebarArticleList title="Trending Articles" icon={<Flame className="w-4 h-4 text-[#F57C00]" />} items={trending} />
                            <div id="enquire" className="scroll-mt-28">
                                <LeadGenWidget topic={LEAD_TOPIC[article.categorySlug] ?? 'admission'} />
                            </div>
                            <NewsletterCTA />
                        </div>
                    </aside>
                </div>

                {/* Related content */}
                <div className="mt-16 space-y-14">
                    {related.length > 0 && (
                        <section>
                            <SectionHeading title="Related Articles" icon={<Sparkles className="w-5 h-5" />} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {related.slice(0, 3).map((a) => <ArticleCard key={a.slug} article={a} />)}
                            </div>
                        </section>
                    )}
                    {sameCategory.length > 0 && (
                        <section>
                            <SectionHeading title={`More in ${article.category.name}`} icon={<TagIcon className="w-5 h-5" />} href={routes.category(article.category.slug)} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {sameCategory.map((a) => <ArticleCard key={a.slug} article={a} />)}
                            </div>
                        </section>
                    )}
                    {trending.length > 0 && (
                        <section>
                            <SectionHeading title="Trending Articles" icon={<Flame className="w-5 h-5" />} href="/blog/all?sort=trending" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {trending.slice(0, 3).map((a) => <ArticleCard key={a.slug} article={a} />)}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </article>
    );
}
