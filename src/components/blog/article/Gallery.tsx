'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import type { GalleryImage } from '@/data/blog/types';

// Image gallery with a lightbox overlay (keyboard + arrow navigation).
export default function Gallery({ images }: { images: GalleryImage[] }) {
    const [open, setOpen] = useState<number | null>(null);
    if (!images || images.length === 0) return null;

    const show = (i: number) => setOpen((i + images.length) % images.length);

    return (
        <section className="my-8">
            <h2 className="flex items-center gap-2 text-lg font-bold text-[#0B3C5D] mb-4">
                <Images className="w-5 h-5 text-[#F57C00]" /> Image Gallery
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setOpen(i)}
                        className="group relative aspect-[4/3] overflow-hidden rounded-xl"
                        aria-label={`Open image: ${img.alt}`}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </button>
                ))}
            </div>

            {open !== null && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" role="dialog" aria-modal="true">
                    <button onClick={() => setOpen(null)} aria-label="Close gallery" className="absolute top-4 right-4 text-white/80 hover:text-white">
                        <X className="w-7 h-7" />
                    </button>
                    {images.length > 1 && (
                        <>
                            <button onClick={() => show(open - 1)} aria-label="Previous image" className="absolute left-4 text-white/80 hover:text-white">
                                <ChevronLeft className="w-8 h-8" />
                            </button>
                            <button onClick={() => show(open + 1)} aria-label="Next image" className="absolute right-4 text-white/80 hover:text-white">
                                <ChevronRight className="w-8 h-8" />
                            </button>
                        </>
                    )}
                    <figure className="max-w-4xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={images[open].src} alt={images[open].alt} className="max-h-[80vh] w-auto mx-auto rounded-lg" />
                        {images[open].caption && (
                            <figcaption className="text-center text-sm text-white/70 mt-3">{images[open].caption}</figcaption>
                        )}
                    </figure>
                </div>
            )}
        </section>
    );
}
