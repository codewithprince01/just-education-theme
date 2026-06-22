/**
 * About page content layer.
 *
 * Single source of truth for the /about page. Everything here is intentionally
 * plain, serializable data (icons are stored as string keys, not component
 * references) so a CMS or backend API can later populate the exact same shapes
 * without touching the UI. The page maps the string `icon` keys to lucide-react
 * components via a lookup table in the component layer.
 */

// Trust indicators shown in the strip directly under the hero.
export const trustIndicators: { icon: string; label: string }[] = [
    { icon: 'ShieldCheck', label: 'Verified Educational Information' },
    { icon: 'Heart', label: 'Student First Approach' },
    { icon: 'MapPin', label: 'Nationwide Coverage' },
    { icon: 'RefreshCw', label: 'Regularly Updated Data' },
    { icon: 'BadgeCheck', label: 'Independent Education Platform' },
];

// Mission cards — Section 3.
export const missionItems: { icon: string; title: string; description: string }[] = [
    {
        icon: 'Globe2',
        title: 'Make Education Information Accessible',
        description: 'Bring structured, reliable educational information within reach of every student, parent, and aspirant across India.',
    },
    {
        icon: 'Compass',
        title: 'Simplify Educational Discovery',
        description: 'Help learners find the right colleges, courses, and exams quickly without navigating scattered, unreliable sources.',
    },
    {
        icon: 'Eye',
        title: 'Promote Transparency',
        description: 'Present admissions, eligibility, fees, and academic details openly so decisions are based on clarity, not guesswork.',
    },
    {
        icon: 'Target',
        title: 'Support Better Decision Making',
        description: 'Equip students with comparable, well-organised information to evaluate options with genuine confidence.',
    },
    {
        icon: 'TrendingUp',
        title: 'Empower Future Careers',
        description: 'Connect academic choices to long-term career outcomes so today’s decision builds tomorrow’s opportunity.',
    },
    {
        icon: 'GraduationCap',
        title: 'Improve Student Outcomes',
        description: 'Reduce confusion and information gaps so more students reach institutions and courses that truly fit them.',
    },
];

// Platform statistics — Section 4. `value` and `suffix` are kept separate so
// counters can animate the numeric portion. Replace with live API values later.
export const platformStats: { value: number; suffix: string; label: string; icon: string }[] = [
    { value: 45000, suffix: '+', label: 'Colleges Covered', icon: 'Building2' },
    { value: 1200, suffix: '+', label: 'Universities Covered', icon: 'Landmark' },
    { value: 12000, suffix: '+', label: 'Courses Available', icon: 'BookOpen' },
    { value: 850, suffix: '+', label: 'Entrance Exams Listed', icon: 'ClipboardList' },
    { value: 25000, suffix: '+', label: 'Educational Articles Published', icon: 'Newspaper' },
    { value: 600, suffix: '+', label: 'Cities Covered', icon: 'MapPin' },
    { value: 90000, suffix: '+', label: 'Institutions Listed', icon: 'School' },
    { value: 5000000, suffix: '+', label: 'Students Assisted', icon: 'Users' },
];

// "What We Cover" category grid — Section 5.
export const coverageCategories: { icon: string; title: string; description: string }[] = [
    { icon: 'Building2', title: 'Colleges', description: 'Explore detailed profiles of colleges across every stream and region.' },
    { icon: 'Landmark', title: 'Universities', description: 'Discover central, state, deemed, and private universities in India.' },
    { icon: 'School', title: 'Schools', description: 'Find schools with curriculum, facilities, and admission details.' },
    { icon: 'BookOpen', title: 'Courses', description: 'Compare UG, PG, diploma, and certification courses with ease.' },
    { icon: 'ClipboardList', title: 'Entrance Exams', description: 'Track dates, patterns, syllabi, and results for major exams.' },
    { icon: 'Wallet', title: 'Scholarships', description: 'Browse scholarships by category, eligibility, and benefits.' },
    { icon: 'FileText', title: 'Admissions', description: 'Understand application steps, cut-offs, and admission timelines.' },
    { icon: 'Lightbulb', title: 'Coaching Institutes', description: 'Find coaching options for competitive and academic preparation.' },
    { icon: 'Trophy', title: 'Results', description: 'Stay updated with exam results and merit announcements.' },
    { icon: 'LineChart', title: 'Rankings', description: 'Review institution rankings to benchmark your choices.' },
    { icon: 'Briefcase', title: 'Careers', description: 'Map courses and exams to real-world career pathways.' },
    { icon: 'Plane', title: 'Study Abroad', description: 'Explore international study options and admission requirements.' },
    { icon: 'Newspaper', title: 'Education News', description: 'Read the latest updates shaping Indian education.' },
    { icon: 'PenTool', title: 'Educational Blogs', description: 'Learn from guides, tips, and expert academic insights.' },
];

