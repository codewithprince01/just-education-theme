import { iconMap, type IconCard } from '@/data/languageCenterData';

type Accent = 'blue' | 'orange' | 'emerald' | 'violet';

const accentStyles: Record<Accent, string> = {
  blue: 'from-blue-500 to-indigo-600',
  orange: 'from-orange-500 to-amber-600',
  emerald: 'from-emerald-500 to-teal-600',
  violet: 'from-violet-500 to-purple-600',
};

interface IconFeatureGridProps {
  items: IconCard[];
  accent?: Accent;
  /** denser tiles (no description) vs roomy cards */
  variant?: 'card' | 'tile';
}

/** Reusable icon-based feature grid used by Learning Modes, Highlights & Facilities. */
export default function IconFeatureGrid({ items, accent = 'blue', variant = 'card' }: IconFeatureGridProps) {
  const cols =
    variant === 'tile'
      ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6';

  return (
    <div className={`grid gap-4 ${cols}`}>
      {items.map((item) => {
        const Icon = iconMap[item.icon];
        return (
          <div
            key={item.title}
            className={`group flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg ${
              variant === 'tile' ? 'flex-col items-center text-center sm:flex-row sm:text-left' : ''
            }`}
          >
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${accentStyles[accent]} text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
            >
              <Icon size={22} />
            </span>
            <div>
              <h3 className="font-bold text-[#0a2540]">{item.title}</h3>
              {item.description && (
                <p className="mt-1 text-sm leading-relaxed text-gray-500">{item.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
