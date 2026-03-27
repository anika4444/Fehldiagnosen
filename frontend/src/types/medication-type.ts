export interface MedicationResponse {
  id: number;
  name: string;
  dosage?: string;
  intakeFrequency?: string;
  durationInDays?: number;
  indication?: string;
  doctorName?: string;
  notes?: string;
}

export interface CreateMedicationRequest {
  name: string;
  dosage?: string;
  intakeFrequency?: string;
  durationInDays?: number;
  indication?: string;
  doctorName?: string;
  notes?: string;
}