export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  qualification: string;
  experience: string;
  availableDays: string[];
  timing: string;
  availableToday: boolean;
  rating: number;
  reviewsCount: number;
  image: string;
  bio: string;
  consultationFee: string;
  languages: string[];
}

export interface MedicalService {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
  features: string[];
  popular?: boolean;
}

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  email?: string;
  doctorName: string;
  specialty: string;
  date: string;
  timeSlot: string;
  reason: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Exterior' | 'Reception' | 'Consultation' | 'Diagnostics' | 'Equipment';
  imageUrl: string;
  description: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  location: string;
  rating: number;
  comment: string;
  doctorVisited: string;
  date: string;
}