// "Why Students Trust" feature cards — Section 6.
export const trustFeatures: { icon: string; title: string; description: string }[] = [
    { icon: 'ShieldCheck', title: 'Verified Information', description: 'Information sourced from official institutional sources wherever possible.' },
    { icon: 'RefreshCw', title: 'Regular Updates', description: 'Educational information is reviewed and updated regularly.' },
    { icon: 'Scale', title: 'Easy Comparisons', description: 'Compare colleges, courses, exams, and institutions side by side.' },
    { icon: 'Layers', title: 'Comprehensive Coverage', description: 'Access educational opportunities across multiple categories.' },
    { icon: 'Heart', title: 'Student-Centric Experience', description: 'Built with student needs as the primary focus.' },
    { icon: 'Eye', title: 'Transparent Information', description: 'Clear presentation of admissions, eligibility, fees, and academic details.' },
];

// "How It Works" timeline steps — Section 7.
export const workflowSteps: { title: string; description: string; icon: string }[] = [
    { title: 'Search Colleges, Courses, or Exams', description: 'Start with what matters to you and discover relevant options instantly.', icon: 'Search' },
    { title: 'Explore Detailed Information', description: 'Dive into eligibility, fees, admissions, rankings, and more.', icon: 'BookOpen' },
    { title: 'Compare Educational Options', description: 'Weigh institutions and courses against each other with clarity.', icon: 'Scale' },
    { title: 'Review Eligibility and Admission Details', description: 'Confirm requirements, deadlines, and the admission process.', icon: 'ClipboardList' },
    { title: 'Plan Your Academic Journey', description: 'Make a confident, informed decision for your future.', icon: 'GraduationCap' },
];

// "Information You Can Explore" grid — Section 8.
export const informationTypes: { icon: string; label: string }[] = [
    { icon: 'Building2', label: 'College Information' },
    { icon: 'Landmark', label: 'University Information' },
    { icon: 'School', label: 'School Information' },
    { icon: 'BookOpen', label: 'Course Details' },
    { icon: 'CheckCircle2', label: 'Eligibility Criteria' },
    { icon: 'FileText', label: 'Admission Process' },
    { icon: 'IndianRupee', label: 'Fee Structure' },
    { icon: 'Briefcase', label: 'Placement Information' },
    { icon: 'ClipboardList', label: 'Exam Information' },
    { icon: 'LineChart', label: 'Rankings' },
    { icon: 'Star', label: 'Reviews' },
    { icon: 'Wallet', label: 'Scholarships' },
    { icon: 'Library', label: 'Infrastructure Details' },
    { icon: 'TrendingUp', label: 'Career Opportunities' },
];

// Core values — Section 10.
export const coreValues: { icon: string; title: string; description: string }[] = [
    { icon: 'ShieldCheck', title: 'Trust', description: 'Accuracy and reliability in educational information.' },
    { icon: 'Eye', title: 'Transparency', description: 'Open and unbiased presentation of information.' },
    { icon: 'Globe2', title: 'Accessibility', description: 'Making educational information easy to access.' },
    { icon: 'Sparkles', title: 'Innovation', description: 'Continuously improving the student experience.' },
    { icon: 'Heart', title: 'Student First', description: 'Keeping student success at the center of decisions.' },
    { icon: 'Award', title: 'Excellence', description: 'Maintaining high standards of quality and usability.' },
];

// Ecosystem nodes — compact 8-node orbit used by the radial diagram.
export const ecosystemNodes: { icon: string; label: string }[] = [
    { icon: 'Building2', label: 'Colleges' },
    { icon: 'Landmark', label: 'Universities' },
    { icon: 'School', label: 'Schools' },
    { icon: 'BookOpen', label: 'Courses' },
    { icon: 'ClipboardList', label: 'Exams' },
    { icon: 'Wallet', label: 'Scholarships' },
    { icon: 'FileText', label: 'Admissions' },
    { icon: 'Briefcase', label: 'Careers' },
];

