'use client';

import { useState, useEffect } from 'react';
import { CoachingProvider } from '@/context/CoachingContext';
import type { CoachingInstituteData } from '@/context/CoachingContext';
import {
  CoachingHero,
  StickyNavigation,
  AboutInstitute,
  KeyHighlights,
  CoursesSection,
  LiveBatchesSection,
  FacultySection,
  RankersSection,
  MockTestsSection,
  StudyMaterialsSection,
  ReviewsSection,
  FacilitiesSection,
  AdmissionProcess,
  FAQSection,
  SimilarInstitutes,
  EnquirySidebar,
  FinalCTA,
} from '@/components/coaching-detail';

export default function CoachingDetailClient({ data }: { data: CoachingInstituteData }) {
  const [counsellingOpen, setCounsellingOpen] = useState(false);

  /* Auto-open once per browser session per institute slug */
  useEffect(() => {
    const key = `counselling_shown_${data.institute.slug}`;
    if (sessionStorage.getItem(key)) return;
    const timer = setTimeout(() => {
      setCounsellingOpen(true);
      sessionStorage.setItem(key, '1');
    }, 1500);
    return () => clearTimeout(timer);
  }, [data.institute.slug]);

  return (
    <CoachingProvider data={data}>
      <div className="min-h-screen bg-gray-50/30">
        <CoachingHero onEnquire={() => setCounsellingOpen(true)} />
        <StickyNavigation />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <AboutInstitute />
          <KeyHighlights />
          <CoursesSection />
          <LiveBatchesSection />
          <FacultySection />
          <RankersSection />
          <MockTestsSection />
          <StudyMaterialsSection />
          <ReviewsSection />
          <FacilitiesSection />
          <AdmissionProcess />
          <FAQSection />
          <SimilarInstitutes />
          <FinalCTA />
        </div>
        <EnquirySidebar
          hideSidebar
          externalOpen={counsellingOpen}
          onExternalClose={() => setCounsellingOpen(false)}
        />
        <div className="h-20 lg:hidden" />
      </div>
    </CoachingProvider>
  );
}
