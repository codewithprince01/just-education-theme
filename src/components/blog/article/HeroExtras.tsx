import { CheckCircle2, Sparkles, ShieldCheck, BadgeCheck, RefreshCw, Zap } from 'lucide-react';
import { formatDate } from '@/lib/blog/format';

// "What you'll learn" key-takeaways box for the smart hero.
export function KeyTakeaways({ items }: { items: string[] }) {
    if (!items || items.length === 0) return null;
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#0B3C5D] mb-4">
                <Sparkles className="w-4 h-4 text-[#F57C00]" /> What you&apos;ll learn
            </h2>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {items.map((it, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{it}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// AI/GEO-friendly direct answer block — surfaced near the top for quick scanning
// and for answer engines (ChatGPT, Perplexity, Gemini, Google AI Overviews).
export function QuickAnswer({ text }: { text: string }) {
    if (!text) return null;
    return (
        <div className="rounded-2xl border border-[#0B3C5D]/15 bg-gradient-to-br from-blue-50 to-white p-5 md:p-6">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0B3C5D] mb-2">
                <Zap className="w-4 h-4 text-[#F57C00]" /> Quick Answer
            </p>
            <p className="text-gray-800 text-[15px] md:text-base leading-relaxed font-medium">{text}</p>
        </div>
    );
}

// Trust signals: fact-checked, expert-reviewed, last-updated.
export function TrustBadges({ updatedAt, reviewer }: { updatedAt?: string; reviewer?: string }) {
    return (
        <div className="flex flex-wrap items-center gap-2.5 mt-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-full px-3 py-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Fact-checked
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B3C5D] bg-blue-50 border border-blue-200 rounded-full px-3 py-1.5">
                <BadgeCheck className="w-3.5 h-3.5" /> Expert reviewed{reviewer ? ` · ${reviewer}` : ''}
            </span>
            {updatedAt && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5">
                    <RefreshCw className="w-3.5 h-3.5" /> Updated {formatDate(updatedAt)}
                </span>
            )}
        </div>
    );
}
