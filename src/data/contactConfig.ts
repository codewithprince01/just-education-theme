// ============================================================================
// Contact page — centralised configuration
// ----------------------------------------------------------------------------
// Every piece of copy, contact detail, office, stat, FAQ, testimonial and link
// rendered on /contact comes from this file. Swapping the dummy data for a real
// CMS / API later means changing only this module — the UI never has to change.
//
// Accent keys intentionally match the platform palette helper in
// `@/components/blog/theme` (ACCENTS) so colours stay on-brand everywhere.
// ============================================================================

export type Accent =
    | 'navy'
    | 'orange'
    | 'teal'
    | 'blue'
    | 'purple'
    | 'green'
    | 'rose'
    | 'amber';

// ---------------------------------------------------------------------------
// Brand / SEO constants
// ---------------------------------------------------------------------------
export const CONTACT_SITE_NAME = 'Just Education';
export const CONTACT_SITE_URL = 'https://justeducation.com';
export const CONTACT_PATH = '/contact';
export const CONTACT_OG_IMAGE =
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=630&fit=crop';

export const contactSeo = {
    title: 'Contact Us — Talk to the Just Education Team',
    description:
        'Reach the Just Education team across 10 offices in India. Get product support, sales & demos, partnerships, advertising and press assistance — with a guaranteed response and 24/7 emergency help.',
    keywords: [
        'contact just education',
        'just education support',
        'education platform contact',
        'just education offices india',
        'just education sales',
        'just education partnerships',
        'student support india',
    ],
};

// ---------------------------------------------------------------------------
// 1. Hero
// ---------------------------------------------------------------------------
export interface HeroStat {
    id: string;
    /** Numeric target the counter animates to. */
    value: number;
    /** Rendered after the number, e.g. "K", "+". */
    suffix?: string;
    prefix?: string;
    label: string;
}

export const heroContent = {
    badge: 'Contact Us',
    title: "Let's Start a Conversation",
    highlight: 'Conversation',
    subtitle:
        "We're here to help, answer questions, and discuss opportunities.",
    description:
        'Reach out to our team across India. Whether you need support, business partnerships, advertising opportunities, or general assistance, we are ready to help you move forward.',
    primaryCta: { label: 'Contact Team', href: '#contact-form' },
    secondaryCta: { label: 'Schedule Meeting', href: '#schedule' },
};

export const heroStats: HeroStat[] = [
    { id: 'users', value: 100, suffix: 'K+', label: 'Monthly Users' },
    { id: 'tools', value: 50, suffix: '+', label: 'Tools & Resources' },
    { id: 'offices', value: 10, suffix: '+', label: 'Office Locations' },
    { id: 'support', value: 24, suffix: '/7', label: 'Support Availability' },
];

// ---------------------------------------------------------------------------
// 2. Quick contact cards
// ---------------------------------------------------------------------------
export interface QuickContact {
    id: string;
    title: string;
    description: string;
    icon: string; // lucide icon name (resolved in component)
    accent: Accent;
    email: string;
    phone?: string;
    /** Small CTA line, e.g. response time or "Schedule a demo". */
    note: string;
    action?: { label: string; href: string };
}

export const quickContacts: QuickContact[] = [
    {
        id: 'support',
        title: 'General Support',
        description: 'Questions about your account, tools or anything else.',
        icon: 'Headphones',
        accent: 'navy',
        email: 'support@justeducation.com',
        phone: '+91 1800 200 1100',
        note: 'Avg. response in under 2 hours',
    },
    {
        id: 'sales',
        title: 'Sales Team',
        description: 'Explore plans, pricing and live product demos.',
        icon: 'Sparkles',
        accent: 'orange',
        email: 'sales@justeducation.com',
        phone: '+91 1800 200 1200',
        note: 'Book a 30-min walkthrough',
        action: { label: 'Schedule Demo', href: '#schedule' },
    },
    {
        id: 'partnerships',
        title: 'Partnerships',
        description: 'Integrations, co-marketing and institutional tie-ups.',
        icon: 'Handshake',
        accent: 'teal',
        email: 'partners@justeducation.com',
        phone: '+91 1800 200 1300',
        note: 'Strategic alliances welcome',
    },
    {
        id: 'press',
        title: 'Press & Media',
        description: 'Media kits, interviews and brand assets.',
        icon: 'Newspaper',
        accent: 'purple',
        email: 'press@justeducation.com',
        note: 'Spokesperson: Ananya Iyer, Comms Lead',
    },
];

