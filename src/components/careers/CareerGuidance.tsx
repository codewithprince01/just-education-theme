/**
 * "How does it work?" — alternating illustration / copy rows describing the
 * career-guidance journey. Illustrations live in /public/carrer.
 */

interface Step {
    img: string;
    alt: string;
    title: string;
    points: string[];
    imageRight: boolean; // true → illustration on the right (desktop)
}

const steps: Step[] = [
    {
        img: '/carrer/AssessmentTest.97db99b0.svg',
        alt: 'Career assessment test illustration',
        title: 'Discover your strengths with our Career Compass Assessment Test',
        points: [
            'Career Compass assessment based on the RIASEC framework.',
            'Get in-depth career reports with personalized development plans.',
            'Get your best-fit career recommendations based on various evaluation parameters.',
        ],
        imageRight: true,
    },
    {
        img: '/carrer/Sitemapcreation.5c1471d5.svg',
        alt: 'Career roadmap illustration',
        title: 'Create a Career Roadmap',
        points: [
            'Compare and select a few colleges from thousands of options for your primary and backup vocations.',
            'Get real-time notifications and information about college entrance exams and scholarships.',
            'With help from our career advisers, create a thorough roadmap to your ideal job.',
        ],
        imageRight: false,
    },
    {
        img: '/carrer/Psychotherapy.ef799e6b.svg',
        alt: 'Career counselling illustration',
        title: 'Personalized Counselling with our Certified Career Counselor',
        points: [
            'With the help of professionals, plan your career, stream/subject combinations, course, college, and more.',
            'Over 1 million+ students have received mentoring from our internationally certified career coaches.',
            'Personalized career counselling and all-around support for every question to help you make the best decision.',
        ],
        imageRight: true,
    },
    {
        img: '/carrer/digitalCareer.5c53c545.svg',
        alt: 'Digital career library illustration',
        title: 'Get access to our Digital Career Library & other valuable resources',
        points: [
            'Get access to our Digital Career Library and other valuable resources.',
            'Career-related trends, inspiration and advice covered in expert-written articles, webinars and video blogs.',
            'Resume building, entrance-exam schedules, career e-guides and regular updates.',
        ],
        imageRight: false,
    },
];

const StepRow = ({ step }: { step: Step }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
        {/* Illustration */}
        <div className={step.imageRight ? 'lg:order-2' : 'lg:order-1'}>
            <img src={step.img} alt={step.alt} className="w-full max-w-md mx-auto" loading="lazy" />
        </div>

        {/* Copy */}
        <div className={step.imageRight ? 'lg:order-1' : 'lg:order-2'}>
            <h3 className="text-xl md:text-2xl font-bold text-[#0B3C5D] mb-4 leading-snug">{step.title}</h3>
            <ul className="space-y-3">
                {step.points.map((p, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-500 leading-relaxed">
                        <span className="mt-1.5 w-2 h-2 rounded-full border-2 border-[#F57C00] flex-shrink-0" />
                        <span>{p}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const CareerGuidance = () => (
    <section className="mt-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B3C5D] text-center mb-12">How does it work?</h2>
        <div className="space-y-14 lg:space-y-20">
            {steps.map((step) => <StepRow key={step.title} step={step} />)}
        </div>
    </section>
);

export default CareerGuidance;
