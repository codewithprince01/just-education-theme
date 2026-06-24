import type { Tutor } from './types';
import { priyaSharmaTutor } from './priya-sharma';

export const tutorRegistry: Record<string, Tutor> = {
  'priya-sharma': priyaSharmaTutor,
};

export function getTutorBySlug(slug: string): Tutor | undefined {
  return tutorRegistry[slug];
}

export function getAllTutorSlugs(): string[] {
  return Object.keys(tutorRegistry);
}

export type { Tutor } from './types';
