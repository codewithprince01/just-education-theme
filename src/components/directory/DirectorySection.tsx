"use client";

import React, { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { directoryCategories, globalFiltersConfig, categoryFiltersConfig } from '@/data/filtersConfig';
import { directoryMockData, DirectoryItem } from '@/data/directoryMockData';
import DirectoryFilterSidebar from './DirectoryFilterSidebar';
import DirectoryListingSection from './DirectoryListingSection';

export default function DirectorySection() {
  const [activeCategory, setActiveCategory] = useState<string>('Universities');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  // Filter items dynamically based on selection
  const filteredItems = directoryMockData.filter((item: DirectoryItem) => {
    // 1. Always filter by active category
    if (item.category !== activeCategory) return false;

    // 2. Iterate and match selected filters
    for (const [groupId, values] of Object.entries(selectedFilters)) {
      if (!values || values.length === 0) continue;

      if (groupId === 'country') {
        if (!values.includes(item.country)) return false;
      } else if (groupId === 'state') {
        if (!values.includes(item.state)) return false;
      } else if (groupId === 'city') {
        if (!values.includes(item.city)) return false;
      } else if (groupId === 'locality') {
        if (!values.includes(item.locality)) return false;
      } else if (groupId === 'rating') {
        const minRating = parseFloat(values[0]);
        if (item.rating < minRating) return false;
      } else if (groupId === 'verification') {
        // Match if any of the selected conditions are true (OR logic within verification group)
        const match = values.some(val => {
          if (val === 'verified') return item.verified;
          if (val === 'featured') return item.featured;
          if (val === 'premium') return item.premium;
          return false;
        });
        if (!match) return false;
      } else if (groupId === 'availability') {
        const match = values.some(val => {
          if (val === 'open-now') return item.openNow;
          if (val === 'admissions-open') return item.admissionsOpen;
          if (val === 'applications-open') return item.applicationsOpen;
          return false;
        });
        if (!match) return false;
      } else if (groupId === 'service-mode') {
        if (!values.includes(item.serviceMode)) return false;
      } else if (groupId === 'pricing') {
        if (!values.includes(item.pricing)) return false;
      } else if (groupId === 'est-year') {
        const match = values.some(val => {
          if (val === 'before-1980') return item.estYear < 1980;
          if (val === '1980-2000') return item.estYear >= 1980 && item.estYear <= 2000;
          if (val === '2000-2010') return item.estYear >= 2000 && item.estYear <= 2010;
          if (val === 'after-2010') return item.estYear > 2010;
          return false;
        });
        if (!match) return false;
      } else if (groupId === 'languages') {
        const match = values.some(val => item.languages.includes(val));
        if (!match) return false;
      } else if (groupId === 'gender-accepted') {
        if (!values.includes(item.genderAccepted)) return false;
      } else {
        // Category-specific attributes filtering
        const attr = item.attributes?.[groupId];
        if (attr === undefined || attr === null) return false;

        if (Array.isArray(attr)) {
          const match = values.some(val => attr.includes(val));
          if (!match) return false;
        } else if (typeof attr === 'string') {
          if (!values.includes(attr)) return false;
        } else if (typeof attr === 'boolean') {
          if (!attr) return false;
        } else {
          return false;
        }
      }
    }

    return true;
  });

  // Keep global filters and clear category-specific ones on category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSelectedFilters(prev => {
      const next: Record<string, string[]> = {};
      for (const [key, val] of Object.entries(prev)) {
        if (globalFiltersConfig.some(gf => gf.id === key)) {
          next[key] = val;
        }
      }
      return next;
    });
  };

  const handleFilterChange = (groupId: string, value: string) => {
    setSelectedFilters(prev => {
      const current = prev[groupId] || [];
      let next: string[];

      const isRadio = globalFiltersConfig.find(g => g.id === groupId)?.type === 'radio' ||
                      categoryFiltersConfig[activeCategory]?.find(g => g.id === groupId)?.type === 'radio';

      if (isRadio) {
        next = current.includes(value) ? [] : [value];
      } else {
        next = current.includes(value) ? current.filter(x => x !== value) : [...current, value];
      }

      const updated = { ...prev };
      if (next.length === 0) {
        delete updated[groupId];
      } else {
        updated[groupId] = next;
      }
      return updated;
    });
  };

  const handleClearGroup = (groupId: string) => {
    setSelectedFilters(prev => {
      const next = { ...prev };
      delete next[groupId];
      return next;
    });
  };

  const handleRemoveFilter = (groupId: string, value: string) => {
    setSelectedFilters(prev => {
      const next = { ...prev };
      if (next[groupId]) {
        next[groupId] = next[groupId].filter(v => v !== value);
        if (next[groupId].length === 0) {
          delete next[groupId];
        }
      }
      return next;
    });
  };

  const handleClearAll = () => {
    setSelectedFilters({});
  };

  const totalActiveFilters = Object.values(selectedFilters).flatMap(x => x).length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16">
      {/* Title block */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-[#0B3C5D] tracking-tight">
          Explore Education Directory
        </h2>
        <p className="text-gray-500 mt-2.5 max-w-xl mx-auto text-sm">
          Select a category and apply filters to find top universities, schools, coaching centers, libraries, and hostels.
        </p>
      </div>

      {/* Category selector (horizontal scrollable bar, no icons) */}
      <div className="w-full mb-8 relative">
        <div className="flex items-center gap-2 overflow-x-auto pb-3.5 pt-1 px-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          {directoryCategories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                    : 'bg-white text-gray-600 hover:text-gray-900 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
        {/* Subtle gradients to indicate scrollability */}
        <div className="absolute right-0 top-0 bottom-3 w-10 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none md:hidden" />
      </div>

      {/* Mobile filter controls bar */}
      <div className="lg:hidden flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 mb-6 shadow-sm">
        <div className="text-xs font-semibold text-gray-500">
          Showing <span className="text-[#0B3C5D] font-extrabold">{filteredItems.length}</span> results for <span className="font-extrabold">{activeCategory}</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#0B3C5D] hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-900/10 cursor-pointer"
        >
          <SlidersHorizontal size={14} />
          Filters {totalActiveFilters > 0 && `(${totalActiveFilters})`}
        </button>
      </div>

      {/* Main filter directory grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar - Desktop only */}
        <div className="hidden lg:block lg:col-span-3">
          <DirectoryFilterSidebar
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClearGroup={handleClearGroup}
            onClearAll={handleClearAll}
            totalFilteredCount={filteredItems.length}
          />
        </div>

        {/* Right Listings view */}
        <div className="col-span-1 lg:col-span-9">
          <DirectoryListingSection
            items={filteredItems}
            selectedFilters={selectedFilters}
            onRemoveFilter={handleRemoveFilter}
            onClearAll={handleClearAll}
            activeCategory={activeCategory}
          />
        </div>
      </div>

      {/* Responsive Drawer Overlay for Mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn duration-200">
          {/* Blur Backdrop */}
          <div
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity cursor-pointer"
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slideLeft duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-150">
              <div>
                <h3 className="font-extrabold text-[#0B3C5D] text-sm uppercase tracking-wider">Filters</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">{filteredItems.length} matches found</p>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Sidebar content */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <DirectoryFilterSidebar
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                onClearGroup={handleClearGroup}
                onClearAll={handleClearAll}
                totalFilteredCount={filteredItems.length}
              />
            </div>

            {/* Footer with Apply button */}
            <div className="p-4 border-t border-gray-150 bg-white flex items-center justify-between gap-4">
              {totalActiveFilters > 0 && (
                <button
                  onClick={() => {
                    handleClearAll();
                  }}
                  className="px-4 py-2.5 text-xs font-bold text-red-500 hover:text-red-700 underline cursor-pointer"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setMobileOpen(false)}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-extrabold rounded-xl text-xs text-center transition-all shadow-md shadow-blue-500/15 cursor-pointer"
              >
                Apply & Close {totalActiveFilters > 0 && `(${totalActiveFilters})`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
