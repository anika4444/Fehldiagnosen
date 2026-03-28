export interface MedicalHistoryEntryFormData {
    icd10Code?: string | null;
    diagnosis: string;
    year: number;
    status: ConditionStatus;
    comment?: string | null;
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
}

export interface MedicalHistoryEntryRequest {
    icd10Code?: string | null;
    diagnosis: string;
    year: number;
    status: number;
    comment?: string | null;
    entryBy: number;
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