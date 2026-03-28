export interface FamilyHistoryEntryResponse {
  id: number;
  patientId: number;
  relative: string;
  diagnosis: string;
  comment?: string;
}

export interface CreateFamilyHistoryEntryRequest {
  relative: string;
  diagnosis: string;
  comment?: string;
}

export interface UpdateFamilyHistoryEntryRequest {
  relative: string;
  diagnosis: string;
  comment?: string;
}