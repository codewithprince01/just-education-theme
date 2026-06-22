"use client";

/**
 * MasterUIPage — Exam UI Component Library
 * ----------------------------------------
 * A single, self-contained showcase of every reusable UI pattern used across the
 * Exam module. It is the *union* of:
 *   1. Exam Main Page components  (overview, dates, FAQ, news, sidebar widgets…)
 *   2. Exam Results Page components (stat blocks, result checker, toppers, timeline,
 *      scorecard, cutoff tables, predictor tools, callouts, steppers…)
 *
 * Every block is wrapped in <Showcase> which prints a developer-facing label so the
 * page doubles as living documentation. All blocks are modular — copy a sub-component
 * out of here and drop it into a real page. Layouts are responsive (mobile → desktop).
 *
 * Demo content is placeholder data and is intentionally inline so each block is
 * portable on its own.
 */

import { useState } from 'react';
import {
    Download, CheckCircle2, Info, AlertTriangle, XCircle, TrendingUp, Users,
    Award, FileText, Calculator, Target, GraduationCap, Clock, ChevronRight,
    Plus, Minus, Search, Trophy, BarChart3, Calendar, Bell, BookOpen, Quote,
    HelpCircle, Share2, Play, PlayCircle,
} from 'lucide-react';
import DataTable from './DataTable';

/* ------------------------------------------------------------------ */
/*  Layout primitives                                                 */
/* ------------------------------------------------------------------ */

