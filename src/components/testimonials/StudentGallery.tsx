import { galleryItems } from "../../data/testimonialsData";
import SectionHeading from "./SectionHeading";

const spanClasses: Record<string, string> = {
  tall: "row-span-2",
  wide: "sm:col-span-2",
  normal: "",
};

export default function StudentGallery() {
  return (
    <section className="bg-[#f8fafc] py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionHeading
          eyebrow="Life Abroad"
          title="Moments That Matter"
          description="From admission letters to graduation caps — a glimpse into the milestones our students live every day."
        />

        <div className="grid grid-flow-dense auto-rows-[180px] grid-cols-2 gap-4 md:grid-cols-4">
          {galleryItems.map((item) => (
            <figure
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 ${
                spanClasses[item.span]
              }`}
            >
              <img
                src={item.image}
                alt={item.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 p-4 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
