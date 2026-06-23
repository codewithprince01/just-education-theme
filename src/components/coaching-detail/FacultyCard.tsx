import { Star, Users } from 'lucide-react';
import type { Faculty } from '@/data/coachingData';

interface FacultyCardProps {
  faculty: Faculty;
  onViewProfile: (f: Faculty) => void;
}

export default function FacultyCard({ faculty, onViewProfile }: FacultyCardProps) {
  const visibleSubjects = faculty.subjects.slice(0, 3);
  const extraCount = faculty.subjects.length - 3;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 p-5 flex flex-col items-center text-center">
      {/* Avatar */}
      <div className="relative mb-3">
        <img
          src={faculty.image}
          alt={faculty.name}
          className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
        />
        <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
          {faculty.experience}
        </span>
      </div>

      {/* Name & designation */}
      <h3 className="font-bold text-[#0a2540] text-base leading-tight mb-0.5">{faculty.name}</h3>
      <p className="text-xs text-blue-600 font-medium mb-3">{faculty.designation}</p>

      {/* Subjects */}
      <div className="flex flex-wrap gap-1.5 justify-center mb-3">
        {visibleSubjects.map((s) => (
          <span key={s} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
            {s}
          </span>
        ))}
        {extraCount > 0 && (
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
            +{extraCount} more
          </span>
        )}
      </div>

      {/* Rating & mentored */}
      <div className="flex items-center justify-center gap-3 text-xs text-gray-500 mb-4">
        <span className="flex items-center gap-1">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <strong className="text-[#0a2540]">{faculty.rating}</strong>
        </span>
        <span className="w-px h-4 bg-gray-200" />
        <span className="flex items-center gap-1">
          <Users size={12} />
          {faculty.studentsMentored.toLocaleString('en-IN')} mentored
        </span>
      </div>

      {/* CTA */}
      <button
        onClick={() => onViewProfile(faculty)}
        className="w-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold text-sm py-2 rounded-xl transition-colors"
      >
        View Profile
      </button>
    </div>
  );
}
