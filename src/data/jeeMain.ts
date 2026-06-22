const NTA_LOGO = 'https://upload.wikimedia.org/wikipedia/commons/8/89/NTA_logo.png';

export const jeeMainLogo = NTA_LOGO;

const latestUpdatesSection = {
    slug: 'latest-updates',
    title: 'JEE Main Latest Updates',
    content: [
        {
            type: 'updateHeadline',
            date: '13 Jun, 2026',
            text: 'The JoSAA 2026 schedule released at josaa.nic.in. Registration from June 2 to June 11. Check PDF',
        },
        {
            type: 'paragraph',
            text: 'JEE Main 2026 is conducted by the National Testing Agency (NTA) for admission to BTech, BE, BArch and BPlanning courses at NITs, IIITs and other Centrally Funded Technical Institutions (CFTIs). The exam was held in two sessions, with Session 1 in January 2026 and Session 2 in April 2026, and the final result was declared on April 25, 2026. The latest update is that JoSAA 2026 Round 1 seat allotment along with the first JEE Main rank-based closing ranks is being published today, June 13, 2026 at josaa.nic.in.',
        },
        {
            type: 'labelledBullets',
            items: [
                {
                    label: 'JoSAA Round 1 Seat Allotment:',
                    text: 'Round 1 seat allotment with the first JEE Main-based closing ranks for 39 NITs, 26 IIITs and 38 GFTIs is being published today, June 13, 2026. Last year, Round 1 was published on June 14, 2025.'
                },
                {
                    label: 'JoSAA Round 2 Allotment:',
                    text: 'The Round 2 seat allotment list is expected around June 22, 2026. In 2025, Round 2 allotment was published on June 22, 2025, after the document verification window closed.'
                },
                {
                    label: 'CSAB Special Rounds:',
                    text: 'CSAB Special Round registration is expected to open in the third week of July 2026. Last year, CSAB Round 1 began on July 25, 2025 to fill vacant seats at NITs, IIITs and GFTIs.'
                },
                {
                    label: 'JEE Main 2027 Session 1 Notification:',
                    text: 'NTA is expected to release the JEE Main 2027 Session 1 notification in the last week of October 2026, following the trend of 2025 and 2024 release windows.'
                }
            ]
        }
    ]
};

const overviewSection = {
    slug: 'overview',
    title: 'What is JEE Main 2026?',
    content: [
        { type: 'paragraph', text: 'JEE Main 2026 is the national-level engineering entrance exam conducted by the National Testing Agency. The exam is held for admission to undergraduate engineering and architecture programmes at the 31 NITs, 26 IIITs and 38 Government Funded Technical Institutions across India. Qualifying JEE Main is also the first step for candidates who want to appear for JEE Advanced and target the IITs.' },
        { type: 'paragraph', text: 'The exam is conducted twice a year in Computer Based Test (CBT) mode. Paper 1 is for BE and BTech aspirants, while Paper 2A and Paper 2B are for BArch and BPlanning. More than 12 lakh candidates appeared in JEE Main 2026 Session 1 and Session 2 combined, making it one of the most competitive engineering exams in India.' },
        { type: 'paragraph', text: 'The score and rank obtained in JEE Main are used by JoSAA for centralised counselling and seat allotment. Many state and private engineering colleges also accept the JEE Main score for admission to their BTech programmes.' },
        {
            type: 'buttons',
            items: [
                { label: 'Apply Now', style: 'primary' },
                { label: 'Check Eligibility', style: 'accent', icon: 'check' },
                { label: 'Get Updates', style: 'ghost' }
            ]
        }
    ]
};

const highlightsSection = {
    slug: 'highlights',
    title: 'JEE Main 2026 Highlights',
    content: [
        { type: 'paragraph', text: 'You should know the basic details about JEE Main 2026 before applying or preparing for the exam. The table below covers the key information at a glance.' },
        {
            type: 'table',
            headers: ['Particulars', 'Details'],
            rows: [
                ['Exam Name', 'Joint Entrance Examination Main (JEE Main) 2026'],
                ['Conducting Body', 'National Testing Agency (NTA)'],
                ['Exam Level', 'National Level Undergraduate Entrance Exam'],
                ['Exam Frequency', 'Twice a year (Session 1 and Session 2)'],
                ['Mode of Exam', 'Computer Based Test (CBT). Drawing test in BArch is offline'],
                ['Exam Duration', '3 hours (4 hours for PwD candidates)'],
                ['Papers', 'Paper 1 (BE/BTech), Paper 2A (BArch), Paper 2B (BPlanning)'],
                ['Languages', '13 (English, Hindi, Assamese, Bengali, Gujarati, Kannada, Malayalam, Marathi, Odia, Punjabi, Tamil, Telugu, Urdu)'],
                ['Total Marks', '300 marks (Paper 1)'],
                ['Total Questions', '75 questions (Paper 1) - 25 each in Physics, Chemistry, Mathematics'],
                ['Number of Test Cities', '300+ cities in India and 24 abroad'],
                ['Application Fee', 'Rs. 1000 (Gen male), Rs. 800 (Gen female/SC/ST/PwD)'],
                ['Official Website', 'jeemain.nta.nic.in']
            ]
        }
    ]
};

