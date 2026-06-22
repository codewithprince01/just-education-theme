'use client';

import { useEffect, useState } from 'react';
import {
    Heart, Bookmark, Share2, Printer, FileDown, Flag, Eye,
    Link2, X, Check,
} from 'lucide-react';
import { formatCount } from '@/lib/blog/format';
import { XIcon, FacebookIcon, LinkedInIcon } from '@/components/blog/BrandIcons';

interface ArticleActionsProps {
    slug: string;
    title: string;
    url: string;
    likes: number;
    views: number;
    layout?: 'bar' | 'rail';
}

const REPORT_REASONS = ['Inaccurate information', 'Outdated content', 'Spam or misleading', 'Copyright concern', 'Other'];

// Reader actions. Like/bookmark persist to localStorage (no backend in this
// frontend build); Save as PDF uses the browser's print-to-PDF.
export default function ArticleActions({ slug, title, url, likes, views, layout = 'bar' }: ArticleActionsProps) {
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);
    const [reportOpen, setReportOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Hydration-safe read of persisted state: localStorage is only
        // available post-mount, so reading it here (not during render) is the
        // correct pattern despite the set-state-in-effect lint rule.
        try {
            /* eslint-disable react-hooks/set-state-in-effect */
            setLiked(localStorage.getItem(`je-like-${slug}`) === '1');
            const marks: string[] = JSON.parse(localStorage.getItem('je-bookmarks') || '[]');
            setSaved(marks.includes(slug));
            /* eslint-enable react-hooks/set-state-in-effect */
        } catch { /* ignore storage errors */ }
    }, [slug]);

    function toggleLike() {
        setLiked((v) => {
            const next = !v;
            try { localStorage.setItem(`je-like-${slug}`, next ? '1' : '0'); } catch {}
            return next;
        });
    }

    function toggleSave() {
        setSaved((v) => {
            const next = !v;
            try {
                const marks: string[] = JSON.parse(localStorage.getItem('je-bookmarks') || '[]');
                const updated = next ? [...new Set([...marks, slug])] : marks.filter((m) => m !== slug);
                localStorage.setItem('je-bookmarks', JSON.stringify(updated));
            } catch {}
            return next;
        });
    }

    async function nativeShare() {
        if (typeof navigator !== 'undefined' && navigator.share) {
            try { await navigator.share({ title, url }); return; } catch {}
        }
        setShareOpen((v) => !v);
    }

    function copyLink() {
        try {
            navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {}
    }

    const enc = encodeURIComponent;
    const shareLinks = [
        { icon: XIcon, label: 'X', href: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}` },
        { icon: FacebookIcon, label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
        { icon: LinkedInIcon, label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    ];

    const wrap =
        layout === 'rail'
            ? 'flex lg:flex-col items-center gap-2'
            : 'flex flex-wrap items-center gap-2';

    const btn = 'inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border text-sm font-semibold transition-colors';

    return (
        <div className="relative">
            <div className={wrap}>
                <button
                    onClick={toggleLike}
                    aria-pressed={liked}
                    className={`${btn} ${liked ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-white border-gray-200 text-gray-600 hover:border-rose-300 hover:text-rose-600'}`}
                >
                    <Heart className={`w-4 h-4 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    {formatCount(likes + (liked ? 1 : 0))}
                </button>

                <button
                    onClick={toggleSave}
                    aria-pressed={saved}
                    className={`${btn} ${saved ? 'bg-orange-50 border-orange-200 text-[#F57C00]' : 'bg-white border-gray-200 text-gray-600 hover:border-orange-300 hover:text-[#F57C00]'}`}
                >
                    <Bookmark className={`w-4 h-4 ${saved ? 'fill-[#F57C00] text-[#F57C00]' : ''}`} />
                    <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
                </button>

                <button onClick={nativeShare} className={`${btn} bg-white border-gray-200 text-gray-600 hover:border-[#0B3C5D] hover:text-[#0B3C5D]`}>
                    <Share2 className="w-4 h-4" /> <span className="hidden sm:inline">Share</span>
                </button>

                <button onClick={() => window.print()} className={`${btn} bg-white border-gray-200 text-gray-600 hover:border-[#0B3C5D] hover:text-[#0B3C5D]`}>
                    <Printer className="w-4 h-4" /> <span className="hidden sm:inline">Print</span>
                </button>

                <button onClick={() => window.print()} className={`${btn} bg-white border-gray-200 text-gray-600 hover:border-[#0B3C5D] hover:text-[#0B3C5D]`} title="Save as PDF via your browser's print dialog">
                    <FileDown className="w-4 h-4" /> <span className="hidden sm:inline">PDF</span>
                </button>

                <button onClick={() => setReportOpen(true)} className={`${btn} bg-white border-gray-200 text-gray-400 hover:border-amber-300 hover:text-amber-600`}>
                    <Flag className="w-4 h-4" /> <span className="hidden sm:inline">Report</span>
                </button>

                <span className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-gray-400">
                    <Eye className="w-4 h-4" /> {formatCount(views)} views
                </span>
            </div>

            {/* Share popover */}
            {shareOpen && (
                <div className="absolute z-20 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-3 flex items-center gap-2">
                    {shareLinks.map((s) => (
                        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${s.label}`} className="w-9 h-9 rounded-lg bg-gray-50 hover:bg-[#0B3C5D] hover:text-white text-gray-600 flex items-center justify-center transition-colors">
                            <s.icon className="w-4 h-4" />
                        </a>
                    ))}
                    <button onClick={copyLink} aria-label="Copy link" className="w-9 h-9 rounded-lg bg-gray-50 hover:bg-[#F57C00] hover:text-white text-gray-600 flex items-center justify-center transition-colors">
                        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Link2 className="w-4 h-4" />}
                    </button>
                </div>
            )}

            {/* Report modal */}
            {reportOpen && (
                <ReportModal onClose={() => setReportOpen(false)} title={title} />
            )}
        </div>
    );
}

function ReportModal({ onClose, title }: { onClose: () => void; title: string }) {
    const [reason, setReason] = useState('');
    const [sent, setSent] = useState(false);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Report article">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
                    <X className="w-5 h-5" />
                </button>
                {sent ? (
                    <div className="text-center py-6">
                        <div className="w-12 h-12 mx-auto rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-3">
                            <Check className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900">Thanks for the report</h3>
                        <p className="text-sm text-gray-500 mt-1">Our editors will review this article.</p>
                        <button onClick={onClose} className="mt-5 px-5 py-2.5 bg-[#F57C00] text-white font-bold rounded-lg text-sm">Done</button>
                    </div>
                ) : (
                    <>
                        <h3 className="font-bold text-lg text-[#0B3C5D]">Report article</h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-1">“{title}”</p>
                        <div className="space-y-2 mt-4">
                            {REPORT_REASONS.map((r) => (
                                <label key={r} className="flex items-center gap-3 p-2.5 rounded-lg border border-gray-200 cursor-pointer hover:border-[#F57C00] has-[:checked]:border-[#F57C00] has-[:checked]:bg-orange-50">
                                    <input type="radio" name="reason" value={r} checked={reason === r} onChange={() => setReason(r)} className="accent-[#F57C00]" />
                                    <span className="text-sm text-gray-700">{r}</span>
                                </label>
                            ))}
                        </div>
                        <button
                            disabled={!reason}
                            onClick={() => setSent(true)}
                            className="w-full mt-5 py-2.5 bg-[#F57C00] hover:bg-[#E67300] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg text-sm transition-colors"
                        >
                            Submit report
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
