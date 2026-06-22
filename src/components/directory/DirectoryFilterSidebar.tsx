"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Eye, Star, Award, Layers, ShieldCheck, CheckSquare } from 'lucide-react';
import {
  directoryCategories,
  globalFiltersConfig,
  categoryFiltersConfig,
  FilterGroup
} from '@/data/filtersConfig';
import SearchableMultiSelect from './SearchableMultiSelect';

interface DirectoryFilterSidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  selectedFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, value: string) => void;
  onClearGroup: (groupId: string) => void;
  onClearAll: () => void;
  totalFilteredCount: number;
}

export default function DirectoryFilterSidebar({
  activeCategory,
  onCategoryChange,
  selectedFilters,
  onFilterChange,
  onClearGroup,
  onClearAll,
  totalFilteredCount
}: DirectoryFilterSidebarProps) {
  // Store open states for filter accordions (default open specific groups)
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    new Set(['country', 'rating', 'stream', 'school-board', 'coaching-exams'])
  );

  const toggleGroup = (id: string) => {
    setOpenGroups(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Universities': return '🎓';
      case 'Colleges': return '🏛️';
      case 'Schools': return '🏫';
      case 'Libraries': return '📚';
      case 'Coaching Centers': return '✏️';
      case 'Training Centers': return '🛠️';
      case 'Consultants': return '🧭';
      case 'Research Centers': return '🔬';
      case 'Scholarship Providers': return '🎗️';
      case 'Hostels': return '🏠';
      default: return '📁';
    }
  };

  // Get active filters count for the category
  const totalActiveFilters = Object.values(selectedFilters).flatMap(x => x).length;

  const renderFilterGroup = (group: FilterGroup) => {
    const isOpen = openGroups.has(group.id);
    const selectedValues = selectedFilters[group.id] || [];
    const activeInGroupCount = selectedValues.length;

    return (
      <div key={group.id} className="border-b border-gray-100 last:border-0 py-3.5 px-4 transition-all hover:bg-slate-50/20">
        {/* Group Header (Accordion Toggle) */}
        <button
          type="button"
          onClick={() => toggleGroup(group.id)}
          className="w-full flex items-center justify-between font-bold text-gray-800 text-[13px] tracking-wide hover:text-blue-600 transition-colors text-left cursor-pointer"
        >
          <span className="flex items-center gap-2">
            {group.title}
            {activeInGroupCount > 0 && (
              <span className="text-[10px] bg-blue-50 text-blue-600 font-extrabold px-1.5 py-0.5 rounded-full">
                {activeInGroupCount}
              </span>
            )}
          </span>
          {isOpen ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
        </button>

        {/* Group Content */}
        {isOpen && (
          <div className="mt-3.5 animate-fadeIn duration-200">
            {group.type === 'searchable-select' ? (
              <SearchableMultiSelect
                options={group.options}
                selectedValues={selectedValues}
                onChange={(value) => onFilterChange(group.id, value)}
                onClearGroup={() => onClearGroup(group.id)}
                placeholder={group.placeholder}
              />
            ) : group.type === 'radio' ? (
              <div className="flex flex-col gap-2">
                {group.options.map(opt => {
                  const isChecked = selectedValues.includes(opt.value);
                  return (
                    <label key={opt.value} className="flex items-center gap-2.5 text-xs text-gray-600 hover:text-gray-900 cursor-pointer select-none">
                      <input
                        type="radio"
                        name={group.id}
                        checked={isChecked}
                        onChange={() => onFilterChange(group.id, opt.value)}
                        className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer accent-blue-600"
                      />
                      <span className={isChecked ? 'font-semibold text-blue-900' : ''}>
                        {opt.label}
                      </span>
                    </label>
                  );
                })}
                {selectedValues.length > 0 && (
                  <button
                    type="button"
                    onClick={() => onClearGroup(group.id)}
                    className="text-[10px] font-bold text-red-500 hover:text-red-700 mt-1 cursor-pointer bg-transparent border-0 self-end"
                  >
                    Clear Section
                  </button>
                )}
              </div>
            ) : (
              // Standard Checkboxes
              <div className="flex flex-col gap-2">
                {group.options.map(opt => {
                  const isChecked = selectedValues.includes(opt.value);
                  return (
                    <label key={opt.value} className="flex items-start gap-2.5 text-xs text-gray-600 hover:text-gray-900 cursor-pointer select-none py-0.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onFilterChange(group.id, opt.value)}
                        className="mt-0.5 w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                      />
                      <span className={isChecked ? 'font-semibold text-blue-900' : ''}>
                        {opt.label}
                      </span>
                    </label>
                  );
                })}
                {selectedValues.length > 0 && (
                  <button
                    type="button"
                    onClick={() => onClearGroup(group.id)}
                    className="text-[10px] font-bold text-red-500 hover:text-red-700 mt-1 cursor-pointer bg-transparent border-0 self-end"
                  >
                    Clear Section
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const specificFilters = categoryFiltersConfig[activeCategory] || [];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col overflow-hidden max-h-[85vh] sticky top-24">
      {/* Sidebar Header */}
      <div className="bg-gradient-to-r from-[#0a2540] to-[#1a5276] text-white p-4 flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-sm uppercase tracking-wider">Filters</h3>
          <p className="text-[10px] text-blue-100 mt-0.5">Found {totalFilteredCount} matching listings</p>
        </div>
        {totalActiveFilters > 0 && (
          <button
            onClick={onClearAll}
            className="text-[10px] font-bold bg-white/10 hover:bg-white/20 text-white rounded-lg px-2.5 py-1 transition-all border border-white/10 cursor-pointer"
          >
            Clear All ({totalActiveFilters})
          </button>
        )}
      </div>

      {/* Accordion container */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-100 scrollbar-thin">
        {/* ─── CATEGORY SELECTOR SECTION ─── */}
        <div className="p-4">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-3">Primary Category</span>
          <div className="grid grid-cols-1 gap-1">
            {directoryCategories.map(cat => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-650 text-white shadow-md shadow-blue-500/20'
                      : 'hover:bg-gray-100 text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-sm">{getCategoryIcon(cat)}</span>
                    {cat}
                  </span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white block animate-ping" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── CATEGORY-SPECIFIC FILTERS ─── */}
        {specificFilters.length > 0 && (
          <div>
            <div className="bg-slate-50/70 py-1.5 px-4 text-[9px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
              {activeCategory} Filters
            </div>
            {specificFilters.map(renderFilterGroup)}
          </div>
        )}

        {/* ─── GLOBAL FILTERS ─── */}
        <div>
          <div className="bg-slate-50/70 py-1.5 px-4 text-[9px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
            Global Filters
          </div>
          {globalFiltersConfig.map(renderFilterGroup)}
        </div>
      </div>
    </div>
  );
}
