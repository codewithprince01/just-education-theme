import Link from 'next/link';
import {
    GraduationCap, Building2, Presentation, School, Landmark, Library, Plane,
    BookMarked, FileText, Award, MapPin, Star, ChevronRight, Compass,
    type LucideIcon,
} from 'lucide-react';
import type { Course, ExamRef, Institution, Location, Scholarship } from '@/data/blog/types';
import { institutionRoute, routes } from '@/lib/blog/config';

const TYPE_ICON: Record<string, LucideIcon> = {
    university: GraduationCap,
    college: Building2,
    coaching: Presentation,
    school: School,
    institute: Landmark,
    library: Library,
    consultant: Plane,
};
const TYPE_LABEL: Record<string, string> = {
    university: 'University',
    college: 'College',
    coaching: 'Coaching',
    school: 'School',
    institute: 'Institute',
    library: 'Library',
    consultant: 'Consultant',
};

const courseHref = (c: Course) => `/blog/all?q=${encodeURIComponent(c.name)}`;
const examHref = (e: ExamRef) => `/blog/all?exam=${e.slug}`;
const scholarshipHref = (s: Scholarship) => `/blog/all?q=${encodeURIComponent(s.name)}`;

// ---- Sidebar: institutions widget ------------------------------------------
export function InstitutionsWidget({ title, institutions }: { title: string; institutions: Institution[] }) {
    if (!institutions || institutions.length === 0) return null;
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-md p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-[#0B3C5D] uppercase tracking-wide mb-4">
                <Compass className="w-4 h-4 text-[#F57C00]" /> {title}
            </h2>
            <ul className="space-y-3">
                {institutions.map((inst) => {
                    const Icon = TYPE_ICON[inst.type] ?? Building2;
                    return (
                        <li key={inst.slug}>
                            <Link href={institutionRoute(inst.type, inst.slug)} className="group flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors">
                                <span className="w-9 h-9 rounded-lg bg-blue-50 text-[#0B3C5D] flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-4 h-4" />
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block text-sm font-semibold text-gray-800 truncate group-hover:text-[#F57C00] transition-colors">{inst.name}</span>
                                    <span className="block text-xs text-gray-400">
                                        {TYPE_LABEL[inst.type] ?? inst.type}{inst.city ? ` · ${inst.city}` : ''}
                                    </span>
                                </span>
                                {inst.rating && (
                                    <span className="inline-flex items-center gap-0.5 text-xs text-amber-500 flex-shrink-0">
                                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {inst.rating}
                                    </span>
                                )}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

// ---- Sidebar: generic entity link list -------------------------------------
export function EntityLinks({ title, icon, items }: { title: string; icon: React.ReactNode; items: { label: string; href: string; sub?: string }[] }) {
    if (!items || items.length === 0) return null;
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-md p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-[#0B3C5D] uppercase tracking-wide mb-4">{icon} {title}</h2>
            <ul className="space-y-1.5">
                {items.map((it) => (
                    <li key={it.href + it.label}>
                        <Link href={it.href} className="group flex items-center justify-between gap-2 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <span className="min-w-0">
                                <span className="block text-sm font-medium text-gray-700 truncate group-hover:text-[#F57C00] transition-colors">{it.label}</span>
                                {it.sub && <span className="block text-xs text-gray-400">{it.sub}</span>}
                            </span>
                            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#F57C00] flex-shrink-0" />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export const coursesToLinks = (courses: Course[]) =>
    courses.map((c) => ({ label: c.name, href: courseHref(c), sub: c.degree }));
export const examsToLinks = (exams: ExamRef[]) =>
    exams.map((e) => ({ label: e.name, href: examHref(e), sub: e.type }));
export const scholarshipsToLinks = (scholarships: Scholarship[]) =>
    scholarships.map((s) => ({ label: s.name, href: scholarshipHref(s), sub: s.type }));
export const locationsToLinks = (locations: Location[]) =>
    locations.map((l) => ({ label: l.name, href: routes.location(l.slug), sub: l.type }));

// ---- In-article discovery section ------------------------------------------
function InstitutionCard({ inst }: { inst: Institution }) {
    const Icon = TYPE_ICON[inst.type] ?? Building2;
    return (
        <Link href={institutionRoute(inst.type, inst.slug)} className="group bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md hover:border-[#F57C00] transition-all flex flex-col">
            <div className="flex items-center justify-between mb-2">
                <span className="w-9 h-9 rounded-lg bg-blue-50 text-[#0B3C5D] flex items-center justify-center"><Icon className="w-4 h-4" /></span>
                {inst.rating && (
                    <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-amber-500">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {inst.rating}
                    </span>
                )}
            </div>
            <p className="text-sm font-bold text-gray-900 leading-snug group-hover:text-[#F57C00] transition-colors line-clamp-2">{inst.name}</p>
            <p className="text-xs text-gray-400 mt-1 inline-flex items-center gap-1">
                {inst.city && <><MapPin className="w-3 h-3" /> {inst.city}</>}
            </p>
        </Link>
    );
}

export function DiscoverySection({
    institutions, courses, exams, scholarships,
}: {
    institutions: Institution[];
    courses: Course[];
    exams: ExamRef[];
    scholarships: Scholarship[];
}) {
    if (!institutions.length && !courses.length && !exams.length && !scholarships.length) return null;
    return (
        <section className="my-10 rounded-2xl border border-gray-200 bg-gray-50/60 p-5 md:p-6">
            <h2 className="flex items-center gap-2 text-lg font-extrabold text-[#0B3C5D] mb-1">
                <Compass className="w-5 h-5 text-[#F57C00]" /> Explore related on Just Education
            </h2>
            <p className="text-sm text-gray-500 mb-5">Institutions, courses, exams and scholarships connected to this guide.</p>

            {institutions.length > 0 && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                    {institutions.slice(0, 4).map((i) => <InstitutionCard key={i.slug} inst={i} />)}
                </div>
            )}

            <div className="grid gap-4 sm:grid-cols-3">
                <ChipGroup title="Courses" icon={<BookMarked className="w-4 h-4" />} items={coursesToLinks(courses)} />
                <ChipGroup title="Exams" icon={<FileText className="w-4 h-4" />} items={examsToLinks(exams)} />
                <ChipGroup title="Scholarships" icon={<Award className="w-4 h-4" />} items={scholarshipsToLinks(scholarships)} />
            </div>
        </section>
    );
}

function ChipGroup({ title, icon, items }: { title: string; icon: React.ReactNode; items: { label: string; href: string }[] }) {
    if (!items.length) return null;
    return (
        <div>
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">{icon} {title}</p>
            <div className="flex flex-wrap gap-2">
                {items.map((it) => (
                    <Link key={it.href + it.label} href={it.href} className="text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:border-[#F57C00] hover:text-[#F57C00] rounded-full px-3 py-1.5 transition-colors">
                        {it.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}
