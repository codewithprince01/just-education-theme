// ─────────────────────────────────────────────────────────────
// Mock data for the Student Success / Testimonials page.
// All content here is dummy data for UI demonstration only.
// ─────────────────────────────────────────────────────────────

export type Course = "MBBS" | "Engineering" | "MBA";
export type Country = "Kazakhstan" | "Russia" | "Georgia" | "Germany";

const avatar = (name: string, bg = "0a2540") =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=${bg}&color=fff&size=160&bold=true`;

const photo = (seed: string, w = 600, h = 400) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

// ── Hero statistic cards ───────────────────────────────────────
export interface HeroStat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  decimals?: number;
  icon: "students" | "countries" | "universities" | "rating";
}

export const heroStats: HeroStat[] = [
  { id: "students", label: "Students Counseled", value: 15000, suffix: "+", icon: "students" },
  { id: "countries", label: "Countries Covered", value: 35, suffix: "+", icon: "countries" },
  { id: "universities", label: "Partner Universities", value: 500, suffix: "+", icon: "universities" },
  { id: "rating", label: "Average Rating", value: 4.9, suffix: "/5", decimals: 1, icon: "rating" },
];

// ── Video testimonials ─────────────────────────────────────────
export interface VideoTestimonial {
  id: number;
  name: string;
  course: string;
  university: string;
  country: string;
  flag: string;
  thumbnail: string;
  duration: string;
  quote: string;
}

export const featuredVideo: VideoTestimonial = {
  id: 0,
  name: "Ananya Sharma",
  course: "MBBS",
  university: "Kazakh National Medical University",
  country: "Kazakhstan",
  flag: "🇰🇿",
  thumbnail: "/images/mock/video_thumbnail_1.png",
  duration: "3:42",
  quote:
    "From a confused aspirant to a medical student abroad — Just Education made every step feel possible.",
};

export const videoTestimonials: VideoTestimonial[] = [
  {
    id: 1,
    name: "Rohan Mehta",
    course: "Engineering",
    university: "Tomsk Polytechnic University",
    country: "Russia",
    flag: "🇷🇺",
    thumbnail: "/images/mock/video_thumbnail_rohan.png",
    duration: "2:18",
    quote: "The counseling team understood exactly what I needed.",
  },
  {
    id: 2,
    name: "Priya Nair",
    course: "MBBS",
    university: "Tbilisi State Medical University",
    country: "Georgia",
    flag: "🇬🇪",
    thumbnail: "/images/mock/video_thumbnail_priya.png",
    duration: "4:05",
    quote: "My visa was approved in record time.",
  },
  {
    id: 3,
    name: "Arjun Singh",
    course: "MBA",
    university: "Technical University of Munich",
    country: "Germany",
    flag: "🇩🇪",
    thumbnail: "/images/mock/video_thumbnail_arjun.png",
    duration: "3:11",
    quote: "Studying in Germany was a dream — now it's my reality.",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    course: "MBBS",
    university: "Al-Farabi Kazakh National University",
    country: "Kazakhstan",
    flag: "🇰🇿",
    thumbnail: "/images/mock/video_thumbnail_sneha.png",
    duration: "2:47",
    quote: "Affordable, transparent, and genuinely supportive.",
  },
  {
    id: 5,
    name: "Karan Patel",
    course: "Engineering",
    university: "Peter the Great St. Petersburg",
    country: "Russia",
    flag: "🇷🇺",
    thumbnail: "/images/mock/video_thumbnail_karan.png",
    duration: "3:33",
    quote: "They handled the paperwork I dreaded.",
  },
];

// ── Student success stories (filterable) ───────────────────────
export interface SuccessStory {
  id: number;
  name: string;
  course: Course;
  university: string;
  country: Country;
  flag: string;
  rating: number;
  review: string;
  image: string;
}

export const successStories: SuccessStory[] = [
  {
    id: 1,
    name: "Ananya Sharma",
    course: "MBBS",
    university: "Kazakh National Medical University",
    country: "Kazakhstan",
    flag: "🇰🇿",
    rating: 5,
    review:
      "I never imagined studying medicine abroad would be this smooth. From shortlisting universities to my visa interview prep, the team was with me at every step.",
    image: avatar("Ananya Sharma", "f97316"),
  },
  {
    id: 2,
    name: "Rohan Mehta",
    course: "Engineering",
    university: "Tomsk Polytechnic University",
    country: "Russia",
    flag: "🇷🇺",
    rating: 5,
    review:
      "The detailed comparison of tuition fees and living costs helped my family make a confident decision. I'm now thriving in my mechanical engineering program.",
    image: avatar("Rohan Mehta", "0a2540"),
  },
  {
    id: 3,
    name: "Arjun Singh",
    course: "MBA",
    university: "Technical University of Munich",
    country: "Germany",
    flag: "🇩🇪",
    rating: 5,
    review:
      "Getting into a top German B-school felt out of reach until I found the right guidance. The SOP review sessions made all the difference.",
    image: avatar("Arjun Singh", "f97316"),
  },
  {
    id: 4,
    name: "Priya Nair",
    course: "MBBS",
    university: "Tbilisi State Medical University",
    country: "Georgia",
    flag: "🇬🇪",
    rating: 4,
    review:
      "Transparent counseling with no hidden surprises. My visa was approved quickly and I felt prepared for life in Georgia from day one.",
    image: avatar("Priya Nair", "0a2540"),
  },
  {
    id: 5,
    name: "Karan Patel",
    course: "Engineering",
    university: "Peter the Great St. Petersburg",
    country: "Russia",
    flag: "🇷🇺",
    rating: 5,
    review:
      "The team treated my ambitions like their own. Pre-departure orientation made arriving in a new country far less intimidating.",
    image: avatar("Karan Patel", "f97316"),
  },
  {
    id: 6,
    name: "Sneha Reddy",
    course: "MBBS",
    university: "Al-Farabi Kazakh National University",
    country: "Kazakhstan",
    flag: "🇰🇿",
    rating: 5,
    review:
      "Affordable medical education without compromising on quality. I'm grateful for the honest advice that shaped my future.",
    image: avatar("Sneha Reddy", "0a2540"),
  },
  {
    id: 7,
    name: "Aditya Verma",
    course: "MBA",
    university: "Mannheim Business School",
    country: "Germany",
    flag: "🇩🇪",
    rating: 5,
    review:
      "From GMAT planning to scholarship applications, every milestone was mapped out clearly. Highly recommend for serious MBA aspirants.",
    image: avatar("Aditya Verma", "f97316"),
  },
  {
    id: 8,
    name: "Meera Iyer",
    course: "MBBS",
    university: "Caucasus International University",
    country: "Georgia",
    flag: "🇬🇪",
    rating: 4,
    review:
      "The counselors patiently answered every question my parents had. That trust is exactly why I recommend them to my juniors.",
    image: avatar("Meera Iyer", "0a2540"),
  },
  {
    id: 9,
    name: "Vikram Joshi",
    course: "Engineering",
    university: "RWTH Aachen University",
    country: "Germany",
    flag: "🇩🇪",
    rating: 5,
    review:
      "Studying engineering in Germany at near-zero tuition felt unreal. The application support was meticulous and genuinely caring.",
    image: avatar("Vikram Joshi", "f97316"),
  },
];

export const courseFilters: ("All" | Course)[] = ["All", "MBBS", "Engineering", "MBA"];
export const countryFilters: Country[] = ["Kazakhstan", "Russia", "Georgia", "Germany"];

// ── Student journey timeline ───────────────────────────────────
export interface JourneyStep {
  id: number;
  title: string;
  description: string;
  icon: "dream" | "counseling" | "admission" | "visa" | "travel" | "enrollment";
}

export const journeySteps: JourneyStep[] = [
  { id: 1, title: "The Dream", description: "It begins with an ambition — to study at a world-class university abroad.", icon: "dream" },
  { id: 2, title: "Counseling", description: "Personalized 1-on-1 sessions to match your goals, budget, and profile.", icon: "counseling" },
  { id: 3, title: "Admission", description: "Application support, SOP reviews, and securing your offer letter.", icon: "admission" },
  { id: 4, title: "Visa", description: "End-to-end visa documentation and mock interview preparation.", icon: "visa" },
  { id: 5, title: "Travel", description: "Flight bookings, forex, and pre-departure orientation handled.", icon: "travel" },
  { id: 6, title: "University Enrollment", description: "Welcome to campus — your global journey officially begins.", icon: "enrollment" },
];

// ── Parent testimonials ────────────────────────────────────────
export interface ParentTestimonial {
  id: number;
  name: string;
  relation: string;
  rating: number;
  review: string;
  image: string;
}

export const parentTestimonials: ParentTestimonial[] = [
  {
    id: 1,
    name: "Mr. Suresh Sharma",
    relation: "Father of Ananya, MBBS – Kazakhstan",
    rating: 5,
    review:
      "As parents, our biggest worry was sending our daughter abroad. The team's transparency and constant communication gave us complete peace of mind.",
    image: avatar("Suresh Sharma", "0a2540"),
  },
  {
    id: 2,
    name: "Mrs. Lakshmi Reddy",
    relation: "Mother of Sneha, MBBS – Kazakhstan",
    rating: 5,
    review:
      "Every fee, every step was explained honestly. We never felt pressured and always felt heard. Truly a family-first approach.",
    image: avatar("Lakshmi Reddy", "f97316"),
  },
  {
    id: 3,
    name: "Mr. Rajesh Patel",
    relation: "Father of Karan, Engineering – Russia",
    rating: 5,
    review:
      "From visa to accommodation, they handled details we didn't even know to ask about. I recommend them to every parent in our circle.",
    image: avatar("Rajesh Patel", "0a2540"),
  },
];

// ── Big social-proof counters ──────────────────────────────────
export interface SocialStat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  decimals?: number;
}

export const socialStats: SocialStat[] = [
  { id: "placed", label: "Students Placed", value: 15000, suffix: "+" },
  { id: "visa", label: "Visa Success Rate", value: 98, suffix: "%" },
  { id: "uni", label: "Universities", value: 500, suffix: "+" },
  { id: "countries", label: "Countries", value: 35, suffix: "+" },
];

// ── University / partner testimonials ──────────────────────────
export interface PartnerTestimonial {
  id: number;
  name: string;
  designation: string;
  university: string;
  logo: string;
  image: string;
  feedback: string;
}

export const partnerTestimonials: PartnerTestimonial[] = [
  {
    id: 1,
    name: "Dr. Aigerim Bekova",
    designation: "Dean of International Admissions",
    university: "Kazakh National Medical University",
    logo: avatar("KNMU", "1a5276"),
    image: avatar("Aigerim Bekova", "0a2540"),
    feedback:
      "The students referred to us arrive well-prepared and genuinely motivated. It's a partnership built on quality, not just numbers.",
  },
  {
    id: 2,
    name: "Prof. Dmitri Volkov",
    designation: "Head of International Office",
    university: "Tomsk Polytechnic University",
    logo: avatar("TPU", "1a5276"),
    image: avatar("Dmitri Volkov", "f97316"),
    feedback:
      "A reliable and professional partner. Their pre-screening ensures we welcome students who are ready to succeed in our programs.",
  },
  {
    id: 3,
    name: "Dr. Hannah Müller",
    designation: "International Relations Director",
    university: "Technical University of Munich",
    logo: avatar("TUM", "1a5276"),
    image: avatar("Hannah Muller", "0a2540"),
    feedback:
      "The documentation and academic readiness of referred applicants is consistently excellent. A truly dependable collaboration.",
  },
];

// ── Student gallery ────────────────────────────────────────────
export interface GalleryItem {
  id: number;
  caption: string;
  image: string;
  span: "tall" | "wide" | "normal";
}

export const galleryItems: GalleryItem[] = [
  { id: 1, caption: "Campus life in Almaty", image: "/images/mock/gallery_campus.png", span: "tall" },
  { id: 2, caption: "Admission letter day", image: "/images/mock/gallery_campus.png", span: "wide" },
  { id: 3, caption: "Airport departure", image: "/images/mock/gallery_airport.png", span: "normal" },
  { id: 4, caption: "Graduation moments", image: "/images/mock/gallery_grad.png", span: "tall" },
  { id: 5, caption: "First day on campus", image: "/images/mock/gallery_campus.png", span: "wide" },
  { id: 6, caption: "Friends from across the world", image: "/images/mock/gallery_campus.png", span: "normal" },
  { id: 7, caption: "Winter in St. Petersburg", image: "/images/mock/gallery_campus.png", span: "normal" },
  { id: 8, caption: "Convocation ceremony", image: "/images/mock/gallery_grad.png", span: "normal" },
];

// ── Google reviews ─────────────────────────────────────────────
export interface GoogleReview {
  id: number;
  name: string;
  rating: number;
  date: string;
  review: string;
  image: string;
}

export const googleOverallRating = 4.9;
export const googleReviewCount = 2847;

export const googleReviews: GoogleReview[] = [
  {
    id: 1,
    name: "Nikhil Agarwal",
    rating: 5,
    date: "2 weeks ago",
    review:
      "Best decision for my MBBS abroad journey. Genuine, knowledgeable, and always reachable. Worth every star.",
    image: avatar("Nikhil Agarwal", "f97316"),
  },
  {
    id: 2,
    name: "Divya Menon",
    rating: 5,
    date: "1 month ago",
    review:
      "They turned a stressful process into a smooth experience. My visa got approved without a single hiccup.",
    image: avatar("Divya Menon", "0a2540"),
  },
  {
    id: 3,
    name: "Sahil Khanna",
    rating: 5,
    date: "1 month ago",
    review:
      "Transparent counseling and zero false promises. I appreciated how honest they were about every option.",
    image: avatar("Sahil Khanna", "f97316"),
  },
  {
    id: 4,
    name: "Riya Kapoor",
    rating: 4,
    date: "2 months ago",
    review:
      "Very supportive team. They followed up regularly and made sure I never missed a deadline.",
    image: avatar("Riya Kapoor", "0a2540"),
  },
  {
    id: 5,
    name: "Mohammed Faisal",
    rating: 5,
    date: "3 months ago",
    review:
      "Excellent guidance for engineering admissions in Russia. Highly professional and student-friendly.",
    image: avatar("Mohammed Faisal", "f97316"),
  },
];
