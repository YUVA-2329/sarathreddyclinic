import React from 'react';
import { Calendar, Phone, ShieldCheck, Clock, MapPin, ArrowRight, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenAIAssistant: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenAIAssistant }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-teal-950 to-slate-900 text-white pt-8 pb-16 lg:pt-12 lg:pb-24">
      {/* Background Decorative Blur Elements */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Location Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <MapPin className="w-3.5 h-3.5 text-teal-300" />
              <span>Healthcare in Bagaluru, Bengaluru</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-white leading-[1.15]">
              Better care. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-200">
                Closer to you.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Welcome to <span className="text-white font-semibold">Ram Medicals Multiclinic</span>. 
              Comprehensive healthcare featuring experienced general physicians, pediatricians, cardiologists, gynecologists, and an in-house automated laboratory right on Bagaluru Main Road.
            </p>

            {/* Key Value Bullets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-left max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 font-medium bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Experienced Doctors</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 font-medium bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Automated Lab</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 font-medium bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Wait Booking</span>
              </div>
            </div>

            {/* CTAs Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-slate-900 bg-gradient-to-r from-emerald-400 via-teal-300 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-lg shadow-teal-500/25 transition-all transform active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-slate-950" />
                <span>Book Appointment Now</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <a
                href={`tel:${CLINIC_INFO.phonePrimary}`}
                className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold text-base text-slate-200 bg-slate-800/90 hover:bg-slate-800 border border-slate-700 transition-all flex items-center justify-center gap-2.5 hover:text-white"
              >
                <Phone className="w-5 h-5 text-teal-400" />
                <span>Call Clinic</span>
              </a>

              <button
                onClick={onOpenAIAssistant}
                className="w-full sm:w-auto px-5 py-4 rounded-xl font-semibold text-sm text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900/90 border border-emerald-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Ask AI Assistant</span>
              </button>
            </div>

            {/* Social Trust Metrics */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white font-display">15+ Yrs</p>
                <p className="text-xs text-slate-400">Serving Bagaluru</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white font-display">10,000+</p>
                <p className="text-xs text-slate-400">Happy Families</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white font-display">4.9 ★</p>
                <p className="text-xs text-slate-400">Patient Rating</p>
              </div>
            </div>

          </div>

          {/* Right Column: High Res Hero Image & Floating Glass Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Glowing Border Container */}
              <div className="relative rounded-3xl overflow-hidden p-1 bg-gradient-to-b from-teal-400/40 via-emerald-500/20 to-slate-800 shadow-2xl shadow-teal-900/40">
                <div className="relative aspect-[4/5] sm:aspect-[4/4] rounded-[22px] overflow-hidden bg-slate-800">
                  <img
                    src={CLINIC_INFO.heroImage}
                    alt="Ram Medicals Multiclinic Doctor Patient Consultation"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  {/* Doctor Consultation Badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-xs text-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Expert Consultation</p>
                        <p className="text-[11px] text-slate-400">Air-conditioned, hygienic rooms</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-teal-500/20 text-teal-300 font-bold rounded text-[10px] uppercase">
                      4K Clean Facility
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Schedule Appointment Card */}
              <div className="absolute -top-6 -left-6 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-teal-500/40 shadow-xl shadow-black/50 text-slate-200 animate-bounce-slow">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-300 font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Quick OPD Booking</p>
                  <p className="text-sm font-bold text-white">Available Slots Today</p>
                </div>
              </div>

              {/* Floating Rating Badge */}
              <div className="absolute -bottom-5 -right-5 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-emerald-500/40 shadow-xl shadow-black/50 text-slate-200">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Bagaluru's Top Choice</p>
                  <p className="text-[10px] text-slate-400">Verified Patient Reviews</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
