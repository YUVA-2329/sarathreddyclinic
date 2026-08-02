import { Doctor, MedicalService, GalleryItem, Testimonial } from '../types';

export const CLINIC_INFO = {
  name: "RAM MEDICALS MULTICLINIC",
  tagline: "Better care. Closer to you.",
  subtitle: "Healthcare in Bagaluru",
  address: "123 Health Avenue, Main Road, Bagaluru, Bengaluru, Karnataka 562149",
  mapDirectionsUrl: "https://maps.google.com/?q=Bagaluru+Bengaluru+Karnataka",
  phonePrimary: "8088685589",
  phoneSecondary: "8088685589",
  emergencyPhone: "8088685589",
  email: "yuvakishore.vps@gmail.com",
  timingMorning: "08:00 AM - 01:30 PM",
  timingEvening: "04:30 PM - 09:00 PM",
  timingSunday: "09:00 AM - 01:00 PM",
  logoUrl: "https://lh3.googleusercontent.com/aida/AP1WRLtEQ_IuJxEXDea3HZJLwPHMRJm6OkaiexL3-RiDYLnvy2IF6a_1MulPGV8gxbLp2_YTYdASg9eZHKd-5ZaocWsYndyziBit8dLkdRT-LYeQnjBw5i5Ne1sVZYKdnboELBlk1Yj4tcqsK2HEsCH_u4vOm_0WQQ1nl-j_M-M_Ai0boe1OgJO9fpeOqkITnaqyo6PQ0IUeboAaJKGDAzTuiW7Cdiq0mLcsKYLSHTujDPtzrs3wJixD9OEN9Io",
  heroImage: "https://lh3.googleusercontent.com/aida/AP1WRLvz5k_m8azPWH76ia7vs7r58ohS6aut7NsBp7VRaUTvZbg-pdIvmTAzT4s5vbmwoZqGg8RZaN8REgGAO26XjHh86KSoGGpVglv6NYW1mG_ySuHha_gJlgfD4yvLNnG0c8HN0jeg5rt2UUNVQwyiXVroeLIKVLr1NXBqRhmvNlJyuT5k5tXXm6B307Tdiz-zVcRI1txBaMxk98S4nRXJ-kzvwhxnbiieCroboiM_tl1dBhBtEyFw7C9bfME",
  exteriorImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOTKud3FoXOug66D5kpufp0K1m9-AAwhSpWfcw3t_72JWFqrqxsFNKbJ4AxAKfRNovqczficsrcgNRKZWfM8fZhKKf1KiX20R4VYZErXvDfd_hU2UZddd_F9es_8imh279CYIsfIItWdMW_F14opEwgeNkTxVDjAEHgf79bSer9M3NV3c2YJU76my5wML0OjXsYC5Joh3UUHTQzZboQ79f4Ll_la17ps-XjlpYdB12oduGYkQSL9OB",
  receptionImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCG21pvWi2cFNMlBsu9VrILDd-eqLAgHOHMcDXYnOj8IM1PVUxcO-PQyVMfM5_PHV-h14Qzib8nh_nwzgyfwJ595s94Uc675NHuR-iRPb9i8aqN94wUySTXEW1i0a1kphDH09_tzYA-7iIZvI_4RhG2nkk-Dg-zmSQ9M2R2JfxznAHwdAUNwcHJdI9Xcn-maHLlBknPCq9YLPjPZZUaV-K6MkiPJdiJHs9tz231on3FjANK5NWWyKu-",
  diagnosticImage: "https://lh3.googleusercontent.com/aida/AP1WRLunYUG07824XcGF_8gj7ZRoz9etnb3FFdrzTZ8NU4TPyBW1nGRdS8LmQSgsamKAHh712koAYQKAwsUQYI0HzSXPTZporqZwAe3A8Na7QCzgnBObasthPH1iIv73iA_zNk4Rd1aQm8vX668gJ6H1J8XHnYVgla9sjqOGawapw1h5VD00duWJs-Vu0b9KShEyDz4WR_HuaqXmU1lTNLcxCwn0oUQtaeBgsxhuTOWIcS9LnB0K1xq-HRi9Vg"
};

