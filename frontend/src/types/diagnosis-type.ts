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