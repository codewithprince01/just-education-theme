// City Page Data - Comprehensive education directory data for city pages

export interface CityMetaItem {
  name: string;
  state: string;
  tagline: string;
  description: string;
  totalColleges: number;
  totalUniversities: number;
  totalStudents: string;
  avgFees: string;
  heroImage: string;
  mapEmbed?: string;
}

export const cityMeta: Record<string, CityMetaItem> = {
  pune: {
    name: 'Pune',
    state: 'Maharashtra',
    tagline: 'The Oxford of the East',
    description: 'Pune is one of India\'s top education hubs with over 800+ colleges, world-class universities, and a thriving student community of 10 lakh+ students.',
    totalColleges: 811,
    totalUniversities: 12,
    totalStudents: '10L+',
    avgFees: '₹45,000 - ₹2,50,000',
    heroImage: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e84?w=1200&h=600&fit=crop',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242118.14199895498!2d73.72288629407647!3d18.524564857063045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1',
  },
  mumbai: {
    name: 'Mumbai',
    state: 'Maharashtra',
    tagline: 'The City of Dreams',
    description: 'Mumbai hosts premier institutions like IIT Bombay, TISS, and numerous top colleges across all streams.',
    totalColleges: 1200,
    totalUniversities: 18,
    totalStudents: '15L+',
    avgFees: '₹50,000 - ₹4,00,000',
    heroImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&h=600&fit=crop',
  },
  bangalore: {
    name: 'Bangalore',
    state: 'Karnataka',
    tagline: 'The Silicon Valley of India',
    description: 'Bangalore is a major educational hub with IISc, IIM-B, and hundreds of engineering colleges.',
    totalColleges: 950,
    totalUniversities: 14,
    totalStudents: '12L+',
    avgFees: '₹60,000 - ₹3,50,000',
    heroImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1200&h=600&fit=crop',
  },
  'delhi-ncr': {
    name: 'Delhi NCR',
    state: 'Delhi',
    tagline: 'The Capital of Higher Education',
    description: 'Delhi NCR is home to DU, JNU, IIT Delhi and a vast network of colleges across all streams.',
    totalColleges: 1400,
    totalUniversities: 20,
    totalStudents: '18L+',
    avgFees: '₹40,000 - ₹3,50,000',
    heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&h=600&fit=crop',
  },
  hyderabad: {
    name: 'Hyderabad',
    state: 'Telangana',
    tagline: 'The City of Pearls',
    description: 'Hyderabad offers premier institutions like IIT Hyderabad, ISB, and leading engineering colleges.',
    totalColleges: 780,
    totalUniversities: 11,
    totalStudents: '9L+',
    avgFees: '₹45,000 - ₹3,00,000',
    heroImage: 'https://images.unsplash.com/photo-1572445271230-a78b5944a659?w=1200&h=600&fit=crop',
  },
  chennai: {
    name: 'Chennai',
    state: 'Tamil Nadu',
    tagline: 'The Detroit of India',
    description: 'Chennai hosts IIT Madras, Anna University, and a strong network of engineering and medical colleges.',
    totalColleges: 870,
    totalUniversities: 13,
    totalStudents: '10L+',
    avgFees: '₹40,000 - ₹2,80,000',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&h=600&fit=crop',
  },
  kolkata: {
    name: 'Kolkata',
    state: 'West Bengal',
    tagline: 'The City of Joy',
    description: 'Kolkata is known for Presidency University, Jadavpur University, and IIM Calcutta.',
    totalColleges: 690,
    totalUniversities: 10,
    totalStudents: '8L+',
    avgFees: '₹30,000 - ₹2,50,000',
    heroImage: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=1200&h=600&fit=crop',
  },
  bhopal: {
    name: 'Bhopal',
    state: 'Madhya Pradesh',
    tagline: 'The City of Lakes',
    description: 'Bhopal is a growing education hub with MANIT, AIIMS Bhopal, and several engineering colleges.',
    totalColleges: 310,
    totalUniversities: 6,
    totalStudents: '3L+',
    avgFees: '₹25,000 - ₹2,00,000',
    heroImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&h=600&fit=crop',
  },
  indore: {
    name: 'Indore',
    state: 'Madhya Pradesh',
    tagline: 'The Commercial Capital of MP',
    description: 'Indore is home to IIT Indore, IIM Indore, and a wide range of management and engineering colleges.',
    totalColleges: 340,
    totalUniversities: 7,
    totalStudents: '3.5L+',
    avgFees: '₹25,000 - ₹2,20,000',
    heroImage: 'https://images.unsplash.com/photo-1601381718415-d4ecedce683f?w=1200&h=600&fit=crop',
  },
  nagpur: {
    name: 'Nagpur',
    state: 'Maharashtra',
    tagline: 'The Orange City',
    description: 'Nagpur features VNIT, NLU Nagpur, and a solid base of engineering and law colleges.',
    totalColleges: 280,
    totalUniversities: 5,
    totalStudents: '2.5L+',
    avgFees: '₹25,000 - ₹2,00,000',
    heroImage: 'https://images.unsplash.com/photo-1573324896608-a3c8e6a8c4c5?w=1200&h=600&fit=crop',
  },
};

export interface CitySubcategory {
  name: string;
  count: number;
  slug: string;
}

export interface CityEducationCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  count: number;
  subcategories: CitySubcategory[];
}

// Education categories with subcategories for city page
export const cityEducationCategories: CityEducationCategory[] = [
  {
    id: 'engineering',
    title: 'Engineering Colleges',
    icon: '⚙️',
    color: '#1565C0',
    count: 142,
    subcategories: [
      { name: 'Computer Science Engineering', count: 89, slug: 'cse' },
      { name: 'Mechanical Engineering', count: 67, slug: 'mechanical' },
      { name: 'Civil Engineering', count: 54, slug: 'civil' },
      { name: 'Electronics & Telecommunication', count: 71, slug: 'entc' },
      { name: 'Information Technology', count: 82, slug: 'it' },
      { name: 'Electrical Engineering', count: 45, slug: 'electrical' },
      { name: 'Artificial Intelligence & ML', count: 38, slug: 'aiml' },
      { name: 'Data Science', count: 29, slug: 'data-science' },
    ],
  },
  {
    id: 'management',
    title: 'MBA / Management Colleges',
    icon: '💼',
    color: '#7B1FA2',
    count: 98,
    subcategories: [
      { name: 'MBA Finance', count: 78, slug: 'mba-finance' },
      { name: 'MBA Marketing', count: 72, slug: 'mba-marketing' },
      { name: 'MBA HR', count: 65, slug: 'mba-hr' },
      { name: 'MBA Operations', count: 48, slug: 'mba-operations' },
      { name: 'PGDM Programs', count: 34, slug: 'pgdm' },
      { name: 'Executive MBA', count: 22, slug: 'executive-mba' },
    ],
  },
  {
    id: 'medical',
    title: 'Medical Colleges',
    icon: '🏥',
    color: '#C62828',
    count: 45,
    subcategories: [
      { name: 'MBBS Colleges', count: 12, slug: 'mbbs' },
      { name: 'BDS Colleges', count: 8, slug: 'bds' },
      { name: 'BAMS (Ayurveda)', count: 6, slug: 'bams' },
      { name: 'BHMS (Homeopathy)', count: 5, slug: 'bhms' },
      { name: 'Physiotherapy Colleges', count: 9, slug: 'physiotherapy' },
      { name: 'Nursing Colleges', count: 15, slug: 'nursing' },
    ],
  },
  {
    id: 'science',
    title: 'Science Colleges',
    icon: '🔬',
    color: '#00838F',
    count: 87,
    subcategories: [
      { name: 'B.Sc Physics', count: 45, slug: 'bsc-physics' },
      { name: 'B.Sc Chemistry', count: 42, slug: 'bsc-chemistry' },
      { name: 'B.Sc Mathematics', count: 38, slug: 'bsc-maths' },
      { name: 'B.Sc Computer Science', count: 56, slug: 'bsc-cs' },
      { name: 'B.Sc Biotechnology', count: 23, slug: 'bsc-biotech' },
      { name: 'M.Sc Programs', count: 34, slug: 'msc' },
    ],
  },
  {
    id: 'commerce',
    title: 'Commerce & CA Colleges',
    icon: '📊',
    color: '#2E7D32',
    count: 76,
    subcategories: [
      { name: 'B.Com Colleges', count: 65, slug: 'bcom' },
      { name: 'M.Com Colleges', count: 32, slug: 'mcom' },
      { name: 'CA Coaching', count: 28, slug: 'ca' },
      { name: 'CS Coaching', count: 18, slug: 'cs' },
      { name: 'BBA Colleges', count: 45, slug: 'bba' },
    ],
  },
  {
    id: 'law',
    title: 'Law Colleges',
    icon: '⚖️',
    color: '#37474F',
    count: 34,
    subcategories: [
      { name: 'BA LLB Colleges', count: 22, slug: 'ba-llb' },
      { name: 'BBA LLB Colleges', count: 14, slug: 'bba-llb' },
      { name: 'LLM Colleges', count: 10, slug: 'llm' },
      { name: 'Diploma in Law', count: 8, slug: 'diploma-law' },
    ],
  },
  {
    id: 'pharmacy',
    title: 'Pharmacy Colleges',
    icon: '💊',
    color: '#1B5E20',
    count: 38,
    subcategories: [
      { name: 'B.Pharm Colleges', count: 28, slug: 'bpharm' },
      { name: 'D.Pharm Colleges', count: 22, slug: 'dpharm' },
      { name: 'M.Pharm Colleges', count: 15, slug: 'mpharm' },
      { name: 'Pharm.D Colleges', count: 8, slug: 'pharmd' },
    ],
  },
  {
    id: 'design',
    title: 'Design & Architecture',
    icon: '🎨',
    color: '#AD1457',
    count: 29,
    subcategories: [
      { name: 'B.Arch Colleges', count: 14, slug: 'barch' },
      { name: 'Fashion Design', count: 12, slug: 'fashion-design' },
      { name: 'Interior Design', count: 10, slug: 'interior-design' },
      { name: 'Graphic Design', count: 8, slug: 'graphic-design' },
      { name: 'Product Design', count: 5, slug: 'product-design' },
    ],
  },
  {
    id: 'computer-application',
    title: 'Computer Applications',
    icon: '💻',
    color: '#283593',
    count: 95,
    subcategories: [
      { name: 'BCA Colleges', count: 72, slug: 'bca' },
      { name: 'MCA Colleges', count: 48, slug: 'mca' },
      { name: 'B.Sc IT Colleges', count: 56, slug: 'bsc-it' },
      { name: 'Diploma in CS', count: 34, slug: 'diploma-cs' },
    ],
  },
  {
    id: 'arts',
    title: 'Arts & Humanities',
    icon: '📚',
    color: '#E65100',
    count: 62,
    subcategories: [
      { name: 'BA Programs', count: 52, slug: 'ba' },
      { name: 'MA Programs', count: 28, slug: 'ma' },
      { name: 'Mass Communication', count: 15, slug: 'mass-comm' },
      { name: 'Journalism', count: 12, slug: 'journalism' },
      { name: 'Psychology', count: 18, slug: 'psychology' },
    ],
  },
  {
    id: 'hotel-management',
    title: 'Hotel Management',
    icon: '🏨',
    color: '#F57F17',
    count: 22,
    subcategories: [
      { name: 'BHM Colleges', count: 15, slug: 'bhm' },
      { name: 'Diploma in Hotel Mgmt', count: 12, slug: 'diploma-hm' },
      { name: 'Culinary Arts', count: 8, slug: 'culinary' },
    ],
  },
  {
    id: 'aviation',
    title: 'Aviation & Pilot Training',
    icon: '✈️',
    color: '#0277BD',
    count: 8,
    subcategories: [
      { name: 'Pilot Training', count: 3, slug: 'pilot' },
      { name: 'Aviation Management', count: 4, slug: 'aviation-mgmt' },
      { name: 'Cabin Crew Training', count: 5, slug: 'cabin-crew' },
    ],
  },
];

