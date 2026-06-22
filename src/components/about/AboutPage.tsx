import Link from 'next/link';
import { ArrowRight, CheckCircle2, Mail, Headphones, Users } from 'lucide-react';
import Reveal from './Reveal';
import AnimatedCounter from './AnimatedCounter';
import Icon from './Icon';
import Illustration from './Illustrations';
import HeroStory from './HeroStory';
import StudentJourney from './StudentJourney';
import EcosystemGraph from './EcosystemGraph';
import DeliveryProcess from './DeliveryProcess';
import GrowthTimeline from './GrowthTimeline';
import NetworkVisual from './NetworkVisual';
import { impactStats, trustStoryBlocks, transparencyPillars } from '../../data/about';

const AboutPage = () => {
    return (
        <div className="bg-gray-50">
            {/* ===== 1 · HERO ===== */}
            <HeroStory />

            {/* ===== 2 · WHY WE STARTED ===== */}
            <section className="py-24 md:py-28 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <Reveal>
                        <Illustration name="scattered" className="rounded-3xl overflow-hidden shadow-sm" />
                    </Reveal>
                    <Reveal delay={120}>
                        <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-full mb-5">Our Origin</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">Why we started JustEducation</h2>
                        <div className="mt-6 space-y-4 text-gray-600 leading-relaxed text-[15px] md:text-base">
                            <p>Students often struggle to find reliable educational information. The details that shape a future — fees, eligibility, deadlines, outcomes — sit scattered across countless websites and sources.</p>
                            <p>Comparing colleges, courses, exams, admissions, fees, scholarships, and career options quickly becomes overwhelming. It is easy to feel lost, and easy to make a decision based on incomplete information.</p>
                            <p>JustEducation was created to change that — to simplify educational discovery and help students make informed decisions through structured, transparent, and trustworthy information.</p>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                            {['Scattered → Structured', 'Confusion → Clarity', 'Guesswork → Confidence'].map((t) => (
                                <span key={t} className="flex items-center gap-2 text-sm font-semibold text-[#0B3C5D]">
                                    <CheckCircle2 className="w-4 h-4 text-orange-500" /> {t}
                                </span>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ===== 3 · STUDENT JOURNEY ===== */}
            <StudentJourney />

            {/* ===== 4 · ECOSYSTEM GRAPH ===== */}
            <EcosystemGraph />

            {/* ===== 5 · NUMBERS THAT MATTER ===== */}
            <section className="relative overflow-hidden py-24 md:py-28 bg-gradient-to-br from-[#0B3C5D] via-[#0D4B75] to-[#126094] text-white">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-orange-500 blur-3xl je-float-slow" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-blue-400 blur-3xl je-float" />
                </div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                    <Reveal className="max-w-3xl mx-auto text-center mb-16">
                        <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-300 bg-white/10 px-3 py-1 rounded-full mb-4">Numbers That Matter</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">Scale that students can rely on</h2>
                    </Reveal>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                        {impactStats.map((s, i) => (
                            <Reveal key={s.label} delay={(i % 3) * 90} className="text-center">
                                <div className="flex justify-center mb-3">
                                    <span className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                        <Icon name={s.icon} className="w-6 h-6 text-orange-300" />
                                    </span>
                                </div>
                                <div className="text-4xl md:text-5xl font-black tracking-tight">
                                    <AnimatedCounter value={s.value} suffix={s.suffix} format="comma" />
                                </div>
                                <p className="mt-2 text-blue-100 font-medium">{s.label}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== 6 · HOW INFORMATION REACHES STUDENTS ===== */}
            <DeliveryProcess />

            {/* ===== 7 · WHY STUDENTS TRUST US (alternating storytelling) ===== */}
            <section className="py-24 md:py-28 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-full mb-4">Why Students Trust Us</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">Trust, built one detail at a time</h2>
                </div>
                <div className="space-y-24 md:space-y-32">
                    {trustStoryBlocks.map((block) => (
                        <Reveal key={block.title}>
                            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                                <div className={block.flip ? 'lg:order-2' : ''}>
                                    <Illustration name={block.art} className="rounded-3xl overflow-hidden shadow-sm" />
                                </div>
                                <div className={block.flip ? 'lg:order-1' : ''}>
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center shadow-md mb-6">
                                        <Icon name={block.icon} className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">{block.title}</h3>
                                    <p className="mt-4 text-gray-600 leading-relaxed text-[15px] md:text-base">{block.body}</p>
                                    <ul className="mt-6 space-y-3">
                                        {block.points.map((p) => (
                                            <li key={p} className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                                                <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0" /> {p}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ===== 8 · GROWTH TIMELINE ===== */}
            <GrowthTimeline />

            {/* ===== 9 · THE JUSTEDUCATION NETWORK ===== */}
            <NetworkVisual />

            {/* ===== 10 · VISION (cinematic) ===== */}
            <section className="relative overflow-hidden py-28 md:py-36">
                <div className="absolute inset-0">
                    <Illustration name="vision" className="w-full h-full" />
                    <div className="absolute inset-0 bg-[#06192a]/70" />
                </div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10 text-center text-white">
                    <Reveal>
                        <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-300 mb-6">Our Vision</span>
                        <h2 className="text-3xl md:text-5xl font-black leading-[1.12]">
                            Building India&apos;s most trusted <span className="text-orange-400">education ecosystem</span>
                        </h2>
                        <p className="mt-8 text-lg md:text-xl text-blue-100/90 leading-relaxed max-w-2xl mx-auto">
                            We envision a future where every student — in every city — can discover, compare, evaluate, and
                            pursue educational opportunities with complete confidence. A transparent, comprehensive platform
                            that closes the distance between learners and the institutions that shape their futures.
                        </p>
                        <div className="mt-10">
                            <Link href="/exams" className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                                Start Exploring <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ===== 11 · LONG-FORM SEO CONTENT ===== */}
            <section className="py-24 md:py-28 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <article className="space-y-5 text-gray-600 leading-relaxed text-[15px] md:text-base">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                        JustEducation: A Trusted Education Portal for Colleges, Courses &amp; Exams in India
                    </h2>
                    <p>
                        Education is one of the most significant investments a student and their family will ever make, and the
                        quality of that decision depends heavily on the quality of information behind it. JustEducation was built
                        as a comprehensive <strong>education portal</strong> and <strong>education information platform</strong>
                        to bring clarity to that process — consolidating reliable details about <strong>colleges in India</strong>,
                        <strong> universities in India</strong>, <strong>schools in India</strong>, courses, exams, scholarships,
                        and careers into a single, structured experience. Instead of navigating scattered, inconsistent sources,
                        students can explore everything they need in one trustworthy place.
                    </p>

                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 pt-4">Simplifying College Search and Course Search</h3>
                    <p>
                        For most students, the journey begins with a question: which institution and which program is right for me?
                        The modern <strong>college search</strong> can feel overwhelming when information lives across dozens of
                        websites, brochures, and forums. JustEducation reimagines this with a unified <strong>course search</strong>
                        and discovery experience, where institutions and programs are organised by location, stream, course level,
                        fees, and eligibility. Each profile surfaces the details that matter most — admission process, fee structure,
                        infrastructure, placement information, and academic reputation — so comparisons are meaningful rather than
                        superficial.
                    </p>
                    <p>
                        By presenting <strong>educational institutions</strong> in clear, comparable formats, the platform helps
                        students and parents weigh options side by side. Rather than visiting countless pages, a student can review
                        multiple colleges and courses together, understand how they differ, and shortlist the ones that fit their
                        goals, budget, and ambitions.
                    </p>

                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 pt-4">Comprehensive Coverage of Entrance Exams</h3>
                    <p>
                        Entrance examinations are a defining milestone for millions of aspirants every year. JustEducation maintains
                        detailed information on major <strong>entrance exams</strong> across engineering, medical, management, law,
                        design, and more. Students can track exam dates, application windows, eligibility criteria, exam patterns,
                        syllabi, and result announcements — and prepare strategically instead of scrambling against deadlines. For
                        each exam, the platform connects the test to the courses it unlocks and the institutions that accept it,
                        turning isolated facts into an actionable academic roadmap.
                    </p>

                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 pt-4">Scholarships, Admissions, and Financial Clarity</h3>
                    <p>
                        Financing education is a genuine concern for many families. JustEducation provides accessible information on
                        <strong> scholarships</strong> and <strong>admissions</strong>, helping students discover opportunities they
                        might otherwise miss. From merit-based awards to need-based support, eligibility and benefits are presented
                        transparently. Combined with clear fee details, this empowers students to plan financially and pursue
                        opportunities without unnecessary barriers. Transparent admissions information — application steps, important
                        dates, required documents, and cut-off trends — can be the difference between a smooth admission and a missed
                        opportunity.
                    </p>

                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 pt-4">Schools, Coaching Institutes, and Lifelong Learning</h3>
                    <p>
                        Education is a continuous journey, and JustEducation reflects that by covering far more than higher education
                        alone. The platform includes information on <strong>schools in India</strong> and <strong>coaching
                        institutes</strong>, supporting students at every stage — from early schooling decisions to focused exam
                        preparation. Parents researching schools can review curriculum and facilities, while aspirants can explore
                        coaching options suited to their goals, all within the same dependable ecosystem.
                    </p>

                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 pt-4">Career Guidance and Future Opportunities</h3>
                    <p>
                        Academic decisions are ultimately about the future. That is why JustEducation pairs educational information
                        with <strong>career guidance</strong>, helping students understand how a course or qualification connects to
                        real-world outcomes. By mapping academic pathways to careers, the platform encourages students to think beyond
                        the next exam and consider the long-term value of their choices. A growing library of <strong>educational
                        resources</strong> — guides, articles, and explainers — translates complex processes into simple language,
                        reinforcing the platform&apos;s role as a dependable companion throughout the journey.
                    </p>

                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 pt-4">Why a Trusted Education Platform Matters</h3>
                    <p>
                        India&apos;s education landscape is vast and constantly evolving, with thousands of institutions and countless
                        programs. In that complexity, students need a trustworthy guide more than ever. JustEducation is built to be
                        that guide — an independent, student-first platform committed to accuracy, transparency, and accessibility. By
                        consolidating reliable information about <strong>courses in India</strong>, colleges, universities, exams,
                        scholarships, and careers into a single, well-structured experience, it helps students move forward with
                        clarity and confidence. More than a directory, JustEducation is a comprehensive education ecosystem designed to
                        empower better decisions, bridge the gap between students and institutions, and support every learner&apos;s
                        ambition to build a brighter future.
                    </p>
                </article>
            </section>

            {/* ===== 12 · TRUST & TRANSPARENCY ===== */}
            <section className="py-24 md:py-28 bg-white border-y border-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <Reveal>
                            <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-full mb-5">Trust &amp; Transparency</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">The principles we never compromise on</h2>
                            <p className="mt-5 text-gray-600 leading-relaxed text-[15px] md:text-base">
                                Trust is not a feature we add — it is the foundation everything else stands on. These principles guide
                                how we collect, verify, present, and improve the information students depend on.
                            </p>
                            <Illustration name="verified" className="mt-8 rounded-3xl overflow-hidden shadow-sm max-w-sm" />
                        </Reveal>
                        <Reveal delay={120}>
                            <ul className="divide-y divide-gray-100">
                                {transparencyPillars.map((p) => (
                                    <li key={p.title} className="flex items-start gap-5 py-6 first:pt-0 last:pb-0">
                                        <span className="w-12 h-12 rounded-2xl bg-[#0B3C5D]/5 text-[#0B3C5D] flex items-center justify-center flex-shrink-0">
                                            <Icon name={p.icon} className="w-6 h-6" />
                                        </span>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{p.title}</h3>
                                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">{p.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ===== 13 · DISCLAIMER ===== */}
            <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <Reveal>
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/70 p-8 md:p-10">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-400 to-orange-500" />
                        <div className="flex items-start gap-5">
                            <span className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                                <Icon name="ShieldCheck" className="w-6 h-6" />
                            </span>
                            <div>
                                <h2 className="text-xl font-bold text-amber-900">Information Disclaimer</h2>
                                <p className="mt-3 text-sm md:text-[15px] text-amber-800/90 leading-relaxed">
                                    Educational information, admissions, fees, eligibility, scholarships, placements, rankings, and
                                    examination details may change over time. Users are encouraged to verify important information
                                    directly from official institutional sources before making final decisions.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* ===== 14 · CONTACT & SUPPORT ===== */}
            <section id="contact" className="pb-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <Reveal>
                    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0B3C5D] via-[#0D4B75] to-[#126094] text-white">
                        <div className="absolute inset-0 opacity-20 pointer-events-none">
                            <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-orange-500 blur-3xl je-float" />
                            <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-blue-300 blur-3xl je-float-slow" />
                        </div>
                        <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center p-8 md:p-14">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">Need help with your educational journey?</h2>
                                <p className="mt-5 text-base md:text-lg text-blue-100 leading-relaxed">
                                    Whether you are exploring colleges, courses, admissions, scholarships, or career opportunities,
                                    our team is here to help.
                                </p>
                                <div className="mt-9 flex flex-wrap gap-4">
                                    <a href="mailto:support@justeducation.com" className="px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5">
                                        <Mail className="w-5 h-5" /> Contact Us
                                    </a>
                                    <a href="mailto:support@justeducation.com" className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/25 transition-all duration-300 flex items-center gap-2">
                                        <Headphones className="w-5 h-5" /> Get Support
                                    </a>
                                    <a href="mailto:partners@justeducation.com" className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/25 transition-all duration-300 flex items-center gap-2">
                                        <Users className="w-5 h-5" /> Partner With Us
                                    </a>
                                </div>
                            </div>
                            <div className="hidden lg:block">
                                <Illustration name="contact" className="max-w-md mx-auto" />
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>
        </div>
    );
};

export default AboutPage;
