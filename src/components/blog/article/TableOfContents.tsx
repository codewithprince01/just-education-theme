'use client';

import { useEffect, useState } from 'react';
import { List, ArrowRight, MessageSquare } from 'lucide-react';
import EnquiryModal from './EnquiryModal';

export interface TocItem {
    id: string;
    text: string;
    level: 2 | 3;
}

// Scroll-spy table of contents with numbered top-level sections and
// Apply / Enquire conversion CTAs that open a popup enquiry form.
export default function TableOfContents({ items }: { items: TocItem[] }) {
    const [active, setActive] = useState<string>(items[0]?.id ?? '');
    const [modal, setModal] = useState<string | null>(null);

    useEffect(() => {
        if (items.length === 0) return;
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) setActive(visible[0].target.id);
            },
            { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
        );
        items.forEach((it) => {
            const el = document.getElementById(it.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [items]);

    if (items.length === 0) return null;

    function go(e: React.MouseEvent, id: string) {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActive(id);
        }
    }

    // Number the top-level (h2) sections: 1, 2, 3…
    let counter = 0;
    const numbered = items.map((it) => ({ ...it, num: it.level === 2 ? ++counter : undefined }));

    return (
        <>
        <nav aria-label="Table of contents" className="bg-white rounded-xl border border-gray-200 shadow-md p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-[#0B3C5D] uppercase tracking-wide mb-4">
                <List className="w-4 h-4 text-[#F57C00]" /> Table of Contents
            </h2>
            <ul className="space-y-0.5">
                {numbered.map((it) => {
                    const isActive = active === it.id;
                    return (
                        <li key={it.id}>
                            <a
                                href={`#${it.id}`}
                                onClick={(e) => go(e, it.id)}
                                className={`flex items-start gap-2 py-1.5 text-sm transition-colors rounded-md px-2 -mx-2 ${
                                    it.level === 3 ? 'pl-7' : ''
                                } ${
                                    isActive
                                        ? 'text-[#F57C00] font-semibold bg-orange-50'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                            >
                                {it.num !== undefined && (
                                    <span className={`flex-shrink-0 w-5 h-5 rounded-md text-[11px] font-bold flex items-center justify-center mt-0.5 ${isActive ? 'bg-[#F57C00] text-white' : 'bg-gray-100 text-gray-500'}`}>
                                        {it.num}
                                    </span>
                                )}
                                <span className="leading-snug">{it.text}</span>
                            </a>
                        </li>
                    );
                })}
            </ul>

            {/* Conversion CTAs — open the enquiry popup */}
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                <button
                    onClick={() => setModal('Apply Now')}
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#F57C00] hover:bg-[#E67300] text-white font-bold rounded-lg text-sm transition-colors"
                >
                    Apply Here <ArrowRight className="w-4 h-4" />
                </button>
                <button
                    onClick={() => setModal('Enquire Now')}
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-white border border-[#0B3C5D] text-[#0B3C5D] hover:bg-[#0B3C5D] hover:text-white font-bold rounded-lg text-sm transition-colors"
                >
                    <MessageSquare className="w-4 h-4" /> Enquire Now
                </button>
            </div>
        </nav>

        {modal && <EnquiryModal title={modal} onClose={() => setModal(null)} />}
        </>
    );
}
