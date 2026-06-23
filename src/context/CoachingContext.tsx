'use client';

import { createContext, useContext } from 'react';
import type {
  Institute, Course, LiveBatch, Faculty, Ranker, MockTest,
  StudyMaterial, Review, Facility, Highlight, FAQ, SimilarInstitute,
} from '@/data/coachingData';

export interface CoachingInstituteData {
  institute: Institute;
  courses: Course[];
  liveBatches: LiveBatch[];
  faculties: Faculty[];
  rankers: Ranker[];
  mockTests: MockTest[];
  studyMaterials: StudyMaterial[];
  reviews: Review[];
  facilities: Facility[];
  highlights: Highlight[];
  faqs: FAQ[];
  similarInstitutes: SimilarInstitute[];
}

const CoachingContext = createContext<CoachingInstituteData | null>(null);

export function CoachingProvider({
  data,
  children,
}: {
  data: CoachingInstituteData;
  children: React.ReactNode;
}) {
  return <CoachingContext.Provider value={data}>{children}</CoachingContext.Provider>;
}

export function useCoachingData(): CoachingInstituteData {
  const ctx = useContext(CoachingContext);
  if (!ctx) throw new Error('useCoachingData must be used within CoachingProvider');
  return ctx;
}
