"use client";

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';

interface Tab {
    label: string;
    slug: string;
    tabs?: Tab[];
    sections?: any[];
}

interface HeroTabItemProps {
    tab: Tab;
    activeLeafSlug: string;
    onNavigate: (slug: string) => void;
}

const containsSlug = (tab: Tab, slug: string): boolean => 
    tab.tabs ? tab.tabs.some((child) => containsSlug(child, slug)) : tab.slug === slug;

const HeroTabItem = ({ tab, activeLeafSlug, onNavigate }: HeroTabItemProps) => {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    
    const hasChildren = Boolean(tab.tabs?.length);
    const isActive = containsSlug(tab, activeLeafSlug);

    useEffect(() => {
        setMounted(true);
    }, []);

    useLayoutEffect(() => {
        if (!open || !buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        setCoords({ top: rect.bottom + window.scrollY + 4, left: rect.left + window.scrollX });
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const handleOutside = (e: MouseEvent) => {
            if (!buttonRef.current?.contains(e.target as Node) && !menuRef.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        const handleScroll = () => setOpen(false);
        document.addEventListener('mousedown', handleOutside);
        window.addEventListener('scroll', handleScroll, true);
        return () => {
            document.removeEventListener('mousedown', handleOutside);
            window.removeEventListener('scroll', handleScroll, true);
        };
    }, [open]);

    const handleButtonClick = () => {
        if (hasChildren) {
            setOpen((prev) => !prev);
        } else {
            onNavigate(tab.slug);
        }
    };

    const handleChildClick = (child: Tab) => {
        setOpen(false);
        onNavigate(child.slug);
    };

    return (
        <div className="relative flex-shrink-0">
            <button
                ref={buttonRef}
                onClick={handleButtonClick}
                className={`relative flex items-center gap-1 whitespace-nowrap py-3 text-sm font-semibold transition-colors duration-200 ${isActive ? 'text-[#0B3C5D]' : 'text-gray-500 hover:text-[#0B3C5D]'
                    }`}
            >
                {tab.label}
                {hasChildren && (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                )}
                {isActive && <span className="absolute left-0 right-0 -bottom-px h-[3px] bg-[#F57C00] rounded-full" />}
            </button>

            {mounted && hasChildren && open && createPortal(
                <div
                    ref={menuRef}
                    style={{ top: coords.top, left: coords.left }}
                    className="absolute w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-1.5 z-[60]"
                >
                    {tab.tabs?.map((child) => (
                        <button
                            key={child.slug}
                            onClick={() => handleChildClick(child)}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 hover:text-[#F57C00] ${child.slug === activeLeafSlug ? 'text-[#F57C00] font-semibold' : 'text-gray-600'
                                }`}
                        >
                            {child.label}
                        </button>
                    ))}
                </div>,
                document.body
            )}
        </div>
    );
};

export default HeroTabItem;
