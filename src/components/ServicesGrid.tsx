import React, { useState } from 'react';
import { SERVICES } from '../data/clinicData';
import { MedicalService } from '../types';
import {
  Stethoscope,
  Baby,
  HeartPulse,
  UserCheck,
  Activity,
  TestTube,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface ServicesGridProps {
  onSelectServiceToBook: (serviceTitle: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Stethoscope,
  Baby,
  HeartPulse,
  UserCheck,
  Activity,
  TestTube,
  Sparkles,
  ShieldAlert
};

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectServiceToBook }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Primary Care', 'Child Health', 'Specialized Care', 'Diagnostics', '24/7 Support'];

  const filteredServices = selectedCategory === 'All'
    ? SERVICES
    : SERVICES.filter(s => s.category === selectedCategory);

  return (
    <section id="services" className="py-16 lg:py-24 bg-slate-50 text-slate-800 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider border border-teal-200">
            <Stethoscope className="w-3.5 h-3.5 text-teal-700" />
            <span>SPECIALTY MEDICAL SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Complete Medical Care Under One Roof
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            From routine family health consultations and child vaccination to high-tech blood pathology and digital ECG diagnostics in Bagaluru.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const IconComponent = ICON_MAP[service.iconName] || Stethoscope;
            return (
              <div
                key={service.id}
                className="group relative bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Popular Ribbon */}
                {service.popular && (
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-teal-800 bg-teal-50 border border-teal-200 rounded-full">
                      Popular Service
                    </span>
                  </div>
                )}

                <div>
                  {/* Icon Header */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-50 to-emerald-100 border border-teal-200 flex items-center justify-center text-teal-700 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider">
                    {service.category}
                  </span>

                  <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2 group-hover:text-teal-700 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 mb-6 pt-2 border-t border-slate-100">
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking Button */}
                <button
                  onClick={() => onSelectServiceToBook(service.title)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-teal-600 hover:text-white text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book for {service.title.split('&')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
