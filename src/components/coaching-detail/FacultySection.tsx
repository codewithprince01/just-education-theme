'use client';

import { useState } from 'react';
import { X, Star, Users, Award } from 'lucide-react';
import type { Faculty } from '@/data/coachingData';
import { useCoachingData } from '@/context/CoachingContext';
import SectionHeading from './SectionHeading';
import FacultyCard from './FacultyCard';

export default function FacultySection() {
  const { faculties } = useCoachingData();
  const [selected, setSelected] = useState<Faculty | null>(null);

  return (
    <section id="section-faculty" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="Our Faculty"
          title="Meet the Experts"
          subtitle="IITians, AIIMS doctors, IAS officers & IIM alumni who transform aspirants into achievers."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {faculties.map((f) => (
            <FacultyCard key={f.id} faculty={f} onViewProfile={setSelected} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#0a2540] to-[#126094] p-6 rounded-t-2xl">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              >
                <X size={22} />
              </button>
              <div className="flex items-center gap-4">
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white/30 shadow-lg"
                />
                <div>
                  <h2 className="text-xl font-extrabold text-white">{selected.name}</h2>
                  <p className="text-cyan-300 text-sm font-medium">{selected.designation}</p>
                  <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full mt-1 inline-block">
                    {selected.experience} experience
                  </span>
                </div>
              </div>

              {/* Stats row */}
              <div className="flex gap-4 mt-4 text-center">
                <div className="flex-1 bg-white/10 rounded-xl p-3">
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span className="text-white font-bold">{selected.rating}</span>
                  </div>
                  <p className="text-white/60 text-xs">Rating</p>
                </div>
                <div className="flex-1 bg-white/10 rounded-xl p-3">
                  <p className="text-white font-bold">{selected.studentsMentored.toLocaleString('en-IN')}</p>
                  <p className="text-white/60 text-xs">Students</p>
                </div>
                <div className="flex-1 bg-white/10 rounded-xl p-3">
                  <p className="text-white font-bold">{selected.successStats}</p>
                  <p className="text-white/60 text-xs">Success</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* Bio */}
              <h3 className="font-bold text-[#0a2540] mb-2">About</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">{selected.bio}</p>

              {/* Subjects */}
              <h3 className="font-bold text-[#0a2540] mb-2">Subjects</h3>
              <div className="flex flex-wrap gap-2 mb-5">
                {selected.subjects.map((s) => (
                  <span key={s} className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                    {s}
                  </span>
                ))}
              </div>

              {/* Achievements */}
              <h3 className="font-bold text-[#0a2540] mb-2">Achievements</h3>
              <ul className="flex flex-col gap-2">
                {selected.achievements.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <Award size={15} className="text-amber-500 shrink-0 mt-0.5" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
