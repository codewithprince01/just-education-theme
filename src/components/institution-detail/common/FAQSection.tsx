'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useInstitution } from '@/context/InstitutionContext';

export default function FAQSection() {
  const institution = useInstitution();
  const faqs = institution.sections.faq;
  const [openId, setOpenId] = useState<string | null>(null);

  if (!faqs || faqs.length === 0) return null;

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section id="section-faq" className="py-16 md:py-20 bg-gray-50/60">
      <div className="max-w-3xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center flex flex-col items-center mb-8">
          <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            FAQs
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500">
            Everything you need to know before joining {institution.name}.
          </p>
        </div>

        <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="bg-white">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left group"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-semibold text-sm pr-4 transition-colors ${
                      isOpen
                        ? 'text-blue-600'
                        : 'text-[#0a2540] group-hover:text-blue-600'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                      isOpen
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-500 group-hover:bg-blue-50'
                    }`}
                  >
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