// ---------------------------------------------------------------------------
// 3. Contact form — departments
// ---------------------------------------------------------------------------
export const formDepartments = [
    'Support',
    'Sales',
    'Business',
    'Advertising',
    'Partnerships',
    'Careers',
    'Media',
    'Other',
] as const;

export type Department = (typeof formDepartments)[number];

export const formConfig = {
    messageMaxLength: 1000,
    /** Simulated network latency for the dummy submit (ms). */
    mockLatencyMs: 1600,
};

// ---------------------------------------------------------------------------
// 4 + 5. India offices (with map coordinates)
// ---------------------------------------------------------------------------
export interface Office {
    id: string;
    city: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    /** Real geographic coordinates, projected onto the SVG map at render time. */
    lat: number;
    lng: number;
    isHeadquarters?: boolean;
    mapsQuery: string; // used to build a Google Maps link
}

export const offices: Office[] = [
    {
        id: 'delhi',
        city: 'Delhi',
        name: 'Just Education — National HQ',
        address: 'Tower B, Cyber Greens, DLF Phase III, Gurugram Road, New Delhi 110001',
        phone: '+91 11 4050 1100',
        email: 'delhi@justeducation.com',
        hours: 'Mon–Fri · 9:00 AM – 7:00 PM',
        lat: 28.6139,
        lng: 77.209,
        isHeadquarters: true,
        mapsQuery: 'Connaught Place, New Delhi',
    },
    {
        id: 'mumbai',
        city: 'Mumbai',
        name: 'Just Education — West India',
        address: '12th Floor, One BKC, Bandra Kurla Complex, Mumbai 400051',
        phone: '+91 22 6120 1200',
        email: 'mumbai@justeducation.com',
        hours: 'Mon–Fri · 9:00 AM – 7:00 PM',
        lat: 19.076,
        lng: 72.8777,
        mapsQuery: 'Bandra Kurla Complex, Mumbai',
    },
    {
        id: 'bangalore',
        city: 'Bangalore',
        name: 'Just Education — Product & Engineering',
        address: 'Prestige Tech Park, Outer Ring Road, Marathahalli, Bengaluru 560103',
        phone: '+91 80 4710 1300',
        email: 'bangalore@justeducation.com',
        hours: 'Mon–Fri · 9:30 AM – 7:30 PM',
        lat: 12.9716,
        lng: 77.5946,
        mapsQuery: 'Outer Ring Road, Bengaluru',
    },
    {
        id: 'hyderabad',
        city: 'Hyderabad',
        name: 'Just Education — South Central',
        address: 'Knowledge City, Raidurg, HITEC City, Hyderabad 500081',
        phone: '+91 40 4900 1400',
        email: 'hyderabad@justeducation.com',
        hours: 'Mon–Fri · 9:30 AM – 7:30 PM',
        lat: 17.385,
        lng: 78.4867,
        mapsQuery: 'HITEC City, Hyderabad',
    },
    {
        id: 'chennai',
        city: 'Chennai',
        name: 'Just Education — Coastal South',
        address: 'Olympia Tech Park, Guindy, Chennai 600032',
        phone: '+91 44 4300 1500',
        email: 'chennai@justeducation.com',
        hours: 'Mon–Fri · 9:00 AM – 7:00 PM',
        lat: 13.0827,
        lng: 80.2707,
        mapsQuery: 'Guindy, Chennai',
    },
    {
        id: 'pune',
        city: 'Pune',
        name: 'Just Education — Pune Campus',
        address: 'Business Bay, Airport Road, Yerawada, Pune 411006',
        phone: '+91 20 6720 1600',
        email: 'pune@justeducation.com',
        hours: 'Mon–Fri · 9:30 AM – 7:00 PM',
        lat: 18.5204,
        lng: 73.8567,
        mapsQuery: 'Yerawada, Pune',
    },
    {
        id: 'kolkata',
        city: 'Kolkata',
        name: 'Just Education — East India',
        address: 'PS Srijan Corporate Park, Sector V, Salt Lake, Kolkata 700091',
        phone: '+91 33 4600 1700',
        email: 'kolkata@justeducation.com',
        hours: 'Mon–Fri · 9:00 AM – 7:00 PM',
        lat: 22.5726,
        lng: 88.3639,
        mapsQuery: 'Salt Lake Sector V, Kolkata',
    },
    {
        id: 'ahmedabad',
        city: 'Ahmedabad',
        name: 'Just Education — Gujarat',
        address: 'Titanium City Center, Anandnagar Road, Satellite, Ahmedabad 380015',
        phone: '+91 79 4800 1800',
        email: 'ahmedabad@justeducation.com',
        hours: 'Mon–Fri · 9:30 AM – 7:00 PM',
        lat: 23.0225,
        lng: 72.5714,
        mapsQuery: 'Satellite, Ahmedabad',
    },
    {
        id: 'jaipur',
        city: 'Jaipur',
        name: 'Just Education — Rajasthan',
        address: 'Crystal Mall, Ashok Marg, C-Scheme, Jaipur 302001',
        phone: '+91 141 4100 1900',
        email: 'jaipur@justeducation.com',
        hours: 'Mon–Fri · 9:30 AM – 6:30 PM',
        lat: 26.9124,
        lng: 75.7873,
        mapsQuery: 'C-Scheme, Jaipur',
    },
    {
        id: 'chandigarh',
        city: 'Chandigarh',
        name: 'Just Education — North Hub',
        address: 'Plot 5, Rajiv Gandhi IT Park, Kishangarh, Chandigarh 160101',
        phone: '+91 172 4200 2000',
        email: 'chandigarh@justeducation.com',
        hours: 'Mon–Fri · 9:30 AM – 6:30 PM',
        lat: 30.7333,
        lng: 76.7794,
        mapsQuery: 'Rajiv Gandhi IT Park, Chandigarh',
    },
];