export interface InstitutionTypeItem {
  value: string;
  label: string;
  icon: string;
}

// Institution Types - top-level facet shown on the city page
export const institutionTypes: InstitutionTypeItem[] = [
  { value: 'UNIVERSITY', label: 'Universities', icon: '🎓' },
  { value: 'COLLEGE', label: 'Colleges', icon: '🏛️' },
  { value: 'SCHOOL', label: 'Schools', icon: '🏫' },
  { value: 'LIBRARY', label: 'Libraries', icon: '📚' },
  { value: 'COACHING', label: 'Coaching Centers', icon: '✏️' },
  { value: 'TRAINING_CENTER', label: 'Training Centers', icon: '🛠️' },
  { value: 'CONSULTANT', label: 'Consultants', icon: '🧭' },
  { value: 'RESEARCH_CENTER', label: 'Research Centers', icon: '🔬' },
  { value: 'SCHOLARSHIP_PROVIDER', label: 'Scholarship Providers', icon: '🎗️' },
  { value: 'HOSTEL', label: 'Hostels', icon: '🏠' },
];

// Course filter tabs
export const courseFilters: string[] = [
  'All Courses', 'B.Tech', 'MBA', 'M.Tech', 'MBBS', 'B.Com',
  'B.Sc', 'B.Sc (Nursing)', 'BA', 'BBA', 'BCA',
];

export interface FilterGroupItem {
  key: string;
  label: string;
  options: string[];
}

const academicFilters: FilterGroupItem[] = [
  { key: 'courseTags', label: 'Degree', options: courseFilters.slice(1) },
  { key: 'programType', label: 'Program Type', options: ['Full Time', 'Part Time', 'Distance', 'Online'] },
  { key: 'collegeCategory', label: 'Type Of College', options: ['Government', 'Private', 'Autonomous', 'Deemed University'] },
  { key: 'examAccepted', label: 'Entrance Exam Accepted', options: ['JEE', 'CAT', 'NEET', 'CLAT', 'CUET'] },
  { key: 'genderAccepted', label: 'Gender Accepted', options: ['Coed', 'Boys', 'Girls'] },
];

export const institutionFilterConfig: Record<string, FilterGroupItem[]> = {
  UNIVERSITY: academicFilters,
  COLLEGE: academicFilters,
  SCHOOL: [
    { key: 'board', label: 'Board', options: ['CBSE', 'ICSE', 'State Board', 'IB', 'IGCSE'] },
    { key: 'schoolType', label: 'School Type', options: ['Day School', 'Boarding', 'Day-cum-Boarding'] },
    { key: 'medium', label: 'Medium of Instruction', options: ['English', 'Hindi', 'Regional'] },
    { key: 'genderAccepted', label: 'Gender Accepted', options: ['Coed', 'Boys', 'Girls'] },
  ],
  LIBRARY: [
    { key: 'libraryType', label: 'Library Type', options: ['Public', 'Private', 'Digital', 'Reference Only'] },
    { key: 'timing', label: 'Timing', options: ['24x7', 'Day Time Only', 'Extended Hours'] },
  ],
  COACHING: [
    { key: 'examPrep', label: 'Exam Prepared For', options: ['JEE', 'NEET', 'CAT', 'CLAT', 'UPSC', 'SSC'] },
    { key: 'mode', label: 'Mode', options: ['Online', 'Offline', 'Hybrid'] },
  ],
  TRAINING_CENTER: [
    { key: 'skillCategory', label: 'Skill Category', options: ['Digital Marketing', 'IT & Software', 'Finance & Accounting', 'Soft Skills'] },
    { key: 'mode', label: 'Mode', options: ['Online', 'Offline', 'Hybrid'] },
  ],
  CONSULTANT: [
    { key: 'serviceType', label: 'Service Type', options: ['Admission Guidance', 'Study Abroad', 'Career Counselling', 'Loan Assistance'] },
    { key: 'mode', label: 'Mode', options: ['Online', 'Offline', 'Hybrid'] },
  ],
  RESEARCH_CENTER: [
    { key: 'researchArea', label: 'Research Area', options: ['Engineering & Technology', 'Life Sciences', 'Social Sciences', 'Pure Sciences'] },
    { key: 'fundingType', label: 'Funding Type', options: ['Government Funded', 'Private Funded', 'Industry Sponsored'] },
  ],
  SCHOLARSHIP_PROVIDER: [
    { key: 'scholarshipType', label: 'Scholarship Type', options: ['Merit-Based', 'Need-Based', 'Minority', 'Girl Child', 'Sports'] },
  ],
  HOSTEL: [
    { key: 'hostelType', label: 'Hostel Type', options: ['Boys', 'Girls', 'Co-ed'] },
    { key: 'roomType', label: 'Room Type', options: ['AC', 'Non-AC', 'Shared', 'Single'] },
  ],
};

export interface CollegeInCity {
  id: number;
  name: string;
  type: string;
  institutionType: string;
  rating: number;
  reviews: number;
  accreditation?: string;
  established: number;
  image: string;
  courses: string[];
  courseTags: string[];
  programType?: string;
  collegeCategory?: string;
  examAccepted?: string[];
  genderAccepted?: string;
  fees: string;
  placement: string;
  tag?: string;
  board?: string;
  schoolType?: string;
  medium?: string;
  libraryType?: string;
  timing?: string;
  examPrep?: string[];
  mode?: string;
  skillCategory?: string;
  serviceType?: string;
  researchArea?: string;
  fundingType?: string;
  scholarshipType?: string[];
  hostelType?: string;
  roomType?: string[];
}

