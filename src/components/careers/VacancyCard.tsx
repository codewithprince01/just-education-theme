import Link from 'next/link';
import { Briefcase, MapPin, Clock, TrendingUp, Wallet, ArrowRight } from 'lucide-react';
import { Job, formatSalary } from '../../data/careers';
import PostedAgo from './PostedAgo';

export type JobView = 'grid' | 'list';

const TYPE_STYLES: Record<string, string> = {
    'Full Time': 'bg-emerald-50 text-emerald-700',
    'Part Time': 'bg-blue-50 text-blue-700',
    Contract: 'bg-purple-50 text-purple-700',
    Internship: 'bg-amber-50 text-amber-700',
    Freelance: 'bg-pink-50 text-pink-700',
};

const WORKMODE_STYLES: Record<string, string> = {
    Remote: 'bg-teal-50 text-teal-700',
    Hybrid: 'bg-indigo-50 text-indigo-700',
    Onsite: 'bg-gray-100 text-gray-600',
};

const TypeChips = ({ job }: { job: Job }) => (
    <>
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${TYPE_STYLES[job.employmentType]}`}>{job.employmentType}</span>
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${WORKMODE_STYLES[job.workMode]}`}>{job.workMode}</span>
    </>
);

const Actions = ({ slug }: { slug: string }) => (
    <div className="flex items-center gap-2">
        <Link href={`/careers/${slug}`} className="px-3 py-2 text-xs font-semibold text-[#0B3C5D] border border-gray-300 rounded-lg hover:border-[#0B3C5D] transition-colors whitespace-nowrap">
            View Details
        </Link>
        <Link href={`/careers/${slug}#apply`} className="inline-flex items-center gap-1 px-3 py-2 text-xs font-bold text-white bg-[#F57C00] hover:bg-[#E67300] rounded-lg shadow-sm transition-colors whitespace-nowrap">
            Apply Now <ArrowRight className="w-3.5 h-3.5" />
        </Link>
    </div>
);

// A single vacancy, rendered as a vertical card (grid) or a horizontal row (list).
const VacancyCard = ({ job, view = 'grid' }: { job: Job; view?: JobView }) => {
    const salary = formatSalary(job);

    /* ───── LIST VIEW ───── */
    if (view === 'list') {
        return (
            <div className="bg-white rounded-xl border border-gray-200 hover:border-[#F57C00] hover:shadow-md transition-all duration-300 p-5 flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Title block */}
                <div className="flex items-center gap-3 min-w-0 lg:w-60 lg:flex-shrink-0">
                    <div className="w-11 h-11 rounded-lg bg-[#0B3C5D]/5 text-[#0B3C5D] flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-bold text-[#0B3C5D] leading-tight text-base truncate">
                            <Link href={`/careers/${job.slug}`} className="hover:text-[#F57C00] hover:underline">{job.title}</Link>
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">{job.department}</p>
                    </div>
                </div>

                {/* Meta */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-gray-600">
                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gray-400" />{job.location}</span>
                        <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-gray-400" />{job.experienceRange}</span>
                        {salary && <span className="flex items-center gap-1.5"><Wallet className="w-4 h-4 text-gray-400" />{salary}</span>}
                        <span className="flex items-center gap-1.5 text-gray-400 text-xs"><Clock className="w-3.5 h-3.5" /><PostedAgo iso={job.postedDate} /></span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                        <TypeChips job={job} />
                        {job.status === 'Urgent Hiring' && (
                            <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-red-50 text-red-600">Urgent</span>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="lg:flex-shrink-0">
                    <Actions slug={job.slug} />
                </div>
            </div>
        );
    }

    /* ───── GRID (CARD) VIEW ───── */
    return (
        <div className="bg-white rounded-xl border border-gray-200 hover:border-[#F57C00] hover:shadow-md transition-all duration-300 p-5 flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-lg bg-[#0B3C5D]/5 text-[#0B3C5D] flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-bold text-[#0B3C5D] leading-tight text-base truncate">
                            <Link href={`/careers/${job.slug}`} className="hover:text-[#F57C00] hover:underline">{job.title}</Link>
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">{job.department}</p>
                    </div>
                </div>
                {job.status === 'Urgent Hiring' && (
                    <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-red-50 text-red-600">Urgent</span>
                )}
            </div>

            {/* Meta chips */}
            <div className="flex flex-wrap gap-2 mb-3"><TypeChips job={job} /></div>

            {/* Key facts */}
            <div className="space-y-1.5 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />{job.location}</div>
                <div className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-gray-400 flex-shrink-0" />{job.experienceRange}</div>
                {salary && <div className="flex items-center gap-2"><Wallet className="w-4 h-4 text-gray-400 flex-shrink-0" />{salary}</div>}
            </div>

            {/* Short description */}
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">{job.shortDescription}</p>

            {/* Footer */}
            <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                <span className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5" /> <PostedAgo iso={job.postedDate} />
                </span>
                <Actions slug={job.slug} />
            </div>
        </div>
    );
};

export default VacancyCard;