const importantDatesSection = {
    slug: 'important-dates',
    title: 'JEE Main 2026 Important Dates',
    content: [
        { type: 'paragraph', text: 'The JEE Main 2026 cycle is now in the counselling phase. JoSAA Round 1 seat allotment along with the first JEE Main rank-based closing ranks is being released today. You should keep an eye on the JoSAA portal for the next round timelines.' },
        {
            type: 'dateTable',
            rows: [
                { event: 'JoSAA Round 1 Seat Allotment', date: 'June 13, 2026', tag: 'Today' },
                { event: 'JoSAA Round 1 Reporting and Document Verification', date: 'June 14 - June 18, 2026' },
                { event: 'JoSAA Round 2 Seat Allotment', date: 'June 22, 2026', tag: 'Expected' },
                { event: 'JoSAA Round 3 Seat Allotment', date: 'June 29, 2026', tag: 'Expected' },
                { event: 'JoSAA Round 4 Seat Allotment', date: 'July 6, 2026', tag: 'Expected' },
                { event: 'JoSAA Round 5 Seat Allotment', date: 'July 13, 2026', tag: 'Expected' },
                { event: 'CSAB Special Round Registration', date: 'Third week of July 2026', tag: 'Expected' },
                { event: 'JEE Main 2027 Session 1 Notification', date: 'Last week of October 2026', tag: 'Expected' },
                { event: 'JEE Main 2026 Session 1 Exam', date: 'January 22 - January 31, 2026', tag: 'Over' },
                { event: 'JEE Main 2026 Session 1 Result', date: 'February 12, 2026', tag: 'Over' },
                { event: 'JEE Main 2026 Session 2 Exam', date: 'April 2 - April 9, 2026', tag: 'Over' },
                { event: 'JEE Main 2026 Session 2 Result', date: 'April 25, 2026', tag: 'Over' },
                { event: 'JoSAA 2026 Registration Begins', date: 'June 3, 2026', tag: 'Over' }
            ]
        },
        { type: 'note', tone: 'muted', text: 'If you have been allotted a seat in Round 1, you must complete the online reporting and document verification by June 18, 2026 to retain your seat.' }
    ]
};

const eligibilitySection = {
    slug: 'eligibility',
    title: 'JEE Main 2026 Eligibility Criteria',
    content: [
        { type: 'paragraph', text: 'You should meet the eligibility conditions set by NTA before applying for JEE Main 2026. There is no upper age limit, but the qualifying exam and subject requirements are strict.' },
        { type: 'heading', text: 'Age Limit' },
        { type: 'paragraph', text: 'There is no age limit for appearing in JEE Main 2026. However, the age limit prescribed by the institutes you are applying to for admission will apply.' },
        { type: 'heading', text: 'Qualifying Exam' },
        {
            type: 'bullets',
            items: [
                'You must have passed Class 12 or equivalent in 2024 or 2025, or appeared in 2026.',
                'Candidates who passed Class 12 in 2023 or earlier are not eligible.',
                'For BTech admission, Physics, Mathematics and one of Chemistry, Biotechnology, Biology, Technical Vocational subject must be in your Class 12.',
                'For BArch, you need Physics, Chemistry and Mathematics with at least 50% in each.',
                'For BPlanning, you need Mathematics as a compulsory subject.'
            ]
        },
        { type: 'heading', text: 'Number of Attempts' },
        { type: 'paragraph', text: 'You can attempt JEE Main for three consecutive years after passing Class 12. Both sessions in a single year count as one attempt.' },
        { type: 'heading', text: 'Minimum Marks for NIT/IIIT/GFTI Admission' },
        {
            type: 'bullets',
            items: [
                'General category: 75% in Class 12 or top 20 percentile in your board.',
                'SC/ST/PwD category: 65% in Class 12 or top 20 percentile in your board.'
            ]
        }
    ]
};