// Developer-facing wrapper. Renders an orange label chip + optional description
// above every showcased component so the page reads as a component catalogue.
const Showcase = ({
    id,
    label,
    tag,
    description,
    children,
}: {
    id: string;
    label: string;
    tag: 'Main' | 'Results' | 'Shared';
    description?: string;
    children: React.ReactNode;
}) => {
    const tagStyles: Record<string, string> = {
        Main: 'bg-[#E8F1F8] text-[#0B3C5D]',
        Results: 'bg-[#FFF4E8] text-[#F57C00]',
        Shared: 'bg-emerald-50 text-emerald-700',
    };
    return (
        <section id={id} className="scroll-mt-28 bg-white rounded-xl border border-gray-200 shadow-sm p-5 sm:p-6">
            <div className="mb-5 pb-3 border-b border-dashed border-gray-200">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-900 text-white">
                        {label}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${tagStyles[tag]}`}>
                        {tag} Page
                    </span>
                </div>
                {description && <p className="text-xs text-gray-500 mt-2 leading-relaxed">{description}</p>}
            </div>
            {children}
        </section>
    );
};

// Big section divider between the two source pages.
const GroupHeading = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div className="mt-12 mb-6 first:mt-0">
        <h2 className="text-2xl font-extrabold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        <div className="h-1 w-20 bg-[#F57C00] rounded-full mt-3" />
    </div>
);

/* ------------------------------------------------------------------ */
/*  Reusable presentational components                                */
/* ------------------------------------------------------------------ */

// --- Bullets (Main) ---
const Bullets = ({ items }: { items: string[] }) => (
    <ul className="space-y-1.5">
        {items.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-gray-700 leading-relaxed">
                <span className="text-[#F57C00] mt-1.5">&bull;</span>
                <span>{item}</span>
            </li>
        ))}
    </ul>
);

// --- Labelled bullets (Main) ---
const LabelledBullets = ({ items }: { items: { label: string; text: string }[] }) => (
    <ul className="space-y-2.5">
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

// --- CTA button row (Main) ---
const BUTTON_STYLES: Record<string, string> = {
    primary: 'border-2 border-[#0B3C5D] text-[#0B3C5D] hover:bg-[#0B3C5D] hover:text-white',
    accent: 'border-2 border-[#F57C00] text-[#F57C00] hover:bg-[#F57C00] hover:text-white',
    ghost: 'border-2 border-gray-300 text-gray-500 hover:bg-gray-100',
};
const ButtonRow = ({ items }: { items: { label: string; style: string; icon?: string }[] }) => (
    <div className="flex flex-wrap gap-3">
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

// --- Generic accordion (Main: FAQ / Results: tie-breaking rules) ---
const Accordion = ({ items, prefix }: { items: { question: string; answer: string }[]; prefix?: string }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    return (
        <div className="border border-gray-200 rounded-xl">
            {items.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 last:border-b-0">
                    <button
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    >
                        <p className="font-semibold text-gray-900 text-sm">{prefix}{faq.question}</p>
                        {openIndex === index
                            ? <Minus className="w-4 h-4 text-[#F57C00] flex-shrink-0" />
                            : <Plus className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                    </button>
                    {openIndex === index && (
                        <p className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

// --- Link grid (Main) ---
const LinkGrid = ({ items }: { items: string[] }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((label) => (
            <a key={label} href="#" className="border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:border-[#F57C00] hover:text-[#F57C00] transition-colors">
                {label}
            </a>
        ))}
    </div>
);

// --- News cards (Main) ---
const NewsGrid = ({ items }: { items: { id: number; title: string; date: string; excerpt: string; image: string }[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {items.map((news) => (
            <a key={news.id} href="#" className="block border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group">
                <img src={news.image} alt={news.title} className="w-full h-32 object-cover" />
                <div className="p-4">
                    <p className="text-sm font-semibold text-gray-950 leading-snug mb-1 group-hover:text-[#F57C00] line-clamp-2">{news.title}</p>
                    <p className="text-xs text-gray-400 mb-2">{news.date}</p>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{news.excerpt}</p>
                </div>
            </a>
        ))}
    </div>
);

// --- Date table (Main) ---
const DateTable = ({ rows }: { rows: { event: string; date: string; tag?: string }[] }) => {
    const tagStyles: Record<string, string> = {
        Today: 'text-red-600 font-semibold',
        Expected: 'text-amber-600 italic',
        Over: 'text-gray-400 italic',
    };
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
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
                            <td className={`px-4 py-3 text-gray-600 ${row.tag && row.tag !== 'Over' ? tagStyles[row.tag] : ''}`}>
                                {row.date} {row.tag && row.tag !== 'Over' && <span className="text-xs">({row.tag})</span>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// --- Author widget (Main) ---
const AuthorWidget = () => (
    <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-[#FFF9F3] border border-[#F57C00] flex items-center justify-center text-xs font-bold text-[#F57C00]">CD</div>
        <div>
            <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#F57C00] text-[15px] hover:underline cursor-pointer">Collegedunia Team</span>
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500 text-white">
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7" /></svg>
                </span>
            </div>
            <p className="text-xs text-gray-500 font-medium">Content Curator | Updated on - Jun 13, 2026</p>
        </div>
    </div>
);

// --- Latest updates highlight box (Main) ---
const LatestUpdatesBox = () => (
    <div className="p-4 sm:p-5 bg-[#FFF9F3] border-l-4 border-[#F57C00] rounded-r-xl shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-3">JEE Main Latest Updates</h3>
        <p className="text-sm leading-relaxed text-gray-800">
            <span className="text-red-600 font-bold mr-2">13 Jun, 2026</span>
            <a href="#" className="text-blue-700 hover:text-blue-900 hover:underline font-medium">
                JoSAA 2026 Round 1 seat allotment along with the first JEE Main rank-based closing ranks is published today.
            </a>
        </p>
    </div>
);

// --- Key summary box (Main) ---
const KeySummary = ({ title, items }: { title: string; items: string[] }) => (
    <div className="rounded-2xl bg-[#FFF9F3] border border-[#F6E0C5] p-5 sm:p-6">
        <h3 className="text-red-600 font-bold italic text-lg mb-4">{title}</h3>
        <ul className="space-y-3">
            {items.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-800 font-semibold leading-relaxed">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-gray-700 flex-shrink-0" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

// --- YouTube facade video player (Shared) ---
// Renders a branded thumbnail with a play button; only loads the iframe on click
// (avoids loading the YouTube player until the user actually wants to watch).
const VideoPlayer = ({ title, videoId, thumbnail, channel }: { title: string; videoId: string; thumbnail: string; channel: string }) => {
    const [playing, setPlaying] = useState(false);
    return (
        <div className="max-w-2xl">
            {title && <h4 className="font-bold text-gray-900 mb-3">{title}</h4>}
            <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-black aspect-video">
                {playing ? (
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : (
                    <button onClick={() => setPlaying(true)} className="group block w-full h-full text-left" aria-label={`Play video: ${title}`}>
                        <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
                        <span className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors" />
                        {/* Top channel bar */}
                        <span className="absolute top-0 inset-x-0 flex items-center gap-2 p-3 bg-gradient-to-b from-black/60 to-transparent">
                            <span className="w-7 h-7 rounded-full bg-[#F57C00] flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">CD</span>
                            <span className="min-w-0">
                                <span className="block text-xs font-semibold text-white truncate">{title}</span>
                                <span className="block text-[10px] text-white/70">{channel}</span>
                            </span>
                        </span>
                        {/* Center play button */}
                        <span className="absolute inset-0 flex items-center justify-center">
                            <span className="w-16 h-11 rounded-xl bg-red-600 group-hover:bg-red-700 flex items-center justify-center shadow-lg transition-colors">
                                <Play className="w-6 h-6 text-white fill-white" />
                            </span>
                        </span>
                        {/* Bottom watch badge */}
                        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-[11px] font-semibold text-white">
                            <PlayCircle className="w-4 h-4 text-red-500" /> Watch on YouTube
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
};

// --- Table of contents (Main) ---
const TableOfContents = ({ items }: { items: string[] }) => (
    <div className="border border-gray-200 rounded-xl bg-white shadow-sm">
        <h3 className="px-5 py-3 font-bold text-gray-900 border-b border-gray-200 bg-gray-50 rounded-t-xl">Table of Contents</h3>
        <ol className="px-5 py-4 space-y-2">
            {items.map((item, idx) => (
                <li key={item} className="text-sm flex gap-2">
                    <span className="text-gray-500 font-medium">{idx + 1}.</span>
                    <a href="#" className="text-blue-700 hover:text-[#F57C00] hover:underline font-medium">{item}</a>
                </li>
            ))}
        </ol>
    </div>
);

/* ------- Results-specific components ------- */

// --- Statistic card (Results) ---
const StatCard = ({ icon: Icon, value, label, trend, accent }: { icon: any; value: string; label: string; trend?: string; accent: string }) => (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${accent}`}>
            <Icon className="w-5 h-5" />
        </div>
        <div className="text-2xl font-extrabold text-gray-900">{value}</div>
        <div className="text-xs text-gray-500 mt-0.5 leading-snug">{label}</div>
        {trend && (
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-2">
                <TrendingUp className="w-3 h-3" /> {trend}
            </div>
        )}
    </div>
);

// --- Progress / percentage bar (Results) ---
const ProgressBar = ({ label, percent, color }: { label: string; percent: number; color: string }) => (
    <div>
        <div className="flex items-center justify-between text-xs font-medium text-gray-600 mb-1">
            <span>{label}</span><span>{percent}%</span>
        </div>
        <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }} />
        </div>
    </div>
);

