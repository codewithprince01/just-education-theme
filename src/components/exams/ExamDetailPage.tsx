"use client";

<<<<<<< HEAD
import { useLayoutEffect, useState } from 'react';
=======
import { useLayoutEffect, useState, useEffect, useRef } from 'react';
>>>>>>> avanish
import { useRouter, useParams } from 'next/navigation';
import { CheckCircle2, Plus, Minus } from 'lucide-react';
import { examPage } from '../../data/jeeMain';
import ExamDetailHero from './ExamDetailHero';
import ExamDetailSidebar from './ExamDetailSidebar';
import DataTable from './DataTable';
<<<<<<< HEAD
import MasterUIPage from './MasterUIPage';
import { useStickySidebar } from './useStickySidebar';
=======
>>>>>>> avanish

interface Tab {
    label: string;
    slug: string;
    tabs?: Tab[];
    sections?: any[];
}

interface Section {
    slug: string;
    title: string;
    content: any[];
}

// Walks the page's tab tree looking for a leaf (no nested `tabs`) with this slug.
const findLeafTab = (tabs: Tab[], slug: string): Tab | null => {
    for (const tab of tabs) {
        if (tab.tabs) {
            const found = findLeafTab(tab.tabs, slug);
            if (found) return found;
        } else if (tab.slug === slug) {
            return tab;
        }
    }
    return null;
};

// The default tab shown on the bare /exams/:examSlug URL - the first top-level tab, drilling
// into its first child until a leaf (one with `sections`) is reached.
const firstLeafTab = (tabs: Tab[]): Tab => (tabs[0].tabs ? firstLeafTab(tabs[0].tabs) : tabs[0]);

const DATE_TAG_STYLES: Record<string, string> = {
    Today: 'text-red-655 font-semibold',
    Expected: 'text-amber-600 italic',
    Over: 'text-gray-400 italic',
};

const BUTTON_STYLES: Record<string, string> = {
    primary: 'border-2 border-[#0B3C5D] text-[#0B3C5D] hover:bg-[#0B3C5D] hover:text-white',
    accent: 'border-2 border-[#F57C00] text-[#F57C00] hover:bg-[#F57C00] hover:text-white',
    ghost: 'border-2 border-gray-300 text-gray-500 hover:bg-gray-100',
};

// Plain "• text" list block.
const Bullets = ({ items }: { items: string[] }) => (
    <ul className="space-y-1.5 mb-4">
        {items.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-gray-700 leading-relaxed animate-fade-in">
                <span className="text-[#F57C00] mt-1.5">&bull;</span>
                <span>{item}</span>
            </li>
        ))}
    </ul>
);

// "• **Label:** text" list block.
interface LabelledBulletItem {
    label: string;
    text: string;
}

const LabelledBullets = ({ items }: { items: LabelledBulletItem[] }) => (
    <ul className="space-y-2.5 mb-4">
        {items.map((item) => (
            <li key={item.label} className="flex gap-2 text-sm text-gray-700 leading-relaxed">
                <span className="text-[#F57C00] mt-1.5">&bull;</span>
                <span>
                    <span className="font-semibold text-gray-900">{item.label}</span> {item.text}
                </span>
            </li>
        ))}
    </ul>
);

// Specialised table block for "Important Dates" - highlights Today/Expected/Over per row.
interface DateRow {
    event: string;
    date: string;
    tag?: string;
}

