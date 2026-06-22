"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const isActive = (path: string) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <header className="sticky top-0 z-50 bg-[#0B3C5D] shadow-lg">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="flex items-center justify-between h-16 md:h-18">
                    {/* Logo & Brand */}
                    <Link
                        href="/"
                        className="flex items-center space-x-3 group"
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md transform group-hover:rotate-6 transition-transform duration-300">
                            <span className="text-white text-xl font-bold">JE</span>
                        </div>
                        <span className="text-xl md:text-2xl font-bold text-white hidden sm:block">
                            Just Education
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/"
                            className={`text-sm font-semibold transition-all duration-300 ${isActive('/')
                                    ? 'text-orange-400'
                                    : 'text-white hover:text-orange-400'
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/#streams"
                            className="text-sm font-semibold text-white hover:text-orange-400 transition-all duration-300"
                        >
                            Streams
                        </Link>
                        <Link
                            href="/exams"
                            className={`text-sm font-semibold transition-all duration-300 ${isActive('/exams')
                                    ? 'text-orange-400'
                                    : 'text-white hover:text-orange-400'
                                }`}
                        >
                            Exams
                        </Link>
                        <Link
                            href="/careers"
                            className={`text-sm font-semibold transition-all duration-300 ${isActive('/careers')
                                    ? 'text-orange-400'
                                    : 'text-white hover:text-orange-400'
                                }`}
                        >
                            Careers
                        </Link>
                        <Link
                            href="/about"
                            className={`text-sm font-semibold transition-all duration-300 ${isActive('/about')
                                    ? 'text-orange-400'
                                    : 'text-white hover:text-orange-400'
                                }`}
                        >
                            About
                        </Link>
                        <Link
                            href="/add-college"
                            className={`text-sm font-semibold transition-all duration-300 ${isActive('/add-college')
                                    ? 'text-orange-400'
                                    : 'text-white hover:text-orange-400'
                                }`}
                        >
                            Listing
                        </Link>
                        <a
                            href="#"
                            className="text-sm font-semibold text-white hover:text-orange-400 transition-all duration-300"
                        >
                            Admin ↗
                        </a>
                    </div>

                    {/* CTA Button - Desktop */}
                    <div className="hidden md:block">
                        <button className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm">
                            Explore Colleges
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 rounded-lg text-white hover:bg-[#0F4D73] transition-colors duration-300"
                        aria-label="Toggle mobile menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-[#0F4D73]">
                        <div className="flex flex-col space-y-3">
                            <Link
                                href="/"
                                onClick={toggleMobileMenu}
                                className={`text-sm font-semibold py-2 px-4 rounded-lg transition-all duration-300 ${isActive('/')
                                        ? 'bg-orange-500 text-white'
                                        : 'text-white hover:bg-[#0F4D73]'
                                    }`}
                            >
                                Home
                            </Link>
                            <Link
                                href="/#streams"
                                onClick={toggleMobileMenu}
                                className="text-sm font-semibold py-2 px-4 rounded-lg text-white hover:bg-[#0F4D73] transition-all duration-300"
                            >
                                Streams
                            </Link>
                            <Link
                                href="/exams"
                                onClick={toggleMobileMenu}
                                className={`text-sm font-semibold py-2 px-4 rounded-lg transition-all duration-300 ${isActive('/exams')
                                        ? 'bg-orange-500 text-white'
                                        : 'text-white hover:bg-[#0F4D73]'
                                    }`}
                            >
                                Exams
                            </Link>
                            <Link
                                href="/careers"
                                onClick={toggleMobileMenu}
                                className={`text-sm font-semibold py-2 px-4 rounded-lg transition-all duration-300 ${isActive('/careers')
                                        ? 'bg-orange-500 text-white'
                                        : 'text-white hover:bg-[#0F4D73]'
                                    }`}
                            >
                                Careers
                            </Link>
                            <Link
                                href="/about"
                                onClick={toggleMobileMenu}
                                className={`text-sm font-semibold py-2 px-4 rounded-lg transition-all duration-300 ${isActive('/about')
                                        ? 'bg-orange-500 text-white'
                                        : 'text-white hover:bg-[#0F4D73]'
                                    }`}
                            >
                                About
                            </Link>
                            <Link
                                href="/add-college"
                                onClick={toggleMobileMenu}
                                className={`text-sm font-semibold py-2 px-4 rounded-lg transition-all duration-300 ${isActive('/add-college')
                                        ? 'bg-orange-500 text-white'
                                        : 'text-white hover:bg-[#0F4D73]'
                                    }`}
                            >
                                Listing
                            </Link>
                            <a
                                href="#"
                                onClick={toggleMobileMenu}
                                className="text-sm font-semibold py-2 px-4 rounded-lg text-white hover:bg-[#0F4D73] transition-all duration-300"
                            >
                                Admin ↗
                            </a>
                            <button className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg shadow-md text-sm">
                                Explore Colleges
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
