"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import {
  MapPin, Search, Star, ChevronRight, ChevronDown, Building2, GraduationCap,
  ArrowRight, Award, X, Sparkles, Heart, ChevronUp, List, LayoutGrid, Table, Download, ArrowUpDown
} from 'lucide-react';
import {
  cityMeta,
  topCollegesInCity,
  institutionTypes,
  institutionFilterConfig,
  popularAreas,
  quickLinks,
  CollegeInCity
} from '@/data/cityData';
import CompareModal from '@/components/shared/CompareModal';
import ActionModal, { ActionModalMode } from '@/components/shared/ActionModal';

/* ─── Sub-Components ─── */

// Animated Counter
interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
}

const AnimatedCounter = ({ target, duration = 2000, suffix = '' }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Scroll-to-top button
const ScrollToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handler = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-blue-500/40 cursor-pointer"
      id="scroll-to-top"
      aria-label="Scroll to top"
    >
      <ChevronUp size={22} />
    </button>
  );
};

/* ─── Per-Category Table Header Config ─── */
const TABLE_HEADER_CONFIG: Record<string, { institution: string; fees: string; metric: string; ranking: string }> = {
  UNIVERSITY:           { institution: 'University Name',  fees: 'Average Fee',           metric: 'Placement Rate',       ranking: 'NIRF / QS / NAAC' },
  COLLEGE:              { institution: 'College Name',     fees: 'Course Fee',            metric: 'Average Package',       ranking: 'NIRF / NAAC'      },
  SCHOOL:               { institution: 'School Name',      fees: 'Annual Fee',            metric: 'Student Outcomes',      ranking: 'Board Rating'     },
  LIBRARY:              { institution: 'Library Name',     fees: 'Membership Fee',        metric: 'Resources Available',   ranking: 'Popularity Rank'  },
  COACHING:             { institution: 'Institute Name',   fees: 'Course Fee',            metric: 'Selection Rate',        ranking: 'Success Ranking'  },
  TRAINING:             { institution: 'Training Center',  fees: 'Course Fee',            metric: 'Placement Assistance',  ranking: 'Industry Rating'  },
  TRAINING_CENTER:      { institution: 'Training Center',  fees: 'Course Fee',            metric: 'Placement Assistance',  ranking: 'Industry Rating'  },
  CONSULTANT:           { institution: 'Consultant Name',  fees: 'Service Fee',           metric: 'Success Rate',          ranking: 'Popularity Rank'  },
  RESEARCH:             { institution: 'Research Center',  fees: 'Research Funding',      metric: 'Projects Completed',    ranking: 'Research Ranking' },
  RESEARCH_CENTER:      { institution: 'Research Center',  fees: 'Research Funding',      metric: 'Projects Completed',    ranking: 'Research Ranking' },
  SCHOLARSHIP_PROVIDER: { institution: 'Scholarship Name', fees: 'Scholarship Amount',    metric: 'Beneficiaries Awarded', ranking: 'Popularity Rank'  },
  HOSTEL:               { institution: 'Hostel Name',      fees: 'Monthly Rent',          metric: 'Occupancy Rate',        ranking: 'Hostel Ranking'   },
  ALL:                  { institution: 'Institution',      fees: 'Course Fees',           metric: 'Placement',             ranking: 'Ranking'          },
};

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

  // Default to Pune if not found
  const city = cityMeta[citySlug] || cityMeta.pune;
  const cityName = city.name;

  const [selectedCollegeForRanking, setSelectedCollegeForRanking] = useState<CollegeInCity | null>(null);

  const getRankingsDetails = (college: CollegeInCity) => {
    const id = college.id;
    const type = college.institutionType;
    
    if (type === 'UNIVERSITY' || type === 'COLLEGE') {
      return [
        { agency: 'NIRF (National Institutional Ranking)', rank: `#${(id % 8) + 1} in India`, year: '2026', category: 'Overall / Engineering' },
        { agency: 'QS World University Rankings', rank: `#${(id % 12) + 140} globally`, year: '2026', category: 'Asia Pacific' },
        { agency: 'Times Higher Education (THE)', rank: `#${(id % 10) + 110} in Asia`, year: '2026', category: 'Technology Programs' },
        { agency: 'NAAC Accreditation', rank: 'Grade A++ (3.82 / 4.0)', year: '2025', category: 'Institutional Quality' },
        { agency: 'India Today', rank: `#${(id % 5) + 2} in Western Region`, year: '2026', category: 'Placement & Industry Liaison' },
        { agency: 'Outlook India', rank: `#${(id % 6) + 3} Best Value College`, year: '2026', category: 'Return on ROI' }
      ];
    }
    
    if (type === 'SCHOOL') {
      return [
        { agency: 'Education World', rank: `#${(id % 4) + 1} Day Co-ed School`, year: '2026', category: 'State of Maharashtra' },
        { agency: 'Times School Survey', rank: `#2 in Academic Outcomes`, year: '2026', category: 'Pune Region' },
        { agency: 'CBSE Board Rating', rank: '5 Star / Outstanding', year: '2025', category: 'Board Examination Results' },
        { agency: 'Education Today', rank: 'Best Infrastructure Award', year: '2026', category: 'Co-curricular & Sports' }
      ];
    }
    
    if (type === 'COACHING') {
      return [
        { agency: 'Selection Rate Index', rank: `Ranked #1 in ${cityName}`, year: '2026', category: 'JEE / NEET Success' },
        { agency: 'Toppers Choice Awards', rank: '5 Star / Elite Rating', year: '2026', category: 'Faculty & Study Material' },
        { agency: 'National Education Awards', rank: 'Best Coaching Institute', year: '2025', category: 'Academic Quality Assurance' }
      ];
    }

    return [
      { agency: 'Just Education Popularity Index', rank: `#${(id % 6) + 1} in ${cityName}`, year: '2026', category: 'User Trust & Engagement' },
      { agency: 'Local Directory Ratings', rank: 'Top Rated Service', year: '2025', category: 'Quality of Facilities & Care' },
      { agency: 'Regional Council Assessment', rank: 'Grade A Certified', year: '2026', category: 'Infrastructure & Safety Standards' }
    ];
  };

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

  // Dynamic enrichment generators for mockup details
  const getEnrichedData = (college: CollegeInCity) => {
    const id = college.id || 1;
    const rate = college.rating || 4.0;
    const score = Math.round(rate * 170 + (id * 13) % 120);

    // Primary course / service descriptor
    let courseName = 'B.Tech Computer Science';
    if (college.institutionType === 'SCHOOL')               courseName = 'CBSE Class 12';
    else if (college.institutionType === 'LIBRARY')         courseName = 'Premium Membership';
    else if (college.institutionType === 'COACHING')        courseName = 'JEE / NEET Classroom';
    else if (college.institutionType === 'HOSTEL')          courseName = 'AC Double Sharing Room';
    else if (college.institutionType === 'TRAINING' || college.institutionType === 'TRAINING_CENTER')  courseName = 'Professional Certification';
    else if (college.institutionType === 'CONSULTANT')      courseName = 'Abroad Admission Consulting';
    else if (college.institutionType === 'RESEARCH' || college.institutionType === 'RESEARCH_CENTER')  courseName = 'Research Program';
    else if (college.institutionType === 'SCHOLARSHIP_PROVIDER') courseName = 'Merit Scholarship';
    else if (college.courseTags && college.courseTags.length > 0) courseName = college.courseTags[0] + ' General';
    else if (college.courses && college.courses.length > 0) courseName = college.courses[0];

    // Fees subtitle (appears below fee value)
    let feesSubtitle = '- Total Fees';
    if      (college.institutionType === 'LIBRARY')              feesSubtitle = '- Membership';
    else if (college.institutionType === 'HOSTEL')               feesSubtitle = '- Per Month';
    else if (college.institutionType === 'SCHOLARSHIP_PROVIDER') feesSubtitle = '- Scholarship Amount';
    else if (college.institutionType === 'CONSULTANT')           feesSubtitle = '- Service Fee';
    else if (college.institutionType === 'RESEARCH' || college.institutionType === 'RESEARCH_CENTER') feesSubtitle = '- Research Cost';
    else if (college.institutionType === 'SCHOOL')               feesSubtitle = '- Annual Fee';
    else if (college.institutionType === 'UNIVERSITY')           feesSubtitle = '- Average Fee';
    else if (college.institutionType === 'TRAINING' || college.institutionType === 'TRAINING_CENTER') feesSubtitle = '- Course Fee';
    else if (college.institutionType === 'COACHING')             feesSubtitle = '- Course Fee';

    // Metric / placement data
    let isAcademicOnly = ['SCHOOL', 'LIBRARY', 'HOSTEL', 'SCHOLARSHIP_PROVIDER', 'CONSULTANT'].includes(college.institutionType);
    let avgPkgStr = 'N/A';
    let highestPkgStr = 'N/A';
    let placementSubtitle = 'Placement Rate';
    let highestSubtitle = 'Highest Package';
    let compareMetricLabel = 'Compare Placement';

    if (college.institutionType === 'SCHOOL') {
      avgPkgStr = `${88 + (id % 10)}%`;
      highestPkgStr = `${96 + (id % 4)}.${id % 9}%`;
      placementSubtitle = 'Student Outcomes';
      highestSubtitle = 'Top Board Score';
      compareMetricLabel = 'Compare Outcomes';
    } else if (college.institutionType === 'LIBRARY') {
      avgPkgStr = `${(id % 40) + 30},000+`;
      highestPkgStr = '24/7';
      placementSubtitle = 'Resources Available';
      highestSubtitle = 'Access Timing';
      compareMetricLabel = '';
    } else if (college.institutionType === 'HOSTEL') {
      avgPkgStr = `${(id % 30) + 70}%`;
      highestPkgStr = `${(id % 100) + 150}+ Beds`;
      placementSubtitle = 'Occupancy Rate';
      highestSubtitle = 'Total Capacity';
      compareMetricLabel = 'Compare Hostels';
    } else if (college.institutionType === 'SCHOLARSHIP_PROVIDER') {
      avgPkgStr = `${(id % 500) + 500}+`;
      highestPkgStr = '₹ 1L - 5L';
      placementSubtitle = 'Beneficiaries Awarded';
      highestSubtitle = 'Scholarship Range';
      compareMetricLabel = 'Compare Awards';
    } else if (college.institutionType === 'COACHING') {
      avgPkgStr = `${72 + (id % 20)}%`;
      highestPkgStr = `${(id % 150) + 200}+ Selected`;
      placementSubtitle = 'Selection Rate';
      highestSubtitle = 'Students Selected';
      compareMetricLabel = 'Compare Results';
    } else if (college.institutionType === 'TRAINING' || college.institutionType === 'TRAINING_CENTER') {
      avgPkgStr = `${60 + (id % 30)}%`;
      highestPkgStr = `₹ ${Math.round(rate * 3.2)},000`;
      placementSubtitle = 'Placement Assistance';
      highestSubtitle = 'Avg Starting Salary';
      compareMetricLabel = 'Compare Placements';
    } else if (college.institutionType === 'CONSULTANT') {
      avgPkgStr = `${80 + (id % 15)}%`;
      highestPkgStr = `${(id % 300) + 500}+ Students`;
      placementSubtitle = 'Success Rate';
      highestSubtitle = 'Students Assisted';
      compareMetricLabel = 'Compare Success';
    } else if (college.institutionType === 'RESEARCH' || college.institutionType === 'RESEARCH_CENTER') {
      avgPkgStr = `${(id % 30) + 10}+`;
      highestPkgStr = `₹ ${(id % 5) + 2}Cr+`;
      placementSubtitle = 'Projects Completed';
      highestSubtitle = 'Research Funding';
      compareMetricLabel = 'Compare Projects';
    } else {
      // Universities, Colleges (default)
      const baseAvg = Math.round(rate * 1.5 + (id % 3) * 0.7);
      const baseHigh = Math.round(rate * 5.2 + (id % 5) * 7.5);
      avgPkgStr = `₹ ${baseAvg.toLocaleString('en-IN')},000`;
      highestPkgStr = `₹ ${baseHigh.toLocaleString('en-IN')},000`;
      placementSubtitle = college.institutionType === 'UNIVERSITY' ? 'Placement Rate' : 'Average Package';
      highestSubtitle = 'Highest Package';
      compareMetricLabel = 'Compare Placements';
    }

    // Review badge tags
    const reviewTags = [
      'Best in Social Life',
      'Excellent Infrastructure',
      'Outstanding Faculty',
      'Highly Recommended',
      'Great Student Support',
      'Top Placements Recipient'
    ];
    const reviewTag = reviewTags[id % reviewTags.length];

    // Rankings — string + ranking body label
    let rankNum = (id % 12) + 1;
    let rankTotal = 300;
    let rankSubject = college.courses?.[0] || 'Education';
    let rankingLabel = TABLE_HEADER_CONFIG[college.institutionType]?.ranking || 'Ranking 2026';

    if (college.institutionType === 'UNIVERSITY' || college.institutionType === 'COLLEGE') {
      rankNum = (id % 8) + 1;
      rankTotal = 500 + (id % 3) * 17; // e.g. 500, 517, 534
      rankSubject = college.courses?.[0] || 'Engineering';
    } else if (college.institutionType === 'SCHOOL') {
      rankNum = (id % 5) + 1;
      rankTotal = 120;
      rankSubject = 'Schooling';
    } else if (college.institutionType === 'COACHING') {
      rankNum = (id % 3) + 1;
      rankTotal = 95;
      rankSubject = 'Entrance Exams';
    } else if (college.institutionType === 'LIBRARY') {
      rankNum = (id % 8) + 1;
      rankTotal = 45;
      rankSubject = 'Resources';
    } else if (college.institutionType === 'TRAINING' || college.institutionType === 'TRAINING_CENTER') {
      rankNum = (id % 6) + 1;
      rankTotal = 150;
      rankSubject = 'Technical Skills';
    } else if (college.institutionType === 'CONSULTANT') {
      rankNum = (id % 8) + 1;
      rankTotal = 80;
      rankSubject = 'Admissions';
    } else if (college.institutionType === 'RESEARCH' || college.institutionType === 'RESEARCH_CENTER') {
      rankNum = (id % 5) + 1;
      rankTotal = 60;
      rankSubject = 'Scientific Research';
    } else if (college.institutionType === 'SCHOLARSHIP_PROVIDER') {
      rankNum = (id % 10) + 1;
      rankTotal = 40;
      rankSubject = 'Scholarships';
    } else if (college.institutionType === 'HOSTEL') {
      rankNum = (id % 8) + 1;
      rankTotal = 75;
      rankSubject = 'Co-living';
    }

    const getRankSuffix = (n: number) => {
      if (n === 1) return 'st';
      if (n === 2) return 'nd';
      if (n === 3) return 'rd';
      return 'th';
    };
    const rankSuffix = getRankSuffix(rankNum);
    const rankingStr = `#${rankNum}${rankSuffix}/${rankTotal} in India for ${rankSubject}`;

    return {
      score,
      courseName,
      feesSubtitle,
      avgPkgStr,
      highestPkgStr,
      placementSubtitle,
      highestSubtitle,
      compareMetricLabel,
      reviewTag,
      rankingStr,
      rankingLabel,
      isAcademicOnly,
      rankNum,
      rankTotal,
      rankSuffix,
      rankSubject
    };
  };

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
  const tableHeaders = TABLE_HEADER_CONFIG[selectedInstitutionType] || TABLE_HEADER_CONFIG['ALL'];

  const toggleSave = (id: number) => {
    setSavedColleges(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-16" id="city-page">
      {/* ───── HERO SECTION ───── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a2540] via-[#0d3868] to-[#1a5276]" id="city-hero">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/10 rounded-full"
              style={{
                top: `${15 + i * 14}%`,
                left: `${10 + i * 15}%`,
                animation: `float ${3 + i * 0.5}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-blue-200/70 text-sm mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/city" className="hover:text-white transition-colors">Cities</Link>
            <ChevronRight size={14} />
            <span className="text-white font-medium">{cityName}</span>
          </nav>

          <div className="max-w-4xl mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/15 text-blue-100 text-sm mb-5">
                <MapPin size={14} className="text-cyan-300" />
                <span>{city.state}, India</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight tracking-tight">
                Institutions in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">{cityName}</span>
              </h1>
              <p className="text-lg text-blue-100/80 mb-2 font-medium italic">"{city.tagline}"</p>
              <p className="text-blue-200/70 text-base max-w-2xl leading-relaxed">{city.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── HORIZONTAL SEARCH BAR ───── */}
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

                  {layout === 'table' ? (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                      <div className="overflow-x-auto text-gray-700">
                        <table className="w-full min-w-[920px]">
                          <thead>
                            <tr className="bg-gradient-to-r from-[#0a2540] to-[#1a5276] text-white">
                              <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wide w-20">Rank</th>
                              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide min-w-[340px]">{headers.institution}</th>
                              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide w-48">{headers.fees}</th>
                              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide w-48">{headers.metric}</th>
                              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide w-52">User Reviews</th>
                              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide w-56">{headers.ranking}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.slice(0, 5).map((college, index) => {
                              const { score, courseName, feesSubtitle, avgPkgStr, highestPkgStr, placementSubtitle, highestSubtitle, compareMetricLabel, reviewTag, rankingStr, rankingLabel, isAcademicOnly, rankNum, rankTotal, rankSuffix, rankSubject } = getEnrichedData(college);
                              return (
                                <tr key={college.id} className={`border-b border-gray-100 last:border-0 transition-colors hover:bg-blue-50/10 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/10'}`}>
                                  <td className="px-5 py-6 align-top text-center w-20">
                                    <span className="font-extrabold text-[#0a2540] text-lg">#{index + 1}</span>
                                  </td>
                                  <td className="px-5 py-6 align-top min-w-[340px]">
                                    <div className="flex items-start gap-4">
                                      <img src={college.image} alt={college.name} className="w-14 h-14 rounded-2xl object-cover flex-shrink-0 border border-gray-100 shadow-sm" loading="lazy" />
                                      <div className="min-w-0 flex-1">
                                        <Link href={`/college/${college.id}`} className="font-bold text-blue-600 hover:text-blue-800 text-[15px] hover:underline leading-snug">{college.name}</Link>
                                        <div className="text-xs text-gray-500 font-medium mt-0.5">{cityName}, {city.state} | <span className="text-gray-400">{college.accreditation || 'Govt Approved'}</span></div>
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-4 text-[11px] font-bold text-gray-400">
                                          <button onClick={() => openActionModal(college, 'apply')} className="flex items-center gap-1 text-orange-600 hover:text-orange-700 hover:underline cursor-pointer"><ArrowRight size={13} className="text-orange-500" />Apply Now</button>
                                          <span className="text-gray-200 font-normal">|</span>
                                          <button onClick={() => openActionModal(college, 'brochure')} className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer"><Download size={13} className="text-emerald-500" />Download Brochure</button>
                                          {compareMetricLabel && (
                                            <>
                                              <span className="text-gray-200 font-normal">|</span>
                                              <label className="flex items-center gap-1.5 cursor-pointer text-gray-500 hover:text-gray-700 select-none">
                                                <input
                                                  type="checkbox"
                                                  checked={checkedCollegesForCompare.includes(college.id)}
                                                  onChange={() => handleCompareCheckboxChange(college)}
                                                  className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 accent-blue-600"
                                                />
                                                Add To Compare
                                              </label>
                                            </>
                                          )}
                                        </div>
                                        <div className="inline-flex items-center gap-1.5 bg-[#FFFDE7] border border-[#FFF9C4] rounded-lg px-2.5 py-1 mt-3">
                                          <GraduationCap size={13} className="text-yellow-600 animate-pulse" />
                                          <span className="text-[11px] text-[#0a2540] font-bold">CD Score: <span className="text-yellow-700">{score}/1000</span></span>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-5 py-6 align-top w-48">
                                    <div className="flex flex-col">
                                      <span className="text-[15px] font-black text-emerald-600 leading-tight">{college.fees.split(' - ')[0]}</span>
                                      <span className="text-xs font-bold text-gray-700 mt-1 leading-snug">{courseName}</span>
                                      <span className="text-[11px] text-gray-400 font-semibold mt-0.5">{feesSubtitle}</span>
                                      <button
                                        onClick={() => openCompareForCollege(college, 'fees')}
                                        className="flex items-center gap-1 text-[11px] text-orange-600 hover:text-orange-700 hover:underline font-bold mt-4 justify-start cursor-pointer"
                                      >
                                        <ArrowUpDown size={11} />
                                        Compare {headers.fees}
                                      </button>
                                    </div>
                                  </td>
                                  <td className="px-5 py-6 align-top w-48">
                                    <div className="flex flex-col">
                                      <span className="text-[15px] font-black text-emerald-600 leading-tight">{avgPkgStr}</span>
                                      <span className="text-[11px] text-gray-400 font-semibold mt-0.5 leading-snug">{placementSubtitle}</span>
                                      {!isAcademicOnly && (<><span className="text-[14px] font-black text-emerald-600 mt-2.5 leading-tight">{highestPkgStr}</span><span className="text-[11px] text-gray-400 font-semibold mt-0.5 leading-snug">{highestSubtitle}</span></>)}
                                      {compareMetricLabel && (
                                        <button
                                          onClick={() => openCompareForCollege(college, 'placement')}
                                          className="flex items-center gap-1 text-[11px] text-orange-600 hover:text-orange-700 hover:underline font-bold mt-4 justify-start cursor-pointer"
                                        >
                                          <ArrowUpDown size={11} />
                                          {compareMetricLabel}
                                        </button>
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-5 py-6 align-top w-52">
                                    <div className="flex flex-col">
                                      <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-50 inline-block"></span><span className="text-sm font-black text-gray-800">{college.rating} / 5</span></div>
                                      <span className="text-[11px] text-gray-400 font-semibold mt-1">Based on {college.reviews} Reviews</span>
                                      <div className="inline-flex items-center justify-between bg-yellow-50/80 border border-yellow-100 rounded-lg px-2 py-1 mt-4 text-[11px] font-bold text-yellow-800 w-fit">✓ {reviewTag}</div>
                                    </div>
                                  </td>
                                  <td className="px-5 py-6 align-top w-56">
                                    <div className="flex flex-col gap-2">
                                      {/* Rank text */}
                                      <div className="text-gray-700 text-sm font-semibold leading-normal">
                                        <span className="font-extrabold">#{rankNum}<sup>{rankSuffix}</sup></span>
                                        <span className="text-gray-400">/</span>
                                        <span className="text-orange-500 font-bold">{rankTotal}</span>
                                        <span className="text-gray-600"> in India for</span>
                                        <div className="text-xs font-bold text-gray-500 mt-0.5">{rankSubject}</div>
                                      </div>



                                      {/* Overlapping Circles Modal Trigger */}
                                      <button
                                        onClick={() => setSelectedCollegeForRanking(college)}
                                        className="flex items-center gap-2 bg-[#e3f2fd]/50 hover:bg-[#e3f2fd]/80 border border-[#bbdefb] px-2.5 py-1.5 rounded-full cursor-pointer transition-all w-fit text-[#1e88e5] hover:text-[#1565c0]"
                                      >
                                        <div className="flex -space-x-1.5">
                                          <div className="w-4.5 h-4.5 rounded-full bg-emerald-600 text-white text-[8px] font-black flex items-center justify-center border border-white shadow-sm" title="NIRF">N</div>
                                          <div className="w-4.5 h-4.5 rounded-full bg-amber-500 text-white text-[8px] font-black flex items-center justify-center border border-white shadow-sm" title="QS World">Q</div>
                                          <div className="w-4.5 h-4.5 rounded-full bg-red-600 text-white text-[8px] font-black flex items-center justify-center border border-white shadow-sm" title="THE">T</div>
                                        </div>
                                        <span className="text-[10px] font-black">+ {((college.id + 1) % 5) + 6} More</span>
                                        <ChevronDown size={11} className="text-[#90caf9]" />
                                      </button>
                                      <div className="flex items-center gap-1.5 mt-1 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                        <Award size={11} className="text-blue-500" />
                                        <span>{rankingLabel}</span>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : layout === 'list' ? (
                    <div className="flex flex-col gap-4">
                      {items.slice(0, 5).map((college, index) => {
                        const { score, courseName, avgPkgStr, placementSubtitle, reviewTag, rankingStr, compareMetricLabel } = getEnrichedData(college);
                        const typeInfo = institutionTypes.find(t => t.value === college.institutionType);
                        return (
                          <div key={college.id} className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col md:flex-row gap-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                            <div className="w-full md:w-48 h-32 flex-shrink-0 rounded-xl overflow-hidden border border-gray-200 relative bg-gray-50">
                              <img src={college.image} alt={college.name} className="w-full h-full object-cover" loading="lazy" />
                              <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm text-white font-bold text-[10px] rounded-full uppercase tracking-wider">Rank #{index + 1}</span>
                            </div>
                            <div className="flex-1 flex flex-col justify-between min-w-0">
                              <div>
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <Link href={`/college/${college.id}`} className="font-bold text-[#0a2540] hover:text-blue-600 text-lg hover:underline leading-snug block">{college.name}</Link>
                                    <div className="text-xs text-gray-500 mt-1 font-medium">{cityName}, {city.state} | <span className="text-gray-400">{college.accreditation || 'Govt Approved'}</span></div>
                                  </div>
                                  <button onClick={() => toggleSave(college.id)} className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-all flex-shrink-0 cursor-pointer">
                                    <Heart size={14} className={savedColleges.includes(college.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'} />
                                  </button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-3">
                                  <span className="text-[11px] px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full font-semibold">{typeInfo?.label.replace(/s$/, '') || college.type}</span>
                                  <span className="text-[11px] px-2.5 py-0.5 bg-yellow-50 text-yellow-700 rounded-full font-semibold">Score: {score}/1000</span>
                                  <span className="text-[11px] px-2.5 py-0.5 bg-purple-50 text-purple-700 rounded-full font-semibold">{rankingStr}</span>
                                  <span className="text-[11px] px-2.5 py-0.5 bg-orange-50 text-orange-700 rounded-full font-semibold">{reviewTag}</span>
                                </div>
                              </div>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 pt-3 border-t border-gray-50 text-xs font-bold text-gray-500">
                                <button onClick={() => openActionModal(college, 'apply')} className="flex items-center gap-1 text-orange-600 hover:text-orange-700 hover:underline cursor-pointer"><ArrowRight size={13} className="text-orange-500" />Apply Now</button>
                                <span className="text-gray-200">|</span>
                                <button onClick={() => openActionModal(college, 'brochure')} className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer"><Download size={13} className="text-emerald-500" />Brochure</button>
                                {compareMetricLabel && (
                                  <>
                                    <span className="text-gray-200">|</span>
                                    <label className="flex items-center gap-1.5 cursor-pointer text-gray-500 hover:text-gray-700 select-none">
                                      <input
                                        type="checkbox"
                                        checked={checkedCollegesForCompare.includes(college.id)}
                                        onChange={() => handleCompareCheckboxChange(college)}
                                        className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 accent-blue-600"
                                      />
                                      Add To Compare
                                    </label>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="w-full md:w-56 bg-gray-50 rounded-xl border border-gray-200 p-4 flex flex-col justify-between gap-3 flex-shrink-0">
                              <div className="grid grid-cols-2 gap-2 text-center">
                                <div className="border-r border-gray-200 pr-2">
                                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{headers.fees}</div>
                                  <div className="text-[14px] font-black text-emerald-600 mt-1">{college.fees.split(' - ')[0]}</div>
                                  <div className="text-[9px] text-gray-500 font-semibold mt-0.5 line-clamp-1">{courseName}</div>
                                </div>
                                <div className="pl-2">
                                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{headers.metric}</div>
                                  <div className="text-[14px] font-black text-emerald-600 mt-1">{avgPkgStr}</div>
                                  <div className="text-[9px] text-gray-500 font-semibold mt-0.5">{placementSubtitle}</div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between border-t border-gray-200 pt-2 text-xs">
                                <div className="flex items-center gap-1"><Star size={12} className="text-yellow-500 fill-yellow-500" /><span className="font-bold text-gray-700">{college.rating}/5</span></div>
                                <span className="text-gray-400 font-medium">({college.reviews} reviews)</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {items.slice(0, 5).map((college, index) => {
                        const { score, courseName, avgPkgStr, placementSubtitle, rankingStr, compareMetricLabel } = getEnrichedData(college);
                        const typeInfo = institutionTypes.find(t => t.value === college.institutionType);
                        return (
                          <div key={college.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                            <div className="h-44 bg-gray-150 relative">
                              <img src={college.image} alt={college.name} className="w-full h-full object-cover" loading="lazy" />
                              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Rank #{index + 1}</div>
                              <button onClick={() => toggleSave(college.id)} className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white shadow-sm transition-all cursor-pointer">
                                <Heart size={14} className={savedColleges.includes(college.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'} />
                              </button>
                              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[#0a2540] px-2.5 py-0.5 rounded-lg text-[10px] font-black shadow-sm">Score: {score}/1000</div>
                            </div>
                            <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                              <div>
                                <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{typeInfo?.label.replace(/s$/, '') || college.type}</span>
                                <Link href={`/college/${college.id}`} className="font-bold text-[#0a2540] hover:text-blue-600 text-[15px] hover:underline leading-snug mt-2 block line-clamp-2">{college.name}</Link>
                                <div className="text-[11px] text-gray-500 mt-1 font-medium">{cityName}, {city.state} | {college.accreditation || 'Govt Approved'}</div>
                                <div className="text-[11px] text-purple-700 font-bold mt-2">{rankingStr}</div>
                                {compareMetricLabel && (
                                  <label className="flex items-center gap-1.5 cursor-pointer text-gray-500 hover:text-gray-700 select-none text-[11px] font-bold mt-3">
                                    <input
                                      type="checkbox"
                                      checked={checkedCollegesForCompare.includes(college.id)}
                                      onChange={() => handleCompareCheckboxChange(college)}
                                      className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 accent-blue-600"
                                    />
                                    Add To Compare
                                  </label>
                                )}
                              </div>
                              <div className="grid grid-cols-2 gap-2 border-t border-b border-gray-100 py-3 text-center">
                                <div className="border-r border-gray-100 pr-2">
                                  <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{headers.fees}</div>
                                  <div className="text-xs font-black text-emerald-600 mt-0.5">{college.fees.split(' - ')[0]}</div>
                                  <div className="text-[8px] text-gray-500 font-semibold line-clamp-1 mt-0.5">{courseName}</div>
                                </div>
                                <div className="pl-2">
                                  <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{headers.metric}</div>
                                  <div className="text-xs font-black text-emerald-600 mt-0.5">{avgPkgStr}</div>
                                  <div className="text-[8px] text-gray-500 font-semibold mt-0.5">{placementSubtitle}</div>
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-50 border-t border-gray-100 px-4 py-3 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1"><Star size={12} className="text-yellow-500 fill-yellow-500" /><span className="text-xs font-bold text-gray-700">{college.rating}</span><span className="text-[10px] text-gray-400 font-medium">({college.reviews})</span></div>
                              <button onClick={() => openActionModal(college, 'apply')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] px-3.5 py-1.5 rounded-lg shadow-sm transition-all cursor-pointer">Apply Now</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
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
            (() => {
              const tableHeaders = TABLE_HEADER_CONFIG[selectedInstitutionType] || TABLE_HEADER_CONFIG.COLLEGE;
              return (
                <>
                  {layout === 'table' ? (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                      <div className="overflow-x-auto text-gray-700">
                        <table className="w-full min-w-[920px]" id="institutions-table">
                          <thead>
                            <tr className="bg-gradient-to-r from-[#0a2540] to-[#1a5276] text-white">
                              <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wide w-20">Rank</th>
                              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide min-w-[340px]">{tableHeaders.institution}</th>
                              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide w-48">{tableHeaders.fees}</th>
                              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide w-48">{tableHeaders.metric}</th>
                              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide w-52">User Reviews</th>
                              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide w-56">{tableHeaders.ranking}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sortedInstitutions.map((college, index) => {
                              const { score, courseName, feesSubtitle, avgPkgStr, highestPkgStr, placementSubtitle, highestSubtitle, compareMetricLabel, reviewTag, rankingStr, rankingLabel, isAcademicOnly, rankNum, rankTotal, rankSuffix, rankSubject } = getEnrichedData(college);
                              return (
                                <tr key={college.id} className={`border-b border-gray-100 last:border-0 transition-colors hover:bg-blue-50/10 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/10'}`}>
                                  <td className="px-5 py-6 align-top text-center w-20">
                                    <span className="font-extrabold text-[#0a2540] text-lg">#{index + 1}</span>
                                  </td>
                                  <td className="px-5 py-6 align-top min-w-[340px]">
                                    <div className="flex items-start gap-4">
                                      <img src={college.image} alt={college.name} className="w-14 h-14 rounded-2xl object-cover flex-shrink-0 border border-gray-100 shadow-sm" loading="lazy" />
                                      <div className="min-w-0 flex-1">
                                        <Link href={`/college/${college.id}`} className="font-bold text-blue-600 hover:text-blue-800 text-[15px] hover:underline leading-snug">{college.name}</Link>
                                        <div className="text-xs text-gray-500 font-medium mt-0.5">{cityName}, {city.state} | <span className="text-gray-400">{college.accreditation || 'Govt Approved'}</span></div>
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-4 text-[11px] font-bold text-gray-400">
                                          <button onClick={() => openActionModal(college, 'apply')} className="flex items-center gap-1 text-orange-600 hover:text-orange-700 hover:underline cursor-pointer"><ArrowRight size={13} className="text-orange-500" />Apply Now</button>
                                          <span className="text-gray-200 font-normal">|</span>
                                          <button onClick={() => openActionModal(college, 'brochure')} className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer"><Download size={13} className="text-emerald-500" />Download Brochure</button>
                                          {compareMetricLabel && (
                                            <>
                                              <span className="text-gray-200 font-normal">|</span>
                                              <label className="flex items-center gap-1.5 cursor-pointer text-gray-500 hover:text-gray-700 select-none">
                                                <input
                                                  type="checkbox"
                                                  checked={checkedCollegesForCompare.includes(college.id)}
                                                  onChange={() => handleCompareCheckboxChange(college)}
                                                  className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 accent-blue-600"
                                                />
                                                Add To Compare
                                              </label>
                                            </>
                                          )}
                                        </div>
                                        <div className="inline-flex items-center gap-1.5 bg-[#FFFDE7] border border-[#FFF9C4] rounded-lg px-2.5 py-1 mt-3">
                                          <GraduationCap size={13} className="text-yellow-600 animate-pulse" />
                                          <span className="text-[11px] text-[#0a2540] font-bold">CD Score: <span className="text-yellow-700">{score}/1000</span></span>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-5 py-6 align-top w-48">
                                    <div className="flex flex-col">
                                      <span className="text-[15px] font-black text-emerald-600 leading-tight">{college.fees.split(' - ')[0]}</span>
                                      <span className="text-xs font-bold text-gray-700 mt-1 leading-snug">{courseName}</span>
                                      <span className="text-[11px] text-gray-400 font-semibold mt-0.5">{feesSubtitle}</span>
                                      <button
                                        onClick={() => openCompareForCollege(college, 'fees')}
                                        className="flex items-center gap-1 text-[11px] text-orange-600 hover:text-orange-700 hover:underline font-bold mt-4 justify-start cursor-pointer"
                                      >
                                        <ArrowUpDown size={11} />
                                        Compare {tableHeaders.fees}
                                      </button>
                                    </div>
                                  </td>
                                  <td className="px-5 py-6 align-top w-48">
                                    <div className="flex flex-col">
                                      <span className="text-[15px] font-black text-emerald-600 leading-tight">{avgPkgStr}</span>
                                      <span className="text-[11px] text-gray-400 font-semibold mt-0.5 leading-snug">{placementSubtitle}</span>
                                      {!isAcademicOnly && (<><span className="text-[14px] font-black text-emerald-600 mt-2.5 leading-tight">{highestPkgStr}</span><span className="text-[11px] text-gray-400 font-semibold mt-0.5 leading-snug">{highestSubtitle}</span></>)}
                                      {compareMetricLabel && (
                                        <button
                                          onClick={() => openCompareForCollege(college, 'placement')}
                                          className="flex items-center gap-1 text-[11px] text-orange-600 hover:text-orange-700 hover:underline font-bold mt-4 justify-start cursor-pointer"
                                        >
                                          <ArrowUpDown size={11} />
                                          {compareMetricLabel}
                                        </button>
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-5 py-6 align-top w-52">
                                    <div className="flex flex-col">
                                      <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-50 inline-block"></span><span className="text-sm font-black text-gray-800">{college.rating} / 5</span></div>
                                      <span className="text-[11px] text-gray-400 font-semibold mt-1">Based on {college.reviews} Reviews</span>
                                      <div className="inline-flex items-center justify-between bg-yellow-50/80 border border-yellow-100 rounded-lg px-2 py-1 mt-4 text-[11px] font-bold text-yellow-800 w-fit"><span>✓ {reviewTag}</span></div>
                                    </div>
                                  </td>
                                  <td className="px-5 py-6 align-top w-56">
                                    <div className="flex flex-col gap-2">
                                      {/* Rank text */}
                                      <div className="text-gray-700 text-sm font-semibold leading-normal">
                                        <span className="font-extrabold">#{rankNum}<sup>{rankSuffix}</sup></span>
                                        <span className="text-gray-400">/</span>
                                        <span className="text-orange-500 font-bold">{rankTotal}</span>
                                        <span className="text-gray-600"> in India for</span>
                                        <div className="text-xs font-bold text-gray-500 mt-0.5">{rankSubject}</div>
                                      </div>



                                      {/* Overlapping Circles Modal Trigger */}
                                      <button
                                        onClick={() => setSelectedCollegeForRanking(college)}
                                        className="flex items-center gap-2 bg-[#e3f2fd]/50 hover:bg-[#e3f2fd]/80 border border-[#bbdefb] px-2.5 py-1.5 rounded-full cursor-pointer transition-all w-fit text-[#1e88e5] hover:text-[#1565c0]"
                                      >
                                        <div className="flex -space-x-1.5">
                                          <div className="w-4.5 h-4.5 rounded-full bg-emerald-600 text-white text-[8px] font-black flex items-center justify-center border border-white shadow-sm" title="NIRF">N</div>
                                          <div className="w-4.5 h-4.5 rounded-full bg-amber-500 text-white text-[8px] font-black flex items-center justify-center border border-white shadow-sm" title="QS World">Q</div>
                                          <div className="w-4.5 h-4.5 rounded-full bg-red-600 text-white text-[8px] font-black flex items-center justify-center border border-white shadow-sm" title="THE">T</div>
                                        </div>
                                        <span className="text-[10px] font-black">+ {((college.id + 1) % 5) + 6} More</span>
                                        <ChevronDown size={11} className="text-[#90caf9]" />
                                      </button>
                                      <div className="flex items-center gap-1.5 mt-1 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                        <Award size={11} className="text-blue-500" />
                                        <span>{rankingLabel}</span>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : layout === 'list' ? (
                    <div className="flex flex-col gap-4">
                      {sortedInstitutions.map((college, index) => {
                        const { score, courseName, avgPkgStr, placementSubtitle, reviewTag, rankingStr, compareMetricLabel } = getEnrichedData(college);
                        const typeInfo = institutionTypes.find(t => t.value === college.institutionType);
                        return (
                          <div key={college.id} className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col md:flex-row gap-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                            <div className="w-full md:w-48 h-32 flex-shrink-0 rounded-xl overflow-hidden border border-gray-200 relative bg-gray-50">
                              <img src={college.image} alt={college.name} className="w-full h-full object-cover" loading="lazy" />
                              <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm text-white font-bold text-[10px] rounded-full uppercase tracking-wider">Rank #{index + 1}</span>
                            </div>
                            <div className="flex-1 flex flex-col justify-between min-w-0">
                              <div>
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <Link href={`/college/${college.id}`} className="font-bold text-[#0a2540] hover:text-blue-600 text-lg hover:underline leading-snug block">{college.name}</Link>
                                    <div className="text-xs text-gray-500 mt-1 font-medium">{cityName}, {city.state} | <span className="text-gray-400">{college.accreditation || 'Govt Approved'}</span></div>
                                  </div>
                                  <button onClick={() => toggleSave(college.id)} className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-all flex-shrink-0 cursor-pointer">
                                    <Heart size={14} className={savedColleges.includes(college.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'} />
                                  </button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-3">
                                  <span className="text-[11px] px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full font-semibold">{typeInfo?.label.replace(/s$/, '') || college.type}</span>
                                  <span className="text-[11px] px-2.5 py-0.5 bg-yellow-50 text-yellow-700 rounded-full font-semibold">Score: {score}/1000</span>
                                  <span className="text-[11px] px-2.5 py-0.5 bg-purple-50 text-purple-700 rounded-full font-semibold">{rankingStr}</span>
                                  <span className="text-[11px] px-2.5 py-0.5 bg-orange-50 text-orange-700 rounded-full font-semibold">{reviewTag}</span>
                                </div>
                              </div>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 pt-3 border-t border-gray-50 text-xs font-bold text-gray-500">
                                <button onClick={() => openActionModal(college, 'apply')} className="flex items-center gap-1 text-orange-600 hover:text-orange-700 hover:underline cursor-pointer"><ArrowRight size={13} className="text-orange-500" />Apply Now</button>
                                <span className="text-gray-200">|</span>
                                <button onClick={() => openActionModal(college, 'brochure')} className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer"><Download size={13} className="text-emerald-500" />Brochure</button>
                                {compareMetricLabel && (
                                  <>
                                    <span className="text-gray-200">|</span>
                                    <label className="flex items-center gap-1.5 cursor-pointer text-gray-500 hover:text-gray-700 select-none">
                                      <input
                                        type="checkbox"
                                        checked={checkedCollegesForCompare.includes(college.id)}
                                        onChange={() => handleCompareCheckboxChange(college)}
                                        className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 accent-blue-600"
                                      />
                                      Add To Compare
                                    </label>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="w-full md:w-56 bg-gray-50 rounded-xl border border-gray-200 p-4 flex flex-col justify-between gap-3 flex-shrink-0">
                              <div className="grid grid-cols-2 gap-2 text-center">
                                <div className="border-r border-gray-200 pr-2">
                                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{tableHeaders.fees}</div>
                                  <div className="text-[14px] font-black text-emerald-600 mt-1">{college.fees.split(' - ')[0]}</div>
                                  <div className="text-[9px] text-gray-500 font-semibold mt-0.5 line-clamp-1">{courseName}</div>
                                </div>
                                <div className="pl-2">
                                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{tableHeaders.metric}</div>
                                  <div className="text-[14px] font-black text-emerald-600 mt-1">{avgPkgStr}</div>
                                  <div className="text-[9px] text-gray-500 font-semibold mt-0.5">{placementSubtitle}</div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between border-t border-gray-200 pt-2 text-xs">
                                <div className="flex items-center gap-1"><Star size={12} className="text-yellow-500 fill-yellow-500" /><span className="font-bold text-gray-700">{college.rating}/5</span></div>
                                <span className="text-gray-400 font-medium">({college.reviews} reviews)</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {sortedInstitutions.map((college, index) => {
                        const { score, courseName, avgPkgStr, placementSubtitle, rankingStr, compareMetricLabel } = getEnrichedData(college);
                        const typeInfo = institutionTypes.find(t => t.value === college.institutionType);
                        return (
                          <div key={college.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                            <div className="h-44 bg-gray-150 relative">
                              <img src={college.image} alt={college.name} className="w-full h-full object-cover" loading="lazy" />
                              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Rank #{index + 1}</div>
                              <button onClick={() => toggleSave(college.id)} className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white shadow-sm transition-all cursor-pointer">
                                <Heart size={14} className={savedColleges.includes(college.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'} />
                              </button>
                              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[#0a2540] px-2.5 py-0.5 rounded-lg text-[10px] font-black shadow-sm">Score: {score}/1000</div>
                            </div>
                            <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                              <div>
                                <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{typeInfo?.label.replace(/s$/, '') || college.type}</span>
                                <Link href={`/college/${college.id}`} className="font-bold text-[#0a2540] hover:text-blue-600 text-[15px] hover:underline leading-snug mt-2 block line-clamp-2">{college.name}</Link>
                                <div className="text-[11px] text-gray-500 mt-1 font-medium">{cityName}, {city.state} | {college.accreditation || 'Govt Approved'}</div>
                                <div className="text-[11px] text-purple-700 font-bold mt-2">{rankingStr}</div>
                                {compareMetricLabel && (
                                  <label className="flex items-center gap-1.5 cursor-pointer text-gray-500 hover:text-gray-700 select-none text-[11px] font-bold mt-3">
                                    <input
                                      type="checkbox"
                                      checked={checkedCollegesForCompare.includes(college.id)}
                                      onChange={() => handleCompareCheckboxChange(college)}
                                      className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 accent-blue-600"
                                    />
                                    Add To Compare
                                  </label>
                                )}
                              </div>
                              <div className="grid grid-cols-2 gap-2 border-t border-b border-gray-100 py-3 text-center">
                                <div className="border-r border-gray-100 pr-2">
                                  <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{tableHeaders.fees}</div>
                                  <div className="text-xs font-black text-emerald-600 mt-0.5">{college.fees.split(' - ')[0]}</div>
                                  <div className="text-[8px] text-gray-500 font-semibold line-clamp-1 mt-0.5">{courseName}</div>
                                </div>
                                <div className="pl-2">
                                  <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{tableHeaders.metric}</div>
                                  <div className="text-xs font-black text-emerald-600 mt-0.5">{avgPkgStr}</div>
                                  <div className="text-[8px] text-gray-500 font-semibold mt-0.5">{placementSubtitle}</div>
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-50 border-t border-gray-100 px-4 py-3 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1"><Star size={12} className="text-yellow-500 fill-yellow-500" /><span className="text-xs font-bold text-gray-700">{college.rating}</span><span className="text-[10px] text-gray-400 font-medium">({college.reviews})</span></div>
                              <button onClick={() => openActionModal(college, 'apply')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] px-3.5 py-1.5 rounded-lg shadow-sm transition-all cursor-pointer">Apply Now</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              );
            })()
          )}
        </div>
      </section>

      {/* ───── POPULAR AREAS / LOCALITIES ───── */}
      <section className="py-12 md:py-14 bg-gradient-to-b from-white to-blue-50/30" id="popular-areas">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-3">
              <MapPin size={14} />
              <span>Localities</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540]">
              Popular Areas in {cityName}
            </h2>
            <p className="text-gray-500 mt-2">Find institutions near your preferred locality</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {popularAreas.map((area, i) => (
              <Link
                key={i}
                href={`/city/${citySlug || 'pune'}?area=${area.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group bg-white rounded-2xl border border-gray-200 p-4 text-center hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-2xl mb-2">{area.icon}</div>
                <h3 className="font-bold text-[#0a2540] text-sm group-hover:text-blue-600 transition-colors">{area.name}</h3>
                <div className="text-xs text-gray-400 mt-1">{area.colleges} Institutions</div>
                <div className="text-[10px] text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full mt-2 inline-block font-medium">
                  {area.type}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───── MAP EMBED / LOCATION SECTION ───── */}
      {city.mapEmbed && (
        <section className="py-12 bg-white" id="city-map">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="border border-gray-200 rounded-3xl overflow-hidden shadow-md h-96 relative">
              <iframe
                src={city.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${cityName} Location Map`}
              ></iframe>
            </div>
          </div>
        </section>
      )}

      {/* Ranking Details Modal */}
      {selectedCollegeForRanking && (() => {
        const rankingsList = getRankingsDetails(selectedCollegeForRanking);
        return (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-[#0a2540]/60 backdrop-blur-sm"
              onClick={() => setSelectedCollegeForRanking(null)}
            />
            {/* Modal Content */}
            <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl relative overflow-hidden z-10 animate-fade-in border border-gray-100 max-h-[85vh] flex flex-col">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#0a2540] to-[#1a5276] p-6 text-white relative">
                <button 
                  onClick={() => setSelectedCollegeForRanking(null)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
                <div className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider mb-1">Accreditation & Rankings</div>
                <h3 className="text-xl font-bold leading-snug pr-8">{selectedCollegeForRanking.name}</h3>
                <p className="text-xs text-blue-200/80 mt-1">{cityName}, {city.state}</p>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto space-y-4 flex-1">
                {rankingsList.map((rankItem, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-3 bg-gray-50 hover:bg-blue-50/30 rounded-2xl border border-gray-150 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                      <Award className="text-blue-600" size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-bold text-gray-800 text-sm truncate">{rankItem.agency}</h4>
                        <span className="text-[9px] bg-blue-100/70 text-blue-700 px-2 py-0.5 rounded-md font-bold uppercase shrink-0">{rankItem.year}</span>
                      </div>
                      <div className="text-[#0a2540] font-black text-[15px] mt-1">{rankItem.rank}</div>
                      <div className="text-[11px] text-gray-400 font-semibold mt-0.5">{rankItem.category}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-5 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-4">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Verified 2026</span>
                <button 
                  onClick={() => setSelectedCollegeForRanking(null)}
                  className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 cursor-pointer transition-all"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {checkedCollegesForCompare.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0a2540] text-white px-6 py-4 rounded-2xl shadow-2xl border border-blue-900/50 flex items-center gap-6 animate-slide-up max-w-[90vw] md:max-w-xl">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-black">
              {checkedCollegesForCompare.length}
            </div>
            <span className="text-xs md:text-sm font-semibold">
              Institution{checkedCollegesForCompare.length > 1 ? 's' : ''} selected to compare
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                const selected = topCollegesInCity.filter(c => checkedCollegesForCompare.includes(c.id));
                setCollegesToCompare(selected);
                setCompareHighlightSection(null);
                setIsCompareOpen(true);
              }}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-500/10 cursor-pointer"
            >
              Compare Now
            </button>
            <button
              onClick={() => setCheckedCollegesForCompare([])}
              className="p-2 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white rounded-xl transition-colors cursor-pointer"
              title="Clear selection"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

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
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0% { transform: translateY(0px); opacity: 0.3; }
          100% { transform: translateY(-20px); opacity: 0.8; }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
