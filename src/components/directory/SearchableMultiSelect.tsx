"use client";

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, X } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface SearchableMultiSelectProps {
  options: FilterOption[];
  selectedValues: string[];
  onChange: (value: string) => void;
  onClearGroup: () => void;
  placeholder?: string;
}

export default function SearchableMultiSelect({
  options,
  selectedValues,
  onChange,
  onClearGroup,
  placeholder = 'Search options...'
}: SearchableMultiSelectProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Filter options based on search query
  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Default number of visible items
  const INITIAL_VISIBLE_COUNT = 5;
  const showSearch = options.length > 5;

  const visibleOptions = isExpanded
    ? filteredOptions
    : filteredOptions.slice(0, INITIAL_VISIBLE_COUNT);

  return (
    <div className="flex flex-col gap-2">
      {/* Search Input (only shown for large option sets) */}
      {showSearch && (
        <div className="relative mb-1">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-7 py-1 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X size={12} />
            </button>
          )}
        </div>
      )}

      {/* Options List */}
      <div className="flex flex-col gap-1.5 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
        {visibleOptions.length > 0 ? (
          visibleOptions.map((opt) => {
            const isChecked = selectedValues.includes(opt.value);
            return (
              <label
                key={opt.value}
                className="flex items-start gap-2.5 text-xs text-gray-600 hover:text-gray-900 cursor-pointer select-none py-0.5"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onChange(opt.value)}
                  className="mt-0.5 w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                />
                <span className={isChecked ? 'font-semibold text-blue-900' : ''}>
                  {opt.label}
                </span>
              </label>
            );
          })
        ) : (
          <div className="text-xs text-gray-400 italic py-1">No options match</div>
        )}
      </div>

      {/* Footer Controls: Show More / Show Less & Clear Group */}
      <div className="flex items-center justify-between mt-1 text-[11px] font-bold">
        {/* Toggle Expand */}
        {filteredOptions.length > INITIAL_VISIBLE_COUNT && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-0.5 text-blue-600 hover:text-blue-700 cursor-pointer bg-transparent border-0"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp size={12} />
              </>
            ) : (
              <>
                Show More ({filteredOptions.length - INITIAL_VISIBLE_COUNT} more) <ChevronDown size={12} />
              </>
            )}
          </button>
        )}

        {/* Clear Group Trigger */}
        {selectedValues.length > 0 && (
          <button
            type="button"
            onClick={onClearGroup}
            className="text-red-500 hover:text-red-650 ml-auto cursor-pointer bg-transparent border-0"
          >
            Clear Section
          </button>
        )}
      </div>
    </div>
  );
}
