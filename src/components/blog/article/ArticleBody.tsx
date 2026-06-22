import { Info, Lightbulb, AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react';
import type { ContentBlock } from '@/data/blog/types';

const CALLOUT = {
    info: { icon: Info, cls: 'bg-blue-50 border-blue-200 text-blue-900', iconCls: 'text-blue-500', label: 'Note' },
    tip: { icon: Lightbulb, cls: 'bg-orange-50 border-orange-200 text-orange-900', iconCls: 'text-[#F57C00]', label: 'Expert Tip' },
    warning: { icon: AlertTriangle, cls: 'bg-amber-50 border-amber-200 text-amber-900', iconCls: 'text-amber-500', label: 'Important' },
    success: { icon: CheckCircle2, cls: 'bg-green-50 border-green-200 text-green-900', iconCls: 'text-green-600', label: 'Success' },
};

// Renders structured content blocks. Heading blocks carry stable ids so the
// table of contents and in-page anchors line up.
export default function ArticleBody({ blocks }: { blocks: ContentBlock[] }) {
    return (
        <div className="space-y-5 text-[15px] md:text-base leading-relaxed text-gray-700">
            {blocks.map((block, i) => {
                switch (block.type) {
                    case 'paragraph':
                        return <p key={i}>{block.text}</p>;

                    case 'heading': {
                        const cls =
                            block.level === 2
                                ? 'text-2xl font-extrabold text-[#0B3C5D] mt-10 mb-1 scroll-mt-24'
                                : 'text-xl font-bold text-gray-900 mt-8 mb-1 scroll-mt-24';
                        return block.level === 2 ? (
                            <h2 key={i} id={block.id} className={cls}>{block.text}</h2>
                        ) : (
                            <h3 key={i} id={block.id} className={cls}>{block.text}</h3>
                        );
                    }

                    case 'list':
                        return block.ordered ? (
                            <ol key={i} className="list-decimal pl-6 space-y-2 marker:text-[#F57C00] marker:font-bold">
                                {block.items.map((it, j) => <li key={j}>{it}</li>)}
                            </ol>
                        ) : (
                            <ul key={i} className="space-y-2">
                                {block.items.map((it, j) => (
                                    <li key={j} className="flex gap-2.5">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#F57C00] flex-shrink-0" aria-hidden="true" />
                                        <span>{it}</span>
                                    </li>
                                ))}
                            </ul>
                        );

                    case 'quote':
                        return (
                            <blockquote key={i} className="border-l-4 border-[#F57C00] bg-orange-50/50 rounded-r-lg pl-5 pr-4 py-4 my-6">
                                <p className="text-lg font-medium text-gray-800 italic">“{block.text}”</p>
                                {block.cite && <footer className="mt-2 text-sm font-semibold text-[#F57C00]">— {block.cite}</footer>}
                            </blockquote>
                        );

                    case 'image':
                        return (
                            <figure key={i} className="my-6">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={block.src} alt={block.alt} loading="lazy" className="w-full rounded-xl shadow-sm" />
                                {block.caption && <figcaption className="text-xs text-gray-400 mt-2 text-center">{block.caption}</figcaption>}
                            </figure>
                        );

                    case 'callout': {
                        const c = CALLOUT[block.variant];
                        const Icon = c.icon;
                        return (
                            <div key={i} className={`flex gap-3 border rounded-xl p-4 my-6 ${c.cls}`}>
                                <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${c.iconCls}`} aria-hidden="true" />
                                <div>
                                    <p className="font-bold mb-1">{block.title ?? c.label}</p>
                                    <p className="text-sm">{block.text}</p>
                                </div>
                            </div>
                        );
                    }

                    case 'keyInsight':
                        return (
                            <div key={i} className="my-7 rounded-xl border-l-4 border-[#F57C00] bg-gradient-to-r from-orange-50 to-white p-5 shadow-sm">
                                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#F57C00] mb-2">
                                    <Sparkles className="w-4 h-4" /> {block.title ?? 'Key Insight'}
                                </p>
                                <p className="text-gray-800 font-medium leading-relaxed">{block.text}</p>
                            </div>
                        );

                    case 'timeline':
                        return (
                            <ol key={i} className="my-7 space-y-5 border-l-2 border-orange-200 pl-6 ml-1.5">
                                {block.items.map((it, j) => (
                                    <li key={j} className="relative">
                                        <span className="absolute -left-[32px] top-1 w-4 h-4 rounded-full bg-[#F57C00] ring-4 ring-orange-100" aria-hidden="true" />
                                        <p className="font-bold text-[#0B3C5D]">{it.title}</p>
                                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">{it.text}</p>
                                    </li>
                                ))}
                            </ol>
                        );

                    case 'table':
                        return (
                            <div key={i} className="my-6 overflow-x-auto rounded-xl border border-gray-200">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            {block.headers.map((h, j) => (
                                                <th key={j} className="text-left font-bold text-gray-700 px-4 py-3 whitespace-nowrap">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {block.rows.map((row, r) => (
                                            <tr key={r} className="hover:bg-gray-50/50">
                                                {row.map((cell, c) => (
                                                    <td key={c} className="px-4 py-3 text-gray-600">{cell}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        );

                    case 'divider':
                        return <hr key={i} className="my-8 border-gray-200" />;

                    default:
                        return null;
                }
            })}
        </div>
    );
}
