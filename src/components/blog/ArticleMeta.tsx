import Link from 'next/link';
import { Clock, Eye } from 'lucide-react';
import type { Author } from '@/data/blog/types';
import { routes } from '@/lib/blog/config';
import { formatDate, formatCount } from '@/lib/blog/format';

interface ArticleMetaProps {
    author: Pick<Author, 'slug' | 'name' | 'avatar'>;
    publishedAt: string;
    readingMinutes?: number;
    views?: number;
    showAvatar?: boolean;
    avatarSize?: number;
    className?: string;
    linkAuthor?: boolean;
}

// Compact byline: avatar, author link, date and (optionally) reading time/views.
export default function ArticleMeta({
    author,
    publishedAt,
    readingMinutes,
    views,
    showAvatar = true,
    avatarSize = 32,
    className = '',
    linkAuthor = true,
}: ArticleMetaProps) {
    const name = linkAuthor ? (
        <Link href={routes.author(author.slug)} className="font-semibold text-gray-800 hover:text-[#F57C00] transition-colors">
            {author.name}
        </Link>
    ) : (
        <span className="font-semibold text-gray-800">{author.name}</span>
    );

    return (
        <div className={`flex items-center gap-2.5 text-xs text-gray-500 ${className}`}>
            {showAvatar && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={author.avatar}
                    alt={author.name}
                    width={avatarSize}
                    height={avatarSize}
                    loading="lazy"
                    className="rounded-full object-cover flex-shrink-0 ring-2 ring-white shadow-sm"
                    style={{ width: avatarSize, height: avatarSize }}
                />
            )}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                {name}
                <span className="text-gray-300" aria-hidden="true">•</span>
                <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
                {readingMinutes !== undefined && (
                    <>
                        <span className="text-gray-300" aria-hidden="true">•</span>
                        <span className="inline-flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {readingMinutes} min read
                        </span>
                    </>
                )}
                {views !== undefined && (
                    <>
                        <span className="text-gray-300" aria-hidden="true">•</span>
                        <span className="inline-flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" /> {formatCount(views)}
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}
