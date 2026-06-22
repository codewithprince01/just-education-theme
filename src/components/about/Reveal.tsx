"use client";

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface RevealProps {
    children: ReactNode;
    /** Delay in ms before the element animates in once it enters the viewport. */
    delay?: number;
    /** Extra classes applied to the wrapper element. */
    className?: string;
    as?: 'div' | 'section' | 'li';
}

/**
 * Scroll-reveal wrapper. Adds a fade/translate-in once the element scrolls into
 * view (one-shot via IntersectionObserver). Server-rendered children can be
 * passed straight through, so static sections stay on the server while only the
 * reveal behaviour is client-side. Respects `prefers-reduced-motion`.
 */
const Reveal = ({ children, delay = 0, className = '', as = 'div' }: RevealProps) => {
    const ref = useRef<HTMLElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) {
            const id = requestAnimationFrame(() => setVisible(true));
            return () => cancelAnimationFrame(id);
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const Tag = as;

    return (
        <Tag
            ref={ref as never}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-700 ease-out ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            } ${className}`}
        >
            {children}
        </Tag>
    );
};

export default Reveal;
