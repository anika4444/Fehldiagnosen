import {
  EmergencyAccessOutcome,
  EmergencyCodeType,
  EmergencyDataCategory,
} from "@/types/emergency-type";

// Fixed colors of the emergency feature, same in light and dark mode so the code types stay recognisable
export const EmergencyColors = {
  emergency: "#B91C1C",
  emergencyText: "#991B1B",
  emergencySoft: "#FEE2E2",
  treatment: "#1E40AF",
  treatmentText: "#1E3A8A",
  treatmentSoft: "#DBEAFE",
  notice: "#78350F",
  noticeSoft: "#FEF3C7",
  success: "#065F46",
  successSoft: "#D1FAE5",
  neutral: "#4B635A",
  neutralSoft: "#EEF3F0",
  qrInk: "#0B3B2E",
};

// Plain text on cards. The fixed colors above only work on their own soft backgrounds,
// on the dark card background they would be unreadable.
export const EmergencyTextColors = {
  light: { emergency: "#991B1B", treatment: "#1E3A8A", notice: "#78350F" },
  dark: { emergency: "#FCA5A5", treatment: "#93C5FD", notice: "#FCD34D" },
};

export const CODE_TYPE_LABELS: Record<EmergencyCodeType, string> = {
  Emergency: "Notfallcode",
  Treatment: "Behandlungscode",
  OneTime: "Einmal-Link",
};

export const CODE_TYPE_DESCRIPTIONS: Record<"Emergency" | "Treatment", string> =
  {
    Emergency:
      "Für Rettungskräfte und Notaufnahme. Zeigt Medikation, Wechselwirkungen, Erkrankungen und aktuelle Symptome.",
    Treatment:
      "Für Ärztinnen und Ärzte beim Termin. Zusätzlich Verlauf, Arztbriefe und Medikamentenhistorie.",
  };

export const CATEGORY_LABELS: Record<EmergencyDataCategory, string> = {
  Medications: "Aktuelle Medikamente",
  Interactions: "Wechselwirkungen",
  ChronicConditions: "Chronische Erkrankungen",
  Symptoms: "Aktuelle Symptome",
  RedFlags: "Warnhinweise",
  AiSummary: "KI-Kurzzusammenfassung",
  SymptomHistory: "Symptomverlauf",
  MedicalLetters: "Arztbriefe mit KI-Erklärung",
  MedicationHistory: "Medikamentenhistorie",
};

export const OUTCOME_LABELS: Record<EmergencyAccessOutcome, string> = {
  Granted: "erlaubt",
  PendingApproval: "wartet",
  Denied: "abgelehnt",
  WrongPin: "falsche PIN",
  Locked: "gesperrt",
  Expired: "nicht beantwortet",
};

export const METHOD_LABELS = {
  QrCode: "QR-Code",
  Pin: "PIN",
  OneTimeLink: "Einmal-Link",
} as const;

// Must match EmergencySessionMinutes and TreatmentSessionMinutes in the backend
export const SESSION_MINUTES = {
  Emergency: 30,
  Treatment: 120,
} as const;

// How often the app asks the backend for new accesses and approval requests
export const EMERGENCY_POLL_INTERVAL_MS = 10000;