export const DOCTORS: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Rajesh V. Ram",
    title: "Chief Medical Officer & General Physician",
    specialty: "General Medicine & Family Practice",
    qualification: "MBBS, MD (General Medicine)",
    experience: "18+ Years",
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    timing: "08:30 AM - 01:00 PM & 05:00 PM - 08:30 PM",
    availableToday: true,
    rating: 4.9,
    reviewsCount: 342,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800",
    bio: "Senior physician dedicated to comprehensive adult health management, diabetes, hypertension, and preventive primary care in Bagaluru.",
    consultationFee: "₹400",
    languages: ["Kannada", "English", "Hindi", "Telugu"]
  },
  {
    id: "doc-2",
    name: "Dr. Priya Nair",
    title: "Senior Pediatrician & Child Specialist",
    specialty: "Pediatrics & Neonatology",
    qualification: "MBBS, DCH, DNB (Pediatrics)",
    experience: "14+ Years",
    availableDays: ["Mon", "Wed", "Thu", "Fri", "Sat"],
    timing: "09:00 AM - 01:30 PM & 04:30 PM - 07:30 PM",
    availableToday: true,
    rating: 4.9,
    reviewsCount: 289,
    image: "https://images.unsplash.com/photo-1594824813566-78a933f2614d?auto=format&fit=crop&q=80&w=800",
    bio: "Compassionate child healthcare specialist expert in newborn care, child growth monitoring, vaccinations, and pediatric emergency care.",
    consultationFee: "₹450",
    languages: ["Kannada", "English", "Malayalam", "Hindi"]
  },
  {
    id: "doc-3",
    name: "Dr. Vikramaditya Reddy",
    title: "Consultant Cardiologist",
    specialty: "Cardiology & Heart Health",
    qualification: "MBBS, MD, DM (Cardiology)",
    experience: "16+ Years",
    availableDays: ["Tue", "Thu", "Sat"],
    timing: "05:00 PM - 08:30 PM",
    availableToday: true,
    rating: 4.8,
    reviewsCount: 198,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800",
    bio: "Specialist in preventive cardiology, ECG interpretation, hypertension management, echocardiography, and cardiac wellness.",
    consultationFee: "₹600",
    languages: ["Kannada", "English", "Telugu"]
  },
  {
    id: "doc-4",
    name: "Dr. Sunitha Rao",
    title: "Consultant Gynecologist & Obstetrician",
    specialty: "Gynecology & Women's Health",
    qualification: "MBBS, MS (Obstetrics & Gynecology)",
    experience: "15+ Years",
    availableDays: ["Mon", "Tue", "Wed", "Fri", "Sat"],
    timing: "10:00 AM - 01:00 PM & 05:00 PM - 08:00 PM",
    availableToday: false,
    rating: 4.9,
    reviewsCount: 254,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800",
    bio: "Expert in prenatal care, high-risk pregnancy management, PCOS/PCOD therapy, adolescent health, and laparoscopic gynecology.",
    consultationFee: "₹500",
    languages: ["Kannada", "English", "Hindi"]
  },
  {
    id: "doc-5",
    name: "Dr. Arvind K. Swamy",
    title: "Orthopedic & Joint Surgeon",
    specialty: "Orthopedics & Sports Medicine",
    qualification: "MBBS, MS (Orthopedics), Fellow in Joint Replacement",
    experience: "12+ Years",
    availableDays: ["Mon", "Wed", "Fri"],
    timing: "05:00 PM - 08:30 PM",
    availableToday: true,
    rating: 4.8,
    reviewsCount: 167,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800",
    bio: "Specializing in joint pain relief, fracture care, arthritis treatment, sports injury rehabilitation, and spine management.",
    consultationFee: "₹500",
    languages: ["Kannada", "English", "Tamil"]
  },
  {
    id: "doc-6",
    name: "Dr. Meera Menon",
    title: "Consultant Dermatologist & Cosmetologist",
    specialty: "Dermatology & Skin Care",
    qualification: "MBBS, MD (Dermatology, Venereology & Leprosy)",
    experience: "10+ Years",
    availableDays: ["Tue", "Thu", "Sat"],
    timing: "10:30 AM - 01:30 PM",
    availableToday: false,
    rating: 4.9,
    reviewsCount: 215,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=800",
    bio: "Expert in skin allergy treatment, acne management, hair fall solutions, laser treatments, and pediatric dermatology.",
    consultationFee: "₹500",
    languages: ["Kannada", "English", "Malayalam"]
  }
];

