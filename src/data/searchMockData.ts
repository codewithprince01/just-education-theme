import { topCollegesInCity, cityMeta, CollegeInCity } from './cityData';
import { examPage } from './jeeMain';
import { exams } from './exams';
import { directoryMockData, DirectoryItem } from './directoryMockData';

// 1. Programmatically extract the premium engineering colleges (NITs, IIITs, GFTIs) from JoSAA data
const topInstitutes = examPage.tabs?.[0]?.sections?.find(s => s.slug === 'top-institutes');
const bulletSections = topInstitutes?.content?.filter(item => item.type === 'bullets') || [];
const premiumCollegesRaw = bulletSections.flatMap(section => (section as { items: string[] }).items || []);

const cleanName = (name: string) => name.split(' (')[0].trim();

// 2. Map premium colleges to CollegeInCity structure, resolving their cities
const premiumColleges: CollegeInCity[] = premiumCollegesRaw.map((name, index) => {
  const cleanedName = cleanName(name);
  return {
    id: 2000 + index,
    name: cleanedName,
    type: cleanedName.startsWith('NIT') ? 'NIT' : cleanedName.startsWith('IIIT') ? 'IIIT' : 'GFTI',
    institutionType: 'COLLEGE',
    rating: 4.4 + (index % 5) * 0.1,
    reviews: 450 + (index * 37) % 1200,
    accreditation: 'NIRF Ranked',
    established: 1950 + (index * 9) % 60,
    image: `https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop&q=80`,
    courses: ['Engineering', 'Management'],
    courseTags: ['B.Tech', 'M.Tech', 'MBA'],
    programType: 'Full Time',
    collegeCategory: 'Government',
    examAccepted: ['JEE Main'],
    genderAccepted: 'Coed',
    fees: '₹95,000 - ₹2,20,000',
    placement: '92%',
    tag: 'Premium'
  };
});

// Helper list of cities associated with NITs, IIITs, and GFTIs
const additionalCities = [
  'Tiruchirappalli', 'Trichy', 'Warangal', 'Surathkal', 'Calicut',
  'Rourkela', 'Allahabad', 'Kurukshetra', 'Durgapur', 'Gwalior',
  'Jabalpur', 'Lucknow', 'Kancheepuram', 'Shibpur', 'Silchar',
  'Tezpur', 'Mesra', 'Vijayawada'
];

// Combine all cities from main study places and dynamic institute locations
export const mockCities = Array.from(new Set([
  ...Object.values(cityMeta).map((city) => city.name),
  ...additionalCities
])).sort();

// The 10 main education directory categories
export const mockCategories = [
  'Universities',
  'Colleges',
  'Schools',
  'Libraries',
  'Coaching Centers',
  'Training Centers',
  'Consultants',
  'Research Centers',
  'Scholarship Providers',
  'Hostels'
];

export interface SearchCollege extends CollegeInCity {
  uniqueId: string;
  citySlug: string;
  cityName: string;
  cityState: string;
}

// 3. Expose a unified database of search results
export const getSearchDatabase = (): SearchCollege[] => {
  const db: SearchCollege[] = [];

  // Add mock colleges across standard main cities
  Object.keys(cityMeta).forEach((citySlug) => {
    const city = cityMeta[citySlug];
    topCollegesInCity.forEach((college) => {
      db.push({
        ...college,
        uniqueId: `${citySlug}-${college.id}`,
        citySlug,
        cityName: city.name,
        cityState: city.state,
      });
    });
  });

  // Add premium colleges with actual city mappings
  premiumColleges.forEach((college) => {
    // Guess city name
    let cityName = 'Delhi';
    if (college.name.includes('Trichy') || college.name.includes('Tiruchirappalli')) cityName = 'Tiruchirappalli';
    else if (college.name.includes('Warangal')) cityName = 'Warangal';
    else if (college.name.includes('Surathkal')) cityName = 'Surathkal';
    else if (college.name.includes('Calicut')) cityName = 'Calicut';
    else if (college.name.includes('Rourkela')) cityName = 'Rourkela';
    else if (college.name.includes('Nagpur')) cityName = 'Nagpur';
    else if (college.name.includes('Jaipur')) cityName = 'Jaipur';
    else if (college.name.includes('Kurukshetra')) cityName = 'Kurukshetra';
    else if (college.name.includes('Durgapur')) cityName = 'Durgapur';
    else if (college.name.includes('Hyderabad')) cityName = 'Hyderabad';
    else if (college.name.includes('Bangalore')) cityName = 'Bangalore';
    else if (college.name.includes('Gwalior')) cityName = 'Gwalior';
    else if (college.name.includes('Jabalpur')) cityName = 'Jabalpur';
    else if (college.name.includes('Lucknow')) cityName = 'Lucknow';
    else if (college.name.includes('Kancheepuram')) cityName = 'Kancheepuram';
    else if (college.name.includes('Shibpur')) cityName = 'Shibpur';
    else if (college.name.includes('Silchar')) cityName = 'Silchar';
    else if (college.name.includes('Tezpur')) cityName = 'Tezpur';
    else if (college.name.includes('Mesra')) cityName = 'Mesra';
    else if (college.name.includes('Bhopal')) cityName = 'Bhopal';
    else if (college.name.includes('Vijayawada')) cityName = 'Vijayawada';
    else if (college.name.includes('Delhi')) cityName = 'Delhi';

    db.push({
      ...college,
      uniqueId: `premium-${college.id}`,
      citySlug: cityName.toLowerCase().replace(/ /g, '-'),
      cityName,
      cityState: 'India',
    });
  });

  // Add new directory mock data items mapped to SearchCollege structure
  directoryMockData.forEach((item, index) => {
    db.push({
      id: 3000 + index,
      uniqueId: `dir-${item.id}`,
      name: item.name,
      type: item.category,
      institutionType: item.category.toUpperCase().replace(/ /g, '_'),
      rating: item.rating,
      reviews: item.reviews,
      accreditation: item.verified ? 'Verified Listing' : 'Standard Listing',
      established: item.estYear,
      image: item.image,
      courses: item.attributes?.stream || item.attributes?.['coaching-exams'] || item.attributes?.['training-domain'] || [item.category],
      courseTags: item.attributes?.degree || item.attributes?.['school-level'] || [],
      programType: item.serviceMode,
      collegeCategory: item.pricing,
      examAccepted: item.attributes?.exams || [],
      genderAccepted: item.genderAccepted,
      fees: item.feeLabel,
      placement: item.attributes?.['placement-package'] || 'N/A',
      tag: item.tagline,
      citySlug: item.city,
      cityName: item.city.charAt(0).toUpperCase() + item.city.slice(1),
      cityState: item.state.charAt(0).toUpperCase() + item.state.slice(1),
    });
  });

  return db;
};

// 4. Expose autocomplete listings combining colleges, courses, cities, and exams
export const mockListings = [
  ...getSearchDatabase().map((item) => ({
    name: item.name,
    tags: [
      ...(item.courses || []),
      ...(item.courseTags || []),
      item.institutionType,
      item.type,
      ...(item.examPrep || []),
      ...(item.examAccepted || []),
      item.cityName,
      item.cityState
    ].filter(Boolean)
  })),
  ...exams.map((exam) => ({
    name: exam.name,
    tags: ['Exam', 'Entrance Exam', exam.fullName, exam.category]
  }))
];

