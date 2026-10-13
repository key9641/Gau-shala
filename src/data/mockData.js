// GauSeva Initial Fixture & Mock Database

export const initialBreeds = [
  {
    id: 'b1',
    name: 'Gir',
    origin: 'Gir hills of Kathiawar, Gujarat',
    cowsCount: 28,
    description: 'Renowned for its high milk production with A2 beta-casein, prominent humped back, pendulous ears, and calm temperament.',
    characteristics: 'Convex forehead, long hanging ears, reddish-brown coat with white spots, extremely heat and tick resistant.',
    milkYield: '12-18 Litres/day',
    climateAdaptability: 'High tropical heat tolerance',
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'b2',
    name: 'Sahiwal',
    origin: 'Montgomery region (Punjab & Rajasthan border)',
    cowsCount: 22,
    description: 'One of the best dairy breeds among indigenous cattle, famous for its reddish-dun coat and rich golden milk.',
    characteristics: 'Loose skin (hence the name Lola), short horns, reddish-brown color, placid nature.',
    milkYield: '14-22 Litres/day',
    climateAdaptability: 'High resistance to parasites & extreme heat',
    image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'b3',
    name: 'Red Sindhi',
    origin: 'Sindh region & Western India',
    cowsCount: 14,
    description: 'Distinct deep red cattle with compact build and high disease immunity, well adapted to varied climatic conditions.',
    characteristics: 'Deep dark red to light reddish coat, medium compact body, well-developed hump.',
    milkYield: '10-15 Litres/day',
    climateAdaptability: 'Thrives in arid and semi-arid zones',
    image: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'b4',
    name: 'Tharparkar',
    origin: 'Thar Desert (Rajasthan / Sindh)',
    cowsCount: 16,
    description: 'Also called White Sindhi, known for extraordinary survival capacity in harsh desert conditions on scrub vegetation.',
    characteristics: 'White or light grey coat, black switch of tail, lyre-shaped horns, medium size.',
    milkYield: '8-14 Litres/day',
    climateAdaptability: 'Exceptional drought and desert endurance',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'b5',
    name: 'Rathi',
    origin: 'Bikaner & Ganganagar, Rajasthan',
    cowsCount: 12,
    description: 'Efficient dual-purpose breed, prized for both draft capacity and steady milch yield with low feeding requirements.',
    characteristics: 'Brown with white patches or completely black/white spots, quiet and docile.',
    milkYield: '9-14 Litres/day',
    climateAdaptability: 'High resilience in desert sands',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'b6',
    name: 'Hariana',
    origin: 'Rohtak, Hisar, Gurgaon & Jind (Haryana)',
    cowsCount: 15,
    description: 'Prominent dual-purpose breed known for strong bullocks and steady maternal milk supply.',
    characteristics: 'White or light grey coat, short curved horns, long narrow face, prominent alert eyes.',
    milkYield: '8-12 Litres/day',
    climateAdaptability: 'Well suited for northern plains',
    image: 'https://images.unsplash.com/photo-1496730627309-8aa229a44413?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'b7',
    name: 'Kankrej',
    origin: 'Rann of Kutch & Banaskantha, Gujarat',
    cowsCount: 11,
    description: 'One of the heaviest indigenous breeds, renowned for their majestic curved horns and distinctive 1¼ gait (Sawai Chaal).',
    characteristics: 'Silver-grey to dark iron coat, enormous lyre horns, powerful shoulders.',
    milkYield: '10-15 Litres/day',
    climateAdaptability: 'Immune to tick-borne diseases',
    image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'b8',
    name: 'Jersey',
    origin: 'Island of Jersey, UK (Rescued/Sanctuary)',
    cowsCount: 8,
    description: 'Exotic dairy breed rescued from commercial distress, cared for with dignity in the sanctuary.',
    characteristics: 'Fawn or light cream coat, dish face, large kind eyes, smaller frame.',
    milkYield: '18-24 Litres/day',
    climateAdaptability: 'Requires shaded cooler sheds in peak summers',
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'b9',
    name: 'Holstein Friesian',
    origin: 'Netherlands / Europe (Rescued Dairy)',
    cowsCount: 6,
    description: 'Rescued high-yield commercial breed needing specialized senior and hoof veterinary care.',
    characteristics: 'Classic black and white piebald markings, large body frame, quiet demeanor.',
    milkYield: '20-28 Litres/day',
    climateAdaptability: 'Requires active misting and thermal care',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'b10',
    name: 'Desi Crossbreed',
    origin: 'Indigenous Sanctuary Cross',
    cowsCount: 18,
    description: 'Rescued indigenous crossbreeds combining disease resistance and gentle companionship.',
    characteristics: 'Varied colorful coats, sturdy build, affectionate and sociable.',
    milkYield: '7-12 Litres/day',
    climateAdaptability: 'Extremely rugged and resilient',
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80'
  }
];

