'use client';

import { Clock, Calendar, Globe, Users } from 'lucide-react';
import { useCoachingData } from '@/context/CoachingContext';
import SectionHeading from './SectionHeading';

export default function LiveBatchesSection() {
  const { liveBatches } = useCoachingData();
  return (
    <section id="section-live-batches" className="py-16 md:py-20 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="Live Batches"
          title="Ongoing & Upcoming Batches"
          subtitle="Enrol in a batch that fits your schedule. Limited seats available — act fast!"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {liveBatches.map((batch) => {
            const enrolled = batch.seatsTotal - batch.seatsLeft;
            const pct = Math.round((enrolled / batch.seatsTotal) * 100);
            const isAlmostFull = batch.seatsLeft < batch.seatsTotal * 0.2;
            const barColor =
              pct >= 80 ? 'bg-red-500' : pct >= 60 ? 'bg-yellow-400' : 'bg-green-500';

            return (
              <div
                key={batch.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-5"
              >
                {/* Header: LIVE dot + title */}
                <div className="flex items-center gap-2 mb-3">
                  {batch.isLive ? (
                    <>
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                      </span>
                      <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">LIVE</span>
                    </>
                  ) : (
                    <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">UPCOMING</span>
                  )}
                  <h3 className="font-bold text-[#0a2540] text-base flex-1 leading-tight">{batch.courseTitle}</h3>
                </div>

                {/* Faculty */}
                <div className="flex items-center gap-2 mb-4">
                  <img
                    src={batch.facultyImage}
                    alt={batch.facultyName}
                    className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <span className="text-sm text-gray-600">by <strong className="text-[#0a2540]">{batch.facultyName}</strong></span>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className="text-blue-500 shrink-0" />
                    <span>{batch.timing}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className="text-blue-500 shrink-0" />
                    <span>{batch.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Globe size={12} className="text-blue-500 shrink-0" />
                    <span>{batch.language}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-blue-500 shrink-0" />
                    <span>Next: {batch.nextSession}</span>
                  </div>
                </div>

                {/* Enrollment progress */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1.5 text-xs">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Users size={12} />
                      <span>{enrolled} / {batch.seatsTotal} enrolled</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {isAlmostFull && (
                        <span className="text-orange-600 font-bold text-xs">Seats Filling Fast 🔥</span>
                      )}
                      <span
                        className={`font-bold ${
                          batch.seatsLeft <= 5
                            ? 'text-red-600'
                            : batch.seatsLeft <= 15
                            ? 'text-orange-500'
                            : 'text-green-600'
                        }`}
                      >
                        {batch.seatsLeft} seats left
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${barColor}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* Enroll button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors">
                  Enroll in This Batch
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
