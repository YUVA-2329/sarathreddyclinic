import React, { useState } from 'react';
import { DOCTORS, TIME_SLOTS } from '../data/clinicData';
import { Doctor, Appointment } from '../types';
import { X, Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2, ArrowRight, ShieldCheck, Download, Sparkles } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDoctor?: Doctor | null;
  preselectedService?: string | null;
  onBookingSuccess: (appointment: Appointment) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedDoctor,
  preselectedService,
  onBookingSuccess
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    preselectedDoctor?.id || DOCTORS[0].id
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:30 AM');
  const [sessionType, setSessionType] = useState<'morning' | 'evening'>('morning');

  // Patient Info Form State
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [reason, setReason] = useState(preselectedService ? `Consultation for ${preselectedService}` : '');

  const [loading, setLoading] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  if (!isOpen) return null;

  const currentDoctor = DOCTORS.find(d => d.id === selectedDoctorId) || DOCTORS[0];

  const handleNextStep = () => {
    if (step === 1 && !selectedDoctorId) return;
    if (step === 2 && (!selectedDate || !selectedTimeSlot)) return;
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(Math.max(1, step - 1));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !phone) return;

    setLoading(true);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName,
          phone,
          email,
          doctorName: currentDoctor.name,
          specialty: currentDoctor.specialty,
          date: selectedDate,
          timeSlot: selectedTimeSlot,
          reason: reason || 'General Consultation'
        })
      });

      const data = await response.json();
      if (data.success) {
        setConfirmedAppointment(data.data);
        onBookingSuccess(data.data);
        setStep(4); // Confirmation step

        // Open WhatsApp
        const waMessage = `Hello Ram Medicals, I have booked an appointment.\n\nPatient Name: ${patientName}\nDoctor: ${currentDoctor.name}\nDate: ${selectedDate}\nTime: ${selectedTimeSlot}\nReason: ${reason || 'General Consultation'}\nToken: ${data.data.id}`;
        window.open(`https://wa.me/91808836214?text=${encodeURIComponent(waMessage)}`, '_blank');
      }
    } catch (err) {
      console.error('Failed to create appointment', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrintOrDownload = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold border border-teal-500/40">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display">Book Doctor Visit</h3>
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

        {/* Step Wizard Indicator Bar */}
        {step < 4 && (
          <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-600 shrink-0">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-teal-700' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-teal-600 text-white' : 'bg-slate-200'}`}>1</span>
              <span>Doctor</span>
            </div>
            <div className="w-8 h-0.5 bg-slate-200"></div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-teal-700' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-teal-600 text-white' : 'bg-slate-200'}`}>2</span>
              <span>Date & Slot</span>
            </div>
            <div className="w-8 h-0.5 bg-slate-200"></div>
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-teal-700' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-teal-600 text-white' : 'bg-slate-200'}`}>3</span>
              <span>Patient Details</span>
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* STEP 1: Select Doctor */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-slate-500">
                Step 1: Choose Specialist Doctor
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DOCTORS.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoctorId(doc.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
                      selectedDoctorId === doc.id
                        ? 'bg-teal-50/80 border-teal-500 shadow-md ring-2 ring-teal-500/30'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div>
                      <h5 className="font-bold text-slate-900 text-sm">{doc.name}</h5>
                      <p className="text-xs text-teal-700 font-medium">{doc.specialty}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{doc.timing}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Pick Date & Time Slot */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="p-4 bg-teal-50/80 rounded-2xl border border-teal-200 flex items-center gap-3">
                <img src={currentDoctor.image} alt={currentDoctor.name} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{currentDoctor.name}</h4>
                  <p className="text-xs text-teal-700 font-medium">{currentDoctor.specialty}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Appointment Date
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select Time Slot
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSessionType('morning')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        sessionType === 'morning' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Morning OPD
                    </button>
                    <button
                      type="button"
                      onClick={() => setSessionType('evening')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        sessionType === 'evening' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Evening OPD
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {TIME_SLOTS[sessionType].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedTimeSlot === slot
                          ? 'bg-teal-600 text-white shadow-md'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Patient Form */}
          {step === 3 && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="p-3 bg-slate-100 rounded-xl text-xs text-slate-700 flex justify-between items-center font-medium">
                <span>Doctor: <strong className="text-slate-900">{currentDoctor.name}</strong></span>
                <span>Date: <strong className="text-slate-900">{selectedDate} ({selectedTimeSlot})</strong></span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 808836214"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 34"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="patient@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Primary Symptoms / Visit Purpose
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. High fever for 2 days, body ache, or routine BP check"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="firstTimeToggle"
                  checked={isFirstTime}
                  onChange={(e) => setIsFirstTime(e.target.checked)}
                  className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                />
                <label htmlFor="firstTimeToggle" className="text-xs text-slate-700 font-medium cursor-pointer">
                  First-time visiting Ram Medicals Multiclinic Bagaluru
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !patientName || !phone}
                className="w-full mt-4 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 shadow-lg shadow-teal-600/25 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span>Generating Appointment Token...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Confirm & Generate Appointment Token</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 4: Confirmation Ticket View */}
          {step === 4 && confirmedAppointment && (
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="px-3 py-1 bg-teal-100 text-teal-800 text-xs font-extrabold uppercase rounded-full tracking-wider">
                  Booking Confirmed
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 font-display">
                  Appointment Ticket Reserved!
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Reference Token: <strong className="text-teal-700 text-sm">{confirmedAppointment.id}</strong>
                </p>
              </div>

              {/* Printable Appointment Pass */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-3 font-sans shadow-inner">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">RAM MEDICALS MULTICLINIC</h5>
                    <p className="text-[11px] text-slate-500">123 Health Avenue, Bagaluru</p>
                  </div>
                  <span className="text-xs font-extrabold text-teal-700 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                    OPD TOKEN
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-slate-500">Patient Name:</p>
                    <p className="font-bold text-slate-900">{confirmedAppointment.patientName}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Doctor:</p>
                    <p className="font-bold text-slate-900">{confirmedAppointment.doctorName}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Specialty:</p>
                    <p className="font-bold text-slate-900">{confirmedAppointment.specialty}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Date & Slot:</p>
                    <p className="font-bold text-teal-700">{confirmedAppointment.date} @ {confirmedAppointment.timeSlot}</p>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-200/80 flex items-center justify-between">
                  <span>Please arrive 10 minutes prior to slot.</span>
                  <span className="text-emerald-700 font-semibold">SMS confirmation sent</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handlePrintOrDownload}
                  className="w-full py-3 px-4 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Print / Save Appointment Pass</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-3 px-4 bg-slate-100 text-slate-800 rounded-xl text-xs font-bold hover:bg-slate-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Done & Back to Home</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Controls Footer */}
        {step < 4 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center shrink-0">
            {step > 1 ? (
              <button
                onClick={handlePrevStep}
                className="px-4 py-2 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-bold transition-colors"
              >
                Back
              </button>
            ) : <div></div>}

            {step < 3 && (
              <button
                onClick={handleNextStep}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
