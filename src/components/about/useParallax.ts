"use client";

import { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Lightweight parallax. Returns a ref and a live `offset` (px) derived from how
 * far the element is from the viewport centre, scaled by `speed`. rAF-throttled
 * and disabled under reduced-motion. No dependencies.
 */
export function useParallax(speed = 0.15) {
    const ref = useRef<HTMLElement | null>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (prefersReducedMotion()) return;
        const node = ref.current;
        if (!node) return;

        let frame = 0;
        const update = () => {
            frame = 0;
            const rect = node.getBoundingClientRect();
            const viewCentre = window.innerHeight / 2;
            const elementCentre = rect.top + rect.height / 2;
            setOffset((viewCentre - elementCentre) * speed);
        };
        const onScroll = () => {
            if (frame) return;
            frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        return () => {
            if (frame) cancelAnimationFrame(frame);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [speed]);

    return { ref, offset };
}

/**
 * Returns a ref and a 0→1 progress value tracking the element travelling through
 * the viewport. Used to drive the growth-timeline fill. rAF-throttled.
 */
export function useScrollProgress() {
    const ref = useRef<HTMLElement | null>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        let frame = 0;
        const update = () => {
            frame = 0;
            const rect = node.getBoundingClientRect();
            const vh = window.innerHeight;
            // 0 when the top hits 75% of viewport, 1 when the bottom passes 40%.
            const start = vh * 0.75;
            const end = vh * 0.4;
            const total = rect.height + (start - end);
            const travelled = start - rect.top;
            setProgress(Math.max(0, Math.min(1, travelled / total)));
        };
        const onScroll = () => {
            if (frame) return;
            frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        return () => {
            if (frame) cancelAnimationFrame(frame);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    return { ref, progress };
}

/** Fires `true` once the element first enters the viewport (one-shot). */
export function useInView(threshold = 0.3) {
    const ref = useRef<HTMLElement | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        const id = requestAnimationFrame(() => setInView(true));
                        observer.disconnect();
                        return () => cancelAnimationFrame(id);
                    }
                });
            },
            { threshold }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, inView };
}