// --- Result checker / login widget (Results) ---
const ResultChecker = () => (
    <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-[#0B3C5D] to-[#11567f] p-5 sm:p-6 text-white max-w-md">
        <div className="flex items-center gap-2 mb-4">
            <Search className="w-5 h-5" />
            <h3 className="font-bold text-lg">Check Your JEE Main Result</h3>
        </div>
        <div className="space-y-3">
            <input type="text" placeholder="Application Number" className="w-full px-4 py-2.5 rounded-lg text-sm text-gray-800 bg-white outline-none" />
            <input type="password" placeholder="Date of Birth / Password" className="w-full px-4 py-2.5 rounded-lg text-sm text-gray-800 bg-white outline-none" />
            <button className="w-full py-2.5 rounded-lg bg-[#F57C00] hover:bg-[#e06f00] font-semibold text-sm transition-colors">
                Check Result
            </button>
        </div>
        <p className="text-[11px] text-white/70 mt-3">Result hosted on jeemain.nta.nic.in. Keep your login credentials handy.</p>
    </div>
);

// --- Numbered step cards (Results: how to check) ---
const StepCards = ({ steps }: { steps: { title: string; text: string }[] }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, i) => (
            <div key={i} className="relative rounded-xl border border-gray-200 bg-white p-4 pt-6">
                <span className="absolute -top-3 left-4 w-8 h-8 rounded-full bg-[#0B3C5D] text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">{step.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{step.text}</p>
            </div>
        ))}
    </div>
);

// --- Horizontal stepper / process (Results: counselling) ---
const Stepper = ({ steps }: { steps: string[] }) => (
    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-0">
        {steps.map((step, i) => (
            <div key={step} className="flex md:flex-1 items-center gap-3 md:gap-0">
                <div className="flex md:flex-col items-center gap-3 md:gap-2 md:flex-1">
                    <span className="w-9 h-9 rounded-full bg-[#F57C00] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                    <span className="text-xs font-medium text-gray-700 md:text-center">{step}</span>
                </div>
                {i < steps.length - 1 && <div className="hidden md:block flex-1 h-0.5 bg-gray-200 mx-1" />}
            </div>
        ))}
    </div>
);

// --- Vertical timeline (Results: result events) ---
const VerticalTimeline = ({ items }: { items: { date: string; title: string; text: string; done?: boolean }[] }) => (
    <ol className="relative border-l-2 border-gray-200 ml-3 space-y-6">
        {items.map((item, i) => (
            <li key={i} className="ml-6">
                <span className={`absolute -left-[9px] w-4 h-4 rounded-full border-2 border-white ${item.done ? 'bg-emerald-500' : 'bg-[#F57C00]'}`} />
                <span className="text-xs font-semibold text-[#F57C00]">{item.date}</span>
                <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{item.text}</p>
            </li>
        ))}
    </ol>
);

// --- Toppers podium (Results) ---
const ToppersPodium = ({ toppers }: { toppers: { rank: number; name: string; score: string }[] }) => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {toppers.map((t) => {
            const medal = t.rank === 1 ? 'from-amber-300 to-amber-500' : t.rank === 2 ? 'from-gray-300 to-gray-400' : 'from-orange-300 to-orange-500';
            return (
                <div key={t.rank} className={`rounded-xl p-5 text-center border border-gray-200 ${t.rank === 1 ? 'sm:-mt-2 shadow-md' : ''}`}>
                    <div className={`mx-auto w-14 h-14 rounded-full bg-gradient-to-br ${medal} flex items-center justify-center mb-3`}>
                        <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wide text-gray-400">Rank #{t.rank}</div>
                    <div className="font-bold text-gray-900 mt-1">{t.name}</div>
                    <div className="text-sm text-[#F57C00] font-semibold mt-1">{t.score}</div>
                </div>
            );
        })}
    </div>
);

