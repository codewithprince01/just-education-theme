// ─────────────────────────────────────────────
// Interfaces
// ─────────────────────────────────────────────

export interface Institute {
  name: string;
  slug: string;
  logo: string;
  banner: string;
  tagline: string;
  rating: number;
  reviewCount: number;
  location: string;
  established: number;
  accreditations: string[];
  isVerified: boolean;
  description: string;
  metrics: Metrics;
  ratingDistribution: Record<number, number>;
  admissionSteps: AdmissionStep[];
}

export interface Metrics {
  studentsTrained: string;
  totalSelections: string;
  coursesOffered: number;
  faculties: number;
  successRate: string;
}

export interface Course {
  id: string;
  title: string;
  examCategory: string;
  duration: string;
  fee: number;
  originalFee: number;
  mode: string;
  language: string;
  batchStartDate: string;
  studentCount: number;
  rating: number;
  ratingCount: number;
  difficulty: string;
  highlights: string[];
}

export interface LiveBatch {
  id: string;
  courseTitle: string;
  facultyName: string;
  facultyImage: string;
  timing: string;
  duration: string;
  seatsTotal: number;
  seatsLeft: number;
  nextSession: string;
  language: string;
  isLive: boolean;
}

export interface Faculty {
  id: string;
  name: string;
  image: string;
  designation: string;
  experience: string;
  subjects: string[];
  rating: number;
  studentsMentored: number;
  successStats: string;
  bio: string;
  achievements: string[];
}

export interface Ranker {
  id: string;
  name: string;
  photo: string;
  airRank: number;
  exam: string;
  year: number;
  score: string;
  course: string;
  testimonial: string;
}

export interface MockTest {
  id: string;
  name: string;
  examCategory: string;
  questionsCount: number;
  duration: number;
  difficulty: string;
  attempts: number;
  rating: number;
  isFree: boolean;
  isTrending: boolean;
  hasAllIndiaRank: boolean;
}

export interface StudyMaterial {
  id: string;
  title: string;
  type: 'PDF' | 'Notes' | 'PYP' | 'Formula' | 'Ebook' | 'Sample';
  pages: number;
  downloads: number;
  isFree: boolean;
}

export interface Review {
  id: string;
  studentName: string;
  photo: string;
  course: string;
  rating: number;
  reviewText: string;
  date: string;
  isVerified: boolean;
}

