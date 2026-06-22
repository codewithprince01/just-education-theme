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

// Ecosystem nodes — Section 11. Orbit positions are tuned for the diagram layout.
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
