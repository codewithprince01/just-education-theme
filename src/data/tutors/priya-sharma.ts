import type { Tutor } from './types';

export const priyaSharmaTutor: Tutor = {
  id: 101,
  slug: 'priya-sharma',
  type: 'PRIVATE_TUTOR',
  typeLabel: 'Private Tutor',
  name: 'Dr. Priya Sharma',
  tagline: 'Making Physics & Mathematics intuitive for every student',
  photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
  banner: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1400&h=500&fit=crop',
  isVerified: true,
  rating: 4.9,
  reviewCount: 482,
  experienceYears: 12,
  location: 'Koramangala, Bengaluru',
  subjectsTaught: ['Physics', 'Mathematics', 'JEE', 'NEET'],
  teachingModes: ['Online', 'Offline', 'Hybrid'],
  languages: ['English', 'Hindi', 'Kannada'],
  hourlyFee: 800,
  currency: '₹',
  responseTime: 'Under 1 hour',
  availabilityStatus: 'available',
  badges: ['Top Rated', 'IIT Alumna', 'PhD in Physics', 'Background Verified'],

  stats: [
    { id: 's1', label: 'Years Experience', value: 12, suffix: '+', icon: 'Briefcase' },
    { id: 's2', label: 'Students Taught', value: 1850, suffix: '+', icon: 'Users' },
    { id: 's3', label: 'Sessions Conducted', value: 9400, suffix: '+', icon: 'Video' },
    { id: 's4', label: 'Success Rate', value: 96, suffix: '%', icon: 'TrendingUp' },
    { id: 's5', label: 'Average Rating', value: 0, decimal: 4.9, icon: 'Star' },
  ],

  about: {
    intro:
      'I am Dr. Priya Sharma, a passionate educator with over a decade of experience helping students fall in love with Physics and Mathematics. I believe every student can excel when concepts are taught with clarity, patience, and real-world context. My sessions focus on building strong fundamentals rather than rote memorisation.',
    qualifications: [
      { id: 'q1', degree: 'Ph.D. in Theoretical Physics', institution: 'IISc Bengaluru', year: '2014' },
      { id: 'q2', degree: 'M.Sc. Physics', institution: 'IIT Delhi', year: '2010' },
      { id: 'q3', degree: 'B.Sc. (Hons) Physics', institution: 'St. Stephen\'s College, Delhi', year: '2008' },
      { id: 'q4', degree: 'Certified Online Educator', institution: 'Cambridge CELT-S', year: '2019' },
    ],
    philosophy:
      'Learning should feel like discovery, not a chore. I use the "concept-first" approach — every formula is derived from intuition, every problem connected to a real phenomenon. Mistakes are treated as stepping stones, and progress is celebrated at every milestone.',
    whyChoose: [
      'Personalised learning plan tailored to each student\'s pace and goals',
      'Proven track record with 96% of students improving by 2+ grades',
      'Recorded sessions and detailed notes after every class',
      'Weekly assessments with actionable feedback for parents',
      'Flexible scheduling across Online, Home and Hybrid modes',
    ],
    experienceText:
      'Over 12 years I have mentored students from CBSE, ICSE and IB boards, along with hundreds of JEE and NEET aspirants. Many of my students have secured top ranks and admissions into IITs, NITs and premier medical colleges.',
    image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=700&h=600&fit=crop',
  },

  verifications: [
    { id: 'v1', label: 'Identity Verified', description: 'Government ID checked', verified: true, icon: 'UserCheck' },
    { id: 'v2', label: 'Qualification Verified', description: 'Degrees authenticated', verified: true, icon: 'GraduationCap' },
    { id: 'v3', label: 'Background Checked', description: 'Police clearance on file', verified: true, icon: 'ShieldCheck' },
    { id: 'v4', label: 'Teaching Certificate', description: 'CELT-S certified', verified: true, icon: 'Award' },
    { id: 'v5', label: 'Experience Verified', description: '12+ yrs confirmed', verified: true, icon: 'BadgeCheck' },
  ],

  subjects: [
    { id: 'sub1', name: 'Physics', icon: 'Atom', levels: ['Class 9-12', 'JEE', 'NEET'], experience: '12 yrs', students: 1200, gradient: 'from-blue-500 to-indigo-500' },
    { id: 'sub2', name: 'Mathematics', icon: 'Sigma', levels: ['Class 9-12', 'JEE'], experience: '12 yrs', students: 980, gradient: 'from-purple-500 to-pink-500' },
    { id: 'sub3', name: 'Chemistry', icon: 'FlaskConical', levels: ['Class 11-12', 'NEET'], experience: '8 yrs', students: 540, gradient: 'from-green-500 to-teal-500' },
    { id: 'sub4', name: 'JEE Preparation', icon: 'Rocket', levels: ['Main', 'Advanced'], experience: '10 yrs', students: 760, gradient: 'from-orange-500 to-amber-500' },
    { id: 'sub5', name: 'NEET Physics', icon: 'Stethoscope', levels: ['Class 11-12'], experience: '9 yrs', students: 430, gradient: 'from-rose-500 to-red-500' },
    { id: 'sub6', name: 'Olympiad Prep', icon: 'Trophy', levels: ['NSEP', 'INPhO'], experience: '7 yrs', students: 210, gradient: 'from-cyan-500 to-blue-500' },
  ],

  methodologies: [
    { id: 'm1', title: 'One-to-One Learning', description: 'Undivided attention with a plan built around you.', icon: 'User' },
    { id: 'm2', title: 'Personalized Plans', description: 'Custom roadmap based on goals & diagnostics.', icon: 'Map' },
    { id: 'm3', title: 'Homework Support', description: 'Doubt clearing on assignments anytime.', icon: 'BookOpen' },
    { id: 'm4', title: 'Weekly Assessments', description: 'Regular tests to track real progress.', icon: 'ClipboardCheck' },
    { id: 'm5', title: 'Doubt Solving', description: 'Dedicated doubt sessions, no question too small.', icon: 'MessageCircleQuestion' },
    { id: 'm6', title: 'Progress Tracking', description: 'Transparent dashboards for students & parents.', icon: 'LineChart' },
    { id: 'm7', title: 'Recorded Sessions', description: 'Revisit every class whenever you need.', icon: 'Video' },
    { id: 'm8', title: 'Practice Assignments', description: 'Curated problem sets after each concept.', icon: 'PencilRuler' },
  ],

  availability: [
    { day: 'Monday', short: 'Mon', slots: [{ time: '4:00 PM', available: true }, { time: '5:30 PM', available: true }, { time: '7:00 PM', available: false }] },
    { day: 'Tuesday', short: 'Tue', slots: [{ time: '4:00 PM', available: false }, { time: '5:30 PM', available: true }, { time: '7:00 PM', available: true }] },
    { day: 'Wednesday', short: 'Wed', slots: [{ time: '4:00 PM', available: true }, { time: '5:30 PM', available: false }, { time: '7:00 PM', available: true }] },
    { day: 'Thursday', short: 'Thu', slots: [{ time: '4:00 PM', available: true }, { time: '5:30 PM', available: true }, { time: '7:00 PM', available: true }] },
    { day: 'Friday', short: 'Fri', slots: [{ time: '4:00 PM', available: false }, { time: '5:30 PM', available: true }, { time: '7:00 PM', available: false }] },
    { day: 'Saturday', short: 'Sat', slots: [{ time: '10:00 AM', available: true }, { time: '12:00 PM', available: true }, { time: '4:00 PM', available: true }] },
    { day: 'Sunday', short: 'Sun', slots: [{ time: '10:00 AM', available: true }, { time: '12:00 PM', available: false }, { time: '4:00 PM', available: false }] },
  ],

  sessionDurations: [
    { id: 'd1', label: 'Quick Doubt', minutes: 30, price: 450 },
    { id: 'd2', label: 'Standard Session', minutes: 60, price: 800, popular: true },
    { id: 'd3', label: 'Deep Dive', minutes: 90, price: 1100 },
  ],
  trialAvailable: true,

  aiMatch: {
    percentage: 95,
    learningStyleMatch: 'Visual + Problem-solving',
    recommendedFor: 'Ideal for Class 11 & 12 Physics and JEE aspirants',
    reasons: [
      'Matches your preference for concept-first teaching',
      'Strong fit for exam-focused, structured learners',
      'High availability in your preferred evening slots',
    ],
  },

  progress: {
    attendance: 94,
    assignmentCompletion: 88,
    weeklyProgress: [
      { week: 'W1', score: 52 },
      { week: 'W2', score: 60 },
      { week: 'W3', score: 58 },
      { week: 'W4', score: 71 },
      { week: 'W5', score: 79 },
      { week: 'W6', score: 86 },
      { week: 'W7', score: 91 },
    ],
    skills: [
      { name: 'Mechanics', level: 92 },
      { name: 'Electromagnetism', level: 78 },
      { name: 'Optics', level: 85 },
      { name: 'Modern Physics', level: 70 },
      { name: 'Calculus', level: 88 },
    ],
    metrics: [
      { id: 'pm1', label: 'Avg. Test Score', value: '86%', trend: 'up', delta: '+12%' },
      { id: 'pm2', label: 'Concepts Mastered', value: '48/56', trend: 'up', delta: '+6' },
      { id: 'pm3', label: 'Doubts Resolved', value: '214', trend: 'up', delta: '+18' },
      { id: 'pm4', label: 'Rank Percentile', value: '94th', trend: 'up', delta: '+8' },
    ],
  },

  parentDashboard: {
    upcomingClasses: [
      { id: 'uc1', subject: 'Physics — Rotational Motion', date: 'Mon, 24 Jun', time: '5:30 PM' },
      { id: 'uc2', subject: 'Maths — Integration', date: 'Wed, 26 Jun', time: '5:30 PM' },
      { id: 'uc3', subject: 'Physics — Doubt Session', date: 'Sat, 29 Jun', time: '10:00 AM' },
    ],
    attendanceSummary: { present: 47, total: 50 },
    teacherFeedback: [
      { id: 'tf1', text: 'Aarav has shown excellent improvement in problem-solving speed this month.', date: '18 Jun' },
      { id: 'tf2', text: 'Needs a little more practice on Modern Physics numericals.', date: '11 Jun' },
    ],
    homework: [
      { id: 'hw1', title: 'Rotational Motion — Problem Set 4', status: 'done', due: '20 Jun' },
      { id: 'hw2', title: 'Integration Worksheet', status: 'pending', due: '25 Jun' },
      { id: 'hw3', title: 'Optics Revision Notes', status: 'overdue', due: '17 Jun' },
    ],
    monthlyReport: [
      { label: 'Classes Attended', value: '18 / 20' },
      { label: 'Avg. Score', value: '86%' },
      { label: 'Improvement', value: '+12%' },
      { label: 'Rank Movement', value: '↑ 6 spots' },
    ],
  },

  successStories: [
    { id: 'ss1', name: 'Aarav Mehta', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop', classOrExam: 'JEE Advanced 2023', achievement: 'AIR 842', testimonial: 'Priya ma\'am made Physics my strongest subject. Her derivations stuck with me in the exam hall.', highlight: 'JEE Qualified' },
    { id: 'ss2', name: 'Sneha Rao', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop', classOrExam: 'CBSE Class 12', achievement: '98% in Physics', testimonial: 'I went from 62% to 98% in one year. The weekly tests kept me accountable.', highlight: '98% Boards' },
    { id: 'ss3', name: 'Karthik Nair', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', classOrExam: 'NEET 2022', achievement: '352/360 in Physics', testimonial: 'Concept clarity is unmatched. NEET Physics felt easy after her sessions.', highlight: 'NEET Topper' },
    { id: 'ss4', name: 'Ishita Gupta', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop', classOrExam: 'Physics Olympiad', achievement: 'INPhO Medalist', testimonial: 'Her Olympiad mentoring opened a whole new way of thinking for me.', highlight: 'Olympiad Winner' },
  ],

  trendingSubjects: [
    { id: 't1', label: 'Math Tutor', slug: 'math-tutor' },
    { id: 't2', label: 'Physics Tutor', slug: 'physics-tutor' },
    { id: 't3', label: 'JEE Coaching', slug: 'jee-coaching' },
    { id: 't4', label: 'English Speaking', slug: 'english-speaking' },
    { id: 't5', label: 'Online Coding Classes', slug: 'online-coding' },
    { id: 't6', label: 'NEET Biology', slug: 'neet-biology' },
    { id: 't7', label: 'Home Tuition', slug: 'home-tuition' },
    { id: 't8', label: 'SAT Preparation', slug: 'sat-prep' },
    { id: 't9', label: 'Olympiad Prep', slug: 'olympiad-prep' },
    { id: 't10', label: 'Chemistry Tutor', slug: 'chemistry-tutor' },
  ],

  resources: [
    { id: 'r1', title: 'Mechanics Master Notes', type: 'Notes', format: 'PDF · 42 pages', downloads: 12400, icon: 'FileText' },
    { id: 'r2', title: 'JEE Formula Sheet', type: 'Formula Sheet', format: 'PDF · 8 pages', downloads: 28900, icon: 'Sigma' },
    { id: 'r3', title: 'Rotational Motion Worksheet', type: 'Worksheet', format: 'PDF · 6 pages', downloads: 7600, icon: 'PencilRuler' },
    { id: 'r4', title: 'NEET Physics Practice Paper', type: 'Practice Paper', format: 'PDF · 24 Qs', downloads: 15200, icon: 'ClipboardList' },
    { id: 'r5', title: 'Optics Crash Lecture', type: 'Recorded Lecture', format: 'Video · 48 min', downloads: 9300, icon: 'Video' },
    { id: 'r6', title: 'Modern Physics Quick Revision', type: 'Notes', format: 'PDF · 18 pages', downloads: 6100, icon: 'FileText' },
  ],

  reviews: [
    { id: 'rv1', name: 'Meera Krishnan', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', role: 'Parent', subject: 'Physics — Class 12', rating: 5, text: 'My daughter\'s confidence transformed completely. Dr. Sharma is patient, structured and genuinely cares about results. The weekly parent updates are a wonderful touch.', date: '2024-11-02', isVerified: true },
    { id: 'rv2', name: 'Rohan Verma', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', role: 'Student', subject: 'JEE Physics', rating: 5, text: 'Best Physics teacher I\'ve had. Every concept is derived from scratch so nothing feels like magic. The recorded sessions helped me revise before mocks.', date: '2024-10-19', isVerified: true },
    { id: 'rv3', name: 'Anjali Desai', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', role: 'Parent', subject: 'Mathematics — Class 10', rating: 4, text: 'Very professional and punctual. My son went from struggling to enjoying maths. Would have loved a slightly lower fee but the quality is worth it.', date: '2024-09-28', isVerified: true },
    { id: 'rv4', name: 'Siddharth Iyer', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', role: 'Student', subject: 'NEET Physics', rating: 5, text: 'Doubt solving sessions are gold. She never makes you feel silly for asking. My NEET Physics score jumped massively.', date: '2024-09-10', isVerified: true },
  ],

  ratingDistribution: { 5: 410, 4: 52, 3: 14, 2: 4, 1: 2 },

  videoTestimonials: [
    { id: 'vt1', name: 'Aarav Mehta', thumbnail: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=400&h=250&fit=crop', classOrExam: 'JEE Advanced — AIR 842' },
    { id: 'vt2', name: 'Sneha Rao', thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop', classOrExam: 'CBSE — 98% Physics' },
    { id: 'vt3', name: 'Karthik Nair', thumbnail: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&h=250&fit=crop', classOrExam: 'NEET — 352/360' },
  ],

  facilities: [
    { id: 'f1', name: 'Online Classes', icon: 'Monitor' },
    { id: 'f2', name: 'Recorded Sessions', icon: 'Video' },
    { id: 'f3', name: 'Whiteboard Teaching', icon: 'Presentation' },
    { id: 'f4', name: 'Homework Support', icon: 'BookOpen' },
    { id: 'f5', name: 'Mobile App Access', icon: 'Smartphone' },
    { id: 'f6', name: 'Study Materials', icon: 'Library' },
  ],

  faqs: [
    { id: 'faq1', question: 'Do you offer a free trial class?', answer: 'Yes! I offer a complimentary 30-minute trial class so you can experience my teaching style and we can assess the student\'s current level before committing to a plan.' },
    { id: 'faq2', question: 'What teaching modes are available?', answer: 'I teach Online (live video), Offline (home tuition in Bengaluru) and Hybrid. You can switch modes anytime based on your convenience.' },
    { id: 'faq3', question: 'How are sessions scheduled?', answer: 'Sessions are booked through the weekly calendar. You pick slots that work for you, and you\'ll receive reminders before each class. Rescheduling is free with 12 hours notice.' },
    { id: 'faq4', question: 'Will I get recordings and notes?', answer: 'Absolutely. Every session is recorded and shared within an hour, along with concise notes and the practice assignment for that topic.' },
    { id: 'faq5', question: 'How do you track progress?', answer: 'Students and parents get access to a progress dashboard showing attendance, test scores, skill growth and weekly feedback.' },
    { id: 'faq6', question: 'What is your cancellation policy?', answer: 'You can cancel or reschedule up to 12 hours before a session at no cost. Cancellations within 12 hours are charged 50% of the session fee.' },
    { id: 'faq7', question: 'Do you prepare students for competitive exams?', answer: 'Yes, I specialise in JEE (Main & Advanced), NEET Physics and Physics Olympiads, in addition to CBSE/ICSE/IB board preparation.' },
    { id: 'faq8', question: 'How many students do you take at a time?', answer: 'To maintain quality, I keep a limited roster. Most teaching is one-to-one; small group batches (max 4) are available on request.' },
    { id: 'faq9', question: 'What if my child needs extra help before exams?', answer: 'I offer dedicated crash revision and extra doubt sessions in the run-up to exams. These can be added to any plan.' },
    { id: 'faq10', question: 'How do payments work?', answer: 'Payments are made securely per session or via monthly packages. Packages offer better value and priority slot booking.' },
  ],

  similarTutors: [
    { id: 'st1', slug: 'rahul-menon', name: 'Rahul Menon', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop', headline: 'Mathematics & JEE Specialist', subjects: ['Maths', 'JEE'], rating: 4.8, reviewCount: 312, hourlyFee: 700, mode: 'Online' },
    { id: 'st2', slug: 'ananya-iyer', name: 'Ananya Iyer', photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop', headline: 'Chemistry & NEET Mentor', subjects: ['Chemistry', 'NEET'], rating: 4.9, reviewCount: 401, hourlyFee: 850, mode: 'Hybrid' },
    { id: 'st3', slug: 'vikram-singh', name: 'Vikram Singh', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop', headline: 'Physics & Olympiad Coach', subjects: ['Physics', 'Olympiad'], rating: 4.7, reviewCount: 258, hourlyFee: 900, mode: 'Online' },
    { id: 'st4', slug: 'fatima-khan', name: 'Fatima Khan', photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop', headline: 'Maths & SAT Expert', subjects: ['Maths', 'SAT'], rating: 4.8, reviewCount: 189, hourlyFee: 750, mode: 'Offline' },
  ],
};
