// src/data/tutors/types.ts
// Type definitions for the Tutor Detail Page module.
// Icon fields hold lucide-react icon *names* (string keys) so this stays a
// plain .ts data module — components map the names to components.

export type TutorType =
  | 'PRIVATE_TUTOR'
  | 'ONLINE_TUTOR'
  | 'HOME_TUTOR'
  | 'AFTER_SCHOOL_PROGRAM'
  | 'ACADEMIC_MENTOR';

export type TeachingMode = 'Online' | 'Offline' | 'Hybrid';

export type AvailabilityStatus = 'available' | 'busy' | 'offline';

export interface QuickStat {
  id: string;
  label: string;
  value: number;
  /** Suffix appended after the animated value, e.g. '+', '%', 'K+'. */
  suffix?: string;
  /** Optional decimal display value (overrides count-up), e.g. ratings. */
  decimal?: number;
  icon: string;
}

export interface AboutData {
  intro: string;
  qualifications: { id: string; degree: string; institution: string; year: string }[];
  philosophy: string;
  whyChoose: string[];
  experienceText: string;
  image: string;
}

export interface Verification {
  id: string;
  label: string;
  description: string;
  verified: boolean;
  icon: string;
}

export interface TutorSubject {
  id: string;
  name: string;
  icon: string;
  levels: string[];
  experience: string;
  students: number;
  /** tailwind gradient classes, e.g. 'from-blue-500 to-indigo-500' */
  gradient: string;
}

export interface Methodology {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface DayAvailability {
  day: string;
  short: string;
  slots: { time: string; available: boolean }[];
}

export interface SessionDuration {
  id: string;
  label: string;
  minutes: number;
  price: number;
  popular?: boolean;
}

export interface AIMatch {
  percentage: number;
  learningStyleMatch: string;
  recommendedFor: string;
  reasons: string[];
}

export interface ProgressData {
  attendance: number;
  assignmentCompletion: number;
  /** weekly score 0-100 used for the bar graph */
  weeklyProgress: { week: string; score: number }[];
  skills: { name: string; level: number }[];
  metrics: { id: string; label: string; value: string; trend: 'up' | 'down' | 'flat'; delta: string }[];
}

export interface ParentWidget {
  upcomingClasses: { id: string; subject: string; date: string; time: string }[];
  attendanceSummary: { present: number; total: number };
  teacherFeedback: { id: string; text: string; date: string }[];
  homework: { id: string; title: string; status: 'done' | 'pending' | 'overdue'; due: string }[];
  monthlyReport: { label: string; value: string }[];
}

export interface SuccessStory {
  id: string;
  name: string;
  photo: string;
  classOrExam: string;
  achievement: string;
  testimonial: string;
  highlight: string;
}

export interface TrendingChip {
  id: string;
  label: string;
  slug: string;
}

export interface StudyResource {
  id: string;
  title: string;
  type: string;
  format: string;
  downloads: number;
  icon: string;
}

export interface TutorReview {
  id: string;
  name: string;
  photo?: string;
  role: 'Parent' | 'Student';
  subject: string;
  rating: number;
  text: string;
  date: string;
  isVerified: boolean;
}

export interface VideoTestimonial {
  id: string;
  name: string;
  thumbnail: string;
  classOrExam: string;
}

export interface Facility {
  id: string;
  name: string;
  icon: string;
}

export interface TutorFAQ {
  id: string;
  question: string;
  answer: string;
}

export interface SimilarTutor {
  id: string;
  slug: string;
  name: string;
  photo: string;
  headline: string;
  subjects: string[];
  rating: number;
  reviewCount: number;
  hourlyFee: number;
  mode: TeachingMode;
}

export interface Tutor {
  id: number;
  slug: string;
  type: TutorType;
  typeLabel: string;
  name: string;
  tagline: string;
  photo: string;
  banner: string;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  location: string;
  subjectsTaught: string[];
  teachingModes: TeachingMode[];
  languages: string[];
  hourlyFee: number;
  currency: string;
  responseTime: string;
  availabilityStatus: AvailabilityStatus;
  badges: string[];

  stats: QuickStat[];
  about: AboutData;
  verifications: Verification[];
  subjects: TutorSubject[];
  methodologies: Methodology[];
  availability: DayAvailability[];
  sessionDurations: SessionDuration[];
  trialAvailable: boolean;
  aiMatch: AIMatch;
  progress: ProgressData;
  parentDashboard: ParentWidget;
  successStories: SuccessStory[];
  trendingSubjects: TrendingChip[];
  resources: StudyResource[];
  reviews: TutorReview[];
  ratingDistribution: Record<number, number>;
  videoTestimonials: VideoTestimonial[];
  facilities: Facility[];
  faqs: TutorFAQ[];
  similarTutors: SimilarTutor[];
}
