import Link from 'next/link';
import type { Category } from '@/data/blog/types';
import { routes } from '@/lib/blog/config';
import { accent } from './theme';

interface CategoryBadgeProps {
    category: Pick<Category, 'slug' | 'name' | 'accent'>;
    size?: 'sm' | 'md';
    asLink?: boolean;
    className?: string;
}

// Small pill that colour-codes a category. Used on cards and hero overlays.
export default function CategoryBadge({
    category,
    size = 'sm',
    asLink = true,
    className = '',
}: CategoryBadgeProps) {
    const a = accent(category.accent);
    const pad = size === 'sm' ? 'text-[11px] px-2.5 py-1' : 'text-xs px-3 py-1.5';
    const classes = `inline-flex items-center font-bold uppercase tracking-wide rounded-full ${a.soft} ${a.softText} ${pad} ${className}`;

    if (!asLink) return <span className={classes}>{category.name}</span>;
    return (
        <Link href={routes.category(category.slug)} className={`${classes} hover:opacity-80 transition-opacity`}>
            {category.name}
        </Link>
    );
}
