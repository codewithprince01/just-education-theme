import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import type { CardArticle, Category } from '@/data/blog/types';
import { routes } from '@/lib/blog/config';
import { formatDate } from '@/lib/blog/format';
import { accent } from './theme';
import { CategoryIcon } from './icons';

interface TopicSectionProps {
    category: Category;
    articles: CardArticle[];
    className?: string;
}

// Premium, colour-themed topic module for the homepage (Study Abroad,
// Scholarships, Admissions, Career Guidance…). A lead story sits above a
// compact list, finished with quick tag links — all tinted with the
// category's accent so each block feels distinct yet on-brand.
export default function TopicSection({ category, articles, className = '' }: TopicSectionProps) {
    if (articles.length === 0) return null;

    const a = accent(category.accent);
    const [lead, ...rest] = articles;
    const list = rest.slice(0, 3);

    // Derive up to 5 distinct tags from this topic's articles for quick links.
    const tagMap = new Map<string, string>();
    for (const art of articles) {
        for (const t of art.resolvedTags) if (!tagMap.has(t.slug)) tagMap.set(t.slug, t.name);
    }
    const topicTags = [...tagMap.entries()].slice(0, 5);

    return (
        <section className={`group/topic bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden ${className}`}>
            {/* Accent top bar */}
            <div className={`h-1.5 ${a.solid}`} aria-hidden="true" />

            <div className="p-5 sm:p-6 flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3 min-w-0">
                        <span className={`w-11 h-11 rounded-xl ${a.soft} ${a.softText} flex items-center justify-center flex-shrink-0`}>
                            <CategoryIcon name={category.icon} className="w-5 h-5" />
                        </span>
                        <div className="min-w-0">
                            <h2 className="text-lg font-extrabold text-[#0B3C5D] leading-tight truncate">{category.name}</h2>
                            <p className="text-xs text-gray-400">
                                {articles.length} article{articles.length === 1 ? '' : 's'}
                            </p>
                        </div>
                    </div>
                    <Link
                        href={routes.category(category.slug)}
                        className={`hidden sm:inline-flex items-center gap-1 text-sm font-semibold ${a.softText} hover:gap-2 transition-all whitespace-nowrap`}
                    >
                        View all <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Lead story */}
                <Link href={routes.article(lead.slug)} className="group/lead block">
                    <div className="relative rounded-xl overflow-hidden mb-3.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={lead.coverImage}
                            alt={lead.title}
                            loading="lazy"
                            className="w-full h-44 sm:h-48 object-cover group-hover/lead:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                        {lead.subCategorySlug && (
                            <span className={`absolute top-3 left-3 ${a.solid} text-white text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full shadow`}>
                                {category.subCategories.find((s) => s.slug === lead.subCategorySlug)?.name ?? category.name}
                            </span>
                        )}
                    </div>
                    <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-2 group-hover/lead:text-[#F57C00] transition-colors">
                        {lead.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1.5 line-clamp-2">{lead.excerpt}</p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={lead.author.avatar} alt={lead.author.name} loading="lazy" className="w-5 h-5 rounded-full object-cover" />
                        <span className="font-medium text-gray-500">{lead.author.name}</span>
                        <span aria-hidden="true">•</span>
                        <span>{formatDate(lead.publishedAt)}</span>
                        <span aria-hidden="true">•</span>
                        <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {lead.readingMinutes} min</span>
                    </div>
                </Link>

                {/* Compact list */}
                {list.length > 0 && (
                    <ul className="mt-5 pt-5 border-t border-gray-100 space-y-4">
                        {list.map((item) => (
                            <li key={item.slug}>
                                <Link href={routes.article(item.slug)} className="group/row flex gap-3 items-start">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={item.coverImage}
                                        alt={item.title}
                                        loading="lazy"
                                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                                    />
                                    <div className="min-w-0">
                                        <h4 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 group-hover/row:text-[#F57C00] transition-colors">
                                            {item.title}
                                        </h4>
                                        <p className="text-xs text-gray-400 mt-1 inline-flex items-center gap-1.5">
                                            {formatDate(item.publishedAt)}
                                            <span aria-hidden="true">•</span>
                                            <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {item.readingMinutes} min</span>
                                        </p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Quick tag links + mobile "view all" */}
                <div className="mt-5 pt-5 border-t border-gray-100 flex flex-wrap items-center gap-2">
                    {topicTags.map(([slug, name]) => (
                        <Link
                            key={slug}
                            href={routes.tag(slug)}
                            className={`text-xs font-semibold ${a.soft} ${a.softText} rounded-full px-2.5 py-1 hover:opacity-80 transition-opacity`}
                        >
                            #{name}
                        </Link>
                    ))}
                    <Link
                        href={routes.category(category.slug)}
                        className="sm:hidden ml-auto inline-flex items-center gap-1 text-sm font-semibold text-blue-600"
                    >
                        View all <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
