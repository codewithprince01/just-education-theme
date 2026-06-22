import Link from 'next/link';
import { Clock, TrendingUp, MapPin } from 'lucide-react';
import type { CardArticle } from '@/data/blog/types';
import { routes } from '@/lib/blog/config';
import { formatDate, formatCount, timeAgo } from '@/lib/blog/format';
import CategoryBadge from './CategoryBadge';
import ArticleMeta from './ArticleMeta';

export type ArticleCardVariant = 'default' | 'horizontal' | 'compact' | 'overlay' | 'ranked';

interface ArticleCardProps {
    article: CardArticle;
    variant?: ArticleCardVariant;
    rank?: number;
    priority?: boolean;
    className?: string;
}

const cardShell =
    'group bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:border-[#F57C00] transition-all duration-300 overflow-hidden flex';

export default function ArticleCard({ article, variant = 'default', rank, className = '' }: ArticleCardProps) {
    const href = routes.article(article.slug);

    // -- Compact: thumbnail + title, used in sidebars -----------------------
    if (variant === 'compact') {
        return (
            <Link href={href} className={`group flex gap-3 items-start ${className}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={article.coverImage}
                    alt={article.title}
                    loading="lazy"
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 group-hover:text-[#F57C00] transition-colors">
                        {article.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {timeAgo(article.publishedAt)}
                    </p>
                </div>
            </Link>
        );
    }

    // -- Ranked: numbered row, used in "Most Viewed" ------------------------
    if (variant === 'ranked') {
        return (
            <Link href={href} className={`group flex gap-4 items-center ${className}`}>
                <span className="text-2xl font-black text-gray-200 group-hover:text-[#F57C00] transition-colors w-8 flex-shrink-0 text-center">
                    {String(rank ?? 0).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 group-hover:text-[#F57C00] transition-colors">
                        {article.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                        {article.category.name} • {formatCount(article.views)} views
                    </p>
                </div>
            </Link>
        );
    }

    // -- Overlay: image background with gradient + text, used in hero -------
    if (variant === 'overlay') {
        return (
            <Link
                href={href}
                className={`group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 block ${className}`}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={article.coverImage}
                    alt={article.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="relative z-10 flex flex-col justify-end h-full p-5">
                    <CategoryBadge category={article.category} className="mb-3 self-start" asLink={false} />
                    <h3 className="text-white font-bold text-lg leading-snug line-clamp-3 drop-shadow">
                        {article.title}
                    </h3>
                    <p className="text-blue-100 text-xs mt-2 inline-flex items-center gap-2">
                        <span>{article.author.name}</span>
                        <span aria-hidden="true">•</span>
                        <span>{formatDate(article.publishedAt)}</span>
                    </p>
                </div>
            </Link>
        );
    }

    // -- Horizontal: image left, content right ------------------------------
    if (variant === 'horizontal') {
        return (
            <article className={`${cardShell} flex-col sm:flex-row ${className}`}>
                <Link href={href} className="sm:w-56 flex-shrink-0 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={article.coverImage}
                        alt={article.title}
                        loading="lazy"
                        className="w-full h-44 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </Link>
                <div className="p-5 flex flex-col flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <CategoryBadge category={article.category} />
                        {article.trending && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#F57C00]">
                                <TrendingUp className="w-3.5 h-3.5" /> Trending
                            </span>
                        )}
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 leading-snug line-clamp-2">
                        <Link href={href} className="hover:text-[#F57C00] transition-colors">
                            {article.title}
                        </Link>
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2 flex-1">{article.excerpt}</p>
                    <ArticleMeta
                        author={article.author}
                        publishedAt={article.publishedAt}
                        readingMinutes={article.readingMinutes}
                        className="mt-4"
                    />
                </div>
            </article>
        );
    }

    // -- Default: vertical card --------------------------------------------
    return (
        <article className={`${cardShell} flex-col ${className}`}>
            <Link href={href} className="relative overflow-hidden block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={article.coverImage}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                    <CategoryBadge category={article.category} asLink={false} />
                </div>
                {article.trending && (
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[11px] font-bold text-white bg-[#F57C00] rounded-full px-2 py-1 shadow">
                        <TrendingUp className="w-3 h-3" /> Trending
                    </span>
                )}
            </Link>
            <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-gray-900 leading-snug line-clamp-2">
                    <Link href={href} className="hover:text-[#F57C00] transition-colors">
                        {article.title}
                    </Link>
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2 flex-1">{article.excerpt}</p>
                {article.primaryLocation && (
                    <p className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-gray-500">
                        <MapPin className="w-3.5 h-3.5 text-[#F57C00]" /> {article.primaryLocation}
                    </p>
                )}
                <ArticleMeta
                    author={article.author}
                    publishedAt={article.publishedAt}
                    readingMinutes={article.readingMinutes}
                    views={article.views}
                    className="mt-4 pt-4 border-t border-gray-100"
                />
            </div>
        </article>
    );
}