// --- Category cutoff table with colored pills (Results) ---
const CategoryCutoffTable = ({ rows }: { rows: { category: string; cutoff: string; color: string }[] }) => (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
            <thead>
                <tr className="bg-gray-50">
                    <th className="text-left font-semibold text-gray-700 px-4 py-3 border-b border-gray-200">Category</th>
                    <th className="text-left font-semibold text-gray-700 px-4 py-3 border-b border-gray-200">Qualifying Percentile (2026)</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={row.category} className="border-b border-gray-100 last:border-0 even:bg-gray-50/50">
                        <td className="px-4 py-3">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${row.color}`}>{row.category}</span>
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-800">{row.cutoff}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// --- Scorecard mock (Results) ---
const ScorecardMock = () => (
    <div className="rounded-xl border border-gray-200 overflow-hidden max-w-lg">
        <div className="bg-[#0B3C5D] text-white px-5 py-4 flex items-center justify-between">
            <div>
                <p className="text-xs text-white/70">National Testing Agency</p>
                <h4 className="font-bold">JEE Main 2026 Scorecard</h4>
            </div>
            <FileText className="w-8 h-8 text-white/80" />
        </div>
        <div className="p-5 space-y-3">
            {[
                ['Candidate Name', 'Aarav Sharma'],
                ['Application No.', '2600XXXXXXX'],
                ['NTA Score (Total)', '99.87 percentile'],
                ['All India Rank (CRL)', '142'],
                ['Category Rank', '38'],
            ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between text-sm border-b border-dashed border-gray-200 pb-2 last:border-0 last:pb-0">
                    <span className="text-gray-500">{k}</span>
                    <span className="font-semibold text-gray-900">{v}</span>
                </div>
            ))}
            <button className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#F57C00] hover:bg-[#e06f00] text-white text-sm font-semibold transition-colors">
                <Download className="w-4 h-4" /> Download Scorecard
            </button>
        </div>
    </div>
);

// --- Gradient CTA banner (Results) ---
const CtaBanner = () => (
    <div className="rounded-xl bg-gradient-to-r from-[#0B3C5D] via-[#11567f] to-[#F57C00] p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h3 className="text-xl font-bold">Know which colleges you can get</h3>
            <p className="text-sm text-white/80 mt-1">Enter your rank and discover your best-fit NITs, IIITs and GFTIs.</p>
        </div>
        <button className="px-6 py-3 rounded-lg bg-white text-[#0B3C5D] font-bold text-sm hover:bg-gray-100 transition-colors whitespace-nowrap flex items-center gap-2">
            <Target className="w-4 h-4" /> Predict My College
        </button>
    </div>
);

// --- Predictor / tool cards (Results) ---
const ToolCards = ({ tools }: { tools: { icon: any; title: string; text: string }[] }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
            <a key={tool.title} href="#" className="group rounded-xl border border-gray-200 bg-white p-5 hover:border-[#F57C00] hover:shadow-md transition-all">
                <div className="w-11 h-11 rounded-lg bg-[#FFF4E8] text-[#F57C00] flex items-center justify-center mb-3">
                    <tool.icon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-gray-900 group-hover:text-[#F57C00]">{tool.title}</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{tool.text}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#F57C00] mt-3">
                    Try now <ChevronRight className="w-3.5 h-3.5" />
                </span>
            </a>
        ))}
    </div>
);

// --- Callouts (Shared: info/success/warning/error) ---
const Callout = ({ variant, title, text }: { variant: 'info' | 'success' | 'warning' | 'error'; title: string; text: string }) => {
    const styles = {
        info: { box: 'bg-blue-50 border-blue-400 text-blue-900', icon: Info, ic: 'text-blue-500' },
        success: { box: 'bg-emerald-50 border-emerald-400 text-emerald-900', icon: CheckCircle2, ic: 'text-emerald-500' },
        warning: { box: 'bg-amber-50 border-amber-400 text-amber-900', icon: AlertTriangle, ic: 'text-amber-500' },
        error: { box: 'bg-red-50 border-red-400 text-red-900', icon: XCircle, ic: 'text-red-500' },
    }[variant];
    const Icon = styles.icon;
    return (
        <div className={`flex gap-3 rounded-lg border-l-4 p-4 ${styles.box}`}>
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${styles.ic}`} />
            <div>
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-sm opacity-90 leading-relaxed">{text}</p>
            </div>
        </div>
    );
};

