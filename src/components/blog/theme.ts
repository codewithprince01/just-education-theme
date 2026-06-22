import type { Category } from '@/data/blog/types';

// Accent classes are written as COMPLETE literal strings so Tailwind v4's
// source scanner can detect them (it cannot see dynamically concatenated
// fragments). Each accent maps to a small, consistent set of utilities that
// stay within the Just Education palette (brand navy #0B3C5D + orange #F57C00,
// plus complementary tints).
export interface AccentClasses {
    /** soft icon/badge background */
    soft: string;
    /** text colour on soft background */
    softText: string;
    /** solid background (filled chips, dots) */
    solid: string;
    /** card hover border */
    hoverBorder: string;
    /** ring used on category tiles */
    ring: string;
}

export const ACCENTS: Record<Category['accent'], AccentClasses> = {
    navy: {
        soft: 'bg-blue-50',
        softText: 'text-[#0B3C5D]',
        solid: 'bg-[#0B3C5D]',
        hoverBorder: 'hover:border-[#0B3C5D]',
        ring: 'ring-[#0B3C5D]/15',
    },
    orange: {
        soft: 'bg-orange-50',
        softText: 'text-[#F57C00]',
        solid: 'bg-[#F57C00]',
        hoverBorder: 'hover:border-[#F57C00]',
        ring: 'ring-orange-200',
    },
    teal: {
        soft: 'bg-teal-50',
        softText: 'text-teal-600',
        solid: 'bg-teal-600',
        hoverBorder: 'hover:border-teal-500',
        ring: 'ring-teal-200',
    },
    blue: {
        soft: 'bg-sky-50',
        softText: 'text-sky-600',
        solid: 'bg-sky-600',
        hoverBorder: 'hover:border-sky-500',
        ring: 'ring-sky-200',
    },
    purple: {
        soft: 'bg-purple-50',
        softText: 'text-purple-600',
        solid: 'bg-purple-600',
        hoverBorder: 'hover:border-purple-500',
        ring: 'ring-purple-200',
    },
    green: {
        soft: 'bg-green-50',
        softText: 'text-green-700',
        solid: 'bg-green-600',
        hoverBorder: 'hover:border-green-500',
        ring: 'ring-green-200',
    },
    rose: {
        soft: 'bg-rose-50',
        softText: 'text-rose-600',
        solid: 'bg-rose-600',
        hoverBorder: 'hover:border-rose-500',
        ring: 'ring-rose-200',
    },
    amber: {
        soft: 'bg-amber-50',
        softText: 'text-amber-700',
        solid: 'bg-amber-500',
        hoverBorder: 'hover:border-amber-500',
        ring: 'ring-amber-200',
    },
};

export function accent(a: Category['accent'] = 'navy'): AccentClasses {
    return ACCENTS[a] ?? ACCENTS.navy;
}
