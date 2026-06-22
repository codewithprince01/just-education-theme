"use client";

import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { testimonials } from '@/data/contactConfig';

export default function Testimonials() {
    const [index, setIndex] = useState(0);
    const [perView, setPerView] = useState(1);
    const [paused, setPaused] = useState(false);

    // Responsive cards-per-view.
    useEffect(() => {
        const compute = () => {
            const w = window.innerWidth;
            setPerView(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
        };
        compute();
        window.addEventListener('resize', compute);
        return () => window.removeEventListener('resize', compute);
    }, []);

    const maxIndex = Math.max(0, testimonials.length - perView);
    // Derive the in-range index during render so resizing never needs a
    // clamp-in-effect (which would trigger cascading renders).
    const safeIndex = Math.min(index, maxIndex);

    const go = useCallback(
        (dir: number) => {
            setIndex((i) => {
                const next = Math.min(i, maxIndex) + dir;
                if (next < 0) return maxIndex;
                if (next > maxIndex) return 0;
                return next;
            });
        },
        [maxIndex],
    );

    // Autoplay.
    useEffect(() => {
        if (paused) return;
        const reduce =
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) return;
        const id = window.setInterval(() => go(1), 4500);
        return () => window.clearInterval(id);
    }, [go, paused]);

    return (
        <section className="bg-gray-50">
            <div
                className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 md:py-20"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                    <div>
                        <span className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full bg-orange-50 text-[#F57C00]">
                            Testimonials
                        </span>
                        <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B3C5D] tracking-tight">
                            Loved by teams who reached out
                        </h2>
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => go(-1)}
                            aria-label="Previous testimonials"
                            className="w-11 h-11 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:text-[#F57C00] hover:border-[#F57C00] transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => go(1)}
                            aria-label="Next testimonials"
                            className="w-11 h-11 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:text-[#F57C00] hover:border-[#F57C00] transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Track */}
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${safeIndex * (100 / perView)}%)` }}
                    >
                        {testimonials.map((t) => (
                            <div
                                key={t.id}
                                className="flex-shrink-0 px-3"
                                style={{ width: `${100 / perView}%` }}
                            >
                                <figure className="h-full flex flex-col rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-shadow p-6">
                                    <Quote className="w-8 h-8 text-orange-200" />
                                    <div className="flex gap-0.5 mt-3" aria-label={`${t.rating} out of 5 stars`}>
                                        {Array.from({ length: 5 }).map((_, s) => (
                                            <Star
                                                key={s}
                                                className={`w-4 h-4 ${s < t.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`}
                                            />
                                        ))}
                                    </div>
                                    <blockquote className="mt-4 flex-1 text-gray-700 leading-relaxed text-sm">
                                        “{t.quote}”
                                    </blockquote>
                                    <figcaption className="mt-6 flex items-center gap-3 pt-4 border-t border-gray-100">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={t.avatar}
                                            alt={t.name}
                                            loading="lazy"
                                            className="w-11 h-11 rounded-full object-cover border border-gray-200"
                                        />
                                        <div>
                                            <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                                            <div className="text-xs text-gray-500">
                                                {t.role}, {t.company}
                                            </div>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: maxIndex + 1 }).map((_, d) => (
                        <button
                            key={d}
                            type="button"
                            onClick={() => setIndex(d)}
                            aria-label={`Go to slide ${d + 1}`}
                            className={`h-2 rounded-full transition-all ${d === safeIndex ? 'w-6 bg-[#F57C00]' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
