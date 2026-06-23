"use client";

import { useState, useMemo, useEffect } from 'react';
import { ChevronDown, ArrowRight, Award, X, List, LayoutGrid, Table, Search } from 'lucide-react';
import {
  cityMeta,
  topCollegesInCity,
  institutionTypes,
  institutionFilterConfig,
  CollegeInCity,
} from '@/data/cityData';
import CompareModal from '@/components/shared/CompareModal';
import ActionModal, { ActionModalMode } from '@/components/shared/ActionModal';
import { TABLE_HEADER_CONFIG, getMinFee, getMaxFee } from '@/components/city/cityHelpers';
import InstitutionResults from '@/components/city/InstitutionResults';
import CityHero from '@/components/city/CityHero';
import RankingModal from '@/components/city/RankingModal';
import CompareTray from '@/components/city/CompareTray';
import ScrollToTop from '@/components/city/ScrollToTop';
import CityStyles from '@/components/city/CityStyles';

interface Props {
  /** Pre-select a city (e.g. 'pune'). Defaults to 'ALL'. */
  initialCity?: string;
  /** Pre-select an institution type (e.g. 'UNIVERSITY'). Defaults to 'ALL'. */
  initialType?: string;
  /** Pre-fill the name/course search box (e.g. from the global search bar). */
  initialSearch?: string;
}

const INDIA_META = {
  name: 'India',
  state: 'All States',
  tagline: 'Explore Top Educational Institutions',
  description: 'Browse universities, colleges, schools, coaching centres and more across India\'s top educational hubs.',
  totalColleges: 5000,
  totalUniversities: 200,
  totalStudents: '100L+',
  avgFees: '₹30,000 – ₹5,00,000',
  heroImage: '',
};

function matchesAdvFilter(item: CollegeInCity, key: string, value: string) {
  const fv = item[key as keyof CollegeInCity];
  return Array.isArray(fv) ? fv.includes(value) : fv === value;
}