/** Bounding box used to project office lat/lng onto the India map SVG. */
export const INDIA_BOUNDS = { north: 35.5, south: 7.5, west: 68, east: 97.5 };

export function googleMapsLink(query: string): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

// ---------------------------------------------------------------------------
// 6. Global presence
// ---------------------------------------------------------------------------
export interface Region {
    id: string;
    name: string;
    clients: string;
    activeUsers: string;
    growth: string; // YoY growth
    accent: Accent;
    /** Position on the stylised world map, in % of the viewport box. */
    x: number;
    y: number;
}

export const regions: Region[] = [
    { id: 'india', name: 'India', clients: '1,200+', activeUsers: '820K', growth: '+38%', accent: 'orange', x: 71, y: 55 },
    { id: 'apac', name: 'Asia Pacific', clients: '480+', activeUsers: '210K', growth: '+44%', accent: 'teal', x: 82, y: 62 },
    { id: 'europe', name: 'Europe', clients: '360+', activeUsers: '140K', growth: '+27%', accent: 'blue', x: 50, y: 40 },
    { id: 'na', name: 'North America', clients: '290+', activeUsers: '160K', growth: '+31%', accent: 'purple', x: 22, y: 44 },
    { id: 'me', name: 'Middle East', clients: '170+', activeUsers: '60K', growth: '+52%', accent: 'amber', x: 60, y: 53 },
];

export const globalSummary = [
    { id: 'countries', label: 'Countries served', value: '32+' },
    { id: 'clients', label: 'Institutions & partners', value: '2,500+' },
    { id: 'languages', label: 'Languages supported', value: '14' },
];

// ---------------------------------------------------------------------------
// 7. Department directory
// ---------------------------------------------------------------------------
export interface DepartmentEntry {
    id: string;
    name: string;
    icon: string;
    accent: Accent;
    email: string;
    phone: string;
    responseTime: string;
}

export const departmentDirectory: DepartmentEntry[] = [
    { id: 'customer-support', name: 'Customer Support', icon: 'Headphones', accent: 'navy', email: 'support@justeducation.com', phone: '+91 1800 200 1100', responseTime: 'Within 2 hours' },
    { id: 'technical-support', name: 'Technical Support', icon: 'Wrench', accent: 'blue', email: 'tech@justeducation.com', phone: '+91 1800 200 1110', responseTime: 'Within 4 hours' },
    { id: 'sales', name: 'Sales', icon: 'Sparkles', accent: 'orange', email: 'sales@justeducation.com', phone: '+91 1800 200 1200', responseTime: 'Same business day' },
    { id: 'partnerships', name: 'Partnerships', icon: 'Handshake', accent: 'teal', email: 'partners@justeducation.com', phone: '+91 1800 200 1300', responseTime: 'Within 1 business day' },
    { id: 'advertising', name: 'Advertising', icon: 'Megaphone', accent: 'rose', email: 'ads@justeducation.com', phone: '+91 1800 200 1400', responseTime: 'Within 1 business day' },
    { id: 'careers', name: 'Careers', icon: 'Briefcase', accent: 'green', email: 'careers@justeducation.com', phone: '+91 1800 200 1500', responseTime: 'Within 3 business days' },
    { id: 'media', name: 'Media', icon: 'Newspaper', accent: 'purple', email: 'press@justeducation.com', phone: '+91 1800 200 1600', responseTime: 'Within 1 business day' },
    { id: 'legal', name: 'Legal', icon: 'Scale', accent: 'amber', email: 'legal@justeducation.com', phone: '+91 1800 200 1700', responseTime: 'Within 5 business days' },
];