const applicationProcessSection = {
    slug: 'application-process',
    title: 'JEE Main 2026 Application Process',
    content: [
        { type: 'paragraph', text: 'The JEE Main 2026 application window for both sessions has now closed. The process is fully online and includes registration, form filling, document upload and fee payment. You should keep your details ready before starting the form.' },
        { type: 'heading', text: 'Steps to Apply for JEE Main' },
        {
            type: 'labelledBullets',
            items: [
                { label: 'Step 1 - Registration:', text: 'Visit jeemain.nta.nic.in and register using your name, date of birth, mobile number, email ID and Aadhaar number.' },
                { label: 'Step 2 - Application Form:', text: 'Fill in your personal details, academic qualifications, paper preference, exam city choices and language.' },
                { label: 'Step 3 - Document Upload:', text: 'Upload your recent passport-size photograph, signature and Class 10 and 12 certificates in the specified format.' },
                { label: 'Step 4 - Fee Payment:', text: 'Pay the application fee through debit card, credit card, UPI or net banking.' },
                { label: 'Step 5 - Confirmation:', text: 'Download the confirmation page and keep a printout for future reference.' }
            ]
        },
        { type: 'heading', text: 'Application Fee Structure' },
        {
            type: 'table',
            headers: ['Category', 'Paper 1 or Paper 2 (India)', 'Paper 1 and Paper 2 (India)'],
            rows: [
                ['General (Male)', 'Rs. 1000', 'Rs. 2000'],
                ['General (Female)', 'Rs. 800', 'Rs. 1600'],
                ['SC/ST/PwD/Third Gender', 'Rs. 500', 'Rs. 1000'],
                ['OBC/EWS (Male)', 'Rs. 900', 'Rs. 1800'],
                ['OBC/EWS (Female)', 'Rs. 800', 'Rs. 1600']
            ]
        }
    ]
};

const examPatternSection = {
    slug: 'exam-pattern',
    title: 'JEE Main 2026 Exam Pattern',
    content: [
        { type: 'paragraph', text: 'The JEE Main 2026 exam pattern is the same as last year. Paper 1 is for BE and BTech aspirants and is held in CBT mode. Paper 2A includes a Drawing section that is conducted in pen-paper mode, while the rest of the paper is computer-based.' },
        { type: 'heading', text: 'Paper 1 (BE/BTech) Pattern' },
        {
            type: 'table',
            headers: ['Particulars', 'Details'],
            rows: [
                ['Mode', 'Computer Based Test'],
                ['Duration', '3 hours'],
                ['Subjects', 'Physics, Chemistry, Mathematics'],
                ['Total Questions', '75 (25 in each subject)'],
                ['Question Types', '20 MCQs + 5 Numerical (all 5 compulsory)'],
                ['Total Marks', '300'],
                ['Marking Scheme', '+4 for correct, -1 for incorrect MCQs and Numericals']
            ]
        },
        { type: 'heading', text: 'Paper 2A (BArch) Pattern' },
        {
            type: 'table',
            headers: ['Section', 'Questions', 'Marks'],
            rows: [
                ['Mathematics', '25 (20 MCQ + 5 Numerical)', '100'],
                ['Aptitude', '50', '200'],
                ['Drawing', '2', '100'],
                ['Total', '77', '400']
            ]
        },
        { type: 'heading', text: 'Paper 2B (BPlanning) Pattern' },
        { type: 'paragraph', text: 'BPlanning paper has Mathematics, Aptitude and Planning sections, with a total of 100 questions for 400 marks. The exam is fully computer-based and is 3 hours long.' }
    ]
};

