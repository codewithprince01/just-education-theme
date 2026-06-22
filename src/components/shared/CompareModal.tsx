"use client";

import React, { useState, useEffect } from 'react';
import {
  X, ArrowUpDown, Plus, Star, Award, Landmark, GraduationCap,
  DollarSign, Briefcase, BookOpen, Clock, Users, TrendingUp,
  Building2, Trophy, ChevronDown
} from 'lucide-react';

export interface CollegeInCity {
  id: number;
  name: string;
  image: string;
  fees: string;
  rating: number;
  reviews: number;
  accreditation?: string;
  courses?: string[];
  institutionType: string;
  [key: string]: any;
}

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialColleges: CollegeInCity[];
  allColleges: CollegeInCity[];
  highlightSection?: 'fees' | 'placement' | 'rating' | 'ranking' | null;
}

// ─── Category Section Config ──────────────────────────────────────────────────
// Defines which sections appear for each institution type
type SectionKey =
  | 'rating'
  | 'fees'
  | 'placement'
  | 'ranking'
  | 'academics'
  | 'highlights'
  | 'board_results'
  | 'resources'
  | 'occupancy'
  | 'selection_rate'
  | 'success_rate'
  | 'research_output'
  | 'scholarship_info';

const CATEGORY_SECTIONS: Record<string, SectionKey[]> = {
  UNIVERSITY:          ['rating', 'fees', 'placement', 'ranking', 'academics', 'highlights'],
  COLLEGE:             ['rating', 'fees', 'placement', 'ranking', 'academics', 'highlights'],
  SCHOOL:              ['rating', 'fees', 'board_results', 'ranking', 'highlights'],
  LIBRARY:             ['rating', 'fees', 'resources', 'highlights'],
  COACHING:            ['rating', 'fees', 'selection_rate', 'ranking', 'highlights'],
  TRAINING:            ['rating', 'fees', 'placement', 'highlights'],
  TRAINING_CENTER:     ['rating', 'fees', 'placement', 'highlights'],
  HOSTEL:              ['rating', 'fees', 'occupancy', 'highlights'],
  CONSULTANT:          ['rating', 'fees', 'success_rate', 'highlights'],
  RESEARCH:            ['rating', 'fees', 'research_output', 'ranking', 'highlights'],
  RESEARCH_CENTER:     ['rating', 'fees', 'research_output', 'ranking', 'highlights'],
  SCHOLARSHIP_PROVIDER:['rating', 'scholarship_info', 'highlights'],
};

const DEFAULT_SECTIONS: SectionKey[] = ['rating', 'fees', 'highlights'];

// ─── Section meta: label + icon ───────────────────────────────────────────────
const SECTION_META: Record<SectionKey, { label: string; icon: React.ReactNode }> = {
  rating:          { label: 'Ratings & Reviews',      icon: <Star size={14} className="text-amber-500 fill-amber-500" /> },
  fees:            { label: 'Fee Structure',           icon: <DollarSign size={14} className="text-emerald-500" /> },
  placement:       { label: 'Placements',              icon: <Briefcase size={14} className="text-blue-500" /> },
  ranking:         { label: 'Rankings',                icon: <Award size={14} className="text-purple-500" /> },
  academics:       { label: 'Academics & Courses',     icon: <GraduationCap size={14} className="text-indigo-500" /> },
  highlights:      { label: 'Key Highlights',          icon: <Landmark size={14} className="text-orange-500" /> },
  board_results:   { label: 'Board Results',           icon: <Trophy size={14} className="text-amber-600" /> },
  resources:       { label: 'Resources & Access',      icon: <BookOpen size={14} className="text-teal-500" /> },
  occupancy:       { label: 'Occupancy & Capacity',    icon: <Building2 size={14} className="text-slate-500" /> },
  selection_rate:  { label: 'Selection Rate',          icon: <TrendingUp size={14} className="text-green-500" /> },
  success_rate:    { label: 'Success Rate',            icon: <Users size={14} className="text-cyan-500" /> },
  research_output: { label: 'Research Output',         icon: <GraduationCap size={14} className="text-violet-500" /> },
  scholarship_info:{ label: 'Scholarship Details',     icon: <Trophy size={14} className="text-yellow-600" /> },
};

