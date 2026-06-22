"use client";

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
    children: ReactNode;
    /** Stagger delay in ms. */
    delay?: number;
    direction?: Direction;
    className?: string;
    /** Render as a different element if needed. */
    as?: 'div' | 'section' | 'li' | 'span';
}

const OFFSET: Record<Direction, string> = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: 'translate-x-8',
    right: '-translate-x-8',
    none: 'scale-95',
};

/**
 * Lightweight, dependency-free scroll-reveal. Uses IntersectionObserver to fade
 * + slide children into view once. Honours `prefers-reduced-motion` (renders
 * fully visible, no animation) and degrades gracefully without JS (SSR markup
 * is present; it just starts hidden until hydration reveals it).
 */
export default function Reveal({
    children,
    delay = 0,
    direction = 'up',
    className = '',
    as = 'div',
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        // Respect reduced-motion: show immediately.
        if (
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const Tag = as;

    return (
        <Tag
            ref={ref as never}
            style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
            className={`transition-all duration-700 ease-out will-change-transform motion-reduce:transition-none ${
                visible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : `opacity-0 ${OFFSET[direction]}`
            } ${className}`}
        >
            {children}
        </Tag>
    );
}