const syllabusSection = {
    slug: 'syllabus',
    title: 'JEE Main 2026 Syllabus',
    content: [
        { type: 'paragraph', text: 'The JEE Main 2026 syllabus is largely based on the NCERT Class 11 and 12 curriculum. NTA has continued the reduced syllabus that was introduced in 2024 by removing topics like communication systems, mechanics of solids and fluids, and others.' },
        { type: 'heading', text: 'Physics Syllabus' },
        {
            type: 'bullets',
            items: [
                'Kinematics, Laws of Motion, Work, Energy and Power',
                'Rotational Motion, Gravitation, Properties of Solids and Liquids',
                'Thermodynamics, Kinetic Theory of Gases',
                'Oscillations and Waves',
                'Electrostatics, Current Electricity, Magnetic Effects of Current',
                'Electromagnetic Induction, Alternating Currents, Electromagnetic Waves',
                'Optics, Dual Nature of Matter and Radiation',
                'Atoms and Nuclei, Electronic Devices'
            ]
        },
        { type: 'heading', text: 'Chemistry Syllabus' },
        {
            type: 'labelledBullets',
            items: [
                { label: 'Physical Chemistry:', text: 'Atomic Structure, Chemical Bonding, States of Matter, Thermodynamics, Solutions, Equilibrium, Redox Reactions, Chemical Kinetics' },
                { label: 'Inorganic Chemistry:', text: 'Periodic Table, p-Block, d and f-Block Elements, Coordination Compounds, Environmental Chemistry' },
                { label: 'Organic Chemistry:', text: 'Basic Principles, Hydrocarbons, Haloalkanes and Haloarenes, Alcohols, Phenols, Ethers, Aldehydes, Ketones, Amines, Biomolecules, Polymers' }
            ]
        },
        { type: 'heading', text: 'Mathematics Syllabus' },
        {
            type: 'bullets',
            items: [
                'Sets, Relations and Functions, Complex Numbers',
                'Matrices and Determinants, Permutations and Combinations',
                'Mathematical Induction, Binomial Theorem, Sequences and Series',
                'Limits, Continuity and Differentiability, Integral Calculus',
                'Differential Equations, Coordinate Geometry, 3D Geometry',
                'Vector Algebra, Statistics and Probability, Trigonometry'
            ]
        }
    ]
};

const admitCardSection = {
    slug: 'admit-card',
    title: 'JEE Main 2026 Admit Card',
    content: [
        { type: 'paragraph', text: 'The JEE Main 2026 admit cards for both Session 1 and Session 2 have already been released by NTA. The Session 1 admit card was released on January 18, 2026, three days before the exam. The Session 2 admit card was released on March 30, 2026.' },
        { type: 'paragraph', text: 'You can download the admit card from jeemain.nta.nic.in by entering your application number, date of birth and security code. The admit card includes your name, photograph, roll number, exam city, centre address, paper, shift and reporting time.' },
        { type: 'paragraph', text: 'You should carry the admit card along with one valid photo ID such as Aadhaar, PAN, Voter ID or Passport to the exam centre. Without these, you are not allowed to enter the exam hall.' }
    ]
};

const answerKeySection = {
    slug: 'answer-key',
    title: 'JEE Main 2026 Answer Key',
    content: [
        { type: 'paragraph', text: 'The JEE Main 2026 final answer key for Session 2 was released by NTA on April 23, 2026, along with the question paper and recorded responses. The provisional answer key was published on April 14, 2026, and candidates were given two days to raise objections at Rs. 200 per challenge.' },
        { type: 'paragraph', text: 'You can use the answer key to estimate your score before the result is declared. The final answer key is used by NTA to prepare the official scorecards.' },
        { type: 'heading', text: 'How to Check the Answer Key' },
        {
            type: 'bullets',
            items: [
                'Visit the official website jeemain.nta.nic.in.',
                'Click on the JEE Main 2026 final answer key link.',
                'Log in using your application number and password.',
                'Download the answer key PDF and tally your responses.'
            ]
        }
    ]
};

const resultSection = {
    slug: 'result',
    title: 'JEE Main 2026 Result',
    content: [
        { type: 'paragraph', text: 'The JEE Main 2026 Session 2 result was declared on April 25, 2026, along with the final NTA scores and All India Ranks. The Session 1 result was announced on February 12, 2026. The best of the two NTA scores from Session 1 and Session 2 is used to prepare the final merit list.' },
        { type: 'paragraph', text: 'You can check your result by logging in to jeemain.nta.nic.in with your application number and date of birth. The scorecard shows your NTA score in each subject, total NTA score, All India Rank, category rank, and the qualifying status for JEE Advanced.' },
        { type: 'heading', text: 'JEE Main 2026 Toppers' },
        { type: 'paragraph', text: 'A total of 24 candidates scored 100 percentile in JEE Main 2026 in Paper 1. The cut-off for appearing in JEE Advanced 2026 was finalised on the basis of the best of the two scores.' },
        {
            type: 'table',
            headers: ['Category', 'JEE Main 2026 Qualifying Cut-off (Percentile)', '2025 Cut-off (Percentile)'],
            rows: [
                ['General', '93.10', '93.10'],
                ['EWS', '80.38', '80.38'],
                ['OBC-NCL', '79.43', '79.43'],
                ['SC', '61.15', '61.15'],
                ['ST', '47.90', '47.90'],
                ['PwD', '0.0018', '0.0018']
            ]
        },
        { type: 'note', tone: 'source', text: 'Source: JEE Main 2026 Result Notification, NTA' }
    ]
};

