import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory store for appointments
const appointments: Array<{
  id: string;
  patientName: string;
  phone: string;
  email?: string;
  doctorName: string;
  specialty: string;
  date: string;
  timeSlot: string;
  reason: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}> = [
  {
    id: "RAM-8942",
    patientName: "Suresh Kumar",
    phone: "808836214",
    email: "yuvakishore.vps@gmail.com",
    doctorName: "Dr. Rajesh V. Ram",
    specialty: "General Medicine",
    date: new Date().toISOString().split('T')[0],
    timeSlot: "10:30 AM",
    reason: "Routine health checkup and BP review",
    status: "Confirmed",
    createdAt: new Date().toISOString()
  },
  {
    id: "RAM-9015",
    patientName: "Ananya Sharma",
    phone: "808836214",
    email: "yuvakishore.vps@gmail.com",
    doctorName: "Dr. Priya Nair",
    specialty: "Pediatrics & Child Care",
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: "05:15 PM",
    reason: "Vaccination & growth consultation",
    status: "Confirmed",
    createdAt: new Date().toISOString()
  }
];

// Initialize Gemini Client safely
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// Health Check API
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    clinic: "Ram Medicals Multiclinic - Bagaluru",
    timestamp: new Date().toISOString()
  });
});

// Appointments API
app.get("/api/appointments", (req, res) => {
  res.json({ success: true, data: appointments });
});

app.post("/api/appointments", (req, res) => {
  const { patientName, phone, email, doctorName, specialty, date, timeSlot, reason } = req.body;
  if (!patientName || !phone || !doctorName || !date || !timeSlot) {
    return res.status(400).json({ error: "Missing required booking details" });
  }

  const id = `RAM-${Math.floor(1000 + Math.random() * 9000)}`;
  const newAppointment = {
    id,
    patientName,
    phone,
    email: email || "",
    doctorName,
    specialty: specialty || "General Consultation",
    date,
    timeSlot,
    reason: reason || "General Checkup",
    status: "Confirmed" as const,
    createdAt: new Date().toISOString()
  };

  appointments.unshift(newAppointment);
  res.json({ success: true, data: newAppointment });
});

// AI Health Assistant API Endpoint
app.post("/api/ai-assistant", async (req, res) => {
  try {
    const { prompt, history } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        reply: "Ram Medicals Multiclinic AI Assistant is active. For direct assistance or emergency booking in Bagaluru, please call 808836214 or tap 'Book Appointment'.",
        disclaimer: "Medical Disclaimer: This information is for guidance only. Please consult a qualified doctor for medical diagnosis."
      });
    }

    const systemInstruction = `
You are the official AI Medical & Health Concierge for "Ram Medicals Multiclinic" located in Bagaluru, Bengaluru.
Your goal is to guide patients regarding:
1. Medical specialties at Ram Medicals:
   - General Medicine & Family Care (Dr. Rajesh V. Ram)
   - Pediatrics & Child Healthcare (Dr. Priya Nair)
   - Cardiology & Heart Health (Dr. Vikramaditya Reddy)
   - Obstetrics & Gynecology (Dr. Sunitha Rao)
   - Orthopedics & Joint Care (Dr. Arvind K. Swamy)
   - Dermatology & Cosmetic Care (Dr. Meera Menon)
   - ENT & Head/Neck Surgery (Dr. Sandeep Hedge)
   - Diagnostic Services (Pathology, Blood Tests, ECG, Ultrasound, Digital X-Ray)

2. Clinic Details:
   - Location: 123 Health Avenue, Main Road, Bagaluru, Bengaluru, Karnataka 562149
   - Contact: 808836214
   - Timings: Morning Session 08:00 AM - 01:30 PM, Evening Session 04:30 PM - 09:00 PM (Mon - Sat), Sunday: 09:00 AM - 01:00 PM

3. Guidelines:
   - Be extremely polite, empathetic, professional, and clear.
   - Summarize medical advice safely with a mandatory reminder that AI advice does not replace a doctor consultation.
   - For severe red flag symptoms (chest pain, acute breathlessness, severe bleeding), urge emergency care immediately.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "Thank you for reaching out to Ram Medicals Multiclinic. How can we assist your health today?";
    res.json({ reply: replyText });
  } catch (err: any) {
    console.error("AI Assistant error:", err);
    res.status(500).json({ error: "Failed to generate AI response", details: err?.message });
  }
});

// AI Feature 1: Smart AI Symptom Checker & Triage
app.post("/api/ai/symptom-checker", async (req, res) => {
  try {
    const { symptoms, age, gender, duration } = req.body;
    if (!symptoms) {
      return res.status(400).json({ error: "Symptoms description is required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        urgency: "Routine Consultation",
        recommendedSpecialty: "General Medicine",
        recommendedDoctor: "Dr. Rajesh V. Ram",
        analysis: "Based on the provided symptoms, a consultation with our General Medicine specialist is recommended for thorough clinical evaluation.",
        suggestedActions: [
          "Rest and stay adequately hydrated",
          "Note any changes in temperature or intensity",
          "Book an OPD consultation at Ram Medicals Bagaluru"
        ],
        questionsForDoctor: [
          "What tests or investigations are advised?",
          "Are there any specific dietary modifications needed?"
        ],
        disclaimer: "Medical Disclaimer: AI triage is for guidance only and does not replace professional medical advice."
      });
    }

    const systemInstruction = `
