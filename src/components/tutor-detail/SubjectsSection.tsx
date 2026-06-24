'use client';

import { Users, ChevronRight } from 'lucide-react';
import { useTutor } from '@/context/TutorContext';
import SectionHeading from './SectionHeading';
import { Icon } from './icons';

export default function SubjectsSection() {
  const { subjects } = useTutor();

  return (
    <section id="section-subjects" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="Expertise"
          title="Subjects & Expertise"
          subtitle="Specialised coaching across school boards and competitive exams."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjects.map((s) => (
            <div
              key={s.id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${s.gradient}`} />
              <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-md`}>
                    <Icon name={s.icon} size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0a2540] text-base">{s.name}</h3>
                    <p className="text-xs text-gray-400">{s.experience} experience</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {s.levels.map((l) => (
                    <span key={l} className="text-[11px] bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full font-medium border border-gray-100">
                      {l}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Users size={14} className="text-blue-500" />
                    {s.students.toLocaleString('en-IN')}+ students
                  </span>
                  <button className="flex items-center gap-0.5 text-xs font-semibold text-blue-600 group-hover:gap-1.5 transition-all">
                    Learn more <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
