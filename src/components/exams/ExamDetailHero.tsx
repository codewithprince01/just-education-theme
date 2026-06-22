"use client";

import { useRef } from 'react';
import { useParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Breadcrumbs from '../seo/Breadcrumbs';
import HeroTabItem from './HeroTabItem';
import { exams, examCategories } from '../../data/exams';

interface Tab {
    label: string;
    slug: string;
    tabs?: Tab[];
    sections?: any[];
}

interface ExamDetailHeroProps {
    examName: string;
    pageLabel: string;
    logo: string;
    tabs: Tab[];
    activeLeafSlug: string;
    onTabNavigate: (slug: string) => void;
}

const ExamDetailHero = ({ examName, pageLabel, logo, tabs, activeLeafSlug, onTabNavigate }: ExamDetailHeroProps) => {
    const params = useParams();
    const examSlug = params?.examSlug as string;
    const scrollerRef = useRef<HTMLDivElement>(null);

    // Dynamic breadcrumb generation matching category
    const exam = exams.find((e) => e.slug === examSlug);
    const category = exam ? examCategories.find((c) => c.id === exam.category) : null;

    const breadcrumbItems: { name: string; url?: string }[] = [
        { name: 'Home', url: '/' },
        { name: 'Exams', url: '/exams' },
    ];

    if (category) {
        breadcrumbItems.push({ name: category.name, url: `/exams/${category.id}` });
    }

    breadcrumbItems.push({ name: examName });

    const scrollTabs = (direction: number) => {
        scrollerRef.current?.scrollBy({ left: direction * 220, behavior: 'smooth' });
    };

    return (
        <section className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-3">
                <Breadcrumbs items={breadcrumbItems} />

                {/* Title */}
                <div className="flex items-center gap-4 mt-3 pb-5">
                    <img
                        src={logo}
                        alt={examName}
                        className="w-14 h-14 rounded-lg border border-gray-200 object-contain bg-white p-1 flex-shrink-0"
                    />
                    <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 leading-snug">
                        {pageLabel}
                    </h1>
                </div>
            </div>

            {/* Tabs */}
            <div className="relative border-t border-gray-100 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
                    <button
                        onClick={() => scrollTabs(-1)}
                        className="hidden md:flex absolute left-0 top-0 h-full w-8 items-center justify-center bg-gradient-to-r from-white via-white to-transparent text-gray-400 hover:text-[#F57C00] z-10"
                        aria-label="Scroll tabs left"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div
                        ref={scrollerRef}
                        className="flex items-center gap-6 overflow-x-auto no-scrollbar px-1 md:px-6 scroll-smooth"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {tabs.map((tab) => (
                            <HeroTabItem
                                key={tab.slug}
                                tab={tab}
                                activeLeafSlug={activeLeafSlug}
                                onNavigate={onTabNavigate}
                            />
                        ))}
                    </div>
                    <button
                        onClick={() => scrollTabs(1)}
                        className="hidden md:flex absolute right-0 top-0 h-full w-8 items-center justify-center bg-gradient-to-l from-white via-white to-transparent text-gray-400 hover:text-[#F57C00] z-10"
                        aria-label="Scroll tabs right"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ExamDetailHero;