// ---------------------------------------------------------------------------
// 8. Business hours
// ---------------------------------------------------------------------------
export interface DayHours {
    day: string;
    hours: string;
    closed?: boolean;
}

export const businessHours: DayHours[] = [
    { day: 'Monday', hours: '9:00 AM – 7:00 PM' },
    { day: 'Tuesday', hours: '9:00 AM – 7:00 PM' },
    { day: 'Wednesday', hours: '9:00 AM – 7:00 PM' },
    { day: 'Thursday', hours: '9:00 AM – 7:00 PM' },
    { day: 'Friday', hours: '9:00 AM – 7:00 PM' },
    { day: 'Saturday', hours: '10:00 AM – 5:00 PM' },
    { day: 'Sunday', hours: 'Closed', closed: true },
];

export const hoursHighlights = [
    { id: 'support', icon: 'Headphones', accent: 'navy' as Accent, title: 'Support Hours', detail: 'Mon–Sat · 9:00 AM – 9:00 PM IST' },
    { id: 'sales', icon: 'Sparkles', accent: 'orange' as Accent, title: 'Sales Hours', detail: 'Mon–Fri · 9:00 AM – 7:00 PM IST' },
    { id: 'emergency', icon: 'Zap', accent: 'rose' as Accent, title: 'Emergency Contact', detail: 'Available 24 / 7 · 365 days' },
];

// ---------------------------------------------------------------------------
// 9. FAQ
// ---------------------------------------------------------------------------
export interface ContactFaq {
    id: string;
    question: string;
    answer: string;
    category: 'General' | 'Support' | 'Business' | 'Account';
}

export const contactFaqs: ContactFaq[] = [
    { id: 'f1', category: 'General', question: 'How quickly will I receive a response?', answer: 'Most queries are answered within 2 hours during business hours. Sales and partnership requests are typically handled the same business day, and emergency support is available 24/7.' },
    { id: 'f2', category: 'Business', question: 'How can I advertise on Just Education?', answer: 'Email ads@justeducation.com or pick "Advertising" in the contact form. Our team will share the media kit, audience insights and available placements within one business day.' },
    { id: 'f3', category: 'Business', question: 'How do partnerships work?', answer: 'We partner with institutions, EdTech tools and content creators. Reach out via the Partnerships card and we will schedule a discovery call to map out integration, co-marketing or revenue-share options.' },
    { id: 'f4', category: 'General', question: 'Can I request a new feature?', answer: 'Absolutely. Select "Other" in the form and describe your idea. Feature requests are reviewed weekly by our product team, and we follow up if we need more detail.' },
    { id: 'f5', category: 'Support', question: 'How can I report a bug?', answer: 'Use the form with department "Support" or email tech@justeducation.com. Including screenshots, the page URL and your browser/device helps us reproduce and fix issues faster.' },
    { id: 'f6', category: 'Support', question: 'Do you offer phone support?', answer: 'Yes. Each regional office has a dedicated line, and our national support number +91 1800 200 1100 is toll-free across India during support hours.' },
    { id: 'f7', category: 'Account', question: 'I forgot my password — what do I do?', answer: 'Use the "Forgot password" link on the sign-in screen for an instant reset email. If you still cannot access your account, contact support and we will verify and restore it.' },
    { id: 'f8', category: 'Business', question: 'Can I schedule a product demo?', answer: 'Yes — click "Schedule Meeting" or "Schedule Demo". You can pick a 30-minute slot that suits your timezone, and a specialist will walk you through the platform.' },
    { id: 'f9', category: 'General', question: 'Which cities do you have offices in?', answer: 'We operate from 10 cities: Delhi (HQ), Mumbai, Bangalore, Hyderabad, Chennai, Pune, Kolkata, Ahmedabad, Jaipur and Chandigarh. Use the interactive map to view each location.' },
    { id: 'f10', category: 'Account', question: 'How is my personal data handled?', answer: 'All form submissions are encrypted in transit (TLS) and processed in line with our privacy policy. We are GDPR-ready and never sell your information to third parties.' },
    { id: 'f11', category: 'Support', question: 'Is there support available on weekends?', answer: 'Support operates Monday to Saturday, 9:00 AM – 9:00 PM IST. For urgent platform issues outside these hours, our 24/7 emergency line stays open.' },
    { id: 'f12', category: 'Business', question: 'Do you work with educational institutions?', answer: 'Yes. We offer institution-wide programs with dedicated onboarding, analytics dashboards and SSO. Choose "Business" in the form to start the conversation.' },
    { id: 'f13', category: 'Account', question: 'Can I upgrade or downgrade my plan?', answer: 'Plans can be changed anytime from your dashboard billing section. If you need help choosing the right tier, our sales team is happy to advise.' },
    { id: 'f14', category: 'General', question: 'Do you offer careers or internships?', answer: 'We are always hiring across product, engineering, content and growth. Visit the Careers section below or email careers@justeducation.com with your resume and portfolio.' },
    { id: 'f15', category: 'Support', question: 'What information should I include in my message?', answer: 'Share your name, the relevant department, a clear subject and as much context as possible. For technical issues, add steps to reproduce and any error messages you saw.' },
    { id: 'f16', category: 'General', question: 'In which languages can I get support?', answer: 'Our team supports 14 languages including English, Hindi, Tamil, Telugu, Bengali, Marathi and Gujarati, so you can reach out in the language you are most comfortable with.' },
];

