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
  doctorName?: string;
  notes?: string;
}

export interface CreateMedicationRequest {
  name: string;
  dosage?: string;
  intakeFrequency?: string;
  durationInDays?: number;
  intakeStartDate?: string;
  indication?: string;
  doctorName?: string;
  notes?: string;
}
