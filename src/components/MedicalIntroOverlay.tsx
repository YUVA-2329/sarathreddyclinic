import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Shield, Sparkles, HeartPulse, Stethoscope, CheckCircle2, FastForward } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface MedicalIntroOverlayProps {
  onComplete?: () => void;
  forcedShow?: boolean;
}

export const MedicalIntroOverlay: React.FC<MedicalIntroOverlayProps> = ({
  onComplete,
  forcedShow = false
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // Check if intro has been played in session unless forced
    const hasSeenIntro = sessionStorage.getItem('hasSeenMedicalIntro');
    if (hasSeenIntro && !forcedShow) {
      setIsVisible(false);
      return;
    }

    // 3 Second Progress Timer
    const startTime = Date.now();
    const duration = 3000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          sessionStorage.setItem('hasSeenMedicalIntro', 'true');
          if (onComplete) onComplete();
        }, 200);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [forcedShow, onComplete]);

  const handleSkip = () => {
    setIsVisible(false);
    sessionStorage.setItem('hasSeenMedicalIntro', 'true');
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="medical-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-2xl text-white overflow-hidden"
        >
          {/* Glowing Glassmorphic Background Orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-teal-500/20 via-emerald-500/10 to-cyan-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
          <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Grid lines overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none"></div>

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute top-6 right-6 z-10 px-4 py-2 rounded-full bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 backdrop-blur-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg"
          >
            <span>Skip Intro</span>
            <FastForward className="w-3.5 h-3.5 text-teal-400" />
          </button>

          {/* Central Glassmorphic Card */}
          <div className="relative w-full max-w-lg mx-4 p-8 sm:p-10 rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] flex flex-col items-center text-center space-y-6">
            
            {/* Top Medical Pulse Symbol Container */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500/30 via-emerald-500/20 to-cyan-500/30 p-0.5 border border-teal-400/40 shadow-[0_0_30px_rgba(20,184,166,0.3)] flex items-center justify-center backdrop-blur-md">
                <div className="w-full h-full bg-slate-950/80 rounded-[14px] flex items-center justify-center overflow-hidden">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  >
                    <HeartPulse className="w-10 h-10 text-teal-400" />
                  </motion.div>
                </div>
              </div>

              {/* Orbiting Sparkle */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-400/20 border border-emerald-400/50 flex items-center justify-center backdrop-blur-sm"
              >
                <Sparkles className="w-3 h-3 text-emerald-300" />
              </motion.div>
            </motion.div>

            {/* Clinic Brand & Title */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-[10px] font-extrabold uppercase tracking-widest backdrop-blur-md">
                <Shield className="w-3 h-3 text-teal-400" />
                <span>BAGALURU MULTICLINIC & DIAGNOSTICS</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white drop-shadow-md">
                Ram Medicals Multiclinic
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xs mx-auto">
                Comprehensive Family OPD Care, Pediatrics, Cardiology & Automated Pathology Lab
              </p>
            </motion.div>

            {/* Animated ECG Pulse Heartbeat Path */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full h-12 flex items-center justify-center py-1"
            >
              <svg className="w-full h-full text-teal-400 overflow-visible" viewBox="0 0 300 40">
                <motion.path
                  d="M 0 20 L 60 20 L 70 8 L 80 32 L 95 0 L 110 40 L 125 15 L 135 25 L 145 20 L 300 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0.2 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                />
              </svg>
            </motion.div>

            {/* Glassmorphic Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="w-full space-y-2"
            >
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
                <span className="flex items-center gap-1 text-teal-300">
                  <Activity className="w-3 h-3 text-teal-400 animate-spin" />
                  <span>INITIALIZING HEALTH PORTAL</span>
                </span>
                <span className="font-mono text-emerald-400">{progress}%</span>
              </div>

              <div className="w-full h-2 bg-slate-950/80 rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-400 rounded-full shadow-[0_0_12px_rgba(20,184,166,0.8)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                ></motion.div>
              </div>
            </motion.div>

            {/* Bottom Status Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="pt-1 flex flex-wrap items-center justify-center gap-2 text-[10px] text-slate-300"
            >
              <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-teal-400" />
                <span>OPD Open Mon-Sat</span>
              </span>

              <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>AI Health Concierge Ready</span>
              </span>
            </motion.div>

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
