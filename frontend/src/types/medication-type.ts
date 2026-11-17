// Entspricht dem Backend-Enum InteractionCheckStatus (wird numerisch serialisiert)
export enum InteractionCheckStatus {
  Checked = 0,
  PartiallyChecked = 1,
  NotCheckable = 2,
  NothingToCompare = 3,
}

export interface MedicationResponse {
  id: number;
  name: string;
  patientId?: number;
  dosage?: string;
  intakeFrequency?: string;
  durationInDays?: number;
  intakeStartDate?: string;
  endDate?: string;
  indication?: string;
  notes?: string;
  atcCode?: string;
  interactionWarnings?: string[];
  // Nur in der Antwort auf das Anlegen gesetzt
  interactionCheckStatus?: InteractionCheckStatus | null;
  interactionCheckMessage?: string | null;
}

export interface CreateMedicationRequest {
  name: string;
  dosage?: string;
  intakeFrequency?: string;
  durationInDays?: number;
  intakeStartDate?: string;
  indication?: string;
  notes?: string;
  atcCode?: string;
}

export interface MedicationScanResponse {
  name?: string;
  atcCode?: string;
  dosage?: string;
  strength?: string;
  form?: string;
  manufacturer?: string;
  notes?: string;
}
