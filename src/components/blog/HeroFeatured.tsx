import Link from 'next/link';
import { Star, ArrowRight, Clock } from 'lucide-react';
import type { CardArticle } from '@/data/blog/types';
import { routes } from '@/lib/blog/config';
import { formatDate } from '@/lib/blog/format';
import CategoryBadge from './CategoryBadge';
import ArticleCard from './ArticleCard';

// Premium hero: one large lead story + a stack of secondary featured stories,
// styled like a modern publishing front page.
export default function HeroFeatured({ articles }: { articles: CardArticle[] }) {
    if (articles.length === 0) return null;
    const [lead, ...rest] = articles;
    const secondary = rest.slice(0, 4);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Lead story */}
            <Link
                href={routes.article(lead.slug)}
                className="group lg:col-span-7 relative rounded-2xl overflow-hidden shadow-lg min-h-[420px] lg:min-h-[520px] block"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={lead.coverImage}
                    alt={lead.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
                <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-3">
                        <CategoryBadge category={lead.category} size="md" asLink={false} />
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-300">
                            <Star className="w-3.5 h-3.5 fill-amber-300" /> Featured
                        </span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black text-white leading-tight max-w-2xl drop-shadow">
                        {lead.title}
                    </h2>
                    <p className="text-blue-100 mt-3 max-w-xl line-clamp-2 text-sm md:text-base">{lead.excerpt}</p>
                    <div className="flex items-center gap-3 mt-5 text-sm text-blue-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={lead.author.avatar} alt={lead.author.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-white/40" loading="lazy" />
                        <span className="font-semibold text-white">{lead.author.name}</span>
                        <span aria-hidden="true">•</span>
                        <span>{formatDate(lead.publishedAt)}</span>
                        <span aria-hidden="true">•</span>
                        <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {lead.readingMinutes} min</span>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white w-fit border-b-2 border-[#F57C00] pb-0.5 group-hover:gap-3 transition-all">
                        Read the story <ArrowRight className="w-4 h-4" />
                    </span>
                </div>
            </Link>

            {/* Secondary grid (up to 4) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {secondary.map((a) => (
                    <ArticleCard key={a.slug} article={a} variant="overlay" className="min-h-[180px] lg:min-h-[250px]" />
                ))}
            </div>
        </div>
    );
}
