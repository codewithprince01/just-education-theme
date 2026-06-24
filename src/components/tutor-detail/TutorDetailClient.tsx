'use client';

import { TutorProvider } from '@/context/TutorContext';
import type { Tutor } from '@/data/tutors/types';
import {
  TutorHero,
  StickyNavigation,
  AboutTutor,
  VerificationSection,
  SubjectsSection,
  TeachingMethodology,
  SessionBooking,
  AITutorMatching,
  LearningProgressTracker,
  ParentDashboardPreview,
  SuccessStories,
  TrendingSubjects,
  StudyResources,
  ReviewsSection,
  FacilitiesSection,
  FAQSection,
  SimilarTutors,
  StickyBookingSidebar,
  FinalCTA,
} from '@/components/tutor-detail';

export default function TutorDetailClient({ tutor }: { tutor: Tutor }) {
  function scrollToBooking() {
    document.getElementById('section-booking')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <TutorProvider tutor={tutor}>
      <div className="min-h-screen bg-white">
        <TutorHero onBookTrial={scrollToBooking} />
        <StickyNavigation />

        {/* Two-column layout: content + sticky booking sidebar (desktop) */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8 items-start py-4">
            <div className="lg:col-span-8 xl:col-span-9">
              <AboutTutor />
              <VerificationSection />
              <SubjectsSection />
              <TeachingMethodology />
              <SessionBooking />
              <AITutorMatching />
              <LearningProgressTracker />
              <ParentDashboardPreview />
              <SuccessStories />
              <TrendingSubjects />
              <StudyResources />
              <ReviewsSection />
              <FacilitiesSection />
              <FAQSection />
              <SimilarTutors />
            </div>

            <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 py-12">
              <StickyBookingSidebar />
            </aside>
          </div>

          <FinalCTA onBookTrial={scrollToBooking} />
        </div>

        {/* Mobile sticky bottom CTA lives inside StickyBookingSidebar */}
        <div className="lg:hidden">
          <StickyBookingSidebar />
        </div>

        {/* Spacer so mobile bottom bar doesn't cover content */}
        <div className="h-20 lg:hidden" />
      </div>
    </TutorProvider>
  );
}
