import Link from 'next/link';
import { GraduationCap, Building2, School, Presentation, Landmark, Library, Plane, TrendingUp, ArrowUpRight, type LucideIcon } from 'lucide-react';
import type { EducationTypeStat } from '@/lib/blog/queries';
import { BLOG_BASE } from '@/lib/blog/config';

const TYPE_ICON: Record<string, LucideIcon> = {
    university: GraduationCap,
    college: Building2,
    school: School,
    coaching: Presentation,
    institute: Landmark,
    library: Library,
    consultant: Plane,
};

// "Browse by Education Type" — integrates educational entities into discovery.
// Each tile links to the global listing pre-filtered by institution type.
export default function EducationTypeSection({ stats }: { stats: EducationTypeStat[] }) {
    const withContent = stats.filter((s) => s.count > 0);
    if (withContent.length === 0) return null;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {withContent.map((s) => {
                const Icon = TYPE_ICON[s.type] ?? Building2;
                return (
                    <Link
                        key={s.type}
                        href={`${BLOG_BASE}?institutionType=${s.type}`}
                        className="group relative bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md hover:border-[#0B3C5D] transition-all"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="w-10 h-10 rounded-lg bg-blue-50 text-[#0B3C5D] flex items-center justify-center">
                                <Icon className="w-5 h-5" />
                            </span>
                            {s.trending && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#F57C00] bg-orange-50 rounded-full px-2 py-0.5">
                                    <TrendingUp className="w-3 h-3" /> Trending
                                </span>
                            )}
                        </div>
                        <p className="text-sm font-bold text-gray-900 leading-tight group-hover:text-[#F57C00] transition-colors">
                            {s.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                            {s.count} article{s.count === 1 ? '' : 's'}
                        </p>
                        <ArrowUpRight className="absolute top-4 right-4 w-4 h-4 text-gray-200 group-hover:text-[#F57C00] transition-colors opacity-0 group-hover:opacity-100" />
                    </Link>
                );
            })}
        </div>
    );
}
