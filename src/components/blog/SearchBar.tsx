'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, TrendingUp, History, FileText, Folder, Tag as TagIcon, Building2, X } from 'lucide-react';
import type { Suggestion } from '@/lib/blog/listing-types';

const RECENT_KEY = 'je-recent-searches';

interface SearchBarProps {
    index: Suggestion[];
    trending?: string[];
    size?: 'lg' | 'md';
    placeholder?: string;
    defaultValue?: string;
    className?: string;
}

const TYPE_ICON: Record<Suggestion['type'], React.ReactNode> = {
    article: <FileText className="w-4 h-4 text-gray-400" />,
    category: <Folder className="w-4 h-4 text-[#F57C00]" />,
    tag: <TagIcon className="w-4 h-4 text-blue-500" />,
    institution: <Building2 className="w-4 h-4 text-teal-500" />,
};

// Smart search with autocomplete suggestions and trending searches.
// Submitting navigates to /blog?q=… (the listing handles the query).
export default function SearchBar({
    index,
    trending = [],
    size = 'lg',
    placeholder = 'Search articles, exams, colleges, scholarships…',
    defaultValue = '',
    className = '',
}: SearchBarProps) {
    const router = useRouter();
    const [value, setValue] = useState(defaultValue);
    const [open, setOpen] = useState(false);
    const [recent, setRecent] = useState<string[]>([]);
    const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        // Hydration-safe read of recent searches from localStorage (post-mount).
        try {
            const stored = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
            // eslint-disable-next-line react-hooks/set-state-in-effect
            if (Array.isArray(stored)) setRecent(stored.slice(0, 5));
        } catch { /* ignore */ }
    }, []);

    const matches = useMemo(() => {
        const q = value.trim().toLowerCase();
        if (!q) return [];
        return index.filter((s) => s.label.toLowerCase().includes(q)).slice(0, 7);
    }, [value, index]);

    function rememberRecent(term: string) {
        setRecent((prev) => {
            const next = [term, ...prev.filter((r) => r.toLowerCase() !== term.toLowerCase())].slice(0, 5);
            try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch { /* ignore */ }
            return next;
        });
    }

    function clearRecent() {
        setRecent([]);
        try { localStorage.removeItem(RECENT_KEY); } catch { /* ignore */ }
    }

    function submit(q: string) {
        const term = q.trim();
        if (term) rememberRecent(term);
        router.push(term ? `/blog/all?q=${encodeURIComponent(term)}` : '/blog/all');
        setOpen(false);
    }

    const pad = size === 'lg' ? 'px-5 py-4 text-base' : 'px-4 py-2.5 text-sm';

    return (
        <div className={`relative ${className}`}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    submit(value);
                }}
                role="search"
            >
                <div className="flex items-center bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-[#F57C00]">
                    <Search className="w-5 h-5 text-slate-400 ml-4 flex-shrink-0" aria-hidden="true" />
                    <input
                        type="search"
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            setOpen(true);
                        }}
                        onFocus={() => setOpen(true)}
                        onBlur={() => {
                            blurTimer.current = setTimeout(() => setOpen(false), 150);
                        }}
                        placeholder={placeholder}
                        aria-label="Search the blog"
                        className={`flex-1 bg-transparent outline-none text-slate-700 placeholder-slate-400 ${pad}`}
                    />
                    {value && (
                        <button
                            type="button"
                            onClick={() => setValue('')}
                            className="p-1 mr-1 text-slate-400 hover:text-slate-600"
                            aria-label="Clear search"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                    <button
                        type="submit"
                        className="m-1.5 px-5 py-2.5 bg-[#F57C00] hover:bg-[#E67300] text-white font-bold rounded-lg text-sm transition-colors whitespace-nowrap"
                    >
                        Search
                    </button>
                </div>
            </form>

            {open && (
                <div
                    className="absolute z-30 mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
                    onMouseDown={() => blurTimer.current && clearTimeout(blurTimer.current)}
                >
                    {matches.length > 0 ? (
                        <ul className="py-2 max-h-80 overflow-auto">
                            {matches.map((s) => (
                                <li key={`${s.type}-${s.href}`}>
                                    <Link
                                        href={s.href}
                                        onClick={() => setOpen(false)}
                                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                                    >
                                        {TYPE_ICON[s.type]}
                                        <span className="text-sm text-gray-700 flex-1 truncate">{s.label}</span>
                                        <span className="text-[10px] uppercase font-bold text-gray-300">{s.type}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-4 space-y-4">
                            {recent.length > 0 && (
                                <div>
                                    <div className="flex items-center justify-between mb-2.5">
                                        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-400">
                                            <History className="w-3.5 h-3.5" /> Recent searches
                                        </p>
                                        <button type="button" onClick={clearRecent} className="text-[11px] font-semibold text-blue-600 hover:text-[#F57C00]">Clear</button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {recent.map((t) => (
                                            <button
                                                key={t}
                                                type="button"
                                                onClick={() => submit(t)}
                                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-orange-50 hover:text-[#F57C00] border border-gray-200 hover:border-orange-200 rounded-full px-3 py-1.5 transition-colors"
                                            >
                                                <History className="w-3 h-3 text-gray-400" /> {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {trending.length > 0 && (
                                <div>
                                    <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-400 mb-2.5">
                                        <TrendingUp className="w-3.5 h-3.5" /> Trending searches
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {trending.map((t) => (
                                            <button
                                                key={t}
                                                type="button"
                                                onClick={() => submit(t)}
                                                className="text-xs font-semibold text-gray-600 bg-gray-50 hover:bg-orange-50 hover:text-[#F57C00] border border-gray-200 hover:border-orange-200 rounded-full px-3 py-1.5 transition-colors"
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
