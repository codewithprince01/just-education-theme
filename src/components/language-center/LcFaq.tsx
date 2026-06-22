"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { FaqItem } from '@/data/languageCenterData';
import SectionHeading from '@/components/testimonials/SectionHeading';

interface LcFaqProps {
  faqs: FaqItem[];
}

export default function LcFaq({ faqs }: LcFaqProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-10 scroll-mt-24" id="faq">
      <SectionHeading
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Everything you need to know before you enroll."
      />

      <div className="mx-auto flex max-w-3xl flex-col gap-3">
        {faqs.map((faq, idx) => {
          const isOpen = open === idx;
          return (
            <div
              key={idx}
              className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                isOpen ? 'border-blue-200 shadow-md' : 'border-gray-100 shadow-sm'
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : idx)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className={`text-sm font-bold transition-colors md:text-[15px] ${isOpen ? 'text-blue-700' : 'text-[#0a2540]'}`}>
                  {faq.question}
                </span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                    isOpen ? 'rotate-45 bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  <Plus size={16} />
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-4 text-sm leading-relaxed text-gray-600">{faq.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
