'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import type { Category } from '@/data/blog/types';

// Each homepage tab jumps straight into the universal listing with a filter
// pre-applied (and ticked in the sidebar). Institution-style tabs apply an
// Institution Type filter; topic tabs apply an Education Category filter.
const TAB_FILTER: Record<string, string> = {
    universities: 'institutionType=university',
    colleges: 'institutionType=college',
    'coaching-centers': 'institutionType=coaching',
    schools: 'institutionType=school',
    institutes: 'institutionType=institute',
    libraries: 'institutionType=library',
    'study-abroad': 'category=study-abroad',
    scholarships: 'category=scholarships',
    admissions: 'category=admissions',
    'career-guidance': 'category=career-guidance',
};

// Tabs jump into the canonical /blog/all listing so "Clear all" keeps the user
// on the all-articles view instead of bouncing back to the homepage.
function tabHref(slug: string): string {
    return `/blog/all?${TAB_FILTER[slug] ?? `category=${slug}`}`;
}

// Horizontal category bar: each tab is a quick link into a pre-applied filter,
// with a "Search Blogs" field and a Clear Filters action that appears only when
// there is search text to clear.
export default function CategoryNavBar({ categories }: { categories: Category[] }) {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const hasSearch = search.trim() !== '';

    function submitSearch(e: React.FormEvent) {
        e.preventDefault();
        const q = search.trim();
        if (q) router.push(`/blog/all?q=${encodeURIComponent(q)}`);
    }

    const searchForm = (full = false) => (
        <form onSubmit={submitSearch} role="search" className={full ? 'flex-1' : 'w-60'}>
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-1.5 focus-within:ring-2 focus-within:ring-[#F57C00] focus-within:border-transparent">
                <Search className="w-4 h-4 text-gray-400 flex-shrink-0" aria-hidden="true" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Blogs"
                    aria-label="Search blogs"
                    className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 px-2 py-2"
                />
                {hasSearch && (
                    <button
                        type="button"
                        onClick={() => setSearch('')}
                        aria-label="Clear search text"
                        className="p-1 text-gray-400 hover:text-gray-700 flex-shrink-0"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>
        </form>
    );

    const clearBtn = hasSearch ? (
        <button
            onClick={() => setSearch('')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[#F57C00] whitespace-nowrap"
        >
            <X className="w-4 h-4" /> Clear Filters
        </button>
    ) : null;

    return (
        <div className="sticky top-16 md:top-[4.5rem] z-40 bg-white border-b border-gray-200 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="flex items-center gap-3">
                    {/* Scrollable tabs — each jumps to a pre-applied filter */}
                    <nav
                        aria-label="Browse blog categories"
                        className="flex-1 flex items-center gap-1 overflow-x-auto py-2.5"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {categories.map((cat) => (
                            <Link
                                key={cat.slug}
                                href={tabHref(cat.slug)}
                                className="flex-shrink-0 px-3.5 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#F57C00] whitespace-nowrap transition-colors"
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop search + clear */}
                    <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
                        {searchForm()}
                        {clearBtn}
                    </div>
                </div>

                {/* Mobile search + clear */}
                <div className="lg:hidden flex items-center gap-3 pb-3">
                    {searchForm(true)}
                    {clearBtn}
                </div>
            </div>
        </div>
    );
}
