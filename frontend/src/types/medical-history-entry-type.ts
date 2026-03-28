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
    status: ConditionStatus;
    comment?: string | null;
    entryBy: EntryBy;
}

export type ConditionStatus =
    | "Active"
    | "Chronical"
    | "InRemission";

export type EntryBy =
    | "Doctor"
    | "Patient";