// --- Pill tabs / segmented control (Results: session switch) ---
const PillTabs = ({ tabs }: { tabs: { label: string; content: React.ReactNode }[] }) => {
    const [active, setActive] = useState(0);
    return (
        <div>
            <div className="inline-flex flex-wrap gap-1 p-1 rounded-lg bg-gray-100 mb-4">
                {tabs.map((tab, i) => (
                    <button
                        key={tab.label}
                        onClick={() => setActive(i)}
                        className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${active === i ? 'bg-white text-[#0B3C5D] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div>{tabs[active].content}</div>
        </div>
    );
};

// --- Quick facts grid (Shared) ---
const QuickFacts = ({ items }: { items: { label: string; value: string }[] }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((item) => (
            <div key={item.label} className="rounded-lg border border-gray-200 p-3">
                <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">{item.label}</p>
                <p className="text-sm font-bold text-gray-900 mt-1">{item.value}</p>
            </div>
        ))}
    </div>
);

// --- Tag chips (Shared) ---
const Chips = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap gap-2">
        {items.map((c) => (
            <a key={c} href="#" className="px-3 py-1.5 rounded-full bg-gray-100 text-xs font-medium text-gray-600 hover:bg-[#FFF4E8] hover:text-[#F57C00] transition-colors">
                {c}
            </a>
        ))}
    </div>
);

// --- Expert quote card (Results) ---
const QuoteCard = () => (
    <div className="rounded-xl border border-gray-200 bg-[#FFF9F3] p-5 flex gap-4">
        <Quote className="w-8 h-8 text-[#F57C00] flex-shrink-0" />
        <div>
            <p className="text-sm text-gray-700 italic leading-relaxed">
                &ldquo;Candidates scoring above 99.5 percentile can realistically target the top NITs in core branches.
                Focus on JoSAA choice-filling strategy rather than chasing a single institute.&rdquo;
            </p>
            <p className="text-xs font-semibold text-gray-900 mt-3">— Career Counsellor, Collegedunia Expert Desk</p>
        </div>
    </div>
);

// --- Sidebar widgets demo (Main) ---
const SidebarWidgets = () => (
    <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 text-xs font-bold">PDF</span>
                </div>
                <p className="text-sm font-semibold text-gray-800 leading-snug">Download Free JEE Main Previous Year Papers with Solutions</p>
            </div>
            <a href="#" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#F57C00] hover:underline">
                <Download className="w-4 h-4" /> Free Download
            </a>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="font-bold text-[#0B3C5D] mb-4">Get More Info About JEE Main</h3>
            <div className="space-y-2.5">
                <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-300 text-gray-500 text-sm font-semibold rounded-lg hover:bg-gray-50"><Download className="w-4 h-4" /> Download Sample Papers</button>
                <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#F57C00] text-[#F57C00] text-sm font-semibold rounded-lg hover:bg-orange-50"><HelpCircle className="w-4 h-4" /> Ask a Question</button>
                <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-300 text-gray-500 text-sm font-semibold rounded-lg hover:bg-gray-50"><Info className="w-4 h-4" /> Get More Info</button>
            </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="font-bold text-[#0B3C5D] mb-4">You Can Also Check</h3>
            <ul className="space-y-1">
                {['Admit Card', 'Cutoff', 'Counselling', 'Rank Predictor', 'College Predictor'].map((link) => (
                    <li key={link}>
                        <a href="#" className="flex items-center justify-between text-sm text-gray-600 hover:text-[#F57C00] py-1.5 border-b border-gray-100 last:border-0">
                            JEE Main {link}<ChevronRight className="w-3.5 h-3.5" />
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

/* ------------------------------------------------------------------ */
/*  Page-level navigation (jump menu) — a UI pattern in itself        */
/* ------------------------------------------------------------------ */

const NAV = [
    { group: 'Exam Main Page', links: [
        ['author-widget', 'Author Widget'], ['latest-updates', 'Latest Updates Box'], ['key-summary', 'Key Summary'],
        ['toc', 'Table of Contents'], ['text-blocks', 'Text & Bullet Blocks'], ['cta-buttons', 'CTA Buttons'],
        ['data-table', 'Data Table'], ['date-table', 'Important Dates'], ['faq', 'FAQ Accordion'],
        ['link-grid', 'Link Grid'], ['news', 'News Cards'], ['sidebar', 'Sidebar Widgets'],
    ]},
    { group: 'Exam Results Page', links: [
        ['stats', 'Result Statistics'], ['progress', 'Progress Bars'], ['checker', 'Result Checker'],
        ['video', 'Video Player'], ['how-to-check', 'How to Check (Steps)'], ['timeline', 'Result Timeline'], ['toppers', 'Toppers Podium'],
        ['toppers-table', 'Toppers Table'], ['category-cutoff', 'Category Cutoff'], ['marks-rank', 'Marks vs Rank'],
        ['scorecard', 'Scorecard'], ['tie-break', 'Tie-Breaking Rules'], ['counselling', 'Counselling Stepper'],
        ['cta-banner', 'CTA Banner'], ['tools', 'Predictor Tools'], ['session-tabs', 'Session Pill Tabs'],
        ['comparison', 'Year Comparison'], ['quote', 'Expert Quote'],
    ]},
    { group: 'Shared / Utility', links: [
        ['callouts', 'Callouts'], ['quick-facts', 'Quick Facts'], ['chips', 'Tag Chips'], ['layout', 'Page Layout'],
    ]},
];

const JumpNav = () => (
    <nav className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 lg:sticky lg:top-6">
        <h3 className="font-bold text-gray-900 mb-3 text-sm">Component Index</h3>
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
            {NAV.map((g) => (
                <div key={g.group}>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">{g.group}</p>
                    <ul className="space-y-0.5">
                        {g.links.map(([id, label]) => (
                            <li key={id}>
                                <a href={`#${id}`} className="block text-xs text-gray-600 hover:text-[#F57C00] py-1 border-l-2 border-transparent hover:border-[#F57C00] pl-2 transition-colors">
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </nav>
);

/* ------------------------------------------------------------------ */
/*  The page                                                          */
/* ------------------------------------------------------------------ */

const MasterUIPage = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
            {/* Intro banner */}
            <div className="rounded-xl bg-gradient-to-r from-[#0B3C5D] to-[#11567f] text-white p-6 sm:p-8 mb-8">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-white/15 px-2.5 py-1 rounded-full">Developer Reference</span>
                <h1 className="text-2xl sm:text-3xl font-extrabold mt-3">Master UI — Exam Component Library</h1>
                <p className="text-sm text-white/80 mt-2 max-w-3xl leading-relaxed">
                    A single source of every reusable Exam UI block — the union of the <b>Exam Main page</b> and the{' '}
                    <b>Exam Results page</b>. Each block below carries a developer label and demo content.
                    Layouts are responsive across desktop, tablet and mobile.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Index */}
                <div className="lg:col-span-1 order-first">
                    <JumpNav />
                </div>

                {/* Showcase column */}
                <div className="lg:col-span-3 space-y-10">

                    {/* ============ EXAM MAIN PAGE ============ */}
                    <div>
                        <GroupHeading title="Exam Main Page Components" subtitle="Patterns from collegedunia.com/exams/jee-main" />
                        <div className="space-y-6">
                            <Showcase id="author-widget" label="AuthorWidget" tag="Main" description="Byline with verified badge and last-updated date. Sits at the top of article content.">
                                <AuthorWidget />
                            </Showcase>

                            <Showcase id="latest-updates" label="LatestUpdatesBox" tag="Main" description="Highlighted cream callout with dated headline link. Used for the most recent exam update.">
                                <LatestUpdatesBox />
                            </Showcase>

                            <Showcase id="key-summary" label="KeySummary" tag="Main" description="Rounded cream box with a red italic heading and bold key takeaways. Used to summarise the most important points of a section.">
                                <KeySummary
                                    title="Key Summary"
                                    items={[
                                        'The Scorecard of candidates is created as per their names in the 10th Class Certificate or Mark sheet.',
                                        'No re-evaluation or re-checking of the result will be done, and no correspondence in this regard shall be entertained.',
                                        'The raw scores will be converted to the NTA score for the paper conducted in multiple shifts.',
                                        'The JEE Main 2026 results can be utilized by other entities of the Central or State governments with their eligibility criteria/norms.',
                                        'A copy of the Final NTA Score of JEE Main will be sent to the registered e-mail ID of the Candidates.',
                                        'The top 2.5 lakh candidates of different categories will qualify for JEE Advanced 2026.',
                                    ]}
                                />
                            </Showcase>

                            <Showcase id="toc" label="TableOfContents" tag="Main" description="Anchored, numbered jump list to in-page sections.">
                                <TableOfContents items={['Overview', 'Eligibility', 'Exam Pattern', 'Syllabus', 'Result', 'Cutoff', 'FAQs']} />
                            </Showcase>

                            <Showcase id="text-blocks" label="Bullets / LabelledBullets / Heading / Paragraph" tag="Main" description="Core article text primitives.">
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-gray-950 text-base">Section heading example</h3>
                                    <p className="text-sm text-gray-700 leading-relaxed">A paragraph block carries the descriptive body copy used throughout the exam article sections.</p>
                                    <Bullets items={['Conducted by NTA twice a year', 'Computer-based test (CBT) mode', 'Accepted by NITs, IIITs and GFTIs']} />
                                    <LabelledBullets items={[
                                        { label: 'Mode:', text: 'Online (Computer Based Test)' },
                                        { label: 'Duration:', text: '3 hours (180 minutes)' },
                                        { label: 'Sessions:', text: 'Two — January and April' },
                                    ]} />
                                </div>
                            </Showcase>

                            <Showcase id="cta-buttons" label="ButtonRow" tag="Main" description="Primary / accent / ghost CTA buttons with optional icon.">
                                <ButtonRow items={[
                                    { label: 'Apply Now', style: 'primary' },
                                    { label: 'Check Eligibility', style: 'accent', icon: 'check' },
                                    { label: 'Get Updates', style: 'ghost' },
                                ]} />
                            </Showcase>

                            <Showcase id="data-table" label="DataTable" tag="Shared" description="Generic responsive table (horizontal scroll on mobile). Shared by Main & Results pages.">
                                <DataTable
                                    headers={['Particulars', 'Details']}
                                    rows={[
                                        ['Exam Name', 'JEE Main 2026'],
                                        ['Conducting Body', 'National Testing Agency'],
                                        ['Mode', 'Online (CBT)'],
                                        ['Papers', 'Paper 1 (BE/BTech), Paper 2 (BArch/BPlanning)'],
                                    ]}
                                />
                            </Showcase>

                            <Showcase id="date-table" label="DateTable" tag="Main" description="Important-dates table with Today / Expected / Over status tags.">
                                <DateTable rows={[
                                    { event: 'Session 1 Result', date: 'Feb 12, 2026', tag: 'Over' },
                                    { event: 'Session 2 Result', date: 'Apr 25, 2026', tag: 'Over' },
                                    { event: 'JoSAA Round 1 Allotment', date: 'Jun 13, 2026', tag: 'Today' },
                                    { event: 'JoSAA Round 2 Allotment', date: 'Jun 22, 2026', tag: 'Expected' },
                                ]} />
                            </Showcase>

                            <Showcase id="faq" label="Accordion (FAQ)" tag="Shared" description="Collapsible Q&A. Reused for tie-breaking rules below.">
                                <Accordion prefix="Ques. " items={[
                                    { question: 'When was the JEE Main 2026 result declared?', answer: 'The final JEE Main 2026 result was declared on April 25, 2026 on jeemain.nta.nic.in.' },
                                    { question: 'How is the JEE Main rank calculated?', answer: 'Ranks are based on the NTA percentile score computed using the normalisation procedure across sessions.' },
                                ]} />
                            </Showcase>

                            <Showcase id="link-grid" label="LinkGrid" tag="Main" description="Responsive grid of related-link cards (1/2/3 columns).">
                                <LinkGrid items={['JEE Main Cutoff', 'JEE Main Syllabus', 'JEE Main Admit Card', 'JEE Main Counselling', 'JEE Main Question Papers', 'JEE Main Mock Test']} />
                            </Showcase>

                            <Showcase id="news" label="NewsGrid" tag="Main" description="Three-up news cards with image, title, date, excerpt and View More.">
                                <NewsGrid items={[
                                    { id: 1, title: 'JoSAA 2026 Round 1 Seat Allotment Released', date: 'Jun 13, 2026', excerpt: 'Round 1 allotment for NITs, IIITs and GFTIs published today.', image: 'https://picsum.photos/seed/news1/400/240' },
                                    { id: 2, title: 'JEE Main Cutoff 2026: Closing Ranks Out', date: 'Jun 13, 2026', excerpt: 'Check category-wise closing ranks and marks vs rank analysis.', image: 'https://picsum.photos/seed/news2/400/240' },
                                    { id: 3, title: 'CSAB Special Rounds Expected in July', date: 'Jun 11, 2026', excerpt: 'Registration likely to open in the third week of July 2026.', image: 'https://picsum.photos/seed/news3/400/240' },
                                ]} />
                            </Showcase>

                            <Showcase id="sidebar" label="SidebarWidgets" tag="Main" description="Right-rail widget stack: PDF download, info CTAs, related links. Sticky on desktop in the real layout.">
                                <div className="max-w-sm"><SidebarWidgets /></div>
                            </Showcase>
                        </div>
                    </div>

                    {/* ============ EXAM RESULTS PAGE ============ */}
                    <div>
                        <GroupHeading title="Exam Results Page Components" subtitle="Patterns from collegedunia.com/exams/jee-main/results" />
                        <div className="space-y-6">
                            <Showcase id="stats" label="StatCard grid" tag="Results" description="Headline result statistics. 2-up on mobile, 4-up on desktop.">
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <StatCard icon={Users} value="14.15 L" label="Candidates Registered" trend="+3.2% YoY" accent="bg-blue-50 text-blue-600" />
                                    <StatCard icon={Award} value="24" label="Perfect 100 Percentilers" accent="bg-emerald-50 text-emerald-600" />
                                    <StatCard icon={BarChart3} value="93.10" label="General Qualifying %ile" accent="bg-amber-50 text-amber-600" />
                                    <StatCard icon={GraduationCap} value="2.5 L" label="Qualified for Advanced" trend="+1.1% YoY" accent="bg-purple-50 text-purple-600" />
                                </div>
                            </Showcase>

                            <Showcase id="progress" label="ProgressBar" tag="Results" description="Percentage visualisation for pass / category distribution.">
                                <div className="space-y-4 max-w-md">
                                    <ProgressBar label="Overall Pass Percentage" percent={82} color="bg-emerald-500" />
                                    <ProgressBar label="Male Candidates" percent={66} color="bg-blue-500" />
                                    <ProgressBar label="Female Candidates" percent={34} color="bg-[#F57C00]" />
                                </div>
                            </Showcase>

                            <Showcase id="checker" label="ResultChecker" tag="Results" description="Login widget to fetch result by application number + DOB/password.">
                                <ResultChecker />
                            </Showcase>

                            <Showcase id="video" label="VideoPlayer" tag="Shared" description="YouTube facade — branded thumbnail with play button that only loads the embed on click. Responsive 16:9.">
                                <VideoPlayer
                                    title="How to check JEE Main Session 2 Result 2026"
                                    channel="Collegedunia Exams"
                                    videoId="ScMzIvxBSi4"
                                    thumbnail="https://picsum.photos/seed/jee-result-video/800/450"
                                />
                            </Showcase>

                            <Showcase id="how-to-check" label="StepCards" tag="Results" description="Numbered how-to-check steps. 1/2/4 columns across breakpoints.">
                                <StepCards steps={[
                                    { title: 'Visit Official Site', text: 'Go to jeemain.nta.nic.in and open the result link.' },
                                    { title: 'Enter Credentials', text: 'Type your application number and date of birth.' },
                                    { title: 'View Scorecard', text: 'Your NTA score and percentile appear on screen.' },
                                    { title: 'Download PDF', text: 'Save and print the scorecard for counselling.' },
                                ]} />
                            </Showcase>

                            <Showcase id="timeline" label="VerticalTimeline" tag="Results" description="Chronological result-event timeline with done / upcoming states.">
                                <VerticalTimeline items={[
                                    { date: 'Feb 12, 2026', title: 'Session 1 Result', text: 'NTA scores for January session released.', done: true },
                                    { date: 'Apr 25, 2026', title: 'Session 2 & Final Result', text: 'Final percentile and AIR declared.', done: true },
                                    { date: 'Apr 26, 2026', title: 'Final Answer Key', text: 'Released alongside the result.', done: true },
                                    { date: 'Jun 13, 2026', title: 'JoSAA Round 1', text: 'First rank-based seat allotment.' },
                                ]} />
                            </Showcase>

                            <Showcase id="toppers" label="ToppersPodium" tag="Results" description="Top-3 podium cards with medal styling; rank #1 lifted on desktop.">
                                <ToppersPodium toppers={[
                                    { rank: 2, name: 'Ishaan Verma', score: '99.99 %ile' },
                                    { rank: 1, name: 'Aarav Sharma', score: '100 %ile' },
                                    { rank: 3, name: 'Diya Patel', score: '99.98 %ile' },
                                ]} />
                            </Showcase>

                            <Showcase id="toppers-table" label="DataTable (Toppers list)" tag="Results" description="Full toppers list using the shared DataTable.">
                                <DataTable
                                    headers={['AIR', 'Candidate', 'State', 'Percentile']}
                                    rows={[
                                        [1, 'Aarav Sharma', 'Rajasthan', '100'],
                                        [2, 'Ishaan Verma', 'Telangana', '99.99'],
                                        [3, 'Diya Patel', 'Maharashtra', '99.98'],
                                        [4, 'Kabir Rao', 'Karnataka', '99.98'],
                                    ]}
                                />
                            </Showcase>

                            <Showcase id="category-cutoff" label="CategoryCutoffTable" tag="Results" description="Category-wise qualifying percentile with coloured category pills.">
                                <CategoryCutoffTable rows={[
                                    { category: 'General (CRL)', cutoff: '93.1023174', color: 'bg-blue-100 text-blue-700' },
                                    { category: 'EWS', cutoff: '80.3833137', color: 'bg-purple-100 text-purple-700' },
                                    { category: 'OBC-NCL', cutoff: '79.4313582', color: 'bg-amber-100 text-amber-700' },
                                    { category: 'SC', cutoff: '60.0923182', color: 'bg-emerald-100 text-emerald-700' },
                                    { category: 'ST', cutoff: '47.1156845', color: 'bg-red-100 text-red-700' },
                                ]} />
                            </Showcase>

                            <Showcase id="marks-rank" label="DataTable (Marks vs Rank)" tag="Results" description="Marks/percentile-to-rank range mapping.">
                                <DataTable
                                    headers={['Percentile', 'Marks Range', 'Expected Rank']}
                                    rows={[
                                        ['99.9 – 100', '281 – 300', '1 – 1,000'],
                                        ['99.0 – 99.9', '241 – 280', '1,000 – 12,000'],
                                        ['98.0 – 99.0', '221 – 240', '12,000 – 24,000'],
                                        ['95.0 – 98.0', '181 – 220', '24,000 – 60,000'],
                                    ]}
                                />
                            </Showcase>

                            <Showcase id="scorecard" label="ScorecardMock" tag="Results" description="Sample NTA scorecard card with downloadable action.">
                                <ScorecardMock />
                            </Showcase>

                            <Showcase id="tie-break" label="Accordion (Tie-Breaking Rules)" tag="Results" description="Reuses the Accordion to explain rank tie-breakers in order.">
                                <Accordion items={[
                                    { question: 'Higher NTA score in Mathematics', answer: 'The candidate with the higher Mathematics score is ranked above.' },
                                    { question: 'Higher NTA score in Physics', answer: 'If still tied, Physics score is compared next.' },
                                    { question: 'Fewer incorrect answers overall', answer: 'A lower ratio of wrong to correct answers breaks the tie.' },
                                    { question: 'Older candidate by date of birth', answer: 'Finally, the elder candidate is given the better rank.' },
                                ]} />
                            </Showcase>

                            <Showcase id="counselling" label="Stepper" tag="Results" description="Horizontal process stepper (stacks vertically on mobile). Used for counselling flow.">
                                <Stepper steps={['Registration', 'Choice Filling', 'Mock Allotment', 'Seat Allotment', 'Reporting']} />
                            </Showcase>

                            <Showcase id="cta-banner" label="CtaBanner" tag="Results" description="Full-width gradient promo banner with single action.">
                                <CtaBanner />
                            </Showcase>

                            <Showcase id="tools" label="ToolCards" tag="Results" description="Predictor / calculator tool cards grid.">
                                <ToolCards tools={[
                                    { icon: Target, title: 'College Predictor', text: 'Find colleges you can get with your rank.' },
                                    { icon: TrendingUp, title: 'Rank Predictor', text: 'Estimate your AIR from expected marks.' },
                                    { icon: Calculator, title: 'Score Calculator', text: 'Compute your score from the answer key.' },
                                ]} />
                            </Showcase>

                            <Showcase id="session-tabs" label="PillTabs" tag="Results" description="Segmented control to switch content (e.g. Session 1 vs Session 2 results).">
                                <PillTabs tabs={[
                                    { label: 'Session 1', content: <DataTable headers={['Metric', 'Value']} rows={[['Registered', '12.6 L'], ['Appeared', '11.7 L'], ['100 %ilers', '14']]} /> },
                                    { label: 'Session 2', content: <DataTable headers={['Metric', 'Value']} rows={[['Registered', '10.9 L'], ['Appeared', '9.9 L'], ['100 %ilers', '10']]} /> },
                                ]} />
                            </Showcase>

                            <Showcase id="comparison" label="DataTable (Year Comparison)" tag="Results" description="Year-on-year result comparison.">
                                <DataTable
                                    headers={['Metric', '2024', '2025', '2026']}
                                    rows={[
                                        ['Registered (lakh)', '12.3', '13.1', '14.15'],
                                        ['100 Percentilers', '23', '24', '24'],
                                        ['General Cutoff', '93.23', '93.10', '93.10'],
                                    ]}
                                />
                            </Showcase>

                            <Showcase id="quote" label="QuoteCard" tag="Results" description="Expert commentary / pull-quote block.">
                                <QuoteCard />
                            </Showcase>
                        </div>
                    </div>

                    {/* ============ SHARED / UTILITY ============ */}
                    <div>
                        <GroupHeading title="Shared & Utility Components" subtitle="Cross-cutting blocks used by both pages" />
                        <div className="space-y-6">
                            <Showcase id="callouts" label="Callout" tag="Shared" description="Info / success / warning / error message boxes.">
                                <div className="space-y-3">
                                    <Callout variant="info" title="Good to know" text="Result is available in online mode only; no scorecard is sent by post." />
                                    <Callout variant="success" title="Result Declared" text="The final JEE Main 2026 result was declared on April 25, 2026." />
                                    <Callout variant="warning" title="Keep handy" text="Do not lose your application number — it is required for counselling." />
                                    <Callout variant="error" title="Common mistake" text="Entering date of birth in the wrong format will fail the login." />
                                </div>
                            </Showcase>

                            <Showcase id="quick-facts" label="QuickFacts" tag="Shared" description="Compact key-value fact grid.">
                                <QuickFacts items={[
                                    { label: 'Exam Date', value: 'Jan & Apr 2026' },
                                    { label: 'Result Date', value: 'Apr 25, 2026' },
                                    { label: 'Mode', value: 'Online CBT' },
                                    { label: 'Sessions', value: 'Two' },
                                    { label: 'Total Marks', value: '300' },
                                    { label: 'Duration', value: '3 Hours' },
                                    { label: 'Languages', value: '13' },
                                    { label: 'Validity', value: '1 Year' },
                                ]} />
                            </Showcase>

                            <Showcase id="chips" label="Chips" tag="Shared" description="Tag / related-topic chips.">
                                <Chips items={['NITs', 'IIITs', 'GFTIs', 'JoSAA', 'CSAB', 'BTech', 'BArch', 'Counselling']} />
                            </Showcase>

                            <Showcase id="layout" label="Two-Column Page Layout" tag="Shared" description="The canonical content + sticky sidebar grid (2/3 + 1/3 on desktop, stacked on mobile).">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    <div className="lg:col-span-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-sm text-gray-400 flex items-center justify-center min-h-[160px]">
                                        Main content column (lg:col-span-2)
                                    </div>
                                    <div className="lg:col-span-1 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-sm text-gray-400 flex items-center justify-center min-h-[160px]">
                                        Sidebar column (lg:col-span-1, sticky)
                                    </div>
                                </div>
                            </Showcase>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-4">
                        <Share2 className="w-3.5 h-3.5" /> Master UI · union of Exam Main + Results page components
                        <Bell className="w-3.5 h-3.5" /> <Calendar className="w-3.5 h-3.5" /> <BookOpen className="w-3.5 h-3.5" /> <Clock className="w-3.5 h-3.5" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MasterUIPage;
