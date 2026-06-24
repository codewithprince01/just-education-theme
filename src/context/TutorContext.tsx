'use client';

import { createContext, useContext } from 'react';
import type { Tutor } from '@/data/tutors/types';

const TutorContext = createContext<Tutor | null>(null);

export function TutorProvider({
  tutor,
  children,
}: {
  tutor: Tutor;
  children: React.ReactNode;
}) {
  return <TutorContext.Provider value={tutor}>{children}</TutorContext.Provider>;
}

export function useTutor(): Tutor {
  const ctx = useContext(TutorContext);
  if (!ctx) throw new Error('useTutor must be used within a TutorProvider');
  return ctx;
}
