// ─────────────────────────────────────────────────────────────
// Mock data for the Language Learning Center detail page.
// All content here is dummy data for UI demonstration only.
// ─────────────────────────────────────────────────────────────
import type { LucideIcon } from 'lucide-react';
import {
  Globe, Users, Award, Wallet, Clock, MonitorSmartphone,
  Laptop, Building2, Blend, CalendarClock, Briefcase, UserCheck,
  Wifi, Car, Snowflake, Library, MonitorPlay, School,
  BadgeCheck, FileText, Languages as LanguagesIcon, GraduationCap,
} from 'lucide-react';

// Curated, themed mock imagery for visualization (reliable Unsplash photos).
// Keyed by the seeds used below so every gallery/thumbnail/banner upgrades at once.
const eduImg: Record<string, string> = {
  'linguaverse-banner': '1541339907198-e08756dedf3f', // university lecture hall
  'lv-logo':           '1544716278-ca5e3f4abd8c',     // globe/world — logo
  'lv-classroom-1': '1524178232363-1fb2b075b655',     // lecture hall
  'lv-classroom-2': '1509062522246-3755977927d7',     // classroom
  'lv-event-1': '1517048676732-d65bc937f952',          // group meeting
  'lv-event-2': '1522202176988-66273c2fd55f',          // team collaboration
  'lv-campus-1': '1562774053-701939374585',            // campus building
  'lv-campus-2': '1497486751825-1233686d5d80',         // study desk
  'lv-video-1': '1543269865-cbf427effbad',             // students studying
  'lv-video-2': '1523240795612-9a054b0db644',          // people learning
  'lv-vr-1': '1531482615713-2afd69097998',             // collaboration
  'lv-vr-2': '1571260899304-425eee4c7efc',             // students group
  'lv-vr-3': '1503676260728-1c00da094a0b',             // laptop study
  'sc-1': '1517245386807-bb43f82c33c4',
  'sc-2': '1577896851231-70ef18881754',
  'sc-3': '1454165804606-c3d57bc86b40',
  'sc-4': '1488190211105-8b0e65b80b4e',
  'sc-5': '1498243691581-b145c3f54a5a',
};

const photo = (seed: string, w = 800, h = 600) => {
  const id = eduImg[seed];
  return id
    ? `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=70`
    : `https://picsum.photos/seed/${seed}/${w}/${h}`;
};

const face = (n: number) => `https://i.pravatar.cc/300?img=${n}`;