export const initialCows = [
  {
    id: 'c1',
    cow_id: 'GS-2024-001',
    name: 'Nandini',
    breed: 'Gir',
    age: 4.5,
    gender: 'Female',
    color: 'Reddish Dun with white crown',
    weight: 385,
    photo_url: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
    health_status: 'healthy',
    location: 'Shed A - Matri Kripa (Sanctuary)',
    assigned_vet: 'Dr. Rajesh Sharma (B.V.Sc)',
    last_checkup: '2026-09-15',
    next_checkup: '2026-10-15',
    treatment: 'Regular mineral mix and organic alfalfa diet',
    medicalHistory: [
      { date: '2026-09-15', status: 'healthy', notes: 'Routine bi-monthly checkup. Coat lustrous, digestion normal.' },
      { date: '2026-07-20', status: 'healthy', notes: 'Seasonal FMD vaccination booster administered.' },
      { date: '2026-03-10', status: 'under_observation', notes: 'Mild seasonal allergy treated with herbal neem wash.' }
    ],
    vaccinations: [
      { vaccine: 'Foot & Mouth Disease (FMD)', date: '2026-07-20', nextDue: '2027-01-20' },
      { vaccine: 'Haemorrhagic Septicaemia (HS)', date: '2026-05-12', nextDue: '2027-05-12' },
      { vaccine: 'Black Quarter (BQ)', date: '2026-05-12', nextDue: '2027-05-12' },
      { vaccine: 'Rabies Preventive', date: '2025-11-04', nextDue: '2026-11-04' }
    ]
  },
  {
    id: 'c2',
    cow_id: 'GS-2024-002',
    name: 'Kamdhenu',
    breed: 'Sahiwal',
    age: 6,
    gender: 'Female',
    color: 'Deep Golden Red',
    weight: 420,
    photo_url: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80',
    health_status: 'healthy',
    location: 'Shed B - Amrit Vatika',
    assigned_vet: 'Dr. Rajesh Sharma (B.V.Sc)',
    last_checkup: '2026-09-12',
    next_checkup: '2026-10-12',
    treatment: 'Daily calcium supplement & green napier grass',
    medicalHistory: [
      { date: '2026-09-12', status: 'healthy', notes: 'Excellent overall vigor, lactation balanced.' },
      { date: '2026-04-18', status: 'healthy', notes: 'Hoof trimming and antiseptic wash.' }
    ],
    vaccinations: [
      { vaccine: 'Foot & Mouth Disease (FMD)', date: '2026-07-20', nextDue: '2027-01-20' },
      { vaccine: 'Brucellosis', date: '2024-02-15', nextDue: 'Lifelong Immunity' }
    ]
  },
  {
    id: 'c3',
    cow_id: 'GS-2024-003',
    name: 'Gauri',
    breed: 'Tharparkar',
    age: 3,
    gender: 'Female',
    color: 'Snow White with dark muzzle',
    weight: 340,
    photo_url: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80',
    health_status: 'under_treatment',
    location: 'Hospital Ward 1 - Clinic',
    assigned_vet: 'Dr. Anita Joshi (Senior Vet Surgeon)',
    last_checkup: '2026-09-20',
    next_checkup: '2026-09-24',
    treatment: 'Topical dressing for left hind leg graze & antibiotics course',
    medicalHistory: [
      { date: '2026-09-20', status: 'under_treatment', notes: 'Leg wound healing nicely; antiseptic spray applied.' },
      { date: '2026-09-18', status: 'under_treatment', notes: 'Rescued from roadside trench with minor laceration on left hind leg.' }
    ],
    vaccinations: [
      { vaccine: 'Tetanus Toxoid', date: '2026-09-18', nextDue: '2026-10-18' }
    ]
  },
  {
    id: 'c4',
    cow_id: 'GS-2024-004',
    name: 'Kapila',
    breed: 'Gir',
    age: 8,
    gender: 'Female',
    color: 'Speckled Red & Cream',
    weight: 410,
    photo_url: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80',
    health_status: 'under_observation',
    location: 'Shed A - Matri Kripa',
    assigned_vet: 'Dr. Rajesh Sharma (B.V.Sc)',
    last_checkup: '2026-09-19',
    next_checkup: '2026-09-26',
    treatment: 'Electrolyte rehydration and digestive probiotic paste',
    medicalHistory: [
      { date: '2026-09-19', status: 'under_observation', notes: 'Rumen motility slightly slow after dietary transition. Monitored.' },
      { date: '2026-06-11', status: 'healthy', notes: 'Deworming tablet administered.' }
    ],
    vaccinations: [
      { vaccine: 'Foot & Mouth Disease (FMD)', date: '2026-07-20', nextDue: '2027-01-20' },
      { vaccine: 'Theileriosis Vaccine', date: '2025-08-14', nextDue: '2026-08-14' }
    ]
  },
  {
    id: 'c5',
    cow_id: 'GS-2024-005',
    name: 'Bholanath',
    breed: 'Kankrej',
    age: 5,
    gender: 'Male',
    color: 'Steel Silver Grey',
    weight: 560,
    photo_url: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=800&q=80',
    health_status: 'healthy',
    location: 'Nandi Sanctuary Yard',
    assigned_vet: 'Dr. Anita Joshi (Senior Vet Surgeon)',
    last_checkup: '2026-09-10',
    next_checkup: '2026-10-10',
    treatment: 'High protein fodder, mustard oil massage for joint health',
    medicalHistory: [
      { date: '2026-09-10', status: 'healthy', notes: 'Magnificent physical condition, horn symmetry checked.' }
    ],
    vaccinations: [
      { vaccine: 'Foot & Mouth Disease (FMD)', date: '2026-07-20', nextDue: '2027-01-20' },
      { vaccine: 'Haemorrhagic Septicaemia (HS)', date: '2026-05-12', nextDue: '2027-05-12' }
    ]
  },
  {
    id: 'c6',
    cow_id: 'GS-2024-006',
    name: 'Surabhi',
    breed: 'Red Sindhi',
    age: 5,
    gender: 'Female',
    color: 'Mahogany Brown',
    weight: 375,
    photo_url: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
    health_status: 'healthy',
    location: 'Shed C - Shanti Dham',
    assigned_vet: 'Dr. Rajesh Sharma (B.V.Sc)',
    last_checkup: '2026-09-14',
    next_checkup: '2026-10-14',
    treatment: 'Jaggery-turmeric nutritional bolus weekly',
    medicalHistory: [
      { date: '2026-09-14', status: 'healthy', notes: 'Routine checkup. Rumen sound, clear eyes.' }
    ],
    vaccinations: [
      { vaccine: 'Foot & Mouth Disease (FMD)', date: '2026-07-20', nextDue: '2027-01-20' }
    ]
  },
  {
    id: 'c7',
    cow_id: 'GS-2024-007',
    name: 'Mangala',
    breed: 'Rathi',
    age: 7,
    gender: 'Female',
    color: 'Piebald Brown & White',
    weight: 360,
    photo_url: 'https://images.unsplash.com/photo-1496730627309-8aa229a44413?auto=format&fit=crop&w=800&q=80',
    health_status: 'critical',
    location: 'ICU Unit B - Critical Care',
    assigned_vet: 'Dr. Anita Joshi (Senior Vet Surgeon)',
    last_checkup: '2026-09-22',
    next_checkup: '2026-09-23',
    treatment: 'IV Saline drip, heavy plastic ingestion removal post-op care',
    medicalHistory: [
      { date: '2026-09-22', status: 'critical', notes: 'Rumenotomy successfully completed to remove 12kg plastic waste. Post-op recovery in ICU.' },
      { date: '2026-09-21', status: 'critical', notes: 'Severe impaction colic, shifted to emergency ICU theatre.' }
    ],
    vaccinations: [
      { vaccine: 'Tetanus Toxoid', date: '2026-09-21', nextDue: '2026-10-21' }
    ]
  },
  {
    id: 'c8',
    cow_id: 'GS-2024-008',
    name: 'Radha',
    breed: 'Hariana',
    age: 4,
    gender: 'Female',
    color: 'Silver Greyish White',
    weight: 390,
    photo_url: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80',
    health_status: 'healthy',
    location: 'Shed B - Amrit Vatika',
    assigned_vet: 'Dr. Rajesh Sharma (B.V.Sc)',
    last_checkup: '2026-09-08',
    next_checkup: '2026-10-08',
    treatment: 'None required, optimum condition',
    medicalHistory: [
      { date: '2026-09-08', status: 'healthy', notes: 'Vital signs normal. Temperature 101.4°F.' }
    ],
    vaccinations: [
      { vaccine: 'Foot & Mouth Disease (FMD)', date: '2026-07-20', nextDue: '2027-01-20' },
      { vaccine: 'Anthrax Spore Vaccine', date: '2026-03-05', nextDue: '2027-03-05' }
    ]
  },
  {
    id: 'c9',
    cow_id: 'GS-2024-009',
    name: 'Lakshmi',
    breed: 'Gir',
    age: 3.5,
    gender: 'Female',
    color: 'Reddish with White Speckles',
    weight: 350,
    photo_url: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
    health_status: 'healthy',
    location: 'Shed A - Matri Kripa',
    assigned_vet: 'Dr. Rajesh Sharma (B.V.Sc)',
    last_checkup: '2026-09-17',
    next_checkup: '2026-10-17',
    treatment: 'Daily vitamin mineral premix',
    medicalHistory: [
      { date: '2026-09-17', status: 'healthy', notes: 'Good weight gain and docile temperament.' }
    ],
    vaccinations: [
      { vaccine: 'Foot & Mouth Disease (FMD)', date: '2026-07-20', nextDue: '2027-01-20' }
    ]
  },
  {
    id: 'c10',
    cow_id: 'GS-2024-010',
    name: 'Devaki',
    breed: 'Jersey',
    age: 6.5,
    gender: 'Female',
    color: 'Fawn and Cream',
    weight: 430,
    photo_url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
    health_status: 'under_observation',
    location: 'Shed D - Senior Care Ward',
    assigned_vet: 'Dr. Rajesh Sharma (B.V.Sc)',
    last_checkup: '2026-09-18',
    next_checkup: '2026-09-25',
    treatment: 'Joint supplements, soft sand bedding provided for arthritis',
    medicalHistory: [
      { date: '2026-09-18', status: 'under_observation', notes: 'Slight stiffness in right hock joint during morning hours.' }
    ],
    vaccinations: [
      { vaccine: 'Foot & Mouth Disease (FMD)', date: '2026-07-20', nextDue: '2027-01-20' }
    ]
  },
  {
    id: 'c11',
    cow_id: 'GS-2024-011',
    name: 'Krishna',
    breed: 'Gir',
    age: 2,
    gender: 'Male',
    color: 'Deep Chestnut Red',
    weight: 280,
    photo_url: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
    health_status: 'healthy',
    location: 'Calf & Junior Paddock',
    assigned_vet: 'Dr. Rajesh Sharma (B.V.Sc)',
    last_checkup: '2026-09-16',
    next_checkup: '2026-10-16',
    treatment: 'Growth booster mash and calf starter grains',
    medicalHistory: [
      { date: '2026-09-16', status: 'healthy', notes: 'Young bull calf showing rapid healthy growth.' }
    ],
    vaccinations: [
      { vaccine: 'Foot & Mouth Disease (FMD)', date: '2026-07-20', nextDue: '2027-01-20' }
    ]
  },
  {
    id: 'c12',
    cow_id: 'GS-2024-012',
    name: 'Yamuna',
    breed: 'Desi Crossbreed',
    age: 4,
    gender: 'Female',
    color: 'Black and Honey Brown',
    weight: 340,
    photo_url: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80',
    health_status: 'under_treatment',
    location: 'Hospital Ward 2',
    assigned_vet: 'Dr. Anita Joshi (Senior Vet Surgeon)',
    last_checkup: '2026-09-21',
    next_checkup: '2026-09-25',
    treatment: 'Eye drops for mild conjunctivitis, eye shield installed',
    medicalHistory: [
      { date: '2026-09-21', status: 'under_treatment', notes: 'Dust irritation in right eye responding well to antibiotic drops.' }
    ],
    vaccinations: [
      { vaccine: 'Foot & Mouth Disease (FMD)', date: '2026-07-20', nextDue: '2027-01-20' }
    ]
  },
  {
    id: 'c13',
    cow_id: 'GS-2024-013',
    name: 'Ganga',
    breed: 'Tharparkar',
    age: 5,
    gender: 'Female',
    color: 'Pure White with Grey Neck',
    weight: 370,
    photo_url: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80',
    health_status: 'healthy',
    location: 'Shed B - Amrit Vatika',
    assigned_vet: 'Dr. Rajesh Sharma (B.V.Sc)',
    last_checkup: '2026-09-14',
    next_checkup: '2026-10-14',
    treatment: 'Routine green fodder and mineral blocks',
    medicalHistory: [
      { date: '2026-09-14', status: 'healthy', notes: 'Very active and peaceful.' }
    ],
    vaccinations: [
      { vaccine: 'Foot & Mouth Disease (FMD)', date: '2026-07-20', nextDue: '2027-01-20' }
    ]
  },
  {
    id: 'c14',
    cow_id: 'GS-2024-014',
    name: 'Kaushalya',
    breed: 'Holstein Friesian',
    age: 7,
    gender: 'Female',
    color: 'Black and White Spotted',
    weight: 510,
    photo_url: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
    health_status: 'under_observation',
    location: 'Cooling Shed - Rescued Dairy Wing',
    assigned_vet: 'Dr. Anita Joshi (Senior Vet Surgeon)',
    last_checkup: '2026-09-19',
    next_checkup: '2026-09-27',
    treatment: 'Cool misting regime and hoof sanitization pedicures',
    medicalHistory: [
      { date: '2026-09-19', status: 'under_observation', notes: 'Heat stress prevention monitor. Respiration rate stabilized.' }
    ],
    vaccinations: [
      { vaccine: 'Foot & Mouth Disease (FMD)', date: '2026-07-20', nextDue: '2027-01-20' }
    ]
  },
  {
    id: 'c15',
    cow_id: 'GS-2024-015',
    name: 'Shanti',
    breed: 'Sahiwal',
    age: 5.5,
    gender: 'Female',
    color: 'Reddish Golden',
    weight: 410,
    photo_url: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80',
    health_status: 'healthy',
    location: 'Shed B - Amrit Vatika',
    assigned_vet: 'Dr. Rajesh Sharma (B.V.Sc)',
    last_checkup: '2026-09-11',
    next_checkup: '2026-10-11',
    treatment: 'Standard nutritional plan',
    medicalHistory: [
      { date: '2026-09-11', status: 'healthy', notes: 'All health parameters within normal range.' }
    ],
    vaccinations: [
      { vaccine: 'Foot & Mouth Disease (FMD)', date: '2026-07-20', nextDue: '2027-01-20' }
    ]
  },
  {
    id: 'c16',
    cow_id: 'GS-2024-016',
    name: 'Yashoda',
    breed: 'Rathi',
    age: 4,
    gender: 'Female',
    color: 'Light Brown with White Star',
    weight: 355,
    photo_url: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
    health_status: 'healthy',
    location: 'Shed C - Shanti Dham',
    assigned_vet: 'Dr. Rajesh Sharma (B.V.Sc)',
    last_checkup: '2026-09-13',
    next_checkup: '2026-10-13',
    treatment: 'Routine diet',
    medicalHistory: [
      { date: '2026-09-13', status: 'healthy', notes: 'Healthy appetite and cud chewing active.' }
    ],
    vaccinations: [
      { vaccine: 'Foot & Mouth Disease (FMD)', date: '2026-07-20', nextDue: '2027-01-20' }
    ]
  },
  {
    id: 'c17',
    cow_id: 'GS-2024-017',
    name: 'Bhavani',
    breed: 'Kankrej',
    age: 6,
    gender: 'Female',
    color: 'Silver Dun with dark shoulders',
    weight: 480,
    photo_url: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=800&q=80',
    health_status: 'healthy',
    location: 'Shed C - Shanti Dham',
    assigned_vet: 'Dr. Anita Joshi (Senior Vet Surgeon)',
    last_checkup: '2026-09-09',
    next_checkup: '2026-10-09',
    treatment: 'Natural pasture grazing twice daily',
    medicalHistory: [
      { date: '2026-09-09', status: 'healthy', notes: 'Excellent health and strong maternal bond.' }
    ],
    vaccinations: [
      { vaccine: 'Foot & Mouth Disease (FMD)', date: '2026-07-20', nextDue: '2027-01-20' }
    ]
  },
  {
    id: 'c18',
    cow_id: 'GS-2024-018',
    name: 'Amba',
    breed: 'Desi Crossbreed',
    age: 3,
    gender: 'Female',
    color: 'Speckled White and Brown',
    weight: 330,
    photo_url: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
    health_status: 'under_observation',
    location: 'Quarantine Entry Ward',
    assigned_vet: 'Dr. Rajesh Sharma (B.V.Sc)',
    last_checkup: '2026-09-21',
    next_checkup: '2026-09-28',
    treatment: 'Quarantine screening, prophylactic deworming',
    medicalHistory: [
      { date: '2026-09-21', status: 'under_observation', notes: 'Newly rescued from highway toll bypass. Under 7-day intake quarantine.' }
    ],
    vaccinations: [
      { vaccine: 'Tetanus Toxoid', date: '2026-09-21', nextDue: '2026-10-21' }
    ]
  }
];

