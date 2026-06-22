import type { Metadata, Viewport } from 'next';

import {
    contactSeo,
    CONTACT_SITE_NAME,
    CONTACT_SITE_URL,
    CONTACT_PATH,
    CONTACT_OG_IMAGE,
} from '@/data/contactConfig';
import JsonLd from '@/components/blog/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

import ContactHero from '@/components/contact/ContactHero';
import QuickContactCards from '@/components/contact/QuickContactCards';
import ContactForm from '@/components/contact/ContactForm';
import OfficesSection from '@/components/contact/OfficesSection';
import LazyIndiaMap from '@/components/contact/LazyIndiaMap';
import GlobalPresence from '@/components/contact/GlobalPresence';
import DepartmentDirectory from '@/components/contact/DepartmentDirectory';
import BusinessHours from '@/components/contact/BusinessHours';
import FaqSection from '@/components/contact/FaqSection';
import CareersCTA from '@/components/contact/CareersCTA';
import NewsletterSection from '@/components/contact/NewsletterSection';
import SocialSection from '@/components/contact/SocialSection';
import ContactTimeline from '@/components/contact/ContactTimeline';
import LazyTestimonials from '@/components/contact/LazyTestimonials';
import TrustCertifications from '@/components/contact/TrustCertifications';
import EmergencyBanner from '@/components/contact/EmergencyBanner';

import {
    organizationSchema,
    contactPageSchema,
    faqSchema,
    breadcrumbSchema,
} from '@/components/contact/schema';

const canonical = `${CONTACT_SITE_URL}${CONTACT_PATH}`;

export const metadata: Metadata = {
    title: contactSeo.title,
    description: contactSeo.description,
    keywords: contactSeo.keywords,
    alternates: { canonical },
    openGraph: {
        type: 'website',
        title: contactSeo.title,
        description: contactSeo.description,
        url: canonical,
        siteName: CONTACT_SITE_NAME,
        images: [{ url: CONTACT_OG_IMAGE, width: 1200, height: 630, alt: `Contact ${CONTACT_SITE_NAME}` }],
    },
    twitter: {
        card: 'summary_large_image',
        title: contactSeo.title,
        description: contactSeo.description,
        images: [CONTACT_OG_IMAGE],
    },
};

export const viewport: Viewport = {
    themeColor: '#0B3C5D',
};

export default function ContactPage() {
    return (
        <div className="bg-gray-50">
            <JsonLd
                data={[
                    organizationSchema(),
                    contactPageSchema(),
                    faqSchema(),
                    breadcrumbSchema(),
                ]}
            />

            <ContactHero />

            {/* Breadcrumbs */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <Breadcrumbs items={[{ name: 'Home', url: '/' }, { name: 'Contact Us' }]} />
            </div>

            <QuickContactCards />
            <ContactForm />
            <OfficesSection />
            <LazyIndiaMap />
            <GlobalPresence />
            <DepartmentDirectory />
            <BusinessHours />
            <FaqSection />
            <CareersCTA />
            <NewsletterSection />
            <SocialSection />
            <ContactTimeline />
            <LazyTestimonials />
            <TrustCertifications />
            <EmergencyBanner />
        </div>
    );
}
