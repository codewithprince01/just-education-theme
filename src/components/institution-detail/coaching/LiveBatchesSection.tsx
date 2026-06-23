'use client';

import { Radio, User, Clock, Globe, ChevronRight } from 'lucide-react';
import { useInstitution } from '@/context/InstitutionContext';
import type { LiveBatch } from '@/types/institution';

function SeatsProgressBar({ seatsLeft, seatsTotal }: { seatsLeft: number; seatsTotal: number }) {
  const filled = seatsTotal - seatsLeft;
  const pct = seatsTotal > 0 ? Math.round((filled / seatsTotal) * 100) : 0;

  let barColor = 'bg-green-500';
  if (pct >= 90) barColor = 'bg-red-500';
  else if (pct >= 70) barColor = 'bg-orange-400';
  else if (pct >= 50) barColor = 'bg-yellow-400';

  return (
    <div>
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>{seatsLeft} seats left</span>
        <span>{seatsTotal} total</span>
      </div>
      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function BatchCard({ batch }: { batch: LiveBatch }) {
  return (
    <div className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col">
      <div className="p-5 flex-1">
        {/* Live indicator + title */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base font-bold text-[#0a2540] leading-snug">{batch.courseTitle}</h3>
          {batch.isLive && (
            <span className="inline-flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              LIVE
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="space-y-2 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="font-medium text-gray-700">{batch.facultyName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span>{batch.timing}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span>{batch.language}</span>
          </div>
          {batch.nextSession && (
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
              <span>Next: <span className="text-gray-700">{batch.nextSession}</span></span>
            </div>
          )}
        </div>

        {/* Seats progress */}
        <SeatsProgressBar seatsLeft={batch.seatsLeft} seatsTotal={batch.seatsTotal} />
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 p-4">
        <button className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
          Join Batch <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function LiveBatchesSection() {
  const institution = useInstitution();
  const batches = institution.sections.liveBatches;

  if (!batches || batches.length === 0) return null;

  const liveCount = batches.filter((b) => b.isLive).length;

  return (
    <section className="py-16 md:py-20 bg-gray-50/60" id="section-liveBatches">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              Live Batches
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-3">
              Join a Live Batch
            </h2>
            <p className="text-gray-500">Learn in real-time with interactive sessions from expert faculty.</p>
          </div>
          {liveCount > 0 && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 font-semibold text-sm shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              {liveCount} batch{liveCount > 1 ? 'es' : ''} live now
            </div>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {batches.map((batch) => (
            <BatchCard key={batch.id} batch={batch} />
          ))}
        </div>
      </div>
    </section>
  );
}