/* =========================================================================
 * Storytelling datasets (premium About redesign). All plain/serializable so a
 * backend or CMS can drive them. Icons are string keys resolved in the UI.
 * ========================================================================= */

// Section 1 — floating hero chips (label + icon + tuned position classes).
export const heroFloatingChips: { icon: string; label: string; pos: string; delay: number }[] = [
    { icon: 'Building2', label: 'Colleges', pos: 'top-[6%] left-[2%]', delay: 0 },
    { icon: 'Landmark', label: 'Universities', pos: 'top-[0%] right-[12%]', delay: 120 },
    { icon: 'ClipboardList', label: 'Entrance Exams', pos: 'top-[40%] -right-[2%]', delay: 240 },
    { icon: 'Wallet', label: 'Scholarships', pos: 'bottom-[8%] right-[6%]', delay: 360 },
    { icon: 'BookOpen', label: 'Courses', pos: 'bottom-[2%] left-[10%]', delay: 200 },
    { icon: 'Briefcase', label: 'Careers', pos: 'top-[46%] -left-[4%]', delay: 300 },
];

// Section 3 — the student journey flow.
export const journeyStages: { icon: string; title: string; caption: string }[] = [
    { icon: 'GraduationCap', title: 'Student', caption: 'Every journey begins here' },
    { icon: 'BookOpen', title: 'Explore Courses', caption: 'Find programs that fit' },
    { icon: 'Building2', title: 'Discover Colleges', caption: 'Shortlist the right institutions' },
    { icon: 'Scale', title: 'Compare Options', caption: 'Weigh choices with clarity' },
    { icon: 'ClipboardList', title: 'Prepare for Exams', caption: 'Plan and practise' },
    { icon: 'FileText', title: 'Admissions', caption: 'Navigate the process' },
    { icon: 'Wallet', title: 'Scholarships', caption: 'Fund your education' },
    { icon: 'TrendingUp', title: 'Career Growth', caption: 'Build a brighter future' },
];

// Section 4 — full ecosystem (13 connected nodes around the JustEducation hub).
export const ecosystemFull: { icon: string; label: string }[] = [
    { icon: 'Building2', label: 'Colleges' },
    { icon: 'Landmark', label: 'Universities' },
    { icon: 'School', label: 'Schools' },
    { icon: 'BookOpen', label: 'Courses' },
    { icon: 'ClipboardList', label: 'Exams' },
    { icon: 'Wallet', label: 'Scholarships' },
    { icon: 'FileText', label: 'Admissions' },
    { icon: 'Lightbulb', label: 'Coaching Institutes' },
    { icon: 'Trophy', label: 'Results' },
    { icon: 'LineChart', label: 'Rankings' },
    { icon: 'Briefcase', label: 'Careers' },
    { icon: 'Plane', label: 'Study Abroad' },
    { icon: 'Newspaper', label: 'Educational News' },
];

// Section 5 — impact counters (numeric value split from suffix for count-up).
export const impactStats: { value: number; suffix: string; label: string; icon: string }[] = [
    { value: 10000, suffix: '+', label: 'Colleges', icon: 'Building2' },
    { value: 5000, suffix: '+', label: 'Courses', icon: 'BookOpen' },
    { value: 1000, suffix: '+', label: 'Exams', icon: 'ClipboardList' },
    { value: 500, suffix: '+', label: 'Cities', icon: 'MapPin' },
    { value: 1000000, suffix: '+', label: 'Students Reached', icon: 'Users' },
    { value: 100000, suffix: '+', label: 'Educational Resources', icon: 'Library' },
];

// Section 6 — how information reaches students (process flow).
export const deliveryProcess: { icon: string; title: string; description: string }[] = [
    { icon: 'Landmark', title: 'Institution Sources', description: 'We start with official institutional and authoritative sources.' },
    { icon: 'Layers', title: 'Data Collection', description: 'Information is gathered and organised into structured formats.' },
    { icon: 'ShieldCheck', title: 'Verification', description: 'Details are cross-checked for accuracy and reliability.' },
    { icon: 'PenTool', title: 'Content Processing', description: 'Data is refined into clear, comparable, readable content.' },
    { icon: 'Globe2', title: 'Platform Publishing', description: 'Verified content is published across the platform.' },
    { icon: 'GraduationCap', title: 'Student Access', description: 'Students explore reliable information, anytime, anywhere.' },
];

