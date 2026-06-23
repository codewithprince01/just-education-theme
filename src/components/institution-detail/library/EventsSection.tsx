'use client';

import { useInstitution } from '@/context/InstitutionContext';

const EVENT_TYPE_STYLES: Record<string, string> = {
  talk: 'bg-blue-100 text-blue-700',
  workshop: 'bg-violet-100 text-violet-700',
  exhibition: 'bg-amber-100 text-amber-700',
  reading: 'bg-emerald-100 text-emerald-700',
};

const EVENT_TYPE_LABELS: Record<string, string> = {
  talk: 'Talk',
  workshop: 'Workshop',
  exhibition: 'Exhibition',
  reading: 'Reading',
};

function parseDate(dateStr: string): { day: string; month: string; year: string } {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    return { day: '--', month: '---', year: '----' };
  }
  return {
    day: d.toLocaleDateString('en-IN', { day: '2-digit' }),
    month: d.toLocaleDateString('en-IN', { month: 'short' }).toUpperCase(),
    year: d.toLocaleDateString('en-IN', { year: 'numeric' }),
  };
}

export default function EventsSection() {
  const institution = useInstitution();
  const events = institution.sections.events;

  if (!events || events.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-white" id="section-events">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section heading */}
        <div className="flex flex-col items-start gap-2 mb-10">
          <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Events
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-3">
            Upcoming Events
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl">
            Join us for talks, workshops, exhibitions, and reading sessions throughout the year.
          </p>
        </div>

        {/* Event cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => {
            const { day, month, year } = parseDate(event.date);
            const typeStyle = EVENT_TYPE_STYLES[event.type] ?? 'bg-gray-100 text-gray-700';
            const typeLabel = EVENT_TYPE_LABELS[event.type] ?? event.type;

            return (
              <div
                key={event.id}
                className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white flex overflow-hidden group"
              >
                {/* Calendar date column */}
                <div className="flex flex-col items-center justify-center bg-[#0a2540] text-white px-4 py-5 min-w-[72px] shrink-0">
                  <span className="text-3xl font-extrabold leading-none tabular-nums">{day}</span>
                  <span className="text-xs font-bold tracking-widest mt-1 opacity-80">{month}</span>
                  <span className="text-[11px] opacity-50 mt-1">{year}</span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 min-w-0">
                  {/* Type chip */}
                  <span
                    className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full w-fit mb-2 ${typeStyle}`}
                  >
                    {typeLabel}
                  </span>

                  {/* Title */}
                  <h3 className="font-bold text-[#0a2540] text-sm leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