const logo = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0a2540&color=fff&size=160&bold=true&format=png`;

/* ── Icon registry ──────────────────────────────────────────────
   Data stores serializable string keys (not component refs) so the
   whole `center` object can cross the Server→Client boundary. */
export const iconMap = {
  globe: Globe,
  users: Users,
  award: Award,
  wallet: Wallet,
  clock: Clock,
  'monitor-smartphone': MonitorSmartphone,
  laptop: Laptop,
  building: Building2,
  blend: Blend,
  'calendar-clock': CalendarClock,
  briefcase: Briefcase,
  'user-check': UserCheck,
  wifi: Wifi,
  car: Car,
  snowflake: Snowflake,
  library: Library,
  'monitor-play': MonitorPlay,
  school: School,
  'badge-check': BadgeCheck,
  'file-text': FileText,
  languages: LanguagesIcon,
  'graduation-cap': GraduationCap,
} satisfies Record<string, LucideIcon>;

export type IconKey = keyof typeof iconMap;

/* ── Core types ─────────────────────────────────────────────── */
export type LanguageLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
export type TeachingMode = 'Online' | 'Offline' | 'Hybrid' | 'Weekend' | 'One-to-One';

export interface QuickStat {
  icon: IconKey;
  label: string;
  value: string;
  /** when present the value counts up from 0 */
  animatedValue?: number;
  suffix?: string;
  decimals?: number;
}

export interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  src: string;
  caption: string;
  category: 'Classroom' | 'Events' | 'Campus';
  duration?: string;
}

export interface LanguageOffering {
  name: string;
  flag: string;
  level: LanguageLevel;
  duration: string;
  certification: boolean;
  certBody?: string;
  cefrRange: string;
  description: string;
  gradient: string;
  outcomes: string[];
  useCases: string[];
  batchSize: string;
  startingFee: string;
}

export interface CourseRow {
  id: number;
  name: string;
  duration: string;
  batchTiming: string;
  mode: string;
  fee: string;
  level: LanguageLevel;
}

export interface IconCard {
  icon: IconKey;
  title: string;
  description?: string;
}

export interface FacultyMember {
  id: number;
  name: string;
  photo: string;
  designation: string;
  experience: string;
  languages: string[];
}

export interface ReviewCard {
  id: number;
  name: string;
  photo: string;
  rating: number;
  language: string;
  text: string;
  date: string;
}

export interface VideoReview {
  id: number;
  name: string;
  course: string;
  thumbnail: string;
  duration: string;
  quote: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SimilarCenter {
  slug: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  languagesCount: number;
  startingFee: string;
}

export interface LanguageCenter {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  established: number;
  location: { area: string; city: string; address: string };
  phone: string;
  whatsapp: string;
  website: string;
  banner: string;
  logo: string;
  quickStats: QuickStat[];
  gallery: GalleryItem[];
  about: {
    overview: string;
    mission: string;
    methodology: string;
    whyChooseUs: string[];
  };
  languages: LanguageOffering[];
  courses: CourseRow[];
  learningModes: IconCard[];
  faculty: FacultyMember[];
  highlights: IconCard[];
  videoReviews: VideoReview[];
  reviews: ReviewCard[];
  facilities: IconCard[];
  faqs: FaqItem[];
}

/* ── The mock center ────────────────────────────────────────── */
export const languageCenter: LanguageCenter = {
  id: 1,
  slug: 'linguaverse-academy-pune',
  name: 'LinguaVerse Language Academy',
  tagline: 'Speak the World — Master Any Language with Confidence',
  intro:
    'A premium, internationally accredited language institute helping 12,000+ learners speak fluently through immersive, native-trainer-led programs across 9 global languages.',
  verified: true,
  rating: 4.8,
  reviewCount: 1342,
  established: 2010,
  location: {
    area: 'FC Road',
    city: 'Pune',
    address: '4th Floor, Symphony Tower, FC Road, Shivajinagar, Pune, Maharashtra 411005',
  },
  phone: '+91 98765 43210',
  whatsapp: '919876543210',
  website: 'https://example.com',
  banner: photo('linguaverse-banner', 1600, 640),
  logo: photo('lv-logo', 200, 200),

  quickStats: [
    { icon: 'globe', label: 'Languages Offered', value: '9', animatedValue: 9 },
    { icon: 'users', label: 'Students Trained', value: '12,000+', animatedValue: 12000, suffix: '+' },
    { icon: 'award', label: 'Years of Experience', value: '15+', animatedValue: 15, suffix: '+' },
    { icon: 'wallet', label: 'Fee Range', value: '₹5K – ₹45K' },
    { icon: 'clock', label: 'Course Duration', value: '1 – 12 Months' },
    { icon: 'monitor-smartphone', label: 'Teaching Mode', value: 'Online / Offline' },
  ],

  gallery: [
    { id: 1, type: 'image', src: photo('lv-classroom-1'), caption: 'Immersive classroom session', category: 'Classroom' },
    { id: 2, type: 'image', src: photo('lv-event-1'), caption: 'Annual cultural fest', category: 'Events' },
    { id: 3, type: 'video', src: photo('lv-video-1'), caption: 'A day at LinguaVerse', category: 'Campus', duration: '2:14' },
    { id: 4, type: 'image', src: photo('lv-classroom-2'), caption: 'Conversation practice lab', category: 'Classroom' },
    { id: 5, type: 'image', src: photo('lv-campus-1'), caption: 'Modern learning lounge', category: 'Campus' },
    { id: 6, type: 'image', src: photo('lv-event-2'), caption: 'Language exchange meetup', category: 'Events' },
    { id: 7, type: 'video', src: photo('lv-video-2'), caption: 'Student success stories', category: 'Events', duration: '3:48' },
    { id: 8, type: 'image', src: photo('lv-campus-2'), caption: 'Digital library corner', category: 'Campus' },
  ],

  about: {
    overview:
      'LinguaVerse Language Academy has been redefining language education in Pune since 2010. With native-speaking trainers, internationally benchmarked curricula and a relentless focus on real-world fluency, we have empowered over 12,000 students to study, work and travel across the globe with confidence.',
    mission:
      'To make world-class language learning accessible, enjoyable and outcome-driven — turning hesitant beginners into confident, fluent communicators ready for global opportunities.',
    methodology:
      'Our signature Immersion-First™ approach blends communicative teaching, AI-assisted practice, cultural workshops and small-group conversation drills. Every learner follows a personalised roadmap with continuous assessment and certification-aligned milestones.',
    whyChooseUs: [
      'Certified native & near-native trainers for every language',
      'Globally recognised certifications (Goethe, DELF, JLPT, HSK & more)',
      'Maximum 8 learners per batch for personal attention',
      'Flexible online, offline & weekend schedules',
      'Lifetime access to recorded sessions & study material',
      'Dedicated placement & study-abroad guidance cell',
    ],
  },

  languages: [
    {
      name: 'English', flag: '🇬🇧', gradient: 'from-blue-500 to-indigo-600',
      level: 'All Levels', cefrRange: 'A1 – C2', duration: '2 – 6 Months',
      certification: true, certBody: 'IELTS / Cambridge',
      description: 'Spoken English, IELTS & business communication mastery.',
      outcomes: ['Confident spoken & written communication', 'IELTS / Cambridge exam readiness', 'Business email & presentation skills', 'Interview & group discussion coaching'],
      useCases: ['Study Abroad', 'Corporate Career', 'Immigration', 'IELTS Exam'],
      batchSize: 'Max 8', startingFee: '₹8,500',
    },
    {
      name: 'German', flag: '🇩🇪', gradient: 'from-amber-500 to-orange-600',
      level: 'Beginner', cefrRange: 'A1 – B2', duration: '3 – 8 Months',
      certification: true, certBody: 'Goethe / TestDaF',
      description: 'Goethe & TestDaF aligned — ideal for study in Germany.',
      outcomes: ['Goethe A1–B2 certification prep', 'Everyday conversation & grammar', 'University application support', 'German culture & etiquette immersion'],
      useCases: ['Study in Germany', 'Work Visa', 'Goethe Exam', 'Engineering Careers'],
      batchSize: 'Max 8', startingFee: '₹18,000',
    },
    {
      name: 'French', flag: '🇫🇷', gradient: 'from-sky-500 to-blue-700',
      level: 'Intermediate', cefrRange: 'A1 – B2', duration: '3 – 7 Months',
      certification: true, certBody: 'DELF / DALF',
      description: 'DELF/DALF preparation with immersive conversation labs.',
      outcomes: ['DELF B1/B2 exam preparation', 'Conversational fluency labs', 'French literature & film exposure', 'Canada & Europe immigration readiness'],
      useCases: ['Canada PR', 'Study in France', 'DELF Exam', 'Tourism & Hospitality'],
      batchSize: 'Max 8', startingFee: '₹16,500',
    },
    {
      name: 'Spanish', flag: '🇪🇸', gradient: 'from-rose-500 to-red-600',
      level: 'Beginner', cefrRange: 'A1 – B2', duration: '2 – 6 Months',
      certification: true, certBody: 'DELE',
      description: 'DELE-focused fluency for travel, work & culture.',
      outcomes: ['DELE A2/B1 exam readiness', 'Conversational Spanish for travel', 'Latin American dialect exposure', 'Business Spanish for global roles'],
      useCases: ['Travel', 'Work in Spain / LatAm', 'DELE Exam', 'Cultural Interest'],
      batchSize: 'Max 8', startingFee: '₹14,000',
    },
    {
      name: 'Japanese', flag: '🇯🇵', gradient: 'from-pink-500 to-rose-600',
      level: 'All Levels', cefrRange: 'N5 – N2', duration: '4 – 12 Months',
      certification: true, certBody: 'JLPT',
      description: 'JLPT N5–N2 tracks with kanji & anime culture sessions.',
      outcomes: ['JLPT N5 to N2 level preparation', 'Hiragana, Katakana & Kanji mastery', 'Anime & manga language immersion', 'Japan work visa language readiness'],
      useCases: ['Work in Japan', 'Anime / Culture', 'JLPT Exam', 'IT & Engineering'],
      batchSize: 'Max 8', startingFee: '₹22,000',
    },
    {
      name: 'Chinese', flag: '🇨🇳', gradient: 'from-red-500 to-rose-700',
      level: 'Beginner', cefrRange: 'HSK 1 – 4', duration: '4 – 10 Months',
      certification: true, certBody: 'HSK',
      description: 'HSK certified Mandarin with tone-perfect coaching.',
      outcomes: ['HSK 1–4 certification preparation', 'Tone-perfect pronunciation coaching', 'Simplified character reading & writing', 'Business Mandarin for trade & commerce'],
      useCases: ['Business & Trade', 'Work in China', 'HSK Exam', 'Mandarin Interest'],
      batchSize: 'Max 8', startingFee: '₹19,500',
    },
    {
      name: 'Korean', flag: '🇰🇷', gradient: 'from-violet-500 to-purple-600',
      level: 'Beginner', cefrRange: 'TOPIK I – II', duration: '3 – 9 Months',
      certification: true, certBody: 'TOPIK',
      description: 'TOPIK preparation with K-culture immersion.',
      outcomes: ['TOPIK I & II exam preparation', 'Hangul reading & writing from scratch', 'K-drama & K-pop vocabulary sessions', 'Korean workplace communication'],
      useCases: ['K-Culture Fan', 'Work in Korea', 'TOPIK Exam', 'Gaming & Entertainment'],
      batchSize: 'Max 8', startingFee: '₹20,000',
    },
    {
      name: 'Russian', flag: '🇷🇺', gradient: 'from-slate-500 to-slate-700',
      level: 'Intermediate', cefrRange: 'A1 – B1', duration: '4 – 9 Months',
      certification: false,
      description: 'TORFL-aligned Russian for academics & MBBS aspirants.',
      outcomes: ['Cyrillic script reading & writing', 'Medical Russian for MBBS students', 'TORFL-aligned language milestones', 'Russian grammar & sentence construction'],
      useCases: ['MBBS in Russia', 'Academic Research', 'Diplomacy', 'Cultural Interest'],
      batchSize: 'Max 8', startingFee: '₹17,000',
    },
    {
      name: 'Arabic', flag: '🇸🇦', gradient: 'from-emerald-500 to-teal-600',
      level: 'Beginner', cefrRange: 'A1 – B1', duration: '3 – 8 Months',
      certification: true, certBody: 'CEFR Arabic',
      description: 'Modern Standard Arabic with practical dialect modules.',
      outcomes: ['Modern Standard Arabic reading & writing', 'Gulf & Egyptian dialect modules', 'Arabic for business & trade', 'Religious text & Quranic Arabic basics'],
      useCases: ['Work in Gulf', 'Religious Studies', 'Diplomacy', 'Business & Trade'],
      batchSize: 'Max 8', startingFee: '₹15,000',
    },
  ],

  courses: [
    { id: 1, name: 'Spoken English Mastery', duration: '3 Months', batchTiming: 'Mon–Fri · 7–9 AM', mode: 'Online / Offline', fee: '₹8,500', level: 'All Levels' },
    { id: 2, name: 'German A1 – A2 (Goethe)', duration: '5 Months', batchTiming: 'Mon/Wed/Fri · 6–8 PM', mode: 'Offline', fee: '₹18,000', level: 'Beginner' },
    { id: 3, name: 'French DELF B1', duration: '4 Months', batchTiming: 'Tue/Thu · 5–7 PM', mode: 'Hybrid', fee: '₹16,500', level: 'Intermediate' },
    { id: 4, name: 'Japanese JLPT N5', duration: '6 Months', batchTiming: 'Sat–Sun · 10 AM–12 PM', mode: 'Weekend', fee: '₹22,000', level: 'Beginner' },
    { id: 5, name: 'Spanish DELE A2', duration: '4 Months', batchTiming: 'Mon/Wed · 7–9 PM', mode: 'Online', fee: '₹14,000', level: 'Beginner' },
    { id: 6, name: 'Mandarin HSK 2', duration: '5 Months', batchTiming: 'Tue/Thu · 6–8 PM', mode: 'Offline', fee: '₹19,500', level: 'Beginner' },
    { id: 7, name: 'Business English (1-to-1)', duration: '2 Months', batchTiming: 'Flexible Slots', mode: 'One-to-One', fee: '₹24,000', level: 'Advanced' },
    { id: 8, name: 'Korean TOPIK I', duration: '5 Months', batchTiming: 'Sat–Sun · 2–4 PM', mode: 'Weekend', fee: '₹20,000', level: 'Beginner' },
  ],

  learningModes: [
    { icon: 'laptop', title: 'Online Live Classes', description: 'Interactive HD video classrooms from anywhere.' },
    { icon: 'building', title: 'Offline Classroom', description: 'Immersive in-person learning at our campus.' },
    { icon: 'blend', title: 'Hybrid Learning', description: 'Mix online flexibility with classroom depth.' },
    { icon: 'calendar-clock', title: 'Weekend Batches', description: 'Designed for working professionals & students.' },
    { icon: 'briefcase', title: 'Corporate Training', description: 'Tailored language programs for teams.' },
    { icon: 'user-check', title: 'One-to-One', description: 'Personalised private coaching at your pace.' },
  ],

  faculty: [
    { id: 1, name: 'Dr. Anika Berger', photo: face(47), designation: 'Head of German Studies', experience: '14 yrs', languages: ['German', 'English'] },
    { id: 2, name: 'Hiroshi Tanaka', photo: face(33), designation: 'Senior Japanese Trainer', experience: '11 yrs', languages: ['Japanese', 'English'] },
    { id: 3, name: 'Camille Laurent', photo: face(45), designation: 'French Language Expert', experience: '9 yrs', languages: ['French', 'Spanish'] },
    { id: 4, name: 'Wei Chen', photo: face(12), designation: 'Mandarin Lead Faculty', experience: '10 yrs', languages: ['Chinese', 'English'] },
    { id: 5, name: 'Sofia Martinez', photo: face(20), designation: 'Spanish & DELE Coach', experience: '8 yrs', languages: ['Spanish', 'English'] },
    { id: 6, name: 'Min-Jae Park', photo: face(60), designation: 'Korean Language Mentor', experience: '7 yrs', languages: ['Korean', 'English'] },
  ],

  highlights: [
    { icon: 'languages', title: 'Native Trainers' },
    { icon: 'badge-check', title: 'Global Certification' },
    { icon: 'calendar-clock', title: 'Flexible Timings' },
    { icon: 'users', title: 'Small Batch Size' },
    { icon: 'graduation-cap', title: 'Placement Support' },
    { icon: 'file-text', title: 'Study Materials Included' },
  ],

  videoReviews: [
    { id: 1, name: 'Riya Deshmukh', course: 'German A1–B1', thumbnail: photo('lv-vr-1', 600, 400), duration: '1:52', quote: 'Cracked my Goethe B1 and now studying in Munich!' },
    { id: 2, name: 'Aman Gupta', course: 'Japanese JLPT N4', thumbnail: photo('lv-vr-2', 600, 400), duration: '2:30', quote: 'The native trainers made fluency feel effortless.' },
    { id: 3, name: 'Sneha Kulkarni', course: 'Spoken English', thumbnail: photo('lv-vr-3', 600, 400), duration: '1:38', quote: 'My confidence in interviews completely transformed.' },
  ],

  reviews: [
    { id: 1, name: 'Pooja Nair', photo: face(31), rating: 5, language: 'French', text: 'The DELF preparation was outstanding. Small batches meant the trainer knew exactly where I struggled. Cleared B1 on the first attempt!', date: '2 weeks ago' },
    { id: 2, name: 'Rahul Mehta', photo: face(15), rating: 5, language: 'German', text: 'Best decision for my study-abroad plan. Native trainers, great material, and genuine placement guidance for German universities.', date: '1 month ago' },
    { id: 3, name: 'Ayesha Khan', photo: face(25), rating: 4, language: 'Spanish', text: 'Loved the cultural immersion sessions. Flexible weekend batches fit perfectly with my job. Highly recommend.', date: '1 month ago' },
    { id: 4, name: 'Karthik Iyer', photo: face(52), rating: 5, language: 'Japanese', text: 'From zero to JLPT N5 in six months. The kanji workshops and anime sessions kept learning fun and consistent.', date: '2 months ago' },
  ],

  facilities: [
    { icon: 'monitor-play', title: 'Smart Classrooms' },
    { icon: 'library', title: 'Language Library' },
    { icon: 'wifi', title: 'High-Speed WiFi' },
    { icon: 'car', title: 'Parking Available' },
    { icon: 'snowflake', title: 'Air Conditioned' },
    { icon: 'school', title: 'Online Learning Portal' },
  ],

  faqs: [
    { question: 'Do you offer trial or demo classes?', answer: 'Yes! We offer a complimentary demo class for every language so you can experience our teaching style and meet the trainer before enrolling.' },
    { question: 'Are the certifications internationally recognised?', answer: 'Absolutely. Our courses are aligned with globally accepted certifications such as Goethe, DELF/DALF, JLPT, HSK, DELE and TOPIK.' },
    { question: 'What is the typical batch size?', answer: 'We cap our batches at 8 learners to ensure personalised attention. One-to-one and corporate programs are also available.' },
    { question: 'Can I switch between online and offline classes?', answer: 'Yes. Our hybrid model lets you move between online and offline sessions based on your schedule, at no extra cost.' },
    { question: 'Do you provide study material?', answer: 'All enrolled students receive curated digital and printed study material, plus lifetime access to recorded sessions.' },
    { question: 'Is there any placement or study-abroad support?', answer: 'Our dedicated guidance cell assists with visa documentation, university applications and interview preparation for study-abroad aspirants.' },
  ],
};

/* ── Similar centers (carousel) ─────────────────────────────── */
export const similarCenters: SimilarCenter[] = [
  { slug: 'polyglot-institute-pune', name: 'Polyglot Institute', image: photo('sc-1', 600, 400), rating: 4.7, reviewCount: 980, location: 'Kothrud, Pune', languagesCount: 7, startingFee: '₹6,000' },
  { slug: 'globe-talk-academy', name: 'GlobeTalk Academy', image: photo('sc-2', 600, 400), rating: 4.6, reviewCount: 742, location: 'Baner, Pune', languagesCount: 6, startingFee: '₹7,500' },
  { slug: 'fluent-future-school', name: 'Fluent Future School', image: photo('sc-3', 600, 400), rating: 4.8, reviewCount: 1120, location: 'Viman Nagar, Pune', languagesCount: 8, startingFee: '₹5,500' },
  { slug: 'lingua-bridge-center', name: 'Lingua Bridge Center', image: photo('sc-4', 600, 400), rating: 4.5, reviewCount: 654, location: 'Hadapsar, Pune', languagesCount: 5, startingFee: '₹6,800' },
  { slug: 'world-words-academy', name: 'World Words Academy', image: photo('sc-5', 600, 400), rating: 4.9, reviewCount: 1430, location: 'Aundh, Pune', languagesCount: 9, startingFee: '₹5,000' },
];

/** Language options used by the enquiry forms. */
export const enquiryLanguages = languageCenter.languages.map((l) => l.name);
export const enquiryModes = ['Online', 'Offline', 'Hybrid', 'Weekend', 'One-to-One'];

/** Single mock center regardless of slug (frontend-only demo). */
export function getLanguageCenter(slug: string): LanguageCenter {
  return { ...languageCenter, slug: slug || languageCenter.slug };
}
