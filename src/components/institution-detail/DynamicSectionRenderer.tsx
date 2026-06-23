'use client';

import { useInstitution } from '@/context/InstitutionContext';
import { institutionLayoutConfig } from '@/config/institutionLayoutConfig';
import { getSectionMap } from '@/config/sectionMap';

export default function DynamicSectionRenderer() {
  const institution = useInstitution();
  const layout = institutionLayoutConfig[institution.type] ?? [];
  const sectionMap = getSectionMap(institution.type);

  return (
    <>
      {layout.map((sectionKey) => {
        const Component = sectionMap[sectionKey];
        if (!Component) return null;
        return <Component key={sectionKey} />;
      })}
    </>
  );
}
