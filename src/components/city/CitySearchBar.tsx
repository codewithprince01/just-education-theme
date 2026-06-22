"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { topCollegesInCity, quickLinks } from '@/data/cityData';

interface CitySearchBarProps {
  cityName: string;
  citySlug: string;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export default function CitySearchBar({
  cityName,
  citySlug,
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
}: CitySearchBarProps) {
  const searchRef = useRef<HTMLDivElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const suggestions = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const categories = ['University', 'College', 'School', 'Library', 'Coaching Center', 'Training Center', 'Consultant', 'Research Center', 'Hostel'];

    if (!query) {
      return [
        ...categories.slice(0, 3).map(c => ({ type: 'category' as const, value: c })),
        ...topCollegesInCity.slice(0, 3).map(inst => ({ type: 'institution' as const, value: inst.name }))
      ];
    }

    const matchedList: { type: 'category' | 'institution' | 'course'; value: string }[] = [];

    categories.forEach(c => {
      if (c.toLowerCase().includes(query)) {
        matchedList.push({ type: 'category', value: c });
      }
    });

    topCollegesInCity.forEach(inst => {
      if (inst.name.toLowerCase().includes(query)) {
        matchedList.push({ type: 'institution', value: inst.name });
      }
    });

    const matchedCourses = new Set<string>();
    topCollegesInCity.forEach(inst => {
      if (inst.courses) {
        inst.courses.forEach(course => {
          if (course.toLowerCase().includes(query)) {
            matchedCourses.add(course);
          }
        });
      }
    });
    matchedCourses.forEach(course => {
      matchedList.push({ type: 'course', value: course });
    });

    return matchedList.slice(0, 8);
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl -mt-8 relative z-20" id="city-search-bar-section">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
          {/* Heading */}
          <div className="flex items-center gap-2 font-bold text-gray-800 text-sm md:text-base whitespace-nowrap self-center lg:self-auto">
            <Search size={18} className="text-blue-600" />
            <span>Find Your Institution:</span>
          </div>

          {/* Search Input with Autocomplete (Justdial second filter behavior) */}
          <div className="relative flex-1" ref={searchRef}>
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={`Search universities, colleges, schools, libraries in ${cityName} by name or course...`}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700 font-medium"
              id="city-search-bar-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setShowSuggestions(false);
                }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={14} />
              </button>
            )}

            {/* Autocomplete Suggestions Dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 max-h-[350px] overflow-y-auto">
                <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  {searchQuery ? 'Matching Suggestions' : 'Popular Categories & Institutions'}
                </div>
                {suggestions.length > 0 ? (
                  suggestions.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSearchQuery(item.value);
                        setShowSuggestions(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-left text-xs text-gray-700 hover:bg-blue-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-sm flex-shrink-0">
                          {item.type === 'category' ? '🏷️' : item.type === 'course' ? '🎓' : '🏛️'}
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

          {/* Stream Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-hide">
            {['All', 'Engineering', 'MBA', 'Medical', 'Science', 'Law'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  activeTab === tab.toLowerCase()
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200/80 border border-transparent'
                }`}
                id={`bar-tab-${tab.toLowerCase()}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Searches */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-gray-50 text-xs text-gray-500">
          <span className="font-semibold text-gray-600">Popular:</span>
          {quickLinks.slice(0, 4).map((link, i) => (
            <Link
              key={i}
              href={`/city/${citySlug || 'pune'}?filter=${link.slug}`}
              className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
