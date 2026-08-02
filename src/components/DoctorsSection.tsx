import React, { useState } from 'react';
import { DOCTORS } from '../data/clinicData';
import { Doctor } from '../types';
import { Calendar, Star, Clock, Award, Languages, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';

interface DoctorsSectionProps {
  onSelectDoctorToBook: (doctor: Doctor) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onSelectDoctorToBook }) => {
  const [selectedSpecialtyFilter, setSelectedSpecialtyFilter] = useState<string>('All');

  const specialties = [
    'All',
    'General Medicine & Family Practice',
    'Pediatrics & Neonatology',
    'Cardiology & Heart Health',
    'Gynecology & Women\'s Health',
    'Orthopedics & Sports Medicine',
    'Dermatology & Skin Care'
  ];

  const filteredDoctors = selectedSpecialtyFilter === 'All'
    ? DOCTORS
    : DOCTORS.filter(d => d.specialty === selectedSpecialtyFilter);

  return (
    <section id="doctors" className="py-16 lg:py-24 bg-white text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>EXPERT CLINICAL TEAM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Consult With Our Specialist Doctors
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Highly experienced doctors committed to personalized care and thorough health evaluations in Bagaluru.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {specialties.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialtyFilter(spec)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedSpecialtyFilter === spec
                    ? 'bg-slate-900 text-white shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {spec === 'All' ? 'All Doctors' : spec.split('&')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-teal-400 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Doctor Header & Image Container */}
                <div className="relative h-64 bg-slate-200 overflow-hidden">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                  {/* Availability Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md shadow-sm ${
                        doc.availableToday
                          ? 'bg-emerald-500/90 text-white'
                          : 'bg-slate-800/90 text-slate-300'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${doc.availableToday ? 'bg-white animate-pulse' : 'bg-slate-400'}`}></span>
                      {doc.availableToday ? 'Available Today' : 'Available Tomorrow'}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-amber-400 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{doc.rating}</span>
                    <span className="text-slate-400 font-normal">({doc.reviewsCount})</span>
                  </div>

                  {/* Overlay Title */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold font-display">{doc.name}</h3>
                    <p className="text-xs text-teal-300 font-medium">{doc.title}</p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4">
                  {/* Qualification & Experience */}
                  <div className="flex items-center justify-between text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200/80">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Award className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>{doc.qualification}</span>
                    </div>
                    <span className="font-bold text-slate-900 px-2 py-0.5 bg-slate-100 rounded">
                      {doc.experience}
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {doc.bio}
                  </p>

                  {/* Timing */}
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>OPD Hours: {doc.timing}</span>
                  </div>

                  {/* Languages Spoken */}
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Languages className="w-4 h-4 text-teal-600 shrink-0" />
                    <div className="flex flex-wrap gap-1">
                      {doc.languages.map((lang, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-medium">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer with Fee & Book CTA */}
              <div className="p-6 pt-0 border-t border-slate-200/60 mt-2 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500">Consultation Fee</p>
                  <p className="text-lg font-extrabold text-slate-900 font-display">{doc.consultationFee}</p>
                </div>

                <button
                  onClick={() => onSelectDoctorToBook(doc)}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 shadow-md shadow-teal-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Visit</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
