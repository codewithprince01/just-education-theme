import { useEffect, useRef } from 'react';

/**
 * JS-driven sticky sidebar used by the exam pages.
 *
 * Behaviour (desktop / lg+ only):
 *  - Short sidebar  → sticks to the top of the viewport while scrolling.
 *  - Tall  sidebar  → scrolls naturally, then sticks to the bottom of the viewport
 *                     so its end is reachable, releasing at the bottom of the container.
 * On tablet/mobile (<1024px) all inline styles are reset so the layout stacks naturally.
 *
 * Wire the returned refs as:
 *   containerRef  → the row that wraps both columns (grid)
 *   sidebarColRef → the sidebar column wrapper (for width measurement)
 *   sidebarRef    → the element that actually moves (the <aside>)
 *
 * Pass `dep` (e.g. active tab / category) to recalculate when content height changes.
 */
export function useStickySidebar(dep?: unknown) {
    const containerRef = useRef<HTMLDivElement>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const sidebarColRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current || !sidebarRef.current || !sidebarColRef.current) return;

            // Only run on desktop/large screens (lg breakpoint in Tailwind is 1024px)
            if (window.innerWidth < 1024) {
                // Reset styles on mobile/tablet so layout is natural and stacked
                sidebarRef.current.style.position = '';
                sidebarRef.current.style.top = '';
                sidebarRef.current.style.bottom = '';
                sidebarRef.current.style.width = '';
                return;
            }

            const container = containerRef.current;
            const sidebar = sidebarRef.current;
            const sidebarCol = sidebarColRef.current;

            const containerRect = container.getBoundingClientRect();
            const sidebarHeight = sidebar.offsetHeight;
            const viewportHeight = window.innerHeight;
            const scrollTop = window.scrollY;

            // Absolute positions on the page
            const containerTop = containerRect.top + scrollTop;
            const containerBottom = containerRect.bottom + scrollTop;

            const offset = 24; // 24px (space top/bottom)

            if (sidebarHeight <= viewportHeight - offset * 2) {
                // Case 1: Sidebar is shorter than viewport -> Stick to top of screen
                const relativeTop = containerRect.top;
                if (relativeTop <= offset) {
                    const maxTop = containerRect.height - sidebarHeight;
                    if (relativeTop + maxTop <= offset) {
                        // Reached bottom of container
                        sidebar.style.position = 'absolute';
                        sidebar.style.top = 'auto';
                        sidebar.style.bottom = '0';
                        sidebar.style.width = '100%';
                    } else {
                        // Stick to top of viewport
                        sidebar.style.position = 'fixed';
                        sidebar.style.top = `${offset}px`;
                        sidebar.style.bottom = 'auto';
                        sidebar.style.width = `${sidebarCol.offsetWidth}px`;
                    }
                } else {
                    // Normal positioning at the top of container
                    sidebar.style.position = '';
                    sidebar.style.top = '';
                    sidebar.style.bottom = '';
                    sidebar.style.width = '';
                }
            } else {
                // Case 2: Sidebar is taller than viewport -> Scroll naturally, stick to bottom of screen
                const viewportBottom = scrollTop + viewportHeight;
                const sidebarScrollBottomThreshold = containerTop + sidebarHeight + offset;

                if (viewportBottom >= sidebarScrollBottomThreshold) {
                    if (viewportBottom >= containerBottom) {
                        // Reached bottom of container
                        sidebar.style.position = 'absolute';
                        sidebar.style.top = 'auto';
                        sidebar.style.bottom = '0';
                        sidebar.style.width = '100%';
                    } else {
                        // Stick to bottom of viewport
                        sidebar.style.position = 'fixed';
                        sidebar.style.top = 'auto';
                        sidebar.style.bottom = `${offset}px`;
                        sidebar.style.width = `${sidebarCol.offsetWidth}px`;
                    }
                } else {
                    // Normal scrolling with page
                    sidebar.style.position = '';
                    sidebar.style.top = '';
                    sidebar.style.bottom = '';
                    sidebar.style.width = '';
                }
            }
        };

        // Run initially and attach scroll/resize listeners
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [dep]);

    return { containerRef, sidebarRef, sidebarColRef };
}