// Top Institutions for City
export const topCollegesInCity: CollegeInCity[] = [
  {
    "id": 1,
    "name": "Savitribai Phule Pune University",
    "type": "University",
    "institutionType": "UNIVERSITY",
    "rating": 4.0,
    "reviews": 100,
    "accreditation": "Govt Approved",
    "established": 1950,
    "image": "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop",
    "courses": [
      "Engineering",
      "Management",
      "Science",
      "Commerce",
      "Law"
    ],
    "courseTags": [
      "B.Tech",
      "MBA",
      "B.Sc"
    ],
    "fees": "\u20b930000 - \u20b9150000",
    "placement": "80%",
    "tag": "Top Rated",
    "programType": "Full Time",
    "collegeCategory": "Government",
    "examAccepted": [
      "JEE",
      "CAT"
    ],
    "genderAccepted": "Coed"
  },
  {
    "id": 2,
    "name": "Symbiosis International University",
    "type": "University",
    "institutionType": "UNIVERSITY",
    "rating": 4.1,
    "reviews": 343,
    "accreditation": "ISO Certified",
    "established": 1957,
    "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=250&fit=crop",
    "courses": [
      "Engineering",
      "Management",
      "Science",
      "Commerce",
      "Law"
    ],
    "courseTags": [
      "B.Tech",
      "MBA",
      "B.Sc"
    ],
    "fees": "\u20b945000 - \u20b9200000",
    "placement": "81%",
    "tag": "Popular",
    "programType": "Full Time",
    "collegeCategory": "Private",
    "examAccepted": [
      "JEE",
      "CAT"
    ],
    "genderAccepted": "Coed"
  },
  {
    "id": 3,
    "name": "MIT World Peace University",
    "type": "University",
    "institutionType": "UNIVERSITY",
    "rating": 4.2,
    "reviews": 586,
    "accreditation": "Govt Approved",
    "established": 1964,
    "image": "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=250&fit=crop",
    "courses": [
      "Engineering",
      "Management",
      "Science",
      "Commerce",
      "Law"
    ],
    "courseTags": [
      "B.Tech",
      "MBA",
      "B.Sc"
    ],
    "fees": "\u20b960000 - \u20b9250000",
    "placement": "82%",
    "tag": "",
    "programType": "Full Time",
    "collegeCategory": "Government",
    "examAccepted": [
      "JEE",
      "CAT"
    ],
    "genderAccepted": "Coed"
  },
  {
    "id": 4,
    "name": "Bharati Vidyapeeth Deemed University",
    "type": "University",
    "institutionType": "UNIVERSITY",
    "rating": 4.3,
    "reviews": 829,
    "accreditation": "ISO Certified",
    "established": 1971,
    "image": "https://images.unsplash.com/photo-1498243691581-b145c3f54a91?w=400&h=250&fit=crop",
    "courses": [
      "Engineering",
      "Management",
      "Science",
      "Commerce",
      "Law"
    ],
    "courseTags": [
      "B.Tech",
      "MBA",
      "B.Sc"
    ],
    "fees": "\u20b975000 - \u20b9300000",
    "placement": "83%",
    "tag": "",
    "programType": "Full Time",
    "collegeCategory": "Private",
    "examAccepted": [
      "JEE",
      "CAT"
    ],
    "genderAccepted": "Coed"
  },
  {
    "id": 5,
    "name": "DY Patil International University",
    "type": "University",
    "institutionType": "UNIVERSITY",
    "rating": 4.4,
    "reviews": 1025,
    "accreditation": "Govt Approved",
    "established": 1978,
    "image": "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=400&h=250&fit=crop",
    "courses": [
      "Engineering",
      "Management",
      "Science",
      "Commerce",
      "Law"
    ],
    "courseTags": [
      "B.Tech",
      "MBA",
      "B.Sc"
    ],
    "fees": "\u20b990000 - \u20b9350000",
    "placement": "84%",
    "tag": "",
    "programType": "Full Time",
    "collegeCategory": "Government",
    "examAccepted": [
      "JEE",
      "CAT"
    ],
    "genderAccepted": "Coed"
  },
  {
    "id": 6,
    "name": "FLAME University",
    "type": "University",
    "institutionType": "UNIVERSITY",
    "rating": 4.5,
    "reviews": 1268,
    "accreditation": "ISO Certified",
    "established": 1985,
    "image": "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=250&fit=crop",
    "courses": [
      "Engineering",
      "Management",
      "Science",
      "Commerce",
      "Law"
    ],
    "courseTags": [
      "B.Tech",
      "MBA",
      "B.Sc"
    ],
    "fees": "\u20b9105000 - \u20b9400000",
    "placement": "85%",
    "tag": "",
    "programType": "Full Time",
    "collegeCategory": "Private",
    "examAccepted": [
      "JEE",
      "CAT"
    ],
    "genderAccepted": "Coed"
  },
  {
    "id": 7,
    "name": "Ajeenkya DY Patil University",
    "type": "University",
    "institutionType": "UNIVERSITY",
    "rating": 4.0,
    "reviews": 1511,
    "accreditation": "Govt Approved",
    "established": 1992,
    "image": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
    "courses": [
      "Engineering",
      "Management",
      "Science",
      "Commerce",
      "Law"
    ],
    "courseTags": [
      "B.Tech",
      "MBA",
      "B.Sc"
    ],
    "fees": "\u20b9120000 - \u20b9450000",
    "placement": "86%",
    "tag": "",
    "programType": "Full Time",
    "collegeCategory": "Government",
    "examAccepted": [
      "JEE",
      "CAT"
    ],
    "genderAccepted": "Coed"
  },
  {
    "id": 8,
    "name": "Spicer Adventist University",
    "type": "University",
    "institutionType": "UNIVERSITY",
    "rating": 4.1,
    "reviews": 1754,
    "accreditation": "ISO Certified",
    "established": 1999,
    "image": "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=400&h=250&fit=crop",
    "courses": [
      "Engineering",
      "Management",
      "Science",
      "Commerce",
      "Law"
    ],
    "courseTags": [
      "B.Tech",
      "MBA",
      "B.Sc"
    ],
    "fees": "\u20b9135000 - \u20b9500000",
    "placement": "87%",
    "tag": "",
    "programType": "Full Time",
    "collegeCategory": "Private",
    "examAccepted": [
      "JEE",
      "CAT"
    ],
    "genderAccepted": "Coed"
  },
  {
    "id": 9,
    "name": "Pune Institute of Business Studies",
    "type": "University",
    "institutionType": "UNIVERSITY",
    "rating": 4.2,
    "reviews": 1950,
    "accreditation": "Govt Approved",
    "established": 2006,
    "image": "https://images.unsplash.com/photo-1525921429573-0aa8899b591d?w=400&h=250&fit=crop",
    "courses": [
      "Engineering",
      "Management",
      "Science",
      "Commerce",
      "Law"
    ],
    "courseTags": [
      "B.Tech",
      "MBA",
      "B.Sc"
    ],
    "fees": "\u20b9150000 - \u20b9550000",
    "placement": "88%",
    "tag": "",
    "programType": "Full Time",
    "collegeCategory": "Government",
    "examAccepted": [
      "JEE",
      "CAT"
    ],
    "genderAccepted": "Coed"
  },
  {
    "id": 10,
    "name": "Symbiosis Skills and Professional University",
    "type": "University",
    "institutionType": "UNIVERSITY",
    "rating": 4.3,
    "reviews": 2193,
    "accreditation": "ISO Certified",
    "established": 2013,
    "image": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=250&fit=crop",
    "courses": [
      "Engineering",
      "Management",
      "Science",
      "Commerce",
      "Law"
    ],
    "courseTags": [
      "B.Tech",
      "MBA",
      "B.Sc"
    ],
    "fees": "\u20b9165000 - \u20b9600000",
    "placement": "89%",
    "tag": "",
    "programType": "Full Time",
    "collegeCategory": "Private",
    "examAccepted": [
      "JEE",
      "CAT"
    ],
    "genderAccepted": "Coed"
  },
  {
    "id": 11,
    "name": "Vishwakarma Institute of Technology",
    "type": "Autonomous College",
    "institutionType": "COLLEGE",
    "rating": 4.0,
    "reviews": 100,
    "accreditation": "Govt Approved",
    "established": 1950,
    "image": "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=400&h=250&fit=crop",
    "courses": [
      "Engineering",
      "Science",
      "Commerce",
      "Arts"
    ],
    "courseTags": [
      "B.Tech",
      "B.Sc",
      "B.Com"
    ],
    "fees": "\u20b915000 - \u20b9100000",
    "placement": "75%",
    "tag": "Top Rated",
    "programType": "Full Time",
    "collegeCategory": "Autonomous",
    "examAccepted": [
      "JEE",
      "CUET"
    ],
    "genderAccepted": "Coed"
  },
  {
    "id": 12,
    "name": "Fergusson College",
    "type": "Private College",
    "institutionType": "COLLEGE",
    "rating": 4.1,
    "reviews": 343,
    "accreditation": "ISO Certified",
    "established": 1957,
    "image": "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=400&h=250&fit=crop",
    "courses": [
      "Engineering",
      "Science",
      "Commerce",
      "Arts"
    ],
    "courseTags": [
      "B.Tech",
      "B.Sc",
      "B.Com"
    ],
    "fees": "\u20b920000 - \u20b9120000",
    "placement": "76%",
    "tag": "Popular",
    "programType": "Full Time",
    "collegeCategory": "Private",
    "examAccepted": [
      "JEE",
      "CUET"
    ],
    "genderAccepted": "Coed"
  },
  {
    "id": 13,
    "name": "COEP Technological University",
    "type": "Autonomous College",
    "institutionType": "COLLEGE",
    "rating": 4.2,
    "reviews": 586,
    "accreditation": "Govt Approved",
    "established": 1964,
    "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop",
    "courses": [
      "Engineering",
      "Science",
      "Commerce",
      "Arts"
    ],
    "courseTags": [
      "B.Tech",
      "B.Sc",
      "B.Com"
    ],
    "fees": "\u20b925000 - \u20b9140000",
    "placement": "77%",
    "tag": "",
    "programType": "Full Time",
    "collegeCategory": "Autonomous",
    "examAccepted": [
      "JEE",
      "CUET"
    ],
    "genderAccepted": "Coed"
  },
  {
    "id": 14,
    "name": "Pune Institute of Computer Technology",
    "type": "Private College",
    "institutionType": "COLLEGE",
    "rating": 4.3,
    "reviews": 829,
    "accreditation": "ISO Certified",
    "established": 1971,
    "image": "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=400&h=250&fit=crop",
    "courses": [
      "Engineering",
      "Science",
      "Commerce",
      "Arts"
    ],
    "courseTags": [
      "B.Tech",
      "B.Sc",
      "B.Com"
    ],
    "fees": "\u20b930000 - \u20b9160000",
    "placement": "78%",
    "tag": "",
    "programType": "Full Time",
    "collegeCategory": "Private",
    "examAccepted": [
      "JEE",
      "CUET"
    ],
    "genderAccepted": "Coed"
  },
  {
    "id": 15,
    "name": "Brihan Maharashtra College of Commerce",
    "type": "Autonomous College",
    "institutionType": "COLLEGE",
    "rating": 4.4,
    "reviews": 1025,
    "accreditation": "Govt Approved",
    "established": 1978,
    "image": "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?w=400&h=250&fit=crop",
    "courses": [
      "Engineering",
      "Science",
      "Commerce",
      "Arts"
    ],
    "courseTags": [
      "B.Tech",
      "B.Sc",
      "B.Com"
    ],
    "fees": "\u20b935000 - \u20b9180000",
    "placement": "79%",
    "tag": "",
    "programType": "Full Time",
    "collegeCategory": "Autonomous",
    "examAccepted": [
      "JEE",
      "CUET"
    ],
    "genderAccepted": "Coed"
  },
  {
    "id": 16,
    "name": "Symbiosis College of Arts and Commerce",
    "type": "Private College",
    "institutionType": "COLLEGE",
    "rating": 4.5,
    "reviews": 1268,
    "accreditation": "ISO Certified",
    "established": 1985,
    "image": "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=400&h=250&fit=crop",
    "courses": [
      "Engineering",
      "Science",
      "Commerce",
      "Arts"
    ],
    "courseTags": [
      "B.Tech",
      "B.Sc",
      "B.Com"
    ],
    "fees": "\u20b940000 - \u20b9200000",
    "placement": "80%",
    "tag": "",
    "programType": "Full Time",
    "collegeCategory": "Private",
    "examAccepted": [
      "JEE",
      "CUET"
    ],
    "genderAccepted": "Coed"
  },
  {
    "id": 17,
    "name": "Sinhgad College of Engineering",
    "type": "Autonomous College",
    "institutionType": "COLLEGE",
    "rating": 4.0,
    "reviews": 1511,
    "accreditation": "Govt Approved",
    "established": 1992,
    "image": "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?w=400&h=250&fit=crop",
    "courses": [
      "Engineering",
      "Science",
      "Commerce",
      "Arts"
    ],
    "courseTags": [
      "B.Tech",
      "B.Sc",
      "B.Com"
    ],
    "fees": "\u20b945000 - \u20b9220000",
    "placement": "81%",
    "tag": "",
    "programType": "Full Time",
    "collegeCategory": "Autonomous",
    "examAccepted": [
      "JEE",
      "CUET"
    ],
    "genderAccepted": "Coed"
  },
  {
    "id": 18,
    "name": "Modern College of Arts, Science and Commerce",
    "type": "Private College",
    "institutionType": "COLLEGE",
    "rating": 4.1,
    "reviews": 1754,
    "accreditation": "ISO Certified",
    "established": 1999,
    "image": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop",
    "courses": [
      "Engineering",
      "Science",
      "Commerce",
      "Arts"
    ],
    "courseTags": [
      "B.Tech",
      "B.Sc",
      "B.Com"
    ],
    "fees": "\u20b950000 - \u20b9240000",
    "placement": "82%",
    "tag": "",
    "programType": "Full Time",
    "collegeCategory": "Private",
    "examAccepted": [
      "JEE",
      "CUET"
    ],
    "genderAccepted": "Coed"
  },
  {
    "id": 19,
    "name": "Ness Wadia College of Commerce",
    "type": "Autonomous College",
    "institutionType": "COLLEGE",
    "rating": 4.2,
    "reviews": 1950,
    "accreditation": "Govt Approved",
    "established": 2006,
    "image": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop",
    "courses": [
      "Engineering",
      "Science",
      "Commerce",
      "Arts"
    ],
    "courseTags": [
      "B.Tech",
      "B.Sc",
      "B.Com"
    ],
    "fees": "\u20b955000 - \u20b9260000",
    "placement": "83%",
    "tag": "",
    "programType": "Full Time",
    "collegeCategory": "Autonomous",
    "examAccepted": [
      "JEE",
      "CUET"
    ],
    "genderAccepted": "Coed"
  },
  {
    "id": 20,
    "name": "Dr. DY Patil Institute of Technology",
    "type": "Private College",
    "institutionType": "COLLEGE",
    "rating": 4.3,
    "reviews": 2193,
    "accreditation": "ISO Certified",
    "established": 2013,
    "image": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=250&fit=crop",
    "courses": [
      "Engineering",
      "Science",
      "Commerce",
      "Arts"
    ],
    "courseTags": [
      "B.Tech",
      "B.Sc",
      "B.Com"
    ],
    "fees": "\u20b960000 - \u20b9280000",
    "placement": "84%",
    "tag": "",
    "programType": "Full Time",
    "collegeCategory": "Private",
    "examAccepted": [
      "JEE",
      "CUET"
    ],
    "genderAccepted": "Coed"
  },
  {
    "id": 21,
    "name": "Delhi Public School",
    "type": "CBSE School",
    "institutionType": "SCHOOL",
    "rating": 4.0,
    "reviews": 100,
    "accreditation": "Govt Approved",
    "established": 1950,
    "image": "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b950000 - \u20b9120000 / year",
    "placement": "92%",
    "tag": "Top Rated",
    "board": "CBSE",
    "schoolType": "Boarding",
    "medium": "English",
    "genderAccepted": "Coed"
  },
  {
    "id": 22,
    "name": "The Bishop's School",
    "type": "ICSE School",
    "institutionType": "SCHOOL",
    "rating": 4.1,
    "reviews": 343,
    "accreditation": "ISO Certified",
    "established": 1957,
    "image": "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b960000 - \u20b9135000 / year",
    "placement": "93%",
    "tag": "Popular",
    "board": "ICSE",
    "schoolType": "Day School",
    "medium": "English",
    "genderAccepted": "Coed"
  },
  {
    "id": 23,
    "name": "St. Mary's School",
    "type": "CBSE School",
    "institutionType": "SCHOOL",
    "rating": 4.2,
    "reviews": 586,
    "accreditation": "Govt Approved",
    "established": 1964,
    "image": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b970000 - \u20b9150000 / year",
    "placement": "94%",
    "tag": "",
    "board": "CBSE",
    "schoolType": "Day School",
    "medium": "English",
    "genderAccepted": "Coed"
  },
  {
    "id": 24,
    "name": "Army Public School",
    "type": "ICSE School",
    "institutionType": "SCHOOL",
    "rating": 4.3,
    "reviews": 829,
    "accreditation": "ISO Certified",
    "established": 1971,
    "image": "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b980000 - \u20b9165000 / year",
    "placement": "95%",
    "tag": "",
    "board": "ICSE",
    "schoolType": "Boarding",
    "medium": "English",
    "genderAccepted": "Coed"
  },
  {
    "id": 25,
    "name": "Orchid School",
    "type": "CBSE School",
    "institutionType": "SCHOOL",
    "rating": 4.4,
    "reviews": 1025,
    "accreditation": "Govt Approved",
    "established": 1978,
    "image": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b990000 - \u20b9180000 / year",
    "placement": "96%",
    "tag": "",
    "board": "CBSE",
    "schoolType": "Day School",
    "medium": "English",
    "genderAccepted": "Coed"
  },
  {
    "id": 26,
    "name": "Symbiosis School",
    "type": "ICSE School",
    "institutionType": "SCHOOL",
    "rating": 4.5,
    "reviews": 1268,
    "accreditation": "ISO Certified",
    "established": 1985,
    "image": "https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b9100000 - \u20b9195000 / year",
    "placement": "92%",
    "tag": "",
    "board": "ICSE",
    "schoolType": "Day School",
    "medium": "English",
    "genderAccepted": "Coed"
  },
  {
    "id": 27,
    "name": "Loyola High School",
    "type": "CBSE School",
    "institutionType": "SCHOOL",
    "rating": 4.0,
    "reviews": 1511,
    "accreditation": "Govt Approved",
    "established": 1992,
    "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b9110000 - \u20b9210000 / year",
    "placement": "93%",
    "tag": "",
    "board": "CBSE",
    "schoolType": "Boarding",
    "medium": "English",
    "genderAccepted": "Coed"
  },
  {
    "id": 28,
    "name": "Vibgyor High School",
    "type": "ICSE School",
    "institutionType": "SCHOOL",
    "rating": 4.1,
    "reviews": 1754,
    "accreditation": "ISO Certified",
    "established": 1999,
    "image": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b9120000 - \u20b9225000 / year",
    "placement": "94%",
    "tag": "",
    "board": "ICSE",
    "schoolType": "Day School",
    "medium": "English",
    "genderAccepted": "Coed"
  },
  {
    "id": 29,
    "name": "Jeevandeep English Medium School",
    "type": "CBSE School",
    "institutionType": "SCHOOL",
    "rating": 4.2,
    "reviews": 1950,
    "accreditation": "Govt Approved",
    "established": 2006,
    "image": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b9130000 - \u20b9240000 / year",
    "placement": "95%",
    "tag": "",
    "board": "CBSE",
    "schoolType": "Day School",
    "medium": "English",
    "genderAccepted": "Coed"
  },
  {
    "id": 30,
    "name": "Shri Shivaji Preparatory Military School",
    "type": "ICSE School",
    "institutionType": "SCHOOL",
    "rating": 4.3,
    "reviews": 2193,
    "accreditation": "ISO Certified",
    "established": 2013,
    "image": "https://images.unsplash.com/photo-1510531704581-5b2870972060?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b9140000 - \u20b9255000 / year",
    "placement": "96%",
    "tag": "",
    "board": "ICSE",
    "schoolType": "Boarding",
    "medium": "English",
    "genderAccepted": "Coed"
  },
  {
    "id": 31,
    "name": "City Public Library",
    "type": "Public Library",
    "institutionType": "LIBRARY",
    "rating": 4.0,
    "reviews": 100,
    "accreditation": "Govt Approved",
    "established": 1950,
    "image": "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b9500 / year membership",
    "placement": "24x7 Access",
    "tag": "Top Rated",
    "libraryType": "Public",
    "timing": "24x7"
  },
  {
    "id": 32,
    "name": "British Council Library",
    "type": "Private Library",
    "institutionType": "LIBRARY",
    "rating": 4.1,
    "reviews": 343,
    "accreditation": "ISO Certified",
    "established": 1957,
    "image": "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b9600 / year membership",
    "placement": "Extended Access",
    "tag": "Popular",
    "libraryType": "Private",
    "timing": "Extended Hours"
  },
  {
    "id": 33,
    "name": "Pune Nagar Vachan Mandir",
    "type": "Public Library",
    "institutionType": "LIBRARY",
    "rating": 4.2,
    "reviews": 586,
    "accreditation": "Govt Approved",
    "established": 1964,
    "image": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b9700 / year membership",
    "placement": "Extended Access",
    "tag": "",
    "libraryType": "Public",
    "timing": "Extended Hours"
  },
  {
    "id": 34,
    "name": "State Central Library",
    "type": "Private Library",
    "institutionType": "LIBRARY",
    "rating": 4.3,
    "reviews": 829,
    "accreditation": "ISO Certified",
    "established": 1971,
    "image": "https://images.unsplash.com/photo-1529148482759-b34b2a373562?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b9800 / year membership",
    "placement": "24x7 Access",
    "tag": "",
    "libraryType": "Private",
    "timing": "24x7"
  },
  {
    "id": 35,
    "name": "Albert Edward Institute & Library",
    "type": "Public Library",
    "institutionType": "LIBRARY",
    "rating": 4.4,
    "reviews": 1025,
    "accreditation": "Govt Approved",
    "established": 1978,
    "image": "https://images.unsplash.com/photo-1440778303588-435521a205bc?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b9900 / year membership",
    "placement": "Extended Access",
    "tag": "",
    "libraryType": "Public",
    "timing": "Extended Hours"
  },
  {
    "id": 36,
    "name": "Jayakar Library",
    "type": "Private Library",
    "institutionType": "LIBRARY",
    "rating": 4.5,
    "reviews": 1268,
    "accreditation": "ISO Certified",
    "established": 1985,
    "image": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b91000 / year membership",
    "placement": "Extended Access",
    "tag": "",
    "libraryType": "Private",
    "timing": "Extended Hours"
  },
  {
    "id": 37,
    "name": "British Library",
    "type": "Public Library",
    "institutionType": "LIBRARY",
    "rating": 4.0,
    "reviews": 1511,
    "accreditation": "Govt Approved",
    "established": 1992,
    "image": "https://images.unsplash.com/photo-1568667256549-094345857637?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b91100 / year membership",
    "placement": "24x7 Access",
    "tag": "",
    "libraryType": "Public",
    "timing": "24x7"
  },
  {
    "id": 38,
    "name": "National Chemical Laboratory Library",
    "type": "Private Library",
    "institutionType": "LIBRARY",
    "rating": 4.1,
    "reviews": 1754,
    "accreditation": "ISO Certified",
    "established": 1999,
    "image": "https://images.unsplash.com/photo-1463320306494-113aa0e4ee5f?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b91200 / year membership",
    "placement": "Extended Access",
    "tag": "",
    "libraryType": "Private",
    "timing": "Extended Hours"
  },
  {
    "id": 39,
    "name": "Fergusson College Library",
    "type": "Public Library",
    "institutionType": "LIBRARY",
    "rating": 4.2,
    "reviews": 1950,
    "accreditation": "Govt Approved",
    "established": 2006,
    "image": "https://images.unsplash.com/photo-1505664194779-8bebcb95c557?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b91300 / year membership",
    "placement": "Extended Access",
    "tag": "",
    "libraryType": "Public",
    "timing": "Extended Hours"
  },
  {
    "id": 40,
    "name": "Pune Digital Library Hub",
    "type": "Private Library",
    "institutionType": "LIBRARY",
    "rating": 4.3,
    "reviews": 2193,
    "accreditation": "ISO Certified",
    "established": 2013,
    "image": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b91400 / year membership",
    "placement": "24x7 Access",
    "tag": "",
    "libraryType": "Private",
    "timing": "24x7"
  },
  {
    "id": 41,
    "name": "Career Launcher Coaching Institute",
    "type": "Test Prep Center",
    "institutionType": "COACHING",
    "rating": 4.0,
    "reviews": 100,
    "accreditation": "Govt Approved",
    "established": 1950,
    "image": "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400&h=250&fit=crop",
    "courses": [
      "JEE Prep",
      "NEET Prep",
      "CAT Prep"
    ],
    "courseTags": [
      "B.Tech",
      "MBBS",
      "MBA"
    ],
    "fees": "\u20b930000 - \u20b980000",
    "placement": "85% Selection Rate",
    "tag": "Top Rated",
    "examPrep": [
      "JEE",
      "NEET",
      "CAT"
    ],
    "mode": "Hybrid"
  },
  {
    "id": 42,
    "name": "FIITJEE Pune Centre",
    "type": "Test Prep Center",
    "institutionType": "COACHING",
    "rating": 4.1,
    "reviews": 343,
    "accreditation": "ISO Certified",
    "established": 1957,
    "image": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop",
    "courses": [
      "JEE Prep",
      "NEET Prep",
      "CAT Prep"
    ],
    "courseTags": [
      "B.Tech",
      "MBBS",
      "MBA"
    ],
    "fees": "\u20b938000 - \u20b990000",
    "placement": "86% Selection Rate",
    "tag": "Popular",
    "examPrep": [
      "JEE",
      "NEET",
      "CAT"
    ],
    "mode": "Offline"
  },
  {
    "id": 43,
    "name": "Allen Career Institute Pune",
    "type": "Test Prep Center",
    "institutionType": "COACHING",
    "rating": 4.2,
    "reviews": 586,
    "accreditation": "Govt Approved",
    "established": 1964,
    "image": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=250&fit=crop",
    "courses": [
      "JEE Prep",
      "NEET Prep",
      "CAT Prep"
    ],
    "courseTags": [
      "B.Tech",
      "MBBS",
      "MBA"
    ],
    "fees": "\u20b946000 - \u20b9100000",
    "placement": "87% Selection Rate",
    "tag": "",
    "examPrep": [
      "JEE",
      "NEET",
      "CAT"
    ],
    "mode": "Hybrid"
  },
  {
    "id": 44,
    "name": "Prime Academy Pune",
    "type": "Test Prep Center",
    "institutionType": "COACHING",
    "rating": 4.3,
    "reviews": 829,
    "accreditation": "ISO Certified",
    "established": 1971,
    "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
    "courses": [
      "JEE Prep",
      "NEET Prep",
      "CAT Prep"
    ],
    "courseTags": [
      "B.Tech",
      "MBBS",
      "MBA"
    ],
    "fees": "\u20b954000 - \u20b9110000",
    "placement": "88% Selection Rate",
    "tag": "",
    "examPrep": [
      "JEE",
      "NEET",
      "CAT"
    ],
    "mode": "Offline"
  },
  {
    "id": 45,
    "name": "IMS Pune Centre",
    "type": "Test Prep Center",
    "institutionType": "COACHING",
    "rating": 4.4,
    "reviews": 1025,
    "accreditation": "Govt Approved",
    "established": 1978,
    "image": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=250&fit=crop",
    "courses": [
      "JEE Prep",
      "NEET Prep",
      "CAT Prep"
    ],
    "courseTags": [
      "B.Tech",
      "MBBS",
      "MBA"
    ],
    "fees": "\u20b962000 - \u20b9120000",
    "placement": "89% Selection Rate",
    "tag": "",
    "examPrep": [
      "JEE",
      "NEET",
      "CAT"
    ],
    "mode": "Hybrid"
  },
  {
    "id": 46,
    "name": "Chahal Academy UPSC Prep",
    "type": "Test Prep Center",
    "institutionType": "COACHING",
    "rating": 4.5,
    "reviews": 1268,
    "accreditation": "ISO Certified",
    "established": 1985,
    "image": "https://images.unsplash.com/photo-1607968565043-36af90dac238?w=400&h=250&fit=crop",
    "courses": [
      "JEE Prep",
      "NEET Prep",
      "CAT Prep"
    ],
    "courseTags": [
      "B.Tech",
      "MBBS",
      "MBA"
    ],
    "fees": "\u20b970000 - \u20b9130000",
    "placement": "90% Selection Rate",
    "tag": "",
    "examPrep": [
      "JEE",
      "NEET",
      "CAT"
    ],
    "mode": "Offline"
  },
  {
    "id": 47,
    "name": "Bakliwal Tutorials",
    "type": "Test Prep Center",
    "institutionType": "COACHING",
    "rating": 4.0,
    "reviews": 1511,
    "accreditation": "Govt Approved",
    "established": 1992,
    "image": "https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&h=250&fit=crop",
    "courses": [
      "JEE Prep",
      "NEET Prep",
      "CAT Prep"
    ],
    "courseTags": [
      "B.Tech",
      "MBBS",
      "MBA"
    ],
    "fees": "\u20b978000 - \u20b9140000",
    "placement": "91% Selection Rate",
    "tag": "",
    "examPrep": [
      "JEE",
      "NEET",
      "CAT"
    ],
    "mode": "Hybrid"
  },
  {
    "id": 48,
    "name": "M.C.Q. Coaching Classes",
    "type": "Test Prep Center",
    "institutionType": "COACHING",
    "rating": 4.1,
    "reviews": 1754,
    "accreditation": "ISO Certified",
    "established": 1999,
    "image": "https://images.unsplash.com/photo-1510531704581-5b2870972060?w=400&h=250&fit=crop",
    "courses": [
      "JEE Prep",
      "NEET Prep",
      "CAT Prep"
    ],
    "courseTags": [
      "B.Tech",
      "MBBS",
      "MBA"
    ],
    "fees": "\u20b986000 - \u20b9150000",
    "placement": "92% Selection Rate",
    "tag": "",
    "examPrep": [
      "JEE",
      "NEET",
      "CAT"
    ],
    "mode": "Offline"
  },
  {
    "id": 49,
    "name": "Reliable Academy",
    "type": "Test Prep Center",
    "institutionType": "COACHING",
    "rating": 4.2,
    "reviews": 1950,
    "accreditation": "Govt Approved",
    "established": 2006,
    "image": "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&h=250&fit=crop",
    "courses": [
      "JEE Prep",
      "NEET Prep",
      "CAT Prep"
    ],
    "courseTags": [
      "B.Tech",
      "MBBS",
      "MBA"
    ],
    "fees": "\u20b994000 - \u20b9160000",
    "placement": "93% Selection Rate",
    "tag": "",
    "examPrep": [
      "JEE",
      "NEET",
      "CAT"
    ],
    "mode": "Hybrid"
  },
  {
    "id": 50,
    "name": "Target Entrance Coaching",
    "type": "Test Prep Center",
    "institutionType": "COACHING",
    "rating": 4.3,
    "reviews": 2193,
    "accreditation": "ISO Certified",
    "established": 2013,
    "image": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=250&fit=crop",
    "courses": [
      "JEE Prep",
      "NEET Prep",
      "CAT Prep"
    ],
    "courseTags": [
      "B.Tech",
      "MBBS",
      "MBA"
    ],
    "fees": "\u20b9102000 - \u20b9170000",
    "placement": "94% Selection Rate",
    "tag": "",
    "examPrep": [
      "JEE",
      "NEET",
      "CAT"
    ],
    "mode": "Offline"
  },
  {
    "id": 51,
    "name": "SkillUp Training Center",
    "type": "Vocational Academy",
    "institutionType": "TRAINING_CENTER",
    "rating": 4.0,
    "reviews": 100,
    "accreditation": "Govt Approved",
    "established": 1950,
    "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop",
    "courses": [
      "Digital Marketing",
      "IT Software",
      "Data Science"
    ],
    "courseTags": [
      "BBA",
      "BCA",
      "B.Sc"
    ],
    "fees": "\u20b910000 - \u20b925000",
    "placement": "70%",
    "tag": "Top Rated",
    "skillCategory": "IT & Software",
    "mode": "Online"
  },
  {
    "id": 52,
    "name": "Seed Infotech",
    "type": "Vocational Academy",
    "institutionType": "TRAINING_CENTER",
    "rating": 4.1,
    "reviews": 343,
    "accreditation": "ISO Certified",
    "established": 1957,
    "image": "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop",
    "courses": [
      "Digital Marketing",
      "IT Software",
      "Data Science"
    ],
    "courseTags": [
      "BBA",
      "BCA",
      "B.Sc"
    ],
    "fees": "\u20b913000 - \u20b930000",
    "placement": "72%",
    "tag": "Popular",
    "skillCategory": "Digital Marketing",
    "mode": "Hybrid"
  },
  {
    "id": 53,
    "name": "Jetking Infotrain",
    "type": "Vocational Academy",
    "institutionType": "TRAINING_CENTER",
    "rating": 4.2,
    "reviews": 586,
    "accreditation": "Govt Approved",
    "established": 1964,
    "image": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=250&fit=crop",
    "courses": [
      "Digital Marketing",
      "IT Software",
      "Data Science"
    ],
    "courseTags": [
      "BBA",
      "BCA",
      "B.Sc"
    ],
    "fees": "\u20b916000 - \u20b935000",
    "placement": "74%",
    "tag": "",
    "skillCategory": "IT & Software",
    "mode": "Hybrid"
  },
  {
    "id": 54,
    "name": "Apponix Technologies",
    "type": "Vocational Academy",
    "institutionType": "TRAINING_CENTER",
    "rating": 4.3,
    "reviews": 829,
    "accreditation": "ISO Certified",
    "established": 1971,
    "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop",
    "courses": [
      "Digital Marketing",
      "IT Software",
      "Data Science"
    ],
    "courseTags": [
      "BBA",
      "BCA",
      "B.Sc"
    ],
    "fees": "\u20b919000 - \u20b940000",
    "placement": "76%",
    "tag": "",
    "skillCategory": "Digital Marketing",
    "mode": "Online"
  },
  {
    "id": 55,
    "name": "Technogeeks IT Training",
    "type": "Vocational Academy",
    "institutionType": "TRAINING_CENTER",
    "rating": 4.4,
    "reviews": 1025,
    "accreditation": "Govt Approved",
    "established": 1978,
    "image": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop",
    "courses": [
      "Digital Marketing",
      "IT Software",
      "Data Science"
    ],
    "courseTags": [
      "BBA",
      "BCA",
      "B.Sc"
    ],
    "fees": "\u20b922000 - \u20b945000",
    "placement": "78%",
    "tag": "",
    "skillCategory": "IT & Software",
    "mode": "Hybrid"
  },
  {
    "id": 56,
    "name": "Profound Edutech",
    "type": "Vocational Academy",
    "institutionType": "TRAINING_CENTER",
    "rating": 4.5,
    "reviews": 1268,
    "accreditation": "ISO Certified",
    "established": 1985,
    "image": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
    "courses": [
      "Digital Marketing",
      "IT Software",
      "Data Science"
    ],
    "courseTags": [
      "BBA",
      "BCA",
      "B.Sc"
    ],
    "fees": "\u20b925000 - \u20b950000",
    "placement": "80%",
    "tag": "",
    "skillCategory": "Digital Marketing",
    "mode": "Hybrid"
  },
  {
    "id": 57,
    "name": "Aura Training Academy",
    "type": "Vocational Academy",
    "institutionType": "TRAINING_CENTER",
    "rating": 4.0,
    "reviews": 1511,
    "accreditation": "Govt Approved",
    "established": 1992,
    "image": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=250&fit=crop",
    "courses": [
      "Digital Marketing",
      "IT Software",
      "Data Science"
    ],
    "courseTags": [
      "BBA",
      "BCA",
      "B.Sc"
    ],
    "fees": "\u20b928000 - \u20b955000",
    "placement": "82%",
    "tag": "",
    "skillCategory": "IT & Software",
    "mode": "Online"
  },
  {
    "id": 58,
    "name": "Digital Vidya Center",
    "type": "Vocational Academy",
    "institutionType": "TRAINING_CENTER",
    "rating": 4.1,
    "reviews": 1754,
    "accreditation": "ISO Certified",
    "established": 1999,
    "image": "https://images.unsplash.com/photo-1542744094-2ab25be78b90?w=400&h=250&fit=crop",
    "courses": [
      "Digital Marketing",
      "IT Software",
      "Data Science"
    ],
    "courseTags": [
      "BBA",
      "BCA",
      "B.Sc"
    ],
    "fees": "\u20b931000 - \u20b960000",
    "placement": "84%",
    "tag": "",
    "skillCategory": "Digital Marketing",
    "mode": "Hybrid"
  },
  {
    "id": 59,
    "name": "Pune Technical Skills Hub",
    "type": "Vocational Academy",
    "institutionType": "TRAINING_CENTER",
    "rating": 4.2,
    "reviews": 1950,
    "accreditation": "Govt Approved",
    "established": 2006,
    "image": "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=400&h=250&fit=crop",
    "courses": [
      "Digital Marketing",
      "IT Software",
      "Data Science"
    ],
    "courseTags": [
      "BBA",
      "BCA",
      "B.Sc"
    ],
    "fees": "\u20b934000 - \u20b965000",
    "placement": "86%",
    "tag": "",
    "skillCategory": "IT & Software",
    "mode": "Hybrid"
  },
  {
    "id": 60,
    "name": "Vinsys IT Training",
    "type": "Vocational Academy",
    "institutionType": "TRAINING_CENTER",
    "rating": 4.3,
    "reviews": 2193,
    "accreditation": "ISO Certified",
    "established": 2013,
    "image": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
    "courses": [
      "Digital Marketing",
      "IT Software",
      "Data Science"
    ],
    "courseTags": [
      "BBA",
      "BCA",
      "B.Sc"
    ],
    "fees": "\u20b937000 - \u20b970000",
    "placement": "88%",
    "tag": "",
    "skillCategory": "Digital Marketing",
    "mode": "Online"
  },
  {
    "id": 61,
    "name": "EduPath Admission Consultants",
    "type": "Education Advisor",
    "institutionType": "CONSULTANT",
    "rating": 4.0,
    "reviews": 100,
    "accreditation": "Govt Approved",
    "established": 1950,
    "image": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b95000 - \u20b925000",
    "placement": "200 Students Guided",
    "tag": "Top Rated",
    "serviceType": "Study Abroad",
    "mode": "Hybrid"
  },
  {
    "id": 62,
    "name": "IDP Education Pune",
    "type": "Education Advisor",
    "institutionType": "CONSULTANT",
    "rating": 4.1,
    "reviews": 343,
    "accreditation": "ISO Certified",
    "established": 1957,
    "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b96000 - \u20b930000",
    "placement": "350 Students Guided",
    "tag": "Popular",
    "serviceType": "Admission Guidance",
    "mode": "Hybrid"
  },
  {
    "id": 63,
    "name": "Edwise International",
    "type": "Education Advisor",
    "institutionType": "CONSULTANT",
    "rating": 4.2,
    "reviews": 586,
    "accreditation": "Govt Approved",
    "established": 1964,
    "image": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b97000 - \u20b935000",
    "placement": "500 Students Guided",
    "tag": "",
    "serviceType": "Study Abroad",
    "mode": "Hybrid"
  },
  {
    "id": 64,
    "name": "KC Overseas Education",
    "type": "Education Advisor",
    "institutionType": "CONSULTANT",
    "rating": 4.3,
    "reviews": 829,
    "accreditation": "ISO Certified",
    "established": 1971,
    "image": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b98000 - \u20b940000",
    "placement": "650 Students Guided",
    "tag": "",
    "serviceType": "Admission Guidance",
    "mode": "Hybrid"
  },
  {
    "id": 65,
    "name": "Y-Axis Overseas Careers",
    "type": "Education Advisor",
    "institutionType": "CONSULTANT",
    "rating": 4.4,
    "reviews": 1025,
    "accreditation": "Govt Approved",
    "established": 1978,
    "image": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b99000 - \u20b945000",
    "placement": "800 Students Guided",
    "tag": "",
    "serviceType": "Study Abroad",
    "mode": "Hybrid"
  },
  {
    "id": 66,
    "name": "Study Smart Consultants",
    "type": "Education Advisor",
    "institutionType": "CONSULTANT",
    "rating": 4.5,
    "reviews": 1268,
    "accreditation": "ISO Certified",
    "established": 1985,
    "image": "https://images.unsplash.com/photo-1542744173-8e085601174a?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b910000 - \u20b950000",
    "placement": "950 Students Guided",
    "tag": "",
    "serviceType": "Admission Guidance",
    "mode": "Hybrid"
  },
  {
    "id": 67,
    "name": "Inspire Overseas Counselling",
    "type": "Education Advisor",
    "institutionType": "CONSULTANT",
    "rating": 4.0,
    "reviews": 1511,
    "accreditation": "Govt Approved",
    "established": 1992,
    "image": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b911000 - \u20b955000",
    "placement": "1100 Students Guided",
    "tag": "",
    "serviceType": "Study Abroad",
    "mode": "Hybrid"
  },
  {
    "id": 68,
    "name": "Imperial Overseas Education",
    "type": "Education Advisor",
    "institutionType": "CONSULTANT",
    "rating": 4.1,
    "reviews": 1754,
    "accreditation": "ISO Certified",
    "established": 1999,
    "image": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b912000 - \u20b960000",
    "placement": "1250 Students Guided",
    "tag": "",
    "serviceType": "Admission Guidance",
    "mode": "Hybrid"
  },
  {
    "id": 69,
    "name": "Global Opportunities Pune",
    "type": "Education Advisor",
    "institutionType": "CONSULTANT",
    "rating": 4.2,
    "reviews": 1950,
    "accreditation": "Govt Approved",
    "established": 2006,
    "image": "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b913000 - \u20b965000",
    "placement": "1400 Students Guided",
    "tag": "",
    "serviceType": "Study Abroad",
    "mode": "Hybrid"
  },
  {
    "id": 70,
    "name": "Career Heights Consultants",
    "type": "Education Advisor",
    "institutionType": "CONSULTANT",
    "rating": 4.3,
    "reviews": 2193,
    "accreditation": "ISO Certified",
    "established": 2013,
    "image": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b914000 - \u20b970000",
    "placement": "1550 Students Guided",
    "tag": "",
    "serviceType": "Admission Guidance",
    "mode": "Hybrid"
  },
  {
    "id": 71,
    "name": "Advanced Materials Research Center",
    "type": "R&D Institution",
    "institutionType": "RESEARCH_CENTER",
    "rating": 4.0,
    "reviews": 100,
    "accreditation": "Govt Approved",
    "established": 1950,
    "image": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "Fellowship Stipend Provided",
    "placement": "10 Active Projects",
    "tag": "Top Rated",
    "researchArea": "Engineering & Technology",
    "fundingType": "Government Funded"
  },
  {
    "id": 72,
    "name": "National Chemical Laboratory (NCL)",
    "type": "R&D Institution",
    "institutionType": "RESEARCH_CENTER",
    "rating": 4.1,
    "reviews": 343,
    "accreditation": "ISO Certified",
    "established": 1957,
    "image": "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "Fellowship Stipend Provided",
    "placement": "15 Active Projects",
    "tag": "Popular",
    "researchArea": "Life Sciences",
    "fundingType": "Private Funded"
  },
  {
    "id": 73,
    "name": "Inter-University Centre for Astronomy and Astrophysics",
    "type": "R&D Institution",
    "institutionType": "RESEARCH_CENTER",
    "rating": 4.2,
    "reviews": 586,
    "accreditation": "Govt Approved",
    "established": 1964,
    "image": "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "Fellowship Stipend Provided",
    "placement": "20 Active Projects",
    "tag": "",
    "researchArea": "Engineering & Technology",
    "fundingType": "Government Funded"
  },
  {
    "id": 74,
    "name": "Indian Institute of Science Education and Research (IISER)",
    "type": "R&D Institution",
    "institutionType": "RESEARCH_CENTER",
    "rating": 4.3,
    "reviews": 829,
    "accreditation": "ISO Certified",
    "established": 1971,
    "image": "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "Fellowship Stipend Provided",
    "placement": "25 Active Projects",
    "tag": "",
    "researchArea": "Life Sciences",
    "fundingType": "Private Funded"
  },
  {
    "id": 75,
    "name": "National Center for Cell Science (NCCS)",
    "type": "R&D Institution",
    "institutionType": "RESEARCH_CENTER",
    "rating": 4.4,
    "reviews": 1025,
    "accreditation": "Govt Approved",
    "established": 1978,
    "image": "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "Fellowship Stipend Provided",
    "placement": "30 Active Projects",
    "tag": "",
    "researchArea": "Engineering & Technology",
    "fundingType": "Government Funded"
  },
  {
    "id": 76,
    "name": "Centre for Development of Advanced Computing (C-DAC)",
    "type": "R&D Institution",
    "institutionType": "RESEARCH_CENTER",
    "rating": 4.5,
    "reviews": 1268,
    "accreditation": "ISO Certified",
    "established": 1985,
    "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "Fellowship Stipend Provided",
    "placement": "35 Active Projects",
    "tag": "",
    "researchArea": "Life Sciences",
    "fundingType": "Private Funded"
  },
  {
    "id": 77,
    "name": "National Institute of Virology (NIV)",
    "type": "R&D Institution",
    "institutionType": "RESEARCH_CENTER",
    "rating": 4.0,
    "reviews": 1511,
    "accreditation": "Govt Approved",
    "established": 1992,
    "image": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "Fellowship Stipend Provided",
    "placement": "40 Active Projects",
    "tag": "",
    "researchArea": "Engineering & Technology",
    "fundingType": "Government Funded"
  },
  {
    "id": 78,
    "name": "Automotive Research Association of India (ARAI)",
    "type": "R&D Institution",
    "institutionType": "RESEARCH_CENTER",
    "rating": 4.1,
    "reviews": 1754,
    "accreditation": "ISO Certified",
    "established": 1999,
    "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "Fellowship Stipend Provided",
    "placement": "45 Active Projects",
    "tag": "",
    "researchArea": "Life Sciences",
    "fundingType": "Private Funded"
  },
  {
    "id": 79,
    "name": "National Centre for Radio Astrophysics",
    "type": "R&D Institution",
    "institutionType": "RESEARCH_CENTER",
    "rating": 4.2,
    "reviews": 1950,
    "accreditation": "Govt Approved",
    "established": 2006,
    "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "Fellowship Stipend Provided",
    "placement": "50 Active Projects",
    "tag": "",
    "researchArea": "Engineering & Technology",
    "fundingType": "Government Funded"
  },
  {
    "id": 80,
    "name": "Pune Social Science Research Institute",
    "type": "R&D Institution",
    "institutionType": "RESEARCH_CENTER",
    "rating": 4.3,
    "reviews": 2193,
    "accreditation": "ISO Certified",
    "established": 2013,
    "image": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "Fellowship Stipend Provided",
    "placement": "55 Active Projects",
    "tag": "",
    "researchArea": "Life Sciences",
    "fundingType": "Private Funded"
  },
  {
    "id": 81,
    "name": "Vidya Scholarship Foundation",
    "type": "Philanthropic Trust",
    "institutionType": "SCHOLARSHIP_PROVIDER",
    "rating": 4.0,
    "reviews": 100,
    "accreditation": "Govt Approved",
    "established": 1950,
    "image": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "Up to \u20b950000 / year",
    "placement": "1000 Students Funded",
    "tag": "Top Rated",
    "scholarshipType": [
      "Merit-Based",
      "Need-Based"
    ]
  },
  {
    "id": 82,
    "name": "Tata Trusts Scholarship Hub",
    "type": "Philanthropic Trust",
    "institutionType": "SCHOLARSHIP_PROVIDER",
    "rating": 4.1,
    "reviews": 343,
    "accreditation": "ISO Certified",
    "established": 1957,
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "Up to \u20b960000 / year",
    "placement": "1500 Students Funded",
    "tag": "Popular",
    "scholarshipType": [
      "Merit-Based",
      "Need-Based"
    ]
  },
  {
    "id": 83,
    "name": "Lila Poonawalla Foundation",
    "type": "Philanthropic Trust",
    "institutionType": "SCHOLARSHIP_PROVIDER",
    "rating": 4.2,
    "reviews": 586,
    "accreditation": "Govt Approved",
    "established": 1964,
    "image": "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "Up to \u20b970000 / year",
    "placement": "2000 Students Funded",
    "tag": "",
    "scholarshipType": [
      "Merit-Based",
      "Need-Based"
    ]
  },
  {
    "id": 84,
    "name": "Shahu Maharaj Scholarship Cell",
    "type": "Philanthropic Trust",
    "institutionType": "SCHOLARSHIP_PROVIDER",
    "rating": 4.3,
    "reviews": 829,
    "accreditation": "ISO Certified",
    "established": 1971,
    "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "Up to \u20b980000 / year",
    "placement": "2500 Students Funded",
    "tag": "",
    "scholarshipType": [
      "Merit-Based",
      "Need-Based"
    ]
  },
  {
    "id": 85,
    "name": "Pune Municipal Corporation Merit Award",
    "type": "Philanthropic Trust",
    "institutionType": "SCHOLARSHIP_PROVIDER",
    "rating": 4.4,
    "reviews": 1025,
    "accreditation": "Govt Approved",
    "established": 1978,
    "image": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "Up to \u20b990000 / year",
    "placement": "3000 Students Funded",
    "tag": "",
    "scholarshipType": [
      "Merit-Based",
      "Need-Based"
    ]
  },
  {
    "id": 86,
    "name": "Symbiosis Sports Scholarship",
    "type": "Philanthropic Trust",
    "institutionType": "SCHOLARSHIP_PROVIDER",
    "rating": 4.5,
    "reviews": 1268,
    "accreditation": "ISO Certified",
    "established": 1985,
    "image": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "Up to \u20b9100000 / year",
    "placement": "3500 Students Funded",
    "tag": "",
    "scholarshipType": [
      "Merit-Based",
      "Need-Based"
    ]
  },
  {
    "id": 87,
    "name": "Rotary Club Education Foundation",
    "type": "Philanthropic Trust",
    "institutionType": "SCHOLARSHIP_PROVIDER",
    "rating": 4.0,
    "reviews": 1511,
    "accreditation": "Govt Approved",
    "established": 1992,
    "image": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "Up to \u20b9110000 / year",
    "placement": "4000 Students Funded",
    "tag": "",
    "scholarshipType": [
      "Merit-Based",
      "Need-Based"
    ]
  },
  {
    "id": 88,
    "name": "Leela Merit Trust",
    "type": "Philanthropic Trust",
    "institutionType": "SCHOLARSHIP_PROVIDER",
    "rating": 4.1,
    "reviews": 1754,
    "accreditation": "ISO Certified",
    "established": 1999,
    "image": "https://images.unsplash.com/photo-1553729459-ebd14faeda64?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "Up to \u20b9120000 / year",
    "placement": "4500 Students Funded",
    "tag": "",
    "scholarshipType": [
      "Merit-Based",
      "Need-Based"
    ]
  },
  {
    "id": 89,
    "name": "Progressive Education Scholarship",
    "type": "Philanthropic Trust",
    "institutionType": "SCHOLARSHIP_PROVIDER",
    "rating": 4.2,
    "reviews": 1950,
    "accreditation": "Govt Approved",
    "established": 2006,
    "image": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "Up to \u20b9130000 / year",
    "placement": "5000 Students Funded",
    "tag": "",
    "scholarshipType": [
      "Merit-Based",
      "Need-Based"
    ]
  },
  {
    "id": 90,
    "name": "Pune Citizens Education Aid",
    "type": "Philanthropic Trust",
    "institutionType": "SCHOLARSHIP_PROVIDER",
    "rating": 4.3,
    "reviews": 2193,
    "accreditation": "ISO Certified",
    "established": 2013,
    "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "Up to \u20b9140000 / year",
    "placement": "5500 Students Funded",
    "tag": "",
    "scholarshipType": [
      "Merit-Based",
      "Need-Based"
    ]
  },
  {
    "id": 91,
    "name": "Scholars Nest Hostel",
    "type": "Student Residence",
    "institutionType": "HOSTEL",
    "rating": 4.0,
    "reviews": 100,
    "accreditation": "Govt Approved",
    "established": 1950,
    "image": "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b96000 - \u20b912000 / month",
    "placement": "100 Beds",
    "tag": "Top Rated",
    "hostelType": "Co-ed",
    "roomType": [
      "AC",
      "Non-AC"
    ]
  },
  {
    "id": 92,
    "name": "Zolo Stays PG Hub",
    "type": "Student Residence",
    "institutionType": "HOSTEL",
    "rating": 4.1,
    "reviews": 343,
    "accreditation": "ISO Certified",
    "established": 1957,
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b97000 - \u20b913500 / month",
    "placement": "120 Beds",
    "tag": "Popular",
    "hostelType": "Boys",
    "roomType": [
      "Non-AC"
    ]
  },
  {
    "id": 93,
    "name": "Stanza Living Youth Hostel",
    "type": "Student Residence",
    "institutionType": "HOSTEL",
    "rating": 4.2,
    "reviews": 586,
    "accreditation": "Govt Approved",
    "established": 1964,
    "image": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b98000 - \u20b915000 / month",
    "placement": "140 Beds",
    "tag": "",
    "hostelType": "Girls",
    "roomType": [
      "AC",
      "Non-AC"
    ]
  },
  {
    "id": 94,
    "name": "Oxford Student PG & Hostel",
    "type": "Student Residence",
    "institutionType": "HOSTEL",
    "rating": 4.3,
    "reviews": 829,
    "accreditation": "ISO Certified",
    "established": 1971,
    "image": "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b99000 - \u20b916500 / month",
    "placement": "160 Beds",
    "tag": "",
    "hostelType": "Co-ed",
    "roomType": [
      "Non-AC"
    ]
  },
  {
    "id": 95,
    "name": "Sinhgad Campus Hostel",
    "type": "Student Residence",
    "institutionType": "HOSTEL",
    "rating": 4.4,
    "reviews": 1025,
    "accreditation": "Govt Approved",
    "established": 1978,
    "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b910000 - \u20b918000 / month",
    "placement": "180 Beds",
    "tag": "",
    "hostelType": "Boys",
    "roomType": [
      "AC",
      "Non-AC"
    ]
  },
  {
    "id": 96,
    "name": "Symbiosis Campus Girls Hostel",
    "type": "Student Residence",
    "institutionType": "HOSTEL",
    "rating": 4.5,
    "reviews": 1268,
    "accreditation": "ISO Certified",
    "established": 1985,
    "image": "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b911000 - \u20b919500 / month",
    "placement": "200 Beds",
    "tag": "",
    "hostelType": "Girls",
    "roomType": [
      "Non-AC"
    ]
  },
  {
    "id": 97,
    "name": "Fergusson College Boys Hostel",
    "type": "Student Residence",
    "institutionType": "HOSTEL",
    "rating": 4.0,
    "reviews": 1511,
    "accreditation": "Govt Approved",
    "established": 1992,
    "image": "https://images.unsplash.com/photo-1445991842772-097fea258e7b?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b912000 - \u20b921000 / month",
    "placement": "220 Beds",
    "tag": "",
    "hostelType": "Co-ed",
    "roomType": [
      "AC",
      "Non-AC"
    ]
  },
  {
    "id": 98,
    "name": "COEP Girls Hostel Complex",
    "type": "Student Residence",
    "institutionType": "HOSTEL",
    "rating": 4.1,
    "reviews": 1754,
    "accreditation": "ISO Certified",
    "established": 1999,
    "image": "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b913000 - \u20b922500 / month",
    "placement": "240 Beds",
    "tag": "",
    "hostelType": "Boys",
    "roomType": [
      "Non-AC"
    ]
  },
  {
    "id": 99,
    "name": "Comfort Stay Student PG",
    "type": "Student Residence",
    "institutionType": "HOSTEL",
    "rating": 4.2,
    "reviews": 1950,
    "accreditation": "Govt Approved",
    "established": 2006,
    "image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "\u20b914000 - \u20b924000 / month",
    "placement": "260 Beds",
    "tag": "",
    "hostelType": "Girls",
    "roomType": [
      "AC",
      "Non-AC"
    ]
  },
  {
    "id": 100,
    "name": "Elite Co-living Space",
    "type": "Student Residence",
    "institutionType": "HOSTEL",
    "rating": 4.3,
    "reviews": 2193,
    "accreditation": "ISO Certified",
    "established": 2013,
    "image": "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=250&fit=crop",
    "courses": [],
    "courseTags": [],
    "fees": "₹6000 - ₹12000 / month",
    "placement": "280 Beds",
    "tag": "",
    "hostelType": "Co-ed",
    "roomType": [
      "Non-AC"
    ]
  }
];