export const SERVICES: MedicalService[] = [
  {
    id: "serv-1",
    title: "General Medicine & Family Health",
    category: "Primary Care",
    description: "Complete wellness evaluations, chronic condition care (diabetes, BP, thyroid), fever treatment, and preventive family consultations.",
    iconName: "Stethoscope",
    features: ["Routine Health Checkups", "Blood Pressure Monitoring", "Diabetes & Metabolic Care", "ECG & Vital Screening"],
    popular: true
  },
  {
    id: "serv-2",
    title: "Pediatrics & Child Care",
    category: "Child Health",
    description: "Dedicated child OPD with growth tracking, immunization schedules, pediatric fever & infectious disease management.",
    iconName: "Baby",
    features: ["Childhood Vaccination", "Growth & Nutrition Advice", "Pediatric Allergy Care", "Infant Development"],
    popular: true
  },
  {
    id: "serv-3",
    title: "Cardiology & Heart Wellness",
    category: "Specialized Care",
    description: "Early cardiac risk identification, 12-lead digital ECG, lipid profiling, and hypertension management.",
    iconName: "HeartPulse",
    features: ["Digital 12-Lead ECG", "Hypertension Control", "Lipid & Heart Screening", "Cardiac Rehabilitation Advice"],
    popular: false
  },
  {
    id: "serv-4",
    title: "Gynecology & Maternity Care",
    category: "Women's Health",
    description: "Comprehensive prenatal & postnatal care, women's wellness checks, PCOS/PCOD guidance, and fertility counseling.",
    iconName: "UserCheck",
    features: ["Antenatal Checkups", "PCOS & Hormonal Guidance", "Ultrasound Scans", "Cervical Health Screening"],
    popular: true
  },
  {
    id: "serv-5",
    title: "Orthopedics & Joint Care",
    category: "Specialized Care",
    description: "Expert consultation for knee, back, shoulder pain, arthritis management, osteoporosis screening, and sprain management.",
    iconName: "Activity",
    features: ["Bone Mineral Screening", "Joint Pain Relief", "Fracture First Aid & Plastering", "Postural Rehabilitation"],
    popular: false
  },
  {
    id: "serv-6",
    title: "High-Tech Diagnostic Laboratory",
    category: "Diagnostics",
    description: "In-house fully automated pathology laboratory with fast, accurate turn-around time for routine and specialized blood panels.",
    iconName: "TestTube",
    features: ["Complete Blood Count (CBC)", "Liver & Kidney Function", "Thyroid & Hormone Panels", "Home Blood Collection"],
    popular: true
  },
  {
    id: "serv-7",
    title: "Dermatology & Skin Care",
    category: "Specialized Care",
    description: "Advanced skin consultations for acne, eczema, hair loss, skin allergy patch tests, and minor cosmetic care.",
    iconName: "Sparkles",
    features: ["Acne & Scar Therapies", "Hair Fall Treatments", "Allergy Diagnostic Testing", "Laser & Cosmetic Procedures"],
    popular: false
  },
  {
    id: "serv-8",
    title: "Emergency First Aid & Pharmacy",
    category: "24/7 Support",
    description: "Immediate wound dressing, minor trauma care, IV fluid support, and attached fully stocked pharmacy counter.",
    iconName: "ShieldAlert",
    features: ["Wound Dressing & Suturing", "Emergency IV Hydration", "Full Medicine Counter", "Nebulization Support"],
    popular: true
  }
];