const cutoffSection = {
    slug: 'cutoff',
    title: 'JEE Main 2026 Cutoff',
    content: [
        { type: 'paragraph', text: 'The JEE Main 2026 cutoff is the minimum closing rank required to get admission to a particular branch at a particular institute. JoSAA released the first JEE Main rank-based closing ranks today, June 13, 2026, along with the Round 1 seat allotment. The cutoff varies for each NIT, IIIT and GFTI, and changes round by round during counselling.' },
        { type: 'paragraph', text: 'The opening and closing ranks depend on the branch, category, home or other state quota and gender pool. Computer Science Engineering at top NITs continues to be the most competitive branch.' },
        { type: 'heading', text: 'JoSAA 2026 Round 1 Closing Ranks (Indicative, General-AI Quota)' },
        {
            type: 'table',
            headers: ['Institute', 'Branch', 'Round 1 Closing Rank 2026', 'Round 1 Closing Rank 2025'],
            rows: [
                ['NIT Trichy', 'Computer Science Engineering', 'To be updated post allotment', '1006'],
                ['NIT Warangal', 'Computer Science Engineering', 'To be updated post allotment', '1488'],
                ['NIT Surathkal', 'Computer Science Engineering', 'To be updated post allotment', '1671'],
                ['IIIT Hyderabad', 'Computer Science Engineering', 'To be updated post allotment', '129'],
                ['IIIT Bangalore', 'Computer Science Engineering', 'To be updated post allotment', '1855'],
                ['NIT Calicut', 'Computer Science Engineering', 'To be updated post allotment', '2384'],
                ['NIT Rourkela', 'Computer Science Engineering', 'To be updated post allotment', '3158'],
                ['MNIT Jaipur', 'Computer Science Engineering', 'To be updated post allotment', '3496']
            ]
        },
        { type: 'note', tone: 'muted', text: 'JoSAA Round 1 closing ranks for 2026 will be available on the official JoSAA portal once the seat allotment is published today. You should refresh the official portal for the latest figures.' },
        { type: 'note', tone: 'source', text: 'Source: JoSAA Official Portal' }
    ]
};

const marksVsRankSection = {
    slug: 'marks-vs-rank',
    title: 'JEE Main 2026 Marks vs Rank',
    content: [
        { type: 'paragraph', text: 'The JEE Main 2026 marks vs rank analysis helps you understand the expected All India Rank for your score. The rank depends on the percentile, total candidates appeared and the difficulty level of the paper. The table below is based on past year trends and the 2026 result data.' },
        {
            type: 'table',
            headers: ['Marks (out of 300)', 'Expected Percentile', 'Expected All India Rank'],
            rows: [
                ['285 - 300', '99.99 - 100', '1 - 100'],
                ['260 - 284', '99.95 - 99.98', '101 - 500'],
                ['230 - 259', '99.85 - 99.94', '501 - 1500'],
                ['200 - 229', '99.50 - 99.84', '1501 - 5000'],
                ['170 - 199', '98.50 - 99.49', '5001 - 15000'],
                ['140 - 169', '96.50 - 98.49', '15001 - 35000'],
                ['110 - 139', '93.10 - 96.49', '35001 - 70000'],
                ['80 - 109', '86 - 93', '70001 - 1.5 lakh'],
                ['50 - 79', '72 - 85', '1.5 lakh - 3.5 lakh']
            ]
        }
    ]
};

