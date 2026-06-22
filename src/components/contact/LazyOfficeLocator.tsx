"use client";

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

/** Skeleton shown before the map chunk loads — mirrors the real split layout. */
function LocatorSkeleton() {
    return (
        <section className="bg-gradient-to-b from-gray-50 via-white to-gray-50">
            <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
                <div className="mx-auto mb-10 max-w-2xl text-center">
                    <div className="mx-auto h-6 w-24 animate-pulse rounded-full bg-gray-200" />
                    <div className="mx-auto mt-4 h-9 w-80 max-w-full animate-pulse rounded bg-gray-200" />
                    <div className="mx-auto mt-4 h-4 w-96 max-w-full animate-pulse rounded bg-gray-200" />
                </div>

                {/* stat cards */}
                <div className="mb-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-[84px] animate-pulse rounded-2xl border border-gray-100 bg-white"
                        />
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-10">
                    {/* sidebar */}
                    <div className="space-y-3 rounded-3xl border border-gray-200 bg-white p-4 shadow-xl lg:col-span-3 lg:h-[652px]">
                        <div className="h-10 animate-pulse rounded-xl bg-gray-100" />
                        <div className="h-10 animate-pulse rounded-xl bg-gray-200" />
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 rounded-xl border border-gray-100 p-3.5"
                            >
                                <div className="h-8 w-8 animate-pulse rounded-lg bg-gray-200" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 w-1/3 animate-pulse rounded bg-gray-200" />
                                    <div className="h-3 w-2/3 animate-pulse rounded bg-gray-100" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* map */}
                    <div className="lg:col-span-7">
                        <div className="je-shimmer relative flex h-[460px] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B3C5D] via-[#0D4B75] to-[#0F4D73] shadow-xl sm:h-[560px] lg:h-[652px]">
                            <div
                                className="absolute inset-0 opacity-[0.12]"
                                aria-hidden="true"
                                style={{
                                    backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                                    backgroundSize: '22px 22px',
                                }}
                            />
                            <div className="relative flex flex-col items-center gap-3 text-white/70">
                                <span className="relative grid h-12 w-12 place-items-center rounded-full bg-white/10 ring-1 ring-white/20">
                                    <span className="absolute inset-0 animate-ping rounded-full bg-orange-400/30" />
                                    <MapPin className="h-6 w-6 text-orange-300" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const OfficeLocator = dynamic(() => import('./OfficeLocator'), {
    ssr: false,
    loading: () => <LocatorSkeleton />,
});

/** Defers loading the map chunk until it scrolls near the viewport. */
export default function LazyOfficeLocator() {
    const ref = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShow(true);
                    io.disconnect();
                }
            },
            { rootMargin: '300px 0px' },
        );
        io.observe(node);
        return () => io.disconnect();
    }, []);

    return <div ref={ref}>{show ? <OfficeLocator /> : <LocatorSkeleton />}</div>;
}
