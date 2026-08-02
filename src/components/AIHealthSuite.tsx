import React, { useState } from 'react';
import { Sparkles, Stethoscope, FileSearch, ClipboardCheck, MessageSquareText, ShieldAlert, ArrowRight, CheckCircle2, AlertTriangle, Calendar, RefreshCw, UserCheck } from 'lucide-react';
import { DOCTORS } from '../data/clinicData';
import { Doctor } from '../types';

interface AIHealthSuiteProps {
  onSelectDoctorToBook: (doctor?: Doctor) => void;
  onOpenAIAssistant: () => void;
}

export const AIHealthSuite: React.FC<AIHealthSuiteProps> = ({
  onSelectDoctorToBook,
  onOpenAIAssistant
}) => {
  const [activeTab, setActiveTab] = useState<'symptom' | 'report' | 'prep'>('symptom');

  // Feature 1: Symptom Checker State
  const [symptomsInput, setSymptomsInput] = useState('');
  const [ageInput, setAgeInput] = useState('32');
  const [genderInput, setGenderInput] = useState('Male');
  const [durationInput, setDurationInput] = useState('2 days');
  const [symptomLoading, setSymptomLoading] = useState(false);
  const [symptomResult, setSymptomResult] = useState<any>(null);

  // Feature 2: Report Explainer State
  const [reportInput, setReportInput] = useState('');
  const [reportType, setReportType] = useState('Lipid Profile & Blood Sugar');
  const [reportLoading, setReportLoading] = useState(false);
  const [reportResult, setReportResult] = useState<any>(null);

  // Feature 3: Visit Prep State
  const [complaintInput, setComplaintInput] = useState('');
  const [historyInput, setHistoryInput] = useState('');
  const [prepLoading, setPrepLoading] = useState(false);
  const [prepResult, setPrepResult] = useState<any>(null);

  // Quick preset symptom buttons
  const presetSymptoms = [
    "High fever 101°F with body chills and sore throat",
    "Persistent dry cough for 5 days with mild chest tight feeling",
    "Child (4 yrs) has skin rash, loss of appetite and mild fever",
    "Knee joint stiffness and swelling after walking",
    "Frequent headache, dizziness and high blood pressure feeling"
  ];

  // Quick preset lab report samples
  const presetReports = [
    "HbA1c: 7.4%, Fasting Blood Sugar: 142 mg/dL, Post Prandial: 210 mg/dL",
    "Hemoglobin: 10.8 g/dL, Total RBC: 3.9, Platelet Count: 180,000 /mcL",
    "Total Cholesterol: 238 mg/dL, Triglycerides: 195 mg/dL, HDL: 38 mg/dL, LDL: 152 mg/dL",
    "TSH: 6.8 uIU/mL, Free T3: 2.9 pg/mL, Free T4: 1.1 ng/dL"
  ];

  const handleRunSymptomChecker = async (textOverride?: string) => {
    const symptomsToAnalyze = textOverride || symptomsInput;
    if (!symptomsToAnalyze.trim()) return;

    if (textOverride) setSymptomsInput(textOverride);
    setSymptomLoading(true);
    setSymptomResult(null);

    try {
      const res = await fetch('/api/ai/symptom-checker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptoms: symptomsToAnalyze,
          age: ageInput,
          gender: genderInput,
          duration: durationInput
        })
      });
      const data = await res.json();
      setSymptomResult(data);
    } catch (err) {
      console.error('Symptom checker failed', err);
    } finally {
      setSymptomLoading(false);
    }
  };

  const handleRunReportExplainer = async (reportOverride?: string) => {
    const textToExplain = reportOverride || reportInput;
    if (!textToExplain.trim()) return;

    if (reportOverride) setReportInput(reportOverride);
    setReportLoading(true);
    setReportResult(null);

    try {
      const res = await fetch('/api/ai/report-explainer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportText: textToExplain,
          testType: reportType
        })
      });
      const data = await res.json();
      setReportResult(data);
    } catch (err) {
      console.error('Report explainer failed', err);
    } finally {
      setReportLoading(false);
    }
  };

  const handleRunVisitPrep = async () => {
    if (!complaintInput.trim()) return;

    setPrepLoading(true);
    setPrepResult(null);

    try {
      const res = await fetch('/api/ai/visit-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mainComplaint: complaintInput,
          duration: durationInput,
          medicalHistory: historyInput
        })
      });
      const data = await res.json();
      setPrepResult(data);
    } catch (err) {
      console.error('Visit prep failed', err);
    } finally {
      setPrepLoading(false);
    }
  };

  // Find matching doctor from string returned by AI
  const findMatchedDoctor = (docNameOrSpecialty?: string) => {
    if (!docNameOrSpecialty) return DOCTORS[0];
    const matched = DOCTORS.find(d => 
      d.name.toLowerCase().includes(docNameOrSpecialty.toLowerCase()) ||
      d.specialty.toLowerCase().includes(docNameOrSpecialty.toLowerCase())
    );
    return matched || DOCTORS[0];
  };

  return (
    <section id="ai-hub" className="py-16 lg:py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      
      {/* Background Glow Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-extrabold uppercase tracking-wider border border-emerald-500/30">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>POWERED BY GEMINI 3.6 FLASH</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            AI Smart Health Assistant Suite
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            Instant symptom triage, simplified blood lab report translations, and OPD consultation prep tools designed specifically for patients at Ram Medicals Multiclinic.
          </p>
        </div>

        {/* Main Tab Control Bar */}
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto mb-10 p-1.5 bg-slate-800/80 rounded-2xl border border-slate-700/80 backdrop-blur-md">
          <button
            onClick={() => setActiveTab('symptom')}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'symptom'
                ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-lg shadow-teal-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>Symptom Triage</span>
          </button>

          <button
            onClick={() => setActiveTab('report')}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'report'
                ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-lg shadow-teal-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <FileSearch className="w-4 h-4" />
            <span>Lab Report Explainer</span>
          </button>

          <button
            onClick={() => setActiveTab('prep')}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'prep'
                ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-lg shadow-teal-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <ClipboardCheck className="w-4 h-4" />
            <span>Doctor Visit Prep</span>
          </button>
        </div>

        {/* TAB 1: AI SYMPTOM CHECKER & DOCTOR MATCHER */}
        {activeTab === 'symptom' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
            
            {/* Input Form Column */}
            <div className="lg:col-span-6 bg-slate-800/90 border border-slate-700 p-6 rounded-3xl space-y-5 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold border border-teal-500/30">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">AI Symptom Assessor</h3>
                  <p className="text-xs text-slate-400">Describe what you are experiencing</p>
                </div>
              </div>

              {/* Patient Meta Details */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Age</label>
                  <input
                    type="number"
                    value={ageInput}
                    onChange={(e) => setAgeInput(e.target.value)}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-teal-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Gender</label>
                  <select
                    value={genderInput}
                    onChange={(e) => setGenderInput(e.target.value)}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-teal-400"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Child">Child / Infant</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Duration</label>
                  <input
                    type="text"
                    value={durationInput}
                    onChange={(e) => setDurationInput(e.target.value)}
                    placeholder="e.g. 2 days"
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-teal-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Symptom Description</label>
                <textarea
                  rows={4}
                  value={symptomsInput}
                  onChange={(e) => setSymptomsInput(e.target.value)}
                  placeholder="e.g., High fever since yesterday morning, sore throat, severe headache and fatigue..."
                  className="w-full p-3.5 bg-slate-900 border border-slate-700 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                ></textarea>
              </div>

              {/* Presets */}
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400 mb-2">Or click a sample symptom scenario:</p>
                <div className="flex flex-wrap gap-1.5">
                  {presetSymptoms.map((ps, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleRunSymptomChecker(ps)}
                      className="px-2.5 py-1 bg-slate-900 hover:bg-slate-700 text-slate-300 text-[11px] rounded-lg border border-slate-700/80 cursor-pointer text-left transition-colors"
                    >
                      "{ps.substring(0, 32)}..."
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleRunSymptomChecker()}
                disabled={symptomLoading || !symptomsInput.trim()}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-all cursor-pointer"
              >
                {symptomLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Symptoms with Gemini...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run AI Triage Assessment</span>
                  </>
                )}
              </button>
            </div>

            {/* Assessment Result Column */}
            <div className="lg:col-span-6 space-y-4">
              {!symptomResult && !symptomLoading && (
                <div className="bg-slate-800/40 border border-dashed border-slate-700 p-8 rounded-3xl text-center space-y-3 min-h-[350px] flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white font-display">Awaiting Symptom Input</h4>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Enter your symptoms or select a sample scenario above to generate an immediate AI triage report and doctor recommendation.
                  </p>
                </div>
              )}

              {symptomLoading && (
                <div className="bg-slate-800/80 border border-slate-700 p-8 rounded-3xl text-center space-y-4 min-h-[350px] flex flex-col items-center justify-center">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center animate-bounce">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-semibold text-teal-300">Evaluating clinical markers for Bagaluru OPD...</p>
                </div>
              )}

              {symptomResult && (
                <div className="bg-slate-800 border border-teal-500/40 p-6 rounded-3xl space-y-5 shadow-2xl animate-in fade-in duration-200">
                  
                  {/* Urgency Badge */}
                  <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                    <span className="text-xs font-bold uppercase text-slate-400">Triage Level</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 border ${
                      symptomResult.urgency?.includes('Emergency')
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : symptomResult.urgency?.includes('Prompt')
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    }`}>
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{symptomResult.urgency || 'OPD Visit Advised'}</span>
                    </span>
                  </div>

                  {/* Analysis */}
                  <div>
                    <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">Clinical Assessment Summary</h4>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-900/80 p-3.5 rounded-2xl border border-slate-700/80">
                      {symptomResult.analysis}
                    </p>
                  </div>

                  {/* Recommended Doctor Box */}
                  <div className="p-4 bg-gradient-to-r from-teal-950/80 to-slate-900 rounded-2xl border border-teal-500/30 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-teal-300">Recommended Specialist</span>
                      <p className="text-sm font-bold text-white font-display">{symptomResult.recommendedDoctor || "Dr. Rajesh V. Ram"}</p>
                      <p className="text-xs text-slate-300">{symptomResult.recommendedSpecialty || "General Medicine"}</p>
                    </div>

                    <button
                      onClick={() => {
                        const matchedDoc = findMatchedDoctor(symptomResult.recommendedDoctor || symptomResult.recommendedSpecialty);
                        onSelectDoctorToBook(matchedDoc);
                      }}
                      className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer shrink-0"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book OPD Visit</span>
                    </button>
                  </div>

                  {/* Suggested Actions */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase mb-2">Immediate Practical Steps:</h4>
                    <ul className="space-y-1.5">
                      {symptomResult.suggestedActions?.map((act: string, i: number) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-[10px] text-slate-400 border-t border-slate-700/80 pt-3 italic">
                    {symptomResult.disclaimer}
                  </p>

                </div>
              )}

            </div>

          </div>
        )}

        {/* TAB 2: AI LAB REPORT EXPLAINER */}
        {activeTab === 'report' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
            
            <div className="lg:col-span-6 bg-slate-800/90 border border-slate-700 p-6 rounded-3xl space-y-5 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold border border-teal-500/30">
                  <FileSearch className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Lab Report Translator</h3>
                  <p className="text-xs text-slate-400">Decode pathology terms & blood test values</p>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Test Category</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-teal-400"
                >
                  <option value="Lipid Profile & Blood Sugar">Lipid Profile & Blood Sugar</option>
                  <option value="Complete Blood Count (CBC)">Complete Blood Count (CBC)</option>
                  <option value="Thyroid Profile (T3, T4, TSH)">Thyroid Profile (T3, T4, TSH)</option>
                  <option value="Liver & Kidney Function (LFT/KFT)">Liver & Kidney Function (LFT/KFT)</option>
                  <option value="X-Ray or Diagnostic Note">X-Ray / Scan Impression</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Paste Values or Diagnostic Text</label>
                <textarea
                  rows={4}
                  value={reportInput}
                  onChange={(e) => setReportInput(e.target.value)}
                  placeholder="Paste test values e.g. HbA1c: 7.2%, Fasting Blood Sugar: 135 mg/dL..."
                  className="w-full p-3.5 bg-slate-900 border border-slate-700 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                ></textarea>
              </div>

              {/* Sample Presets */}
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400 mb-2">Or try sample report values:</p>
                <div className="flex flex-col gap-1.5">
                  {presetReports.map((pr, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleRunReportExplainer(pr)}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-700 text-slate-300 text-xs rounded-xl border border-slate-700/80 cursor-pointer text-left transition-colors"
                    >
                      {pr}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleRunReportExplainer()}
                disabled={reportLoading || !reportInput.trim()}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-all cursor-pointer"
              >
                {reportLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Simplifying Medical Terms...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Explain Lab Values in Plain English</span>
                  </>
                )}
              </button>
            </div>

            {/* Explainer Output */}
            <div className="lg:col-span-6 space-y-4">
              {!reportResult && !reportLoading && (
                <div className="bg-slate-800/40 border border-dashed border-slate-700 p-8 rounded-3xl text-center space-y-3 min-h-[350px] flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
                    <FileSearch className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white font-display">Awaiting Lab Values</h4>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Paste blood test parameters above to receive plain English explanations and health guidance.
                  </p>
                </div>
              )}

              {reportLoading && (
                <div className="bg-slate-800/80 border border-slate-700 p-8 rounded-3xl text-center space-y-4 min-h-[350px] flex flex-col items-center justify-center">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center animate-bounce">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-semibold text-teal-300">Translating pathology findings...</p>
                </div>
              )}

              {reportResult && (
                <div className="bg-slate-800 border border-teal-500/40 p-6 rounded-3xl space-y-5 shadow-2xl animate-in fade-in duration-200">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-teal-300">Overview</span>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed mt-1 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-700">
                      {reportResult.simplifiedSummary}
                    </p>
                  </div>

                  {reportResult.keyFindings && reportResult.keyFindings.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-300 uppercase mb-2">Parameter Breakdowns:</h4>
                      <div className="space-y-2">
                        {reportResult.keyFindings.map((kf: any, i: number) => (
                          <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-700/80 space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-teal-300">{kf.parameter}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                                {kf.status || 'Reviewed'}
                              </span>
                            </div>
                            <p className="text-xs text-slate-300">{kf.meaning}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {reportResult.questionsToAskDoctor && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-300 uppercase mb-1.5">Questions to ask doctor:</h4>
                      <ul className="space-y-1">
                        {reportResult.questionsToAskDoctor.map((q: string, i: number) => (
                          <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => onSelectDoctorToBook()}
                      className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1"
                    >
                      <span>Show Report to Doctor</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

        {/* TAB 3: DOCTOR VISIT PREP SHEET */}
        {activeTab === 'prep' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
            
            <div className="lg:col-span-6 bg-slate-800/90 border border-slate-700 p-6 rounded-3xl space-y-5 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold border border-teal-500/30">
                  <ClipboardCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Doctor Visit Prep Tool</h3>
                  <p className="text-xs text-slate-400">Prepare a clear summary for your OPD consultation</p>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Main Reason for Visit</label>
                <input
                  type="text"
                  value={complaintInput}
                  onChange={(e) => setComplaintInput(e.target.value)}
                  placeholder="e.g. Back pain after lifting heavy box, worse when sitting"
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Ongoing Medications or Conditions (Optional)</label>
                <textarea
                  rows={3}
                  value={historyInput}
                  onChange={(e) => setHistoryInput(e.target.value)}
                  placeholder="e.g., Taking Metformin 500mg daily for diabetes, allergic to penicillin..."
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-teal-400"
                ></textarea>
              </div>

              <button
                onClick={handleRunVisitPrep}
                disabled={prepLoading || !complaintInput.trim()}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-all cursor-pointer"
              >
                {prepLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Generating Prep Sheet...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Consultation Prep Summary</span>
                  </>
                )}
              </button>
            </div>

            {/* Visit Prep Output */}
            <div className="lg:col-span-6 space-y-4">
              {!prepResult && !prepLoading && (
                <div className="bg-slate-800/40 border border-dashed border-slate-700 p-8 rounded-3xl text-center space-y-3 min-h-[350px] flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
                    <ClipboardCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white font-display">Awaiting Consultation Details</h4>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Fill in your chief complaint to generate a tidy consultation prep card to show your doctor at Ram Medicals.
                  </p>
                </div>
              )}

              {prepLoading && (
                <div className="bg-slate-800/80 border border-slate-700 p-8 rounded-3xl text-center space-y-4 min-h-[350px] flex flex-col items-center justify-center">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center animate-bounce">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-semibold text-teal-300">Creating consultation prep sheet...</p>
                </div>
              )}

              {prepResult && (
                <div className="bg-slate-800 border border-teal-500/40 p-6 rounded-3xl space-y-4 shadow-2xl animate-in fade-in duration-200">
                  <div className="p-3 bg-teal-500/10 border border-teal-500/30 rounded-xl text-teal-300 text-xs font-bold flex justify-between items-center">
                    <span>RAM MEDICALS OPD PREP SHEET</span>
                    <span className="text-[10px] uppercase bg-slate-900 px-2 py-0.5 rounded">Ready for Doctor</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400">Chief Complaint Summary</span>
                    <p className="text-xs text-white font-semibold mt-1 bg-slate-900 p-3 rounded-xl border border-slate-700">
                      {prepResult.chiefComplaintSummary}
                    </p>
                  </div>

                  {prepResult.suggestedQuestions && (
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400">Recommended Questions for Doctor</span>
                      <ul className="mt-1 space-y-1.5">
                        {prepResult.suggestedQuestions.map((q: string, i: number) => (
                          <li key={i} className="text-xs text-slate-200 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                              {i + 1}
                            </span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => onSelectDoctorToBook()}
                      className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Proceed to Book Doctor Appointment</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

        {/* Floating Quick Action Banner to AI Concierge */}
        <div className="mt-12 bg-gradient-to-r from-teal-900/80 via-slate-800 to-emerald-900/80 border border-teal-500/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0 border border-teal-500/40">
              <MessageSquareText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-display">Need Interactive Health Conversation?</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Chat in real-time with our AI Concierge about doctor availability, child care, or clinic timings.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenAIAssistant}
            className="px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold rounded-2xl text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open AI Health Chat</span>
          </button>
        </div>

      </div>
    </section>
  );
};