export interface TrendingCourse {
  name: string;
  growth: string;
  icon: string;
  colleges: number;
}

// Trending Courses
export const trendingCourses: TrendingCourse[] = [
  { name: 'B.Tech in AI & Machine Learning', growth: '+45%', icon: '🤖', colleges: 38 },
  { name: 'MBA in Business Analytics', growth: '+38%', icon: '📈', colleges: 24 },
  { name: 'B.Sc Data Science', growth: '+52%', icon: '📊', colleges: 31 },
  { name: 'B.Tech in Cybersecurity', growth: '+41%', icon: '🔒', colleges: 19 },
  { name: 'BBA in Digital Marketing', growth: '+33%', icon: '📱', colleges: 27 },
  { name: 'M.Tech in Cloud Computing', growth: '+29%', icon: '☁️', colleges: 15 },
  { name: 'B.Des in UX/UI Design', growth: '+36%', icon: '🎯', colleges: 12 },
  { name: 'PG Diploma in Fintech', growth: '+48%', icon: '💳', colleges: 9 },
];

export interface PopularArea {
  name: string;
  colleges: number;
  type: string;
  icon: string;
}

// Popular Areas/Localities
export const popularAreas: PopularArea[] = [
  { name: 'Hinjewadi', colleges: 45, type: 'IT Hub', icon: '🏢' },
  { name: 'Kothrud', colleges: 38, type: 'Education Hub', icon: '🎓' },
  { name: 'Shivajinagar', colleges: 52, type: 'City Center', icon: '🏛️' },
  { name: 'Hadapsar', colleges: 28, type: 'Growing Area', icon: '📈' },
  { name: 'Wakad', colleges: 22, type: 'Residential', icon: '🏠' },
  { name: 'Baner', colleges: 19, type: 'Premium Area', icon: '⭐' },
  { name: 'Deccan', colleges: 35, type: 'Heritage', icon: '🏰' },
  { name: 'Aundh', colleges: 26, type: 'Established', icon: '✅' },
  { name: 'Viman Nagar', colleges: 18, type: 'Modern', icon: '🛫' },
  { name: 'Karve Nagar', colleges: 31, type: 'Student Area', icon: '📖' },
  { name: 'Bibwewadi', colleges: 15, type: 'Affordable', icon: '💰' },
  { name: 'Pimpri-Chinchwad', colleges: 42, type: 'Industrial', icon: '🏭' },
];

