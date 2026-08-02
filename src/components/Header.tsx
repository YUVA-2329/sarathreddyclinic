import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Clock, MapPin, Sparkles, User, Menu, X, ShieldCheck, Play } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface HeaderProps {
  onOpenBooking: (doctorName?: string) => void;
  onOpenPatientPortal: () => void;
  onOpenAIAssistant: () => void;
  onReplayIntro?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenPatientPortal,
  onOpenAIAssistant,
  onReplayIntro,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine live clinic open status based on Indian standard timing roughly
  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    // Clinic hours: 8:00 AM - 1:30 PM (8 to 13) and 4:30 PM - 9:00 PM (16 to 21)
    const open = (hours >= 8 && hours < 14) || (hours >= 16 && hours < 21);
    setIsOpenNow(open);
  }, []);

  return (
    <>
      {/* Main Floating Navigation Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200'
            : 'bg-white py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Branding */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 p-0.5 shadow-md shadow-teal-500/20 group-hover:shadow-lg transition-all">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center overflow-hidden">
                <img
                  src={CLINIC_INFO.logoUrl}
                  alt="Ram Medicals Multiclinic Logo"
                  className="w-9 h-9 object-contain"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 font-display uppercase leading-tight">
                  RAM MEDICALS
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 rounded-full tracking-wide">
                  BAGALURU
                </span>
              </div>
              <p className="text-xs font-semibold text-teal-700 tracking-wide uppercase">
                MULTICLINIC & DIAGNOSTICS
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              className="text-sm font-medium text-slate-700 hover:text-teal-600 transition-colors py-1"
            >
              About Clinic
            </a>
            <a
              href="#services"
              className="text-sm font-medium text-slate-700 hover:text-teal-600 transition-colors py-1"
            >
              Services
            </a>
            <a
              href="#doctors"
              className="text-sm font-medium text-slate-700 hover:text-teal-600 transition-colors py-1"
            >
              Our Doctors
            </a>
            <a
              href="#ai-hub"
              className="text-sm font-semibold text-teal-800 hover:text-teal-600 transition-colors py-1 flex items-center gap-1 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
              <span>AI Health Suite</span>
            </a>
            <a
              href="#gallery"
              className="text-sm font-medium text-slate-700 hover:text-teal-600 transition-colors py-1"
            >
              Facility Gallery
            </a>
            <a
              href="#location"
              className="text-sm font-medium text-slate-700 hover:text-teal-600 transition-colors py-1"
            >
              Location & Hours
            </a>
          </nav>

          {/* Call to Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={CLINIC_INFO.mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all"
              title="Get Directions"
            >
              <MapPin className="w-5 h-5" />
            </a>
            <button
              onClick={() => onOpenBooking()}
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 shadow-md shadow-teal-600/25 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={CLINIC_INFO.mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 hover:text-teal-600 bg-slate-50 hover:bg-teal-50 rounded-lg transition-colors border border-slate-200 hover:border-teal-200"
              aria-label="Get Directions"
            >
              <MapPin className="w-4 h-4" />
            </a>
            <button
              onClick={() => onOpenBooking()}
              className="p-2 text-teal-700 bg-teal-50 rounded-lg font-medium text-xs flex items-center gap-1 border border-teal-200"
            >
              <Calendar className="w-4 h-4" />
              <span>Book</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-teal-600 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium hover:text-teal-600 border-b border-slate-100"
            >
              About Clinic
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium hover:text-teal-600 border-b border-slate-100"
            >
              Medical Services
            </a>
            <a
              href="#doctors"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium hover:text-teal-600 border-b border-slate-100"
            >
              Specialist Doctors
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium hover:text-teal-600 border-b border-slate-100"
            >
              Clinic Gallery
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium hover:text-teal-600 border-b border-slate-100"
            >
              Timings & Directions
            </a>

            <div className="pt-2 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPatientPortal();
                }}
                className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <User className="w-4 h-4 text-teal-600" />
                <span>Patient Portal</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAIAssistant();
                }}
                className="w-full py-2.5 px-3 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-teal-200"
              >
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>AI Health Assistant</span>
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full mt-2 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-teal-600/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Doctor Appointment</span>
            </button>
          </div>
        )}
      </header>
    </>
  );
};
