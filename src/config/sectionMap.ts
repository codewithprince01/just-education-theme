import type { ComponentType } from 'react';
import type { SectionKey, InstitutionType } from '@/types/institution';

// Common sections
import AboutSection from '@/components/institution-detail/common/AboutSection';
import ReviewsSection from '@/components/institution-detail/common/ReviewsSection';
import FAQSection from '@/components/institution-detail/common/FAQSection';
import FacilitiesSection from '@/components/institution-detail/common/FacilitiesSection';
import FacultySection from '@/components/institution-detail/common/FacultySection';
import GallerySection from '@/components/institution-detail/common/GallerySection';

// University sections
import UniversityCoursesSection from '@/components/institution-detail/university/CoursesSection';
import AdmissionsSection from '@/components/institution-detail/university/AdmissionsSection';
import ScholarshipsSection from '@/components/institution-detail/university/ScholarshipsSection';
import PlacementsSection from '@/components/institution-detail/university/PlacementsSection';
import ResearchSection from '@/components/institution-detail/university/ResearchSection';

// Coaching sections
import CoachingCoursesSection from '@/components/institution-detail/coaching/CoursesSection';
import LiveBatchesSection from '@/components/institution-detail/coaching/LiveBatchesSection';
import RankersSection from '@/components/institution-detail/coaching/RankersSection';
import MockTestsSection from '@/components/institution-detail/coaching/MockTestsSection';
import StudyMaterialsSection from '@/components/institution-detail/coaching/StudyMaterialsSection';

// Language sections
import LanguageCoursesSection from '@/components/institution-detail/language/CoursesSection';
import LanguagesOfferedSection from '@/components/institution-detail/language/LanguagesOfferedSection';
import CertificationsSection from '@/components/institution-detail/language/CertificationsSection';
import LearningModesSection from '@/components/institution-detail/language/LearningModesSection';

// Library sections
import CollectionsSection from '@/components/institution-detail/library/CollectionsSection';
import MembershipSection from '@/components/institution-detail/library/MembershipSection';
import EventsSection from '@/components/institution-detail/library/EventsSection';
import DigitalResourcesSection from '@/components/institution-detail/library/DigitalResourcesSection';

type SectionMap = Partial<Record<SectionKey, ComponentType>>;

// Base map: common sections shared across institution types
const baseMap: SectionMap = {
  about: AboutSection,
  reviews: ReviewsSection,
  faq: FAQSection,
  facilities: FacilitiesSection,
  faculty: FacultySection,
  gallery: GallerySection,
};

// Per-type override and extension maps
const universityMap: SectionMap = {
  courses: UniversityCoursesSection,
  admissions: AdmissionsSection,
  scholarships: ScholarshipsSection,
  placements: PlacementsSection,
  research: ResearchSection,
};

const coachingMap: SectionMap = {
  courses: CoachingCoursesSection,
  liveBatches: LiveBatchesSection,
  rankers: RankersSection,
  mockTests: MockTestsSection,
  studyMaterials: StudyMaterialsSection,
};

const languageMap: SectionMap = {
  courses: LanguageCoursesSection,
  languages: LanguagesOfferedSection,
  certifications: CertificationsSection,
  learningModes: LearningModesSection,
};

const libraryMap: SectionMap = {
  collections: CollectionsSection,
  membership: MembershipSection,
  events: EventsSection,
  digitalResources: DigitalResourcesSection,
};

// Types that share university-style sections
const universityLikeMap: SectionMap = {
  courses: UniversityCoursesSection,
  admissions: AdmissionsSection,
  scholarships: ScholarshipsSection,
  placements: PlacementsSection,
  research: ResearchSection,
};

const typeOverrides: Partial<Record<InstitutionType, SectionMap>> = {
  UNIVERSITY: universityMap,
  COLLEGE: universityLikeMap,
  SCHOOL: universityLikeMap,
  COACHING_CENTER: coachingMap,
  LANGUAGE_CENTER: languageMap,
  LIBRARY: libraryMap,
  RESEARCH_INSTITUTE: universityLikeMap,
  TRAINING_CENTER: universityLikeMap,
  SCHOLARSHIP_PROVIDER: universityLikeMap,
};

export function getSectionMap(type: InstitutionType): SectionMap {
  const overrides = typeOverrides[type] ?? {};
  return { ...baseMap, ...overrides };
}
