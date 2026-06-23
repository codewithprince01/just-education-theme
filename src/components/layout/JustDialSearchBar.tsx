"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MapPin, Search, X } from 'lucide-react';
import { mockCities, mockListings, mockCategories } from '@/data/searchMockData';
import { cityMeta, institutionTypes } from '@/data/cityData';
import { cityCoordinates, distanceKm } from '@/data/cityCoordinates';

/** Resolve a free-text city name (e.g. "Pune") to a browse-page city slug (e.g. "pune"). */
function resolveCitySlug(name: string): string | null {
  const n = name.trim().toLowerCase();
  if (!n) return null;
  const match = Object.entries(cityMeta).find(
    ([slug, city]) => slug.toLowerCase() === n || city.name.toLowerCase() === n
  );
  return match ? match[0] : null;
}

/** Reverse: a browse city slug (e.g. "pune") to its display name (e.g. "Pune"). */
function citySlugToName(slug: string | null): string {
  if (!slug) return '';
  return cityMeta[slug]?.name ?? '';
}

/** Reverse: an institution type value (e.g. "UNIVERSITY") to its category label. */
function typeValueToLabel(value: string | null): string {
  if (!value) return '';
  return institutionTypes.find((t) => t.value === value)?.label ?? '';
}

/** Resolve a keyword to an institution type value if it matches a category, else null. */
function resolveTypeValue(keyword: string): string | null {
  const k = keyword.trim().toLowerCase();
  if (!k) return null;
  const match = institutionTypes.find(
    (t) => t.label.toLowerCase() === k || t.value.toLowerCase() === k
  );
  return match ? match.value : null;
}

/** Build the /browse URL with the location as a city filter and the keyword as
 *  either a type filter (when it names a category) or a free-text search. */
