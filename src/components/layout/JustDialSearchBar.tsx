"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MapPin, Search, X } from 'lucide-react';
import { mockCities, mockListings, mockCategories } from '@/data/searchMockData';

interface SearchBarProps {
  isCompact?: boolean;
}

interface SuggestionItem {
  type: 'category' | 'listing' | 'tag';
  value: string;
}

const JustDialSearchBar = ({ isCompact = false }: SearchBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Search state variables
  const [locationQuery, setLocationQuery] = useState(searchParams.get('loc') || '');
  const [keywordQuery, setKeywordQuery] = useState(searchParams.get('q') || '');

  // Dropdown visibility states
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showKeywordDropdown, setShowKeywordDropdown] = useState(false);

  // Refs for tracking click outside
  const locationRef = useRef<HTMLDivElement>(null);
  const keywordRef = useRef<HTMLDivElement>(null);

  // Sync state with URL params
  useEffect(() => {
    setLocationQuery(searchParams.get('loc') || '');
    setKeywordQuery(searchParams.get('q') || '');
  }, [searchParams]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setShowLocationDropdown(false);
      }
      if (keywordRef.current && !keywordRef.current.contains(e.target as Node)) {
        setShowKeywordDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Filter location options based on input
  const filteredCities = mockCities.filter((city) =>
    city.toLowerCase().includes(locationQuery.toLowerCase())
  );

  // Filter keyword suggestions (categories, listings names, and listing tags) based on input
  const getKeywordSuggestions = (): SuggestionItem[] => {
    if (!keywordQuery) {
      // Default initial suggestions when field is empty
      return [
        ...mockCategories.map((c) => ({ type: 'category' as const, value: c })),
        ...mockListings.slice(0, 3).map((l) => ({ type: 'listing' as const, value: l.name }))
      ];
    }

    const query = keywordQuery.toLowerCase();
    const list: SuggestionItem[] = [];

    // Match categories
    mockCategories.forEach((c) => {
      if (c.toLowerCase().includes(query)) {
        list.push({ type: 'category', value: c });
      }
    });

    // Match listing names
    mockListings.forEach((l) => {
      if (l.name.toLowerCase().includes(query) && !list.some((item) => item.value === l.name)) {
        list.push({ type: 'listing', value: l.name });
      }
    });

    // Match tags
    const matchedTags = new Set<string>();
    mockListings.forEach((l) => {
      l.tags.forEach((t) => {
        if (t.toLowerCase().includes(query)) {
          matchedTags.add(t);
        }
      });
    });
    matchedTags.forEach((t) => {
      list.push({ type: 'tag', value: t });
    });

    return list.slice(0, 8); // Cap suggestions at 8
  };

  const keywordSuggestions = getKeywordSuggestions();

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setShowLocationDropdown(false);
    setShowKeywordDropdown(false);

    const params = new URLSearchParams();
    if (keywordQuery.trim()) params.set('q', keywordQuery.trim());
    if (locationQuery.trim()) params.set('loc', locationQuery.trim());

    router.push(`/search?${params.toString()}`);
  };

  const handleSelectLocation = (city: string) => {
    setLocationQuery(city);
    setShowLocationDropdown(false);
    
    // Auto-focus keyword query input
    if (keywordRef.current) {
      const input = keywordRef.current.querySelector('input');
      if (input) input.focus();
    }
  };

  const handleSelectKeyword = (value: string) => {
    setKeywordQuery(value);
    setShowKeywordDropdown(false);
    
    // Instantly trigger search redirection
    const params = new URLSearchParams();
    if (value.trim()) params.set('q', value.trim());
    if (locationQuery.trim()) params.set('loc', locationQuery.trim());
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto z-50 relative">
      <form
        onSubmit={handleSearchSubmit}
        className={`flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-visible border border-gray-100 ${
          isCompact ? 'p-1 gap-1' : 'p-2 gap-2'
        }`}
      >
        {/* Left: Location Input Section */}
        <div
          ref={locationRef}
          className="relative flex-1 flex items-center min-w-[200px]"
        >
          <div className="pl-3 text-red-500 flex-shrink-0">
            <MapPin size={isCompact ? 18 : 20} className="fill-red-100" />
          </div>
          <input
            suppressHydrationWarning={true}
            type="text"
            placeholder="Search location (e.g. Pune, Mumbai)..."
            value={locationQuery}
            onChange={(e) => {
              setLocationQuery(e.target.value);
              setShowLocationDropdown(true);
            }}
            onFocus={() => setShowLocationDropdown(true)}
            className={`w-full pl-2 pr-6 bg-transparent text-gray-700 outline-none placeholder-gray-400 font-medium ${
              isCompact ? 'py-1.5 text-xs' : 'py-3 text-sm'
            }`}
          />
          {locationQuery && (
            <button
              type="button"
              onClick={() => setLocationQuery('')}
              className="absolute right-2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X size={14} />
            </button>
          )}

          {/* Location Autocomplete Dropdown */}
          {showLocationDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 max-h-[300px] overflow-y-auto">
              <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Select City
              </div>
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => handleSelectLocation(city)}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-gray-700 hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <MapPin size={12} className="text-gray-400" />
                    {city}
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-xs text-gray-500 italic">
                  No cities found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Divider for Desktop */}
        <div className="hidden md:block w-px bg-gray-200 self-stretch my-2"></div>

        {/* Right: Keyword Input Section */}
        <div
          ref={keywordRef}
          className="relative flex-[2] flex items-center"
        >
          <div className="pl-3 text-blue-600 flex-shrink-0">
            <Search size={isCompact ? 18 : 20} />
          </div>
          <input
            suppressHydrationWarning={true}
            type="text"
            placeholder="Search universities, colleges, schools, libraries..."
            value={keywordQuery}
            onChange={(e) => {
              setKeywordQuery(e.target.value);
              setShowKeywordDropdown(true);
            }}
            onFocus={() => setShowKeywordDropdown(true)}
            className={`w-full pl-2 pr-6 bg-transparent text-gray-700 outline-none placeholder-gray-400 font-medium ${
              isCompact ? 'py-1.5 text-xs' : 'py-3 text-sm'
            }`}
          />
          {keywordQuery && (
            <button
              type="button"
              onClick={() => setKeywordQuery('')}
              className="absolute right-2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X size={14} />
            </button>
          )}

          {/* Keyword Autocomplete Dropdown */}
          {showKeywordDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 max-h-[350px] overflow-y-auto">
              <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                {keywordQuery ? 'Suggestions' : 'Popular Categories / Institutions'}
              </div>
              {keywordSuggestions.length > 0 ? (
                keywordSuggestions.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectKeyword(item.value)}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-left text-xs text-gray-700 hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-sm flex-shrink-0">
                        {item.type === 'category' ? '🏷️' : item.type === 'tag' ? '📌' : '🏛️'}
                      </span>
                      <span className="font-semibold truncate">{item.value}</span>
                    </div>
                    <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full uppercase scale-90">
                      {item.type}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-xs text-gray-500 italic">
                  No suggestions found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Submit/Search Button */}
        <button
          suppressHydrationWarning={true}
          type="submit"
          className={`bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 group cursor-pointer ${
            isCompact ? 'px-4 py-2 text-xs' : 'px-8 py-3.5 text-sm'
          }`}
        >
          <Search size={isCompact ? 14 : 16} className="group-hover:scale-105 transition-transform" />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default JustDialSearchBar;
