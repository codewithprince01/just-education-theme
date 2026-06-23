import type { InstitutionType, SectionKey } from '@/types/institution';

export const institutionLayoutConfig: Record<InstitutionType, SectionKey[]> = {
  UNIVERSITY: ['about', 'courses', 'admissions', 'faculty', 'scholarships', 'placements', 'research', 'gallery', 'facilities', 'reviews', 'faq'],
  COLLEGE:    ['about', 'courses', 'admissions', 'faculty', 'placements', 'gallery', 'facilities', 'reviews', 'faq'],
  SCHOOL:     ['about', 'courses', 'admissions', 'faculty', 'gallery', 'facilities', 'reviews', 'faq'],
  COACHING_CENTER:  ['about', 'courses', 'liveBatches', 'faculty', 'rankers', 'mockTests', 'studyMaterials', 'facilities', 'reviews', 'faq'],
  LANGUAGE_CENTER:  ['about', 'languages', 'courses', 'faculty', 'certifications', 'learningModes', 'reviews', 'faq'],
  LIBRARY:          ['about', 'collections', 'membership', 'digitalResources', 'events', 'facilities', 'reviews', 'faq'],
  RESEARCH_INSTITUTE: ['about', 'research', 'faculty', 'courses', 'gallery', 'facilities', 'reviews', 'faq'],
  TRAINING_CENTER:    ['about', 'courses', 'faculty', 'placements', 'facilities', 'reviews', 'faq'],
  SCHOLARSHIP_PROVIDER: ['about', 'scholarships', 'admissions', 'reviews', 'faq'],
};
