"use client";

import React, { useState } from 'react';
import {
  MapPin, Star, Sparkles, LayoutGrid, List, Check,
  ArrowRight, ShieldCheck, Download, Award, Clock
} from 'lucide-react';
import { DirectoryItem } from '@/data/directoryMockData';
import { globalFiltersConfig, categoryFiltersConfig } from '@/data/filtersConfig';

interface DirectoryListingSectionProps {
  items: DirectoryItem[];
  selectedFilters: Record<string, string[]>;
  onRemoveFilter: (groupId: string, value: string) => void;
  onClearAll: () => void;
  activeCategory: string;
}

export default function DirectoryListingSection({
  items,
  selectedFilters,
  onRemoveFilter,
  onClearAll,
  activeCategory
}: DirectoryListingSectionProps) {
  const [layout, setLayout] = useState<'list' | 'grid'>('list');

  // Flat list of selected filter tags
  const activeChips = Object.entries(selectedFilters).flatMap(([groupId, values]) =>
    values.map(val => ({ groupId, value: val }))
  );

  // Helper to map values back to readable labels
  const getFilterLabel = (groupId: string, value: string) => {
    // Check global filters configuration
    let group = globalFiltersConfig.find(g => g.id === groupId);
    
    // Check category specific filters configuration
    if (!group && categoryFiltersConfig[activeCategory]) {
      group = categoryFiltersConfig[activeCategory].find(g => g.id === groupId);
    }

    const option = group?.options.find(opt => opt.value === value);
    return option ? option.label : value;
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header controls & chips */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
        {/* Upper row: Count and layout switch */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-[#0a2540] tracking-tight">
              {activeCategory} Directory
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Showing {items.length} matched {items.length === 1 ? 'listing' : 'listings'}
            </p>
          </div>

          <div className="flex items-center bg-gray-150 rounded-xl p-1 gap-1 border border-gray-200">
            <button
              onClick={() => setLayout('list')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                layout === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
              title="List View"
            >
              <List size={16} />
            </button>
            <button
              onClick={() => setLayout('grid')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                layout === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
              title="Grid View"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>

        {/* Selected chips row */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-50">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Active:</span>
            {activeChips.map((chip, idx) => (
              <span
                key={`${chip.groupId}-${chip.value}-${idx}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-150 rounded-full text-xs font-semibold"
              >
                <span>{getFilterLabel(chip.groupId, chip.value)}</span>
                <button
                  type="button"
                  onClick={() => onRemoveFilter(chip.groupId, chip.value)}
                  className="text-blue-400 hover:text-blue-600 cursor-pointer font-bold bg-transparent border-0 scale-105"
                >
                  ×
                </button>
              </span>
            ))}
            <button
              onClick={onClearAll}
              className="text-xs font-bold text-red-500 hover:text-red-700 underline cursor-pointer bg-transparent border-0"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Listing results */}
      {items.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 shadow-sm max-w-lg mx-auto w-full">
          <MapPin size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-700">No Listings Found</h3>
          <p className="text-sm text-gray-500 mt-2">
            No entries match the active filter set. Check another combination or clear filters to start fresh.
          </p>
          <button
            onClick={onClearAll}
            className="mt-6 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/10 cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : layout === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Image and status overlays */}
                <div className="relative h-44 rounded-xl overflow-hidden mb-4 border border-gray-100">
                  <img src={item.image} className="w-full h-full object-cover" alt={item.name} loading="lazy" />
                  <div className="absolute top-3 left-3 bg-[#0a2540] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <Star size={11} className="fill-yellow-400 text-yellow-400" />
                    {item.rating} ({item.reviews})
                  </div>
                  {item.premium && (
                    <span className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md animate-pulse">
                      Premium
                    </span>
                  )}
                </div>

                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-semibold text-gray-400 flex items-center gap-1">
                    <MapPin size={12} className="text-red-400" />
                    {item.locality ? `${item.locality.toUpperCase()}, ` : ''}{item.city.toUpperCase()}
                  </span>
                </div>

                <h3 className="font-extrabold text-gray-800 text-base md:text-lg mt-2 leading-snug">
                  {item.name}
                </h3>
                <p className="text-xs text-blue-600/80 font-bold mt-0.5 leading-snug italic">"{item.tagline}"</p>

                {/* Characteristics badges */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {item.verified && (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                      <ShieldCheck size={11} /> Verified
                    </span>
                  )}
                  {item.featured && (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-100">
                      ★ Featured
                    </span>
                  )}
                  {item.openNow && (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-100">
                      <Clock size={11} /> Open
                    </span>
                  )}
                  {item.admissionsOpen && (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100">
                      ✓ Admissions Open
                    </span>
                  )}
                </div>

                {/* Subdetails section */}
                <div className="grid grid-cols-2 gap-4 mt-4 py-3.5 border-t border-b border-gray-50 text-xs">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block">Fees Range</span>
                    <span className="text-sm font-extrabold text-emerald-600 leading-snug">{item.feeLabel}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block">Est. Year</span>
                    <span className="text-sm font-extrabold text-gray-700 leading-snug">{item.estYear}</span>
                  </div>
                </div>

                {/* Attributes Pills */}
                {item.attributes.stream && (
                  <div className="mt-3">
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Streams</span>
                    <div className="flex flex-wrap gap-1">
                      {item.attributes.stream.slice(0, 3).map((st: string) => (
                        <span key={st} className="text-[10px] bg-slate-100 text-gray-600 font-bold px-2 py-0.5 rounded">
                          {st.toUpperCase()}
                        </span>
                      ))}
                      {item.attributes.stream.length > 3 && (
                        <span className="text-[10px] text-gray-400 font-bold self-center">
                          +{item.attributes.stream.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-4 mt-6">
                <button
                  type="button"
                  className="flex-1 py-2 px-4 border border-gray-200 hover:bg-slate-50 text-gray-700 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  Brochure
                  <Download size={13} />
                </button>
                <button
                  type="button"
                  className="flex-1 py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-orange-500/10 cursor-pointer"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // List Layout (Default)
        <div className="flex flex-col gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-5"
            >
              {/* Left Image column */}
              <div className="w-full md:w-56 h-40 flex-shrink-0 rounded-xl overflow-hidden border border-gray-50 relative">
                <img src={item.image} className="w-full h-full object-cover" alt={item.name} loading="lazy" />
                <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-gray-100 flex items-center gap-0.5 shadow-sm">
                  ★ {item.rating}
                </span>
                {item.premium && (
                  <span className="absolute bottom-2.5 right-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                    Premium
                  </span>
                )}
              </div>

              {/* Right Content column */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase">
                      {item.category}
                    </span>
                    <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                      <MapPin size={12} className="text-red-400" />
                      {item.locality ? `${item.locality.toUpperCase()}, ` : ''}{item.city.toUpperCase()}, {item.state.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-gray-800 text-lg md:text-xl mt-2 leading-snug hover:text-blue-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-blue-650/85 font-bold mt-0.5 italic">"{item.tagline}"</p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 font-semibold mt-1">
                    <span>Est. {item.estYear}</span>
                    <span>•</span>
                    <span className="text-blue-600 bg-blue-50/50 px-2 py-0.5 rounded text-[10px]">
                      {item.serviceMode.toUpperCase()} Mode
                    </span>
                    {item.verified && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-600 font-bold">✓ Verified</span>
                      </>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 pt-3 border-t border-gray-50">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block">Fees Range</span>
                      <div className="text-sm font-extrabold text-emerald-600 leading-snug">{item.feeLabel}</div>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block">Service Type</span>
                      <div className="text-sm font-extrabold text-gray-700 leading-snug">{item.pricing.toUpperCase()} Value</div>
                    </div>
                    <div className="hidden md:block">
                      <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block">Languages</span>
                      <div className="text-sm font-extrabold text-gray-700 leading-snug uppercase truncate">
                        {item.languages.join(', ')}
                      </div>
                    </div>
                  </div>

                  {/* Attributes Pills */}
                  {item.attributes.stream && (
                    <div className="mt-4 flex flex-wrap gap-1 items-center">
                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mr-1">Streams:</span>
                      {item.attributes.stream.slice(0, 5).map((st: string) => (
                        <span key={st} className="text-[10px] bg-slate-100 text-gray-600 font-bold px-2 py-0.5 rounded">
                          {st.toUpperCase()}
                        </span>
                      ))}
                      {item.attributes.stream.length > 5 && (
                        <span className="text-[10px] text-gray-400 font-semibold">
                          +{item.attributes.stream.length - 5} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Facilities Pills */}
                  {item.attributes.facilities && (
                    <div className="mt-3 flex flex-wrap gap-1 items-center">
                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mr-1">Facilities:</span>
                      {item.attributes.facilities.slice(0, 4).map((f: string) => (
                        <span key={f} className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded border border-emerald-100">
                          {f.replace(/-/g, ' ')}
                        </span>
                      ))}
                      {item.attributes.facilities.length > 4 && (
                        <span className="text-[10px] text-gray-450 font-semibold">
                          +{item.attributes.facilities.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 mt-6 pt-3.5 border-t border-gray-50">
                  <button
                    type="button"
                    className="py-2 px-5 border border-gray-200 hover:bg-slate-50 text-gray-750 font-bold rounded-xl text-xs transition-all flex items-center gap-1 cursor-pointer"
                  >
                    Brochure
                    <Download size={13} />
                  </button>
                  <button
                    type="button"
                    className="py-2 px-5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-orange-500/10 cursor-pointer"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
