export interface CheckupDiagnosis {
  id: number;
  icD10Code: string | null;
  diagnosis: string;
  year: number;
  status: string;
  comment: string | null;
}

export interface CheckupMedication {
  id: number;
  name: string;
  dosage: string | null;
  intakeFrequency: string | null;
  intakeStartDate: string | null;
  endDate: string | null;
  indication: string | null;
  atcCode: string | null;
}

export interface CheckupSymptom {
  id: number;
  symptomName: string | null;
  occurrenceTime: string;
  intensity: number;
  duration: string | null;
  possibleTrigger: string | null;
  notes: string | null;
}

export interface CheckupSummaryResponse {
  from: string;
  to: string;
  diagnoses: CheckupDiagnosis[];
  medications: CheckupMedication[];
  symptoms: CheckupSymptom[];
  aiSummary: string | null;
}