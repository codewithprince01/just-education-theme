import { BadgeCheck } from "lucide-react";
import { partnerTestimonials } from "../../data/testimonialsData";
import SectionHeading from "./SectionHeading";

export default function PartnerTestimonials() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionHeading
          eyebrow="University Partners"
          title="Endorsed by Institutions Worldwide"
          description="It's not just students who trust us — leading universities count on the quality and readiness of the applicants we refer."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {partnerTestimonials.map((partner) => (
            <article
              key={partner.id}
              className="group flex flex-col rounded-2xl border border-gray-100 bg-slate-50 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:bg-white hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <img
                  src={partner.logo}
                  alt={`${partner.university} logo`}
                  className="h-12 w-12 rounded-xl object-cover ring-1 ring-black/5"
                />
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                  <BadgeCheck size={14} /> Verified Partner
                </span>
              </div>

              <p className="mt-6 flex-1 leading-relaxed text-gray-600">
                “{partner.feedback}”
              </p>

              <div className="mt-6 flex items-center gap-4 border-t border-gray-200/70 pt-5">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <h3 className="font-bold text-[#0a2540]">{partner.name}</h3>
                  <p className="text-xs text-gray-500">{partner.designation}</p>
                  <p className="truncate text-xs font-medium text-orange-500">
                    {partner.university}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
