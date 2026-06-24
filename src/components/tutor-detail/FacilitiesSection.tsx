'use client';

import { useTutor } from '@/context/TutorContext';
import SectionHeading from './SectionHeading';
import { Icon } from './icons';

export default function FacilitiesSection() {
  const { facilities } = useTutor();

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="What's Included"
          title="Facilities & Features"
          subtitle="Everything you get when you learn with this tutor."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {facilities.map((f) => (
            <div
              key={f.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 p-5 flex flex-col items-center text-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                <Icon name={f.icon} size={22} className="text-white" />
              </div>
              <p className="text-xs font-semibold text-[#0a2540] leading-tight">{f.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
