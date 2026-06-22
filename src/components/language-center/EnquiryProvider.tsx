"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { X, Phone, MessageCircle } from 'lucide-react';
import type { LanguageCenter } from '@/data/languageCenterData';
import EnquiryForm from './EnquiryForm';

interface EnquiryContextValue {
  openEnquiry: () => void;
}

const EnquiryContext = createContext<EnquiryContextValue>({ openEnquiry: () => {} });

export function useEnquiry() {
  return useContext(EnquiryContext);
}

interface EnquiryProviderProps {
  center: LanguageCenter;
  children: ReactNode;
}

/**
 * Coordinates the "Enquire Now" actions across the page:
 *  - desktop (lg+): smooth-scrolls to the sticky sidebar form
 *  - mobile: opens a bottom-sheet modal + renders the fixed bottom CTA bar
 */
export default function EnquiryProvider({ center, children }: EnquiryProviderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const openEnquiry = useCallback(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches) {
      document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setMobileOpen(true);
    }
  }, []);

  // Lock body scroll while the mobile sheet is open
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [mobileOpen]);

  return (
    <EnquiryContext.Provider value={{ openEnquiry }}>
      {children}

      {/* ── Mobile sticky bottom CTA ── */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-2 border-t border-gray-200 bg-white/95 px-4 py-3 shadow-[0_-4px_20px_rgba(10,37,64,0.08)] backdrop-blur lg:hidden">
        <a
          href={`tel:${center.phone.replace(/\s/g, '')}`}
          className="flex h-11 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-[#0a2540] transition-colors hover:bg-gray-50"
          aria-label="Call now"
        >
          <Phone size={18} />
        </a>
        <a
          href={`https://wa.me/${center.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-emerald-600 transition-colors hover:bg-emerald-50"
          aria-label="WhatsApp"
        >
          <MessageCircle size={18} />
        </a>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="h-11 flex-1 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all active:scale-[0.98]"
        >
          Enquire Now
        </button>
      </div>

      {/* ── Mobile enquiry sheet ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex items-end lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-[#0a2540]/60 backdrop-blur-sm je-animate-fade"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-t-3xl bg-white je-animate-fade-up">
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-gradient-to-br from-[#0a2540] to-[#1a5276] px-5 py-4 text-white">
              <div>
                <h3 className="text-base font-extrabold">Book a Free Demo</h3>
                <p className="text-xs text-blue-100/80">{center.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-full bg-white/10 p-1.5 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Close enquiry form"
              >
                <X size={18} />
              </button>
            </div>
            <div className="px-5 py-5">
              <EnquiryForm compact />
            </div>
          </div>
        </div>
      )}
    </EnquiryContext.Provider>
  );
}
