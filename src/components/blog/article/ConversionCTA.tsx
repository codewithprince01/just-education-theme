import Link from 'next/link';
import { ArrowRight, GraduationCap, Building2, Presentation, Plane, Award, Compass } from 'lucide-react';

interface CtaConfig {
    icon: React.ReactNode;
    heading: string;
    sub: string;
    actions: { label: string; href: string; primary?: boolean }[];
}

// Conversion block tailored to the article's category.
const CONFIG: Record<string, CtaConfig> = {
    'entrance-exams': {
        icon: <Presentation className="w-6 h-6" />,
        heading: 'Turn this exam plan into a seat',
        sub: 'Find the right coaching and colleges for your target exam.',
        actions: [
            { label: 'Find Coaching Centers', href: '/blog/all?institutionType=coaching', primary: true },
            { label: 'Explore Colleges', href: '/blog/all?institutionType=college' },
        ],
    },
    universities: {
        icon: <GraduationCap className="w-6 h-6" />,
        heading: 'Ready to find your university?',
        sub: 'Explore and compare universities, then start your application.',
        actions: [
            { label: 'Explore Universities', href: '/blog/all?institutionType=university', primary: true },
            { label: 'Compare Options', href: '/blog/category/universities' },
        ],
    },
    colleges: {
        icon: <Building2 className="w-6 h-6" />,
        heading: 'Find the right college for you',
        sub: 'Compare colleges by course, fees and placements.',
        actions: [
            { label: 'Explore Colleges', href: '/blog/all?institutionType=college', primary: true },
            { label: 'Browse College Guides', href: '/blog/category/colleges' },
        ],
    },
    'coaching-centers': {
        icon: <Presentation className="w-6 h-6" />,
        heading: 'Pick the right coaching center',
        sub: 'Compare coaching institutes for your exam.',
        actions: [
            { label: 'View Coaching Centers', href: '/blog/all?institutionType=coaching', primary: true },
            { label: 'Compare Coaching', href: '/blog/category/coaching-centers' },
        ],
    },
    'study-abroad': {
        icon: <Plane className="w-6 h-6" />,
        heading: 'Make your study-abroad move',
        sub: 'Find consultants and explore universities abroad.',
        actions: [
            { label: 'Find Consultants', href: '/blog/all?institutionType=consultant', primary: true },
            { label: 'Explore Universities Abroad', href: '/blog/all?institutionType=university' },
        ],
    },
    'visa-guidance': {
        icon: <Plane className="w-6 h-6" />,
        heading: 'Plan your student visa with confidence',
        sub: 'Get guidance and connect with study-abroad consultants.',
        actions: [
            { label: 'Find Consultants', href: '/blog/all?institutionType=consultant', primary: true },
            { label: 'Study Abroad Guides', href: '/blog/category/study-abroad' },
        ],
    },
    scholarships: {
        icon: <Award className="w-6 h-6" />,
        heading: 'Fund your education',
        sub: 'Discover scholarships you may be eligible for.',
        actions: [
            { label: 'Browse Scholarships', href: '/blog/category/scholarships', primary: true },
            { label: 'Government Schemes', href: '/blog/category/government-schemes' },
        ],
    },
    admissions: {
        icon: <Compass className="w-6 h-6" />,
        heading: 'Get your admission on track',
        sub: 'Explore institutions and admission guidance.',
        actions: [
            { label: 'Explore Universities', href: '/blog/all?institutionType=university', primary: true },
            { label: 'Explore Colleges', href: '/blog/all?institutionType=college' },
        ],
    },
};

const DEFAULT: CtaConfig = {
    icon: <Compass className="w-6 h-6" />,
    heading: 'Discover more on Just Education',
    sub: 'Explore institutions, courses, exams and scholarships.',
    actions: [
        { label: 'Browse All Articles', href: '/blog/all', primary: true },
        { label: 'Explore Categories', href: '/blog' },
    ],
};

export default function ConversionCTA({ categorySlug }: { categorySlug: string }) {
    const cfg = CONFIG[categorySlug] ?? DEFAULT;
    return (
        <section className="my-10 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B3C5D] via-[#0D4B75] to-[#126094] text-white p-6 md:p-8">
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-orange-500/20 blur-3xl" aria-hidden="true" />
            <div className="relative z-10 md:flex items-center justify-between gap-6">
                <div className="flex items-start gap-4 max-w-xl">
                    <span className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-orange-300 flex-shrink-0">
                        {cfg.icon}
                    </span>
                    <div>
                        <h2 className="text-xl md:text-2xl font-extrabold leading-tight">{cfg.heading}</h2>
                        <p className="text-blue-100 text-sm mt-1">{cfg.sub}</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3 mt-5 md:mt-0 flex-shrink-0">
                    {cfg.actions.map((a) => (
                        <Link
                            key={a.href}
                            href={a.href}
                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors ${
                                a.primary
                                    ? 'bg-[#F57C00] hover:bg-[#E67300] text-white'
                                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                            }`}
                        >
                            {a.label} <ArrowRight className="w-4 h-4" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
