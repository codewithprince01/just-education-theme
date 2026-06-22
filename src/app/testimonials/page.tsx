import TestimonialHero from "../../components/testimonials/TestimonialHero";
import VideoTestimonials from "../../components/testimonials/VideoTestimonials";
import SuccessStories from "../../components/testimonials/SuccessStories";
import JourneyTimeline from "../../components/testimonials/JourneyTimeline";
import ParentTestimonials from "../../components/testimonials/ParentTestimonials";
import SocialProofStats from "../../components/testimonials/SocialProofStats";
import PartnerTestimonials from "../../components/testimonials/PartnerTestimonials";
import StudentGallery from "../../components/testimonials/StudentGallery";
import GoogleReviews from "../../components/testimonials/GoogleReviews";
import FinalCTA from "../../components/testimonials/FinalCTA";
import Reveal from "@/components/about/Reveal";

export const metadata = {
  title: "Student Success Stories & Testimonials | Just Education",
  description:
    "Hear from students who achieved their study-abroad dreams. Real video testimonials, success stories, parent reviews, and verified Google ratings.",
};

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <TestimonialHero />
      <Reveal><VideoTestimonials /></Reveal>
      <Reveal><SuccessStories /></Reveal>
      <Reveal><JourneyTimeline /></Reveal>
      <Reveal><ParentTestimonials /></Reveal>
      <Reveal><SocialProofStats /></Reveal>
      <Reveal><PartnerTestimonials /></Reveal>
      <Reveal><StudentGallery /></Reveal>
      <Reveal><GoogleReviews /></Reveal>
      <Reveal><FinalCTA /></Reveal>
    </div>
  );
}
