import React from 'react';
import { Phone, Calendar, Sparkles, User, MapPin } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface MobileBottomNavProps {
  onOpenBooking: () => void;
  onOpenAIAssistant: () => void;
  onOpenPatientPortal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onOpenBooking,
  onOpenAIAssistant,
  onOpenPatientPortal,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-2 sm:hidden shadow-2xl">
      <div className="grid grid-cols-4 gap-1 text-center text-[10px] font-semibold text-slate-300">
        
        <a
          href={`tel:${CLINIC_INFO.phonePrimary}`}
          className="flex flex-col items-center justify-center p-1.5 hover:text-white rounded-lg active:bg-slate-800"
        >
          <Phone className="w-5 h-5 text-emerald-400 mb-0.5" />
          <span>Call</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="flex flex-col items-center justify-center p-1.5 text-teal-300 hover:text-white rounded-lg active:bg-slate-800 cursor-pointer"
        >
          <Calendar className="w-5 h-5 text-teal-400 mb-0.5" />
          <span>Book Visit</span>
        </button>

        <button
          onClick={onOpenAIAssistant}
          className="flex flex-col items-center justify-center p-1.5 text-emerald-300 hover:text-white rounded-lg active:bg-slate-800 cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-emerald-400 mb-0.5 animate-pulse" />
          <span>AI Help</span>
        </button>

        <button
          onClick={onOpenPatientPortal}
          className="flex flex-col items-center justify-center p-1.5 hover:text-white rounded-lg active:bg-slate-800 cursor-pointer"
        >
          <User className="w-5 h-5 text-teal-400 mb-0.5" />
          <span>Portal</span>
        </button>

      </div>
    </div>
  );
};
