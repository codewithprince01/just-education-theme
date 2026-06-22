import Link from 'next/link';
import { BookOpen, Award, Compass, ChevronRight } from 'lucide-react';
import { Suspense } from 'react';
import JustDialSearchBar from '@/components/layout/JustDialSearchBar';
import TopStudyPlacesSection from '@/components/home/TopStudyPlacesSection';
import DirectorySection from '@/components/directory/DirectorySection';

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[#0B3C5D] via-[#0D4B75] to-[#126094] text-white py-20 px-4 text-center relative">
                {/* Background Shapes */}
                <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                    <div className="absolute top-12 left-10 w-72 h-72 rounded-full bg-orange-500 blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-300 blur-3xl"></div>
                </div>

                <div className="container mx-auto max-w-4xl relative z-10">
                    <span className="bg-orange-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                        Empowering Student Decisions
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black mt-6 leading-tight">
                        Find the Right Course, <br />
                        <span className="text-orange-400">College & Entrance Exam</span>
                    </h1>
                    <p className="text-base md:text-lg text-blue-100 mt-6 max-w-2xl mx-auto leading-relaxed mb-10">
                        Just Education helps you navigate your academic career with detailed guides on entrance exams, cutoff marks, previous papers, and college selections.
                    </p>

                    <Suspense fallback={<div className="h-16 bg-white/10 rounded-2xl animate-pulse max-w-4xl mx-auto" />}>
                        <JustDialSearchBar />
                    </Suspense>
                </div>
            </section>

            {/* Top Study Places Section */}
            <TopStudyPlacesSection />

            {/* Directory Section */}
            <section className="bg-gray-50 border-t border-b border-gray-200">
                <DirectorySection />
            </section>

            {/* Feature Cards Section */}
            <section className="py-20 px-4 container mx-auto max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-gray-900">What We Offer</h2>
                    <p className="text-gray-500 mt-3 max-w-md mx-auto">
                        Explore all the resources curated to guide you through admissions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 mb-6">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Entrance Exams Guides</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Comprehensive lists, schedules, admit cards, and results for engineering, medical, management, and other streams.
                        </p>
                        <Link href="/exams" className="text-orange-500 font-semibold text-sm hover:underline mt-6 inline-flex items-center gap-1">
                            Explore exams <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#0B3C5D] mb-6">
                            <Award className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Previous Year Papers</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Download free PDF question papers with detailed step-by-step solutions for JEE Main, GATE, NEET, and more.
                        </p>
                        <Link href="/exams" className="text-[#0B3C5D] font-semibold text-sm hover:underline mt-6 inline-flex items-center gap-1">
                            Download papers <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 mb-6">
                            <Compass className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Counselling & Cutoffs</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Track real-time seat allotments, rank lists, and opening/closing cutoff ranks for NITs, IIITs, and CFTIs.
                        </p>
                        <Link href="/exams/jee-main/cutoff" className="text-teal-600 font-semibold text-sm hover:underline mt-6 inline-flex items-center gap-1">
                            View cutoffs <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
