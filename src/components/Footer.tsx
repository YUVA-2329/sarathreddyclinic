import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { Phone, Mail, MapPin, Calendar, Clock, ShieldCheck, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAIAssistant: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenAIAssistant }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1 & 2: Branding */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center overflow-hidden">
                  <img src={CLINIC_INFO.logoUrl} alt="Ram Medicals Multiclinic" className="w-8 h-8 object-contain" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-display uppercase tracking-wide">
                  RAM MEDICALS MULTICLINIC
                </h3>
                <p className="text-[11px] font-semibold text-teal-400 uppercase tracking-widest">
                  BAGALURU • BENGALURU
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              State-of-the-art medical multiclinic delivering expert general medicine, pediatrics, cardiology, gynecology, orthopedics, and in-house pathology laboratory services in Bagaluru.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="px-4 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-teal-400 hover:bg-teal-300 transition-all flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Doctor Appointment</span>
              </button>

              <button
                onClick={onOpenAIAssistant}
                className="px-4 py-2.5 rounded-xl font-semibold text-xs text-emerald-300 bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 transition-all cursor-pointer"
              >
                <span>Ask AI Concierge</span>
              </button>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-teal-400 transition-colors">About Clinic</a></li>
              <li><a href="#services" className="hover:text-teal-400 transition-colors">Medical Services</a></li>
              <li><a href="#doctors" className="hover:text-teal-400 transition-colors">Specialist Doctors</a></li>
              <li><a href="#gallery" className="hover:text-teal-400 transition-colors">Facility Gallery</a></li>
              <li><a href="#location" className="hover:text-teal-400 transition-colors">Timings & Directions</a></li>
            </ul>
          </div>

          {/* Col 4: Medical Specialties */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Specialties
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>General Medicine & Family Practice</li>
              <li>Pediatrics & Neonatology</li>
              <li>Cardiology & Heart Care</li>
              <li>Obstetrics & Gynecology</li>
              <li>Orthopedics & Joint Care</li>
              <li>Automated Blood Diagnostics</li>
            </ul>
          </div>

          {/* Col 5: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Bagaluru Desk
            </h4>
            <div className="space-y-2.5 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>123 Health Avenue, Main Road, Bagaluru, Bengaluru 562149</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${CLINIC_INFO.phonePrimary}`} className="hover:text-white font-semibold">
                  {CLINIC_INFO.phonePrimary}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Mon-Sat: 8 AM-1:30 PM & 4:30 PM-9 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} Ram Medicals Multiclinic. All rights reserved. Designed for Bagaluru Community Health.
          </p>

          <div className="flex items-center gap-4">
            <span>Medical Disclaimer: AI & Web portal guidance does not replace direct doctor evaluation.</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-teal-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