// Section 7 — alternating trust storytelling blocks (no cards). `flip` puts the
// illustration on the right. `art` selects an inline SVG illustration.
export const trustStoryBlocks: { art: string; icon: string; title: string; body: string; points: string[]; flip: boolean }[] = [
    {
        art: 'verified', icon: 'ShieldCheck', title: 'Verified Information', flip: false,
        body: 'Trust begins with accuracy. Wherever possible, JustEducation sources information from official institutional and authoritative references, then cross-checks the details before they ever reach a student.',
        points: ['Sourced from official references', 'Cross-checked before publishing', 'Reviewed for consistency'],
    },
    {
        art: 'updates', icon: 'RefreshCw', title: 'Regular Updates', flip: true,
        body: 'Education never stands still — dates shift, fees revise, eligibility evolves. Our information is reviewed and refreshed regularly so students plan around what is current, not what was true last year.',
        points: ['Ongoing review cycles', 'Updated admission timelines', 'Current fees & eligibility'],
    },
    {
        art: 'compare', icon: 'Scale', title: 'Easy Comparisons', flip: false,
        body: 'Decisions get easier when options sit side by side. JustEducation structures colleges, courses, exams, and institutions into comparable formats so students can weigh what genuinely matters to them.',
        points: ['Side-by-side clarity', 'Comparable, structured data', 'Focus on what matters'],
    },
    {
        art: 'student', icon: 'Heart', title: 'Student-First Experience', flip: true,
        body: 'Every layout, label, and flow is built around the student. The goal is never to overwhelm — it is to guide, simplify, and empower confident decisions at each step of the journey.',
        points: ['Designed around student needs', 'Clear, guided experience', 'Built to empower, not overwhelm'],
    },
];

// Section 8 — growth journey milestones (timeline).
export const growthMilestones: { year: string; title: string; description: string; icon: string }[] = [
    { year: '2026', title: 'JustEducation Launch', description: 'The platform goes live with a mission to simplify educational discovery for students across India.', icon: 'Sparkles' },
    { year: '2027', title: 'Expansion of Educational Categories', description: 'Coverage broadens across colleges, courses, exams, scholarships, and more.', icon: 'Layers' },
    { year: '2028', title: 'National Institution Coverage', description: 'Information scales to institutions in every region of the country.', icon: 'MapPin' },
    { year: '2029', title: 'Millions of Educational Records', description: 'A deep, structured knowledge base powers smarter student decisions.', icon: 'Library' },
    { year: '2030', title: 'Leading Education Discovery Ecosystem', description: 'JustEducation stands among India\'s most trusted education ecosystems.', icon: 'Trophy' },
];

// Section 9 — the student network (center = Student, surrounded by opportunities).
export const networkNodes: { icon: string; label: string }[] = [
    { icon: 'Building2', label: 'Colleges' },
    { icon: 'Landmark', label: 'Universities' },
    { icon: 'BookOpen', label: 'Courses' },
    { icon: 'ClipboardList', label: 'Exams' },
    { icon: 'Wallet', label: 'Scholarships' },
    { icon: 'FileText', label: 'Admissions' },
    { icon: 'Lightbulb', label: 'Coaching' },
    { icon: 'Briefcase', label: 'Careers' },
    { icon: 'Library', label: 'Educational Resources' },
];

// Section 12 — trust & transparency pillars (storytelling, not cards).
export const transparencyPillars: { icon: string; title: string; description: string }[] = [
    { icon: 'BadgeCheck', title: 'Information Accuracy', description: 'We prioritise reliable, cross-checked information over volume.' },
    { icon: 'Eye', title: 'Transparency', description: 'Admissions, eligibility, fees, and details are presented openly.' },
    { icon: 'Globe2', title: 'Accessibility', description: 'Educational information is made easy to find and understand.' },
    { icon: 'Heart', title: 'Student-Centric Approach', description: 'Every decision keeps student success at its centre.' },
    { icon: 'TrendingUp', title: 'Continuous Improvement', description: 'We keep refining the experience as education evolves.' },
];
