// Top Study Places - shown on the homepage, each maps to a city page (/city/:citySlug)
export interface TopStudyPlace {
  name: string;
  slug: string;
}

export const topStudyPlaces: TopStudyPlace[] = [
  { name: 'Delhi NCR', slug: 'delhi-ncr' },
  { name: 'Bangalore', slug: 'bangalore' },
  { name: 'Hyderabad', slug: 'hyderabad' },
  { name: 'Pune', slug: 'pune' },
  { name: 'Mumbai', slug: 'mumbai' },
  { name: 'Chennai', slug: 'chennai' },
  { name: 'Kolkata', slug: 'kolkata' },
  { name: 'Bhopal', slug: 'bhopal' },
  { name: 'Indore', slug: 'indore' },
  { name: 'Nagpur', slug: 'nagpur' },
];
