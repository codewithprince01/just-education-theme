// National Testing Agency conducts most of these entrance exams; reused as the card logo
const NTA_LOGO = 'https://upload.wikimedia.org/wikipedia/commons/8/89/NTA_logo.png';

// Exam categories shown as pill filters on the Exams page
export const examCategories = [
    { id: 'engineering', name: 'Engineering' },
    { id: 'medical', name: 'Medical' },
    { id: 'management', name: 'Management' },
    { id: 'science', name: 'Science' },
    { id: 'law', name: 'Law' },
    { id: 'pharmacy', name: 'Pharmacy' },
    { id: 'computer-applications', name: 'Computer Applications' },
    { id: 'arts', name: 'Arts' },
    { id: 'education', name: 'Education' },
    { id: 'design', name: 'Design' },
    { id: 'architecture', name: 'Architecture' },
    { id: 'commerce', name: 'Commerce' },
    { id: 'paramedical', name: 'Paramedical' },
    { id: 'dental', name: 'Dental' },
    { id: 'class-12', name: 'Class 12 Exams' },
    { id: 'agriculture', name: 'Agriculture' },
    { id: 'class-10', name: 'Class 10 Exams' },
    { id: 'hotel-management', name: 'Hotel Management' },
    { id: 'veterinary', name: 'Veterinary Sciences' },
    { id: 'vocational', name: 'Vocational Courses' },
    { id: 'study-abroad', name: 'Study Abroad Exams' },
    { id: 'mass-communications', name: 'Mass Communications' },
    { id: 'aviation', name: 'Aviation' },
    { id: 'animation', name: 'Animation' },
];

// Quick-access entrance exam tags shown right below the hero search bar
export const quickExamLinks = [
    'JEE Main', 'NEET', 'CAT', 'GATE', 'CLAT', 'JEE Advanced', 'COMEDK UGET', 'AP EAPCET', 'WBJEE', 'KCET',
];

export const exams = [
    {
        id: 'jee-main-2026',
        slug: 'jee-main',
        name: 'JEE Main 2026',
        fullName: 'Joint Entrance Exam Main',
        category: 'engineering',
        courseLevel: 'be-btech',
        logo: NTA_LOGO,
        mode: 'Online Exam',
        examType: 'Online Test',
        examDate: '02 Apr 26 - 09 Apr 26',
        applicationForm: '01 Feb 26 - 25 Feb 26',
        resultAnnounce: '20 Apr 26',
        statusBadge: 'Result is declared',
        description: 'JEE Main is the national level undergraduate engineering entrance exam. This exam is acceptable for the admission in various B.Tech/B.E Programs.',
    },
    {
        id: 'cuet-2026',
        slug: 'cuet',
        name: 'CUET 2026',
        fullName: 'Common Universities Entrance Test',
        category: 'engineering',
        courseLevel: 'be-btech',
        logo: NTA_LOGO,
        mode: 'Offline Exam',
        examType: 'Written Test',
        examDate: '11 May 26 - 31 May 26',
        applicationForm: '03 Jan 26 - 04 Feb 26',
        resultAnnounce: '30 Jul 26',
        statusBadge: 'Result is coming up',
        description: 'CUET is a national level examination, for admission into various UG level courses',
    },
    {
        id: 'jee-advanced-2026',
        slug: 'jee-advanced',
        name: 'JEE Advanced 2026',
        fullName: 'Joint Entrance Examination Advanced',
        category: 'engineering',
        courseLevel: 'be-btech',
        logo: NTA_LOGO,
        mode: 'Online Exam',
        examType: 'Online Test',
        examDate: '17 May 26',
        applicationForm: '23 Apr 26 - 02 May 26',
        resultAnnounce: '01 Jun 26',
        statusBadge: 'Result is declared',
        description: "JEE Advanced is applicable for admission in Bachelor's, Integrated Master's and Dual Degree programs in IITs.",
    },
    {
        id: 'ts-eamcet-2026',
        slug: 'ts-eamcet',
        name: 'TS EAMCET 2026',
        fullName: 'Telangana State Eligibility cum Entrance Test',
        category: 'engineering',
        courseLevel: 'be-btech',
        logo: NTA_LOGO,
        mode: 'Online Exam',
        examType: 'Online Test',
        examDate: '04 May 26 - 05 May 26',
        applicationForm: '19 Feb 26 - 04 Apr 26',
        resultAnnounce: '15 May 26',
        statusBadge: 'Result is coming up',
        description: 'TS EAMCET is the Telangana state level entrance exam for admission to engineering, agriculture and pharmacy courses.',
    },
    {
        id: 'gate-2026',
        slug: 'gate',
        name: 'GATE 2026',
        fullName: 'Graduate Aptitude Test in Engineering',
        category: 'engineering',
        courseLevel: 'me-mtech',
        logo: NTA_LOGO,
        mode: 'Online Exam',
        examType: 'Online Test',
        examDate: '15 Feb 26',
        applicationForm: '28 Aug 25 - 13 Oct 25',
        resultAnnounce: '19 Mar 26',
        statusBadge: 'Result is declared',
        description: 'GATE is the national level entrance exam for admission to ME/M.Tech programs and PSU recruitment.',
    },
    {
        id: 'bitsat-2026',
        slug: 'bitsat',
        name: 'BITSAT 2026',
        fullName: 'Birla Institute of Technology and Science Admission Test',
        category: 'engineering',
        courseLevel: 'be-btech',
        logo: NTA_LOGO,
        mode: 'Online Exam',
        examType: 'Online Test',
        examDate: '15 Apr 26 - 17 Apr 26',
        applicationForm: '15 Dec 25 - 16 Mar 26',
        resultAnnounce: '16 Jun 25',
        statusBadge: 'Result is declared',
        description: 'BITSAT is the entrance exam conducted by BITS Pilani for admission to its integrated first degree programs.',
    },
    {
        id: 'iit-jam-2026',
        slug: 'iit-jam',
        name: 'IIT JAM 2026',
        fullName: 'Indian Institute of Technology Joint Admission Test',
        category: 'engineering',
        courseLevel: 'me-mtech',
        logo: NTA_LOGO,
        mode: 'Online Exam',
        examType: 'Online Test',
        examDate: '15 Feb 26',
        applicationForm: '05 Sept 25 - 20 Oct 25',
        resultAnnounce: '20 Mar 26',
        statusBadge: 'Result is coming up',
        description: 'IIT JAM is the entrance exam for admission to M.Sc and other post-bachelor programs at the IITs and IISc.',
    },
    {
        id: 'keam-2026',
        slug: 'keam',
        name: 'KEAM 2026',
        fullName: 'Kerala Engineering Agricultural Medical Entrance Exam',
        category: 'engineering',
        courseLevel: 'be-btech',
        logo: NTA_LOGO,
        mode: 'Online Exam',
        examType: 'Online Test',
        examDate: '17 Apr 26',
        applicationForm: '05 Jan 26 - 31 Jan 26',
        resultAnnounce: '01 Jul 26',
        statusBadge: 'Result is coming up',
        description: 'KEAM is the Kerala state level entrance exam for admission to engineering and pharmacy courses.',
    },
];

