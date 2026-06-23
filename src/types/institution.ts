// src/types/institution.ts

export type InstitutionType =
  | 'UNIVERSITY'
  | 'COLLEGE'
  | 'SCHOOL'
  | 'COACHING_CENTER'
  | 'LANGUAGE_CENTER'
  | 'LIBRARY'
  | 'RESEARCH_INSTITUTE'
  | 'TRAINING_CENTER'
  | 'SCHOLARSHIP_PROVIDER';

export type SectionKey =
  | 'about'
  | 'courses'
  | 'admissions'
  | 'faculty'
  | 'scholarships'
  | 'placements'
  | 'research'
  | 'gallery'
  | 'reviews'
  | 'faq'
  | 'facilities'
  | 'liveBatches'
  | 'rankers'
  | 'mockTests'
  | 'studyMaterials'
  | 'languages'
  | 'certifications'
  | 'learningModes'
  | 'collections'
  | 'membership'
  | 'digitalResources'
  | 'events'
  | 'contact';

export interface Review {
  id: string;
  studentName: string;
  photo?: string;
  rating: number;
  reviewText: string;
  date: string;
  isVerified: boolean;
  course?: string;
}

export interface Course {
  id: string;
  title: string;
  duration: string;
  fee: number;
  originalFee?: number;
  mode: string;
  seats?: number;
  examCategory?: string;
  rating?: number;
  highlights?: string[];
  difficulty?: string;
}

export interface Faculty {
  id: string;
  name: string;
  image?: string;
  designation: string;
  experience: string;
  subjects: string[];
  bio?: string;
  rating?: number;
  studentsMentored?: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
}

export interface Facility {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface AboutData {
  description: string;
  mission?: string;
  vision?: string;
  highlights?: string[];
}

export interface AdmissionStep {
  stepNumber: number;
  title: string;
  description: string;
  icon: string;
}

export interface AdmissionsData {
  steps: AdmissionStep[];
  eligibility: string[];
  importantDates?: { label: string; date: string }[];
}

export interface PlacementsData {
  avgPackage: string;
  highestPackage: string;
  placementRate: string;
  topRecruiters: string[];
  year: number;
}

export interface ScholarshipData {
  id: string;
  name: string;
  amount: string;
  eligibility: string;
  deadline: string;
  type: 'merit' | 'need' | 'sports' | 'research';
}

export interface ResearchData {
  publications: number;
  activeProjects: number;
  citations: number;
  researchCenters: string[];
  highlights: string[];
}

export interface LiveBatch {
  id: string;
  courseTitle: string;
  facultyName: string;
  timing: string;
  seatsTotal: number;
  seatsLeft: number;
  isLive: boolean;
  language: string;
  nextSession: string;
}

export interface Ranker {
  id: string;
  name: string;
  photo?: string;
  airRank: number;
  exam: string;
  year: number;
  score: string;
  course: string;
  testimonial?: string;
}

export interface MockTest {
  id: string;
  name: string;
  examCategory: string;
  questionsCount: number;
  duration: number;
  difficulty: string;
  isFree: boolean;
  attempts: number;
  isTrending?: boolean;
  rating?: number;
}

export interface StudyMaterial {
  id: string;
  title: string;
  type: 'PDF' | 'Notes' | 'PYP' | 'Formula' | 'Ebook' | 'Sample';
  pages?: number;
  isFree: boolean;
  downloads?: number;
}

export interface Language {
  id: string;
  name: string;
  flag: string;
  levels: string[];
  duration: string;
  certification?: string;
  fee: number;
}

export interface Certification {
  id: string;
  name: string;
  issuedBy: string;
  recognized: string;
  description: string;
}

export interface LibraryCollection {
  id: string;
  category: string;
  count: number;
  icon: string;
  description?: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  fee: number;
  duration: string;
  features: string[];
  isPopular?: boolean;
}

export interface LibraryEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  type: 'talk' | 'workshop' | 'exhibition' | 'reading';
}

export interface DigitalResource {
  id: string;
  name: string;
  category: string;
  description: string;
  accessType: 'free' | 'member';
}

export interface InstitutionMetrics {
  rating: number;
  reviewCount: number;
  established: number;
  location: string;
  [key: string]: string | number;
}

export interface SimilarInstitution {
  id: string;
  name: string;
  image: string;
  rating: number;
  location: string;
  type: InstitutionType;
  slug: string;
}

export interface InstitutionSections {
  about?: AboutData;
  courses?: Course[];
  admissions?: AdmissionsData;
  faculty?: Faculty[];
  scholarships?: ScholarshipData[];
  placements?: PlacementsData;
  research?: ResearchData;
  gallery?: GalleryImage[];
  reviews?: Review[];
  faq?: FAQ[];
  facilities?: Facility[];
  liveBatches?: LiveBatch[];
  rankers?: Ranker[];
  mockTests?: MockTest[];
  studyMaterials?: StudyMaterial[];
  languages?: Language[];
  certifications?: Certification[];
  learningModes?: string[];
  collections?: LibraryCollection[];
  membership?: MembershipPlan[];
  digitalResources?: DigitalResource[];
  events?: LibraryEvent[];
}

export interface Institution {
  id: number;
  slug: string;
  type: InstitutionType;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  banner: string;
  isVerified: boolean;
  accreditations: string[];
  metrics: InstitutionMetrics;
  ratingDistribution?: Record<number, number>;
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
  };
  similar?: SimilarInstitution[];
  sections: InstitutionSections;
}
