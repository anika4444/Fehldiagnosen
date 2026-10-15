// Mirrors the backend DTOs in Application/Services/EmergencyAccessService and EmergencyDataService

export type CodeType = "Emergency" | "Treatment" | "OneTime";

export type ApprovalState = "NotRequired" | "Pending" | "Approved" | "Denied";

export type DataCategory =
  | "Medications"
  | "Interactions"
  | "ChronicConditions"
  | "Symptoms"
  | "RedFlags"
  | "AiSummary"
  | "SymptomHistory"
  | "MedicalLetters"
  | "MedicationHistory";

export type EmergencySession = {
  sessionToken?: string | null;
  codeType: CodeType;
  approvalState: ApprovalState;
  expiresAt: string;
  approvalExpiresAt?: string | null;
  // Counted on the server, the portal never compares with the device clock
  secondsRemaining: number;
  approvalSecondsRemaining?: number | null;
};

export type AccessorInfo = {
  accessorName?: string;
  accessorInstitution?: string;
};

// What the helper used to open the portal, kept in memory only
export type Credentials =
  | { kind: "token"; token: string }
  | { kind: "pin"; publicId: string; pin: string };

export type EmergencyMedication = {
  name: string;
  dosage?: string | null;
  intakeFrequency?: string | null;
  indication?: string | null;
  atcCode?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  isCurrent: boolean;
};

export type EmergencyCondition = {
  title: string;
  icdCode?: string | null;
  status: string;
  year?: number | null;
};

export type EmergencySymptom = {
  name: string;
  intensity: number;
  occurredAt: string;
  duration?: string | null;
  possibleTrigger?: string | null;
  notes?: string | null;
};

export type EmergencyRedFlag = {
  title: string;
  text: string;
  source: "Medication" | "Condition" | "Symptom" | "Interaction";
};

// Content of a scanned doctor's letter (stored as a diagnosis in ADAM)
export type EmergencyLetter = {
  subject: string;
  icdCode?: string | null;
  date: string;
  status: string;
  text?: string | null;
  findings?: string | null;
  therapeuticMeasures?: string | null;
  medicationText?: string | null;
  aiExplanation?: string | null;
};

export type EmergencyData = {
  codeType: CodeType;
  sessionExpiresAt?: string | null;
  sessionSecondsRemaining?: number | null;
  lastUpdatedAt?: string | null;
  sharedCategories: DataCategory[];
  redFlags?: EmergencyRedFlag[] | null;
  medications?: EmergencyMedication[] | null;
  chronicConditions?: EmergencyCondition[] | null;
  symptoms?: EmergencySymptom[] | null;
  symptomHistory?: EmergencySymptom[] | null;
  medicalLetters?: EmergencyLetter[] | null;
  medicationHistory?: EmergencyMedication[] | null;
};

export type InteractionPair = {
  medicationA: string;
  medicationB: string;
  description: string;
};

export type EmergencyInsights = {
  interactions?: InteractionPair[] | null;
  // True when the check failed, an empty list then does not mean "no interactions"
  interactionsUnavailable: boolean;
  uncheckedMedications: string[];
  aiSummary?: string | null;
  aiDisclaimer?: string | null;
  aiUnavailable: boolean;
};
