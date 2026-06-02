export interface MedicalHistoryEntryFormData {
    icd10Code?: string | null;
    diagnosis: string;
    year: number;
    status: ConditionStatus;
    comment?: string | null;
    entryBy: EntryBy;
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
    disclaimer?: string | null;
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

// Werte exakt wie im C#-Backend (Domain/Enums/ConditionStatus.cs)
export enum ConditionStatus {
    Chronical = 0,
    Active = 1,
    InRemission = 2
}

// Werte exakt wie im C#-Backend (Domain/Enums/EntryBy.cs)
export enum EntryBy {
    Patient = 0,
    Doctor = 1
}
