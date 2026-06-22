import type { Metadata } from 'next';
import { getLanguageCenter, similarCenters } from '@/data/languageCenterData';
import Reveal from '@/components/about/Reveal';
import EnquiryProvider from '@/components/language-center/EnquiryProvider';
import LcHero from '@/components/language-center/LcHero';
import LcQuickStats from '@/components/language-center/LcQuickStats';
import LcGallery from '@/components/language-center/LcGallery';
import LcLanguages from '@/components/language-center/LcLanguages';
import LcCourses from '@/components/language-center/LcCourses';
import LcLearningModes from '@/components/language-center/LcLearningModes';
import LcFaculty from '@/components/language-center/LcFaculty';
import LcTestimonials from '@/components/language-center/LcTestimonials';
import LcFacilities from '@/components/language-center/LcFacilities';
import LcFaq from '@/components/language-center/LcFaq';
import LcSimilarCenters from '@/components/language-center/LcSimilarCenters';
import EnquirySidebar from '@/components/language-center/EnquirySidebar';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const center = getLanguageCenter(slug);
  return {
    title: `${center.name} - Courses, Fees, Reviews & Faculty | JustEducation`,
    description: `Learn ${center.languages.length}+ languages at ${center.name}, ${center.location.city}. View courses, fees, faculty, facilities, student reviews & book a free demo.`,
  };
}

export default async function LanguageCenterPage({ params }: PageProps) {
  const { slug } = await params;
  const center = getLanguageCenter(slug);

  return (
    <EnquiryProvider center={center}>
      <div className="min-h-screen bg-[#f8fafc] pb-24 lg:pb-12">
        <LcHero center={center} />

        {/* Top: quick stats + gallery alongside the sticky enquiry sidebar */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Reveal>
            <LcQuickStats stats={center.quickStats} />
          </Reveal>

          <Reveal>
            <div className="mt-2 lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10 lg:items-start">
              <main className="min-w-0">
                <LcGallery items={center.gallery} />
              </main>
              <div className="hidden lg:block lg:pt-10">
                <EnquirySidebar center={center} />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Full-width sections */}
        <div className="container mx-auto max-w-7xl overflow-x-hidden px-4 sm:px-6 lg:px-8">
          <Reveal><LcLanguages languages={center.languages} /></Reveal>
          <Reveal><LcCourses courses={center.courses} /></Reveal>
          <Reveal><LcLearningModes modes={center.learningModes} /></Reveal>
          <Reveal><LcFaculty faculty={center.faculty} /></Reveal>
          <Reveal>
            <LcTestimonials
              videos={center.videoReviews}
              reviews={center.reviews}
              rating={center.rating}
              reviewCount={center.reviewCount}
            />
          </Reveal>
          <Reveal><LcFacilities facilities={center.facilities} /></Reveal>
          <Reveal><LcFaq faqs={center.faqs} /></Reveal>
        </div>

        <Reveal><LcSimilarCenters centers={similarCenters} /></Reveal>
      </div>
    </EnquiryProvider>
  );
}
