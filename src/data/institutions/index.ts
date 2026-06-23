import type { Institution } from '@/types/institution';
import { iitDelhiInstitution } from './iit-delhi';
import { allenInstitution } from './allen-career-institute';
import { britishCouncilInstitution } from './british-council';
import { nationalLibraryInstitution } from './national-library';
export const institutionRegistry: Record<string, Institution> = {
  'iit-delhi': iitDelhiInstitution,
  'allen-career-institute': allenInstitution,
  'british-council': britishCouncilInstitution,
  'national-library': nationalLibraryInstitution,
};

export function getInstitutionBySlug(slug: string): Institution | undefined {
  return institutionRegistry[slug];
}

export function getAllInstitutionSlugs(): string[] {
  return Object.keys(institutionRegistry);
}
