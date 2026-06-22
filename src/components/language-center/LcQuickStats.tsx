import { iconMap, type QuickStat } from '@/data/languageCenterData';
import AnimatedCounter from '@/components/testimonials/AnimatedCounter';

interface LcQuickStatsProps {
  stats: QuickStat[];
}

export default function LcQuickStats({ stats }: LcQuickStatsProps) {
  return (
    <section className="mt-8 scroll-mt-24" aria-label="Key statistics">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
        {stats.map((stat) => {
          const Icon = iconMap[stat.icon];
          return (
            <div
              key={stat.label}
              className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 transition-transform duration-300 group-hover:scale-110">
                <Icon size={20} />
              </div>
              <div className="text-lg font-extrabold leading-tight text-[#0a2540]">
                {stat.animatedValue !== undefined ? (
                  <AnimatedCounter
                    value={stat.animatedValue}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                ) : (
                  stat.value
                )}
              </div>
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
