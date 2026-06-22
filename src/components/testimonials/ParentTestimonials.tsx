import { Quote, Heart } from "lucide-react";
import { parentTestimonials } from "../../data/testimonialsData";
import SectionHeading from "./SectionHeading";
import StarRating from "./StarRating";

export default function ParentTestimonials() {
  return (
    <section className="bg-[#f8fafc] py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionHeading
          eyebrow="Trusted by Families"
          title="What Parents Say"
          description="Sending a child abroad is a leap of faith. Here's why families trust us with their most important decision."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {parentTestimonials.map((parent) => (
            <article
              key={parent.id}
              className="group relative flex flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                  <Quote size={18} className="fill-current" />
                </span>
                <Heart
                  size={18}
                  className="text-gray-200 transition-colors group-hover:text-rose-400 group-hover:fill-rose-400"
                />
              </div>

              <p className="mt-5 flex-1 leading-relaxed text-gray-600">
                “{parent.review}”
              </p>

              <div className="mt-6 flex items-center gap-4 border-t border-gray-100 pt-5">
                <img
                  src={parent.image}
                  alt={parent.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <h3 className="font-bold text-[#0a2540]">{parent.name}</h3>
                  <p className="truncate text-xs text-gray-500">{parent.relation}</p>
                </div>
              </div>
              <StarRating rating={parent.rating} className="mt-3" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
