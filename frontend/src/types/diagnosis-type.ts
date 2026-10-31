// Entspricht dem Backend-Enum ConditionStatus (wird numerisch serialisiert)
export enum ConditionStatus {
  Chronical = 0,
  Active = 1,
  InRemission = 2,
  Unknown = 3,
}

export const CONDITION_STATUS_LABELS: Record<ConditionStatus, string> = {
  [ConditionStatus.Chronical]: "Chronisch",
  [ConditionStatus.Active]: "Aktiv",
  [ConditionStatus.InRemission]: "In Remission",
  [ConditionStatus.Unknown]: "Unbekannt",
};

export interface DiagnosisEntryResponse {
  id: number;
  patientId: number;
  title: string;
  description?: string;
  icdCode?: string;
  severity?: string;
  sideLocalization?: string;
  conditionStatus?: ConditionStatus;
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
  conditionStatus: ConditionStatus;
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
  conditionStatus?: ConditionStatus;
  medicationText?: string;
  symptoms?: string;
  findings?: string;
  therapeuticMeasures?: string;
  note?: string;
  diagnosisDate: string;
}
