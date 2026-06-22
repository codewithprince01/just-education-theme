import Link from 'next/link';
import { MapPin, Star, ArrowUpRight } from 'lucide-react';
import type { Institution } from '@/data/blog/types';
import { institutionRoute } from '@/lib/blog/config';

const TYPE_LABEL: Record<string, string> = {
    university: 'University',
    college: 'College',
    coaching: 'Coaching',
    school: 'School',
    institute: 'Institute',
    library: 'Library',
    consultant: 'Consultant',
};

// "Similar institutions / Institution recommendations" — links each linked
// organization to its blog archive.
export default function InstitutionList({ title, institutions }: { title: string; institutions: Institution[] }) {
    if (!institutions || institutions.length === 0) return null;
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-md p-5">
            <h3 className="text-sm font-bold text-[#0B3C5D] uppercase tracking-wide mb-4">{title}</h3>
            <ul className="space-y-3">
                {institutions.map((inst) => (
                    <li key={inst.slug}>
                        <Link
                            href={institutionRoute(inst.type, inst.slug)}
                            className="group flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0B3C5D] flex items-center justify-center font-bold flex-shrink-0">
                                {(inst.shortName ?? inst.name).slice(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-gray-800 truncate group-hover:text-[#F57C00] transition-colors">
                                    {inst.name}
                                </p>
                                <p className="text-xs text-gray-400 flex items-center gap-2">
                                    <span className="font-medium text-gray-500">{TYPE_LABEL[inst.type] ?? inst.type}</span>
                                    {inst.city && (
                                        <span className="inline-flex items-center gap-0.5">
                                            <MapPin className="w-3 h-3" /> {inst.city}
                                        </span>
                                    )}
                                    {inst.rating && (
                                        <span className="inline-flex items-center gap-0.5 text-amber-500">
                                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {inst.rating}
                                        </span>
                                    )}
                                </p>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#F57C00]" />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
