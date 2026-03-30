import { MedicalHistoryEntryResponse } from "@/types/medical-history-entry-type";

import axiosConfig from "./axiosConfig";

const mapStatusToEnum = (status: any): number => {
  const s = String(status).toLowerCase();
  if (s === "active" || s === "0") return 0;
  if (s === "chronical" || s === "1") return 1;
  if (s === "inremission" || s === "2") return 2;
  return 0;
};

export const medicalHistoryEntryService = {
  getEntriesByPatientId: async (
    patientId: number,
  ): Promise<MedicalHistoryEntryResponse[]> => {
    const response = await axiosConfig.get<any>(
      `/patients/${patientId}/medical-history-entries`,
    );
    return Array.isArray(response.data) ? response.data : response.data.data;
  },

  createEntry: async (
    patientId: number,
    data: any,
  ): Promise<MedicalHistoryEntryResponse> => {
    const payload = {
      Diagnosis: data.diagnosis || data.Diagnosis || "",
      ICD10Code: data.icd10Code || data.ICD10Code || data.icD10Code || "",
      Year: parseInt(data.year || data.Year),
      Status: mapStatusToEnum(data.status || data.Status),
      Comment: data.comment || data.Comment || "",
      EntryBy: 1,
    };
    const response = await axiosConfig.post<any>(
      `/patients/${patientId}/medical-history-entries`,
      payload,
    );
    return response.data.data || response.data;
  },

  updateEntry: async (
    patientId: number,
    entryId: number,
    data: any,
  ): Promise<MedicalHistoryEntryResponse> => {
    const payload = {
      Diagnosis: data.diagnosis || data.Diagnosis || "",
      ICD10Code: data.icd10Code || data.ICD10Code || data.icD10Code || "",
      Year: parseInt(data.year || data.Year),
      Status: mapStatusToEnum(data.status || data.Status),
      Comment: data.comment || data.Comment || "",
      EntryBy: 1,
    };
    const response = await axiosConfig.put<any>(
      `/patients/${patientId}/medical-history-entries/${entryId}`,
      payload,
    );
    return response.data.data || response.data;
  },

  deleteEntry: async (entryId: number): Promise<void> => {
    await axiosConfig.delete(`/medical-history-entries/${entryId}`);
  },
};
