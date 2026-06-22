import Link from 'next/link';
import type { Category } from '@/data/blog/types';
import { routes } from '@/lib/blog/config';
import { accent } from './theme';
import { CategoryIcon } from './icons';

interface CategoryExplorerProps {
    categories: Category[];
    counts: Record<string, number>;
    limit?: number;
}

// Compact, horizontal category tiles: icon + name + count on a single row.
// Much lower height than the previous oversized cards — 4 / 2 / 1 columns.
export default function CategoryExplorer({ categories, counts, limit }: CategoryExplorerProps) {
    const list = limit ? categories.slice(0, limit) : categories;
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {list.map((cat) => {
                const a = accent(cat.accent);
                const count = counts[cat.slug] ?? 0;
                return (
                    <Link
                        key={cat.slug}
                        href={routes.category(cat.slug)}
                        className={`group flex items-center gap-3 bg-white rounded-xl border border-gray-200 px-3.5 py-3 shadow-sm hover:shadow-md ${a.hoverBorder} transition-all`}
                    >
                        <span className={`w-9 h-9 rounded-lg ${a.soft} ${a.softText} flex items-center justify-center flex-shrink-0`}>
                            <CategoryIcon name={cat.icon} className="w-4 h-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                            <span className="block text-sm font-bold text-gray-900 truncate group-hover:text-[#F57C00] transition-colors">
                                {cat.name}
                            </span>
                            <span className="block text-xs text-gray-400">
                                {count} article{count === 1 ? '' : 's'}
                            </span>
                        </span>
                    </Link>
                );
            })}
        </div>
    );
}