const DateTable = ({ rows }: { rows: DateRow[] }) => (
    <div className="overflow-x-auto rounded-lg border border-gray-200 mb-2">
        <table className="w-full text-sm">
            <thead>
                <tr className="bg-gray-50">
                    <th className="text-left font-semibold text-gray-700 px-4 py-3 border-b border-gray-200">Event</th>
                    <th className="text-left font-semibold text-gray-700 px-4 py-3 border-b border-gray-200">Date</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={row.event} className="border-b border-gray-100 last:border-0 even:bg-gray-50/50">
                        <td className="px-4 py-3 font-medium text-gray-800">
                            {row.event} {row.tag === 'Over' && <span className="text-gray-400 italic font-normal">(Over)</span>}
                        </td>
                        <td className={`px-4 py-3 text-gray-600 ${row.tag && row.tag !== 'Over' ? DATE_TAG_STYLES[row.tag] : ''}`}>
                            {row.date} {row.tag && row.tag !== 'Over' && <span className="text-xs">({row.tag})</span>}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

interface ButtonItem {
    label: string;
    style: string;
    icon?: string;
}

const ButtonRow = ({ items }: { items: ButtonItem[] }) => (
    <div className="flex flex-wrap gap-3 mt-4 mb-2">
        {items.map((item) => (
            <button
                key={item.label}
                className={`flex items-center gap-1.5 px-5 py-2.5 font-semibold text-sm rounded-lg transition-colors cursor-pointer ${BUTTON_STYLES[item.style] || BUTTON_STYLES.ghost}`}
            >
                {item.icon === 'check' && <CheckCircle2 className="w-4 h-4" />}
                {item.label}
            </button>
        ))}
    </div>
);

interface FaqItem {
    question: string;
    answer: string;
}

const FaqBlock = ({ items }: { items: FaqItem[] }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    return (
        <div className="border border-gray-200 rounded-xl">
            {items.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 last:border-b-0">
                    <button
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    >
                        <p className="font-semibold text-gray-900 text-sm">Ques. {faq.question}</p>
                        {openIndex === index ? (
                            <Minus className="w-4 h-4 text-[#F57C00] flex-shrink-0" />
                        ) : (
                            <Plus className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        )}
                    </button>
                    {openIndex === index && (
                        <p className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

const LinkGrid = ({ items }: { items: string[] }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((label) => (
            <a
                key={label}
                href="#"
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:border-[#F57C00] hover:text-[#F57C00] transition-colors"
            >
                {label}
            </a>
        ))}
    </div>
);

interface NewsItem {
    id: number;
    title: string;
    date: string;
    excerpt: string;
    image: string;
}

const NewsGridBlock = ({ items }: { items: NewsItem[] }) => (
    <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {items.map((news) => (
                <a
                    key={news.id}
                    href="#"
                    className="block border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group"
                >
                    <img src={news.image} alt={news.title} className="w-full h-32 object-cover" />
                    <div className="p-4">
                        <p className="text-sm font-semibold text-gray-950 leading-snug mb-1 group-hover:text-[#F57C00] line-clamp-2">
                            {news.title}
                        </p>
                        <p className="text-xs text-gray-400 mb-2">{news.date}</p>
                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{news.excerpt}</p>
                    </div>
                </a>
            ))}
        </div>
        <div className="text-center mt-6">
            <button className="px-8 py-2.5 border border-gray-300 text-gray-600 font-semibold text-sm rounded-full hover:bg-gray-50 cursor-pointer">
                View More
            </button>
        </div>
    </>
);

// Renders one content block from a section's `content` array, by `type`.
const renderBlock = (block: any, key: number) => {
    switch (block.type) {
        case 'updateHeadline':
            return (
                <p key={key} className="text-sm text-gray-700 leading-relaxed mb-4">
                    <span className="text-red-600 font-semibold">{block.date}</span> {block.text}
                </p>
            );
        case 'paragraph':
            return <p key={key} className="text-sm text-gray-700 leading-relaxed mb-3">{block.text}</p>;
        case 'heading':
            return <h3 key={key} className="font-semibold text-gray-950 mb-2 mt-4 text-base">{block.text}</h3>;
        case 'bullets':
            return <Bullets key={key} items={block.items} />;
        case 'labelledBullets':
            return <LabelledBullets key={key} items={block.items} />;
        case 'table':
            return <DataTable key={key} headers={block.headers} rows={block.rows} />;
        case 'dateTable':
            return <DateTable key={key} rows={block.rows} />;
        case 'buttons':
            return <ButtonRow key={key} items={block.items} />;
        case 'note':
            return (
                <p key={key} className={`text-xs italic mb-2 ${block.tone === 'source' ? 'text-red-600' : 'text-gray-500'}`}>
                    {block.text}
                </p>
            );
        case 'faq':
            return <FaqBlock key={key} items={block.items} />;
        case 'linkGrid':
            return <LinkGrid key={key} items={block.items} />;
        case 'newsGrid':
            return <NewsGridBlock key={key} items={block.items} />;
        default:
            return null;
    }
};

const ExamDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const examSlug = params?.examSlug as string;
    const tabSlug = params?.tabSlug as string;

    const defaultLeafTab = firstLeafTab(examPage.tabs);
    const activeLeafTab = findLeafTab(examPage.tabs, tabSlug) || defaultLeafTab;

<<<<<<< HEAD
    // JS-based sticky sidebar (recalculates when the tab content changes)
    const { containerRef, sidebarRef, sidebarColRef } = useStickySidebar(activeLeafTab.slug);
=======
    // References for JS-based sticky sidebar scroll calculations
    const containerRef = useRef<HTMLDivElement>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const sidebarColRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current || !sidebarRef.current || !sidebarColRef.current) return;

            // Only run on desktop/large screens (lg breakpoint in Tailwind is 1024px)
            if (window.innerWidth < 1024) {
                // Reset styles on mobile/tablet so layout is natural and stacked
                sidebarRef.current.style.position = '';
                sidebarRef.current.style.top = '';
                sidebarRef.current.style.bottom = '';
                sidebarRef.current.style.width = '';
                return;
            }

            const container = containerRef.current;
            const sidebar = sidebarRef.current;
            const sidebarCol = sidebarColRef.current;

            const containerRect = container.getBoundingClientRect();
            const sidebarHeight = sidebar.offsetHeight;
            const viewportHeight = window.innerHeight;
            const scrollTop = window.scrollY;

            // Absolute positions on the page
            const containerTop = containerRect.top + scrollTop;
            const containerBottom = containerRect.bottom + scrollTop;

            const offset = 24; // 24px (space top/bottom)

            if (sidebarHeight <= viewportHeight - offset * 2) {
                // Case 1: Sidebar is shorter than viewport -> Stick to top of screen
                const relativeTop = containerRect.top;
                if (relativeTop <= offset) {
                    const maxTop = containerRect.height - sidebarHeight;
                    if (relativeTop + maxTop <= offset) {
                        // Reached bottom of container
                        sidebar.style.position = 'absolute';
                        sidebar.style.top = 'auto';
                        sidebar.style.bottom = '0';
                        sidebar.style.width = '100%';
                    } else {
                        // Stick to top of viewport
                        sidebar.style.position = 'fixed';
                        sidebar.style.top = `${offset}px`;
                        sidebar.style.bottom = 'auto';
                        sidebar.style.width = `${sidebarCol.offsetWidth}px`;
                    }
                } else {
                    // Normal positioning at the top of container
                    sidebar.style.position = '';
                    sidebar.style.top = '';
                    sidebar.style.bottom = '';
                    sidebar.style.width = '';
                }
            } else {
                // Case 2: Sidebar is taller than viewport -> Scroll naturally, stick to bottom of screen
                const viewportBottom = scrollTop + viewportHeight;
                const sidebarScrollBottomThreshold = containerTop + sidebarHeight + offset;

                if (viewportBottom >= sidebarScrollBottomThreshold) {
                    if (viewportBottom >= containerBottom) {
                        // Reached bottom of container
                        sidebar.style.position = 'absolute';
                        sidebar.style.top = 'auto';
                        sidebar.style.bottom = '0';
                        sidebar.style.width = '100%';
                    } else {
                        // Stick to bottom of viewport
                        sidebar.style.position = 'fixed';
                        sidebar.style.top = 'auto';
                        sidebar.style.bottom = `${offset}px`;
                        sidebar.style.width = `${sidebarCol.offsetWidth}px`;
                    }
                } else {
                    // Normal scrolling with page
                    sidebar.style.position = '';
                    sidebar.style.top = '';
                    sidebar.style.bottom = '';
                    sidebar.style.width = '';
                }
            }
        };

        // Run initially and attach scroll/resize listeners
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [activeLeafTab.slug]); // Recalculate if tab content changes
>>>>>>> avanish

    // Switching tabs swaps in a different set of sections entirely (these are real "pages"),
    // so jump to the top rather than leaving the scroll position from the previous tab.
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [activeLeafTab.slug]);

    const scrollToSection = (slug: string) => {
        document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleTabNavigate = (leafSlug: string) => {
        router.push(leafSlug === defaultLeafTab.slug ? `/exams/${examSlug}` : `/exams/${examSlug}/${leafSlug}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <ExamDetailHero
                examName={examPage.name}
                pageLabel={examPage.label}
                logo={examPage.logo}
                tabs={examPage.tabs}
                activeLeafSlug={activeLeafTab.slug}
                onTabNavigate={handleTabNavigate}
            />

<<<<<<< HEAD
            {/* The Master UI tab is a standalone component library showcase rather than a
                data-driven article, so it renders full-width instead of the content+sidebar grid. */}
            {activeLeafTab.slug === 'master-ui' ? (
                <MasterUIPage />
            ) : (
=======
>>>>>>> avanish
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
                <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                    {/* Main content */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-200 p-6">
                        {/* Author Info Widget */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-11 h-11 rounded-full bg-[#FFF9F3] border border-[#F57C00] flex items-center justify-center text-xs font-bold text-[#F57C00]">
                                CD
                            </div>
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <span className="font-bold text-[#F57C00] text-[15px] hover:underline cursor-pointer">Collegedunia Team</span>
                                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#10B981] text-white">
                                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 font-medium">Content Curator | Updated on - Jun 13, 2026</p>
                            </div>
                        </div>

                        {(activeLeafTab.sections || []).map((section: Section, index: number) => {
                            const isLatestUpdates = section.slug === 'latest-updates';
                            const updateHeadlineBlock = isLatestUpdates ? section.content.find(b => b.type === 'updateHeadline') : null;
                            const otherBlocks = isLatestUpdates ? section.content.filter(b => b.type !== 'updateHeadline') : section.content;

                            return (
                                <div key={section.slug}>
                                    {isLatestUpdates ? (
                                        <>
                                            {/* Peach/cream box for the latest updates title & headline */}
                                            {updateHeadlineBlock && (
                                                <div className="mb-6 p-4 sm:p-5 bg-[#FFF9F3] border-l-4 border-[#F57C00] rounded-r-xl shadow-sm">
                                                    <h2 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h2>
                                                    <p className="text-sm leading-relaxed text-gray-800">
                                                        <span className="text-[#DC2626] font-bold mr-2">{updateHeadlineBlock.date}</span>
                                                        <a href="https://josaa.nic.in" target="_blank" rel="noreferrer" className="text-blue-700 hover:text-blue-900 hover:underline font-medium">
                                                            {updateHeadlineBlock.text}
                                                        </a>
                                                    </p>
                                                </div>
                                            )}

                                            {/* Render the remaining blocks of the updates section */}
                                            <div className="space-y-3 mb-6">
                                                {otherBlocks.map((block, i) => renderBlock(block, i))}
                                            </div>
                                        </>
                                    ) : (
                                        <section id={section.slug} className="mb-8">
                                            <h2 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h2>
                                            {otherBlocks.map((block, i) => renderBlock(block, i))}
                                        </section>
                                    )}

                                    {/* Table of Contents - rendered after the first section (Latest Updates) */}
                                    {index === 0 && (activeLeafTab.sections || []).length > 1 && (
                                        <div className="mb-8 border border-gray-200 rounded-xl bg-white shadow-sm">
                                            <h2 className="px-5 py-3 font-bold text-gray-900 border-b border-gray-200 bg-gray-50 rounded-t-xl">
                                                Table of Contents
                                            </h2>
                                            <ol className="px-5 py-4 space-y-2">
                                                {(activeLeafTab.sections || []).map((sec: Section, idx: number) => (
                                                    <li key={sec.slug} className="text-sm flex gap-2">
                                                        <span className="text-gray-500 font-medium">{idx + 1}.</span>
                                                        <button
                                                            onClick={() => scrollToSection(sec.slug)}
                                                            className="text-left text-blue-700 hover:text-[#F57C00] hover:underline font-medium cursor-pointer bg-transparent border-0"
                                                        >
                                                            {sec.title}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Sidebar */}
                    <div ref={sidebarColRef} className="lg:col-span-1 relative">
                        <ExamDetailSidebar sidebarRef={sidebarRef} />
                    </div>
                </div>
            </div>
<<<<<<< HEAD
            )}
=======
>>>>>>> avanish
        </div>
    );
};

export default ExamDetailPage;
