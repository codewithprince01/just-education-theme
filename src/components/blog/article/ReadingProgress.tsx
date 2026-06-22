'use client';

import { useEffect, useState } from 'react';

// Thin progress bar that tracks how far the reader has scrolled through the page.
export default function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        function onScroll() {
            const el = document.documentElement;
            const max = el.scrollHeight - el.clientHeight;
            setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
        }
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent" aria-hidden="true">
            <div
                className="h-full bg-gradient-to-r from-[#F57C00] to-orange-400 transition-[width] duration-150"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