export interface Facility {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Highlight {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface SimilarInstitute {
  id: string;
  name: string;
  image: string;
  rating: number;
  location: string;
  courses: string[];
}

export interface AdmissionStep {
  stepNumber: number;
  title: string;
  description: string;
  icon: string;
}

// ─────────────────────────────────────────────
// Mock Data
// ─────────────────────────────────────────────

export const institute: Institute = {
  name: 'APEX Coaching Institute',
  slug: 'apex-coaching',
  logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop',
  banner: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1400&h=450&fit=crop',
  tagline: 'Transforming Aspirations into Achievements Since 2005',
  rating: 4.8,
  reviewCount: 12480,
  location: 'Pune, Maharashtra',
  established: 2005,
  accreditations: ['ISO 9001:2015', 'NAAC A+', 'Govt. Recognized'],
  isVerified: true,
  description:
    'APEX Coaching Institute is Pune\'s premier coaching destination, having guided over 2.5 lakh students to their dream careers. With 85+ expert faculties and a proven track record of 18,000+ selections, we combine academic rigour with mentorship to produce India\'s top rankers.',
  metrics: {
    studentsTrained: '2,50,000+',
    totalSelections: '18,000+',
    coursesOffered: 24,
    faculties: 85,
    successRate: '94%',
  },
  ratingDistribution: { 5: 8200, 4: 2500, 3: 980, 2: 490, 1: 310 },
  admissionSteps: [
    {
      stepNumber: 1,
      title: 'Enquire Online',
      description: 'Fill out the enquiry form or call our helpline to get detailed information about courses and fees.',
      icon: 'ClipboardList',
    },
    {
      stepNumber: 2,
      title: 'Book Free Demo',
      description: 'Attend a free demo class to experience our teaching methodology firsthand.',
      icon: 'CalendarCheck',
    },
    {
      stepNumber: 3,
      title: 'Counselling Session',
      description: 'Meet our expert counsellors for a personalised study plan tailored to your goals.',
      icon: 'Users',
    },
    {
      stepNumber: 4,
      title: 'Enrol & Pay Fees',
      description: 'Complete your enrolment with flexible fee payment options and EMI facilities.',
      icon: 'CreditCard',
    },
    {
      stepNumber: 5,
      title: 'Start Learning',
      description: 'Begin your preparation journey with access to all study materials, tests, and live classes.',
      icon: 'BookOpen',
    },
  ],
};

export const courses: Course[] = [
  {
    id: 'c1',
    title: 'JEE Main & Advanced Comprehensive',
    examCategory: 'JEE',
    duration: '2 Years',
    fee: 85000,
    originalFee: 110000,
    mode: 'Hybrid',
    language: 'English / Hindi',
    batchStartDate: '2025-07-15',
    studentCount: 4200,
    rating: 4.9,
    ratingCount: 1840,
    difficulty: 'Advanced',
    highlights: ['Live doubt sessions', 'All India Test Series', 'Study material', '1:1 mentorship'],
  },
  {
    id: 'c2',
    title: 'NEET UG Complete Preparation',
    examCategory: 'NEET',
    duration: '2 Years',
    fee: 80000,
    originalFee: 105000,
    mode: 'Offline',
    language: 'English',
    batchStartDate: '2025-07-20',
    studentCount: 3800,
    rating: 4.8,
    ratingCount: 1620,
    difficulty: 'Advanced',
    highlights: ['Biology revision modules', 'Mock test series', 'Video lectures', 'Doubt clearing'],
  },
  {
    id: 'c3',
    title: 'UPSC CSE Foundation',
    examCategory: 'UPSC',
    duration: '1 Year',
    fee: 75000,
    originalFee: 95000,
    mode: 'Offline',
    language: 'Hindi / English',
    batchStartDate: '2025-08-01',
    studentCount: 2100,
    rating: 4.7,
    ratingCount: 980,
    difficulty: 'Expert',
    highlights: ['Current affairs daily', 'Essay & answer writing', 'Interview guidance', 'PT-Mains both'],
  },
  {
    id: 'c4',
    title: 'SSC CGL / CHSL Batch',
    examCategory: 'SSC',
    duration: '6 Months',
    fee: 18000,
    originalFee: 25000,
    mode: 'Hybrid',
    language: 'Hindi',
    batchStartDate: '2025-07-10',
    studentCount: 5600,
    rating: 4.7,
    ratingCount: 2100,
    difficulty: 'Intermediate',
    highlights: ['Speed maths tricks', 'English grammar', 'GK capsules', 'Previous papers'],
  },
  {
    id: 'c5',
    title: 'Banking (IBPS / SBI PO & Clerk)',
    examCategory: 'Banking',
    duration: '6 Months',
    fee: 15000,
    originalFee: 22000,
    mode: 'Online',
    language: 'Hindi / English',
    batchStartDate: '2025-07-05',
    studentCount: 7200,
    rating: 4.6,
    ratingCount: 2890,
    difficulty: 'Intermediate',
    highlights: ['Reasoning shortcuts', 'Quantitative aptitude', 'English & GK', 'Banking awareness'],
  },
  {
    id: 'c6',
    title: 'CAT MBA Entrance Preparation',
    examCategory: 'CAT',
    duration: '8 Months',
    fee: 35000,
    originalFee: 48000,
    mode: 'Online',
    language: 'English',
    batchStartDate: '2025-08-10',
    studentCount: 1800,
    rating: 4.8,
    ratingCount: 740,
    difficulty: 'Advanced',
    highlights: ['VARC strategies', 'DILR practice sets', 'QA foundations', 'Mock CATs'],
  },
  {
    id: 'c7',
    title: 'GATE (ECE / CSE / ME) Batch',
    examCategory: 'GATE',
    duration: '10 Months',
    fee: 28000,
    originalFee: 40000,
    mode: 'Hybrid',
    language: 'English',
    batchStartDate: '2025-09-01',
    studentCount: 1200,
    rating: 4.7,
    ratingCount: 510,
    difficulty: 'Advanced',
    highlights: ['Core subject coverage', 'GATE formula sheets', 'Previous year solutions', 'Mock tests'],
  },
  {
    id: 'c8',
    title: 'IELTS Academic & General',
    examCategory: 'IELTS',
    duration: '3 Months',
    fee: 12000,
    originalFee: 18000,
    mode: 'Offline',
    language: 'English',
    batchStartDate: '2025-07-12',
    studentCount: 3400,
    rating: 4.6,
    ratingCount: 1380,
    difficulty: 'Beginner',
    highlights: ['Listening practice', 'Reading strategies', 'Writing band 7+', 'Speaking mock tests'],
  },
];

export const liveBatches: LiveBatch[] = [
  {
    id: 'lb1',
    courseTitle: 'JEE Main & Advanced — Maths',
    facultyName: 'Dr. Anil Sharma',
    facultyImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
    timing: 'Mon, Wed, Fri — 7:00 AM',
    duration: '2 hrs / session',
    seatsTotal: 60,
    seatsLeft: 8,
    nextSession: '25 Jun 2025',
    language: 'English',
    isLive: true,
  },
  {
    id: 'lb2',
    courseTitle: 'NEET Biology — Zoology Module',
    facultyName: 'Dr. Priya Nair',
    facultyImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
    timing: 'Tue, Thu, Sat — 8:00 AM',
    duration: '2.5 hrs / session',
    seatsTotal: 50,
    seatsLeft: 3,
    nextSession: '26 Jun 2025',
    language: 'English / Hindi',
    isLive: true,
  },
  {
    id: 'lb3',
    courseTitle: 'UPSC GS Paper I — History',
    facultyName: 'Ramesh Gupta',
    facultyImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop',
    timing: 'Daily — 6:00 AM',
    duration: '1.5 hrs / session',
    seatsTotal: 40,
    seatsLeft: 14,
    nextSession: '25 Jun 2025',
    language: 'Hindi',
    isLive: false,
  },
  {
    id: 'lb4',
    courseTitle: 'SSC CGL Reasoning',
    facultyName: 'Kavita Mehta',
    facultyImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop',
    timing: 'Mon–Fri — 9:00 PM',
    duration: '1 hr / session',
    seatsTotal: 80,
    seatsLeft: 22,
    nextSession: '25 Jun 2025',
    language: 'Hindi',
    isLive: true,
  },
  {
    id: 'lb5',
    courseTitle: 'Banking Quantitative Aptitude',
    facultyName: 'Suresh Patel',
    facultyImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop',
    timing: 'Tue, Thu — 8:00 PM',
    duration: '1.5 hrs / session',
    seatsTotal: 100,
    seatsLeft: 37,
    nextSession: '26 Jun 2025',
    language: 'Hindi / English',
    isLive: false,
  },
  {
    id: 'lb6',
    courseTitle: 'CAT VARC Intensive',
    facultyName: 'Ananya Roy',
    facultyImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop',
    timing: 'Sat, Sun — 10:00 AM',
    duration: '3 hrs / session',
    seatsTotal: 45,
    seatsLeft: 18,
    nextSession: '28 Jun 2025',
    language: 'English',
    isLive: false,
  },
];

export const faculties: Faculty[] = [
  {
    id: 'f1',
    name: 'Dr. Anil Sharma',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    designation: 'Head of Mathematics',
    experience: '18 Years',
    subjects: ['Calculus', 'Algebra', 'Coordinate Geometry', 'Statistics'],
    rating: 4.9,
    studentsMentored: 15000,
    successStats: '96% selections',
    bio: 'Dr. Anil Sharma is a gold medalist from IIT Bombay with a PhD in Applied Mathematics. He has authored 3 best-selling books for JEE preparation and has mentored over 15,000 students over his illustrious career. His unique visualisation-based teaching method has transformed how students approach complex mathematical problems.',
    achievements: [
      'IIT Bombay Gold Medallist — Mathematics',
      'Author of "Calculus Simplified" (4th edition)',
      'Produced 12 JEE Top-100 rankers in 5 years',
      'Best Faculty Award — APEX 2022, 2023',
      'TEDx speaker on "Reimagining Math Education"',
    ],
  },
  {
    id: 'f2',
    name: 'Dr. Priya Nair',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
    designation: 'Senior Biology Faculty',
    experience: '14 Years',
    subjects: ['Botany', 'Zoology', 'Genetics', 'Ecology'],
    rating: 4.8,
    studentsMentored: 11000,
    successStats: '94% NEET selections',
    bio: 'Dr. Priya Nair holds an MBBS from AIIMS Delhi and has dedicated her career to NEET coaching. Her comprehensive approach — combining conceptual clarity with mnemonics — has produced hundreds of AIIMS-level rankers. She is known for her energetic classroom sessions and personalised doubt-clearing marathons.',
    achievements: [
      'AIIMS Delhi MBBS Graduate',
      'Produced 5 NEET AIR Top-10 students',
      'Authored "NEET Biology Master" guide',
      'Featured in Hindustan Times Education Supplement',
    ],
  },
  {
    id: 'f3',
    name: 'Ramesh Gupta',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
    designation: 'UPSC & GS Faculty',
    experience: '20 Years',
    subjects: ['History', 'Polity', 'Geography', 'Current Affairs'],
    rating: 4.7,
    studentsMentored: 8500,
    successStats: '92% Prelims clear rate',
    bio: 'Ramesh Gupta is an ex-IAS officer who cleared the civil services examination in his first attempt. With two decades of coaching experience, he brings unparalleled insight into the UPSC examination pattern. His answer-writing workshops and interview preparation sessions are legendary among UPSC aspirants across the country.',
    achievements: [
      'Former IAS Officer — Batch 2001',
      'Produced 320 IAS/IPS/IFS selections',
      'Author of "UPSC Prelims Bible" (bestseller)',
      'Government advisor on education policy',
    ],
  },
  {
    id: 'f4',
    name: 'Kavita Mehta',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=300&h=300&fit=crop',
    designation: 'Reasoning & English Faculty',
    experience: '12 Years',
    subjects: ['Logical Reasoning', 'English Grammar', 'Verbal Ability', 'Reading Comprehension'],
    rating: 4.8,
    studentsMentored: 22000,
    successStats: '97% students improve 20+ marks',
    bio: 'Kavita Mehta is an MA English (Gold Medallist) from Pune University. Her shortcut-heavy reasoning techniques and structured grammar frameworks have helped thousands of students crack SSC, Banking, and other competitive exams. She is especially praised for making English grammar accessible to regional-language medium students.',
    achievements: [
      'Pune University Gold Medallist — English',
      'Created "Reason Fast" proprietary technique',
      'Most downloaded course on APEX platform',
      'Best SSC Faculty — India Today 2023',
    ],
  },
  {
    id: 'f5',
    name: 'Suresh Patel',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
    designation: 'Quantitative Aptitude Expert',
    experience: '15 Years',
    subjects: ['Arithmetic', 'Data Interpretation', 'Number Systems', 'Permutation & Combination'],
    rating: 4.7,
    studentsMentored: 18000,
    successStats: '95% Banking selections',
    bio: 'Suresh Patel is a Chartered Accountant and MBA from IIM Ahmedabad. His unique approach of linking real-world financial scenarios to QA concepts makes even the toughest problems approachable. He is the go-to faculty for Banking and SSC examinations and has a cult following among aspirants.',
    achievements: [
      'CA + MBA from IIM Ahmedabad',
      'Produced 800+ Bank PO selections in one year',
      'Authored "Quants Decoded" (3 editions)',
      'Microsoft Excel National Champion 2010',
    ],
  },
  {
    id: 'f6',
    name: 'Ananya Roy',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop',
    designation: 'CAT & MBA Entrance Expert',
    experience: '10 Years',
    subjects: ['VARC', 'DILR', 'Quantitative Aptitude', 'MBA Interview Prep'],
    rating: 4.9,
    studentsMentored: 6000,
    successStats: '88% IIM converts',
    bio: 'Ananya Roy is an IIM Calcutta alumna who chose teaching over consulting. Her reading-centric approach to VARC and her innovative DILR puzzles have made her one of the most sought-after CAT coaches in India. She also offers personalised interview preparation for IIM and other top B-school calls.',
    achievements: [
      'IIM Calcutta — Marketing (Top 5%)',
      'CAT 99.8 percentile scorer',
      'Produced 15 IIM A/B/C converts in 2023',
      'Forbes 30 Under 30 — Education 2021',
    ],
  },
];

export const rankers: Ranker[] = [
  {
    id: 'r1',
    name: 'Arjun Tiwari',
    photo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&h=200&fit=crop',
    airRank: 1,
    exam: 'JEE Advanced',
    year: 2024,
    score: '347/360',
    course: 'JEE Comprehensive',
    testimonial: 'APEX\'s structured approach and Dr. Sharma\'s mentorship made the impossible possible. I can\'t thank the faculty enough.',
  },
  {
    id: 'r2',
    name: 'Sneha Kulkarni',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    airRank: 3,
    exam: 'NEET UG',
    year: 2024,
    score: '712/720',
    course: 'NEET UG Complete',
    testimonial: 'Dr. Priya ma\'am\'s biology sessions were a masterclass in clarity. APEX gave me both knowledge and confidence.',
  },
  {
    id: 'r3',
    name: 'Rohit Deshmukh',
    photo: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop',
    airRank: 12,
    exam: 'UPSC CSE',
    year: 2023,
    score: '1082/2025',
    course: 'UPSC CSE Foundation',
    testimonial: 'Ramesh sir\'s answer-writing workshops were game-changers. The personalised feedback helped me improve dramatically.',
  },
  {
    id: 'r4',
    name: 'Pooja Sharma',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop',
    airRank: 5,
    exam: 'JEE Advanced',
    year: 2024,
    score: '318/360',
    course: 'JEE Comprehensive',
    testimonial: 'The All India Test Series at APEX perfectly simulated the real exam. My rank speaks for itself!',
  },
  {
    id: 'r5',
    name: 'Vikram Singh',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
    airRank: 18,
    exam: 'GATE CSE',
    year: 2024,
    score: '78.67/100',
    course: 'GATE Batch',
    testimonial: 'The formula sheets and previous year solutions provided by APEX saved me countless hours of revision.',
  },
  {
    id: 'r6',
    name: 'Meera Iyer',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    airRank: 7,
    exam: 'NEET UG',
    year: 2023,
    score: '707/720',
    course: 'NEET UG Complete',
    testimonial: 'I failed NEET twice before joining APEX. The faculty here believed in me when I stopped believing in myself.',
  },
  {
    id: 'r7',
    name: 'Kunal Joshi',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop',
    airRank: 2,
    exam: 'CAT',
    year: 2023,
    score: '99.98 percentile',
    course: 'CAT MBA Entrance',
    testimonial: 'Ananya ma\'am\'s VARC tricks alone pushed my score by 15 marks. IIM Ahmedabad was the result!',
  },
  {
    id: 'r8',
    name: 'Divya Rao',
    photo: 'https://images.unsplash.com/photo-1517365830460-955ce3be0547?w=200&h=200&fit=crop',
    airRank: 24,
    exam: 'UPSC CSE',
    year: 2024,
    score: '1074/2025',
    course: 'UPSC CSE Foundation',
    testimonial: 'Three years of rigorous preparation at APEX paid off. The current affairs module was exceptionally useful.',
  },
];

export const mockTests: MockTest[] = [
  {
    id: 'mt1',
    name: 'JEE Main Full Syllabus Mock Test',
    examCategory: 'JEE',
    questionsCount: 90,
    duration: 180,
    difficulty: 'Advanced',
    attempts: 48200,
    rating: 4.8,
    isFree: false,
    isTrending: true,
    hasAllIndiaRank: true,
  },
  {
    id: 'mt2',
    name: 'NEET Biology Practice Test — Genetics',
    examCategory: 'NEET',
    questionsCount: 45,
    duration: 60,
    difficulty: 'Intermediate',
    attempts: 32400,
    rating: 4.7,
    isFree: true,
    isTrending: false,
    hasAllIndiaRank: false,
  },
  {
    id: 'mt3',
    name: 'SSC CGL Tier I Mock Test',
    examCategory: 'SSC',
    questionsCount: 100,
    duration: 60,
    difficulty: 'Intermediate',
    attempts: 71000,
    rating: 4.6,
    isFree: true,
    isTrending: true,
    hasAllIndiaRank: false,
  },
  {
    id: 'mt4',
    name: 'UPSC Prelims GS Paper I Mock',
    examCategory: 'UPSC',
    questionsCount: 100,
    duration: 120,
    difficulty: 'Expert',
    attempts: 29800,
    rating: 4.9,
    isFree: false,
    isTrending: false,
    hasAllIndiaRank: true,
  },
  {
    id: 'mt5',
    name: 'Banking IBPS PO Prelims Mock',
    examCategory: 'Banking',
    questionsCount: 100,
    duration: 60,
    difficulty: 'Intermediate',
    attempts: 95000,
    rating: 4.7,
    isFree: false,
    isTrending: true,
    hasAllIndiaRank: true,
  },
  {
    id: 'mt6',
    name: 'CAT DILR Section Practice',
    examCategory: 'CAT',
    questionsCount: 24,
    duration: 40,
    difficulty: 'Advanced',
    attempts: 18700,
    rating: 4.8,
    isFree: true,
    isTrending: false,
    hasAllIndiaRank: false,
  },
  {
    id: 'mt7',
    name: 'GATE CSE Previous Year Paper 2024',
    examCategory: 'GATE',
    questionsCount: 65,
    duration: 180,
    difficulty: 'Advanced',
    attempts: 14200,
    rating: 4.7,
    isFree: false,
    isTrending: false,
    hasAllIndiaRank: false,
  },
  {
    id: 'mt8',
    name: 'IELTS Academic Reading Practice',
    examCategory: 'IELTS',
    questionsCount: 40,
    duration: 60,
    difficulty: 'Beginner',
    attempts: 27500,
    rating: 4.5,
    isFree: true,
    isTrending: false,
    hasAllIndiaRank: false,
  },
];

export const studyMaterials: StudyMaterial[] = [
  {
    id: 'sm1',
    title: 'JEE Main Physics Formula Sheet',
    type: 'Formula',
    pages: 48,
    downloads: 85000,
    isFree: true,
  },
  {
    id: 'sm2',
    title: 'NEET Biology Complete Notes — Class XI & XII',
    type: 'Notes',
    pages: 380,
    downloads: 62000,
    isFree: false,
  },
  {
    id: 'sm3',
    title: 'UPSC Previous Year Papers (2015–2024)',
    type: 'PYP',
    pages: 520,
    downloads: 44000,
    isFree: false,
  },
  {
    id: 'sm4',
    title: 'SSC CGL Quantitative Aptitude Ebook',
    type: 'Ebook',
    pages: 260,
    downloads: 110000,
    isFree: true,
  },
  {
    id: 'sm5',
    title: 'Banking Awareness Capsule 2025',
    type: 'PDF',
    pages: 95,
    downloads: 78000,
    isFree: true,
  },
  {
    id: 'sm6',
    title: 'CAT VARC Practice Sample Paper',
    type: 'Sample',
    pages: 72,
    downloads: 31000,
    isFree: true,
  },
  {
    id: 'sm7',
    title: 'GATE ECE Full Syllabus Study Material',
    type: 'Notes',
    pages: 640,
    downloads: 22000,
    isFree: false,
  },
  {
    id: 'sm8',
    title: 'IELTS Writing Task 1 & 2 Guide',
    type: 'PDF',
    pages: 120,
    downloads: 41000,
    isFree: true,
  },
];

export const reviews: Review[] = [
  {
    id: 'rv1',
    studentName: 'Arjun Tiwari',
    photo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&h=80&fit=crop',
    course: 'JEE Comprehensive',
    rating: 5,
    reviewText: 'APEX transformed my preparation completely. Dr. Sharma sir\'s classes are world-class. I cracked JEE Advanced with AIR 1. The test series here is the best in India — it exactly mirrors the actual exam difficulty.',
    date: '2024-06-15',
    isVerified: true,
  },
  {
    id: 'rv2',
    studentName: 'Sneha Kulkarni',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop',
    course: 'NEET UG Complete',
    rating: 5,
    reviewText: 'Best coaching for NEET in Pune, no doubt. The biology notes are incredibly detailed and the mock test feedback helped me identify my weak areas quickly. Cleared NEET with 712 marks!',
    date: '2024-05-28',
    isVerified: true,
  },
  {
    id: 'rv3',
    studentName: 'Rohan Patil',
    photo: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&h=80&fit=crop',
    course: 'SSC CGL Batch',
    rating: 4,
    reviewText: 'Good faculty for Reasoning and English. The study material is comprehensive. Would appreciate if more mock tests were added. Overall a great experience and I cleared SSC CGL Tier I.',
    date: '2024-04-10',
    isVerified: true,
  },
  {
    id: 'rv4',
    studentName: 'Priya Verma',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop',
    course: 'UPSC CSE Foundation',
    rating: 5,
    reviewText: 'Ramesh sir\'s guidance was the key to my success. The structured approach, daily current affairs, and answer writing practice made all the difference in my Mains performance.',
    date: '2023-12-20',
    isVerified: true,
  },
  {
    id: 'rv5',
    studentName: 'Kunal Bhatt',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop',
    course: 'Banking (IBPS PO)',
    rating: 4,
    reviewText: 'Suresh sir\'s quantitative aptitude sessions are incredibly efficient. Cleared IBPS PO in 4 months. The shortcuts and tricks taught here aren\'t available anywhere else.',
    date: '2024-03-05',
    isVerified: false,
  },
  {
    id: 'rv6',
    studentName: 'Aarti Joshi',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop',
    course: 'CAT MBA Entrance',
    rating: 5,
    reviewText: 'Ananya ma\'am is phenomenal. Got 99.6 percentile in CAT 2023. The DILR sets she provides are tougher than actual CAT which makes the exam feel easy on the day!',
    date: '2024-01-18',
    isVerified: true,
  },
  {
    id: 'rv7',
    studentName: 'Siddharth Rao',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop',
    course: 'GATE Batch',
    rating: 4,
    reviewText: 'The GATE study material is excellent. Faculty is knowledgeable and covers every concept from the syllabus. The mock tests with detailed solutions are very helpful.',
    date: '2024-02-25',
    isVerified: true,
  },
  {
    id: 'rv8',
    studentName: 'Nidhi Sharma',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop',
    course: 'IELTS Academic',
    rating: 5,
    reviewText: 'Got Band 8.5 in IELTS. The practice sessions and speaking mock tests were incredibly realistic. The writing feedback from the faculty was detailed and actionable.',
    date: '2024-05-14',
    isVerified: true,
  },
  {
    id: 'rv9',
    studentName: 'Akash Mehta',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop',
    course: 'JEE Comprehensive',
    rating: 4,
    reviewText: 'Great coaching overall. Maths and Physics faculty are exceptionally good. Chemistry could be a bit more detailed. The infrastructure and study environment are top-notch.',
    date: '2024-04-30',
    isVerified: false,
  },
  {
    id: 'rv10',
    studentName: 'Deepika Nair',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop',
    course: 'NEET UG Complete',
    rating: 5,
    reviewText: 'APEX is worth every rupee. The faculty here are not just teachers — they are mentors who genuinely care about your success. AIIMS Delhi was my dream and now it\'s my reality!',
    date: '2024-06-02',
    isVerified: true,
  },
  {
    id: 'rv11',
    studentName: 'Rajan Singh',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop',
    course: 'UPSC CSE Foundation',
    rating: 5,
    reviewText: 'Very professional institute. The study material is updated regularly and the mock interviews are conducted by former IAS officers. Cleared Mains in my first attempt.',
    date: '2023-11-30',
    isVerified: true,
  },
  {
    id: 'rv12',
    studentName: 'Pallavi Desai',
    photo: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop',
    course: 'SSC CGL Batch',
    rating: 4,
    reviewText: 'Really helpful faculty and good study environment. The online portal with recorded lectures is a big advantage when you miss a class. Infrastructure is excellent.',
    date: '2024-03-22',
    isVerified: false,
  },
];

export const facilities: Facility[] = [
  {
    id: 'fac1',
    name: 'Smart Classrooms',
    icon: 'Monitor',
    description: 'All classrooms equipped with HD projectors, interactive whiteboards, and high-speed internet.',
  },
  {
    id: 'fac2',
    name: 'Digital Library',
    icon: 'Library',
    description: '25,000+ books, journals, and digital resources accessible 24/7 via the student portal.',
  },
  {
    id: 'fac3',
    name: 'Computer Lab',
    icon: 'Laptop',
    description: '200-seat air-conditioned computer lab with the latest systems for online test practice.',
  },
  {
    id: 'fac4',
    name: 'Hostel Facility',
    icon: 'Building2',
    description: 'Separate hostels for boys and girls with meals, Wi-Fi, and 24/7 security.',
  },
  {
    id: 'fac5',
    name: 'Canteen',
    icon: 'UtensilsCrossed',
    description: 'Hygienic canteen serving nutritious meals and snacks at affordable prices.',
  },
  {
    id: 'fac6',
    name: 'Doubt Clearing Centre',
    icon: 'HelpCircle',
    description: 'Dedicated doubt-clearing rooms open 8 AM–10 PM with faculty available daily.',
  },
  {
    id: 'fac7',
    name: 'Medical Room',
    icon: 'Stethoscope',
    description: 'In-house nurse and first-aid room for student health emergencies.',
  },
  {
    id: 'fac8',
    name: 'Free Wi-Fi',
    icon: 'Wifi',
    description: 'Campus-wide high-speed Wi-Fi for seamless access to online resources.',
  },
  {
    id: 'fac9',
    name: 'Counselling Cell',
    icon: 'HeartHandshake',
    description: 'Psychologists and academic counsellors to support student wellbeing and motivation.',
  },
  {
    id: 'fac10',
    name: 'Transport Facility',
    icon: 'Bus',
    description: 'AC buses covering 35+ routes across Pune city for safe and comfortable commute.',
  },
];

export const highlights: Highlight[] = [
  {
    id: 'h1',
    title: '2,50,000+ Students',
    description: 'Trained over 20 years of excellence in education',
    icon: 'Users',
    color: 'bg-blue-100',
  },
  {
    id: 'h2',
    title: '18,000+ Selections',
    description: 'Students placed in IITs, AIIMS, IAS, and more',
    icon: 'Trophy',
    color: 'bg-yellow-100',
  },
  {
    id: 'h3',
    title: '94% Success Rate',
    description: 'Industry-leading success rate across all exams',
    icon: 'TrendingUp',
    color: 'bg-green-100',
  },
  {
    id: 'h4',
    title: '85 Expert Faculties',
    description: 'IITians, IIMians, AIIMS doctors & IAS officers',
    icon: 'GraduationCap',
    color: 'bg-purple-100',
  },
  {
    id: 'h5',
    title: '24 Courses',
    description: 'Covering all major competitive exams in India',
    icon: 'BookOpenCheck',
    color: 'bg-orange-100',
  },
  {
    id: 'h6',
    title: '500+ Mock Tests',
    description: 'AI-powered All India Test Series with rank predictor',
    icon: 'ClipboardCheck',
    color: 'bg-pink-100',
  },
  {
    id: 'h7',
    title: 'Hybrid Learning',
    description: 'Seamless blend of offline classes and online platform',
    icon: 'Layers',
    color: 'bg-teal-100',
  },
  {
    id: 'h8',
    title: '20 Years Legacy',
    description: 'Established in 2005, trusted by generations of students',
    icon: 'Award',
    color: 'bg-indigo-100',
  },
  {
    id: 'h9',
    title: 'ISO 9001:2015',
    description: 'Internationally certified quality management system',
    icon: 'BadgeCheck',
    color: 'bg-cyan-100',
  },
  {
    id: 'h10',
    title: 'EMI Available',
    description: 'Flexible fee payment with 0% interest EMI options',
    icon: 'CreditCard',
    color: 'bg-rose-100',
  },
];

export const faqs: FAQ[] = [
  {
    id: 'faq1',
    question: 'What is the batch size at APEX Coaching Institute?',
    answer: 'We maintain small batch sizes of 40–60 students to ensure personalised attention. Each batch is assigned a dedicated mentor for regular progress tracking and doubt resolution.',
  },
  {
    id: 'faq2',
    question: 'Do you provide study material as part of the course fee?',
    answer: 'Yes, comprehensive printed and digital study material is included in the course fee. This includes textbooks, formula sheets, previous year papers, and access to the APEX digital library.',
  },
  {
    id: 'faq3',
    question: 'Is there an EMI option available for fee payment?',
    answer: 'Yes, we offer 0% interest EMI plans for up to 12 months in partnership with leading banks. We also have scholarships available for meritorious students based on entrance test performance.',
  },
  {
    id: 'faq4',
    question: 'Are online classes available if I miss a lecture?',
    answer: 'All live classes are recorded and uploaded to the APEX student portal within 24 hours. You can re-watch any session unlimited times throughout your course duration.',
  },
  {
    id: 'faq5',
    question: 'How do I enrol in a course at APEX?',
    answer: 'You can enquire online, call our helpline (1800-123-4567), or visit our Pune centre directly. After a counselling session and free demo class, you can complete enrolment online or in person.',
  },
  {
    id: 'faq6',
    question: 'What is the refund policy?',
    answer: 'We offer a 7-day no-questions-asked refund policy from the date of enrolment if you attend the first class. After 7 days, a prorated refund is available up to 30 days from enrolment.',
  },
  {
    id: 'faq7',
    question: 'Are mock interviews available for UPSC candidates?',
    answer: 'Yes, our UPSC programme includes mock interview sessions conducted by former IAS/IPS officers. These are typically held 6–8 weeks before the UPSC interview date each year.',
  },
  {
    id: 'faq8',
    question: 'Do you have a hostel facility for outstation students?',
    answer: 'Yes, we have separate hostels for boys and girls near our Pune centre. The hostel includes meals, Wi-Fi, study rooms, and 24/7 security. Contact us for current availability and pricing.',
  },
];

export const similarInstitutes: SimilarInstitute[] = [
  {
    id: 'si1',
    name: 'Brilliant Study Circle',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=400&h=250&fit=crop',
    rating: 4.6,
    location: 'Pune, Maharashtra',
    courses: ['JEE', 'NEET', 'MHT-CET'],
  },
  {
    id: 'si2',
    name: 'Vision IAS Pune',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop',
    rating: 4.7,
    location: 'Pune, Maharashtra',
    courses: ['UPSC', 'MPSC', 'State PSC'],
  },
  {
    id: 'si3',
    name: 'Career Launcher',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop',
    rating: 4.5,
    location: 'Mumbai, Maharashtra',
    courses: ['CAT', 'XAT', 'SNAP'],
  },
  {
    id: 'si4',
    name: 'Achievers Academy',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=250&fit=crop',
    rating: 4.4,
    location: 'Nashik, Maharashtra',
    courses: ['SSC', 'Banking', 'Railway'],
  },
  {
    id: 'si5',
    name: 'Pinnacle Coaching',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop',
    rating: 4.5,
    location: 'Pune, Maharashtra',
    courses: ['GATE', 'ESE', 'PSU'],
  },
];

// ─────────────────────────────────────────────
// ALLEN Career Institute — Kota
// ─────────────────────────────────────────────

export const allenInstitute: Institute = {
  name: 'ALLEN Career Institute',
  slug: 'allen-career-institute',
  logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=200&fit=crop',
  banner: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1400&h=450&fit=crop',
  tagline: 'India\'s Most Trusted Name in JEE & NEET Coaching Since 1988',
  rating: 4.9,
  reviewCount: 31200,
  location: 'Kota, Rajasthan',
  established: 1988,
  accreditations: ['ISO 9001:2015', 'Govt. Recognised', 'NAAC A++'],
  isVerified: true,
  description:
    'ALLEN Career Institute is India\'s leading coaching destination for JEE and NEET aspirants. Founded in Kota in 1988, ALLEN has guided over 15 lakh students to premier engineering and medical colleges with a record 45,000+ IIT & NEET selections annually.',
  metrics: {
    studentsTrained: '15,00,000+',
    totalSelections: '45,000+',
    coursesOffered: 18,
    faculties: 200,
    successRate: '97%',
  },
  ratingDistribution: { 5: 24000, 4: 5200, 3: 1200, 2: 500, 1: 300 },
  admissionSteps: [
    { stepNumber: 1, title: 'Apply Online', description: 'Register on the ALLEN portal and choose your programme and centre.', icon: 'ClipboardList' },
    { stepNumber: 2, title: 'ALLEN Talent Exam', description: 'Appear for the scholarship-cum-admission test for fee waiver.', icon: 'BookOpen' },
    { stepNumber: 3, title: 'Counselling', description: 'Discuss batch options, study plan, and hostel facilities with a counsellor.', icon: 'Users' },
    { stepNumber: 4, title: 'Fee & Enrolment', description: 'Complete admission formalities and fee payment with EMI options.', icon: 'CreditCard' },
    { stepNumber: 5, title: 'Begin Classes', description: 'Attend orientation and receive study materials on Day 1.', icon: 'CalendarCheck' },
  ],
};

export const allenCourses: Course[] = [
  {
    id: 'ac1',
    title: 'JEE Main + Advanced Leader Batch',
    examCategory: 'JEE',
    duration: '2 Years',
    fee: 120000,
    originalFee: 150000,
    mode: 'Classroom',
    language: 'Hindi / English',
    batchStartDate: '2025-04-10',
    studentCount: 3200,
    rating: 4.9,
    ratingCount: 8400,
    difficulty: 'Advanced',
    highlights: ['Daily DPP', 'Weekly Tests', 'Personal Mentoring', 'Rank Booster Sessions'],
  },
  {
    id: 'ac2',
    title: 'NEET Medical Nurture Batch',
    examCategory: 'NEET',
    duration: '2 Years',
    fee: 110000,
    originalFee: 135000,
    mode: 'Classroom',
    language: 'Hindi / English',
    batchStartDate: '2025-04-15',
    studentCount: 2800,
    rating: 4.8,
    ratingCount: 6200,
    difficulty: 'Intermediate',
    highlights: ['NCERT Focus', 'Biology Special Batches', 'Mock NEET Series', 'Doubt Sessions'],
  },
  {
    id: 'ac3',
    title: 'JEE Crash Course (Class 12 Pass)',
    examCategory: 'JEE',
    duration: '3 Months',
    fee: 35000,
    originalFee: 50000,
    mode: 'Hybrid',
    language: 'Hindi / English',
    batchStartDate: '2025-02-01',
    studentCount: 1800,
    rating: 4.7,
    ratingCount: 3100,
    difficulty: 'Advanced',
    highlights: ['Intensive Revision', 'PYQ Solving', 'Full Syllabus Tests', 'Rank Improvement'],
  },
];

export const allenLiveBatches: LiveBatch[] = [
  {
    id: 'alb1',
    courseTitle: 'JEE Leader Batch — Inorganic Chemistry',
    facultyName: 'Dr. R.K. Verma',
    facultyImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
    timing: '7:00 AM – 9:00 AM',
    duration: '2 hrs',
    seatsTotal: 120,
    seatsLeft: 14,
    nextSession: '2025-07-10',
    language: 'Hindi',
    isLive: true,
  },
  {
    id: 'alb2',
    courseTitle: 'NEET Biology — Human Physiology',
    facultyName: 'Dr. Sunita Sharma',
    facultyImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
    timing: '10:00 AM – 12:00 PM',
    duration: '2 hrs',
    seatsTotal: 100,
    seatsLeft: 22,
    nextSession: '2025-07-10',
    language: 'Hindi',
    isLive: false,
  },
];

export const allenFaculties: Faculty[] = [
  {
    id: 'af1',
    name: 'Dr. R.K. Verma',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    designation: 'Senior Faculty — Chemistry',
    experience: '22 Years',
    subjects: ['Inorganic Chemistry', 'Physical Chemistry'],
    rating: 4.9,
    studentsMentored: 18000,
    successStats: '3,200 IIT selections',
    bio: 'Dr. Verma is ALLEN\'s most sought-after chemistry faculty with 22 years of experience and over 18,000 students mentored.',
    achievements: ['Best Faculty Award 2021', '3,200 IIT Selections', 'PhD IIT Bombay'],
  },
  {
    id: 'af2',
    name: 'Dr. Sunita Sharma',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    designation: 'Senior Faculty — Biology',
    experience: '18 Years',
    subjects: ['Zoology', 'Botany'],
    rating: 4.8,
    studentsMentored: 12000,
    successStats: '2,800 NEET selections',
    bio: 'Dr. Sharma specialises in Human Physiology and Genetics with a track record of NEET top rankers every year.',
    achievements: ['NEET Faculty Excellence Award 2022', 'PhD AIIMS Delhi'],
  },
];

export const allenRankers: Ranker[] = [
  { id: 'ar1', name: 'Ananya Tripathi', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop', airRank: 1, exam: 'JEE Advanced', year: 2024, score: '340/360', course: 'JEE Leader Batch', testimonial: 'ALLEN\'s rigorous DPP system and personal mentoring made AIR 1 possible.' },
  { id: 'ar2', name: 'Rohan Meena', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop', airRank: 2, exam: 'NEET UG', year: 2024, score: '715/720', course: 'NEET Nurture Batch', testimonial: 'Best biology faculty in India. Their test series is unmatched.' },
  { id: 'ar3', name: 'Priya Agarwal', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop', airRank: 5, exam: 'JEE Advanced', year: 2024, score: '328/360', course: 'JEE Leader Batch', testimonial: 'The study material here covers every concept in depth.' },
];

export const allenMockTests: MockTest[] = [
  { id: 'amt1', name: 'JEE Advanced Full Mock — Series 1', examCategory: 'JEE', questionsCount: 54, duration: 180, difficulty: 'Hard', attempts: 85000, rating: 4.9, isFree: false, isTrending: true, hasAllIndiaRank: true },
  { id: 'amt2', name: 'NEET Weekly Practice Test', examCategory: 'NEET', questionsCount: 180, duration: 200, difficulty: 'Medium', attempts: 110000, rating: 4.8, isFree: true, isTrending: true, hasAllIndiaRank: true },
];

export const allenStudyMaterials: StudyMaterial[] = [
  { id: 'asm1', title: 'JEE Physics Module — Mechanics', type: 'PDF', pages: 320, downloads: 52000, isFree: false },
  { id: 'asm2', title: 'NEET Biology NCERT Notes', type: 'Notes', pages: 280, downloads: 88000, isFree: true },
  { id: 'asm3', title: 'JEE PYQ 2015–2024 Solutions', type: 'PYP', pages: 560, downloads: 74000, isFree: true },
];

export const allenReviews: Review[] = [
  { id: 'arv1', studentName: 'Vikram Singh', photo: '', course: 'JEE Leader Batch', rating: 5, reviewText: 'AIR 28 JEE Advanced. ALLEN\'s test series and faculty are world-class. The DPP practice every day is what sets ALLEN apart from every other coaching.', date: '2024-06-18', isVerified: true },
  { id: 'arv2', studentName: 'Disha Kumari', photo: '', course: 'NEET Nurture Batch', rating: 5, reviewText: 'Scored 710/720 in NEET 2024. Dr. Sharma\'s biology classes are phenomenal — every concept explained with clinical examples.', date: '2024-06-02', isVerified: true },
  { id: 'arv3', studentName: 'Akash Jain', photo: '', course: 'JEE Leader Batch', rating: 4, reviewText: 'Very good institute. The infrastructure is excellent and the study material is comprehensive. Pace is very fast so be prepared.', date: '2024-05-20', isVerified: true },
];

export const allenFacilities: Facility[] = [
  { id: 'afac1', name: 'AC Classrooms', icon: 'Wind', description: 'All classrooms fully air-conditioned with smart boards.' },
  { id: 'afac2', name: 'Digital Library', icon: 'BookOpen', description: '24/7 digital library with 10,000+ e-resources.' },
  { id: 'afac3', name: 'Hostel', icon: 'Home', description: 'Separate boys and girls hostels with meals and WiFi.' },
  { id: 'afac4', name: 'Medical Support', icon: 'Heart', description: 'On-campus medical room with full-time nurse.' },
];

export const allenHighlights: Highlight[] = [
  { id: 'ah1', title: '45,000+ Annual Selections', description: 'Record IIT + NEET selections every year since 2015.', icon: 'Award', color: 'amber' },
  { id: 'ah2', title: 'India\'s #1 JEE AIR 1', description: 'Multiple All India Rank 1 holders from ALLEN batches.', icon: 'Trophy', color: 'yellow' },
  { id: 'ah3', title: '200+ Expert Faculties', description: 'IITians and doctors with decades of teaching experience.', icon: 'Users', color: 'blue' },
  { id: 'ah4', title: '35 Centres Nationwide', description: 'Pan-India network with the same quality everywhere.', icon: 'MapPin', color: 'green' },
];

export const allenFaqs: FAQ[] = [
  { id: 'afaq1', question: 'Is ALLEN Kota the best for JEE?', answer: 'ALLEN Kota consistently produces the most IIT selections in India and has multiple AIR 1 holders, making it one of the top choices for serious JEE aspirants.' },
  { id: 'afaq2', question: 'What is the fee structure for JEE 2-year programme?', answer: 'The 2-year JEE Leader Batch fee is ₹1,20,000 per year. Scholarships up to 90% are available based on the ALLEN Talent Exam score.' },
  { id: 'afaq3', question: 'Does ALLEN provide hostel facilities?', answer: 'Yes, ALLEN has dedicated hostels near all major centres. Kota hostels include meals, Wi-Fi, laundry, and recreational areas.' },
  { id: 'afaq4', question: 'Can I join online from outside Kota?', answer: 'Yes, ALLEN offers a robust online platform called ALLEN Digital with live and recorded classes, tests, and doubt-clearing sessions.' },
];

export const allenSimilarInstitutes: SimilarInstitute[] = [
  { id: 'asi1', name: 'APEX Coaching Institute', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop', rating: 4.8, location: 'Pune, Maharashtra', courses: ['JEE', 'NEET', 'UPSC'] },
  { id: 'asi2', name: 'FIITJEE Delhi', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop', rating: 4.7, location: 'Delhi NCR', courses: ['JEE', 'Olympiad'] },
  { id: 'asi3', name: 'Resonance Kota', image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=400&h=250&fit=crop', rating: 4.6, location: 'Kota, Rajasthan', courses: ['JEE', 'NEET', 'KVPY'] },
];

// ─────────────────────────────────────────────
// FIITJEE — Delhi NCR
// ─────────────────────────────────────────────

export const fiitjeeInstitute: Institute = {
  name: 'FIITJEE Delhi',
  slug: 'fiitjee-delhi',
  logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=200&fit=crop',
  banner: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1400&h=450&fit=crop',
  tagline: 'Engineering Excellence — Shaping IIT Toppers Since 1992',
  rating: 4.7,
  reviewCount: 18600,
  location: 'Delhi NCR',
  established: 1992,
  accreditations: ['ISO 9001:2015', 'Govt. Recognised'],
  isVerified: true,
  description:
    'FIITJEE (Forum for Indian Institute of Technology Joint Entrance Examination) was founded in 1992 and is among the pioneers of modern JEE coaching in India. With 9 Delhi NCR centres and a legacy of JEE toppers, FIITJEE combines deep conceptual learning with rigorous practice.',
  metrics: {
    studentsTrained: '8,00,000+',
    totalSelections: '28,000+',
    coursesOffered: 14,
    faculties: 140,
    successRate: '92%',
  },
  ratingDistribution: { 5: 12000, 4: 4200, 3: 1500, 2: 600, 1: 300 },
  admissionSteps: [
    { stepNumber: 1, title: 'Talent Reward Exam', description: 'Appear for the FIITJEE Talent Reward Exam to earn admission and scholarships.', icon: 'BookOpen' },
    { stepNumber: 2, title: 'Select Programme', description: 'Choose from classroom, online, or hybrid batches based on your schedule.', icon: 'ClipboardList' },
    { stepNumber: 3, title: 'Counselling', description: 'Speak with a senior faculty member to map out your JEE preparation journey.', icon: 'Users' },
    { stepNumber: 4, title: 'Enrolment & Fee', description: 'Complete admission and pay via one-time or instalment options.', icon: 'CreditCard' },
    { stepNumber: 5, title: 'Orientation Day', description: 'Attend orientation, collect study material, and meet your batch mentor.', icon: 'CalendarCheck' },
  ],
};

export const fiitjeeCourses: Course[] = [
  {
    id: 'fc1',
    title: 'Four Year Classroom Programme (Class 9)',
    examCategory: 'JEE',
    duration: '4 Years',
    fee: 95000,
    originalFee: 120000,
    mode: 'Classroom',
    language: 'English',
    batchStartDate: '2025-04-01',
    studentCount: 1200,
    rating: 4.8,
    ratingCount: 4200,
    difficulty: 'Advanced',
    highlights: ['Foundation + JEE', 'School Integrated', 'Olympiad Preparation', 'NTSE Coaching'],
  },
  {
    id: 'fc2',
    title: 'Two Year JEE Classroom Programme',
    examCategory: 'JEE',
    duration: '2 Years',
    fee: 130000,
    originalFee: 160000,
    mode: 'Classroom',
    language: 'English',
    batchStartDate: '2025-04-10',
    studentCount: 2400,
    rating: 4.7,
    ratingCount: 6800,
    difficulty: 'Advanced',
    highlights: ['Integrated Testing', 'AIR Rank Simulation', 'Doubt Classes', 'Phase Tests'],
  },
  {
    id: 'fc3',
    title: 'One Year Intensive Programme',
    examCategory: 'JEE',
    duration: '1 Year',
    fee: 75000,
    originalFee: 95000,
    mode: 'Hybrid',
    language: 'English',
    batchStartDate: '2025-06-01',
    studentCount: 1600,
    rating: 4.6,
    ratingCount: 3400,
    difficulty: 'Advanced',
    highlights: ['Concept Revision', 'Test Series', 'Rank Improvement', 'Online Access'],
  },
];

export const fiitjeeLiveBatches: LiveBatch[] = [
  {
    id: 'flb1',
    courseTitle: 'JEE 2-Year — Wave Optics (Physics)',
    facultyName: 'Prof. A.K. Singh',
    facultyImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop',
    timing: '8:00 AM – 10:00 AM',
    duration: '2 hrs',
    seatsTotal: 80,
    seatsLeft: 9,
    nextSession: '2025-07-11',
    language: 'English',
    isLive: true,
  },
  {
    id: 'flb2',
    courseTitle: 'JEE 2-Year — Organic Chemistry Master Class',
    facultyName: 'Dr. Meena Rathi',
    facultyImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop',
    timing: '11:00 AM – 1:00 PM',
    duration: '2 hrs',
    seatsTotal: 80,
    seatsLeft: 18,
    nextSession: '2025-07-11',
    language: 'English',
    isLive: false,
  },
];

export const fiitjeeFaculties: Faculty[] = [
  {
    id: 'ff1',
    name: 'Prof. A.K. Singh',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    designation: 'Head of Physics Department',
    experience: '28 Years',
    subjects: ['Mechanics', 'Electrodynamics', 'Optics'],
    rating: 4.9,
    studentsMentored: 22000,
    successStats: '4,100 IIT selections',
    bio: 'Prof. Singh is a legend in JEE Physics coaching, known for making complex topics intuitive through real-world analogies.',
    achievements: ['IIT Bombay Alumni', 'Best Faculty Award 5 years running', '4,100 IIT selections'],
  },
  {
    id: 'ff2',
    name: 'Dr. Meena Rathi',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop',
    designation: 'Senior Faculty — Chemistry',
    experience: '20 Years',
    subjects: ['Organic Chemistry', 'Reaction Mechanisms'],
    rating: 4.8,
    studentsMentored: 15000,
    successStats: '2,900 IIT selections',
    bio: 'Dr. Rathi is renowned for her organic chemistry mastery, making reaction mechanisms simple enough for any student to ace.',
    achievements: ['PhD Delhi University', '2,900 IIT selections', 'Best Teacher 2023'],
  },
];

export const fiitjeeRankers: Ranker[] = [
  { id: 'fr1', name: 'Kartik Gupta', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop', airRank: 3, exam: 'JEE Advanced', year: 2024, score: '335/360', course: '2-Year Classroom', testimonial: 'FIITJEE\'s phase tests perfectly simulate JEE difficulty. I was never surprised on exam day.' },
  { id: 'fr2', name: 'Sneha Pillai', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop', airRank: 11, exam: 'JEE Advanced', year: 2024, score: '319/360', course: '4-Year Programme', testimonial: 'Starting from Class 9 with FIITJEE gave me the depth I needed for AIR 11.' },
  { id: 'fr3', name: 'Arjun Malhotra', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop', airRank: 18, exam: 'JEE Advanced', year: 2023, score: '308/360', course: '2-Year Classroom', testimonial: 'Best physics faculty I\'ve ever encountered. Prof. Singh is extraordinary.' },
];

export const fiitjeeMockTests: MockTest[] = [
  { id: 'fmt1', name: 'FIITJEE Grand Test — GT-1 2025', examCategory: 'JEE', questionsCount: 54, duration: 180, difficulty: 'Hard', attempts: 62000, rating: 4.8, isFree: false, isTrending: true, hasAllIndiaRank: true },
  { id: 'fmt2', name: 'JEE Main Pattern Test', examCategory: 'JEE', questionsCount: 75, duration: 180, difficulty: 'Medium', attempts: 45000, rating: 4.6, isFree: true, isTrending: false, hasAllIndiaRank: false },
];

export const fiitjeeStudyMaterials: StudyMaterial[] = [
  { id: 'fsm1', title: 'FIITJEE Physics Ranker Study Material', type: 'PDF', pages: 400, downloads: 38000, isFree: false },
  { id: 'fsm2', title: 'JEE Maths Formula Sheet', type: 'Formula', pages: 48, downloads: 95000, isFree: true },
  { id: 'fsm3', title: 'FIITJEE PYQ Solutions 2018–2024', type: 'PYP', pages: 480, downloads: 60000, isFree: false },
];

export const fiitjeeReviews: Review[] = [
  { id: 'frv1', studentName: 'Ishaan Kapoor', photo: '', course: '2-Year Classroom', rating: 5, reviewText: 'AIR 8 JEE Advanced 2024. Prof. Singh\'s physics classes redefined my understanding of the subject. The phase-test schedule is tough but extremely effective.', date: '2024-06-20', isVerified: true },
  { id: 'frv2', studentName: 'Neha Tyagi', photo: '', course: '4-Year Programme', rating: 5, reviewText: 'Joined in Class 9 and got AIR 24 JEE Advanced. FIITJEE\'s long-term programme builds the concept layer by layer — nothing is rushed.', date: '2024-06-05', isVerified: true },
  { id: 'frv3', studentName: 'Saurabh Rao', photo: '', course: 'One Year Intensive', rating: 4, reviewText: 'Good institute with strong faculty. Pace is fast but the quality of teaching is excellent. Study material is the best I\'ve seen for JEE.', date: '2024-05-28', isVerified: true },
];

export const fiitjeeFacilities: Facility[] = [
  { id: 'ffac1', name: 'Smart Classrooms', icon: 'Monitor', description: 'Digital boards with 3D animation for complex concepts.' },
  { id: 'ffac2', name: 'Resource Centre', icon: 'BookOpen', description: 'Dedicated resource centre with previous year papers and books.' },
  { id: 'ffac3', name: 'Test Labs', icon: 'FlaskConical', description: 'Computer labs for online mock tests mirroring JEE interface.' },
  { id: 'ffac4', name: 'Canteen', icon: 'Utensils', description: 'Hygienic in-campus canteen for students.' },
];

export const fiitjeeHighlights: Highlight[] = [
  { id: 'fh1', title: '28,000+ IIT Selections', description: '3 decades of producing IIT toppers from FIITJEE Delhi.', icon: 'Award', color: 'blue' },
  { id: 'fh2', title: '9 Delhi NCR Centres', description: 'Centres across South Delhi, Noida, Gurgaon and more.', icon: 'MapPin', color: 'green' },
  { id: 'fh3', title: 'Olympiad Track Record', description: 'Consistent medallist output in International Physics & Chemistry Olympiads.', icon: 'Trophy', color: 'amber' },
  { id: 'fh4', title: 'Research-Driven Teaching', description: 'Pedagogy continuously refined by analysis of JEE paper patterns.', icon: 'TrendingUp', color: 'purple' },
];

export const fiitjeeFaqs: FAQ[] = [
  { id: 'ffaq1', question: 'Is FIITJEE good for JEE Advanced preparation?', answer: 'Yes, FIITJEE has produced thousands of IIT toppers and multiple single-digit AIR holders over its 30-year history. Its phase-test system and study material are particularly well-suited for JEE Advanced.' },
  { id: 'ffaq2', question: 'What is the difference between 2-Year and 4-Year programmes?', answer: 'The 4-Year programme (from Class 9/10) focuses on building foundational concepts and also covers school exams, Olympiads, and NTSE. The 2-Year programme (from Class 11) is intensive JEE-focused preparation.' },
  { id: 'ffaq3', question: 'Does FIITJEE offer online classes?', answer: 'Yes, FIITJEE offers hybrid and fully online programmes via myPAT and FIITJEE World School platforms with live and recorded sessions.' },
  { id: 'ffaq4', question: 'Are scholarships available?', answer: 'Scholarships up to 100% are offered based on the Talent Reward Exam score, previous board results, and JEE Main score.' },
];

export const fiitjeeSimilarInstitutes: SimilarInstitute[] = [
  { id: 'fsi1', name: 'ALLEN Career Institute', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=250&fit=crop', rating: 4.9, location: 'Kota, Rajasthan', courses: ['JEE', 'NEET'] },
  { id: 'fsi2', name: 'APEX Coaching Institute', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop', rating: 4.8, location: 'Pune, Maharashtra', courses: ['JEE', 'NEET', 'UPSC'] },
  { id: 'fsi3', name: 'Resonance Delhi', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop', rating: 4.6, location: 'Delhi NCR', courses: ['JEE', 'NEET'] },
];

// ─────────────────────────────────────────────
// Institute Registry (slug → full data bundle)
// ─────────────────────────────────────────────

import type { CoachingInstituteData } from '@/context/CoachingContext';

export const instituteRegistry: Record<string, CoachingInstituteData> = {
  'apex-coaching': {
    institute,
    courses,
    liveBatches,
    faculties,
    rankers,
    mockTests,
    studyMaterials,
    reviews,
    facilities,
    highlights,
    faqs,
    similarInstitutes,
  },
  'allen-career-institute': {
    institute: allenInstitute,
    courses: allenCourses,
    liveBatches: allenLiveBatches,
    faculties: allenFaculties,
    rankers: allenRankers,
    mockTests: allenMockTests,
    studyMaterials: allenStudyMaterials,
    reviews: allenReviews,
    facilities: allenFacilities,
    highlights: allenHighlights,
    faqs: allenFaqs,
    similarInstitutes: allenSimilarInstitutes,
  },
  'fiitjee-delhi': {
    institute: fiitjeeInstitute,
    courses: fiitjeeCourses,
    liveBatches: fiitjeeLiveBatches,
    faculties: fiitjeeFaculties,
    rankers: fiitjeeRankers,
    mockTests: fiitjeeMockTests,
    studyMaterials: fiitjeeStudyMaterials,
    reviews: fiitjeeReviews,
    facilities: fiitjeeFacilities,
    highlights: fiitjeeHighlights,
    faqs: fiitjeeFaqs,
    similarInstitutes: fiitjeeSimilarInstitutes,
  },
};