const counsellingSection = {
    slug: 'counselling',
    title: 'JoSAA 2026 Counselling',
    content: [
        { type: 'paragraph', text: 'The Joint Seat Allocation Authority (JoSAA) is the body that conducts the centralised counselling for admission to 121 institutes including 23 IITs, 31 NITs, 26 IIITs and 41 GFTIs. JoSAA 2026 counselling began on June 3, 2026 and the Round 1 seat allotment is being declared today, June 13, 2026.' },
        { type: 'heading', text: 'JoSAA Counselling Stages' },
        {
            type: 'labelledBullets',
            items: [
                { label: 'Registration:', text: 'You must register on josaa.nic.in using your JEE Main application number and password.' },
                { label: 'Choice Filling:', text: 'You can fill and lock your choices of institutes and branches in order of preference.' },
                { label: 'Mock Allotment:', text: 'Two mock allotment lists are released before the actual rounds to help you adjust your choices.' },
                { label: 'Seat Allotment:', text: 'JoSAA conducts 5 rounds of seat allotment.' },
                { label: 'Acceptance Fee:', text: 'If you are allotted a seat, you must pay the seat acceptance fee and complete document verification within the deadline.' },
                { label: 'Reporting:', text: 'Final reporting at the allotted institute happens after the last round.' }
            ]
        },
        { type: 'heading', text: 'JoSAA 2026 Round-wise Schedule' },
        {
            type: 'table',
            headers: ['Round', 'Seat Allotment Date', 'Reporting and Document Verification'],
            rows: [
                ['Round 1', 'June 13, 2026', 'June 14 - June 18, 2026'],
                ['Round 2', 'June 22, 2026 (Expected)', 'June 23 - June 26, 2026'],
                ['Round 3', 'June 29, 2026 (Expected)', 'June 30 - July 3, 2026'],
                ['Round 4', 'July 6, 2026 (Expected)', 'July 7 - July 10, 2026'],
                ['Round 5', 'July 13, 2026 (Expected)', 'July 14 - July 17, 2026']
            ]
        },
        { type: 'note', tone: 'muted', text: 'NTA releases the qualifying cutoff, but the actual admission cutoff for NITs, IIITs and GFTIs is released by JoSAA based on the choices filled and seats available.' }
    ]
};

const topInstitutesSection = {
    slug: 'top-institutes',
    title: 'Top NITs and IIITs Accepting JEE Main Score',
    content: [
        { type: 'paragraph', text: 'JEE Main score is accepted by 31 NITs, 26 IIITs and 38 GFTIs through JoSAA counselling. State engineering colleges and several private universities also use the JEE Main rank for admissions.' },
        { type: 'heading', text: 'Top NITs' },
        {
            type: 'bullets',
            items: [
                'NIT Tiruchirappalli (NIT Trichy)', 'NIT Warangal', 'NIT Surathkal', 'NIT Calicut', 'NIT Rourkela',
                'NIT Allahabad (MNNIT)', 'NIT Nagpur (VNIT)', 'NIT Jaipur (MNIT)', 'NIT Kurukshetra', 'NIT Durgapur'
            ]
        },
        { type: 'heading', text: 'Top IIITs' },
        {
            type: 'bullets',
            items: [
                'IIIT Hyderabad (admission via separate process for some seats)', 'IIIT Bangalore', 'IIIT Allahabad',
                'IIIT Delhi', 'IIIT Gwalior (ABV-IIITM)', 'IIIT Jabalpur (PDPM)', 'IIIT Lucknow', 'IIITDM Kancheepuram'
            ]
        },
        { type: 'heading', text: 'Top GFTIs' },
        {
            type: 'bullets',
            items: [
                'IIEST Shibpur', 'Assam University, Silchar', 'Tezpur University', 'Birla Institute of Technology, Mesra',
                'School of Planning and Architecture (SPA), Delhi/Bhopal/Vijayawada'
            ]
        }
    ]
};

const preparationSection = {
    slug: 'preparation',
    title: 'JEE Main 2026 Preparation Tips',
    content: [
        { type: 'paragraph', text: 'JEE Main is a competitive exam with more than 12 lakh aspirants competing for limited seats. A clear strategy, the right resources and consistent practice are the keys to a good score. If you are appearing in 2027, you should start preparing now.' },
        { type: 'heading', text: 'Subject-wise Strategy' },
        {
            type: 'labelledBullets',
            items: [
                { label: 'Physics:', text: 'Focus on concepts and derivations. NCERT is the base, but practice from H.C. Verma and D.C. Pandey for problem-solving.' },
                { label: 'Chemistry:', text: 'Inorganic Chemistry is fully NCERT-based and most scoring. Practice numericals from Physical Chemistry and revise organic reactions regularly.' },
                { label: 'Mathematics:', text: 'Calculus, Coordinate Geometry and Algebra carry the highest weight. Solve at least 30 questions every day from R.D. Sharma or Cengage.' }
            ]
        },
        { type: 'heading', text: 'General Tips' },
        {
            type: 'bullets',
            items: [
                'Make a weekly study plan with subject-wise targets.',
                'Solve at least 10 years of previous year JEE Main papers.',
                'Take a full-length mock test every week and analyse your mistakes.',
                'Revise short notes and formula sheets daily.',
                'Maintain a daily error log to track repeated mistakes.',
                'Get at least 7 hours of sleep and take regular breaks to avoid burnout.'
            ]
        },
        { type: 'heading', text: 'Best Books for JEE Main' },
        {
            type: 'table',
            headers: ['Subject', 'Recommended Books'],
            rows: [
                ['Physics', 'NCERT, H.C. Verma, D.C. Pandey, Resnick Halliday'],
                ['Chemistry', 'NCERT, O.P. Tandon, M.S. Chouhan, J.D. Lee'],
                ['Mathematics', 'NCERT, R.D. Sharma, Cengage Series, Arihant']
            ]
        }
    ]
};