// Sub-category pills shown at the top of an /exams/:category listing page, keyed by category id.
export const examSubCategories: Record<string, { id: string; label: string; count: number }[]> = {
    engineering: [
        { id: 'be-btech', label: 'BE/B.Tech', count: 111 },
        { id: 'me-mtech', label: 'ME/M.Tech', count: 55 },
        { id: 'diploma', label: 'Diploma in Engineering', count: 17 },
        { id: 'phd', label: 'PhD in Engineering', count: 4 },
        { id: 'certificate', label: 'Certificate Courses', count: 2 },
    ],
};

// Sidebar filter facets on the /exams/:category listing page.
export const examFilterGroups = [
    {
        title: 'Examination Type',
        options: [
            { id: 'national-wise', label: 'National Wise' },
            { id: 'state-wise', label: 'State Wise' },
        ],
    },
    {
        title: 'Application & Exam Status',
        options: [
            { id: 'upcoming-application', label: 'Upcoming Application Form Date' },
            { id: 'upcoming-exams', label: 'Upcoming Exams' },
            { id: 'application-in-process', label: 'Application Form in Process' },
        ],
    },
    {
        title: 'Application Mode',
        options: [
            { id: 'online', label: 'Online' },
            { id: 'offline', label: 'Offline' },
            { id: 'online-offline', label: 'Online & Offline Both' },
        ],
    },
    {
        title: 'Examination Mode',
        options: [
            { id: 'online', label: 'Online' },
            { id: 'offline', label: 'Offline' },
            { id: 'online-offline', label: 'Online & Offline Both' },
        ],
    },
    {
        title: 'Others',
        options: [
            { id: 'practice-paper', label: 'With Practice Paper' },
            { id: 'expert-tips', label: 'With Expert Tips' },
        ],
    },
];

export const examNews = [
    { id: 1, title: 'AP EAPCET Results 2026 Live Updates', date: 'June 18, 2026', image: 'https://picsum.photos/seed/ap-eapcet-2026/120/120' },
    { id: 2, title: 'ICAI CA Final Result May 2026 Declared', date: 'June 18, 2026', image: 'https://picsum.photos/seed/icai-ca-final-2026/120/120' },
    { id: 3, title: 'MHT CET 2026 PCB Second Attempt Result Declared', date: 'June 18, 2026', image: 'https://picsum.photos/seed/mht-cet-2026/120/120' },
    { id: 4, title: 'NEST 2026 Final Answer Key Released, Check Direct Link to Download', date: 'June 18, 2026', image: 'https://picsum.photos/seed/nest-2026/120/120' },
    { id: 5, title: 'MET 2026 Round 2 Counselling Registration and Choice Filling Begins', date: 'June 18, 2026', image: 'https://picsum.photos/seed/met-2026/120/120' },
];

