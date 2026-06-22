import type { IconCard } from '@/data/languageCenterData';
import SectionHeading from '@/components/testimonials/SectionHeading';
import IconFeatureGrid from './IconFeatureGrid';

interface LcFacilitiesProps {
  facilities: IconCard[];
}

export default function LcFacilities({ facilities }: LcFacilitiesProps) {
  return (
    <section className="py-10 scroll-mt-24" id="facilities">
      <SectionHeading
        eyebrow="Facilities"
        title="A Campus Built for Learning"
        description="Modern, comfortable spaces and tools that make every session count."
      />
      <IconFeatureGrid items={facilities} accent="emerald" variant="tile" />
    </section>
  );
}