export const GALLERY: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Doctor Patient Consultation Room",
    category: "Consultation",
    imageUrl: "https://lh3.googleusercontent.com/aida/AP1WRLvz5k_m8azPWH76ia7vs7r58ohS6aut7NsBp7VRaUTvZbg-pdIvmTAzT4s5vbmwoZqGg8RZaN8REgGAO26XjHh86KSoGGpVglv6NYW1mG_ySuHha_gJlgfD4yvLNnG0c8HN0jeg5rt2UUNVQwyiXVroeLIKVLr1NXBqRhmvNlJyuT5k5tXXm6B307Tdiz-zVcRI1txBaMxk98S4nRXJ-kzvwhxnbiieCroboiM_tl1dBhBtEyFw7C9bfME",
    description: "Private, hygienic, air-conditioned doctor consultation suite with modern patient examination equipment."
  },
  {
    id: "gal-2",
    title: "Clinic Exterior Facade in Bagaluru",
    category: "Exterior",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOTKud3FoXOug66D5kpufp0K1m9-AAwhSpWfcw3t_72JWFqrqxsFNKbJ4AxAKfRNovqczficsrcgNRKZWfM8fZhKKf1KiX20R4VYZErXvDfd_hU2UZddd_F9es_8imh279CYIsfIItWdMW_F14opEwgeNkTxVDjAEHgf79bSer9M3NV3c2YJU76my5wML0OjXsYC5Joh3UUHTQzZboQ79f4Ll_la17ps-XjlpYdB12oduGYkQSL9OB",
    description: "Modern, easily accessible medical facility with designated parking and step-free entrance."
  },
  {
    id: "gal-3",
    title: "Patient Waiting Lounge & Reception Desk",
    category: "Reception",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCG21pvWi2cFNMlBsu9VrILDd-eqLAgHOHMcDXYnOj8IM1PVUxcO-PQyVMfM5_PHV-h14Qzib8nh_nwzgyfwJ595s94Uc675NHuR-iRPb9i8aqN94wUySTXEW1i0a1kphDH09_tzYA-7iIZvI_4RhG2nkk-Dg-zmSQ9M2R2JfxznAHwdAUNwcHJdI9Xcn-maHLlBknPCq9YLPjPZZUaV-K6MkiPJdiJHs9tz231on3FjANK5NWWyKu-",
    description: "Spacious, peaceful waiting environment with digital token call display and friendly receptionist counter."
  },
  {
    id: "gal-4",
    title: "Advanced Medical Diagnostics & Laboratory",
    category: "Diagnostics",
    imageUrl: "https://lh3.googleusercontent.com/aida/AP1WRLunYUG07824XcGF_8gj7ZRoz9etnb3FFdrzTZ8NU4TPyBW1nGRdS8LmQSgsamKAHh712koAYQKAwsUQYI0HzSXPTZporqZwAe3A8Na7QCzgnBObasthPH1iIv73iA_zNk4Rd1aQm8vX668gJ6H1J8XHnYVgla9sjqOGawapw1h5VD00duWJs-Vu0b9KShEyDz4WR_HuaqXmU1lTNLcxCwn0oUQtaeBgsxhuTOWIcS9LnB0K1xq-HRi9Vg",
    description: "High-precision diagnostic equipment for automated blood work, hormone assays, and digital imaging."
  },
  {
    id: "gal-5",
    title: "Pediatric & Family Consultation Room",
    category: "Consultation",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
    description: "Kid-friendly examination room designed to ensure children feel comfortable and relaxed."
  },
  {
    id: "gal-6",
    title: "Digital ECG & Cardiac Diagnostics Suite",
    category: "Equipment",
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200",
    description: "Instant 12-lead digital ECG monitoring and cardiac assessment tools operated by trained technicians."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    patientName: "Manoj Gowda",
    location: "Bagaluru Town",
    rating: 5,
    comment: "Ram Medicals Multiclinic is a boon for everyone in Bagaluru. Dr. Rajesh is extremely attentive and listened to all my mother's health concerns with great patience. The blood test results arrived on WhatsApp the same evening!",
    doctorVisited: "Dr. Rajesh V. Ram",
    date: "10 days ago"
  },
  {
    id: "t-2",
    patientName: "Kavitha S.",
    location: "Bandikodigehalli",
    rating: 5,
    comment: "Took my 3-year-old son to Dr. Priya for vaccination. The staff is warm and gentle. Very clean clinic, zero waiting hassle through online booking.",
    doctorVisited: "Dr. Priya Nair",
    date: "2 weeks ago"
  },
  {
    id: "t-3",
    patientName: "Ramesh Reddy",
    location: "KNS College Road, Bagaluru",
    rating: 5,
    comment: "Top notch facility right near us. Avoided traveling to central city for cardiac ECG and routine lab tests. Doctor explained my medication in detail.",
    doctorVisited: "Dr. Vikramaditya Reddy",
    date: "1 month ago"
  }
];

export const TIME_SLOTS = {
  morning: [
    "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM"
  ],
  evening: [
    "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM"
  ]
};
