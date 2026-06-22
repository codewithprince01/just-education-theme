"use client";

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

function TestimonialsSkeleton() {
    return (
        <section className="bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 md:py-20">
                <div className="h-6 w-28 rounded-full bg-gray-200 animate-pulse mb-3" />
                <div className="h-9 w-80 max-w-full rounded bg-gray-200 animate-pulse mb-10" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-64 rounded-2xl bg-white border border-gray-200 animate-pulse" />
                    ))}
                </div>
            </div>
        </section>
    );
}

const Testimonials = dynamic(() => import('./Testimonials'), {
    ssr: false,
    loading: () => <TestimonialsSkeleton />,
});

/** Defers loading the testimonials carousel until it scrolls near the viewport. */
export default function LazyTestimonials() {
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

    return <div ref={ref}>{show ? <Testimonials /> : <TestimonialsSkeleton />}</div>;
}
