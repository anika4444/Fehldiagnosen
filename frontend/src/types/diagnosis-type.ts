export interface DiagnosisEntryResponse {
  id: number;
  patientId: number;
  title: string;
  description?: string;
  icdCode?: string;
  severity?: string;
  sideLocalization?: string;
  status?: string;
  medicationText?: string;
  symptoms?: string;
  findings?: string;
  therapeuticMeasures?: string;
  note?: string;
  diagnosisDate: string;
  createdAt: string;
  updatedAt: string;
  aiExplanation?: string | null;
  disclaimer?: string | null;
}

export interface CreateDiagnosisEntryRequest {
  title: string;
  description?: string;
  icdCode?: string;
  severity?: string;
  sideLocalization?: string;
  status?: string;
  medicationText?: string;
  symptoms?: string;
  findings?: string;
  therapeuticMeasures?: string;
  note?: string;
  diagnosisDate: string;
}

export interface DiagnosisEntryRequest {
  title: string;
  description?: string;
  icdCode?: string;
  severity?: string;
  sideLocalization?: string;
  status?: string;
  medicationText?: string;
  symptoms?: string;
  findings?: string;
  therapeuticMeasures?: string;
  note?: string;
  diagnosisDate: string;
  aiExplanation?: string | null;
}

export interface UpdateDiagnosisEntryRequest {
  title: string;
  description?: string;
  icdCode?: string;
  severity?: string;
  sideLocalization?: string;
  status?: string;
  medicationText?: string;
  symptoms?: string;
  findings?: string;
  therapeuticMeasures?: string;
  note?: string;
  diagnosisDate: string;
}
