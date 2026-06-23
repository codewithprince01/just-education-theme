'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useCoachingData } from '@/context/CoachingContext';
import SectionHeading from './SectionHeading';

export default function FAQSection() {
  const { faqs } = useCoachingData();
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section id="section-faqs" className="py-16 md:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <SectionHeading
          badge="FAQs"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know before joining APEX Coaching Institute."
          align="center"
        />

        <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="bg-white">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left group"
                  onClick={() => toggle(faq.id)}
                >
                  <span className={`font-semibold text-sm pr-4 transition-colors ${isOpen ? 'text-blue-600' : 'text-[#0a2540] group-hover:text-blue-600'}`}>
                    {faq.question}
                  </span>
                  <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-50'}`}>
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
