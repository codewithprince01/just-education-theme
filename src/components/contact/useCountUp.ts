"use client";

import { useEffect, useRef, useState } from 'react';

/**
 * Animates a number from 0 to `target` once the element scrolls into view.
 * Returns a ref to attach to the wrapper and the current animated value.
 * Honours `prefers-reduced-motion` by jumping straight to the target.
 */
export function useCountUp(target: number, durationMs = 1600) {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState(0);
    const started = useRef(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const reduce =
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const run = () => {
            if (started.current) return;
            started.current = true;

            if (reduce) {
                setValue(target);
                return;
            }

            const start = performance.now();
            const tick = (now: number) => {
                const progress = Math.min((now - start) / durationMs, 1);
                // easeOutExpo for a premium, decelerating count.
                const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                setValue(Math.round(eased * target));
                if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        run();
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.4 },
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [target, durationMs]);

    return { ref, value };
}
