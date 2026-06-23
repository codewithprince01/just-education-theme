'use client';

import { CheckCircle2 } from 'lucide-react';
import { useCoachingData } from '@/context/CoachingContext';
import SectionHeading from './SectionHeading';

const WHY_CHOOSE = [
  'Produced India\'s No. 1 rankers in JEE, NEET & CAT consecutively for 4 years',
  'Expert faculty with IITian, AIIMS and IAS officer backgrounds',
  'Personalised mentorship with regular parent-teacher meetings',
  'Hybrid learning platform with 24/7 access to recorded lectures',
];

const METHODS = ['Conceptual Clarity', 'Problem-Based Learning', 'Spaced Repetition'];

export default function AboutInstitute() {
  const { institute } = useCoachingData();
  return (
    <section id="section-overview" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Image column (40%) */}
          <div className="lg:col-span-2">
            <img
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop"
              alt="APEX Coaching classroom"
              className="w-full rounded-2xl object-cover shadow-md aspect-[4/3]"
            />
          </div>

          {/* Content column (60%) */}
          <div className="lg:col-span-3">
            <SectionHeading
              badge="About Us"
              title={institute.name}
              subtitle="Two decades of academic excellence, one mission — your success."
            />

            <p className="text-gray-600 leading-relaxed mb-4">
              Founded in 2005 in the heart of Pune, APEX Coaching Institute has grown from a single classroom
              into Maharashtra&rsquo;s most trusted competitive exam coaching destination. We have guided over
              2.5 lakh students to their dream careers across engineering, medicine, civil services, banking,
              management, and more.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our philosophy centres on building a deep conceptual foundation rather than rote memorisation.
              With 85 expert faculties — including IITians, AIIMS doctors, IAS officers, and IIM alumni —
              we bring real-world achievement into every classroom, inspiring students to reach their full potential.
            </p>

            {/* Our Mission */}
            <h3 className="font-bold text-[#0a2540] text-lg mb-2">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed mb-5">
              To democratise access to quality coaching and empower every student — regardless of background —
              with the knowledge, skills, and mindset required to excel in India&rsquo;s most competitive examinations.
            </p>

            {/* Teaching Methodology */}
            <h3 className="font-bold text-[#0a2540] text-lg mb-3">Teaching Methodology</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {METHODS.map((m) => (
                <span key={m} className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium border border-blue-100">
                  {m}
                </span>
              ))}
            </div>

            {/* Why Choose Us */}
            <h3 className="font-bold text-[#0a2540] text-lg mb-3">Why Choose Us</h3>
            <ul className="flex flex-col gap-2.5 mb-6">
              {WHY_CHOOSE.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>

            {/* Our Vision */}
            <h3 className="font-bold text-[#0a2540] text-lg mb-2">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To be India&rsquo;s most impactful education organisation — one that not only produces toppers,
              but cultivates lifelong learners who contribute meaningfully to society and the nation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
