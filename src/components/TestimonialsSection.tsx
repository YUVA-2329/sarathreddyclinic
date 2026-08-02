import React from 'react';
import { TESTIMONIALS } from '../data/clinicData';
import { Star, Quote, Heart, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-white text-slate-800 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold uppercase tracking-wider border border-rose-200">
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            <span>PATIENT TRUST & REVIEWS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            What Families in Bagaluru Say
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Real stories from local residents who trust Ram Medicals Multiclinic for their family's health.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-slate-50 p-6 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4 hover:border-teal-300 transition-all"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{t.date}</span>
                </div>

                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900">{t.patientName}</p>
                  <p className="text-[11px] text-slate-500">{t.location}</p>
                </div>
                <span className="px-2 py-1 bg-teal-50 text-teal-800 text-[10px] font-bold rounded border border-teal-200">
                  Visited {t.doctorVisited}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