export const initialMissingCows = [
  {
    id: 'm1',
    cow_id: 'GS-2024-019',
    name: 'Champa',
    breed: 'Gir',
    age: 3.5,
    gender: 'Female',
    color_marks: 'Deep red coat, distinctive white crescent mark on right flank, yellow tag #019',
    last_seen_location: 'Near Gaushala East Gate pasture, NH-8 bypass',
    last_seen_date: '2026-09-20',
    contact_number: '+91 98765 43210',
    reported_by: 'Caretaker Ram Lal',
    status: 'missing', // 'missing', 'sighted', 'found'
    description: 'Wandered off grazing boundary after heavy evening rain. Very gentle, responds to whistle.',
    photo_url: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
    lat: 26.9124,
    lng: 75.7873
  },
  {
    id: 'm2',
    cow_id: 'GS-2024-020',
    name: 'Keshav',
    breed: 'Sahiwal',
    age: 2.5,
    gender: 'Male',
    color_marks: 'Light tan brown, black muzzle, notched left ear',
    last_seen_location: 'Village Canal Bridge, Ramgarh Road, Sector 14',
    last_seen_date: '2026-09-18',
    contact_number: '+91 98765 43211',
    reported_by: 'GauSeva Rescue Van #2',
    status: 'sighted',
    description: 'Sighted grazing near green fields near the temple water tank. Team dispatching recovery vehicle.',
    photo_url: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80',
    lat: 26.9250,
    lng: 75.8010
  },
  {
    id: 'm3',
    cow_id: 'GS-2024-021',
    name: 'Manik',
    breed: 'Tharparkar',
    age: 4,
    gender: 'Male',
    color_marks: 'Pure grey-white, tall lyre horns with brass tip on left horn',
    last_seen_location: 'Old Grain Mandi perimeter',
    last_seen_date: '2026-09-15',
    contact_number: '+91 98765 43212',
    reported_by: 'Rohan Verma (Local Resident)',
    status: 'found',
    description: 'Safely recovered by GauSeva rescue team with help of local temple devotees. Returned to Shed B.',
    photo_url: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80',
    lat: 26.8950,
    lng: 75.7650
  },
  {
    id: 'm4',
    cow_id: 'GS-2024-022',
    name: 'Triveni',
    breed: 'Desi Crossbreed',
    age: 5,
    gender: 'Female',
    color_marks: 'Tricolor black, white and reddish tan patches on spine',
    last_seen_location: 'South Railway Underpass crossing',
    last_seen_date: '2026-09-21',
    contact_number: '+91 98765 43210',
    reported_by: 'Caretaker Suresh Kumar',
    status: 'missing',
    description: 'Got separated during evening cattle return. Wearing green collar belt.',
    photo_url: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80',
    lat: 26.9380,
    lng: 75.7420
  }
];

