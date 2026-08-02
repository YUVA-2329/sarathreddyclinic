import React, { useState, useEffect } from 'react';
import { X, User, Calendar, FileText, Search, Activity, CheckCircle2, Clock, Phone, ArrowRight } from 'lucide-react';
import { Appointment } from '../types';

interface PatientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const PatientPortalModal: React.FC<PatientPortalModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking
}) => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'lab' | 'calculator'>('appointments');
  const [appointmentsList, setAppointmentsList] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Health Calculator state
  const [weightKg, setWeightKg] = useState<string>('70');
  const [heightCm, setHeightCm] = useState<string>('170');
  const [bmiResult, setBmiResult] = useState<number | null>(24.2);

  useEffect(() => {
    if (isOpen) {
      fetchAppointments();
    }
  }, [isOpen]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/appointments');
      const data = await res.json();
      if (data.success) {
        setAppointmentsList(data.data);
      }
    } catch (e) {
      console.error('Failed to fetch appointments', e);
    } finally {
      setLoading(false);
    }
  };

  const calculateBmi = () => {
    const w = parseFloat(weightKg);
    const h = parseFloat(heightCm) / 100;
    if (w > 0 && h > 0) {
      const bmi = parseFloat((w / (h * h)).toFixed(1));
      setBmiResult(bmi);
    }
  };

  if (!isOpen) return null;

  const filteredAppointments = searchQuery
    ? appointmentsList.filter(
        a =>
          a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.phone.includes(searchQuery)
      )
    : appointmentsList;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[85vh]">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold border border-teal-500/30">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display">Patient Portal & Records</h3>
              <p className="text-xs text-slate-400">Ram Medicals Multiclinic • Bagaluru</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection Navigation */}
        <div className="bg-slate-100 p-2 border-b border-slate-200 flex gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'appointments'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4 text-teal-600" />
            <span>My Appointments ({appointmentsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('lab')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'lab'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <FileText className="w-4 h-4 text-teal-600" />
            <span>Lab Reports Search</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'calculator'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Activity className="w-4 h-4 text-teal-600" />
            <span>Health BMI Calculator</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-slate-50">
          
          {/* TAB 1: Appointments */}
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    placeholder="Search by Patient Name, Phone or Token ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking();
                  }}
                  className="py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow"
                >
                  <Calendar className="w-4 h-4" />
                  <span>+ New Appointment</span>
                </button>
              </div>

              {loading ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  Loading appointment records...
                </div>
              ) : filteredAppointments.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 space-y-2">
                  <p className="font-bold text-slate-800 text-sm">No Appointments Found</p>
                  <p className="text-xs">Schedule a visit to see your digital token here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredAppointments.map((appt) => (
                    <div
                      key={appt.id}
                      className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                            {appt.id}
                          </span>
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                            {appt.status}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm">{appt.patientName}</h4>
                        <p className="text-xs text-slate-600 font-medium">
                          Doctor: <span className="text-slate-900">{appt.doctorName}</span> ({appt.specialty})
                        </p>
                        <p className="text-xs text-slate-500">
                          Visit Reason: {appt.reason}
                        </p>
                      </div>

                      <div className="text-left sm:text-right shrink-0">
                        <p className="text-xs font-bold text-teal-700">{appt.date}</p>
                        <p className="text-xs text-slate-800 font-semibold">{appt.timeSlot}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{appt.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Lab Reports Search */}
          {activeTab === 'lab' && (
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h4 className="font-bold text-slate-900 text-sm">Download Lab Test Report</h4>
                <p className="text-xs text-slate-600">
                  Enter your registered mobile number or Sample Barcode ID to access digital pathology results.
                </p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. +91 8088685589 or LAB-2026-99"
                    className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button className="px-5 py-3 bg-teal-600 text-white rounded-xl text-xs font-bold hover:bg-teal-700 shadow">
                    Search Lab
                  </button>
                </div>

                <div className="p-4 bg-teal-50 rounded-xl border border-teal-200 text-xs text-teal-900 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                  <div>
                    <p className="font-bold">Automated WhatsApp Reporting Available</p>
                    <p className="text-[11px] text-teal-800">Lab test reports are automatically dispatched to your WhatsApp within 4-6 hours of blood collection.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BMI Calculator */}
          {activeTab === 'calculator' && (
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Quick Health Indicator: BMI Calculator</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Body Mass Index (BMI) is a useful health measurement for adults.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800"
                  />
                </div>
              </div>

              <button
                onClick={calculateBmi}
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs shadow transition-all"
              >
                Calculate BMI
              </button>

              {bmiResult && (
                <div className="p-4 bg-slate-900 text-white rounded-xl text-center space-y-1">
                  <p className="text-xs text-slate-400 uppercase font-semibold">Your Calculated BMI</p>
                  <p className="text-3xl font-extrabold text-teal-300 font-display">{bmiResult}</p>
                  <p className="text-xs font-medium text-emerald-400">
                    {bmiResult < 18.5 ? 'Underweight' : bmiResult < 25 ? 'Normal / Healthy Range' : bmiResult < 30 ? 'Overweight' : 'Obese'}
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
