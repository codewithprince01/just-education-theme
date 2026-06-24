'use client';

import { Download } from 'lucide-react';
import { useTutor } from '@/context/TutorContext';
import SectionHeading from './SectionHeading';
import { Icon } from './icons';

export default function StudyResources() {
  const { resources } = useTutor();

  return (
    <section id="section-resources" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="Free Materials"
          title="Study Resources"
          subtitle="Download notes, worksheets and practice papers shared by the tutor."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {resources.map((r) => (
            <div
              key={r.id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-5 flex items-center gap-4"
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <Icon name={r.icon} size={22} className="text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">{r.type}</span>
                <h3 className="font-bold text-[#0a2540] text-sm leading-tight truncate">{r.title}</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">{r.format} · {r.downloads.toLocaleString('en-IN')} downloads</p>
              </div>
              <button
                className="shrink-0 w-10 h-10 rounded-xl border border-gray-200 text-gray-500 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white flex items-center justify-center transition-all"
                title="Download"
              >
                <Download size={17} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
