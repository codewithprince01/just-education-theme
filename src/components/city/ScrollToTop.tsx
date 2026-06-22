"use client";

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

// Scroll-to-top button
export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handler = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-blue-500/40 cursor-pointer"
      id="scroll-to-top"
      aria-label="Scroll to top"
    >
      <ChevronUp size={22} />
    </button>
  );
}
