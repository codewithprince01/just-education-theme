import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    /** lucide icon element, e.g. <Flame className="w-5 h-5" /> */
    icon?: React.ReactNode;
    href?: string;
    linkLabel?: string;
    className?: string;
}

// Consistent section header used across the blog: orange accent bar, navy
// title, optional "view all" link — mirrors the existing Exams page headings.
export default function SectionHeading({
    title,
    subtitle,
    icon,
    href,
    linkLabel = 'View all',
    className = '',
}: SectionHeadingProps) {
    return (
        <div className={`flex items-end justify-between gap-4 mb-6 ${className}`}>
            <div>
                <div className="flex items-center gap-2.5">
                    <span className="h-6 w-1.5 rounded-full bg-[#F57C00]" aria-hidden="true" />
                    {icon && <span className="text-[#F57C00]">{icon}</span>}
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B3C5D] tracking-tight">
                        {title}
                    </h2>
                </div>
                {subtitle && <p className="text-gray-500 text-sm mt-2 max-w-2xl">{subtitle}</p>}
            </div>
            {href && (
                <Link
                    href={href}
                    className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-[#F57C00] transition-colors whitespace-nowrap"
                >
                    {linkLabel}
                    <ChevronRight className="w-4 h-4" />
                </Link>
            )}
        </div>
    );
}
