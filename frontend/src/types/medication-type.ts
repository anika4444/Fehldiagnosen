export interface MedicationResponse {
  id: number;
  name: string;
  patientId?: number;
  dosage?: string;
  intakeFrequency?: string;
  durationInDays?: number;
  intakeStartDate?: string; // ← neu
  endDate?: string; // ← neu
  indication?: string;
  doctorName?: string;
  notes?: string;
}

export interface CreateMedicationRequest {
  name: string;
  dosage?: string;
  intakeFrequency?: string;
  durationInDays?: number;
  intakeStartDate?: string; // ← neu
  indication?: string;
  doctorName?: string;
  notes?: string;
}