export interface UpcomingExam {
  name: string;
  date: string;
  category: string;
  status: string;
}

// Exam notifications
export const upcomingExams: UpcomingExam[] = [
  { name: 'JEE Main 2026 Session 2', date: 'April 2026', category: 'Engineering', status: 'Upcoming' },
  { name: 'CAT 2026', date: 'November 2026', category: 'Management', status: 'Registration Open' },
  { name: 'NEET UG 2026', date: 'May 2026', category: 'Medical', status: 'Upcoming' },
  { name: 'MHT CET 2026', date: 'May 2026', category: 'Engineering/Medical', status: 'Upcoming' },
  { name: 'CLAT 2026', date: 'December 2026', category: 'Law', status: 'Registration Open' },
  { name: 'NATA 2026', date: 'April 2026', category: 'Architecture', status: 'Applications Open' },
];

export interface QuickLink {
  label: string;
  slug: string;
  icon: string;
}

// Quick links for navigation
export const quickLinks: QuickLink[] = [
  { label: 'Top Engineering Colleges', slug: 'engineering', icon: '⚙️' },
  { label: 'Best MBA Colleges', slug: 'management', icon: '💼' },
  { label: 'Medical Colleges', slug: 'medical', icon: '🏥' },
  { label: 'Law Colleges', slug: 'law', icon: '⚖️' },
  { label: 'Science Colleges', slug: 'science', icon: '🔬' },
  { label: 'Commerce Colleges', slug: 'commerce', icon: '📊' },
  { label: 'Design Colleges', slug: 'design', icon: '🎨' },
  { label: 'Pharmacy Colleges', slug: 'pharmacy', icon: '💊' },
];