export default function InstitutionsBrowserClient({
  initialCity,
  initialType,
  initialSearch,
}: Props) {
  /* ── city (controlled by the search bar / URL) ── */
  const [selectedCity, setSelectedCity] = useState(initialCity ?? 'ALL');

  /* ── category filter state ── */
  const [selectedType, setSelectedType] = useState(initialType ?? 'ALL');
  const [searchQuery, setSearchQuery] = useState(initialSearch ?? '');
  const [advancedFilters, setAdvancedFilters] = useState<Record<string, string | null>>({});
  const [openFilterKey, setOpenFilterKey] = useState<string | null>(null);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number } | null>(null);
  const [sortBy, setSortBy] = useState('popularity');
  const [layout, setLayout] = useState<'table' | 'list' | 'grid'>('table');

  /* ── pagination (single-type view) ── */
  const PAGE_SIZE_OPTIONS = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  /* ── close all dropdowns on scroll ── */
  useEffect(() => {
    const closeAll = () => {
      setOpenFilterKey(null);
      setDropdownPos(null);
    };
    window.addEventListener('scroll', closeAll, { passive: true });
    return () => window.removeEventListener('scroll', closeAll);
  }, []);

  /* ── modal state ── */
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [collegesToCompare, setCollegesToCompare] = useState<CollegeInCity[]>([]);
  const [compareHighlightSection, setCompareHighlightSection] = useState<'fees' | 'placement' | 'rating' | 'ranking' | null>(null);
  const [checkedCollegesForCompare, setCheckedCollegesForCompare] = useState<number[]>([]);
  const [savedColleges, setSavedColleges] = useState<number[]>([]);
  const [selectedCollegeForRanking, setSelectedCollegeForRanking] = useState<CollegeInCity | null>(null);
  const [actionModal, setActionModal] = useState<{ isOpen: boolean; mode: ActionModalMode; college: CollegeInCity | null }>({
    isOpen: false, mode: 'apply', college: null,
  });

  /* ── handlers ── */
  const openActionModal = (c: CollegeInCity, mode: ActionModalMode) => setActionModal({ isOpen: true, mode, college: c });
  const closeActionModal = () => setActionModal((p) => ({ ...p, isOpen: false }));

  const openCompareForCollege = (college: CollegeInCity, highlight: typeof compareHighlightSection) => {
    const peers = topCollegesInCity.filter((c) => c.institutionType === college.institutionType && c.id !== college.id);
    setCollegesToCompare([college, ...peers.slice(0, 2)]);
    setCompareHighlightSection(highlight);
    setIsCompareOpen(true);
  };

  const handleCompareCheckbox = (college: CollegeInCity) => {
    setCheckedCollegesForCompare((prev) => {
      if (prev.includes(college.id)) return prev.filter((id) => id !== college.id);
      if (prev.length >= 3) { alert('You can select up to 3 institutions to compare.'); return prev; }
      return [...prev, college.id];
    });
  };

  const toggleSave = (id: number) =>
    setSavedColleges((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const handleSelectType = (val: string) => { setSelectedType(val); setAdvancedFilters({}); setOpenFilterKey(null); };
  const toggleAdvFilter = (key: string, value: string) => {
    setAdvancedFilters((p) => ({ ...p, [key]: p[key] === value ? null : value }));
    setOpenFilterKey(null);
  };
  const clearAdvFilters = () => setAdvancedFilters({});
  const advFilterCount = Object.values(advancedFilters).filter(Boolean).length;

  /* ── display strings ── */
  const cityName = selectedCity === 'ALL' ? 'India' : (cityMeta[selectedCity]?.name ?? 'India');
  const cityState = selectedCity === 'ALL' ? 'All States' : (cityMeta[selectedCity]?.state ?? '');
  const typeLabel = institutionTypes.find((t) => t.value === selectedType)?.label ?? 'Institutions';

  /* ── counts (cross-dimension) ── */
  const typeCounts = useMemo(() => {
    const base = selectedCity === 'ALL'
      ? topCollegesInCity
      : topCollegesInCity.filter((c) => (c.city ?? 'pune') === selectedCity);
    return institutionTypes.reduce<Record<string, number>>(
      (acc, t) => { acc[t.value] = base.filter((c) => c.institutionType === t.value).length; return acc; },
      { ALL: base.length },
    );
  }, [selectedCity]);

  /* ── advanced filter config (type-dependent) ── */
  const activeFilterConfig = institutionFilterConfig[selectedType] ?? [];

  const getFilterOptions = (filterKey: string, defaultOptions: string[]) => {
    const base = topCollegesInCity.filter((item) => {
      if (selectedType !== 'ALL' && item.institutionType !== selectedType) return false;
      if (selectedCity !== 'ALL' && (item.city ?? 'pune') !== selectedCity) return false;
      return true;
    });
    if (defaultOptions.length > 0) {
      const extras: string[] = [];
      base.forEach((item) => {
        const val = item[filterKey as keyof CollegeInCity];
        if (Array.isArray(val)) val.forEach((v) => { if (v && !defaultOptions.includes(v as string)) extras.push(v as string); });
        else if (typeof val === 'string' && val && !defaultOptions.includes(val)) extras.push(val);
      });
      return [...defaultOptions, ...Array.from(new Set(extras)).sort()];
    }
    const unique = new Set<string>();
    base.forEach((item) => {
      const val = item[filterKey as keyof CollegeInCity];
      if (Array.isArray(val)) val.forEach((v) => { if (v) unique.add(v as string); });
      else if (typeof val === 'string' && val) unique.add(val);
    });
    return Array.from(unique).sort();
  };

  /* ── filtered + sorted data ── */
  const filteredInstitutions = useMemo(() => {
    return topCollegesInCity.filter((item) => {
      if (selectedType !== 'ALL' && item.institutionType !== selectedType) return false;
      if (selectedCity !== 'ALL' && (item.city ?? 'pune') !== selectedCity) return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!item.name.toLowerCase().includes(q) && !item.courses?.some((c) => c.toLowerCase().includes(q))) return false;
      }
      return Object.entries(advancedFilters).every(([k, v]) => !v || matchesAdvFilter(item, k, v));
    });
  }, [selectedType, selectedCity, searchQuery, advancedFilters]);

  const sortedInstitutions = useMemo(() => {
    return [...filteredInstitutions].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'fees_high') return getMaxFee(b.fees) - getMaxFee(a.fees);
      if (sortBy === 'fees_low') return (getMinFee(a.fees) || Infinity) - (getMinFee(b.fees) || Infinity);
      return 0;
    });
  }, [filteredInstitutions, sortBy]);

  /* ── pagination math (single-type view) ── */
  const totalPages = Math.max(1, Math.ceil(sortedInstitutions.length / pageSize));

  // Reset to the first page whenever the result set or page size changes
  // (adjust-state-during-render — no effect, no cascading renders).
  const resetKey = `${selectedType}|${selectedCity}|${searchQuery}|${JSON.stringify(advancedFilters)}|${sortBy}|${pageSize}`;
  const [prevResetKey, setPrevResetKey] = useState(resetKey);
  if (resetKey !== prevResetKey) {
    setPrevResetKey(resetKey);
    setCurrentPage(1);
  }

  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * pageSize;
  const paginatedInstitutions = useMemo(
    () => sortedInstitutions.slice(pageStart, pageStart + pageSize),
    [sortedInstitutions, pageStart, pageSize]
  );

  /* ── grouped view (when type=ALL) ── */
  const groupedInstitutions = useMemo(() => {
    if (selectedType !== 'ALL') return null;
    const order = institutionTypes.map((t) => t.value);
    const map: Record<string, CollegeInCity[]> = {};
    sortedInstitutions.forEach((item) => {
      (map[item.institutionType] = map[item.institutionType] || []).push(item);
    });
    return order
      .filter((key) => map[key]?.length > 0)
      .map((key) => ({
        typeValue: key,
        label: institutionTypes.find((t) => t.value === key)?.label ?? key,
        icon: institutionTypes.find((t) => t.value === key)?.icon ?? '🏫',
        items: map[key],
        headers: TABLE_HEADER_CONFIG[key] ?? TABLE_HEADER_CONFIG.ALL,
      }));
  }, [sortedInstitutions, selectedType]);

  /* ── shared pill classes ── */
  const basePill = 'flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer shadow-sm';
  const activePill = 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20';
  const inactivePill = 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600';
  const pillCount = (active: boolean) => `text-xs px-1.5 py-0.5 rounded-full ${active ? 'bg-white/20' : 'bg-gray-100'}`;

  /* ── heading text ── */
  const headingText = (() => {
    if (selectedType !== 'ALL' && selectedCity !== 'ALL') return `Top ${typeLabel} in ${cityName}`;
    if (selectedType !== 'ALL') return `Top ${typeLabel} in India`;
    if (selectedCity !== 'ALL') return `Top Institutions in ${cityName}`;
    return 'Top Institutions in India';
  })();

  return (
    <>
      {/* ── Hero ── */}
      <CityHero
        city={cityMeta[selectedCity] ?? INDIA_META}
        cityName={(cityMeta[selectedCity] ?? INDIA_META).name}
      />

      <section className="py-12 md:py-16 bg-gradient-to-b from-blue-50/50 to-white" id="institutions-browser">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

          {/* ── Section heading ── */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-50 border border-yellow-200 rounded-full text-yellow-700 text-sm font-medium mb-3">
                <Award size={14} /> Top Rated
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540]">{headingText}</h2>
              <p className="text-gray-500 mt-2">Handpicked institutions with highest ratings and placement records</p>
            </div>
          </div>

          {/* ── SEARCH ── */}
          <div className="mb-5">
            <div className="relative max-w-xl">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or course…"
                className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm bg-gray-50 focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* ── INSTITUTION TYPE PILLS ── */}
          <div className="flex overflow-x-auto whitespace-nowrap gap-2 pb-2 mb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" id="institution-type-filter">
            <button onClick={() => handleSelectType('ALL')} className={`${basePill} ${selectedType === 'ALL' ? activePill : inactivePill}`}>
              All Types
              <span className={pillCount(selectedType === 'ALL')}>{typeCounts.ALL}</span>
            </button>
            {institutionTypes.map((t) => (
              <button key={t.value} onClick={() => handleSelectType(t.value)} className={`${basePill} ${selectedType === t.value ? activePill : inactivePill}`}>
                {t.label}
                <span className={pillCount(selectedType === t.value)}>{typeCounts[t.value] ?? 0}</span>
              </button>
            ))}
          </div>

          {/* ── ADVANCED FILTERS (category-specific) ── */}
          {activeFilterConfig.length > 0 && (
            <div className="relative mb-8">
              {openFilterKey && (
                <div className="fixed inset-0 z-[998]" onClick={() => { setOpenFilterKey(null); setDropdownPos(null); }} />
              )}

              {openFilterKey && dropdownPos && (() => {
                const openFilter = activeFilterConfig.find((f) => f.key === openFilterKey);
                if (!openFilter) return null;
                const selectedValue = advancedFilters[openFilter.key];
                return (
                  <div className="fixed z-[999] w-56 bg-white rounded-xl border border-gray-200 shadow-xl p-2" style={{ top: dropdownPos.top, left: dropdownPos.left }}>
                    {getFilterOptions(openFilter.key, openFilter.options).map((option) => (
                      <button
                        key={option}
                        onClick={() => { toggleAdvFilter(openFilter.key, option); setDropdownPos(null); }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${selectedValue === option ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                );
              })()}

              <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {activeFilterConfig.map((filter) => {
                  const selectedValue = advancedFilters[filter.key];
                  const isOpen = openFilterKey === filter.key;
                  return (
                    <div key={filter.key} className="relative flex-shrink-0">
                      <button
                        onClick={(e) => {
                          if (isOpen) { setOpenFilterKey(null); setDropdownPos(null); }
                          else { const rect = e.currentTarget.getBoundingClientRect(); setDropdownPos({ top: rect.bottom + 8, left: rect.left }); setOpenFilterKey(filter.key); }
                        }}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${selectedValue ? 'bg-blue-50 text-blue-700 border-blue-300' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'}`}
                      >
                        {selectedValue ? `${filter.label}: ${selectedValue}` : filter.label}
                        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  );
                })}
                {advFilterCount > 0 && (
                  <button onClick={clearAdvFilters} className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-red-600 hover:text-red-700 flex-shrink-0 cursor-pointer bg-transparent border-0">
                    <X size={14} /> Clear Filters ({advFilterCount})
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ── SORT & LAYOUT BAR ── */}
          {filteredInstitutions.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="text-[#0a2540] font-bold text-lg md:text-xl">
                Found {filteredInstitutions.length}{' '}
                {selectedType === 'ALL' ? 'Institutions' : typeLabel}
                {selectedCity !== 'ALL' && <span className="text-gray-400 font-medium text-base"> in {cityName}</span>}
              </div>

              <div className="flex flex-wrap items-center gap-5 justify-end w-full md:w-auto">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Sort By:</span>
                  <div className="flex items-center gap-3.5 flex-wrap">
                    {[{ value: 'popularity', label: 'Popularity' }, { value: 'rating', label: 'Rating' }, { value: 'fees_high', label: 'Highest Fees' }, { value: 'fees_low', label: 'Lowest Fees' }].map((opt) => (
                      <label key={opt.value} className="flex items-center gap-1.5 cursor-pointer text-xs sm:text-sm text-gray-600 font-semibold select-none hover:text-blue-600 transition-colors">
                        <input type="radio" name="browser-sort" value={opt.value} checked={sortBy === opt.value} onChange={() => setSortBy(opt.value)} className="w-4 h-4 text-blue-600 border-gray-300 accent-blue-600" />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>
                {selectedType !== 'ALL' && (
                  <>
                    <div className="hidden md:block h-6 w-px bg-gray-200" />
                    <label className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 font-semibold">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Show:</span>
                      <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 cursor-pointer"
                      >
                        {PAGE_SIZE_OPTIONS.map((n) => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </label>
                  </>
                )}
                <div className="hidden md:block h-6 w-px bg-gray-200" />
                <div className="flex items-center bg-gray-100 rounded-xl p-1 gap-1">
                  {[{ value: 'table', icon: Table, tooltip: 'Table View' }, { value: 'list', icon: List, tooltip: 'List View' }, { value: 'grid', icon: LayoutGrid, tooltip: 'Grid View' }].map((btn) => (
                    <button key={btn.value} onClick={() => setLayout(btn.value as typeof layout)} title={btn.tooltip} aria-label={btn.tooltip}
                      className={`p-1.5 rounded-lg transition-all cursor-pointer ${layout === btn.value ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      <btn.icon size={16} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── RESULTS ── */}
          {filteredInstitutions.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-gray-500 font-medium">
                No {selectedType === 'ALL' ? 'institutions' : typeLabel.toLowerCase()}
                {selectedCity !== 'ALL' ? ` found in ${cityName}` : ''}
                {advFilterCount > 0 ? ' matching the selected filters' : ''}.
              </p>
              {(selectedCity !== 'ALL' || selectedType !== 'ALL' || advFilterCount > 0 || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCity('ALL');
                    setSelectedType('ALL');
                    clearAdvFilters();
                    setSearchQuery('');
                  }}
                  className="mt-4 text-blue-600 font-semibold text-sm hover:underline"
                >
                  Reset all filters
                </button>
              )}
            </div>

          ) : selectedType === 'ALL' && groupedInstitutions ? (
            /* grouped view */
            <div className="flex flex-col gap-10">
              {groupedInstitutions.map(({ typeValue, label, icon, items, headers }) => (
                <div key={typeValue} id={`group-${typeValue.toLowerCase()}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0a2540] to-[#1a5276] flex items-center justify-center text-xl shadow-md">
                        {icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-[#0a2540]">{label}</h3>
                        <p className="text-xs text-gray-400 font-medium">{items.length} institution{items.length !== 1 ? 's' : ''} found</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleSelectType(typeValue)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline px-3 py-1.5 border border-blue-200 rounded-full bg-blue-50 hover:bg-blue-100 transition-all cursor-pointer"
                    >
                      View All {label} →
                    </button>
                  </div>
                  <InstitutionResults
                    layout={layout}
                    items={items.slice(0, 5)}
                    headers={headers}
                    cityName={cityName}
                    cityState={cityState}
                    savedColleges={savedColleges}
                    checkedCollegesForCompare={checkedCollegesForCompare}
                    onToggleSave={toggleSave}
                    onToggleCompareCheckbox={handleCompareCheckbox}
                    onApply={openActionModal}
                    onCompare={openCompareForCollege}
                    onShowRanking={setSelectedCollegeForRanking}
                  />
                  {items.length > 5 && (
                    <div className="mt-5 flex justify-center">
                      <button
                        onClick={() => handleSelectType(typeValue)}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                      >
                        View All {label} <ArrowRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

          ) : (
            /* single-type view */
            <>
              <InstitutionResults
                layout={layout}
                items={paginatedInstitutions}
                startIndex={pageStart}
                headers={TABLE_HEADER_CONFIG[selectedType] ?? TABLE_HEADER_CONFIG.COLLEGE}
                cityName={cityName}
                cityState={cityState}
                savedColleges={savedColleges}
                checkedCollegesForCompare={checkedCollegesForCompare}
                onToggleSave={toggleSave}
                onToggleCompareCheckbox={handleCompareCheckbox}
                onApply={openActionModal}
                onCompare={openCompareForCollege}
                onShowRanking={setSelectedCollegeForRanking}
              />

              {/* ── Pagination ── */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-semibold text-gray-700">{pageStart + 1}</span>–
                  <span className="font-semibold text-gray-700">{Math.min(pageStart + pageSize, sortedInstitutions.length)}</span>
                  {' '}of <span className="font-semibold text-gray-700">{sortedInstitutions.length}</span>
                </p>

                {totalPages > 1 && (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, safePage - 1))}
                      disabled={safePage === 1}
                      className="px-3 py-2 rounded-lg text-sm font-semibold border border-gray-200 text-gray-600 enabled:hover:border-blue-300 enabled:hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((p) => p === 1 || p === totalPages || Math.abs(p - safePage) <= 1)
                      .reduce<(number | 'gap')[]>((acc, p, idx, arr) => {
                        if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push('gap');
                        acc.push(p);
                        return acc;
                      }, [])
                      .map((p, i) =>
                        p === 'gap' ? (
                          <span key={`gap-${i}`} className="px-2 text-gray-400">…</span>
                        ) : (
                          <button
                            key={p}
                            onClick={() => setCurrentPage(p)}
                            className={`min-w-[2.25rem] px-3 py-2 rounded-lg text-sm font-semibold border transition-colors cursor-pointer ${
                              safePage === p
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                            }`}
                          >
                            {p}
                          </button>
                        )
                      )}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, safePage + 1))}
                      disabled={safePage === totalPages}
                      className="px-3 py-2 rounded-lg text-sm font-semibold border border-gray-200 text-gray-600 enabled:hover:border-blue-300 enabled:hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* ── Modals ── */}
        {selectedCollegeForRanking && (
          <RankingModal college={selectedCollegeForRanking} cityName={cityName} cityState={cityState} onClose={() => setSelectedCollegeForRanking(null)} />
        )}
        <CompareTray
          count={checkedCollegesForCompare.length}
          onCompareNow={() => {
            const sel = topCollegesInCity.filter((c) => checkedCollegesForCompare.includes(c.id));
            setCollegesToCompare(sel); setCompareHighlightSection(null); setIsCompareOpen(true);
          }}
          onClear={() => setCheckedCollegesForCompare([])}
        />
        <CompareModal isOpen={isCompareOpen} onClose={() => setIsCompareOpen(false)} initialColleges={collegesToCompare} allColleges={topCollegesInCity} highlightSection={compareHighlightSection} />
        <ActionModal isOpen={actionModal.isOpen} onClose={closeActionModal} mode={actionModal.mode} institutionName={actionModal.college?.name ?? ''} institutionType={actionModal.college?.institutionType ?? 'DEFAULT'} courses={actionModal.college?.courses} />
        <ScrollToTop />
        <CityStyles />
      </section>
    </>
  );
}