const faqsSection = {
    slug: 'faqs',
    title: 'FAQs',
    content: [
        {
            type: 'faq',
            items: [
                { question: 'When is JoSAA 2026 Round 1 seat allotment being released?', answer: 'JoSAA 2026 Round 1 seat allotment, along with the first JEE Main rank-based closing ranks, is being released today, June 13, 2026, on josaa.nic.in.' },
                { question: 'What is the JEE Main 2026 cutoff for JEE Advanced?', answer: 'The JEE Main 2026 qualifying cutoff for JEE Advanced is 93.10 percentile for General, 80.38 for EWS, 79.43 for OBC-NCL, 61.15 for SC, 47.90 for ST and 0.0018 for PwD.' },
                { question: 'How many rounds of JoSAA counselling are there in 2026?', answer: 'JoSAA 2026 conducts 5 rounds of seat allotment, from Round 1 on June 13, 2026 to Round 5 expected on July 13, 2026.' },
                { question: 'What is the expected rank for 99 percentile in JEE Main 2026?', answer: 'A 99 percentile in JEE Main 2026 typically corresponds to an All India Rank in the range of roughly 12,000 to 15,000, depending on the total number of candidates who appeared.' },
                { question: 'Can I get NIT with 95 percentile in JEE Main 2026?', answer: 'With a 95 percentile, you may get admission to some lower-preference branches at newer or less competitive NITs in the home-state quota, but top branches like Computer Science are unlikely.' },
                { question: 'What is the JEE Main 2026 paper pattern?', answer: 'Paper 1 (BE/BTech) has 75 questions worth 300 marks across Physics, Chemistry and Mathematics. Paper 2A (BArch) has Mathematics, Aptitude and Drawing sections worth 400 marks, and Paper 2B (BPlanning) has Mathematics, Aptitude and Planning sections worth 400 marks.' },
                { question: 'How many candidates appeared for JEE Main 2026?', answer: 'More than 12 lakh candidates appeared in JEE Main 2026 across Session 1 and Session 2 combined.' },
                { question: 'Is JEE Main 2026 tougher than 2025?', answer: 'The overall difficulty level and qualifying cutoff percentiles for JEE Main 2026 are largely in line with 2025, as the exam pattern and syllabus remained unchanged.' },
                { question: 'What documents are required for JoSAA 2026 reporting?', answer: 'You need your JEE Main admit card, Class 10 and 12 marksheets, category/income certificate (if applicable), photo ID proof and passport-size photographs for JoSAA reporting and document verification.' },
                { question: 'Can I appear in JEE Main again in 2027?', answer: 'Yes, you can attempt JEE Main for three consecutive years after passing Class 12, so appearing again in 2027 is allowed if this is within your attempt limit.' },
                { question: 'When will JEE Main 2027 Session 1 notification be released?', answer: 'NTA is expected to release the JEE Main 2027 Session 1 notification in the last week of October 2026, following the trend of the previous two years.' }
            ]
        },
        { type: 'note', tone: 'muted', text: 'Disclaimer: All the information mentioned in this article is based on official notifications and previous year data. Candidates should always verify the latest details from the official website jeemain.nta.nic.in before making any decisions.' }
    ]
};

const questionPaperSection = {
    slug: 'question-paper',
    title: 'Previous Year JEE Main Questions',
    content: [
        {
            type: 'linkGrid',
            items: Array.from({ length: 25 }, (_, i) => (i === 0 ? 'JEE Main Question Paper' : `JEE Main Question Paper ${2026 - i}`))
        }
    ]
};

