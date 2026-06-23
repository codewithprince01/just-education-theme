import type { Institution } from '@/types/institution';

export const nationalLibraryInstitution: Institution = {
  id: 4,
  slug: 'national-library',
  type: 'LIBRARY',
  name: 'National Library of India',
  tagline: 'Preserving Knowledge, Empowering Minds',
  description:
    'The National Library of India, located in Kolkata, is the largest public library in India and one of the largest in the world. Established in 1836 as the Calcutta Public Library and later reconstituted as the National Library in 1948, it is a statutory body under the Ministry of Culture, Government of India. The library serves as the repository of all significant printed material published in India and is designated as a depository library under the Delivery of Books and Newspapers Act, 1954.',
  logo: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=200&fit=crop',
  banner: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=1400&h=500&fit=crop',
  isVerified: true,
  accreditations: ['Govt. of India', 'UNESCO Heritage Site', 'IFLA Member'],
  metrics: {
    rating: 4.6,
    reviewCount: 2100,
    established: 1836,
    location: 'Belvedere Road, Kolkata',
    collections: '22 Million+',
    dailyVisitors: '500+',
    researchPapers: '10,000+',
  },
  ratingDistribution: {
    5: 1350,
    4: 520,
    3: 160,
    2: 50,
    1: 20,
  },
  contact: {
    phone: '+91-33-2479-1382',
    email: 'nlib@vsnl.net',
    website: 'https://nationallibrary.gov.in',
    address: 'Belvedere Road, Alipore, Kolkata – 700027, West Bengal',
  },
  similar: [
    {
      id: 'delhi-public-library',
      name: 'Delhi Public Library',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=250&fit=crop',
      rating: 4.3,
      location: 'S.P. Mukherjee Marg, Delhi',
      type: 'LIBRARY',
      slug: 'delhi-public-library',
    },
    {
      id: 'connemara-library',
      name: 'Connemara Public Library',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop',
      rating: 4.4,
      location: 'Egmore, Chennai',
      type: 'LIBRARY',
      slug: 'connemara-public-library',
    },
    {
      id: 'ndl-india',
      name: 'National Digital Library of India (NDLI)',
      image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=400&h=250&fit=crop',
      rating: 4.5,
      location: 'IIT Kharagpur (Online)',
      type: 'LIBRARY',
      slug: 'national-digital-library',
    },
  ],
  sections: {
    about: {
      description:
        'The National Library of India stands as the custodian of India\'s written heritage. Housed in the iconic Belvedere Estate — once the winter residence of the Lieutenant-Governor of Bengal — the library\'s neo-classical architecture is itself a monument to history. The library holds books in over 40 languages, rare manuscripts, colonial-era maps, government publications, and an ever-expanding digital archive that is accessible to researchers and citizens alike.',
      mission:
        'To collect, preserve, and provide access to the entire published output of India and significant publications about India from the world, serving the information needs of scholars, researchers, and citizens.',
      vision:
        'To be the central repository and gateway to knowledge in India, leveraging digital technology to make India\'s literary and intellectual heritage universally accessible.',
      highlights: [
        'Statutory depository for all publications under the Delivery of Books Act, 1954',
        'Rare manuscripts section with 10,000+ hand-written documents',
        'UNESCO Memory of the World Programme participant',
        'Digital catalogue of 2 million+ titles accessible online',
        'Dedicated reading rooms for researchers, scholars, and the visually impaired',
        'Annual reading festivals and heritage talks attracting 50,000+ participants',
      ],
    },
    collections: [
      {
        id: 'coll-books',
        category: 'Books & Monographs',
        count: 2200000,
        icon: 'BookOpen',
        description: 'Comprehensive collection spanning literature, science, history, law, and arts in 40+ languages.',
      },
      {
        id: 'coll-journals',
        category: 'Journals & Periodicals',
        count: 50000,
        icon: 'FileText',
        description: 'Academic and popular journals from India and around the world, including historical runs dating back to the 19th century.',
      },
      {
        id: 'coll-manuscripts',
        category: 'Rare Manuscripts',
        count: 10000,
        icon: 'Scroll',
        description: 'Hand-written manuscripts in Sanskrit, Persian, Urdu, Bengali, and other classical languages — some dating back to the 12th century.',
      },
      {
        id: 'coll-maps',
        category: 'Maps & Charts',
        count: 35000,
        icon: 'Map',
        description: 'Historical and contemporary maps of India and the Indian subcontinent, including rare colonial-era cartographic collections.',
      },
      {
        id: 'coll-digital',
        category: 'Digital Resources',
        count: 1500000,
        icon: 'Monitor',
        description: 'Digitised books, government documents, theses, and multimedia materials accessible through the library\'s online portal.',
      },
      {
        id: 'coll-periodicals',
        category: 'Newspapers & Periodicals Archive',
        count: 100000,
        icon: 'Newspaper',
        description: 'Archival collection of Indian and international newspapers, some dating back to the 1780s, including microfilm archives.',
      },
    ],
    membership: [
      {
        id: 'mem-daily',
        name: 'Day Pass',
        fee: 50,
        duration: '1 Day',
        features: [
          'Access to general reading rooms',
          'On-site access to physical collection',
          'Wi-Fi (2 hours)',
          'Visitor locker facility',
        ],
        isPopular: false,
      },
      {
        id: 'mem-monthly',
        name: 'Monthly Membership',
        fee: 500,
        duration: '1 Month',
        features: [
          'Unlimited reading room access',
          'Access to digital catalogue',
          'Reference assistance services',
          'Borrowing: up to 3 books',
          'Wi-Fi – unlimited',
          'Discounted printing & scanning',
        ],
        isPopular: true,
      },
      {
        id: 'mem-annual',
        name: 'Annual Membership',
        fee: 2500,
        duration: '1 Year',
        features: [
          'All Monthly Membership benefits',
          'Borrowing: up to 6 books',
          'Access to rare documents section (by appointment)',
          'Priority access to special collections',
          'Free participation in events & workshops',
          'Access to digital archives & e-resources',
          'Inter-library loan requests',
        ],
        isPopular: false,
      },
    ],
    digitalResources: [
      {
        id: 'dr-jstor',
        name: 'JSTOR Academic Database',
        category: 'Academic Journals',
        description:
          'Access to over 2,500 academic journals across humanities, social sciences, and sciences through JSTOR\'s full-text archive.',
        accessType: 'member',
      },
      {
        id: 'dr-shodhganga',
        name: 'Shodhganga – Indian Theses Repository',
        category: 'Research & Theses',
        description:
          'A reservoir of Indian electronic theses and dissertations, hosted by INFLIBNET. Over 6 lakh PhD theses available in full text.',
        accessType: 'free',
      },
      {
        id: 'dr-ndl',
        name: 'National Digital Library of India (NDLI)',
        category: 'E-books & Learning',
        description:
          'Free access to 6 crore+ learning resources including textbooks, audio-visual content, and research papers curated by IIT Kharagpur.',
        accessType: 'free',
      },
      {
        id: 'dr-intranet',
        name: 'National Library Intranet Archives',
        category: 'Digitised Heritage',
        description:
          'Internal digital archive of digitised manuscripts, rare books, and historical documents accessible only to on-site registered members.',
        accessType: 'member',
      },
    ],
    events: [
      {
        id: 'event-1',
        title: 'Monsoon Reading Festival 2025',
        date: '2025-07-20',
        description:
          'A month-long celebration of Indian literature featuring author talks, book launches, storytelling sessions, and literary quizzes across all genres.',
        type: 'reading',
      },
      {
        id: 'event-2',
        title: 'Workshop: Introduction to Archival Research',
        date: '2025-07-28',
        description:
          'A two-day hands-on workshop for researchers and students on how to navigate primary sources, manuscripts, and historical archives held at the National Library.',
        type: 'workshop',
      },
      {
        id: 'event-3',
        title: 'Talk: Bengal\'s Literary Renaissance – 19th Century',
        date: '2025-08-10',
        description:
          'A scholarly lecture by Dr. Supriya Chaudhuri tracing the intellectual and literary movement that shaped modern Bengali literature and Indian national consciousness.',
        type: 'talk',
      },
      {
        id: 'event-4',
        title: 'Exhibition: Maps That Made India',
        date: '2025-08-18',
        description:
          'A curated exhibition of rare and historically significant maps from the library\'s cartographic collection, tracing India\'s geographical history from colonial surveys to modern atlases.',
        type: 'exhibition',
      },
    ],
    facilities: [
      {
        id: 'facility-nl-1',
        name: 'Heritage Reading Rooms',
        icon: 'BookOpen',
        description: 'Six beautifully restored reading rooms in the heritage Belvedere building, accommodating 500+ readers simultaneously.',
      },
      {
        id: 'facility-nl-2',
        name: 'Digital Reading Centre',
        icon: 'Monitor',
        description: 'A modern, air-conditioned wing with 120 computer terminals providing access to the digital catalogue, e-resources, and internet.',
      },
      {
        id: 'facility-nl-3',
        name: 'Manuscript Conservation Lab',
        icon: 'Scroll',
        description: 'A specialised facility for restoration and digitisation of rare manuscripts using humidity-controlled storage and archival-grade scanning equipment.',
      },
      {
        id: 'facility-nl-4',
        name: 'Accessibility Centre',
        icon: 'Eye',
        description: 'Dedicated section for visually impaired and differently abled readers with Braille materials, screen readers, and assistive technology.',
      },
      {
        id: 'facility-nl-5',
        name: 'Cafeteria & Heritage Gardens',
        icon: 'Coffee',
        description: 'A charming cafeteria set within the sprawling Belvedere Estate gardens, offering a peaceful break amidst lush greenery.',
      },
    ],
    reviews: [
      {
        id: 'review-nl-1',
        studentName: 'Dr. Amitav Roy',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        rating: 5,
        reviewText:
          'As a historian, the National Library is an irreplaceable resource. The rare manuscript section holds materials I have found nowhere else. The staff are extremely helpful and knowledgeable.',
        date: '2024-12-01',
        isVerified: true,
      },
      {
        id: 'review-nl-2',
        studentName: 'Priya Das',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        rating: 4,
        reviewText:
          'The collection is extraordinary and the heritage building is magnificent. The digital access could be improved and the cataloguing system needs an upgrade, but the depth of resources is unmatched.',
        date: '2024-11-14',
        isVerified: true,
      },
      {
        id: 'review-nl-3',
        studentName: 'Subhash Ghosh',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        rating: 5,
        reviewText:
          'The Annual Membership is excellent value. I spend every Sunday here working on my research thesis. The peaceful atmosphere and the sheer breadth of resources make it my favourite place in Kolkata.',
        date: '2024-10-28',
        isVerified: true,
      },
    ],
    faq: [
      {
        id: 'faq-nl-1',
        question: 'Who can become a member of the National Library?',
        answer:
          'Any Indian citizen can become a member of the National Library. Foreign nationals with valid research credentials may also apply for a temporary reader\'s card. Membership is available as Day Pass, Monthly, or Annual plans.',
      },
      {
        id: 'faq-nl-2',
        question: 'Can I borrow books from the National Library?',
        answer:
          'Monthly and Annual members can borrow up to 3 and 6 books respectively for a 2-week loan period. Rare books, manuscripts, and reference materials are non-circulating and available for in-house reading only.',
      },
      {
        id: 'faq-nl-3',
        question: 'How do I access digital resources?',
        answer:
          'Free digital resources like NDLI and Shodhganga are accessible online to all visitors. Premium resources like JSTOR require a Monthly or Annual membership. On-site digital terminals are available to all registered members.',
      },
      {
        id: 'faq-nl-4',
        question: 'What are the library\'s visiting hours?',
        answer:
          'The National Library is open Monday to Saturday, 9:00 AM to 8:00 PM. It remains closed on national holidays and the second Saturday of each month for maintenance. The digital reading centre has extended hours for members.',
      },
    ],
  },
};