// ---------------------------------------------------------------------------
// 10. Careers CTA
// ---------------------------------------------------------------------------
export const careersCta = {
    badge: 'We are hiring',
    title: 'Want to Join Our Team?',
    description:
        'Explore exciting opportunities and help us build the future of education for millions of learners across India and beyond.',
    stats: [
        { id: 'roles', value: '40+', label: 'Open roles' },
        { id: 'teams', value: '12', label: 'Teams hiring' },
        { id: 'rating', value: '4.8★', label: 'Employee rating' },
    ],
    primary: { label: 'View Careers', href: '#' },
    secondary: { label: 'Open Positions', href: '#' },
};

// ---------------------------------------------------------------------------
// 11. Newsletter
// ---------------------------------------------------------------------------
export const newsletterConfig = {
    title: 'Stay in the loop',
    description:
        'Get product updates, exam alerts and education insights delivered to your inbox. No spam, unsubscribe anytime.',
    perks: ['Weekly insights', 'Exam & deadline alerts', 'Early feature access'],
    mockLatencyMs: 1300,
};

// ---------------------------------------------------------------------------
// 12. Social media
// ---------------------------------------------------------------------------
export interface SocialLink {
    id: string;
    name: string;
    handle: string;
    followers: string;
    href: string;
    /** Brand colour used for the hover state. */
    color: string;
}

export const socialLinks: SocialLink[] = [
    { id: 'facebook', name: 'Facebook', handle: '@justeducation', followers: '320K', href: 'https://facebook.com/justeducation', color: '#1877F2' },
    { id: 'instagram', name: 'Instagram', handle: '@just.education', followers: '510K', href: 'https://instagram.com/justeducation', color: '#E1306C' },
    { id: 'linkedin', name: 'LinkedIn', handle: 'Just Education', followers: '180K', href: 'https://linkedin.com/company/justeducation', color: '#0A66C2' },
    { id: 'x', name: 'X', handle: '@justeducation', followers: '240K', href: 'https://x.com/justeducation', color: '#000000' },
    { id: 'youtube', name: 'YouTube', handle: 'Just Education', followers: '430K', href: 'https://youtube.com/@justeducation', color: '#FF0000' },
    { id: 'telegram', name: 'Telegram', handle: 'Just Education', followers: '95K', href: 'https://t.me/justeducation', color: '#229ED9' },
];

// ---------------------------------------------------------------------------
// 13. Contact process timeline
// ---------------------------------------------------------------------------
export interface TimelineStep {
    id: string;
    step: number;
    title: string;
    description: string;
    icon: string;
}

