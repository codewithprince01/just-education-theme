import type { Author } from './types';

const AVATAR = (seed: string) =>
    `https://images.unsplash.com/${seed}?w=200&h=200&fit=crop&crop=faces`;

export const authors: Author[] = [
    {
        slug: 'ananya-sharma',
        name: 'Ananya Sharma',
        role: 'Senior Education Editor',
        bio: 'Ananya has spent over a decade reporting on Indian higher education, admissions policy and entrance exams. She leads editorial standards for Just Education Insights.',
        avatar: AVATAR('photo-1494790108377-be9c29b29330'),
        expertise: ['Admissions', 'Entrance Exams', 'Universities'],
        location: 'New Delhi, India',
        social: { twitter: '@ananyawrites', linkedin: 'ananya-sharma' },
    },
    {
        slug: 'rohan-mehta',
        name: 'Rohan Mehta',
        role: 'Study Abroad Specialist',
        bio: 'A former international student counsellor, Rohan demystifies overseas applications, visas and scholarships for thousands of students every year.',
        avatar: AVATAR('photo-1500648767791-00dcc994a43e'),
        expertise: ['Study Abroad', 'Visa Guidance', 'Scholarships'],
        location: 'Mumbai, India',
        social: { twitter: '@rohanabroad', linkedin: 'rohan-mehta' },
    },
    {
        slug: 'priya-nair',
        name: 'Dr. Priya Nair',
        role: 'Career Guidance Counsellor',
        bio: 'With a doctorate in educational psychology, Priya helps students make confident decisions about courses, careers and life after campus.',
        avatar: AVATAR('photo-1438761681033-6461ffad8d80'),
        expertise: ['Career Guidance', 'Student Life', 'Skill Development'],
        location: 'Bengaluru, India',
        social: { linkedin: 'priya-nair-phd', website: 'https://priyanair.example.com' },
    },
    {
        slug: 'arjun-verma',
        name: 'Arjun Verma',
        role: 'Exams & Results Correspondent',
        bio: 'Arjun tracks every notification, result and cut-off across India\'s biggest entrance exams so students never miss a deadline.',
        avatar: AVATAR('photo-1506794778202-cad84cf45f1d'),
        expertise: ['Entrance Exams', 'Educational News', 'Admissions'],
        location: 'Kota, India',
        social: { twitter: '@arjunexams' },
    },
    {
        slug: 'meera-iyer',
        name: 'Meera Iyer',
        role: 'EdTech & Online Learning Writer',
        bio: 'Meera covers the platforms, tools and AI reshaping how India learns, from MOOCs to virtual classrooms.',
        avatar: AVATAR('photo-1534528741775-53994a69daeb'),
        expertise: ['Educational Technology', 'Online Courses', 'Certifications'],
        location: 'Hyderabad, India',
        social: { twitter: '@meeralearns', linkedin: 'meera-iyer' },
    },
    {
        slug: 'kabir-singh',
        name: 'Kabir Singh',
        role: 'Scholarships & Funding Analyst',
        bio: 'Kabir maps the funding landscape, surfacing scholarships and government schemes that students often overlook.',
        avatar: AVATAR('photo-1463453091185-61582044d556'),
        expertise: ['Scholarships', 'Government Schemes', 'International Education'],
        location: 'Chandigarh, India',
        social: { linkedin: 'kabir-singh-funding' },
    },
];
