'use client';

import { useState } from 'react';
import { X, Star, Award } from 'lucide-react';
import { useInstitution } from '@/context/InstitutionContext';
import type { Faculty } from '@/types/institution';

const GRADIENT_COLORS = [
  'from-blue-500 to-indigo-600',
  'from-purple-500 to-pink-600',
  'from-teal-500 to-cyan-600',
  'from-orange-500 to-amber-600',
  'from-rose-500 to-red-600',
  'from-green-500 to-emerald-600',
];

function getGradient(id: string) {
  return GRADIENT_COLORS[id.charCodeAt(id.length - 1) % GRADIENT_COLORS.length];
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function FacultyCard({
  faculty,
  onViewProfile,
}: {
  faculty: Faculty;
  onViewProfile: (f: Faculty) => void;
}) {
  const gradient = getGradient(faculty.id);
  const initials = getInitials(faculty.name);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col items-center text-center">
      {/* Avatar */}
      <div className="w-20 h-20 rounded-full overflow-hidden mb-3 shrink-0">
        {faculty.image ? (
          <img
            src={faculty.image}
            alt={faculty.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className={`w-20 h-20 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xl font-bold`}
          >
            {initials}
          </div>
        )}
      </div>

      {/* Name */}
      <h3 className="font-extrabold text-[#0a2540] text-base mb-0.5 leading-tight">
        {faculty.name}
      </h3>
      <p className="text-blue-600 text-sm font-medium mb-2">{faculty.designation}</p>

      {/* Experience badge */}
      <span className="text-xs bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-0.5 rounded-full font-semibold mb-3">
        {faculty.experience} experience
      </span>

      {/* Subject chips */}
      {faculty.subjects.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1 mb-4">
          {faculty.subjects.slice(0, 3).map((subj) => (
            <span
              key={subj}
              className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium"
            >
              {subj}
            </span>
          ))}
          {faculty.subjects.length > 3 && (
            <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">
              +{faculty.subjects.length - 3}
            </span>
          )}
        </div>
      )}

      {/* CTA */}
      <button
        onClick={() => onViewProfile(faculty)}
        className="w-full text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white font-semibold text-xs py-2 rounded-xl transition-colors"
      >
        View Profile
      </button>
    </div>
  );
}

function FacultyModal({
  faculty,
  onClose,
}: {
  faculty: Faculty;
  onClose: () => void;
}) {
  const gradient = getGradient(faculty.id);
  const initials = getInitials(faculty.name);

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#0a2540] to-[#126094] p-6 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={22} />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/30 shadow-lg shrink-0">
              {faculty.image ? (
                <img
                  src={faculty.image}
                  alt={faculty.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xl font-bold`}
                >
                  {initials}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">{faculty.name}</h2>
              <p className="text-cyan-300 text-sm font-medium">{faculty.designation}</p>
              <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full mt-1 inline-block">
                {faculty.experience} experience
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 mt-4 text-center">
            {faculty.rating !== undefined && (
              <div className="flex-1 bg-white/10 rounded-xl p-3">
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span className="text-white font-bold">{faculty.rating}</span>
                </div>
                <p className="text-white/60 text-xs">Rating</p>
              </div>
            )}
            {faculty.studentsMentored !== undefined && (
              <div className="flex-1 bg-white/10 rounded-xl p-3">
                <p className="text-white font-bold">
                  {faculty.studentsMentored.toLocaleString('en-IN')}
                </p>
                <p className="text-white/60 text-xs">Students</p>
              </div>
            )}
            <div className="flex-1 bg-white/10 rounded-xl p-3">
              <p className="text-white font-bold">{faculty.subjects.length}</p>
              <p className="text-white/60 text-xs">Subjects</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {faculty.bio && (
            <>
              <h3 className="font-bold text-[#0a2540] mb-2">About</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">{faculty.bio}</p>
            </>
          )}

          {faculty.subjects.length > 0 && (
            <>
              <h3 className="font-bold text-[#0a2540] mb-2">Subjects</h3>
              <div className="flex flex-wrap gap-2 mb-5">
                {faculty.subjects.map((s) => (
                  <span
                    key={s}
                    className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FacultySection() {
  const institution = useInstitution();
  const facultyList = institution.sections.faculty;
  const [selected, setSelected] = useState<Faculty | null>(null);

  if (!facultyList || facultyList.length === 0) return null;

  return (
    <section id="section-faculty" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="mb-8">
          <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Our Faculty
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-3">
            Meet the Experts
          </h2>
          <p className="text-gray-500">
            Experienced educators dedicated to your success at {institution.name}.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facultyList.map((f) => (
            <FacultyCard key={f.id} faculty={f} onViewProfile={setSelected} />
          ))}
        </div>
      </div>

      {selected && (
        <FacultyModal faculty={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
