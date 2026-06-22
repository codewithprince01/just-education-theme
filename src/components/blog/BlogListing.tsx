'use client';

import { useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    SlidersHorizontal, X, Search, Check, ChevronDown, ChevronLeft, ChevronRight,
} from 'lucide-react';
import type { CardArticle } from '@/data/blog/types';
import type { Facet, InitialFilters, ListingFacets, SortKey } from '@/lib/blog/listing-types';
import { SORT_OPTIONS, inReadingBucket, serializeFilters } from '@/lib/blog/listing-types';
import ArticleCard from './ArticleCard';
import EmptyState from './EmptyState';

interface BlogListingProps {
    articles: CardArticle[];
    facets: ListingFacets;
    initial?: InitialFilters;
    basePath: string;
    showCategoryFilter?: boolean;
    pageSize?: number;
    initialPage?: number;
}

type ArrayKey =
    | 'contentTypes' | 'categories' | 'countries' | 'states' | 'cities'
    | 'institutionTypes' | 'exams' | 'readingTime';

const GROUP_KEYS: ArrayKey[] = [
    'contentTypes', 'categories', 'countries', 'states', 'cities', 'institutionTypes', 'exams', 'readingTime',
];

function toggle(list: string[], value: string): string[] {
    return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function searchable(a: CardArticle): string {
    return [
        a.title, a.excerpt, a.category.name, a.author.name, a.primaryLocation ?? '',
        ...a.resolvedTags.map((t) => t.name),
    ].join(' ').toLowerCase();
}

function sortCards(list: CardArticle[], sort: SortKey): CardArticle[] {
    const arr = [...list];
    const t = (s: string) => Date.parse(s);
    switch (sort) {
        case 'all': return arr.sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || Number(!!b.trending) - Number(!!a.trending) || t(b.publishedAt) - t(a.publishedAt));
        case 'oldest': return arr.sort((a, b) => t(a.publishedAt) - t(b.publishedAt));
        case 'popular': return arr.sort((a, b) => b.views - a.views);
        case 'most-popular': return arr.sort((a, b) => b.likes - a.likes);
        case 'shared': return arr.sort((a, b) => b.shares - a.shares);
        case 'trending': return arr.sort((a, b) => Number(!!b.trending) - Number(!!a.trending) || b.views - a.views);
        case 'rating': return arr.sort((a, b) => b.rating - a.rating || (b.ratingCount ?? 0) - (a.ratingCount ?? 0));
        case 'title-asc': return arr.sort((a, b) => a.title.localeCompare(b.title));
        case 'recently-updated': return arr.sort((a, b) => t(b.updatedAt ?? b.publishedAt) - t(a.updatedAt ?? a.publishedAt));
        default: return arr.sort((a, b) => t(b.publishedAt) - t(a.publishedAt));
    }
}

// Numbered page list with ellipses, e.g. [1, '…', 4, 5, 6, '…', 12].
function pageList(current: number, total: number): (number | 'ellipsis')[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const out: (number | 'ellipsis')[] = [1];
    if (current > 3) out.push('ellipsis');
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) out.push(i);
    if (current < total - 2) out.push('ellipsis');
    out.push(total);
    return out;
}

