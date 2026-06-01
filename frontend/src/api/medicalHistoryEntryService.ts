import { MedicalHistoryEntryResponse } from "@/types/medical-history-entry-type";
import axiosConfig from "./axiosConfig";

// ─── Mapping Diagnose-Backend (DiagnosisResponse) -> Frontend-Shape ──────────
// Das Backend nutzt die Diagnose-Entität (Tabelle "Diagnoses").
// Feld-Mapping: Title<->diagnosis, IcdCode<->icd10Code,
// DiagnosisDate<->year, ConditionStatus<->status, Note<->comment.
const mapDiagnosisToEntry = (d: any): MedicalHistoryEntryResponse => {
  const year = d.diagnosisDate
    ? new Date(d.diagnosisDate).getFullYear()
    : new Date().getFullYear();

  return {
    id: d.id,
    patientId: d.patientId,
    diagnosis: d.title ?? "",
    icd10Code: d.icdCode ?? "",
    year,
    status: d.conditionStatus,
    comment: d.note ?? "",
    entryBy: d.entryBy,
    aiExplanation: d.aiExplanation ?? null,
  };
};

const buildPayload = (patientId: number, data: any) => {
  const year = parseInt(data.year || data.Year) || new Date().getFullYear();
  return {
    patientId,
    title: data.diagnosis || data.Diagnosis || "",
    icdCode: data.icd10Code || data.ICD10Code || data.icD10Code || "",
    conditionStatus: Number(data.status ?? data.Status ?? 0),
    entryBy: Number(data.entryBy ?? data.EntryBy ?? 0),
    note: data.comment || data.Comment || "",
    diagnosisDate: new Date(year, 0, 1).toISOString(),
    aiExplanation: data.aiExplanation ?? data.AiExplanation ?? null,
  };
};

export const medicalHistoryEntryService = {
  getEntriesByPatientId: async (
    patientId: number,
  ): Promise<MedicalHistoryEntryResponse[]> => {
    const response = await axiosConfig.get<any>(
      `/diagnoses/patient/${patientId}`,
    );
    const list = Array.isArray(response.data)
      ? response.data
      : response.data.data || [];
    return list.map(mapDiagnosisToEntry);
  },

  createEntry: async (
    patientId: number,
    data: any,
  ): Promise<MedicalHistoryEntryResponse> => {
    const payload = buildPayload(patientId, data);
    const response = await axiosConfig.post<any>(`/diagnoses`, payload);
    return mapDiagnosisToEntry(response.data.data || response.data);
  },

  updateEntry: async (
    patientId: number,
    entryId: number,
    data: any,
  ): Promise<MedicalHistoryEntryResponse> => {
    const payload = buildPayload(patientId, data);
    const response = await axiosConfig.put<any>(
      `/diagnoses/${entryId}`,
      payload,
    );
    return mapDiagnosisToEntry(response.data.data || response.data);
  },

  deleteEntry: async (entryId: number): Promise<void> => {
    await axiosConfig.delete(`/diagnoses/${entryId}`);
  },
};
