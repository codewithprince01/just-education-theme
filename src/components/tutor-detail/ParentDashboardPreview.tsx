'use client';

import { CalendarClock, MessageSquareText, FileCheck2, BarChart3, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useTutor } from '@/context/TutorContext';
import SectionHeading from './SectionHeading';

const HW_STATUS = {
  done: { label: 'Done', cls: 'text-green-600 bg-green-50', icon: <CheckCircle2 size={13} /> },
  pending: { label: 'Pending', cls: 'text-amber-600 bg-amber-50', icon: <Clock size={13} /> },
  overdue: { label: 'Overdue', cls: 'text-red-600 bg-red-50', icon: <AlertCircle size={13} /> },
} as const;

export default function ParentDashboardPreview() {
  const { parentDashboard: pd } = useTutor();
  const attendancePct = Math.round((pd.attendanceSummary.present / pd.attendanceSummary.total) * 100);

  return (
    <section className="py-12 md:py-16 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="For Parents"
          title="Parent Dashboard Preview"
          subtitle="Stay in the loop with real-time updates on your child's learning journey."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Upcoming classes */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <CalendarClock size={18} className="text-blue-600" />
              <h3 className="font-bold text-[#0a2540] text-sm">Upcoming Classes</h3>
            </div>
            <div className="space-y-3">
              {pd.upcomingClasses.map((c) => (
                <div key={c.id} className="flex items-center gap-3">
                  <div className="w-1 h-9 rounded-full bg-gradient-to-b from-blue-600 to-cyan-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#0a2540] truncate">{c.subject}</p>
                    <p className="text-[11px] text-gray-400">{c.date} · {c.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 size={18} className="text-blue-600" />
              <h3 className="font-bold text-[#0a2540] text-sm">Attendance Summary</h3>
            </div>
            <div className="flex items-center gap-4">
              <div
                className="relative w-20 h-20 rounded-full grid place-items-center shrink-0"
                style={{ background: `conic-gradient(#16a34a ${attendancePct * 3.6}deg, #f0fdf4 0deg)` }}
              >
                <div className="w-[60px] h-[60px] rounded-full bg-white grid place-items-center">
                  <span className="text-base font-extrabold text-[#0a2540]">{attendancePct}%</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#0a2540]">{pd.attendanceSummary.present}<span className="text-sm text-gray-400">/{pd.attendanceSummary.total}</span></p>
                <p className="text-xs text-gray-500">classes attended</p>
              </div>
            </div>
          </div>

          {/* Teacher feedback */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquareText size={18} className="text-blue-600" />
              <h3 className="font-bold text-[#0a2540] text-sm">Teacher Feedback</h3>
            </div>
            <div className="space-y-3">
              {pd.teacherFeedback.map((f) => (
                <div key={f.id} className="bg-blue-50/60 rounded-xl p-3">
                  <p className="text-xs text-gray-600 leading-relaxed">&ldquo;{f.text}&rdquo;</p>
                  <p className="text-[10px] text-gray-400 mt-1">{f.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Homework */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <FileCheck2 size={18} className="text-blue-600" />
              <h3 className="font-bold text-[#0a2540] text-sm">Homework Status</h3>
            </div>
            <div className="space-y-2.5">
              {pd.homework.map((h) => {
                const st = HW_STATUS[h.status];
                return (
                  <div key={h.id} className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#0a2540] truncate">{h.title}</p>
                      <p className="text-[10px] text-gray-400">Due {h.due}</p>
                    </div>
                    <span className={`shrink-0 inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${st.cls}`}>
                      {st.icon} {st.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Monthly report */}
          <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl shadow-sm p-5 text-white md:col-span-2 lg:col-span-2">
            <h3 className="font-bold text-sm mb-4">Monthly Progress Report</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {pd.monthlyReport.map((r) => (
                <div key={r.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-center">
                  <p className="text-lg font-extrabold">{r.value}</p>
                  <p className="text-[11px] text-white/80 mt-1">{r.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
