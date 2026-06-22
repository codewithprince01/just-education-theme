import { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
}

/** Shared, accessible section header used across the testimonial page. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`max-w-2xl mb-12 ${
        align === "center" ? "mx-auto text-center" : "text-left"
      }`}
    >
      {eyebrow && (
        <span
          className={`inline-block text-xs font-bold uppercase tracking-widest mb-3 ${
            light ? "text-orange-300" : "text-orange-500"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl md:text-4xl font-extrabold leading-tight ${
          light ? "text-white" : "text-[#0a2540]"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            light ? "text-blue-100/80" : "text-gray-500"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
