export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterGroup {
  id: string;
  title: string;
  type: 'checkbox' | 'radio' | 'searchable-select';
  options: FilterOption[];
  placeholder?: string;
}

// Location Hierarchy configuration type
export interface LocationNode {
  value: string;
  label: string;
  children?: LocationNode[];
}

export const directoryCategories = [
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

// Rich Location Hierarchy (Country -> State -> City -> Locality)
export const locationData: LocationNode[] = [
  {
    value: 'india',
    label: 'India',
    children: [
      {
        value: 'maharashtra',
        label: 'Maharashtra',
        children: [
          {
            value: 'pune',
            label: 'Pune',
            children: [
              { value: 'kothrud', label: 'Kothrud' },
              { value: 'hinjewadi', label: 'Hinjewadi' },
              { value: 'wakad', label: 'Wakad' },
              { value: 'viman-nagar', label: 'Viman Nagar' },
              { value: 'deccan', label: 'Deccan Gymkhana' },
              { value: 'shivajinagar', label: 'Shivajinagar' }
            ]
          },
          {
            value: 'mumbai',
            label: 'Mumbai',
            children: [
              { value: 'bandra', label: 'Bandra' },
              { value: 'andheri', label: 'Andheri' },
              { value: 'colaba', label: 'Colaba' },
              { value: 'powai', label: 'Powai' },
              { value: 'dadar', label: 'Dadar' }
            ]
          },
          {
            value: 'nagpur',
            label: 'Nagpur',
            children: [
              { value: 'dharampeth', label: 'Dharampeth' },
              { value: 'sadar', label: 'Sadar' }
            ]
          }
        ]
      },
      {
        value: 'karnataka',
        label: 'Karnataka',
        children: [
          {
            value: 'bangalore',
            label: 'Bangalore',
            children: [
              { value: 'koramangala', label: 'Koramangala' },
              { value: 'indiranagar', label: 'Indiranagar' },
              { value: 'jayanagar', label: 'Jayanagar' },
              { value: 'whitefield', label: 'Whitefield' }
            ]
          }
        ]
      },
      {
        value: 'delhi-state',
        label: 'Delhi NCR',
        children: [
          {
            value: 'delhi',
            label: 'Delhi',
            children: [
              { value: 'connaught-place', label: 'Connaught Place' },
              { value: 'south-ex', label: 'South Extension' },
              { value: 'dwarka', label: 'Dwarka' },
              { value: 'karol-bagh', label: 'Karol Bagh' }
            ]
          }
        ]
      },
      {
        value: 'telangana',
        label: 'Telangana',
        children: [
          {
            value: 'hyderabad',
            label: 'Hyderabad',
            children: [
              { value: 'gachibowli', label: 'Gachibowli' },
              { value: 'madhapur', label: 'Madhapur' },
              { value: 'secunderabad', label: 'Secunderabad' }
            ]
          }
        ]
      },
      {
        value: 'tamil-nadu',
        label: 'Tamil Nadu',
        children: [
          {
            value: 'chennai',
            label: 'Chennai',
            children: [
              { value: 'adyar', label: 'Adyar' },
              { value: 't-nagar', label: 'T. Nagar' },
              { value: 'velachery', label: 'Velachery' }
            ]
          }
        ]
      }
    ]
  },
  {
    value: 'usa',
    label: 'United States',
    children: [
      {
        value: 'california',
        label: 'California',
        children: [
          {
            value: 'san-francisco',
            label: 'San Francisco',
            children: [
              { value: 'downtown', label: 'Downtown' },
              { value: 'mission-district', label: 'Mission District' }
            ]
          },
          {
            value: 'los-angeles',
            label: 'Los Angeles',
            children: [
              { value: 'westwood', label: 'Westwood' },
              { value: 'pasadena', label: 'Pasadena' }
            ]
          }
        ]
      },
      {
        value: 'new-york-state',
        label: 'New York',
        children: [
          {
            value: 'new-york-city',
            label: 'New York City',
            children: [
              { value: 'manhattan', label: 'Manhattan' },
              { value: 'brooklyn', label: 'Brooklyn' }
            ]
          }
        ]
      }
    ]
  },
  {
    value: 'uk',
    label: 'United Kingdom',
    children: [
      {
        value: 'england',
        label: 'England',
        children: [
          {
            value: 'london',
            label: 'London',
            children: [
              { value: 'bloomsbury', label: 'Bloomsbury' },
              { value: 'kensington', label: 'Kensington' }
            ]
          },
          {
            value: 'oxford',
            label: 'Oxford',
            children: [
              { value: 'city-centre', label: 'City Centre' }
            ]
          }
        ]
      }
    ]
  }
];

// Helper options lists
export const streamsList = [
  'Engineering', 'Computer Science', 'Information Technology', 'Artificial Intelligence', 'Data Science', 'Cyber Security',
  'Electronics', 'Mechanical', 'Civil', 'Electrical', 'Aerospace', 'Biotechnology', 'Medical', 'MBBS', 'BDS',
  'Nursing', 'Pharmacy', 'Physiotherapy', 'Management', 'MBA', 'BBA', 'Commerce', 'Accounting', 'Finance',
  'Economics', 'Law', 'Arts', 'Humanities', 'Psychology', 'Sociology', 'Design', 'Fashion Design', 'Interior Design',
  'Architecture', 'Journalism', 'Hotel Management', 'Aviation', 'Agriculture', 'Veterinary', 'Education', 'Fine Arts'
].map(s => ({ value: s.toLowerCase().replace(/ /g, '-'), label: s }));

export const degreesList = [
  'Certificate', 'Diploma', 'Advanced Diploma', 'Associate Degree', 'Bachelors', 'Masters', 'Doctorate',
  'Fellowship', 'Executive Program', 'Integrated Program'
].map(d => ({ value: d.toLowerCase().replace(/ /g, '-'), label: d }));

export const examsList = [
  'JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE', 'SRMJEEE', 'COMEDK', 'MHT CET',
  'NEET UG', 'NEET PG', 'INI CET',
  'CAT', 'MAT', 'XAT', 'SNAP', 'NMAT', 'CMAT',
  'CLAT', 'AILET', 'LSAT',
  'IELTS', 'TOEFL', 'GRE', 'GMAT', 'SAT', 'PTE',
  'UPSC', 'SSC', 'Banking', 'Railways'
].map(e => ({ value: e.toLowerCase().replace(/ /g, '-'), label: e }));

export const affiliationsList = [
  'UGC', 'AICTE', 'NAAC', 'NBA', 'NMC', 'PCI', 'INC', 'BCI'
].map(a => ({ value: a.toLowerCase(), label: a }));

export const schoolBoardsList = [
  'CBSE', 'ICSE', 'ISC', 'IB', 'IGCSE', 'Cambridge', 'State Board'
].map(b => ({ value: b.toLowerCase().replace(/ /g, '-'), label: b }));

export const facilitiesList = [
  // Academic
  'Library', 'Digital Library', 'Smart Classrooms', 'Research Labs', 'Computer Labs', 'Language Labs',
  // Campus
  'Hostel', 'Transport', 'Cafeteria', 'Auditorium', 'Conference Hall', 'Medical Center',
  // Sports
  'Cricket Ground', 'Football Ground', 'Basketball Court', 'Tennis Court', 'Swimming Pool', 'Gymnasium',
  // Tech
  'WiFi Campus', 'ERP System', 'LMS Portal', 'Student Mobile App',
  // Access
  'Wheelchair Access', 'Disabled Friendly Infrastructure'
].map(f => ({ value: f.toLowerCase().replace(/ /g, '-'), label: f }));

export const ratingsList = [
  { value: '4.5', label: '4.5 ★ & Above' },
  { value: '4.0', label: '4.0 ★ & Above' },
  { value: '3.5', label: '3.5 ★ & Above' },
  { value: '3.0', label: '3.0 ★ & Above' }
];

export const priceRangesList = [
  { value: 'free', label: 'Free (₹0)' },
  { value: 'budget', label: 'Budget (Under ₹25k)' },
  { value: 'mid', label: 'Mid Range (₹25k - ₹1L)' },
  { value: 'premium', label: 'Premium (Above ₹1L)' }
];

export const establishedYearsList = [
  { value: 'before-1980', label: 'Before 1980' },
  { value: '1980-2000', label: '1980 - 2000' },
  { value: '2000-2010', label: '2000 - 2010' },
  { value: 'after-2010', label: 'After 2010' }
];

// Reusable Global Filters (Common for all categories)
export const globalFiltersConfig: FilterGroup[] = [
  {
    id: 'country',
    title: 'Country',
    type: 'searchable-select',
    placeholder: 'Select Country...',
    options: locationData.map(node => ({ value: node.value, label: node.label }))
  },
  {
    id: 'state',
    title: 'State',
    type: 'searchable-select',
    placeholder: 'Select State...',
    options: locationData.flatMap(c => c.children || []).map(node => ({ value: node.value, label: node.label }))
  },
  {
    id: 'city',
    title: 'City',
    type: 'searchable-select',
    placeholder: 'Select City...',
    options: locationData.flatMap(c => c.children || []).flatMap(s => s.children || []).map(node => ({ value: node.value, label: node.label }))
  },
  {
    id: 'locality',
    title: 'Area / Locality',
    type: 'searchable-select',
    placeholder: 'Select Locality...',
    options: locationData.flatMap(c => c.children || []).flatMap(s => s.children || []).flatMap(ct => ct.children || []).map(node => ({ value: node.value, label: node.label }))
  },
  {
    id: 'rating',
    title: 'Ratings & Reviews',
    type: 'radio',
    options: ratingsList
  },
  {
    id: 'verification',
    title: 'Verification & Status',
    type: 'checkbox',
    options: [
      { value: 'verified', label: 'Verified Listing' },
      { value: 'featured', label: 'Featured Listing' },
      { value: 'premium', label: 'Premium Sponsor' }
    ]
  },
  {
    id: 'availability',
    title: 'Availability',
    type: 'checkbox',
    options: [
      { value: 'open-now', label: 'Open Now' },
      { value: 'admissions-open', label: 'Admissions Open' },
      { value: 'applications-open', label: 'Applications Open' }
    ]
  },
  {
    id: 'service-mode',
    title: 'Service Mode',
    type: 'checkbox',
    options: [
      { value: 'online', label: 'Online / Remote' },
      { value: 'offline', label: 'Offline / On-Campus' },
      { value: 'hybrid', label: 'Hybrid Model' }
    ]
  },
  {
    id: 'pricing',
    title: 'Pricing Tiers',
    type: 'checkbox',
    options: priceRangesList
  },
  {
    id: 'est-year',
    title: 'Established Year',
    type: 'checkbox',
    options: establishedYearsList
  },
  {
    id: 'languages',
    title: 'Languages Offered',
    type: 'checkbox',
    options: [
      { value: 'english', label: 'English' },
      { value: 'hindi', label: 'Hindi' },
      { value: 'regional', label: 'Regional Language' }
    ]
  },
  {
    id: 'gender-accepted',
    title: 'Gender Admitted',
    type: 'checkbox',
    options: [
      { value: 'coed', label: 'Co-Educational (Co-ed)' },
      { value: 'boys', label: 'Boys Only' },
      { value: 'girls', label: 'Girls Only' }
    ]
  }
];

// Category-Specific Filters Configuration Map
export const categoryFiltersConfig: Record<string, FilterGroup[]> = {
  Universities: [
    {
      id: 'stream',
      title: 'Academic Stream',
      type: 'searchable-select',
      placeholder: 'Search Stream...',
      options: streamsList
    },
    {
      id: 'degree',
      title: 'Degree Offered',
      type: 'searchable-select',
      placeholder: 'Search Degree...',
      options: degreesList
    },
    {
      id: 'program-type',
      title: 'Program Type',
      type: 'checkbox',
      options: [
        { value: 'full-time', label: 'Full Time' },
        { value: 'part-time', label: 'Part Time' },
        { value: 'distance', label: 'Distance Learning' },
        { value: 'online', label: 'Online' }
      ]
    },
    {
      id: 'exams',
      title: 'Entrance Exams Accepted',
      type: 'searchable-select',
      placeholder: 'Search Exams...',
      options: examsList
    },
    {
      id: 'university-type',
      title: 'University Type',
      type: 'checkbox',
      options: [
        { value: 'central', label: 'Central University' },
        { value: 'state', label: 'State University' },
        { value: 'private', label: 'Private University' },
        { value: 'deemed', label: 'Deemed University' },
        { value: 'open', label: 'Open University' },
        { value: 'international', label: 'International University' }
      ]
    },
    {
      id: 'affiliation',
      title: 'Recognitions / Affiliation',
      type: 'checkbox',
      options: affiliationsList
    },
    {
      id: 'facilities',
      title: 'Campus Facilities',
      type: 'searchable-select',
      placeholder: 'Search Facilities...',
      options: facilitiesList
    },
    {
      id: 'placement-package',
      title: 'Average Placement Package',
      type: 'checkbox',
      options: [
        { value: 'under-3', label: 'Below ₹3 LPA' },
        { value: '3-5', label: '₹3 - ₹5 LPA' },
        { value: '5-10', label: '₹5 - ₹10 LPA' },
        { value: '10-20', label: '₹10 - ₹20 LPA' },
        { value: 'above-20', label: '₹20+ LPA' }
      ]
    },
    {
      id: 'rankings',
      title: 'Accreditations & Rankings',
      type: 'checkbox',
      options: [
        { value: 'nirf', label: 'NIRF Ranked' },
        { value: 'qs', label: 'QS Ranked' },
        { value: 'the', label: 'Times Higher Education Ranked' },
        { value: 'naac-a-plus-plus', label: 'NAAC A++' },
        { value: 'naac-a-plus', label: 'NAAC A+' },
        { value: 'naac-a', label: 'NAAC A' },
        { value: 'nba', label: 'NBA Accredited' }
      ]
    }
  ],
  Colleges: [
    {
      id: 'stream',
      title: 'Academic Stream',
      type: 'searchable-select',
      placeholder: 'Search Stream...',
      options: streamsList
    },
    {
      id: 'degree',
      title: 'Degree Offered',
      type: 'searchable-select',
      placeholder: 'Search Degree...',
      options: degreesList
    },
    {
      id: 'exams',
      title: 'Entrance Exams Accepted',
      type: 'searchable-select',
      placeholder: 'Search Exams...',
      options: examsList
    },
    {
      id: 'college-category',
      title: 'College Category',
      type: 'checkbox',
      options: [
        { value: 'government', label: 'Government' },
        { value: 'private', label: 'Private' },
        { value: 'autonomous', label: 'Autonomous' },
        { value: 'aided', label: 'Government Aided' }
      ]
    },
    {
      id: 'facilities',
      title: 'Campus Facilities',
      type: 'searchable-select',
      placeholder: 'Search Facilities...',
      options: facilitiesList
    },
    {
      id: 'career-features',
      title: 'Career Opportunities',
      type: 'checkbox',
      options: [
        { value: 'placement', label: 'Placement Available' },
        { value: 'internship', label: 'Internship Opportunities' },
        { value: 'partnerships', label: 'Industry Partnerships' },
        { value: 'incubation', label: 'Startup Incubation' }
      ]
    }
  ],
  Schools: [
    {
      id: 'school-board',
      title: 'Academic Board',
      type: 'checkbox',
      options: schoolBoardsList
    },
    {
      id: 'school-type',
      title: 'School Type',
      type: 'checkbox',
      options: [
        { value: 'day-school', label: 'Day School' },
        { value: 'boarding-school', label: 'Boarding School' },
        { value: 'residential-school', label: 'Residential School' },
        { value: 'international-school', label: 'International School' }
      ]
    },
    {
      id: 'school-level',
      title: 'Admissions Level',
      type: 'checkbox',
      options: [
        { value: 'nursery', label: 'Nursery / Playgroup' },
        { value: 'primary', label: 'Primary School' },
        { value: 'secondary', label: 'Secondary School' },
        { value: 'senior-secondary', label: 'Senior Secondary (11th-12th)' }
      ]
    },
    {
      id: 'school-facilities',
      title: 'School Facilities',
      type: 'checkbox',
      options: [
        { value: 'smart-classes', label: 'Smart Classrooms' },
        { value: 'sports-facilities', label: 'Sports Complex' },
        { value: 'library', label: 'School Library' },
        { value: 'transport', label: 'School Bus / Transport' },
        { value: 'hostel', label: 'Hostel Facility' }
      ]
    }
  ],
  Libraries: [
    {
      id: 'library-type',
      title: 'Library Classification',
      type: 'checkbox',
      options: [
        { value: 'public', label: 'Public Library' },
        { value: 'academic', label: 'Academic Library' },
        { value: 'digital', label: 'Digital Library' },
        { value: 'research', label: 'Research Library' }
      ]
    },
    {
      id: 'library-resources',
      title: 'Resources Available',
      type: 'checkbox',
      options: [
        { value: 'books', label: 'Physical Books' },
        { value: 'journals', label: 'Scientific Journals' },
        { value: 'research-papers', label: 'Research Papers' },
        { value: 'e-books', label: 'E-Books & Audiobooks' }
      ]
    },
    {
      id: 'library-membership',
      title: 'Membership Mode',
      type: 'radio',
      options: [
        { value: 'free-access', label: 'Free / Open Access' },
        { value: 'paid-membership', label: 'Paid Subscription Needed' }
      ]
    }
  ],
  'Coaching Centers': [
    {
      id: 'coaching-exams',
      title: 'Target Exam Category',
      type: 'checkbox',
      options: [
        { value: 'jee', label: 'IIT JEE Prep' },
        { value: 'neet', label: 'NEET Medical Prep' },
        { value: 'upsc', label: 'UPSC Civil Services' },
        { value: 'ssc', label: 'SSC Exams' },
        { value: 'banking', label: 'Banking / IBPS' },
        { value: 'cat', label: 'CAT / MBA Prep' },
        { value: 'clat', label: 'CLAT Law Prep' },
        { value: 'ielts', label: 'IELTS / Study Abroad' }
      ]
    },
    {
      id: 'coaching-features',
      title: 'Coaching Amenities',
      type: 'checkbox',
      options: [
        { value: 'test-series', label: 'All India Test Series' },
        { value: 'recorded-classes', label: 'Recorded Lecture Access' },
        { value: 'doubt-support', label: '24x7 Doubt Solving' }
      ]
    }
  ],
  'Training Centers': [
    {
      id: 'training-domain',
      title: 'Training Domain',
      type: 'checkbox',
      options: [
        { value: 'it', label: 'Information Technology' },
        { value: 'data-science', label: 'Data Science & Analytics' },
        { value: 'ai', label: 'AI & Machine Learning' },
        { value: 'cyber-security', label: 'Cyber Security' },
        { value: 'cloud-computing', label: 'Cloud Computing' },
        { value: 'digital-marketing', label: 'Digital Marketing' },
        { value: 'graphic-design', label: 'Graphic Design' },
        { value: 'ui-ux', label: 'UI/UX Design' },
        { value: 'accounting', label: 'Accounting & GST' }
      ]
    },
    {
      id: 'training-certifications',
      title: 'Vendor Certifications',
      type: 'checkbox',
      options: [
        { value: 'aws', label: 'AWS Certified' },
        { value: 'azure', label: 'Microsoft Azure' },
        { value: 'google', label: 'Google Cloud (GCP)' },
        { value: 'cisco', label: 'Cisco (CCNA/CCNP)' },
        { value: 'sap', label: 'SAP Certifications' }
      ]
    },
    {
      id: 'training-duration',
      title: 'Course Duration',
      type: 'checkbox',
      options: [
        { value: 'under-3m', label: 'Under 3 Months' },
        { value: '3-6m', label: '3 to 6 Months' },
        { value: '6-12m', label: '6 to 12 Months' },
        { value: 'above-1y', label: '1+ Years' }
      ]
    }
  ],
  Consultants: [
    {
      id: 'consultant-type',
      title: 'Consultancy Service Type',
      type: 'checkbox',
      options: [
        { value: 'study-abroad', label: 'Study Abroad Consultants' },
        { value: 'admission-counsel', label: 'College Admission Guidance' },
        { value: 'career-counsel', label: 'Career Assessment & Advice' },
        { value: 'visa-counsel', label: 'Visa Application Support' },
        { value: 'loan-counsel', label: 'Education Loan Assistance' }
      ]
    },
    {
      id: 'consultant-countries',
      title: 'Destination Countries',
      type: 'checkbox',
      options: [
        { value: 'usa', label: 'United States (USA)' },
        { value: 'uk', label: 'United Kingdom (UK)' },
        { value: 'canada', label: 'Canada' },
        { value: 'australia', label: 'Australia' },
        { value: 'russia', label: 'Russia' },
        { value: 'kazakhstan', label: 'Kazakhstan' },
        { value: 'georgia', label: 'Georgia' }
      ]
    },
    {
      id: 'consultant-services',
      title: 'Assistance Services',
      type: 'checkbox',
      options: [
        { value: 'admissions', label: 'Admissions Processing' },
        { value: 'visa', label: 'Visa Processing' },
        { value: 'sop-lor', label: 'SOP & LOR Drafting' },
        { value: 'loans', label: 'Financial / Loan Liaison' },
        { value: 'scholarship-apply', label: 'Scholarship Application' }
      ]
    }
  ],
  'Research Centers': [
    {
      id: 'research-domain',
      title: 'Research Domain',
      type: 'checkbox',
      options: [
        { value: 'medical', label: 'Medical Research' },
        { value: 'clinical', label: 'Clinical Research' },
        { value: 'pharmaceutical', label: 'Pharmaceutical Research' },
        { value: 'biotech', label: 'Biotechnology Research' },
        { value: 'engineering', label: 'Engineering & Computing' },
        { value: 'ai', label: 'Artificial Intelligence' },
        { value: 'agriculture', label: 'Agricultural Science' }
      ]
    },
    {
      id: 'research-facilities',
      title: 'Scientific Infrastructure',
      type: 'checkbox',
      options: [
        { value: 'labs', label: 'Advanced Laboratories' },
        { value: 'publications', label: 'Journal Publications Desk' },
        { value: 'clinical-trials', label: 'Clinical Trials Wing' },
        { value: 'innovation-centers', label: 'Incubation & Patents Hub' }
      ]
    },
    {
      id: 'research-funding',
      title: 'Funding Type',
      type: 'checkbox',
      options: [
        { value: 'govt-funded', label: 'Government Sponsored' },
        { value: 'private-funded', label: 'Private / Corporate Funded' },
        { value: 'univ-funded', label: 'University Endowed' }
      ]
    }
  ],
  'Scholarship Providers': [
    {
      id: 'scholarship-type',
      title: 'Scholarship Class',
      type: 'checkbox',
      options: [
        { value: 'merit-based', label: 'Merit-Based Excellence' },
        { value: 'need-based', label: 'Need-Based / Financial Aid' },
        { value: 'sports-scholar', label: 'Sports Category' },
        { value: 'minority-scholar', label: 'Minority Category' },
        { value: 'women-scholar', label: 'Women Empowerment' },
        { value: 'intl-scholar', label: 'International Student Aid' }
      ]
    },
    {
      id: 'study-level',
      title: 'Target Study Level',
      type: 'checkbox',
      options: [
        { value: 'school', label: 'Schooling' },
        { value: 'ug', label: 'Undergraduate (UG)' },
        { value: 'pg', label: 'Postgraduate (PG)' },
        { value: 'phd', label: 'Doctorate (PhD)' }
      ]
    },
    {
      id: 'scholarship-coverage',
      title: 'Award Coverage',
      type: 'radio',
      options: [
        { value: 'full', label: 'Full Tuition Fee waiver (100%)' },
        { value: 'partial', label: 'Partial Tuition Waiver / Stipend' }
      ]
    },
    {
      id: 'scholarship-destination',
      title: 'Destination Target',
      type: 'checkbox',
      options: [
        { value: 'india', label: 'India' },
        { value: 'usa', label: 'USA' },
        { value: 'uk', label: 'UK' },
        { value: 'canada', label: 'Canada' },
        { value: 'australia', label: 'Australia' }
      ]
    }
  ],
  Hostels: [
    {
      id: 'hostel-type',
      title: 'Hostel Type',
      type: 'checkbox',
      options: [
        { value: 'boys', label: 'Boys Hostel' },
        { value: 'girls', label: 'Girls Hostel' },
        { value: 'students', label: 'Student Hostels' },
        { value: 'co-living', label: 'Co-Living / PG' }
      ]
    },
    {
      id: 'hostel-occupancy',
      title: 'Room Occupancy',
      type: 'checkbox',
      options: [
        { value: 'single', label: 'Single Occupancy' },
        { value: 'double', label: 'Double Sharing' },
        { value: 'triple', label: 'Triple Sharing' },
        { value: 'dorm', label: 'Dormitory Style' }
      ]
    },
    {
      id: 'hostel-amenities',
      title: 'Amenities Provided',
      type: 'checkbox',
      options: [
        { value: 'ac', label: 'Air Conditioned (AC)' },
        { value: 'wifi', label: 'High-Speed WiFi' },
        { value: 'food', label: 'Mess & Food Included' },
        { value: 'laundry', label: 'Laundry Facility' },
        { value: 'security', label: '24x7 Guard & CCTV' },
        { value: 'gym', label: 'Fitness Center / Gym' },
        { value: 'parking', label: 'Two/Four Wheeler Parking' }
      ]
    },
    {
      id: 'hostel-distance',
      title: 'Distance to Camps',
      type: 'checkbox',
      options: [
        { value: 'on-campus', label: 'On Campus' },
        { value: 'under-500m', label: 'Under 500 Meters' },
        { value: 'under-1k', label: 'Under 1 Kilometer' },
        { value: 'under-3k', label: 'Under 3 Kilometers' }
      ]
    }
  ]
};
