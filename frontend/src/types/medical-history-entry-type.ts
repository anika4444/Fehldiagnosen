export interface MedicalHistoryEntryFormData {
    icd10Code?: string | null;
    diagnosis: string;
    year: number;
    status: ConditionStatus;
    comment?: string | null;
    aiExplanation?: string | null;
}

export interface MedicalHistoryEntryResponse {
    id: number;
    patientId: number;
    icd10Code?: string | null;
    diagnosis: string;
    year: number;
    status: ConditionStatus;
    comment?: string | null;
    entryBy: EntryBy;
    aiExplanation?: string | null;
}

export interface MedicalHistoryEntryRequest {
    icd10Code?: string | null;
    diagnosis: string;
    year: number;
    status: number;
    comment?: string | null;
    entryBy: number;
    aiExplanation?: string | null;
}

export enum ConditionStatus {
    Active = 0,
    Chronical = 1,
    InRemission = 2
}

export enum EntryBy {
    Doctor = 0,
    Patient = 1
}