import type { Course, ExamRef, Location, Scholarship } from './types';

export const locations: Location[] = [
    // Cities
    { slug: 'new-delhi', name: 'New Delhi', type: 'city', state: 'Delhi', country: 'India' },
    { slug: 'noida', name: 'Noida', type: 'city', state: 'Uttar Pradesh', country: 'India' },
    { slug: 'gurgaon', name: 'Gurgaon', type: 'city', state: 'Haryana', country: 'India' },
    { slug: 'jaipur', name: 'Jaipur', type: 'city', state: 'Rajasthan', country: 'India' },
    { slug: 'lucknow', name: 'Lucknow', type: 'city', state: 'Uttar Pradesh', country: 'India' },
    { slug: 'chandigarh', name: 'Chandigarh', type: 'city', state: 'Punjab', country: 'India' },
    { slug: 'mumbai', name: 'Mumbai', type: 'city', state: 'Maharashtra', country: 'India' },
    { slug: 'bengaluru', name: 'Bengaluru', type: 'city', state: 'Karnataka', country: 'India' },
    { slug: 'kota', name: 'Kota', type: 'city', state: 'Rajasthan', country: 'India' },
    { slug: 'pune', name: 'Pune', type: 'city', state: 'Maharashtra', country: 'India' },
    { slug: 'hyderabad', name: 'Hyderabad', type: 'city', state: 'Telangana', country: 'India' },
    { slug: 'toronto', name: 'Toronto', type: 'city', country: 'Canada' },
    { slug: 'london', name: 'London', type: 'city', country: 'United Kingdom' },
    // States
    { slug: 'delhi', name: 'Delhi', type: 'state', country: 'India' },
    { slug: 'uttar-pradesh', name: 'Uttar Pradesh', type: 'state', country: 'India' },
    { slug: 'haryana', name: 'Haryana', type: 'state', country: 'India' },
    { slug: 'punjab', name: 'Punjab', type: 'state', country: 'India' },
    { slug: 'rajasthan', name: 'Rajasthan', type: 'state', country: 'India' },
    { slug: 'maharashtra', name: 'Maharashtra', type: 'state', country: 'India' },
    { slug: 'karnataka', name: 'Karnataka', type: 'state', country: 'India' },
    // Countries
    { slug: 'india', name: 'India', type: 'country' },
    { slug: 'usa', name: 'United States', type: 'country' },
    { slug: 'united-kingdom', name: 'United Kingdom', type: 'country' },
    { slug: 'canada', name: 'Canada', type: 'country' },
    { slug: 'australia', name: 'Australia', type: 'country' },
    { slug: 'malaysia', name: 'Malaysia', type: 'country' },
];

export const courses: Course[] = [
    { slug: 'btech-cse', name: 'B.Tech Computer Science', degree: 'B.Tech', level: 'undergraduate' },
    { slug: 'mbbs', name: 'MBBS', degree: 'MBBS', level: 'undergraduate' },
    { slug: 'mba', name: 'Master of Business Administration', degree: 'MBA', level: 'postgraduate' },
    { slug: 'ba-economics', name: 'B.A. Economics', degree: 'B.A.', level: 'undergraduate' },
    { slug: 'ms-data-science', name: 'M.S. Data Science', degree: 'M.S.', level: 'postgraduate' },
    { slug: 'llb', name: 'Bachelor of Laws', degree: 'LL.B.', level: 'undergraduate' },
    { slug: 'bdes', name: 'Bachelor of Design', degree: 'B.Des', level: 'undergraduate' },
];

export const exams: ExamRef[] = [
    { slug: 'jee-main', name: 'JEE Main', type: 'Engineering' },
    { slug: 'jee-advanced', name: 'JEE Advanced', type: 'Engineering' },
    { slug: 'neet', name: 'NEET UG', type: 'Medical' },
    { slug: 'cat', name: 'CAT', type: 'Management' },
    { slug: 'cuet', name: 'CUET UG', type: 'University' },
    { slug: 'upsc-cse', name: 'UPSC Civil Services', type: 'Government' },
    { slug: 'gate', name: 'GATE', type: 'Engineering' },
    { slug: 'ielts', name: 'IELTS', type: 'Language' },
    { slug: 'gre', name: 'GRE', type: 'Study Abroad' },
];

export const scholarships: Scholarship[] = [
    { slug: 'inspire-scholarship', name: 'INSPIRE Scholarship', type: 'Merit' },
    { slug: 'national-means-cum-merit', name: 'National Means-cum-Merit Scholarship', type: 'Need-based' },
    { slug: 'commonwealth-scholarship', name: 'Commonwealth Scholarship', type: 'International' },
    { slug: 'fulbright-nehru', name: 'Fulbright-Nehru Fellowship', type: 'International' },
    { slug: 'pm-yasasvi', name: 'PM YASASVI Scholarship', type: 'Government' },
    { slug: 'chevening-scholarship', name: 'Chevening Scholarship', type: 'International' },
];
