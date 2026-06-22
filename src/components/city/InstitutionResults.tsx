import Link from 'next/link';
import {
  Star, ChevronDown, GraduationCap, ArrowRight, Award, Heart, Download, ArrowUpDown
} from 'lucide-react';
import { CollegeInCity, institutionTypes } from '@/data/cityData';
import { ActionModalMode } from '@/components/shared/ActionModal';
import { getEnrichedData } from './cityHelpers';

type CompareHighlight = 'fees' | 'placement' | 'rating' | 'ranking' | null;

interface TableHeaders {
  institution: string;
  fees: string;
  metric: string;
  ranking: string;
}

interface InstitutionResultsProps {
  layout: 'table' | 'list' | 'grid';
  items: CollegeInCity[];
  headers: TableHeaders;
  cityName: string;
  cityState: string;
  savedColleges: number[];
  checkedCollegesForCompare: number[];
  onToggleSave: (id: number) => void;
  onToggleCompareCheckbox: (college: CollegeInCity) => void;
  onApply: (college: CollegeInCity, mode: ActionModalMode) => void;
  onCompare: (college: CollegeInCity, highlight: CompareHighlight) => void;
  onShowRanking: (college: CollegeInCity) => void;
}

export default function InstitutionResults({
  layout,
  items,
  headers,
  cityName,
  cityState,
  savedColleges,
  checkedCollegesForCompare,
  onToggleSave,
  onToggleCompareCheckbox,
  onApply,
  onCompare,
  onShowRanking,
}: InstitutionResultsProps) {
  if (layout === 'table') {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto text-gray-700">
          <table className="w-full min-w-[920px]">
            <thead>
              <tr className="bg-gradient-to-r from-[#0a2540] to-[#1a5276] text-white">
                <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wide w-20">Rank</th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide min-w-[340px]">{headers.institution}</th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide w-48">{headers.fees}</th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide w-48">{headers.metric}</th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide w-52">User Reviews</th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide w-56">{headers.ranking}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((college, index) => {
                const { score, courseName, feesSubtitle, avgPkgStr, highestPkgStr, placementSubtitle, highestSubtitle, compareMetricLabel, reviewTag, rankingLabel, isAcademicOnly, rankNum, rankTotal, rankSuffix, rankSubject } = getEnrichedData(college);
                return (
                  <tr key={college.id} className={`border-b border-gray-100 last:border-0 transition-colors hover:bg-blue-50/10 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/10'}`}>
                    <td className="px-5 py-6 align-top text-center w-20">
                      <span className="font-extrabold text-[#0a2540] text-lg">#{index + 1}</span>
                    </td>
                    <td className="px-5 py-6 align-top min-w-[340px]">
                      <div className="flex items-start gap-4">
                        <img src={college.logo ?? college.image} alt={college.name} className="w-14 h-14 rounded-2xl object-cover flex-shrink-0 border border-gray-100 shadow-sm" loading="lazy" />
                        <div className="min-w-0 flex-1">
                          <Link href={college.detailHref || `/college/${college.id}`} className="font-bold text-blue-600 hover:text-blue-800 text-[15px] hover:underline leading-snug">{college.name}</Link>
                          <div className="text-xs text-gray-500 font-medium mt-0.5">{cityName}, {cityState} | <span className="text-gray-400">{college.accreditation || 'Govt Approved'}</span></div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-4 text-[11px] font-bold text-gray-400">
                            <button onClick={() => onApply(college, 'apply')} className="flex items-center gap-1 text-orange-600 hover:text-orange-700 hover:underline cursor-pointer"><ArrowRight size={13} className="text-orange-500" />Apply Now</button>
                            <span className="text-gray-200 font-normal">|</span>
                            <button onClick={() => onApply(college, 'brochure')} className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer"><Download size={13} className="text-emerald-500" />Download Brochure</button>
                            {compareMetricLabel && (
                              <>
                                <span className="text-gray-200 font-normal">|</span>
                                <label className="flex items-center gap-1.5 cursor-pointer text-gray-500 hover:text-gray-700 select-none">
                                  <input
                                    type="checkbox"
                                    checked={checkedCollegesForCompare.includes(college.id)}
                                    onChange={() => onToggleCompareCheckbox(college)}
                                    className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 accent-blue-600"
                                  />
                                  Add To Compare
                                </label>
                              </>
                            )}
                          </div>
                          <div className="inline-flex items-center gap-1.5 bg-[#FFFDE7] border border-[#FFF9C4] rounded-lg px-2.5 py-1 mt-3">
                            <GraduationCap size={13} className="text-yellow-600 animate-pulse" />
                            <span className="text-[11px] text-[#0a2540] font-bold">CD Score: <span className="text-yellow-700">{score}/1000</span></span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-6 align-top w-48">
                      <div className="flex flex-col">
                        <span className="text-[15px] font-black text-emerald-600 leading-tight">{college.fees.split(' - ')[0]}</span>
                        <span className="text-xs font-bold text-gray-700 mt-1 leading-snug">{courseName}</span>
                        <span className="text-[11px] text-gray-400 font-semibold mt-0.5">{feesSubtitle}</span>
                        <button
                          onClick={() => onCompare(college, 'fees')}
                          className="flex items-center gap-1 text-[11px] text-orange-600 hover:text-orange-700 hover:underline font-bold mt-4 justify-start cursor-pointer"
                        >
                          <ArrowUpDown size={11} />
                          Compare {headers.fees}
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-6 align-top w-48">
                      <div className="flex flex-col">
                        <span className="text-[15px] font-black text-emerald-600 leading-tight">{avgPkgStr}</span>
                        <span className="text-[11px] text-gray-400 font-semibold mt-0.5 leading-snug">{placementSubtitle}</span>
                        {!isAcademicOnly && (<><span className="text-[14px] font-black text-emerald-600 mt-2.5 leading-tight">{highestPkgStr}</span><span className="text-[11px] text-gray-400 font-semibold mt-0.5 leading-snug">{highestSubtitle}</span></>)}
                        {compareMetricLabel && (
                          <button
                            onClick={() => onCompare(college, 'placement')}
                            className="flex items-center gap-1 text-[11px] text-orange-600 hover:text-orange-700 hover:underline font-bold mt-4 justify-start cursor-pointer"
                          >
                            <ArrowUpDown size={11} />
                            {compareMetricLabel}
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-6 align-top w-52">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-50 inline-block"></span><span className="text-sm font-black text-gray-800">{college.rating} / 5</span></div>
                        <span className="text-[11px] text-gray-400 font-semibold mt-1">Based on {college.reviews} Reviews</span>
                        <div className="inline-flex items-center justify-between bg-yellow-50/80 border border-yellow-100 rounded-lg px-2 py-1 mt-4 text-[11px] font-bold text-yellow-800 w-fit">✓ {reviewTag}</div>
                      </div>
                    </td>
                    <td className="px-5 py-6 align-top w-56">
                      <div className="flex flex-col gap-2">
                        {/* Rank text */}
                        <div className="text-gray-700 text-sm font-semibold leading-normal">
                          <span className="font-extrabold">#{rankNum}<sup>{rankSuffix}</sup></span>
                          <span className="text-gray-400">/</span>
                          <span className="text-orange-500 font-bold">{rankTotal}</span>
                          <span className="text-gray-600"> in India for</span>
                          <div className="text-xs font-bold text-gray-500 mt-0.5">{rankSubject}</div>
                        </div>

                        {/* Overlapping Circles Modal Trigger */}
                        <button
                          onClick={() => onShowRanking(college)}
                          className="flex items-center gap-2 bg-[#e3f2fd]/50 hover:bg-[#e3f2fd]/80 border border-[#bbdefb] px-2.5 py-1.5 rounded-full cursor-pointer transition-all w-fit text-[#1e88e5] hover:text-[#1565c0]"
                        >
                          <div className="flex -space-x-1.5">
                            <div className="w-4.5 h-4.5 rounded-full bg-emerald-600 text-white text-[8px] font-black flex items-center justify-center border border-white shadow-sm" title="NIRF">N</div>
                            <div className="w-4.5 h-4.5 rounded-full bg-amber-500 text-white text-[8px] font-black flex items-center justify-center border border-white shadow-sm" title="QS World">Q</div>
                            <div className="w-4.5 h-4.5 rounded-full bg-red-600 text-white text-[8px] font-black flex items-center justify-center border border-white shadow-sm" title="THE">T</div>
                          </div>
                          <span className="text-[10px] font-black">+ {((college.id + 1) % 5) + 6} More</span>
                          <ChevronDown size={11} className="text-[#90caf9]" />
                        </button>
                        <div className="flex items-center gap-1.5 mt-1 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                          <Award size={11} className="text-blue-500" />
                          <span>{rankingLabel}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (layout === 'list') {
    return (
      <div className="flex flex-col gap-4">
        {items.map((college, index) => {
          const { score, courseName, avgPkgStr, placementSubtitle, reviewTag, rankingStr, compareMetricLabel } = getEnrichedData(college);
          const typeInfo = institutionTypes.find(t => t.value === college.institutionType);
          return (
            <div key={college.id} className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col md:flex-row gap-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
              <div className="w-full md:w-48 h-32 flex-shrink-0 rounded-xl overflow-hidden border border-gray-200 relative bg-gray-50">
                <img src={college.image} alt={college.name} className="w-full h-full object-cover" loading="lazy" />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm text-white font-bold text-[10px] rounded-full uppercase tracking-wider">Rank #{index + 1}</span>
              </div>
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link href={college.detailHref || `/college/${college.id}`} className="font-bold text-[#0a2540] hover:text-blue-600 text-lg hover:underline leading-snug block">{college.name}</Link>
                      <div className="text-xs text-gray-500 mt-1 font-medium">{cityName}, {cityState} | <span className="text-gray-400">{college.accreditation || 'Govt Approved'}</span></div>
                    </div>
                    <button onClick={() => onToggleSave(college.id)} className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-all flex-shrink-0 cursor-pointer">
                      <Heart size={14} className={savedColleges.includes(college.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-[11px] px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full font-semibold">{typeInfo?.label.replace(/s$/, '') || college.type}</span>
                    <span className="text-[11px] px-2.5 py-0.5 bg-yellow-50 text-yellow-700 rounded-full font-semibold">Score: {score}/1000</span>
                    <span className="text-[11px] px-2.5 py-0.5 bg-purple-50 text-purple-700 rounded-full font-semibold">{rankingStr}</span>
                    <span className="text-[11px] px-2.5 py-0.5 bg-orange-50 text-orange-700 rounded-full font-semibold">{reviewTag}</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 pt-3 border-t border-gray-50 text-xs font-bold text-gray-500">
                  <button onClick={() => onApply(college, 'apply')} className="flex items-center gap-1 text-orange-600 hover:text-orange-700 hover:underline cursor-pointer"><ArrowRight size={13} className="text-orange-500" />Apply Now</button>
                  <span className="text-gray-200">|</span>
                  <button onClick={() => onApply(college, 'brochure')} className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer"><Download size={13} className="text-emerald-500" />Brochure</button>
                  {compareMetricLabel && (
                    <>
                      <span className="text-gray-200">|</span>
                      <label className="flex items-center gap-1.5 cursor-pointer text-gray-500 hover:text-gray-700 select-none">
                        <input
                          type="checkbox"
                          checked={checkedCollegesForCompare.includes(college.id)}
                          onChange={() => onToggleCompareCheckbox(college)}
                          className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 accent-blue-600"
                        />
                        Add To Compare
                      </label>
                    </>
                  )}
                </div>
              </div>
              <div className="w-full md:w-56 bg-gray-50 rounded-xl border border-gray-200 p-4 flex flex-col justify-between gap-3 flex-shrink-0">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="border-r border-gray-200 pr-2">
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{headers.fees}</div>
                    <div className="text-[14px] font-black text-emerald-600 mt-1">{college.fees.split(' - ')[0]}</div>
                    <div className="text-[9px] text-gray-500 font-semibold mt-0.5 line-clamp-1">{courseName}</div>
                  </div>
                  <div className="pl-2">
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{headers.metric}</div>
                    <div className="text-[14px] font-black text-emerald-600 mt-1">{avgPkgStr}</div>
                    <div className="text-[9px] text-gray-500 font-semibold mt-0.5">{placementSubtitle}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-2 text-xs">
                  <div className="flex items-center gap-1"><Star size={12} className="text-yellow-500 fill-yellow-500" /><span className="font-bold text-gray-700">{college.rating}/5</span></div>
                  <span className="text-gray-400 font-medium">({college.reviews} reviews)</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((college, index) => {
        const { score, courseName, avgPkgStr, placementSubtitle, rankingStr, compareMetricLabel } = getEnrichedData(college);
        const typeInfo = institutionTypes.find(t => t.value === college.institutionType);
        return (
          <div key={college.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="h-44 bg-gray-150 relative">
              <img src={college.image} alt={college.name} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Rank #{index + 1}</div>
              <button onClick={() => onToggleSave(college.id)} className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white shadow-sm transition-all cursor-pointer">
                <Heart size={14} className={savedColleges.includes(college.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'} />
              </button>
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[#0a2540] px-2.5 py-0.5 rounded-lg text-[10px] font-black shadow-sm">Score: {score}/1000</div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between gap-4">
              <div>
                <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{typeInfo?.label.replace(/s$/, '') || college.type}</span>
                <Link href={college.detailHref || `/college/${college.id}`} className="font-bold text-[#0a2540] hover:text-blue-600 text-[15px] hover:underline leading-snug mt-2 block line-clamp-2">{college.name}</Link>
                <div className="text-[11px] text-gray-500 mt-1 font-medium">{cityName}, {cityState} | {college.accreditation || 'Govt Approved'}</div>
                <div className="text-[11px] text-purple-700 font-bold mt-2">{rankingStr}</div>
                {compareMetricLabel && (
                  <label className="flex items-center gap-1.5 cursor-pointer text-gray-500 hover:text-gray-700 select-none text-[11px] font-bold mt-3">
                    <input
                      type="checkbox"
                      checked={checkedCollegesForCompare.includes(college.id)}
                      onChange={() => onToggleCompareCheckbox(college)}
                      className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 accent-blue-600"
                    />
                    Add To Compare
                  </label>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 border-t border-b border-gray-100 py-3 text-center">
                <div className="border-r border-gray-100 pr-2">
                  <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{headers.fees}</div>
                  <div className="text-xs font-black text-emerald-600 mt-0.5">{college.fees.split(' - ')[0]}</div>
                  <div className="text-[8px] text-gray-500 font-semibold line-clamp-1 mt-0.5">{courseName}</div>
                </div>
                <div className="pl-2">
                  <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{headers.metric}</div>
                  <div className="text-xs font-black text-emerald-600 mt-0.5">{avgPkgStr}</div>
                  <div className="text-[8px] text-gray-500 font-semibold mt-0.5">{placementSubtitle}</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 border-t border-gray-100 px-4 py-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1"><Star size={12} className="text-yellow-500 fill-yellow-500" /><span className="text-xs font-bold text-gray-700">{college.rating}</span><span className="text-[10px] text-gray-400 font-medium">({college.reviews})</span></div>
              <button onClick={() => onApply(college, 'apply')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] px-3.5 py-1.5 rounded-lg shadow-sm transition-all cursor-pointer">Apply Now</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