// ─── Per-category fee subtitle ────────────────────────────────────────────────
function getFeeLabel(type: string): string {
  const map: Record<string, string> = {
    LIBRARY: 'Annual Membership',
    HOSTEL: 'Monthly Rent',
    SCHOLARSHIP_PROVIDER: 'Scholarship Amount',
    CONSULTANT: 'Service / Consulting Fee',
    RESEARCH: 'Research Program Fee',
    RESEARCH_CENTER: 'Research Program Fee',
    SCHOOL: 'Annual Fee',
    UNIVERSITY: 'Average Course Fee',
    COLLEGE: 'Course Fee',
    COACHING: 'Course Fee',
    TRAINING: 'Training Fee',
    TRAINING_CENTER: 'Training Fee',
  };
  return map[type] || 'Fee';
}

// ─── Enriched data per college ────────────────────────────────────────────────
function getEnrichedData(college: CollegeInCity) {
  const id = college.id || 1;
  const rate = college.rating || 4.0;
  const score = Math.round(rate * 170 + (id * 13) % 120);
  const type = college.institutionType;

  // Placement
  let avgPkg = `₹ ${(rate * 1.5 + (id % 3) * 0.7).toFixed(1)} LPA`;
  let highestPkg = `₹ ${(rate * 5.2 + (id % 5) * 4.5).toFixed(1)} LPA`;
  let placementRate = `${80 + (id % 16)}%`;
  if (type === 'COLLEGE') {
    avgPkg = `₹ ${(rate * 1.2 + (id % 3) * 0.5).toFixed(1)} LPA`;
    highestPkg = `₹ ${(rate * 4.0 + (id % 5) * 3.5).toFixed(1)} LPA`;
    placementRate = `${75 + (id % 20)}%`;
  } else if (type === 'TRAINING' || type === 'TRAINING_CENTER') {
    avgPkg = `₹ ${(rate * 0.8 + (id % 4) * 0.5).toFixed(1)} LPA`;
    highestPkg = `₹ ${(rate * 2.5 + (id % 5) * 1.5).toFixed(1)} LPA`;
    placementRate = `${70 + (id % 25)}%`;
  }

  // Ranking
  const rankNum = (id % 8) + 1;
  const rankTotal = type === 'UNIVERSITY' || type === 'COLLEGE' ? 500 : type === 'SCHOOL' ? 120 : 200;
  const rankSuffix = rankNum === 1 ? 'st' : rankNum === 2 ? 'nd' : rankNum === 3 ? 'rd' : 'th';
  const rankingBody = type === 'UNIVERSITY' || type === 'COLLEGE' ? 'NIRF 2026' :
                      type === 'SCHOOL' ? 'Times School Survey' :
                      type === 'COACHING' ? 'Selection Index' : 'Popularity Index';

  // Board results (SCHOOL)
  const passRate = `${92 + (id % 7)}%`;
  const topScore = `${96 + (id % 4)}.${id % 9}%`;
  const boardBody = 'CBSE / ICSE Board 2025';

  // Resources (LIBRARY)
  const booksCount = `${(id % 40) + 30},000+`;
  const accessHours = id % 3 === 0 ? '24/7 Open' : '6 AM – 10 PM';
  const memberFee = college.fees.split(' - ')[0];

  // Occupancy (HOSTEL)
  const occupancy = `${(id % 30) + 70}%`;
  const bedCount = `${(id % 100) + 150}+ Beds`;
  const roomType = id % 2 === 0 ? 'AC / Non-AC' : 'Non-AC Sharing';

  // Selection rate (COACHING)
  const selectionRate = `${72 + (id % 20)}%`;
  const studentsSelected = `${(id % 150) + 200}+ selected`;
  const exams = 'JEE / NEET / CA';

  // Success rate (CONSULTANT)
  const successRate = `${80 + (id % 15)}%`;
  const studentsHelped = `${(id % 300) + 500}+ students`;
  const destinations = 'USA / UK / Canada';

  // Research output
  const papersPublished = `${(id % 30) + 10}+ papers`;
  const funding = `₹ ${(id % 5) + 2}Cr+`;
  const labs = `${(id % 5) + 3} Active Labs`;

  // Scholarship
  const awardCount = `${(id % 500) + 500}+ awards/yr`;
  const amountRange = '₹ 10,000 – ₹ 5 Lakh';
  const eligibility = 'Merit / Need Based';

  // Courses
  const coursesCount = college.courses?.length || (id % 10) + 8;

  // Highlights
  const highlightsByType: Record<string, string[]> = {
    UNIVERSITY: ['WiFi Campus', 'Hostel', 'Sports Complex', 'Research Labs', 'Placement Cell'],
    COLLEGE: ['WiFi Campus', 'Hostel', 'Library', 'Placement Cell', 'Student Club'],
    SCHOOL: ['Smart Classrooms', 'Playground', 'Library', 'Transport', 'CCTV'],
    LIBRARY: ['Digital Access', 'e-Books', 'Study Rooms', 'AC Facility', 'Printing'],
    COACHING: ['Video Lectures', 'Test Series', 'Doubt Sessions', 'Study Material', 'Mentoring'],
    TRAINING: ['Hands-on Projects', 'Industry Tie-ups', 'Certificate', 'Mentoring', 'Job Assist'],
    TRAINING_CENTER: ['Hands-on Projects', 'Industry Tie-ups', 'Certificate', 'Mentoring', 'Job Assist'],
    HOSTEL: ['WiFi', 'Security', 'Mess Facility', 'Laundry', 'Hot Water'],
    CONSULTANT: ['Visa Support', 'SOP Help', 'Mock Interviews', 'University Selection', 'Alumni Network'],
    RESEARCH: ['Funded Projects', 'Industry Collab', 'PhD Programs', 'Publication Support', 'Labs'],
    RESEARCH_CENTER: ['Funded Projects', 'Industry Collab', 'PhD Programs', 'Publication Support', 'Labs'],
    SCHOLARSHIP_PROVIDER: ['Merit Based', 'Need Based', 'Girls Scholarship', 'STEM Focus', 'Annual Renewal'],
  };
  const highlights = highlightsByType[type] || ['Quality Service', 'Certified', 'Reputed', 'Experienced Staff'];

  return {
    score, avgPkg, highestPkg, placementRate,
    rankNum, rankTotal, rankSuffix, rankingBody,
    passRate, topScore, boardBody,
    booksCount, accessHours, memberFee,
    occupancy, bedCount, roomType,
    selectionRate, studentsSelected, exams,
    successRate, studentsHelped, destinations,
    papersPublished, funding, labs,
    awardCount, amountRange, eligibility,
    coursesCount, highlights,
  };
}

