"use client";

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

function MapSkeleton() {
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 md:py-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="h-6 w-24 mx-auto rounded-full bg-gray-200 animate-pulse" />
                <div className="mt-4 h-9 w-80 max-w-full mx-auto rounded bg-gray-200 animate-pulse" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 aspect-[4/5] sm:aspect-square rounded-3xl bg-gradient-to-br from-[#0B3C5D]/80 to-[#0F4D73]/80 animate-pulse flex items-center justify-center">
                    <MapPin className="w-10 h-10 text-white/40" />
                </div>
                <div className="h-64 rounded-2xl bg-gray-200 animate-pulse" />
            </div>
        </section>
    );
}

const IndiaMap = dynamic(() => import('./IndiaMap'), {
    ssr: false,
    loading: () => <MapSkeleton />,
});

/** Defers loading the interactive map until it scrolls near the viewport. */
export default function LazyIndiaMap() {
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

    return <div ref={ref}>{show ? <IndiaMap /> : <MapSkeleton />}</div>;
}
