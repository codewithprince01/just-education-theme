import { Calendar, Clock, Globe, Star, Users, ChevronRight } from 'lucide-react';
import type { Course } from '@/data/coachingData';

interface CourseCardProps {
  course: Course;
}

const categoryColors: Record<string, string> = {
  JEE: 'bg-blue-100 text-blue-700',
  NEET: 'bg-green-100 text-green-700',
  UPSC: 'bg-orange-100 text-orange-700',
  SSC: 'bg-purple-100 text-purple-700',
  Banking: 'bg-teal-100 text-teal-700',
  CAT: 'bg-rose-100 text-rose-700',
  GATE: 'bg-indigo-100 text-indigo-700',
  IELTS: 'bg-cyan-100 text-cyan-700',
};

const difficultyColors: Record<string, string> = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-yellow-100 text-yellow-700',
  Advanced: 'bg-orange-100 text-orange-700',
  Expert: 'bg-red-100 text-red-700',
};

export default function CourseCard({ course }: CourseCardProps) {
  const categoryColor = categoryColors[course.examCategory] ?? 'bg-gray-100 text-gray-700';
  const difficultyColor = difficultyColors[course.difficulty] ?? 'bg-gray-100 text-gray-700';

  const formattedDate = new Date(course.batchStartDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col overflow-hidden group">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-blue-600 to-cyan-400" />

      <div className="p-5 flex flex-col flex-1">
        {/* Category badge */}
        <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full w-fit mb-3 ${categoryColor}`}>
          {course.examCategory}
        </span>

        {/* Title */}
        <h3 className="font-bold text-[#0a2540] text-base leading-snug mb-3 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>

        {/* Metadata row */}
        <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <Globe size={12} /> {course.mode}
          </span>
          <span className="flex items-center gap-1">
            <Globe size={12} /> {course.language}
          </span>
        </div>

        {/* Highlights */}
        <ul className="flex flex-col gap-1.5 mb-4">
          {course.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-center gap-2 text-xs text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Fee row */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-extrabold text-[#0a2540]">
            ₹{course.fee.toLocaleString('en-IN')}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ₹{course.originalFee.toLocaleString('en-IN')}
          </span>
          <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full ml-auto">
            {Math.round(((course.originalFee - course.fee) / course.originalFee) * 100)}% OFF
          </span>
        </div>

        {/* Batch start */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
          <Calendar size={12} className="text-blue-500" />
          <span>Batch starts: <strong className="text-[#0a2540]">{formattedDate}</strong></span>
        </div>

        {/* Rating + students + difficulty */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-xs">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            <span className="font-semibold text-[#0a2540]">{course.rating}</span>
            <span className="text-gray-400">({course.ratingCount.toLocaleString()})</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Users size={12} />
            <span>{course.studentCount.toLocaleString()} students</span>
          </div>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${difficultyColor}`}>
            {course.difficulty}
          </span>
        </div>

        {/* CTA */}
        <button className="w-full flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors">
          Enroll Now <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
