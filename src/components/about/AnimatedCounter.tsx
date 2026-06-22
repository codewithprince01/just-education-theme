"use client";

import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
    /** Final numeric value to count up to. */
    value: number;
    /** Appended after the formatted number, e.g. "+". */
    suffix?: string;
    /** Animation duration in ms. */
    duration?: number;
    /** `compact` → Indian L/Cr (50L+); `comma` → grouped digits (1,000,000). */
    format?: 'compact' | 'comma';
    className?: string;
}

const formatValue = (n: number, format: 'compact' | 'comma'): string => {
    if (format === 'comma') return n.toLocaleString('en-US');
    if (n >= 10_000_000) return `${(n / 10_000_000).toFixed(n % 10_000_000 === 0 ? 0 : 1)}Cr`;
    if (n >= 100_000) return `${(n / 100_000).toFixed(n % 100_000 === 0 ? 0 : 1)}L`;
    if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
    return `${n}`;
};

/**
 * Counts from 0 up to `value` once it scrolls into view, using requestAnimationFrame
 * with an ease-out curve. Falls back to the final value when reduced motion is set.
 */
const AnimatedCounter = ({ value, suffix = '', duration = 1800, format = 'compact', className = '' }: AnimatedCounterProps) => {
    const ref = useRef<HTMLSpanElement | null>(null);
    const [display, setDisplay] = useState(0);
    const started = useRef(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) {
            const id = requestAnimationFrame(() => setDisplay(value));
            return () => cancelAnimationFrame(id);
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting || started.current) return;
                    started.current = true;

                    let startTime: number | null = null;
                    const tick = (now: number) => {
                        if (startTime === null) startTime = now;
                        const progress = Math.min((now - startTime) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                        setDisplay(Math.round(value * eased));
                        if (progress < 1) requestAnimationFrame(tick);
                    };
                    requestAnimationFrame(tick);
                    observer.disconnect();
                });
            },
            { threshold: 0.4 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [value, duration]);

    return (
        <span ref={ref} className={className}>
            {formatValue(display, format)}
            {suffix}
        </span>
    );
};

export default AnimatedCounter;
