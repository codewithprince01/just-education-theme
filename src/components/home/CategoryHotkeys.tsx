import Link from "next/link";

const categories = [
  { value: "UNIVERSITY",          label: "Universities",   icon: "🎓", bg: "bg-indigo-50",  ring: "border-indigo-200", dot: "text-indigo-500" },
  { value: "COLLEGE",             label: "Colleges",       icon: "🏛️", bg: "bg-blue-50",    ring: "border-blue-200",   dot: "text-blue-500" },
  { value: "SCHOOL",              label: "Schools",        icon: "🏫", bg: "bg-teal-50",    ring: "border-teal-200",   dot: "text-teal-500" },
  { value: "COACHING",            label: "Coaching",       icon: "✏️", bg: "bg-orange-50",  ring: "border-orange-200", dot: "text-orange-500" },
  { value: "TRAINING_CENTER",     label: "Training",       icon: "🛠️", bg: "bg-amber-50",   ring: "border-amber-200",  dot: "text-amber-500" },
  { value: "LANGUAGE_CENTER",     label: "Language",       icon: "🗣️", bg: "bg-pink-50",    ring: "border-pink-200",   dot: "text-pink-500" },
  { value: "LIBRARY",             label: "Libraries",      icon: "📚", bg: "bg-green-50",   ring: "border-green-200",  dot: "text-green-500" },
  { value: "CONSULTANT",          label: "Consultants",    icon: "🧭", bg: "bg-violet-50",  ring: "border-violet-200", dot: "text-violet-500" },
  { value: "RESEARCH_CENTER",     label: "Research",       icon: "🔬", bg: "bg-cyan-50",    ring: "border-cyan-200",   dot: "text-cyan-500" },
  { value: "SCHOLARSHIP_PROVIDER",label: "Scholarships",   icon: "🎗️", bg: "bg-rose-50",    ring: "border-rose-200",   dot: "text-rose-500" },
  { value: "HOSTEL",              label: "Hostels",        icon: "🏠", bg: "bg-slate-50",   ring: "border-slate-200",  dot: "text-slate-500" },
];

export default function CategoryHotkeys() {
  return (
    <section className="bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          Browse by Category
        </p>

        <div className="flex gap-6 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => (
            <Link
              key={cat.value}
              href={`/browse?type=${cat.value}`}
              className="flex flex-col items-center gap-2 shrink-0 group"
            >
              <div
                className={`
                  w-16 h-16 rounded-full border-2 flex items-center justify-center text-[1.65rem]
                  ${cat.bg} ${cat.ring}
                  shadow-sm group-hover:shadow-md group-hover:scale-110
                  transition-all duration-200 ease-out
                `}
              >
                {cat.icon}
              </div>
              <span className="text-[0.7rem] font-medium text-gray-600 group-hover:text-[#0B3C5D] transition-colors text-center leading-tight">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
