import React from 'react';
import { UserCheck, Stethoscope, TestTube, MapPin, Clock3, ShieldAlert } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustItems = [
    {
      icon: Stethoscope,
      title: "EXPERT DOCTORS",
      subtitle: "MD & MS qualified specialists available daily"
    },
    {
      icon: TestTube,
      title: "MODERN DIAGNOSTICS",
      subtitle: "In-house lab & digital 12-lead ECG"
    },
    {
      icon: MapPin,
      title: "LOCAL ACCESS",
      subtitle: "Main Road Bagaluru with spacious parking"
    },
    {
      icon: Clock3,
      title: "ZERO WAIT BOOKING",
      subtitle: "Confirmed time slots via instant token"
    }
  ];

  return (
    <section className="bg-slate-900 border-y border-slate-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/80 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center shrink-0 text-teal-400">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold tracking-wider text-teal-300 uppercase font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
