import { CollegeInCity } from '@/data/cityData';

/* ─── Per-Category Table Header Config ─── */
export const TABLE_HEADER_CONFIG: Record<string, { institution: string; fees: string; metric: string; ranking: string }> = {
  UNIVERSITY:           { institution: 'University Name',  fees: 'Average Fee',           metric: 'Placement Rate',       ranking: 'NIRF / QS / NAAC' },
  COLLEGE:              { institution: 'College Name',     fees: 'Course Fee',            metric: 'Average Package',       ranking: 'NIRF / NAAC'      },
  SCHOOL:               { institution: 'School Name',      fees: 'Annual Fee',            metric: 'Student Outcomes',      ranking: 'Board Rating'     },
  LIBRARY:              { institution: 'Library Name',     fees: 'Membership Fee',        metric: 'Resources Available',   ranking: 'Popularity Rank'  },
  COACHING:             { institution: 'Institute Name',   fees: 'Course Fee',            metric: 'Selection Rate',        ranking: 'Success Ranking'  },
  TRAINING:             { institution: 'Training Center',  fees: 'Course Fee',            metric: 'Placement Assistance',  ranking: 'Industry Rating'  },
  TRAINING_CENTER:      { institution: 'Training Center',  fees: 'Course Fee',            metric: 'Placement Assistance',  ranking: 'Industry Rating'  },
  LANGUAGE_CENTER:      { institution: 'Language Center',  fees: 'Course Fee',            metric: 'Languages Offered',     ranking: 'Popularity Rank'  },
  CONSULTANT:           { institution: 'Consultant Name',  fees: 'Service Fee',           metric: 'Success Rate',          ranking: 'Popularity Rank'  },
  RESEARCH:             { institution: 'Research Center',  fees: 'Research Funding',      metric: 'Projects Completed',    ranking: 'Research Ranking' },
  RESEARCH_CENTER:      { institution: 'Research Center',  fees: 'Research Funding',      metric: 'Projects Completed',    ranking: 'Research Ranking' },
  SCHOLARSHIP_PROVIDER: { institution: 'Scholarship Name', fees: 'Scholarship Amount',    metric: 'Beneficiaries Awarded', ranking: 'Popularity Rank'  },
  HOSTEL:               { institution: 'Hostel Name',      fees: 'Monthly Rent',          metric: 'Occupancy Rate',        ranking: 'Hostel Ranking'   },
  ALL:                  { institution: 'Institution',      fees: 'Course Fees',           metric: 'Placement',             ranking: 'Ranking'          },
};

/* ─── Fee parsing helpers ─── */
export const getMinFee = (feeStr: string) => {
  if (!feeStr) return 0;
  const numbers = feeStr.replace(/,/g, '').match(/\d+/g);
  if (!numbers || numbers.length === 0) return 0;
  return parseInt(numbers[0], 10);
};

export const getMaxFee = (feeStr: string) => {
  if (!feeStr) return 0;
  const numbers = feeStr.replace(/,/g, '').match(/\d+/g);
  if (!numbers || numbers.length === 0) return 0;
  return numbers.length > 1 ? parseInt(numbers[1], 10) : parseInt(numbers[0], 10);
};

/* ─── Dynamic enrichment generators for mockup details ─── */
export interface EnrichedData {
  score: number;
  courseName: string;
  feesSubtitle: string;
  avgPkgStr: string;
  highestPkgStr: string;
  placementSubtitle: string;
  highestSubtitle: string;
  compareMetricLabel: string;
  reviewTag: string;
  rankingStr: string;
  rankingLabel: string;
  isAcademicOnly: boolean;
  rankNum: number;
  rankTotal: number;
  rankSuffix: string;
  rankSubject: string;
}

export const getEnrichedData = (college: CollegeInCity): EnrichedData => {
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
  else if (college.institutionType === 'LANGUAGE_CENTER')      courseName = college.courses?.[0] ? `${college.courses[0]} & more` : 'Foreign Language Course';
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
  else if (college.institutionType === 'LANGUAGE_CENTER')      feesSubtitle = '- Course Fee';

  // Metric / placement data
  const isAcademicOnly = ['SCHOOL', 'LIBRARY', 'HOSTEL', 'SCHOLARSHIP_PROVIDER', 'CONSULTANT'].includes(college.institutionType);
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
  } else if (college.institutionType === 'LANGUAGE_CENTER') {
    avgPkgStr = `${college.language?.length || (id % 5) + 5} Languages`;
    highestPkgStr = `${(id % 900) + 600}+`;
    placementSubtitle = 'Languages Offered';
    highestSubtitle = 'Students Trained';
    compareMetricLabel = 'Compare Centers';
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
  const rankingLabel = TABLE_HEADER_CONFIG[college.institutionType]?.ranking || 'Ranking 2026';

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
  } else if (college.institutionType === 'LANGUAGE_CENTER') {
    rankNum = (id % 6) + 1;
    rankTotal = 50;
    rankSubject = 'Language Training';
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

/* ─── Ranking details (modal content) ─── */
export interface RankingDetail {
  agency: string;
  rank: string;
  year: string;
  category: string;
}

export const getRankingsDetails = (college: CollegeInCity, cityName: string): RankingDetail[] => {
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
