'use client';

import { useTutor } from '@/context/TutorContext';
import SectionHeading from './SectionHeading';
import { Icon } from './icons';

export default function TeachingMethodology() {
  const { methodologies } = useTutor();

  return (
    <section id="section-methodology" className="py-12 md:py-16 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="How I Teach"
          title="Teaching Methodology"
          subtitle="A structured, supportive approach designed to build mastery and confidence."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {methodologies.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-5"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                <Icon name={m.icon} size={22} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-[#0a2540] text-sm mb-1">{m.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{m.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
