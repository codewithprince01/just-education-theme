"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ChevronDown, ArrowRight, Award, X, List, LayoutGrid, Table
} from 'lucide-react';
import {
  cityMeta,
  topCollegesInCity,
  institutionTypes,
  institutionFilterConfig,
  CollegeInCity
} from '@/data/cityData';
import CompareModal from '@/components/shared/CompareModal';
import ActionModal, { ActionModalMode } from '@/components/shared/ActionModal';
import { TABLE_HEADER_CONFIG, getMinFee, getMaxFee } from '@/components/city/cityHelpers';
import CityHero from '@/components/city/CityHero';
import CitySearchBar from '@/components/city/CitySearchBar';
import InstitutionResults from '@/components/city/InstitutionResults';
import PopularAreas from '@/components/city/PopularAreas';
import CityMap from '@/components/city/CityMap';
import RankingModal from '@/components/city/RankingModal';
import CompareTray from '@/components/city/CompareTray';
import ScrollToTop from '@/components/city/ScrollToTop';
import CityStyles from '@/components/city/CityStyles';

/* ─── Main CityPageClient Component ─── */
interface CityPageClientProps {
  citySlug: string;
}

export default function CityPageClient({ citySlug }: CityPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [savedColleges, setSavedColleges] = useState<number[]>([]);
  const [selectedInstitutionType, setSelectedInstitutionType] = useState('ALL');
  const [advancedFilters, setAdvancedFilters] = useState<Record<string, string | null>>({});
  const [openFilterKey, setOpenFilterKey] = useState<string | null>(null);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number } | null>(null);
  const [sortBy, setSortBy] = useState('popularity');
  const [layout, setLayout] = useState<'table' | 'list' | 'grid'>('table');

  // Comparison Portal states
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [collegesToCompare, setCollegesToCompare] = useState<CollegeInCity[]>([]);
  const [compareHighlightSection, setCompareHighlightSection] = useState<'fees' | 'placement' | 'rating' | 'ranking' | null>(null);
  const [checkedCollegesForCompare, setCheckedCollegesForCompare] = useState<number[]>([]);

  // Action Modal (Apply / Brochure)
  const [actionModal, setActionModal] = useState<{
    isOpen: boolean;
    mode: ActionModalMode;
    college: CollegeInCity | null;
  }>({ isOpen: false, mode: 'apply', college: null });

  const openActionModal = (college: CollegeInCity, mode: ActionModalMode) => {
    setActionModal({ isOpen: true, mode, college });
  };
  const closeActionModal = () => {
    setActionModal((prev) => ({ ...prev, isOpen: false }));
  };

  const openCompareForCollege = (college: CollegeInCity, highlight: 'fees' | 'placement' | 'rating' | 'ranking' | null) => {
    const peers = topCollegesInCity.filter(
      (c) => c.institutionType === college.institutionType && c.id !== college.id
    );
    const initialList = [college, ...peers.slice(0, 2)];
    setCollegesToCompare(initialList);
    setCompareHighlightSection(highlight);
    setIsCompareOpen(true);
  };

  const handleCompareCheckboxChange = (college: CollegeInCity) => {
    setCheckedCollegesForCompare((prev) => {
      if (prev.includes(college.id)) {
        return prev.filter((id) => id !== college.id);
      } else {
        const firstCheckedId = prev[0];
        if (firstCheckedId !== undefined) {
          const firstChecked = topCollegesInCity.find((c) => c.id === firstCheckedId);
          if (firstChecked && firstChecked.institutionType !== college.institutionType) {
            alert(`You can only compare institutions of the same type (e.g. comparing ${firstChecked.institutionType.toLowerCase()}s).`);
            return prev;
          }
        }
        if (prev.length >= 3) {
          alert("You can select up to 3 institutions to compare.");
          return prev;
        }
        return [...prev, college.id];
      }
    });
  };

  // Default to Pune if not found
  const city = cityMeta[citySlug] || cityMeta.pune;
  const cityName = city.name;

  const [selectedCollegeForRanking, setSelectedCollegeForRanking] = useState<CollegeInCity | null>(null);

  // Counts per institution type, computed from the live listing (used by the filter bar below)
  const institutionTypeCounts = useMemo(() => {
    return institutionTypes.reduce<Record<string, number>>((acc, t) => {
      acc[t.value] = topCollegesInCity.filter(item => item.institutionType === t.value).length;
      return acc;
    }, {});
  }, []);

  const byInstitutionType = useMemo(() => {
    return selectedInstitutionType === 'ALL'
      ? topCollegesInCity
      : topCollegesInCity.filter(item => item.institutionType === selectedInstitutionType);
  }, [selectedInstitutionType]);

  // Return the predefined options for the filter, augmented with any extra
  // values found in the live data that aren't already in the list.
  const getFilterOptions = (filterKey: string, defaultOptions: string[]) => {
    if (defaultOptions.length > 0) {
      // Always start with the full predefined list so every dropdown has content.
      const extras: string[] = [];
      byInstitutionType.forEach((item) => {
        const val = item[filterKey as keyof CollegeInCity];
        if (Array.isArray(val)) {
          val.forEach((v) => {
            if (v && !defaultOptions.includes(v)) extras.push(v);
          });
        } else if (typeof val === 'string' && val && !defaultOptions.includes(val)) {
          extras.push(val);
        }
      });
      return [...defaultOptions, ...Array.from(new Set(extras)).sort()];
    }
    // No predefined options – fall back to data-extracted values
    const uniqueValues = new Set<string>();
    byInstitutionType.forEach((item) => {
      const val = item[filterKey as keyof CollegeInCity];
      if (Array.isArray(val)) {
        val.forEach((v) => { if (v) uniqueValues.add(v); });
      } else if (typeof val === 'string' && val) {
        uniqueValues.add(val);
      }
    });
    return Array.from(uniqueValues).sort();
  };

  // The advanced filter set is type-specific: a College gets Degree/Program Type/
  // Entrance Exam, a School gets Board/Medium, a Library gets Library Type/Timing, etc.
  const activeFilterConfig = institutionFilterConfig[selectedInstitutionType] || [];

  const matchesAdvancedFilter = (item: CollegeInCity, key: string, value: string) => {
    const fieldValue = item[key as keyof CollegeInCity];
    if (Array.isArray(fieldValue)) {
      return fieldValue.includes(value);
    }
    return fieldValue === value;
  };

  const filteredInstitutions = useMemo(() => {
    return byInstitutionType.filter(item => {
      // 1. Filter by Search Query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCourse = item.courses && item.courses.some(course => course.toLowerCase().includes(query));
        if (!matchesName && !matchesCourse) return false;
      }

      // 2. Filter by Stream Tab
      if (activeTab !== 'all') {
        const matchesStream = item.courses && item.courses.some(course => course.toLowerCase() === activeTab.toLowerCase());
        if (!matchesStream) return false;
      }

      // 3. Filter by Advanced Filters
      return Object.entries(advancedFilters).every(([key, value]) => !value || matchesAdvancedFilter(item, key, value));
    });
  }, [byInstitutionType, searchQuery, activeTab, advancedFilters]);

  const sortedInstitutions = useMemo(() => {
    return [...filteredInstitutions].sort((a, b) => {
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
      // default: popularity / default order
      return 0;
    });
  }, [filteredInstitutions, sortBy]);

  // When showing ALL, group by institutionType in the canonical order
  const groupedInstitutions = useMemo(() => {
    if (selectedInstitutionType !== 'ALL') return null;
    const order = institutionTypes.map(t => t.value);
    const map: Record<string, CollegeInCity[]> = {};
    sortedInstitutions.forEach(item => {
      (map[item.institutionType] = map[item.institutionType] || []).push(item);
    });
    return order.filter(key => map[key]?.length > 0).map(key => ({
      typeValue: key,
      label: institutionTypes.find(t => t.value === key)?.label || key,
      icon: institutionTypes.find(t => t.value === key)?.icon || '🏫',
      items: map[key],
      headers: TABLE_HEADER_CONFIG[key] || TABLE_HEADER_CONFIG['ALL'],
    }));
  }, [sortedInstitutions, selectedInstitutionType]);

  const handleSelectInstitutionType = (value: string) => {
    setSelectedInstitutionType(value);
    setAdvancedFilters({});
    setOpenFilterKey(null);
  };

  const toggleAdvancedFilter = (key: string, value: string) => {
    setAdvancedFilters(prev => ({ ...prev, [key]: prev[key] === value ? null : value }));
    setOpenFilterKey(null);
  };

  const clearAdvancedFilters = () => setAdvancedFilters({});

  const activeAdvancedFilterCount = Object.values(advancedFilters).filter(Boolean).length;

  const selectedInstitutionLabel = institutionTypes.find(t => t.value === selectedInstitutionType)?.label;

  const toggleSave = (id: number) => {
    setSavedColleges(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-16" id="city-page">
      {/* ───── HERO SECTION ───── */}
      <CityHero city={city} cityName={cityName} />

      {/* ───── HORIZONTAL SEARCH BAR ───── */}
      <CitySearchBar
        cityName={cityName}
        citySlug={citySlug}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* ───── TOP COLLEGES SECTION ───── */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-blue-50/50 to-white" id="top-colleges">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-50 border border-yellow-200 rounded-full text-yellow-700 text-sm font-medium mb-3">
                <Award size={14} />
                <span>Top Rated</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540]">
                {selectedInstitutionType === 'ALL' ? `Top Institutions in ${cityName}` : `Top ${selectedInstitutionLabel} in ${cityName}`}
              </h2>
              <p className="text-gray-500 mt-2">Handpicked institutions with highest ratings and placement records</p>
            </div>
            <Link
              href={`/city/${citySlug || 'pune'}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-600/25 group"
            >
              View All Institutions
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Institution Type Filter Bar */}
          <div className="flex overflow-x-auto whitespace-nowrap gap-2 pb-2 mb-4 scrollbar-hide" id="institution-type-filter">
            <button
              onClick={() => handleSelectInstitutionType('ALL')}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer ${
                selectedInstitutionType === 'ALL'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              All
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${selectedInstitutionType === 'ALL' ? 'bg-white/20' : 'bg-gray-100'}`}>
                {topCollegesInCity.length}
              </span>
            </button>
            {institutionTypes.map((t) => (
              <button
                key={t.value}
                onClick={() => handleSelectInstitutionType(t.value)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer ${
                  selectedInstitutionType === t.value
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                {t.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${selectedInstitutionType === t.value ? 'bg-white/20' : 'bg-gray-100'}`}>
                  {institutionTypeCounts[t.value] || 0}
                </span>
              </button>
            ))}
          </div>

          {/* Advanced Filters */}
          {activeFilterConfig.length > 0 && (
            <div className="relative mb-8" id="advanced-filter-bar">
              {/* Backdrop to close dropdown */}
              {openFilterKey && (
                <div
                  className="fixed inset-0 z-[998]"
                  onClick={() => { setOpenFilterKey(null); setDropdownPos(null); }}
                />
              )}

              {/* Fixed-position dropdown — rendered OUTSIDE the overflow-x scroll container
                  so it is never clipped by overflow-y:auto that overflow-x:auto implies */}
              {openFilterKey && dropdownPos && (() => {
                const openFilter = activeFilterConfig.find(f => f.key === openFilterKey);
                if (!openFilter) return null;
                const selectedValue = advancedFilters[openFilter.key];
                return (
                  <div
                    className="fixed z-[999] w-56 bg-white rounded-xl border border-gray-200 shadow-xl p-2"
                    style={{ top: dropdownPos.top, left: dropdownPos.left }}
                  >
                    {getFilterOptions(openFilter.key, openFilter.options).map((option) => (
                      <button
                        key={option}
                        onClick={() => { toggleAdvancedFilter(openFilter.key, option); setOpenFilterKey(null); setDropdownPos(null); }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                          selectedValue === option
                            ? 'bg-blue-50 text-blue-700 font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                );
              })()}

              {/* Horizontally scrollable pill row — overflow-x:auto is here but the
                  dropdown is NOT rendered inside, so clipping doesn't matter */}
              <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1 scrollbar-hide">
                {activeFilterConfig.map((filter) => {
                  const selectedValue = advancedFilters[filter.key];
                  const isOpen = openFilterKey === filter.key;
                  return (
                    <div key={filter.key} className="relative flex-shrink-0">
                      <button
                        onClick={(e) => {
                          if (isOpen) {
                            setOpenFilterKey(null);
                            setDropdownPos(null);
                          } else {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setDropdownPos({ top: rect.bottom + 8, left: rect.left });
                            setOpenFilterKey(filter.key);
                          }
                        }}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
                          selectedValue
                            ? 'bg-blue-50 text-blue-700 border-blue-300'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                        }`}
                      >
                        {selectedValue ? `${filter.label}: ${selectedValue}` : filter.label}
                        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  );
                })}
                {activeAdvancedFilterCount > 0 && (
                  <button
                    onClick={clearAdvancedFilters}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-red-600 hover:text-red-700 flex-shrink-0 cursor-pointer bg-transparent border-0"
                  >
                    <X size={14} />
                    Clear Filters ({activeAdvancedFilterCount})
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Sort & Layout Bar */}
          {filteredInstitutions.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
              {/* Left: Results Count */}
              <div className="text-[#0a2540] font-bold text-lg md:text-xl">
                Found {filteredInstitutions.length} {selectedInstitutionLabel || 'Institutions'}
              </div>

              {/* Right: Sort options & Layout view switches */}
              <div className="flex flex-wrap items-center gap-5 justify-end w-full md:w-auto">
                {/* Sort selector */}
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Sort By:</span>
                  <div className="flex items-center gap-3.5 flex-wrap">
                    {[
                      { value: 'popularity', label: 'Popularity' },
                      { value: 'rating', label: 'Rating' },
                      { value: 'fees_high', label: 'Highest Fees' },
                      { value: 'fees_low', label: 'Lowest Fees' },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-1.5 cursor-pointer text-xs sm:text-sm text-gray-600 font-semibold select-none hover:text-blue-600 transition-colors"
                      >
                        <input
                          type="radio"
                          name="sortBy"
                          value={option.value}
                          checked={sortBy === option.value}
                          onChange={() => setSortBy(option.value)}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 accent-blue-600"
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Vertical separator */}
                <div className="hidden md:block h-6 w-px bg-gray-200"></div>

                {/* Layout Switches */}
                <div className="flex items-center bg-gray-100 rounded-xl p-1 gap-1">
                  {[
                    { value: 'table', icon: Table, tooltip: 'Table View' },
                    { value: 'list', icon: List, tooltip: 'List View' },
                    { value: 'grid', icon: LayoutGrid, tooltip: 'Grid View' },
                  ].map((btn) => (
                    <button
                      key={btn.value}
                      onClick={() => setLayout(btn.value as 'table' | 'list' | 'grid')}
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

          {filteredInstitutions.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
              <p className="text-gray-500">
                No {selectedInstitutionLabel?.toLowerCase() || 'institutions'}
                {activeAdvancedFilterCount > 0 ? ' match the selected filters' : ''} found in {cityName} yet.
              </p>
            </div>
          ) : selectedInstitutionType === 'ALL' && groupedInstitutions ? (
            /* ── ALL view: separate section per category ── */
            <div className="flex flex-col gap-10">
              {groupedInstitutions.map(({ typeValue, label, icon, items, headers }) => (
                <div key={typeValue} id={`group-${typeValue.toLowerCase()}`}>
                  {/* Category Section Header */}
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
                      onClick={() => handleSelectInstitutionType(typeValue)}
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
                    cityState={city.state}
                    savedColleges={savedColleges}
                    checkedCollegesForCompare={checkedCollegesForCompare}
                    onToggleSave={toggleSave}
                    onToggleCompareCheckbox={handleCompareCheckboxChange}
                    onApply={openActionModal}
                    onCompare={openCompareForCollege}
                    onShowRanking={setSelectedCollegeForRanking}
                  />

                  {items.length > 5 && (
                    <div className="mt-5 flex justify-center">
                      <button
                        onClick={() => handleSelectInstitutionType(typeValue)}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-150 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer hover:shadow-sm"
                      >
                        View All {label}
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* ── Single-category view (re-uses layout) ── */
            <InstitutionResults
              layout={layout}
              items={sortedInstitutions}
              headers={TABLE_HEADER_CONFIG[selectedInstitutionType] || TABLE_HEADER_CONFIG.COLLEGE}
              cityName={cityName}
              cityState={city.state}
              savedColleges={savedColleges}
              checkedCollegesForCompare={checkedCollegesForCompare}
              onToggleSave={toggleSave}
              onToggleCompareCheckbox={handleCompareCheckboxChange}
              onApply={openActionModal}
              onCompare={openCompareForCollege}
              onShowRanking={setSelectedCollegeForRanking}
            />
          )}
        </div>
      </section>

      {/* ───── POPULAR AREAS / LOCALITIES ───── */}
      <PopularAreas cityName={cityName} citySlug={citySlug} />

      {/* ───── MAP EMBED / LOCATION SECTION ───── */}
      <CityMap city={city} cityName={cityName} />

      {/* Ranking Details Modal */}
      {selectedCollegeForRanking && (
        <RankingModal
          college={selectedCollegeForRanking}
          cityName={cityName}
          cityState={city.state}
          onClose={() => setSelectedCollegeForRanking(null)}
        />
      )}

      {/* Floating compare tray */}
      <CompareTray
        count={checkedCollegesForCompare.length}
        onCompareNow={() => {
          const selected = topCollegesInCity.filter(c => checkedCollegesForCompare.includes(c.id));
          setCollegesToCompare(selected);
          setCompareHighlightSection(null);
          setIsCompareOpen(true);
        }}
        onClear={() => setCheckedCollegesForCompare([])}
      />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        initialColleges={collegesToCompare}
        allColleges={topCollegesInCity}
        highlightSection={compareHighlightSection}
      />

      <ActionModal
        isOpen={actionModal.isOpen}
        onClose={closeActionModal}
        mode={actionModal.mode}
        institutionName={actionModal.college?.name || ''}
        institutionType={actionModal.college?.institutionType || 'DEFAULT'}
        courses={actionModal.college?.courses}
      />

      <ScrollToTop />

      {/* Custom inline animations & styles compatibility */}
      <CityStyles />
    </div>
  );
}