export const contactTimeline: TimelineStep[] = [
    { id: 't1', step: 1, title: 'Submit Request', description: 'Send us your message through the form or any contact channel.', icon: 'Send' },
    { id: 't2', step: 2, title: 'Team Review', description: 'Our team reads and prioritises your request within minutes.', icon: 'Search' },
    { id: 't3', step: 3, title: 'Assign Department', description: 'We route it to the specialists best placed to help you.', icon: 'Users' },
    { id: 't4', step: 4, title: 'Response Sent', description: 'You receive a clear, actionable reply from the right person.', icon: 'MailCheck' },
    { id: 't5', step: 5, title: 'Resolution', description: 'We follow through until your query is fully resolved.', icon: 'CircleCheckBig' },
];

// ---------------------------------------------------------------------------
// 14. Testimonials
// ---------------------------------------------------------------------------
export interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    quote: string;
    avatar: string;
    rating: number;
}

export const testimonials: Testimonial[] = [
    { id: 'ts1', name: 'Aarav Sharma', role: 'Director of Admissions', company: 'Horizon Institute', quote: 'The Just Education team responded within the hour and helped us roll out their platform across three campuses. Genuinely the most responsive partner we have worked with.', avatar: 'https://i.pravatar.cc/160?img=12', rating: 5 },
    { id: 'ts2', name: 'Priya Nair', role: 'Head of Growth', company: 'EduSpark', quote: 'From the first sales call to integration, every interaction felt premium and well thought out. Support is fast, friendly and genuinely knowledgeable.', avatar: 'https://i.pravatar.cc/160?img=45', rating: 5 },
    { id: 'ts3', name: 'Rohan Mehta', role: 'Founder', company: 'PrepNest', quote: 'We partnered with Just Education for content distribution and saw a 40% jump in qualified leads in the first quarter. Their partnerships team is outstanding.', avatar: 'https://i.pravatar.cc/160?img=33', rating: 5 },
    { id: 'ts4', name: 'Sneha Reddy', role: 'Marketing Manager', company: 'Bright Futures', quote: 'Their advertising team helped us reach exactly the right student audience. Transparent reporting and a clear ROI — exactly what we needed.', avatar: 'https://i.pravatar.cc/160?img=20', rating: 4 },
    { id: 'ts5', name: 'Vikram Singh', role: 'CTO', company: 'LearnLoop', quote: 'The technical support is on another level. Detailed answers, fast turnaround and a real understanding of our integration. Highly recommended.', avatar: 'https://i.pravatar.cc/160?img=51', rating: 5 },
    { id: 'ts6', name: 'Ananya Iyer', role: 'Operations Lead', company: 'ScholarHub', quote: 'Booking a demo was effortless and the team tailored everything to our use case. We onboarded the whole organisation in under two weeks.', avatar: 'https://i.pravatar.cc/160?img=27', rating: 5 },
];

// ---------------------------------------------------------------------------
// 15. Trust & certifications
// ---------------------------------------------------------------------------
export interface Certification {
    id: string;
    label: string;
    icon: string;
    accent: Accent;
}

export const certifications: Certification[] = [
    { id: 'ssl', label: 'SSL Secured', icon: 'Lock', accent: 'green' },
    { id: 'gdpr', label: 'GDPR Ready', icon: 'ShieldCheck', accent: 'blue' },
    { id: 'enterprise', label: 'Enterprise Support', icon: 'BadgeCheck', accent: 'navy' },
    { id: 'uptime', label: '99.9% Uptime', icon: 'Activity', accent: 'orange' },
    { id: 'infra', label: 'Secure Infrastructure', icon: 'Server', accent: 'purple' },
];

// ---------------------------------------------------------------------------
// 16. Emergency banner
// ---------------------------------------------------------------------------
export const emergencyBanner = {
    title: 'Need Immediate Assistance?',
    description:
        'Our support specialists are available around the clock to help with urgent platform issues.',
    phone: '+91 1800 200 0000',
    email: 'urgent@justeducation.com',
    actions: {
        call: { label: 'Call Now', href: 'tel:+9118002000000' },
        email: { label: 'Email Us', href: 'mailto:urgent@justeducation.com' },
        chat: { label: 'Live Chat', href: '#' },
    },
};

// ---------------------------------------------------------------------------
// Breadcrumbs
// ---------------------------------------------------------------------------
export const contactBreadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Contact Us', url: CONTACT_PATH },
];