You are an expert AI Triage Assistant for Ram Medicals Multiclinic in Bagaluru, Bengaluru.
Analyze patient symptom descriptions and return a structured JSON evaluation.
Doctors at the clinic include:
- Dr. Rajesh V. Ram (General Medicine & Diabetology)
- Dr. Priya Nair (Pediatrics & Child Care)
- Dr. Vikramaditya Reddy (Cardiology)
- Dr. Sunitha Rao (Obstetrics & Gynecology)
- Dr. Arvind K. Swamy (Orthopedics & Joint Care)
- Dr. Meera Menon (Dermatology)
- Dr. Sandeep Hedge (ENT Specialist)

Output format MUST be valid JSON with this exact structure:
{
  "urgency": "Emergency Red Flag" | "Prompt OPD Visit" | "Routine Consultation",
  "recommendedSpecialty": "string",
  "recommendedDoctor": "string",
  "analysis": "2-3 concise sentence clinical assessment",
  "suggestedActions": ["action 1", "action 2", "action 3"],
  "questionsForDoctor": ["question 1", "question 2"],
  "disclaimer": "Medical Disclaimer: This AI triage is for preliminary guidance only and does not replace a doctor consultation."
}
`;

    const promptText = `Patient Details:
- Age: ${age || "Not specified"}
- Gender: ${gender || "Not specified"}
- Symptom Duration: ${duration || "Not specified"}
- Symptoms Description: ${symptoms}

Provide the clinical triage JSON assessment.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.3,
      }
    });

    const parsedJson = JSON.parse(response.text || "{}");
    res.json(parsedJson);
  } catch (err: any) {
    console.error("Symptom Checker Error:", err);
    res.status(500).json({ error: "Failed to evaluate symptoms", details: err?.message });
  }
});

// AI Feature 2: Lab Report & Medical Term Explainer
app.post("/api/ai/report-explainer", async (req, res) => {
  try {
    const { reportText, testType } = req.body;
    if (!reportText) {
      return res.status(400).json({ error: "Report text or test parameters required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        simplifiedSummary: "Your lab report indicates standard diagnostic parameters. A clinical review with your doctor will help correlate these findings with your health history.",
        keyFindings: [
          { parameter: "Diagnostic Values", meaning: "Parameters reviewed for reference.", status: "Normal" }
        ],
        lifestyleAdvice: ["Maintain a balanced diet and regular hydration.", "Bring this report to your next OPD visit."],
        questionsToAskDoctor: ["Do any parameters require repeat testing in 3 months?"]
      });
    }

    const systemInstruction = `
You are an expert AI Medical Diagnostic Explainer for Ram Medicals Multiclinic in Bagaluru.
Translate medical terminology, blood lab values, or pathology findings into reassuring, simple, easy-to-understand terms for a patient.
Output format MUST be valid JSON with this exact structure:
{
  "simplifiedSummary": "Clear 2-sentence summary in plain English",
  "keyFindings": [
    { "parameter": "Parameter Name", "meaning": "What this test measures and what your value means", "status": "Normal" | "Attention" | "Optimal" }
  ],
  "lifestyleAdvice": ["tip 1", "tip 2"],
  "questionsToAskDoctor": ["question 1", "question 2"]
}
`;

    const promptText = `Test Type: ${testType || "General Diagnostic Report"}
Report text or values provided by patient:
"${reportText}"

Translate this report into simplified patient-friendly JSON format.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.3,
      }
    });

    const parsedJson = JSON.parse(response.text || "{}");
    res.json(parsedJson);
  } catch (err: any) {
    console.error("Report Explainer Error:", err);
    res.status(500).json({ error: "Failed to parse lab report", details: err?.message });
  }
});

// AI Feature 3: Doctor Consultation Visit Prep Assistant
app.post("/api/ai/visit-prep", async (req, res) => {
  try {
    const { mainComplaint, duration, medicalHistory } = req.body;
    if (!mainComplaint) {
      return res.status(400).json({ error: "Main complaint required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        chiefComplaintSummary: mainComplaint,
        timelineSummary: duration || "Recent onset",
        suggestedQuestions: [
          "What is the likely cause of my current symptoms?",
          "Are any diagnostic tests needed today at Ram Medicals lab?",
          "What symptoms should I monitor at home?"
        ],
        preparationTips: [
          "Bring any previous prescriptions or recent test reports.",
          "List any ongoing medications or known allergies."
        ]
      });
    }

    const systemInstruction = `
You are an AI Consultation Prep Coach for patients visiting Ram Medicals Multiclinic.
Help the patient organize their thoughts and prepare a structured visit summary for the doctor.
Output MUST be valid JSON with this exact structure:
{
  "chiefComplaintSummary": "Structured, concise medical description for the doctor",
  "timelineSummary": "Symptom progression and duration summary",
  "suggestedQuestions": ["question 1", "question 2", "question 3"],
  "preparationTips": ["tip 1", "tip 2"]
}
`;

    const promptText = `Patient Input:
- Primary Complaint: ${mainComplaint}
- Duration: ${duration || "Not specified"}
- Previous Medical History/Meds: ${medicalHistory || "None mentioned"}

Generate the JSON visit prep sheet.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.3,
      }
    });

    const parsedJson = JSON.parse(response.text || "{}");
    res.json(parsedJson);
  } catch (err: any) {
    console.error("Visit Prep Error:", err);
    res.status(500).json({ error: "Failed to generate visit prep", details: err?.message });
  }
});

// Vite Middleware setup for dev vs production static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Ram Medicals Multiclinic server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
