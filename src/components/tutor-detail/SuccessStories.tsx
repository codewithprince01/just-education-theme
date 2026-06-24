'use client';

import { Trophy, Quote } from 'lucide-react';
import { useTutor } from '@/context/TutorContext';
import SectionHeading from './SectionHeading';

export default function SuccessStories() {
  const { successStories } = useTutor();

  return (
    <section id="section-success" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="Results That Matter"
          title="Student Success Stories"
          subtitle="Real outcomes from students who learned with me."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {successStories.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col"
            >
              <div className="relative">
                <div className="h-24 bg-gradient-to-r from-blue-600 to-cyan-500" />
                <img
                  src={s.photo}
                  alt={s.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md absolute -bottom-10 left-1/2 -translate-x-1/2"
                />
              </div>
              <div className="pt-12 px-5 pb-5 text-center flex-1 flex flex-col">
                <span className="mx-auto inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full mb-2">
                  <Trophy size={11} /> {s.highlight}
                </span>
                <h3 className="font-bold text-[#0a2540] text-sm">{s.name}</h3>
                <p className="text-xs text-gray-400 mb-1">{s.classOrExam}</p>
                <p className="text-sm font-extrabold text-blue-600 mb-3">{s.achievement}</p>
                <div className="relative mt-auto">
                  <Quote size={16} className="text-blue-200 mx-auto mb-1" />
                  <p className="text-xs text-gray-500 leading-relaxed italic line-clamp-4">{s.testimonial}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