const newsSection = {
    slug: 'news',
    title: 'Latest JEE Main News',
    content: [
        {
            type: 'newsGrid',
            items: [
                { id: 1, title: 'JoSAA 2026 Round 1 Opening and Closing Ranks Out for IITs, NITs, IIITs', date: 'Jun 14, 2026', excerpt: 'The Joint Seat Allocation Authority (JoSAA) has released the Round 1 opening and closing ranks for the...', image: 'https://picsum.photos/seed/josaa-round1-ranks/300/160' },
                { id: 2, title: 'JoSAA 2026 Round 1 Seat Allotment Result Released', date: 'Jun 13, 2026', excerpt: 'The Joint Seat Allocation Authority (JoSAA) has released the Round 1 seat allotment result for JoSAA 20...', image: 'https://picsum.photos/seed/josaa-allotment-result/300/160' },
                { id: 3, title: 'JoSAA 2026 Upgrade or Freeze After Round 2: When to Wait for Round 3', date: 'Jun 13, 2026', excerpt: 'After JoSAA 2026 Round 2 allotment, you must respond with Freeze, Float, or Slide. Choosing Float keep...', image: 'https://picsum.photos/seed/josaa-freeze-float/300/160' }
            ]
        }
    ]
};

const overviewSections = [
    latestUpdatesSection,
    overviewSection,
    highlightsSection,
    importantDatesSection,
    eligibilitySection,
    applicationProcessSection,
    examPatternSection,
    syllabusSection,
    admitCardSection,
    answerKeySection,
    resultSection,
    cutoffSection,
    marksVsRankSection,
    counsellingSection,
    topInstitutesSection,
    preparationSection,
    faqsSection,
    questionPaperSection,
    newsSection
];

export const examPage = {
    name: 'JEE Main',
    label: 'JEE Main 2026: JoSAA Round 1 Allotment Out, Cutoff, Counselling and Marks vs Rank',
    slug: 'jee-main',
    logo: NTA_LOGO,
    tabs: [
        {
            label: 'Overview',
            slug: 'overview',
            sections: overviewSections
        },
        {
            label: 'Admit Card',
            slug: 'admit-card-group',
            tabs: [
                {
                    label: 'Admit Card',
                    slug: 'admit-card',
                    sections: [admitCardSection]
                },
                {
                    label: 'Answer Key',
                    slug: 'answer-key',
                    sections: [answerKeySection]
                }
            ]
        },
        {
            label: 'Cutoff',
            slug: 'cutoff-group',
            tabs: [
                {
                    label: 'Cutoff',
                    slug: 'cutoff',
                    sections: [resultSection, cutoffSection]
                },
                {
                    label: 'Marks vs Rank',
                    slug: 'marks-vs-rank',
                    sections: [marksVsRankSection]
                }
            ]
        }
    ]
};

export const jeeMainSidebarLinks = [
    'Admit Card', 'JoSAA Counselling', 'Question Paper', 'Cutoff', 'Preparation', 'Mock Test',
    'Paper Analysis', 'College Predictor', 'Rank Predictor', 'News', 'Participating Colleges', 'Score Calculator'
];

export const jeeMainCategoryPages = ['BS', 'B.Planning', 'B.Arch', 'B.Sc', 'BE/B.Tech'];

export const jeeMainUpcomingExams = [
    { name: 'UPCATET', date: 'Jun 18, 2026' }
];

export const jeeMainSidebarUpdates = [
    { title: 'JoSAA 2026 Round 1 Opening and Closing Ranks Out at josaa.nic.in', author: 'Collegedunia Editorial Team', date: 'Jun 14, 2026', image: 'https://picsum.photos/seed/josaa-round1-opening-closing/120/100' },
    { title: 'JoSAA 2026 Round 1 Seat Allotment Result Released', author: 'Collegedunia Editorial Team', date: 'Jun 13, 2026', image: 'https://picsum.photos/seed/josaa-round1-seat-result/120/100' },
    { title: 'JoSAA 2026 Upgrade or Freeze After Round 2: When to Wait for Round 3', author: 'Collegedunia Team', date: 'Jun 13, 2026', image: 'https://picsum.photos/seed/josaa-upgrade-freeze-round2/120/100' },
    { title: 'JEE Main Cutoff 2026: JoSAA Round 1 Out at josaa.nic.in, Check Closing Ranks and Marks vs Rank', author: 'Collegedunia Team', date: 'Jun 13, 2026', image: 'https://picsum.photos/seed/jee-main-cutoff-josaa/120/100' },
    { title: 'JoSAA 2026 Colleges Accepting JEE Main Rank Under 50000 CRL', author: 'Collegedunia Team', date: 'Jun 11, 2026', image: 'https://picsum.photos/seed/josaa-colleges-rank-50000/120/100' }
];
