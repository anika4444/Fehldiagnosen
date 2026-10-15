// Mirrors the backend DTOs of EmergencyCodeController

export type EmergencyCodeType = "Emergency" | "Treatment" | "OneTime";

export type EmergencyDataCategory =
  | "Medications"
  | "Interactions"
  | "ChronicConditions"
  | "Symptoms"
  | "RedFlags"
  | "AiSummary"
  | "SymptomHistory"
  | "MedicalLetters"
  | "MedicationHistory";

export interface EmergencyCodeStatus {
  type: EmergencyCodeType;
  publicId: string;
  createdAt: string;
  expiresAt?: string | null;
  isLocked: boolean;
  lockedUntil?: string | null;
}

export interface EmergencyOverviewResponse {
  consentGivenAt?: string | null;
  treatmentRequiresApproval: boolean;
  // The QR address is built from this and the token stored on the device
  portalBaseUrl: string;
  oneTimeLinkHours: number;
  activeCodes: EmergencyCodeStatus[];
  openSessionCount: number;
  pendingApprovalCount: number;
}

// Only returned once by the server, then kept in SecureStore on this device.
// accessUrl is only the address at creation time, screens build it fresh with buildAccessUrl.
export interface GeneratedEmergencyCode {
  type: EmergencyCodeType;
  publicId: string;
  token: string;
  pin?: string | null;
  accessUrl: string;
  portalUrl: string;
  createdAt: string;
  expiresAt?: string | null;
}

export interface EmergencyCategorySetting {
  category: EmergencyDataCategory;
  emergency: boolean;
  treatment: boolean;
  isExtended: boolean;
}

export interface EmergencySettingsResponse {
  consentGivenAt?: string | null;
  treatmentRequiresApproval: boolean;
  categories: EmergencyCategorySetting[];
}

export interface UpdateEmergencySettingsRequest {
  treatmentRequiresApproval: boolean;
  categories: EmergencyCategorySetting[];
}

export type EmergencyAccessOutcome =
  | "Granted"
  | "PendingApproval"
  | "Denied"
  | "WrongPin"
  | "Locked"
  // Approval request nobody answered in time
  | "Expired";

export interface EmergencyAccessLogResponse {
  id: number;
  codeType: EmergencyCodeType;
  method: "QrCode" | "Pin" | "OneTimeLink";
  outcome: EmergencyAccessOutcome;
  accessedAt: string;
  ipAddress?: string | null;
  deviceType?: string | null;
  accessorName?: string | null;
  accessorInstitution?: string | null;
  runningSessionId?: number | null;
  runningUntil?: string | null;
}

export interface PendingApprovalResponse {
  sessionId: number;
  requestedAt: string;
  approvalExpiresAt?: string | null;
  accessorName?: string | null;
  accessorInstitution?: string | null;
  deviceType?: string | null;
  sessionMinutes: number;
}

export interface EmergencyPreviewMedication {
  name: string;
  dosage?: string | null;
  intakeFrequency?: string | null;
  indication?: string | null;
}

export interface EmergencyPreviewCondition {
  title: string;
  icdCode?: string | null;
  status: string;
}

export interface EmergencyPreviewRedFlag {
  title: string;
  text: string;
  source: string;
}

// Subset of the portal data used for the lock screen pass text
export interface EmergencyPreviewResponse {
  codeType: EmergencyCodeType;
  lastUpdatedAt?: string | null;
  sharedCategories: EmergencyDataCategory[];
  medications?: EmergencyPreviewMedication[] | null;
  chronicConditions?: EmergencyPreviewCondition[] | null;
  redFlags?: EmergencyPreviewRedFlag[] | null;
}
