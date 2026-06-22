"use client";

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
    Search, ChevronDown, ChevronUp, ChevronRight, CheckCircle2, FileText,
    Newspaper, Mail, BookOpen, Download, Plus, Minus,
    Layers, CalendarDays, Sparkles,
} from 'lucide-react';
import {
    examCategories, exams, quickExamLinks, examNews, examSyllabusLinks,
    conceptArticles, previousYearPapers, examFAQs,
} from '../../data/exams';
import { useStickySidebar } from '../../components/exams/useStickySidebar';

const CATEGORY_VISIBLE_COUNT = 10;

// Pill filter row above the exam cards, with a "View More" toggle once categories overflow.
interface CategoryFilterProps {
    categories: { id: string; name: string }[];
    activeCategory: string;
    onSelect: (id: string) => void;
}

const CategoryFilter = ({ categories, activeCategory, onSelect }: CategoryFilterProps) => {
    const [expanded, setExpanded] = useState(false);
    const visibleCategories = expanded ? categories : categories.slice(0, CATEGORY_VISIBLE_COUNT);

    return (
        <div className="flex flex-wrap items-center gap-2">
            {visibleCategories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onSelect(category.id)}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors duration-200 cursor-pointer ${activeCategory === category.id
                        ? 'bg-[#F57C00] text-white border-[#F57C00]'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-[#F57C00] hover:text-[#F57C00]'
                        }`}
                >
                    {category.name}
                </button>
            ))}
            {categories.length > CATEGORY_VISIBLE_COUNT && (
                <button
                    onClick={() => setExpanded((prev) => !prev)}
                    className="ml-auto px-4 py-1.5 rounded-full text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                    {expanded ? 'View Less' : 'View More'}
                    {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
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
    statusBadge: string;
    description: string;
}

const ExamCard = ({ exam }: { exam: Exam }) => {
    const isOnline = exam.mode === 'Online Exam';

    return (
        <div className="bg-white rounded-xl border border-gray-200 hover:border-[#F57C00] hover:shadow-md transition-all duration-300 p-5 flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center p-1.5 flex-shrink-0 overflow-hidden">
                        <img src={exam.logo} alt={`${exam.name} logo`} className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h3 className="font-bold text-[#0B3C5D] leading-tight text-base">
                            {exam.slug ? (
                                <Link href={`/exams/${exam.slug}`} className="hover:text-[#F57C00] hover:underline">
                                    {exam.name}
                                </Link>
                            ) : (
                                exam.name
                            )}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{exam.fullName}</p>
                    </div>
                </div>
                <span
                    className={`flex-shrink-0 inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full ${isOnline ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                        }`}
                >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {exam.mode}
                </span>
            </div>

            {/* Key dates */}
            <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center justify-between">
                    <span className="text-gray-500">Exam Date</span>
                    <span className="font-semibold text-gray-800">{exam.examDate}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-gray-500">Application Form</span>
                    <span className="font-semibold text-gray-800">{exam.applicationForm}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-gray-500">Result Announce</span>
                    <span className="font-semibold text-gray-800">{exam.resultAnnounce}</span>
                </div>
            </div>

            {/* Quick links */}
            <div className="flex items-center gap-4 text-xs font-medium text-blue-600 mb-3 pt-3 border-t border-gray-100">
                <a href="#" className="flex items-center gap-1 hover:underline">
                    Application Process <ChevronRight className="w-3 h-3" />
                </a>
                <a href="#" className="flex items-center gap-1 hover:underline">
                    Exam Pattern <ChevronRight className="w-3 h-3" />
                </a>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto pt-1">
                <a href="#" className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-[#0B3C5D]">
                    <FileText className="w-3.5 h-3.5" />
                    Previous Year Paper
                </a>
                <button className="px-5 py-2 bg-[#F57C00] hover:bg-[#E67300] text-white text-xs font-bold rounded-lg shadow-sm transition-colors duration-300 cursor-pointer">
                    Apply Now
                </button>
            </div>
        </div>
    );
};

const ExamsSidebar = ({ sidebarRef }: { sidebarRef?: React.RefObject<HTMLDivElement | null> }) => (
    <aside ref={sidebarRef} className="space-y-6">
        {/* Exams News */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#0B3C5D] mb-4">
                <Newspaper className="w-5 h-5 text-[#F57C00]" />
                Exams News
            </h3>
            <div className="space-y-4">
                {examNews.map((news) => (
                    <a key={news.id} href="#" className="flex gap-3 group">
                        <img src={news.image} alt={news.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-gray-800 leading-snug group-hover:text-[#F57C00] line-clamp-2">
                                {news.title}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">{news.date}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-br from-[#0B3C5D] to-[#0F4D73] rounded-xl shadow-md p-5 text-white">
            <h3 className="flex items-center gap-2 text-lg font-bold mb-1">
                <Mail className="w-5 h-5 text-orange-400" />
                Subscribe to our Newsletter
            </h3>
            <p className="text-sm text-blue-100 mb-4">Get exam updates straight to your inbox</p>
            <button className="w-full py-2.5 bg-[#F57C00] hover:bg-[#E67300] text-white font-bold rounded-lg shadow-sm transition-colors duration-300 text-sm cursor-pointer">
                Subscribe Now
            </button>
        </div>

        {/* Syllabus */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#0B3C5D] mb-4">
                <BookOpen className="w-5 h-5 text-[#F57C00]" />
                Exams 2026 Syllabus
            </h3>
            <div className="space-y-4">
                {examSyllabusLinks.map((item) => (
                    <div key={item.id}>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-xs font-bold text-blue-700">
                                {item.name.slice(0, 2)}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                                <p className="text-[11px] text-gray-400">{item.mode}</p>
                            </div>
                        </div>
                        <ul className="pl-9 space-y-1">
                            {item.links.map((link) => (
                                <li key={link}>
                                    <a href="#" className="flex items-center justify-between text-sm text-gray-600 hover:text-[#F57C00] py-0.5">
                                        {link}
                                        <ChevronRight className="w-3.5 h-3.5" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    </aside>
);

interface Article {
    id: number;
    title: string;
    image: string;
}

const ArticleGrid = ({ title, articles }: { title: string; articles: Article[] }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollNext = () => {
        scrollRef.current?.scrollBy({ left: 280, behavior: 'smooth' });
    };

    return (
        <div className="mb-8">
            <h3 className="text-base font-bold text-gray-800 mb-4">{title}</h3>
            <div className="relative">
                <div ref={scrollRef} className="flex sm:grid sm:grid-cols-4 gap-4 overflow-x-auto sm:overflow-visible scroll-smooth snap-x pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {articles.map((article) => (
                        <a
                            key={article.id}
                            href="#"
                            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-[#F57C00] overflow-hidden flex flex-col flex-shrink-0 w-40 sm:w-auto snap-start"
                        >
                            <img src={article.image} alt={article.title} className="w-full h-24 object-cover" />
                            <div className="p-4 flex flex-col flex-1">
                                <p className="text-sm font-semibold text-gray-800 leading-snug flex-1 line-clamp-3">{article.title}</p>
                                <span className="text-xs font-medium text-blue-600 mt-3">Read More</span>
                            </div>
                        </a>
                    ))}
                </div>
                <button
                    onClick={scrollNext}
                    aria-label="Show more articles"
                    className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center text-gray-500 hover:text-[#F57C00] hover:border-[#F57C00] cursor-pointer"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

const FaqAccordion = () => {
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    return (
        <div>
            {examFAQs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 last:border-b-0">
                    <button
                        className="w-full flex items-center justify-between gap-4 py-4 text-left cursor-pointer"
                        onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    >
                        <div>
                            <p className="font-semibold text-gray-900">Ques. {faq.question}</p>
                            <p className="text-xs text-gray-400 mt-1">
                                Top Answer By {faq.authorName} on {faq.authorDate}
                            </p>
                        </div>
                        {openFAQ === index ? (
                            <Minus className="w-5 h-5 text-[#F57C00] flex-shrink-0" />
                        ) : (
                            <Plus className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                    </button>
                    {openFAQ === index && (
                        <p className="pb-4 text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

const ExamsPage = () => {
    const [activeCategory, setActiveCategory] = useState('engineering');
    const [searchTerm, setSearchTerm] = useState('');
    const papersScrollRef = useRef<HTMLDivElement>(null);

    // Sticky sidebar movement (recalculates when the category / result count changes)
    const { containerRef, sidebarRef, sidebarColRef } = useStickySidebar(activeCategory);

    const activeCategoryName = useMemo(
        () => examCategories.find((c) => c.id === activeCategory)?.name || '',
        [activeCategory]
    );

    const filteredExams = useMemo(() => {
        return exams.filter((exam) => {
            const matchesCategory = exam.category === activeCategory;
            const matchesSearch = exam.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchTerm]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <section className="bg-gradient-to-br from-[#0B3C5D] to-[#0F4D73] py-10 md:py-14 overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Left: heading + search */}
                        <div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">
                                Entrance Exams In India
                            </h1>
                            <div className="max-w-xl">
                                <div className="flex items-center bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 px-4 py-3">
                                    <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search Entrance Exams"
                                        className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 mt-5 max-w-xl">
                                {quickExamLinks.map((name) => (
                                    <a
                                        key={name}
                                        href="#"
                                        className="text-xs font-semibold text-blue-50 bg-white/10 hover:bg-[#F57C00] hover:text-white border border-white/15 hover:border-[#F57C00] rounded-full px-3 py-1.5 transition-colors duration-200"
                                    >
                                        {name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Right: stat cards */}
                        <div className="hidden lg:flex justify-end">
                            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                                {[
                                    { icon: FileText, value: '15', label: 'Exams Listed' },
                                    { icon: Layers, value: '10', label: 'Categories' },
                                    { icon: CalendarDays, value: '2026', label: 'Updated' },
                                    { icon: Sparkles, value: '100%', label: 'Free Access' },
                                ].map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="bg-white border border-gray-200 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center mb-2">
                                            <stat.icon className="w-4 h-4 text-[#F57C00]" />
                                        </div>
                                        <div className="text-xl font-extrabold text-[#0B3C5D] leading-none">{stat.value}</div>
                                        <div className="text-xs font-medium text-gray-500 mt-1">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
                {/* Category Filter */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 mb-8">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Exams Category</h2>
                    <CategoryFilter
                        categories={examCategories}
                        activeCategory={activeCategory}
                        onSelect={setActiveCategory}
                    />
                </div>

                <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                    {/* Exam Cards (right on desktop, first on mobile) */}
                    <div className="lg:col-span-2 order-1 lg:order-2">
                        {filteredExams.length > 0 ? (
                            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {filteredExams.map((exam) => (
                                        <ExamCard key={exam.id} exam={exam} />
                                    ))}
                                </div>

                                {/* View All link inside the same card */}
                                <div className="text-center mt-6 pt-5 border-t border-gray-100">
                                    <Link href={`/exams/${activeCategory}`} className="text-blue-600 font-semibold hover:underline">
                                        View All {activeCategoryName} Exams &gt;
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                                <p className="text-gray-500">No exams found for this category.</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar (left on desktop, after cards on mobile) */}
                    <div ref={sidebarColRef} className="lg:col-span-1 order-2 lg:order-1 relative">
                        <ExamsSidebar sidebarRef={sidebarRef} />
                    </div>
                </div>
            </div>

            {/* Concept Articles */}
            <section className="py-12 md:py-16 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B3C5D] mb-6">Concept Articles</h2>
                    <ArticleGrid title="Top Class 10 Concept Articles" articles={conceptArticles['class-10']} />
                    <ArticleGrid title="Top Class 12 Concept Articles" articles={conceptArticles['class-12']} />
                </div>
            </section>

            {/* Previous Year Papers */}
            <section className="py-12 md:py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B3C5D] mb-2">Top JEE Main Previous Year Paper</h2>
                    <div className="inline-block mb-6">
                        <span className="px-4 py-1.5 bg-orange-50 text-[#F57C00] rounded-full text-sm font-semibold border border-orange-200">
                            JEE Main
                        </span>
                    </div>
                    <div className="relative">
                        <div ref={papersScrollRef} className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto sm:overflow-visible scroll-smooth snap-x pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {previousYearPapers.map((paper) => (
                                <a
                                    key={paper.id}
                                    href="#"
                                    className="bg-orange-50/60 rounded-xl border border-orange-100 hover:border-[#F57C00] hover:shadow-lg transition-all duration-300 p-4 flex flex-col flex-shrink-0 w-48 sm:w-auto snap-start"
                                >
                                    <div className="w-14 h-14 rounded-lg bg-white border border-orange-100 flex items-center justify-center p-2 mb-3">
                                        <img src={paper.logo} alt="NTA logo" className="w-full h-full object-contain" />
                                    </div>
                                    <p className="text-sm font-semibold text-gray-800 leading-snug flex-1 line-clamp-3">{paper.title}</p>
                                    <span className="flex items-center gap-1.5 text-xs font-medium text-blue-600 mt-3">
                                        <Download className="w-3.5 h-3.5" />
                                        Download PDF
                                    </span>
                                </a>
                            ))}
                        </div>
                        <button
                            onClick={() => papersScrollRef.current?.scrollBy({ left: 280, behavior: 'smooth' })}
                            aria-label="Show more papers"
                            className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center text-gray-500 hover:text-[#F57C00] hover:border-[#F57C00] cursor-pointer"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-12 md:py-16 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B3C5D] mb-6">Frequently Asked Questions</h2>
                        <FaqAccordion />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ExamsPage;
