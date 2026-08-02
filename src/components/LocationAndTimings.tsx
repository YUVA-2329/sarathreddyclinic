import React from 'react';
import { MapPin, Clock, Phone, Navigation, CheckCircle2, Car, Shield, ExternalLink } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export const LocationAndTimings: React.FC = () => {
  return (
    <section id="location" className="py-16 lg:py-24 bg-slate-50 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider border border-teal-200">
            <MapPin className="w-3.5 h-3.5 text-teal-700" />
            <span>CONVENIENT LOCAL LOCATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Visit Us on Bagaluru Main Road
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Located conveniently in the heart of Bagaluru Town with dedicated parking and step-free access for patients.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Timings & Address Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Clinic Address</h3>
                  <p className="text-xs text-slate-500">Bagaluru, North Bengaluru</p>
                </div>
              </div>

              <p className="text-sm font-medium text-slate-700 leading-relaxed pl-1 border-l-2 border-teal-500 my-2">
                {CLINIC_INFO.address}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <a
                  href={CLINIC_INFO.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow transition-all cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Operating Timings Card */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold border border-teal-500/30">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">OPD Consultation Hours</h3>
                    <p className="text-xs text-teal-300">Mon - Sat Sessions</p>
                  </div>
                </div>

                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded-full uppercase border border-emerald-500/30">
                  Weekly Schedule
                </span>
              </div>

              <div className="space-y-3 pt-2 text-xs">
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80 flex justify-between items-center">
                  <span className="text-slate-300 font-semibold">Morning Session (Mon - Sat)</span>
                  <span className="font-bold text-teal-300">{CLINIC_INFO.timingMorning}</span>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80 flex justify-between items-center">
                  <span className="text-slate-300 font-semibold">Evening Session (Mon - Sat)</span>
                  <span className="font-bold text-teal-300">{CLINIC_INFO.timingEvening}</span>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80 flex justify-between items-center">
                  <span className="text-slate-300 font-semibold">Sunday Special OPD</span>
                  <span className="font-bold text-emerald-400">{CLINIC_INFO.timingSunday}</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-2">
                <Car className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Dedicated two-wheeler and four-wheeler parking space.</span>
              </div>
            </div>

            {/* Emergency Call Box */}
            <div className="bg-rose-50 border border-rose-200 p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-rose-800 uppercase tracking-wider">Emergency Helpline</p>
                <p className="text-sm text-rose-900 font-semibold mt-0.5">Need immediate assistance?</p>
              </div>
              <a
                href={`tel:${CLINIC_INFO.emergencyPhone}`}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Phone className="w-4 h-4" />
                <span>{CLINIC_INFO.emergencyPhone}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Google Maps View */}
          <div className="lg:col-span-7">
            <div className="bg-white p-3 rounded-3xl border border-slate-200 shadow-md">
              <div className="relative w-full h-[450px] rounded-2xl overflow-hidden bg-slate-100">
                <iframe
                  title="Ram Medicals Multiclinic Location Map Bagaluru"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31086.123456789!2d77.67!3d13.13!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1be123456789%3A0x123456789abcdef!2sBagaluru%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>

                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-md border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>RAM MEDICALS MULTICLINIC</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
