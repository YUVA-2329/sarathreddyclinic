import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { AboutClinic } from './components/AboutClinic';
import { ServicesGrid } from './components/ServicesGrid';
import { DoctorsSection } from './components/DoctorsSection';
import { AIHealthSuite } from './components/AIHealthSuite';
import { MedicalIntroOverlay } from './components/MedicalIntroOverlay';
import { BookingModal } from './components/BookingModal';
import { GallerySection } from './components/GallerySection';
import { LocationAndTimings } from './components/LocationAndTimings';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AIAssistantModal } from './components/AIAssistantModal';
import { PatientPortalModal } from './components/PatientPortalModal';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Doctor, Appointment } from './types';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | null>(null);

  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isPatientPortalOpen, setIsPatientPortalOpen] = useState(false);
  const [forcedShowIntro, setForcedShowIntro] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOpenBooking = (doc?: Doctor, serviceTitle?: string) => {
    setSelectedDoctorForBooking(doc || null);
    setSelectedServiceForBooking(serviceTitle || null);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (appointment: Appointment) => {
    setToastMessage(`Appointment reserved successfully for ${appointment.patientName} (Token: ${appointment.id})`);
    setTimeout(() => {
      setToastMessage(null);
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans pb-16 sm:pb-0">
      
      {/* 3-Second Glassmorphism Medical Intro Overlay */}
      <MedicalIntroOverlay
        key={forcedShowIntro ? 'forced' : 'auto'}
        forcedShow={forcedShowIntro}
        onComplete={() => setForcedShowIntro(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 max-w-md bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center justify-between gap-3 animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <p className="text-xs font-semibold">{toastMessage}</p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Header Bar */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        onOpenPatientPortal={() => setIsPatientPortalOpen(true)}
        onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
        onReplayIntro={() => setForcedShowIntro(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
        />

        <TrustStrip />

        <AboutClinic
          onOpenBooking={() => handleOpenBooking()}
        />

        <ServicesGrid
          onSelectServiceToBook={(serviceTitle) => handleOpenBooking(undefined, serviceTitle)}
        />

        <DoctorsSection
          onSelectDoctorToBook={(doc) => handleOpenBooking(doc)}
        />

        <AIHealthSuite
          onSelectDoctorToBook={(doc) => handleOpenBooking(doc)}
          onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
        />

        <GallerySection />

        <LocationAndTimings />

        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
      />

      {/* Mobile Fixed Bottom Navigation Bar */}
      <MobileBottomNav
        onOpenBooking={() => handleOpenBooking()}
        onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
        onOpenPatientPortal={() => setIsPatientPortalOpen(true)}
      />

      {/* Appointment Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedDoctor={selectedDoctorForBooking}
        preselectedService={selectedServiceForBooking}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Gemini AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Patient Portal Modal */}
      <PatientPortalModal
        isOpen={isPatientPortalOpen}
        onClose={() => setIsPatientPortalOpen(false)}
        onOpenBooking={() => handleOpenBooking()}
      />

    </div>
  );
}