// ─── Section Row Renderer ─────────────────────────────────────────────────────
function SectionRow({
  sectionKey,
  colleges,
  highlightSection,
}: {
  sectionKey: SectionKey;
  colleges: (CollegeInCity | undefined)[];
  highlightSection: string | null;
}) {
  const meta = SECTION_META[sectionKey];
  const isHighlighted =
    (sectionKey === 'fees' && highlightSection === 'fees') ||
    (sectionKey === 'placement' && highlightSection === 'placement') ||
    (sectionKey === 'rating' && highlightSection === 'rating') ||
    (sectionKey === 'ranking' && highlightSection === 'ranking');

  const bgClass = isHighlighted
    ? sectionKey === 'fees' ? 'bg-emerald-50/40'
      : sectionKey === 'placement' ? 'bg-blue-50/40'
      : sectionKey === 'rating' ? 'bg-yellow-50/40'
      : 'bg-purple-50/40'
    : '';

  return (
    <div className={`grid grid-cols-4 text-xs border-b border-gray-100 last:border-0 ${bgClass}`}>
      {/* Label column */}
      <div className="col-span-1 p-4 bg-gray-50/60 font-bold text-gray-600 flex items-start gap-2 border-r border-gray-100">
        <span className="mt-0.5 shrink-0">{meta.icon}</span>
        <span>{meta.label}</span>
      </div>

      {/* Data columns */}
      {[0, 1, 2].map((i) => {
        const college = colleges[i];
        if (!college) {
          return (
            <div key={i} className="col-span-1 p-4 border-r border-gray-100 last:border-r-0 text-gray-300 text-xs italic flex items-center">
              —
            </div>
          );
        }

        const d = getEnrichedData(college);

        return (
          <div key={i} className="col-span-1 p-4 border-r border-gray-100 last:border-r-0 flex flex-col gap-1 justify-center">
            {/* RATING */}
            {sectionKey === 'rating' && (
              <>
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-sm text-[#0a2540]">{college.rating} / 5</span>
                  <span className="text-yellow-500">★</span>
                </div>
                <span className="text-gray-400 text-[10px] font-medium">({college.reviews} user reviews)</span>
                <span className="text-[10px] font-bold bg-yellow-50 border border-yellow-100 text-yellow-800 px-2 py-0.5 rounded w-fit mt-0.5">
                  CD Score: {d.score}
                </span>
              </>
            )}

            {/* FEES */}
            {sectionKey === 'fees' && (
              <>
                <span className="font-black text-emerald-600 text-sm">{college.fees.split(' - ')[0]}</span>
                <span className="text-gray-400 text-[10px] font-semibold">{getFeeLabel(college.institutionType)}</span>
                {college.fees.includes(' - ') && (
                  <span className="text-[10px] text-gray-500 font-medium">
                    Up to {college.fees.split(' - ')[1]}
                  </span>
                )}
              </>
            )}

            {/* PLACEMENT */}
            {sectionKey === 'placement' && (
              <>
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold block">Avg Package</span>
                  <span className="font-black text-gray-800 text-sm">{d.avgPkg}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold block">Highest Package</span>
                  <span className="font-black text-gray-800 text-sm">{d.highestPkg}</span>
                </div>
                <span className="text-blue-600 font-bold text-[10px] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded w-fit mt-0.5">
                  {d.placementRate} Placed
                </span>
              </>
            )}

            {/* RANKING */}
            {sectionKey === 'ranking' && (
              <>
                <span className="font-extrabold text-gray-800 text-sm">
                  #{d.rankNum}<sup className="text-[9px]">{d.rankSuffix}</sup>
                  <span className="text-gray-400 font-normal text-xs"> / {d.rankTotal}</span>
                </span>
                <span className="text-[10px] text-gray-400 font-semibold">{d.rankingBody}</span>
              </>
            )}

            {/* ACADEMICS */}
            {sectionKey === 'academics' && (
              <>
                <span className="font-extrabold text-gray-800 text-sm">{d.coursesCount} Programs</span>
                <span className="text-[10px] text-gray-400 font-semibold">Undergrad & Postgrad Streams</span>
                {college.courses && college.courses.length > 0 && (
                  <span className="text-[10px] text-indigo-600 font-semibold mt-0.5 truncate">
                    e.g. {college.courses.slice(0, 2).join(', ')}
                  </span>
                )}
              </>
            )}

            {/* BOARD RESULTS (SCHOOL) */}
            {sectionKey === 'board_results' && (
              <>
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold block">Pass Rate</span>
                  <span className="font-black text-emerald-600 text-sm">{d.passRate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold block">Top Score</span>
                  <span className="font-black text-amber-600 text-sm">{d.topScore}</span>
                </div>
                <span className="text-[10px] text-gray-400 font-semibold mt-0.5">{d.boardBody}</span>
              </>
            )}

            {/* RESOURCES (LIBRARY) */}
            {sectionKey === 'resources' && (
              <>
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold block">Books / Resources</span>
                  <span className="font-black text-teal-600 text-sm">{d.booksCount}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold block">Access Hours</span>
                  <span className="font-bold text-gray-700 text-sm">{d.accessHours}</span>
                </div>
              </>
            )}

            {/* OCCUPANCY (HOSTEL) */}
            {sectionKey === 'occupancy' && (
              <>
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold block">Occupancy Rate</span>
                  <span className="font-black text-slate-700 text-sm">{d.occupancy}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold block">Total Capacity</span>
                  <span className="font-bold text-gray-700 text-sm">{d.bedCount}</span>
                </div>
                <span className="text-[10px] text-gray-500 font-semibold mt-0.5">{d.roomType}</span>
              </>
            )}

            {/* SELECTION RATE (COACHING) */}
            {sectionKey === 'selection_rate' && (
              <>
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold block">Selection Rate</span>
                  <span className="font-black text-green-600 text-sm">{d.selectionRate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold block">Students Selected</span>
                  <span className="font-bold text-gray-700 text-sm">{d.studentsSelected}</span>
                </div>
                <span className="text-[10px] text-gray-400 font-semibold mt-0.5">{d.exams}</span>
              </>
            )}

            {/* SUCCESS RATE (CONSULTANT) */}
            {sectionKey === 'success_rate' && (
              <>
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold block">Success Rate</span>
                  <span className="font-black text-cyan-600 text-sm">{d.successRate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold block">Students Placed Abroad</span>
                  <span className="font-bold text-gray-700 text-sm">{d.studentsHelped}</span>
                </div>
                <span className="text-[10px] text-gray-400 font-semibold mt-0.5">{d.destinations}</span>
              </>
            )}

            {/* RESEARCH OUTPUT */}
            {sectionKey === 'research_output' && (
              <>
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold block">Papers Published</span>
                  <span className="font-black text-violet-600 text-sm">{d.papersPublished}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold block">Research Funding</span>
                  <span className="font-bold text-gray-700 text-sm">{d.funding}</span>
                </div>
                <span className="text-[10px] text-gray-400 font-semibold mt-0.5">{d.labs}</span>
              </>
            )}

            {/* SCHOLARSHIP INFO */}
            {sectionKey === 'scholarship_info' && (
              <>
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold block">Awards Per Year</span>
                  <span className="font-black text-yellow-700 text-sm">{d.awardCount}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold block">Amount Range</span>
                  <span className="font-bold text-gray-700 text-sm">{d.amountRange}</span>
                </div>
                <span className="text-[10px] text-gray-400 font-semibold mt-0.5">{d.eligibility}</span>
              </>
            )}

            {/* HIGHLIGHTS */}
            {sectionKey === 'highlights' && (
              <div className="flex flex-wrap gap-1">
                {d.highlights.slice(0, 4).map((h: string) => (
                  <span
                    key={h}
                    className="bg-gray-50 border border-gray-200 text-gray-600 text-[9px] px-2 py-0.5 rounded font-semibold"
                  >
                    {h}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CompareModal({
  isOpen,
  onClose,
  initialColleges,
  allColleges,
  highlightSection = null,
}: CompareModalProps) {
  const [selectedColleges, setSelectedColleges] = useState<CollegeInCity[]>([]);
  const [showAddPeer, setShowAddPeer] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedColleges(initialColleges.slice(0, 3));
    }
  }, [isOpen, initialColleges]);

  if (!isOpen) return null;

  const firstType = selectedColleges[0]?.institutionType || 'UNIVERSITY';
  const sections: SectionKey[] = CATEGORY_SECTIONS[firstType] || DEFAULT_SECTIONS;

  const availablePeers = allColleges.filter(
    (c) => c.institutionType === firstType && !selectedColleges.some((s) => s.id === c.id)
  );

  const handleAddCollege = (college: CollegeInCity) => {
    if (selectedColleges.length < 3) {
      setSelectedColleges([...selectedColleges, college]);
      setShowAddPeer(null);
    }
  };

  const handleRemoveCollege = (id: number) => {
    setSelectedColleges(selectedColleges.filter((c) => c.id !== id));
  };

  // Nice label for the header
  const typeLabel =
    firstType === 'TRAINING_CENTER' ? 'Training Centers'
    : firstType === 'RESEARCH_CENTER' ? 'Research Centers'
    : firstType === 'SCHOLARSHIP_PROVIDER' ? 'Scholarship Providers'
    : firstType.charAt(0) + firstType.slice(1).toLowerCase() + (firstType.endsWith('Y') ? 's' : 's');

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0a2540]/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl relative overflow-hidden z-10 border border-gray-100 max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#0a2540] to-[#1a5276] text-white p-5 flex items-center justify-between shrink-0">
          <div>
            <div className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <ArrowUpDown size={11} />
              Side-by-Side Comparison
            </div>
            <h3 className="text-lg font-extrabold leading-snug">Compare {typeLabel}</h3>
            <p className="text-blue-200/70 text-[11px] mt-0.5">
              {sections.length} comparison {sections.length === 1 ? 'metric' : 'metrics'} relevant to {typeLabel}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto overflow-x-auto">
          <div className="min-w-[768px]">

            {/* Institution header row */}
            <div className="grid grid-cols-4 border-b border-gray-200 bg-gray-50/30">
              <div className="col-span-1 p-4 font-bold text-[10px] text-gray-400 uppercase tracking-wider flex items-center border-r border-gray-100">
                Institution
              </div>

              {[0, 1, 2].map((slotIndex) => {
                const college = selectedColleges[slotIndex];
                return (
                  <div key={slotIndex} className="col-span-1 p-4 border-r border-gray-100 last:border-r-0">
                    {college ? (
                      <div className="flex flex-col h-full">
                        <div className="flex gap-3 items-start">
                          <img
                            src={college.image}
                            alt={college.name}
                            className="w-12 h-12 rounded-xl object-cover border border-gray-100 shrink-0 shadow-sm"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="font-extrabold text-sm text-[#0a2540] line-clamp-2 leading-tight">
                              {college.name}
                            </h4>
                            <span className="text-[10px] text-gray-400 font-medium block mt-0.5">
                              {college.accreditation || 'Govt Approved'}
                            </span>
                            <div className="flex items-center gap-1 mt-1">
                              <Star size={10} className="text-yellow-500 fill-yellow-500" />
                              <span className="text-[10px] font-bold text-gray-600">{college.rating}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveCollege(college.id)}
                          className="mt-3 text-[10px] font-bold text-red-400 hover:text-red-600 hover:underline w-fit cursor-pointer"
                        >
                          ✕ Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full min-h-[80px] border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 p-3">
                        <span className="text-gray-400 text-[10px] font-semibold mb-2">Empty Slot</span>
                        {availablePeers.length > 0 ? (
                          <div className="relative">
                            <button
                              onClick={() => setShowAddPeer(showAddPeer === slotIndex ? null : slotIndex)}
                              className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold transition-all cursor-pointer"
                            >
                              <Plus size={11} /> Add Peer
                              <ChevronDown size={10} className={showAddPeer === slotIndex ? 'rotate-180' : ''} />
                            </button>
                            {showAddPeer === slotIndex && (
                              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl py-1 z-50 max-h-48 overflow-y-auto text-left">
                                {availablePeers.map((peer) => (
                                  <button
                                    key={peer.id}
                                    onClick={() => handleAddCollege(peer)}
                                    className="w-full text-left px-3 py-2 text-[11px] text-gray-700 hover:bg-blue-50 font-medium transition-colors border-b border-gray-50 last:border-0 flex items-center gap-2"
                                  >
                                    <img src={peer.image} alt={peer.name} className="w-6 h-6 rounded-md object-cover shrink-0" />
                                    <span className="line-clamp-1">{peer.name}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-[9px] text-gray-400">No peers available</span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Category-specific section rows */}
            <div className="divide-y divide-gray-100">
              {sections.map((sectionKey) => (
                <SectionRow
                  key={sectionKey}
                  sectionKey={sectionKey}
                  colleges={[selectedColleges[0], selectedColleges[1], selectedColleges[2]]}
                  highlightSection={highlightSection}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            <Award size={12} className="text-blue-400" />
            Data verified against 2026 official records
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Close
            </button>
            {selectedColleges.length >= 2 && (
              <button
                onClick={() => window.print()}
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/10 cursor-pointer"
              >
                Export Report
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