export const initialSightings = [
  {
    id: 's1',
    missing_cow_id: 'm1',
    cow_id: 'GS-2024-019',
    cow_name: 'Champa',
    reported_by: 'Mahesh Sharma',
    phone: '+91 98123 45678',
    location: 'Near Shiv Temple banyan tree, NH-8 service lane',
    date: '2026-09-21 17:30',
    description: 'Saw a red Gir cow with white spot near the sweet shop. She seemed calm and ate green grass offered by visitors.',
    photo_url: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 's2',
    missing_cow_id: 'm2',
    cow_id: 'GS-2024-020',
    cow_name: 'Keshav',
    reported_by: 'Devendra Yadav',
    phone: '+91 97234 56789',
    location: 'Ramgarh Canal pond bank',
    date: '2026-09-22 09:15',
    description: 'Brown bull calf with ear notch drinking water at the village pond. Safe and calm.',
    photo_url: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80'
  }
];

export const initialDonations = [
  {
    id: 'd1',
    donor_name: 'Ananya Sharma',
    amount: 5001,
    transaction_id: 'UPI-426189201948',
    date: '2026-09-22',
    message: 'For daily green grass (Gau-Gras) and medicines for ICU ward.',
    verification_status: 'verified',
    category: 'Green Fodder'
  },
  {
    id: 'd2',
    donor_name: 'Vikramaditya Singhania',
    amount: 11000,
    transaction_id: 'UPI-426177810332',
    date: '2026-09-21',
    message: 'On the occasion of grandmother\'s birthday. Blessed to support Gau Mata.',
    verification_status: 'verified',
    category: 'Medical Sanctuary Fund'
  },
  {
    id: 'd3',
    donor_name: 'Rajiv & Meera Mehta',
    amount: 2501,
    transaction_id: 'UPI-426155902144',
    date: '2026-09-20',
    message: 'Dedicated to Nandini & Kamdhenu special nutrition diet.',
    verification_status: 'verified',
    category: 'Adoption Support'
  },
  {
    id: 'd4',
    donor_name: 'Pooja Agrawal',
    amount: 1001,
    transaction_id: 'UPI-426122904812',
    date: '2026-09-20',
    message: 'Monthly humble sewa for our sacred cows.',
    verification_status: 'verified',
    category: 'General Seva'
  },
  {
    id: 'd5',
    donor_name: 'Dr. Hitesh Patel',
    amount: 5100,
    transaction_id: 'UPI-426099182390',
    date: '2026-09-19',
    message: 'Towards veterinary surgical instruments and IV saline supply.',
    verification_status: 'verified',
    category: 'Hospital Ward'
  },
  {
    id: 'd6',
    donor_name: 'Sunil Joshi',
    amount: 501,
    transaction_id: 'UPI-426044728190',
    date: '2026-09-22',
    message: 'Prayers for health and prosperity.',
    verification_status: 'pending',
    category: 'Gau-Gras'
  }
];

export const initialSettings = {
  gaushala_name: 'Shree Krishna GauSeva Ashram & Hospital',
  tagline: 'Serving Cows, Serving Humanity with Vedic Devotion and Modern Medicine',
  upi_id: '9319966886ml@pnb',
  qr_code_image: '',
  phone: '+91 98370 49751',
  helpline: '+91 98370 49751',
  email: '',
  address: 'VV9H+2JP, BSM College Road, near Kaushik Pathology Clinic, Chow Mandi, Chand Puri Nagar, Roorkee, Uttarakhand 247667',
  visiting_hours: 'Daily: 6:00 AM – 8:00 PM',
  vet_on_duty: 'Dr. Rajesh Sharma & Dr. Anita Joshi (24x7 Ambulance on call)'
};
