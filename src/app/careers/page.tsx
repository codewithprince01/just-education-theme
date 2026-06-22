import type { Metadata } from 'next';
import CareersListingPage from '@/components/careers/CareersListingPage';
import { getPublicJobs, careersFaqs } from '@/data/careers';

export const metadata: Metadata = {
    title: 'Careers at Just Education — Open Jobs & Vacancies | JustEducation',
    description:
        'Explore open positions at Just Education. Browse engineering, design, marketing and HR roles across remote, hybrid and onsite locations, and apply online.',
    openGraph: {
        title: 'Careers at Just Education — Open Jobs & Vacancies',
        description: 'Join our team. Explore exciting opportunities and build your career with us.',
        type: 'website',
        url: 'https://justeducation.com/careers',
    },
};

// FAQPage structured data for the careers listing.
const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: careersFaqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
};

export default function CareersPage() {
    // touch the data here so the page is statically aware of open-job count
    void getPublicJobs();
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <CareersListingPage />
        </>
    );
}