export interface Testimonial {
  name: string;
  college: string;
  course: string;
  year: string;
  quote: string;
  avatar: string;
  rating: number;
}

// Testimonials
export const testimonials: Testimonial[] = [
  {
    name: 'Priya Sharma',
    college: 'COEP Technological University',
    course: 'B.Tech CSE',
    year: '2024',
    quote: 'Pune gave me the perfect blend of academics and culture. COEP\'s placement cell helped me land a dream job at Google.',
    avatar: '👩‍🎓',
    rating: 5,
  },
  {
    name: 'Rahul Deshpande',
    college: 'Symbiosis Institute of Business Management',
    course: 'MBA',
    year: '2023',
    quote: 'The diversity of education options in Pune is unmatched. SIBM\'s industry connections opened doors I never imagined.',
    avatar: '👨‍🎓',
    rating: 5,
  },
  {
    name: 'Ananya Kulkarni',
    college: 'Fergusson College',
    course: 'B.Sc Physics',
    year: '2025',
    quote: 'Studying at Fergusson was a dream come true. The heritage campus and brilliant faculty make it truly special.',
    avatar: '👩‍🔬',
    rating: 4,
  },
];

export interface AdmissionBanner {
  title: string;
  subtitle: string;
  cta: string;
  gradient: string;
}

// Admission banners
export const admissionBanners: AdmissionBanner[] = [
  {
    title: '🎯 Admissions 2026 Open Now!',
    subtitle: 'Apply to 500+ colleges in Pune through one form',
    cta: 'Apply Now',
    gradient: 'from-blue-600 to-indigo-700',
  },
  {
    title: '📝 Get Free Counselling',
    subtitle: 'Expert guidance for choosing the right college & course',
    cta: 'Book Free Session',
    gradient: 'from-emerald-600 to-teal-700',
  },
];

export interface CompareDataItem {
  name: string;
  values: string[];
}

export interface CompareData {
  categories: string[];
  colleges: CompareDataItem[];
}

// Compare colleges
export const compareData: CompareData = {
  categories: ['Fees', 'Placement %', 'Rating', 'Accreditation', 'Established'],
  colleges: [
    { name: 'COEP', values: ['₹1.2L', '95%', '4.6/5', 'NAAC A++', '1854'] },
    { name: 'VIT Pune', values: ['₹2.8L', '90%', '4.1/5', 'NAAC A', '1983'] },
    { name: 'MIT WPU', values: ['₹4.5L', '88%', '4.2/5', 'NAAC A++', '1983'] },
  ],
};
