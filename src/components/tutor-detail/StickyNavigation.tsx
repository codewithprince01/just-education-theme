'use client';

import { useEffect, useRef, useState } from 'react';

const NAV_TABS = [
  { label: 'Overview', id: 'section-overview' },
  { label: 'Subjects', id: 'section-subjects' },
  { label: 'Methodology', id: 'section-methodology' },
  { label: 'Availability', id: 'section-availability' },
  { label: 'Student Success', id: 'section-success' },
  { label: 'Resources', id: 'section-resources' },
  { label: 'Reviews', id: 'section-reviews' },
  { label: 'FAQs', id: 'section-faqs' },
];

export default function StickyNavigation() {
  const [activeId, setActiveId] = useState<string>(NAV_TABS[0].id);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_TABS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const btn = tabRefs.current[activeId];
    if (btn && scrollerRef.current) {
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeId]);

  function handleClick(id: string) {
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
      <div
        ref={scrollerRef}
        className="flex overflow-x-auto max-w-7xl mx-auto px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {NAV_TABS.map(({ label, id }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              ref={(el) => { tabRefs.current[id] = el; }}
              onClick={() => handleClick(id)}
              className={`shrink-0 px-4 py-4 text-sm font-medium border-b-2 transition-all duration-150 whitespace-nowrap ${
                isActive ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-[#0a2540]'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
