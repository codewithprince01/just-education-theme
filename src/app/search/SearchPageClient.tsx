"use client";

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import {
  MapPin, Search, Star, ChevronDown, Building2, GraduationCap,
  ArrowRight, Award, X, Sparkles, LayoutGrid, List, Table, Download, ArrowUpDown
} from 'lucide-react';
import { cityMeta, institutionTypes } from '@/data/cityData';
import { getSearchDatabase, SearchCollege } from '@/data/searchMockData';
import JustDialSearchBar from '@/components/layout/JustDialSearchBar';

interface SearchPageClientProps {
  initialQ: string;
  initialLoc: string;
}

export default function SearchPageClient({ initialQ, initialLoc }: SearchPageClientProps) {
  const [layout, setLayout] = useState<'table' | 'list' | 'grid'>('list');
  const [sortBy, setSortBy] = useState('popularity');

  // Load the full dataset dynamically across all cities
  const allColleges = useMemo(() => getSearchDatabase(), []);

  // Filter based on initial query and location search params
  const filteredColleges = useMemo(() => {
    return allColleges.filter((college) => {
      // 1. Keyword search check
      if (initialQ) {
        const query = initialQ.toLowerCase();
        const matchesName = college.name.toLowerCase().includes(query);
        const matchesCourse = college.courses && college.courses.some(c => c.toLowerCase().includes(query));
        const matchesTag = college.courseTags && college.courseTags.some(t => t.toLowerCase().includes(query));
        const matchesType = college.institutionType.toLowerCase().includes(query) || college.type.toLowerCase().includes(query);
        
        if (!matchesName && !matchesCourse && !matchesTag && !matchesType) {
          return false;
        }
      }

      // 2. Location search check
      if (initialLoc) {
        const locQuery = initialLoc.toLowerCase();
        const matchesCity = college.cityName.toLowerCase().includes(locQuery);
        const matchesState = college.cityState.toLowerCase().includes(locQuery);
        
        if (!matchesCity && !matchesState) {
          return false;
        }
      }

      return true;
    });
  }, [allColleges, initialQ, initialLoc]);

  // Helper functions for parsing fees
  const getMinFee = (feeStr: string) => {
    if (!feeStr) return 0;
    const numbers = feeStr.replace(/,/g, '').match(/\d+/g);
    if (!numbers || numbers.length === 0) return 0;
    return parseInt(numbers[0], 10);
  };

  const getMaxFee = (feeStr: string) => {
    if (!feeStr) return 0;
    const numbers = feeStr.replace(/,/g, '').match(/\d+/g);
    if (!numbers || numbers.length === 0) return 0;
    return numbers.length > 1 ? parseInt(numbers[1], 10) : parseInt(numbers[0], 10);
  };

  // Sort logic
  const sortedColleges = useMemo(() => {
    return [...filteredColleges].sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'fees_high') {
        return getMaxFee(b.fees) - getMaxFee(a.fees);
      }
      if (sortBy === 'fees_low') {
        const feeA = getMinFee(a.fees) || Infinity;
        const feeB = getMinFee(b.fees) || Infinity;
        return feeA - feeB;
      }
      // default: popularity / original order
      return 0;
    });
  }, [filteredColleges, sortBy]);

  // Enriched details generator (consistent with CityPageClient)
  const getEnrichedData = (college: SearchCollege) => {
    const id = college.id || 1;
    const rate = college.rating || 4.0;
    const score = Math.round(rate * 170 + (id * 13) % 120);

    let courseName = 'B.Tech Computer Science';
    if (college.institutionType === 'SCHOOL') {
      courseName = 'CBSE Class 12';
    } else if (college.institutionType === 'LIBRARY') {
      courseName = 'Premium Membership';
    } else if (college.institutionType === 'COACHING') {
      courseName = 'JEE/NEET Classroom Program';
    } else if (college.institutionType === 'HOSTEL') {
      courseName = 'AC Double Sharing Room';
    } else if (college.courseTags && college.courseTags.length > 0) {
      courseName = college.courseTags[0] + ' General';
    }

    let isAcademicOnly = ['SCHOOL', 'LIBRARY', 'HOSTEL', 'SCHOLARSHIP_PROVIDER', 'CONSULTANT'].includes(college.institutionType);
    let avgPkgStr = 'N/A';
    let highestPkgStr = 'N/A';
    let placementSubtitle = 'Placement Rate';
    let highestSubtitle = 'Highest Package';

    if (college.institutionType === 'SCHOOL') {
      avgPkgStr = '91%';
      highestPkgStr = '99.2%';
      placementSubtitle = 'CBSE Avg Score';
      highestSubtitle = 'CBSE Top Score';
    } else if (college.institutionType === 'LIBRARY') {
      avgPkgStr = '24/7';
      highestPkgStr = '250+';
      placementSubtitle = 'Access Timing';
      highestSubtitle = 'Daily Footfall';
    } else if (college.institutionType === 'HOSTEL') {
      avgPkgStr = '200+';
      highestPkgStr = 'Verified';
      placementSubtitle = 'Beds Available';
      highestSubtitle = 'Property Status';
    } else if (college.institutionType === 'SCHOLARSHIP_PROVIDER') {
      avgPkgStr = '₹ 15k - 1L';
      highestPkgStr = '3.5k+';
      placementSubtitle = 'Aid Range';
      highestSubtitle = 'Students Funded';
    } else {
      const baseAvg = Math.round(rate * 1.5 + (id % 3) * 0.7);
      const baseHigh = Math.round(rate * 5.2 + (id % 5) * 7.5);
      avgPkgStr = `₹ ${baseAvg.toLocaleString('en-IN')},000`;
      highestPkgStr = `₹ ${baseHigh.toLocaleString('en-IN')},000`;
      placementSubtitle = 'Average Package';
      highestSubtitle = 'Highest Package';
    }

    const reviewTags = [
      'Best in Social Life',
      'Excellent Infrastructure',
      'Outstanding Faculty',
      'Highly Recommended',
      'Great Student Support',
      'Top Placements Recipient'
    ];
    const reviewTag = reviewTags[id % reviewTags.length];

    let rankingStr = `#${(id % 12) + 1}th/100 in India`;
    if (college.institutionType === 'UNIVERSITY' || college.institutionType === 'COLLEGE') {
      rankingStr = `#${(id % 8) + 1}th/500 in India for ${college.courses[0] || 'Engineering'}`;
    }

    return {
      score,
      courseName,
      avgPkgStr,
      highestPkgStr,
      placementSubtitle,
      highestSubtitle,
      reviewTag,
      rankingStr,
      isAcademicOnly
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-16">
      {/* Search Header Banner */}
      <section className="relative bg-gradient-to-br from-[#0a2540] via-[#0d3868] to-[#1a5276] py-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 leading-tight">
              Search Results
            </h1>
            <p className="text-blue-100/80 text-sm md:text-base">
              {filteredColleges.length} institutions found matching {initialQ ? `"${initialQ}"` : 'all keywords'} {initialLoc ? `in "${initialLoc}"` : ''}
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/15">
            <Suspense fallback={<div className="h-14 bg-white/10 rounded-2xl animate-pulse" />}>
              <JustDialSearchBar isCompact={true} />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Main Content & Results grid */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Info panel */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm sticky top-24">
              <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider mb-4">Filter By City</h3>
              <div className="flex flex-col gap-2">
                {Object.keys(cityMeta).map((cityKey) => {
                  const city = cityMeta[cityKey];
                  return (
                    <Link
                      key={cityKey}
                      href={`/city/${cityKey}`}
                      className="flex items-center justify-between text-sm text-gray-600 hover:text-blue-600 font-semibold transition-colors py-1.5 border-b border-gray-50 last:border-0"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin size={14} className="text-red-400" />
                        {city.name}
                      </span>
                      <span className="text-[10px] bg-gray-100 text-gray-500 font-bold px-2 py-0.5 rounded-full">
                        {city.totalColleges}+
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results column */}
          <div className="flex-1">
            {/* Sort & Layout Control Panel */}
            {sortedColleges.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <span className="text-[#0a2540] font-bold text-base md:text-lg">
                  Showing {sortedColleges.length} results
                </span>

                <div className="flex items-center gap-6 justify-end w-full sm:w-auto">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="text-xs sm:text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-semibold"
                    >
                      <option value="popularity">Popularity</option>
                      <option value="rating">Rating</option>
                      <option value="fees_high">Highest Fees</option>
                      <option value="fees_low">Lowest Fees</option>
                    </select>
                  </div>

                  <div className="h-5 w-px bg-gray-200" />

                  <div className="flex items-center bg-gray-100 rounded-xl p-1 gap-1">
                    {[
                      { value: 'list', icon: List, tooltip: 'List View' },
                      { value: 'grid', icon: LayoutGrid, tooltip: 'Grid View' },
                      { value: 'table', icon: Table, tooltip: 'Table View' },
                    ].map((btn) => (
                      <button
                        key={btn.value}
                        onClick={() => setLayout(btn.value as 'list' | 'grid' | 'table')}
                        title={btn.tooltip}
                        className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                          layout === btn.value
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                        aria-label={btn.tooltip}
                      >
                        <btn.icon size={16} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Results Grid / List / Table */}
            {sortedColleges.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-lg mx-auto">
                <Search size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-700">No Listings Found</h3>
                <p className="text-sm text-gray-500 mt-2">
                  We couldn't find any institutions matching your search criteria. Try modifying your queries.
                </p>
                <Link
                  href="/"
                  className="mt-6 inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-md shadow-blue-500/10"
                >
                  Return Home
                </Link>
              </div>
            ) : layout === 'table' ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto text-gray-700">
                  <table className="w-full min-w-[850px]">
                    <thead>
                      <tr className="bg-[#0a2540] text-white">
                        <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wide w-20">Rank</th>
                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide min-w-[300px]">Institution</th>
                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide w-40">Fees</th>
                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide w-40">Placement</th>
                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide w-40">Reviews</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedColleges.map((college, idx) => {
                        const { score, courseName, avgPkgStr, reviewTag } = getEnrichedData(college);
                        return (
                          <tr key={college.uniqueId} className="border-b border-gray-50 last:border-0 hover:bg-slate-50/50">
                            <td className="px-5 py-5 text-center text-lg font-extrabold text-gray-800">#{idx + 1}</td>
                            <td className="px-5 py-5">
                              <div className="flex items-center gap-3">
                                <img src={college.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                                <div>
                                  <Link href={`/city/${college.citySlug}`} className="font-bold text-blue-600 hover:underline">{college.name}</Link>
                                  <div className="text-xs text-gray-400 mt-0.5">{college.cityName}, {college.cityState}</div>
                                  <div className="inline-block bg-yellow-50 text-[10px] text-yellow-800 font-bold px-2 py-0.5 rounded-lg border border-yellow-100 mt-2">
                                    CD Score: {score}/1000
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-5">
                              <div className="text-sm font-bold text-emerald-600">{college.fees.split(' - ')[0]}</div>
                              <div className="text-[10px] text-gray-500 mt-0.5">{courseName}</div>
                            </td>
                            <td className="px-5 py-5">
                              <div className="text-sm font-bold text-emerald-600">{avgPkgStr}</div>
                              <div className="text-[10px] text-gray-500 mt-0.5">Average Package</div>
                            </td>
                            <td className="px-5 py-5">
                              <div className="flex items-center gap-1">
                                <Star size={12} className="fill-amber-400 text-amber-400" />
                                <span className="text-xs font-bold text-gray-800">{college.rating}</span>
                              </div>
                              <div className="text-[9px] text-gray-400 mt-0.5">{college.reviews} reviews</div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : layout === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedColleges.map((college) => {
                  const { score, courseName, avgPkgStr, reviewTag } = getEnrichedData(college);
                  return (
                    <div key={college.uniqueId} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                      <div>
                        <div className="relative h-44 rounded-xl overflow-hidden mb-4 border border-gray-50">
                          <img src={college.image} className="w-full h-full object-cover" alt={college.name} />
                          <div className="absolute top-3 left-3 bg-[#0a2540] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                            <Star size={11} className="fill-yellow-400 text-yellow-400" />
                            {college.rating} ({college.reviews})
                          </div>
                        </div>

                        <div className="flex items-start justify-between gap-2">
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase scale-90 -translate-x-1">
                            {college.institutionType}
                          </span>
                          <span className="text-[11px] font-semibold text-gray-400 flex items-center gap-1">
                            <MapPin size={12} className="text-red-400" />
                            {college.cityName}
                          </span>
                        </div>

                        <h3 className="font-extrabold text-gray-800 text-lg mt-2 leading-tight">
                          {college.name}
                        </h3>

                        <p className="text-xs text-gray-400 mt-1 font-medium">{college.accreditation || 'Govt Approved'}</p>

                        <div className="grid grid-cols-2 gap-4 mt-4 py-3 border-t border-b border-gray-50">
                          <div>
                            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Course Fees</span>
                            <div className="text-sm font-extrabold text-emerald-600">{college.fees.split(' - ')[0]}</div>
                            <span className="text-[9px] text-gray-400 block truncate">{courseName}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Placement Pack</span>
                            <div className="text-sm font-extrabold text-emerald-600">{avgPkgStr}</div>
                            <span className="text-[9px] text-gray-400 block">Average Package</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4 mt-5">
                        <Link
                          href={`/city/${college.citySlug}`}
                          className="flex-1 py-2 px-4 border border-gray-200 hover:bg-slate-50 text-gray-700 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1"
                        >
                          View Details
                          <ArrowRight size={13} />
                        </Link>
                        <button className="flex-1 py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-orange-500/10 cursor-pointer">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // List layout (default)
              <div className="flex flex-col gap-5">
                {sortedColleges.map((college) => {
                  const { score, courseName, avgPkgStr, reviewTag } = getEnrichedData(college);
                  return (
                    <div key={college.uniqueId} className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-5">
                      <div className="w-full md:w-48 h-36 flex-shrink-0 rounded-xl overflow-hidden border border-gray-50 relative">
                        <img src={college.image} className="w-full h-full object-cover" alt="" />
                        <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-gray-100 flex items-center gap-0.5 shadow-sm">
                          ★ {college.rating}
                        </span>
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full uppercase">
                              {college.institutionType}
                            </span>
                            <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                              <MapPin size={12} className="text-red-400" />
                              {college.cityName}, {college.cityState}
                            </span>
                          </div>

                          <h3 className="font-extrabold text-gray-800 text-lg md:text-xl mt-2 hover:text-blue-600 transition-colors">
                            {college.name}
                          </h3>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 font-semibold mt-1">
                            <span>Established {college.established}</span>
                            <span>•</span>
                            <span className="text-blue-550/90">{college.accreditation || 'Govt Approved'}</span>
                            <span>•</span>
                            <span className="text-yellow-700 font-bold bg-yellow-50 px-1.5 py-0.5 rounded border border-yellow-100">
                              CD Score: {score}/1000
                            </span>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 pt-3 border-t border-gray-50">
                            <div>
                              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Fees Range</span>
                              <div className="text-sm font-extrabold text-emerald-600">{college.fees}</div>
                              <span className="text-[9px] text-gray-450 font-medium block truncate max-w-[150px]">{courseName}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider font-sans">Placements</span>
                              <div className="text-sm font-extrabold text-emerald-600">{avgPkgStr}</div>
                              <span className="text-[9px] text-gray-450 font-medium block">Average Package</span>
                            </div>
                            <div className="hidden md:block">
                              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Reviews Info</span>
                              <div className="text-sm font-extrabold text-gray-700">{college.reviews} reviews</div>
                              <span className="text-[9px] text-yellow-600 font-semibold block">{reviewTag}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 mt-5 pt-3 border-t border-gray-50">
                          <Link
                            href={`/city/${college.citySlug}`}
                            className="py-2 px-5 border border-gray-200 hover:bg-slate-50 text-gray-750 font-bold rounded-xl text-xs transition-all flex items-center gap-1 cursor-pointer"
                          >
                            View Details
                            <ArrowRight size={13} />
                          </Link>
                          <button className="py-2 px-5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-orange-500/10 cursor-pointer">
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