export const examSyllabusLinks = [
    {
        id: 'cat',
        name: 'CAT',
        mode: 'Online Exam',
        links: ['QA Paper Analysis', 'DILR Paper Analysis', 'VARC Paper Analysis', 'Exam Pattern'],
    },
    {
        id: 'gate',
        name: 'GATE',
        mode: 'Online Exam',
        links: ['Exam Pattern', 'Paper Analysis', 'Virtual Calculator', 'CS Syllabus'],
    },
];

export const conceptSubjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology'];

export const conceptArticles: Record<string, { id: number; title: string; image: string }[]> = {
    'class-10': [
        { id: 1, title: 'NCERT Class 10 Maths Book PDF Download', image: 'https://picsum.photos/seed/ncert-class10-maths/200/160' },
        { id: 2, title: 'Important MCQs on Coordinate Geometry with Explanation', image: 'https://picsum.photos/seed/coordinate-geometry-mcq/200/160' },
        { id: 3, title: 'Number System MCQs with Answers', image: 'https://picsum.photos/seed/number-system-mcq/200/160' },
        { id: 4, title: 'Statistics: Mean, Median, Variance and Cumulative Frequency Curve', image: 'https://picsum.photos/seed/statistics-class10/200/160' },
    ],
    'class-12': [
        { id: 5, title: 'An Introduction to T-Test: Formula and Solved Examples', image: 'https://picsum.photos/seed/t-test-formula/200/160' },
        { id: 6, title: '30000 in Words', image: 'https://picsum.photos/seed/30000-in-words/200/160' },
        { id: 7, title: 'Complex Numbers and Quadratic Equations MCQs', image: 'https://picsum.photos/seed/complex-numbers-mcq/200/160' },
        { id: 8, title: '150000 in Words: Write 150000 in Words, 150000 Spelling', image: 'https://picsum.photos/seed/150000-in-words/200/160' },
    ],
};

export const previousYearPapers = [
    { id: 1, title: 'JEE Mains 2026 April 5 Shift 2 Mathematics Question Paper with Solutions', logo: NTA_LOGO },
    { id: 2, title: 'JEE Mains 2026 April 5 Shift 2 Chemistry Question Paper with Solutions', logo: NTA_LOGO },
    { id: 3, title: 'JEE Mains 2026 April 5 Shift 2 Physics Question Paper with Solutions', logo: NTA_LOGO },
    { id: 4, title: 'JEE Mains 2026 April 5 Shift 1 Mathematics Question Paper with Solutions', logo: NTA_LOGO },
];

export const examFAQs = [
    {
        question: 'My CUET total score is 280 out of 750, so which colleges should I go to?',
        answer: 'With a score of 280/750, you can consider state universities and mid-tier private universities. Check the previous year cutoffs of your preferred courses on each university\'s CUET counselling portal, as cutoffs vary widely by course and category.',
        authorName: 'Muskan Agrahari',
        authorDate: '27 Jun 25',
    },
    {
        question: 'What is the expected rank (AIR) for Sastra University Thanjavur for Biotechnology?',
        answer: 'For Biotechnology at SASTRA University, an AIR within the top 50,000-70,000 in JEE Main or a strong Class 12 percentile is generally sufficient, though the exact rank varies each year based on the number of applicants.',
        authorName: 'Muskan Agrahari',
        authorDate: '27 Jun 25',
    },
    {
        question: 'How can I apply for BITSAT?',
        answer: 'You can apply for BITSAT online through the official BITS Pilani admissions portal by filling out the application form, uploading the required documents, and paying the application fee before the deadline.',
        authorName: 'Muskan Agrahari',
        authorDate: '27 Jun 25',
    },
    {
        question: 'Which subject is considered for determining the CUET cutoff for admission to HNBGU?',
        answer: 'HNBGU determines its CUET cutoff based on the domain-specific subject relevant to the chosen course, along with the General Test score where applicable. Always check the university\'s official admission brochure for course-wise weightage.',
        authorName: 'Muskan Agrahari',
        authorDate: '27 Jun 25',
    },
    {
        question: 'VIPS give preference through Cuet 2025 rank',
        answer: 'Yes, Vivekananda Institute of Professional Studies (VIPS) considers CUET scores/ranks for admission to several of its undergraduate programs, along with a personal interview/group discussion round for certain courses.',
        authorName: 'Vinima Bhola',
        authorDate: '03 Jul 25',
    },
];
