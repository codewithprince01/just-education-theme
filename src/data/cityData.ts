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
    id: 1,
    name: 'Savitribai Phule Pune University',
    type: 'University',
    institutionType: 'UNIVERSITY',
    rating: 4.5,
    reviews: 2340,
    accreditation: 'NAAC A++',
    established: 1949,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop',
    courses: ['Engineering', 'Science', 'Arts', 'Commerce', 'Law'],
    courseTags: ['B.Tech', 'B.Sc', 'BA', 'B.Com'],
    programType: 'Full Time',
    collegeCategory: 'Government',
    examAccepted: ['CUET'],
    genderAccepted: 'Coed',
    fees: '₹15,000 - ₹1,50,000',
    placement: '85%',
    tag: 'Top Rated',
  },
  {
    id: 2,
    name: 'Symbiosis International University',
    type: 'Deemed University',
    institutionType: 'UNIVERSITY',
    rating: 4.3,
    reviews: 1890,
    accreditation: 'NAAC A',
    established: 2002,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=250&fit=crop',
    courses: ['MBA', 'Law', 'Design', 'Media', 'Engineering'],
    courseTags: ['MBA', 'B.Tech'],
    programType: 'Full Time',
    collegeCategory: 'Deemed University',
    examAccepted: ['CAT'],
    genderAccepted: 'Coed',
    fees: '₹2,00,000 - ₹8,00,000',
    placement: '92%',
    tag: 'Premium',
  },
  {
    id: 3,
    name: 'MIT World Peace University',
    type: 'Private University',
    institutionType: 'UNIVERSITY',
    rating: 4.2,
    reviews: 1560,
    accreditation: 'NAAC A++',
    established: 1983,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=250&fit=crop',
    courses: ['Engineering', 'Management', 'Science', 'Pharmacy'],
    courseTags: ['B.Tech', 'MBA', 'B.Sc'],
    programType: 'Full Time',
    collegeCategory: 'Private',
    examAccepted: ['JEE', 'CAT'],
    genderAccepted: 'Coed',
    fees: '₹1,50,000 - ₹4,50,000',
    placement: '88%',
    tag: 'Popular',
  },
  {
    id: 4,
    name: 'Vishwakarma Institute of Technology',
    type: 'Private College',
    institutionType: 'COLLEGE',
    rating: 4.1,
    reviews: 1230,
    accreditation: 'NAAC A',
    established: 1983,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=400&h=250&fit=crop',
    courses: ['Engineering', 'MCA', 'MBA'],
    courseTags: ['B.Tech', 'MBA', 'BCA'],
    programType: 'Full Time',
    collegeCategory: 'Private',
    examAccepted: ['JEE'],
    genderAccepted: 'Coed',
    fees: '₹1,20,000 - ₹2,80,000',
    placement: '90%',
    tag: 'Best Placements',
  },
  {
    id: 5,
    name: 'Fergusson College',
    type: 'Autonomous',
    institutionType: 'COLLEGE',
    rating: 4.4,
    reviews: 2100,
    accreditation: 'NAAC A',
    established: 1885,
    image: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=400&h=250&fit=crop',
    courses: ['Science', 'Arts', 'Commerce'],
    courseTags: ['B.Sc', 'BA', 'B.Com'],
    programType: 'Full Time',
    collegeCategory: 'Autonomous',
    examAccepted: ['CUET'],
    genderAccepted: 'Coed',
    fees: '₹8,000 - ₹35,000',
    placement: '72%',
    tag: 'Heritage',
  },
  {
    id: 6,
    name: 'COEP Technological University',
    type: 'Government',
    institutionType: 'COLLEGE',
    rating: 4.6,
    reviews: 2670,
    accreditation: 'NAAC A++',
    established: 1854,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop',
    courses: ['Engineering', 'Science', 'Architecture'],
    courseTags: ['B.Tech', 'M.Tech', 'B.Sc'],
    programType: 'Full Time',
    collegeCategory: 'Government',
    examAccepted: ['JEE'],
    genderAccepted: 'Coed',
    fees: '₹50,000 - ₹1,20,000',
    placement: '95%',
    tag: '#1 in Pune',
  },
  {
    id: 7,
    name: 'Delhi Public School',
    type: 'CBSE School',
    institutionType: 'SCHOOL',
    rating: 4.4,
    reviews: 980,
    accreditation: 'CBSE',
    established: 1995,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=250&fit=crop',
    courses: ['Primary', 'Secondary', 'Senior Secondary'],
    courseTags: [],
    board: 'CBSE',
    schoolType: 'Day School',
    medium: 'English',
    genderAccepted: 'Coed',
    fees: '₹60,000 - ₹1,50,000 / year',
    placement: '98%',
    tag: 'Top School',
  },
  {
    id: 8,
    name: 'City Public Library',
    type: 'Public Library',
    institutionType: 'LIBRARY',
    rating: 4.2,
    reviews: 410,
    accreditation: 'Govt. Recognized',
    established: 1962,
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&h=250&fit=crop',
    courses: ['Reference Section', 'Digital Library', 'Reading Halls'],
    courseTags: [],
    libraryType: 'Public',
    timing: 'Extended Hours',
    fees: '₹500 / year membership',
    placement: '24x7 Access',
    tag: 'Most Visited',
  },
  {
    id: 9,
    name: 'Career Launcher Coaching Institute',
    type: 'Test Prep',
    institutionType: 'COACHING',
    rating: 4.3,
    reviews: 1340,
    accreditation: 'ISO Certified',
    established: 2005,
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400&h=250&fit=crop',
    courses: ['CAT Coaching', 'JEE Coaching', 'NEET Coaching'],
    courseTags: ['MBA', 'B.Tech', 'MBBS'],
    examPrep: ['CAT', 'JEE', 'NEET'],
    mode: 'Hybrid',
    fees: '₹25,000 - ₹90,000',
    placement: '91% Selection Rate',
    tag: 'Top Coaching',
  },
  {
    id: 10,
    name: 'SkillUp Training Center',
    type: 'Vocational Training',
    institutionType: 'TRAINING_CENTER',
    rating: 4.0,
    reviews: 560,
    accreditation: 'NSDC Affiliated',
    established: 2014,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop',
    courses: ['Digital Marketing', 'Tally & Accounting', 'Soft Skills'],
    courseTags: ['BBA', 'B.Com'],
    skillCategory: 'Digital Marketing',
    mode: 'Hybrid',
    fees: '₹8,000 - ₹35,000',
    placement: '78%',
    tag: 'Job-Ready',
  },
  {
    id: 11,
    name: 'EduPath Admission Consultants',
    type: 'Admission Consultancy',
    institutionType: 'CONSULTANT',
    rating: 4.1,
    reviews: 320,
    accreditation: 'Govt. Registered',
    established: 2011,
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop',
    courses: ['College Selection', 'Study Abroad', 'Education Loan Guidance'],
    courseTags: [],
    serviceType: 'Admission Guidance',
    mode: 'Hybrid',
    fees: '₹2,00,000 - ₹15,00,000',
    placement: '4.5k+ Students Guided',
    tag: 'Trusted Advisor',
  },
  {
    id: 12,
    name: 'Advanced Materials Research Center',
    type: 'R&D Center',
    institutionType: 'RESEARCH_CENTER',
    rating: 4.5,
    reviews: 145,
    accreditation: 'DST Recognized',
    established: 1998,
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=250&fit=crop',
    courses: ['PhD Fellowships', 'Sponsored Projects', 'Industry Collaboration'],
    courseTags: ['M.Tech'],
    researchArea: 'Engineering & Technology',
    fundingType: 'Government Funded',
    fees: 'Fellowship Stipend Provided',
    placement: '60+ Active Projects',
    tag: 'Research Hub',
  },
  {
    id: 13,
    name: 'Vidya Scholarship Foundation',
    type: 'NGO',
    institutionType: 'SCHOLARSHIP_PROVIDER',
    rating: 4.6,
    reviews: 290,
    accreditation: '12A & 80G Certified',
    established: 2008,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop',
    courses: ['Merit Scholarships', 'Need-Based Aid', 'Girl Child Education'],
    courseTags: [],
    scholarshipType: ['Merit-Based', 'Girl Child'],
    fees: 'Up to ₹1,00,000 / year',
    placement: '3,200+ Students Funded',
    tag: 'Top Funder',
  },
  {
    id: 14,
    name: 'Scholars Nest Hostel',
    type: "Boys' & Girls' Hostel",
    institutionType: 'HOSTEL',
    courseTags: [],
    hostelType: 'Co-ed',
    roomType: ['AC', 'Non-AC'],
    rating: 4.0,
    reviews: 670,
    accreditation: 'Verified Property',
    established: 2016,
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=250&fit=crop',
    courses: ['AC & Non-AC Rooms', 'Mess Facility', 'Wi-Fi & Study Hall'],
    fees: '₹8,000 - ₹15,000 / month',
    placement: '200+ Beds',
    tag: 'Near Campus',
  },
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