function buildBrowseUrl(keyword: string, location: string): string {
  const params = new URLSearchParams();

  const citySlug = resolveCitySlug(location);
  if (citySlug) params.set('city', citySlug);

  const typeValue = resolveTypeValue(keyword);
  if (typeValue) params.set('type', typeValue);
  else if (keyword.trim()) params.set('q', keyword.trim());

  const qs = params.toString();
  return qs ? `/browse?${qs}` : '/browse';
}

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

  // Initial values accept both the home-page params (loc/q) and the
  // browse-page params (city slug / type value), so the bar stays in sync
  // wherever it is rendered.
  const initLocation = searchParams.get('loc') || citySlugToName(searchParams.get('city'));
  const initKeyword = searchParams.get('q') || typeValueToLabel(searchParams.get('type'));

  // Search state variables
  const [locationQuery, setLocationQuery] = useState(initLocation);
  const [keywordQuery, setKeywordQuery] = useState(initKeyword);

  // Dropdown visibility states
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showKeywordDropdown, setShowKeywordDropdown] = useState(false);

  // User's detected coordinates — used to sort the city list by proximity.
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Recently selected locations (persisted in localStorage).
  const [recentLocations, setRecentLocations] = useState<string[]>([]);

  // Refs for tracking click outside
  const locationRef = useRef<HTMLDivElement>(null);
  const keywordRef = useRef<HTMLDivElement>(null);

  // Track whether the user has manually touched the location field,
  // so auto-detection never overrides an explicit choice.
  const locationTouched = useRef(false);
  // Ensure geolocation detection runs at most once per mount.
  const geoAttempted = useRef(false);
  // The currently committed location — what the field reverts to if the user
  // opens the dropdown but doesn't pick a city.
  const committedLocation = useRef<string>(initLocation);

  const RECENTS_KEY = 'je_recent_locations';
  const MAX_RECENTS = 4;

  // Load recent locations from localStorage on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENTS_KEY);
      if (raw) setRecentLocations(JSON.parse(raw));
    } catch {
      /* ignore malformed storage */
    }
  }, []);

  const addRecentLocation = (city: string) => {
    setRecentLocations((prev) => {
      const next = [city, ...prev.filter((c) => c !== city)].slice(0, MAX_RECENTS);
      try {
        localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const clearRecentLocations = () => {
    setRecentLocations([]);
    try {
      localStorage.removeItem(RECENTS_KEY);
    } catch {
      /* ignore */
    }
  };

  // Commit a typed-but-valid city, otherwise revert to the last committed value.
  // Called when the location dropdown closes without an explicit selection.
  const commitOrRevertLocation = () => {
    const q = locationQuery.trim();
    const match = mockCities.find((c) => c.toLowerCase() === q.toLowerCase());
    if (match) {
      committedLocation.current = match;
      setLocationQuery(match);
    } else {
      setLocationQuery(committedLocation.current);
    }
  };

  // Sync state with URL params (supports loc/q and browse's city/type)
  useEffect(() => {
    const loc = searchParams.get('loc') || citySlugToName(searchParams.get('city'));
    setLocationQuery(loc);
    if (loc) committedLocation.current = loc;
    setKeywordQuery(searchParams.get('q') || typeValueToLabel(searchParams.get('type')));
  }, [searchParams]);

  // Default the location field to the user's current city via geolocation.
  useEffect(() => {
    if (geoAttempted.current) return;
    geoAttempted.current = true;

    // Don't override a location coming from the URL or already typed.
    if (searchParams.get('loc') || searchParams.get('city') || locationTouched.current) return;
    if (typeof navigator === 'undefined' || !navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          setUserCoords({ lat: latitude, lng: longitude });
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          if (!res.ok) return;
          const data = await res.json();
          const detected: string = data.city || data.locality || '';
          if (!detected) return;

          // Prefer an exact match against our known city list (case-insensitive),
          // otherwise fall back to the raw detected name.
          const match =
            mockCities.find((c) => c.toLowerCase() === detected.toLowerCase()) ||
            mockCities.find((c) => detected.toLowerCase().includes(c.toLowerCase())) ||
            detected;

          // Only apply if the user hasn't typed anything in the meantime.
          if (!locationTouched.current) {
            committedLocation.current = match;
            setLocationQuery((prev) => (prev ? prev : match));
          }
        } catch {
          // Reverse geocoding failed — leave the field empty.
        }
      },
      () => {
        // Permission denied or unavailable — leave the field empty.
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 }
    );
  }, [searchParams]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setShowLocationDropdown((open) => {
          // Closing without a selection → keep a valid typed city or revert to default.
          if (open) commitOrRevertLocation();
          return false;
        });
      }
      if (keywordRef.current && !keywordRef.current.contains(e.target as Node)) {
        setShowKeywordDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationQuery]);

  // All cities sorted by proximity to the user (nearest first) when we know
  // their position, otherwise the default alphabetical order.
  const sortedCities = useMemo(() => {
    if (!userCoords) return mockCities;
    return [...mockCities].sort((a, b) => {
      const ca = cityCoordinates[a];
      const cb = cityCoordinates[b];
      // Cities without known coordinates sink to the bottom.
      if (ca && !cb) return -1;
      if (!ca && cb) return 1;
      if (!ca && !cb) return a.localeCompare(b);
      return distanceKm(userCoords, ca) - distanceKm(userCoords, cb);
    });
  }, [userCoords]);

  // The user is actively typing a filter (text differs from the committed value).
  const isFiltering =
    locationQuery.trim() !== '' && locationQuery !== committedLocation.current;

  // Text-filtered matches (used while the user is typing).
  const filteredCities = useMemo(
    () => sortedCities.filter((city) => city.toLowerCase().includes(locationQuery.toLowerCase())),
    [sortedCities, locationQuery]
  );

  // Trending/nearby cities shown when not actively filtering (cap the list).
  const nearbyCities = useMemo(
    () => sortedCities.filter((c) => !recentLocations.includes(c)).slice(0, 6),
    [sortedCities, recentLocations]
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

    router.push(buildBrowseUrl(keywordQuery, locationQuery));
  };

  const handleSelectLocation = (city: string) => {
    locationTouched.current = true;
    committedLocation.current = city;
    setLocationQuery(city);
    addRecentLocation(city);
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

    // Instantly redirect to the browse page, filtered by location + keyword
    router.push(buildBrowseUrl(value, locationQuery));
  };

  const cityDistanceLabel = (city: string): string | null => {
    if (!userCoords) return null;
    const c = cityCoordinates[city];
    if (!c) return null;
    const d = distanceKm(userCoords, c);
    return d < 1 ? '<1 km' : `${Math.round(d)} km`;
  };

  // A single selectable city row in the location dropdown.
  const cityRow = (city: string) => {
    const dist = cityDistanceLabel(city);
    return (
      <button
        key={city}
        type="button"
        onClick={() => handleSelectLocation(city)}
        className="w-full flex items-center justify-between gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-gray-700 hover:bg-blue-50 transition-colors cursor-pointer"
      >
        <span className="flex items-center gap-2.5">
          <MapPin size={12} className="text-gray-400" />
          {city}
        </span>
        {dist && <span className="text-[10px] font-medium text-gray-400">{dist}</span>}
      </button>
    );
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
              locationTouched.current = true;
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
              onClick={() => {
                locationTouched.current = true;
                setLocationQuery('');
              }}
              className="absolute right-2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X size={14} />
            </button>
          )}

          {/* Location Autocomplete Dropdown */}
          {showLocationDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 max-h-[340px] overflow-y-auto">
              {isFiltering ? (
                /* ── Typing: show matching cities ── */
                <>
                  <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Select City
                  </div>
                  {filteredCities.length > 0 ? (
                    filteredCities.map((city) => cityRow(city))
                  ) : (
                    <div className="px-4 py-3 text-xs text-gray-500 italic">No cities found</div>
                  )}
                </>
              ) : (
                /* ── Idle: recent + nearby (JustDial style) ── */
                <>
                  {recentLocations.length > 0 && (
                    <div className="mb-1">
                      <div className="flex items-center justify-between px-3 py-1.5">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                          Recent Locations
                        </span>
                        <button
                          type="button"
                          onClick={clearRecentLocations}
                          className="text-[10px] font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wider cursor-pointer"
                        >
                          Clear All
                        </button>
                      </div>
                      {recentLocations.map((city) => cityRow(city))}
                      <div className="my-1 border-t border-gray-100" />
                    </div>
                  )}

                  <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    {userCoords ? 'Nearby Cities' : 'Popular Cities'}
                  </div>
                  {nearbyCities.length > 0 ? (
                    nearbyCities.map((city) => cityRow(city))
                  ) : (
                    <div className="px-4 py-3 text-xs text-gray-500 italic">No cities found</div>
                  )}
                </>
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
