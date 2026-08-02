import React from 'react';
import { ShieldCheck, Award, Heart, CheckCircle, Clock, MapPin, Sparkles } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface AboutClinicProps {
  onOpenBooking: () => void;
}

export const AboutClinic: React.FC<AboutClinicProps> = ({ onOpenBooking }) => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-white text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Exterior Clinic Image & Badges */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group">
              <img
                src={CLINIC_INFO.exteriorImage}
                alt="Ram Medicals Multiclinic Exterior Building in Bagaluru"
                className="w-full h-[420px] sm:h-[500px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              
              {/* Bottom Overlay Info */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Bagaluru Main Road Landmark</h4>
                      <p className="text-xs text-slate-600">Easy accessibility with vehicle parking</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                    Open Daily
                  </span>
                </div>
              </div>
            </div>

            {/* Experience Badge */}
            <div className="absolute -top-6 -right-4 sm:right-6 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 text-slate-950 flex items-center justify-center font-extrabold text-xl font-display">
                15+
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">Years of Trust</p>
                <p className="text-sm font-bold text-white">In Bagaluru Town</p>
              </div>
            </div>
          </div>

          {/* Right: Text & Key Feature Checklist */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider border border-teal-200">
              <Award className="w-3.5 h-3.5 text-teal-600" />
              <span>ABOUT RAM MEDICALS MULTICLINIC</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display leading-tight">
              Healthcare built around people.
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Established with the core vision of delivering ethical, high-quality, and affordable healthcare to families in Bagaluru, Bandikodigehalli, and North Bengaluru. We eliminate long travel times to distant hospitals by bringing top-tier medical specialists and modern diagnostics right to your neighborhood.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "Multi-specialty OPD under one roof",
                "Automated pathology blood lab",
                "Pediatric growth & vaccination clinic",
                "Digital ECG & cardiac screening",
                "First aid trauma & wound dressing",
                "Attached fully stocked pharmacy"
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-sm font-semibold text-slate-800">{feature}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Schedule Doctor Visit</span>
              </button>

              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium">
                <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Morning 8 AM - 1:30 PM | Evening 4:30 PM - 9 PM</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
