"use client";

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Breadcrumbs from '../seo/Breadcrumbs';
import {
    examCategories, exams, examSubCategories, examFilterGroups,
} from '../../data/exams';

const SUBCATEGORY_VISIBLE_COUNT = 3;

interface FilterOption {
    id: string;
    label: string;
}

interface FilterGroupProps {
    title: string;
    options: FilterOption[];
}

const FilterGroup = ({ title, options }: FilterGroupProps) => {
    const [open, setOpen] = useState(true);

    return (
        <div className="border-b border-gray-200 py-3 first:pt-0 last:border-0">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="w-full flex items-center justify-between text-xs font-bold text-gray-700 uppercase tracking-wide cursor-pointer"
            >
                {title}
                {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
            {open && (
                <div className="mt-3 space-y-2.5">
                    {options.map((option) => (
                        <label key={option.id} className="flex items-center gap-2.5 text-sm text-gray-600 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#F57C00] focus:ring-[#F57C00]" />
                            {option.label}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

interface Exam {
    id: string;
    slug?: string;
    name: string;
    fullName: string;
    category: string;
    courseLevel: string;
    logo: string;
    mode: string;
    examType: string;
    examDate: string;
    applicationForm: string;
    resultAnnounce: string;
    statusBadge?: string;
    description: string;
}

const ExamListCard = ({ exam }: { exam: Exam }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4 last:mb-0 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-4 mb-3">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">{exam.examType}</span>
            {exam.statusBadge && (
                <span className="text-[11px] font-bold text-amber-800 bg-amber-200 px-3 py-1 rounded-sm">
                    {exam.statusBadge}
                </span>
            )}
        </div>

        <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex items-start gap-3 min-w-0">
                <div className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center p-2 flex-shrink-0 overflow-hidden">
                    <img src={exam.logo} alt={`${exam.name} logo`} className="w-full h-full object-contain" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-[#0B3C5D]">{exam.name}</h3>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{exam.fullName}</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
                <div>
                    <p className="text-xs text-gray-400 mb-1">application form</p>
                    <p className="font-semibold text-blue-600">{exam.applicationForm}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-400 mb-1">examination</p>
                    <p className="font-semibold text-teal-600">{exam.examDate}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-400 mb-1">result announce</p>
                    <p className="font-semibold text-teal-600">{exam.resultAnnounce}</p>
                </div>
            </div>
        </div>

        <p className="text-sm text-gray-655 mt-3 leading-relaxed">{exam.description}</p>

        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-gray-100">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-bold text-[#F57C00] uppercase tracking-wide">
                {['Application Process', 'Exam Pattern', 'Mock Test', 'Practice Papers', 'Preparation Tips', 'Results'].map((label) => (
                    <a key={label} href="#" className="hover:underline">{label}</a>
                ))}
            </div>
            <button className="px-5 py-2 bg-[#F57C00] hover:bg-[#E67300] text-white text-xs font-bold rounded-full shadow-sm transition-colors duration-300 flex-shrink-0 cursor-pointer">
                Apply Now
            </button>
        </div>
    </div>
);

const ExamCategoryPage = () => {
    const params = useParams();
    const examSlug = params?.examSlug as string;
    const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
    const [showAllSubCategories, setShowAllSubCategories] = useState(false);

    const category = examCategories.find((c) => c.id === examSlug);
    const subCategories = examSubCategories[examSlug] || [];
    const visibleSubCategories = showAllSubCategories
        ? subCategories
        : subCategories.slice(0, SUBCATEGORY_VISIBLE_COUNT);
    const hiddenSubCategoryCount = subCategories.length - SUBCATEGORY_VISIBLE_COUNT;

    const filteredExams = useMemo(
        () => exams.filter((exam) => exam.category === examSlug && (!activeSubCategory || exam.courseLevel === activeSubCategory)),
        [examSlug, activeSubCategory]
    );

    const breadcrumbItems = [
        { name: 'Home', url: '/' },
        { name: 'Exams', url: '/exams' },
        { name: category?.name || 'Exams' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <section className="bg-gradient-to-br from-[#0B3C5D] to-[#0F4D73] py-8 md:py-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="[&_a]:text-blue-100 [&_a:hover]:text-white [&_span]:text-white">
                        <Breadcrumbs items={breadcrumbItems} />
                    </div>
                    <h1 className="text-2xl md:text-4xl font-extrabold text-white mt-2">
                        {category?.name || 'Exams'} Entrance Exams in India
                    </h1>
                </div>
            </section>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Filter rail */}
                    <aside className="lg:col-span-1">
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <div className="flex items-center justify-between pb-3 mb-1 border-b border-gray-200">
                                <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                                    Found <span className="text-gray-900">{filteredExams.length}</span> Exams
                                </p>
                                <button
                                    onClick={() => setActiveSubCategory(null)}
                                    className="text-xs font-bold text-[#F57C00] uppercase tracking-wide hover:underline cursor-pointer bg-transparent border-0"
                                >
                                    Set Default
                                </button>
                            </div>
                            {examFilterGroups.map((group) => (
                                <FilterGroup key={group.title} title={group.title} options={group.options} />
                            ))}
                        </div>
                    </aside>

                    {/* Exam list */}
                    <main className="lg:col-span-3">
                        {subCategories.length > 0 && (
                            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-5 flex flex-wrap items-center gap-2">
                                {visibleSubCategories.map((sub) => (
                                    <button
                                        key={sub.id}
                                        onClick={() => setActiveSubCategory(activeSubCategory === sub.id ? null : sub.id)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200 cursor-pointer ${activeSubCategory === sub.id
                                            ? 'bg-[#F57C00] text-white border-[#F57C00]'
                                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-[#F57C00] hover:text-[#F57C00]'
                                            }`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full ${activeSubCategory === sub.id ? 'bg-white' : 'bg-[#F57C00]'}`} />
                                        {sub.label} ({sub.count})
                                    </button>
                                ))}
                                {hiddenSubCategoryCount > 0 && (
                                    <button
                                        onClick={() => setShowAllSubCategories((prev) => !prev)}
                                        className="ml-auto text-sm font-bold text-[#F57C00] hover:underline cursor-pointer bg-transparent border-0"
                                    >
                                        {showAllSubCategories ? 'Show Less' : `${hiddenSubCategoryCount}+ More`}
                                    </button>
                                )}
                            </div>
                        )}

                        {filteredExams.length > 0 ? (
                            filteredExams.map((exam) => <ExamListCard key={exam.id} exam={exam} />)
                        ) : (
                            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                                <p className="text-gray-500">No exams found for this filter.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ExamCategoryPage;
