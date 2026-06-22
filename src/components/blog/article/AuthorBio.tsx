import Link from 'next/link';
import { Globe, ArrowRight, FileText } from 'lucide-react';
import type { Author } from '@/data/blog/types';
import { routes } from '@/lib/blog/config';
import { XIcon, LinkedInIcon } from '@/components/blog/BrandIcons';
import FollowButton from './FollowButton';

// Author profile card shown beneath the article body.
export default function AuthorBio({ author, articleCount }: { author: Author; articleCount?: number }) {
    return (
        <section className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row gap-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={author.avatar}
                    alt={author.name}
                    width={80}
                    height={80}
                    loading="lazy"
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-md flex-shrink-0"
                />
                <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wide text-[#F57C00]">Written &amp; reviewed by</p>
                            <Link href={routes.author(author.slug)} className="text-xl font-extrabold text-[#0B3C5D] hover:text-[#F57C00] transition-colors">
                                {author.name}
                            </Link>
                            <p className="text-sm text-gray-500 inline-flex items-center gap-2">
                                {author.role}
                                {articleCount ? (
                                    <span className="inline-flex items-center gap-1 text-gray-400"><FileText className="w-3.5 h-3.5" /> {articleCount} articles</span>
                                ) : null}
                            </p>
                        </div>
                        <FollowButton authorSlug={author.slug} authorName={author.name} />
                    </div>
                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">{author.bio}</p>

                    <div className="flex flex-wrap items-center gap-2 mt-4">
                        {author.expertise.map((e) => (
                            <span key={e} className="text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-full px-3 py-1">
                                {e}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                        {author.social?.twitter && (
                            <a href={`https://twitter.com/${author.social.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-gray-400 hover:text-[#0B3C5D]">
                                <XIcon className="w-4 h-4" />
                            </a>
                        )}
                        {author.social?.linkedin && (
                            <a href={`https://www.linkedin.com/in/${author.social.linkedin}`} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-[#0B3C5D]">
                                <LinkedInIcon className="w-4 h-4" />
                            </a>
                        )}
                        {author.social?.website && (
                            <a href={author.social.website} target="_blank" rel="noopener noreferrer" aria-label="Website" className="text-gray-400 hover:text-[#0B3C5D]">
                                <Globe className="w-4 h-4" />
                            </a>
                        )}
                        <Link href={routes.author(author.slug)} className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-[#F57C00]">
                            All articles <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