export default function BlogListing({
    articles,
    facets,
    initial,
    basePath,
    showCategoryFilter = true,
    pageSize = 9,
    initialPage = 1,
}: BlogListingProps) {
    const router = useRouter();

    const initialJson = JSON.stringify(initial ?? null);
    const current = useMemo<Required<Pick<InitialFilters, ArrayKey>> & { q: string; sort: SortKey }>(
        () => ({
            contentTypes: initial?.contentTypes ?? [],
            categories: initial?.categories ?? [],
            countries: initial?.countries ?? [],
            states: initial?.states ?? [],
            cities: initial?.cities ?? [],
            institutionTypes: initial?.institutionTypes ?? [],
            exams: initial?.exams ?? [],
            readingTime: initial?.readingTime ?? [],
            q: initial?.q ?? '',
            sort: initial?.sort ?? 'all',
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [initialJson],
    );

    // Filter changes drop the page (back to page 1); page changes keep filters.
    function navigate(next: InitialFilters, replace = false) {
        const qs = serializeFilters(next);
        const url = qs ? `${basePath}?${qs}` : basePath;
        if (replace) router.replace(url, { scroll: false });
        else router.push(url, { scroll: false });
    }
    function toggleGroup(key: ArrayKey, slug: string) {
        navigate({ ...current, [key]: toggle(current[key], slug) });
    }
    function setSort(sort: SortKey) {
        navigate({ ...current, sort });
    }
    function clearAll() {
        router.push(basePath, { scroll: false });
    }
    function goToPage(n: number) {
        const qs = serializeFilters(current, n);
        router.push(qs ? `${basePath}?${qs}` : basePath, { scroll: false });
        if (typeof window !== 'undefined') resultsTop.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Search box — controlled, debounced, resyncs on external URL change.
    const [qInput, setQInput] = useState(current.q);
    const [syncedQ, setSyncedQ] = useState(current.q);
    if (current.q !== syncedQ) {
        setSyncedQ(current.q);
        setQInput(current.q);
    }
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    function onSearchChange(v: string) {
        setQInput(v);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => navigate({ ...current, q: v.trim() || undefined }, true), 400);
    }

    const [drawerOpen, setDrawerOpen] = useState(false);
    const resultsTop = useRef<HTMLDivElement>(null);

    const filtered = useMemo(() => {
        const q = current.q.trim().toLowerCase();
        const result = articles.filter((a) => {
            if (q && !searchable(a).includes(q)) return false;
            if (current.contentTypes.length && !current.contentTypes.includes(a.contentType)) return false;
            if (showCategoryFilter && current.categories.length && !current.categories.includes(a.category.slug)) return false;
            const locs = a.locationSlugs ?? [];
            if (current.countries.length && !current.countries.some((s) => locs.includes(s))) return false;
            if (current.states.length && !current.states.some((s) => locs.includes(s))) return false;
            if (current.cities.length && !current.cities.some((s) => locs.includes(s))) return false;
            if (current.institutionTypes.length && !current.institutionTypes.some((tp) => a.institutionTypes.includes(tp))) return false;
            if (current.exams.length && !current.exams.some((s) => a.examSlugs.includes(s))) return false;
            if (current.readingTime.length && !current.readingTime.some((b) => inReadingBucket(a.readingMinutes, b))) return false;
            return true;
        });
        return sortCards(result, current.sort);
    }, [articles, current, showCategoryFilter]);

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(Math.max(1, initialPage), totalPages);
    const shown = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

    const facetForGroup: Record<ArrayKey, Facet[]> = {
        contentTypes: facets.contentTypes,
        categories: facets.categories,
        countries: facets.countries,
        states: facets.states,
        cities: facets.cities,
        institutionTypes: facets.institutionTypes,
        exams: facets.exams,
        readingTime: facets.readingTime,
    };
    const activeChips = GROUP_KEYS.flatMap((key) => {
        if (key === 'categories' && !showCategoryFilter) return [];
        return current[key].map((slug) => ({ key, slug, label: facetForGroup[key].find((f) => f.slug === slug)?.name ?? slug }));
    });
    const activeCount = activeChips.length + (current.q ? 1 : 0);

    const filterGroups = (
        <>
            <FacetGroup title="Content Type" options={facets.contentTypes} selected={current.contentTypes} onToggle={(s) => toggleGroup('contentTypes', s)} defaultOpen />
            {showCategoryFilter && (
                <FacetGroup title="Education Category" options={facets.categories} selected={current.categories} onToggle={(s) => toggleGroup('categories', s)} initial={8} defaultOpen />
            )}
            <FacetGroup title="Reading Time" options={facets.readingTime} selected={current.readingTime} onToggle={(s) => toggleGroup('readingTime', s)} defaultOpen />
            <FacetGroup title="Institution Type" options={facets.institutionTypes} selected={current.institutionTypes} onToggle={(s) => toggleGroup('institutionTypes', s)} />
            <FacetGroup title="Exams" options={facets.exams} selected={current.exams} onToggle={(s) => toggleGroup('exams', s)} />
            <FacetGroup title="Country" options={facets.countries} selected={current.countries} onToggle={(s) => toggleGroup('countries', s)} />
            <FacetGroup title="State" options={facets.states} selected={current.states} onToggle={(s) => toggleGroup('states', s)} initial={6} />
            <FacetGroup title="City" options={facets.cities} selected={current.cities} onToggle={(s) => toggleGroup('cities', s)} initial={6} />
        </>
    );

    // Filters as separate, vertically-spaced cards (no internal-scroll sidebar).
    const filterStack = (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <h2 className="flex items-center gap-2 text-sm font-bold text-[#0B3C5D] uppercase tracking-wide">
                    <SlidersHorizontal className="w-4 h-4 text-[#F57C00]" /> Filters
                    {activeCount > 0 && (
                        <span className="w-5 h-5 rounded-full bg-[#F57C00] text-white text-[11px] flex items-center justify-center">{activeCount}</span>
                    )}
                </h2>
                {activeCount > 0 && (
                    <button onClick={clearAll} className="text-xs font-semibold text-blue-600 hover:text-[#F57C00] transition-colors">Clear all</button>
                )}
            </div>
            {filterGroups}
        </div>
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            {/* Desktop filters — separate cards, scroll with the page (no inner scroll) */}
            <aside className="hidden lg:block">{filterStack}</aside>

            {/* Results column */}
            <div ref={resultsTop} className="scroll-mt-28">
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
                        <input
                            type="search"
                            value={qInput}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="Search within results…"
                            aria-label="Search within results"
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#F57C00] focus:border-transparent"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => setDrawerOpen(true)} className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-700">
                            <SlidersHorizontal className="w-4 h-4" /> Filters
                            {activeCount > 0 && <span className="ml-0.5 w-5 h-5 rounded-full bg-[#F57C00] text-white text-[11px] flex items-center justify-center">{activeCount}</span>}
                        </button>
                        <label className="sr-only" htmlFor="sort">Sort by</label>
                        <div className="relative">
                            <select
                                id="sort"
                                value={current.sort}
                                onChange={(e) => setSort(e.target.value as SortKey)}
                                className="appearance-none pl-4 pr-9 py-2.5 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-[#F57C00] cursor-pointer"
                            >
                                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>Sort: {o.label}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Result count + active chips */}
                <div className="flex flex-wrap items-center gap-2 mb-5">
                    <p className="text-sm text-gray-500 mr-1"><span className="font-bold text-gray-900">{total}</span> article{total === 1 ? '' : 's'}</p>
                    {current.q && <Chip label={`“${current.q}”`} onRemove={() => navigate({ ...current, q: undefined })} />}
                    {activeChips.map((c) => <Chip key={`${c.key}-${c.slug}`} label={c.label} onRemove={() => toggleGroup(c.key, c.slug)} />)}
                    {activeCount > 0 && <button onClick={clearAll} className="text-xs font-semibold text-blue-600 hover:text-[#F57C00] ml-1">Clear all</button>}
                </div>

                {/* Results */}
                {shown.length === 0 ? (
                    <EmptyState onAction={clearAll} />
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                            {shown.map((a) => <ArticleCard key={a.slug} article={a} />)}
                        </div>

                        {/* Numbered pagination */}
                        {totalPages > 1 && (
                            <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5 mt-10">
                                <button
                                    onClick={() => goToPage(safePage - 1)}
                                    disabled={safePage === 1}
                                    aria-label="Previous page"
                                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-600 hover:border-[#F57C00] hover:text-[#F57C00] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                {pageList(safePage, totalPages).map((p, i) =>
                                    p === 'ellipsis' ? (
                                        <span key={`e${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400">…</span>
                                    ) : (
                                        <button
                                            key={p}
                                            onClick={() => goToPage(p)}
                                            aria-current={p === safePage ? 'page' : undefined}
                                            className={`inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${
                                                p === safePage
                                                    ? 'bg-[#0B3C5D] text-white shadow'
                                                    : 'border border-gray-200 bg-white text-gray-600 hover:border-[#F57C00] hover:text-[#F57C00]'
                                            }`}
                                        >
                                            {p}
                                        </button>
                                    ),
                                )}
                                <button
                                    onClick={() => goToPage(safePage + 1)}
                                    disabled={safePage === totalPages}
                                    aria-label="Next page"
                                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-600 hover:border-[#F57C00] hover:text-[#F57C00] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </nav>
                        )}
                        <p className="text-center text-xs text-gray-400 mt-4">
                            Page {safePage} of {totalPages}
                        </p>
                    </>
                )}
            </div>

            {/* Mobile filter bottom sheet */}
            {drawerOpen && (
                <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
                    <div className="absolute inset-x-0 bottom-0 max-h-[85vh] bg-gray-50 rounded-t-2xl shadow-2xl flex flex-col">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <h2 className="font-bold text-lg text-[#0B3C5D]">Filters</h2>
                            <div className="flex items-center gap-3">
                                {activeCount > 0 && <button onClick={clearAll} className="text-xs font-semibold text-blue-600">Clear all</button>}
                                <button onClick={() => setDrawerOpen(false)} aria-label="Close filters" className="p-1.5 text-gray-500 hover:text-gray-800"><X className="w-5 h-5" /></button>
                            </div>
                        </div>
                        <div className="overflow-y-auto p-4">{filterStack}</div>
                        <div className="p-4 border-t border-gray-200">
                            <button onClick={() => setDrawerOpen(false)} className="w-full py-3 bg-[#F57C00] text-white font-bold rounded-lg">Show {total} result{total === 1 ? '' : 's'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
    return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0B3C5D] bg-blue-50 border border-blue-100 rounded-full pl-3 pr-1.5 py-1">
            {label}
            <button onClick={onRemove} aria-label={`Remove ${label}`} className="hover:bg-blue-200 rounded-full p-0.5"><X className="w-3 h-3" /></button>
        </span>
    );
}

// Collapsible filter section (rendered inside the cohesive panel, divided).
function FacetGroup({
    title, options, selected, onToggle, initial = 100, defaultOpen = false,
}: {
    title: string;
    options: Facet[];
    selected: string[];
    onToggle: (slug: string) => void;
    initial?: number;
    defaultOpen?: boolean;
}) {
    const [open, setOpen] = useState(defaultOpen || selected.length > 0);
    const [expanded, setExpanded] = useState(false);
    if (options.length === 0) return null;

    const visible = expanded ? options : options.slice(0, initial);
    const activeInGroup = options.filter((o) => selected.includes(o.slug)).length;

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between gap-2 px-4 py-3.5 hover:bg-gray-50 transition-colors" aria-expanded={open}>
                <span className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    {title}
                    {activeInGroup > 0 && <span className="w-5 h-5 rounded-full bg-[#F57C00] text-white text-[11px] flex items-center justify-center">{activeInGroup}</span>}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div className="px-4 pb-3.5">
                    <ul className="space-y-0.5">
                        {visible.map((o) => {
                            const on = selected.includes(o.slug);
                            return (
                                <li key={o.slug}>
                                    <button onClick={() => onToggle(o.slug)} className="flex items-center gap-2.5 w-full text-left py-1.5 px-1 rounded-md hover:bg-orange-50/60 group transition-colors">
                                        <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${on ? 'bg-[#F57C00] border-[#F57C00]' : 'border-gray-300 group-hover:border-[#F57C00]'}`}>
                                            {on && <Check className="w-3 h-3 text-white" />}
                                        </span>
                                        <span className={`text-sm flex-1 ${on ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>{o.name}</span>
                                        <span className="text-xs text-gray-400 tabular-nums">{o.count}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    {options.length > initial && (
                        <button onClick={() => setExpanded((v) => !v)} className="text-xs font-semibold text-blue-600 hover:text-[#F57C00] mt-2 px-1">
                            {expanded ? 'Show less' : `Show all ${options.length}`}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
