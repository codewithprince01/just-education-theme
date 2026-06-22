"use client";

import { useEffect, useState } from 'react';
import { Play, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import type { GalleryItem } from '@/data/languageCenterData';
import SectionHeading from '@/components/testimonials/SectionHeading';

interface LcGalleryProps {
  items: GalleryItem[];
}

const categories = ['All', 'Classroom', 'Events', 'Campus'] as const;

export default function LcGallery({ items }: LcGalleryProps) {
  const [filter, setFilter] = useState<(typeof categories)[number]>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = filter === 'All' ? items : items.filter((i) => i.category === filter);

  const close = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length));
  const next = () => setLightboxIndex((i) => (i === null ? i : (i + 1) % filtered.length));

  useEffect(() => {
    if (lightboxIndex === null) return;
    const len = filtered.length;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i === null ? i : (i - 1 + len) % len));
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i === null ? i : (i + 1) % len));
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxIndex, filtered.length]);

  const active = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <section className="py-10 scroll-mt-24" id="gallery">
      <SectionHeading
        eyebrow="Media Gallery"
        title="A Glimpse Inside LinguaVerse"
        description="Classrooms, cultural events and campus life — see where your language journey begins."
      />

      {/* Filter chips */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
              filter === cat
                ? 'bg-[#0a2540] text-white shadow-md'
                : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-blue-300 hover:text-blue-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry-ish grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {filtered.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setLightboxIndex(idx)}
            className={`group relative overflow-hidden rounded-2xl ring-1 ring-black/5 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-400/50 ${
              idx % 5 === 0 ? 'col-span-2 row-span-2' : ''
            }`}
            aria-label={`Open ${item.caption}`}
          >
            <img
              src={item.src}
              alt={item.caption}
              loading="lazy"
              className="h-full min-h-[120px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {item.type === 'video' && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-orange-500 shadow-xl transition-transform duration-300 group-hover:scale-110">
                  <Play size={20} className="translate-x-0.5 fill-current" />
                </span>
              </span>
            )}

            {item.duration && (
              <span className="absolute right-2 top-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                {item.duration}
              </span>
            )}

            <span className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 p-3 text-xs font-semibold text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
              <Camera size={12} /> {item.caption}
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-[#0a2540]/85 backdrop-blur-sm je-animate-fade" onClick={close} />

          <button
            onClick={close}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
            aria-label="Close gallery"
          >
            <X size={22} />
          </button>

          <button
            onClick={prev}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white/80 transition-colors hover:bg-white/20 hover:text-white md:left-6"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white/80 transition-colors hover:bg-white/20 hover:text-white md:right-6"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>

          <figure className="relative z-10 w-full max-w-4xl je-animate-pop">
            <div className="relative overflow-hidden rounded-2xl bg-black">
              <img src={active.src} alt={active.caption} className="max-h-[75vh] w-full object-contain" />
              {active.type === 'video' && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-orange-500 shadow-xl">
                    <Play size={28} className="translate-x-0.5 fill-current" />
                  </span>
                </span>
              )}
            </div>
            <figcaption className="mt-3 text-center text-sm font-medium text-blue-100/90">
              {active.caption} · {(lightboxIndex ?? 0) + 1} / {filtered.length}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
