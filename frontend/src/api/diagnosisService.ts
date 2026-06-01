import {
  CreateDiagnosisEntryRequest,
  DiagnosisEntryResponse,
  UpdateDiagnosisEntryRequest,
} from "@/types/diagnosis-type";

import axiosConfig from "./axiosConfig";

export const diagnosisService = {
  getEntriesByPatientId: async (
    patientId: number,
  ): Promise<DiagnosisEntryResponse[]> => {
    const response = await axiosConfig.get<DiagnosisEntryResponse[]>(
      `/diagnoses/patient/${patientId}`,
    );
    return response.data;
  },

  createEntry: async (
    patientId: number,
    data: CreateDiagnosisEntryRequest,
  ): Promise<DiagnosisEntryResponse> => {
    const response = await axiosConfig.post<DiagnosisEntryResponse>(
      `/diagnoses`,
      { ...data, patientId },
    );
    return response.data;
  },

  updateEntry: async (
    patientId: number,
    diagnosisId: number,
    data: UpdateDiagnosisEntryRequest,
  ): Promise<DiagnosisEntryResponse> => {
    const response = await axiosConfig.put<DiagnosisEntryResponse>(
      `/diagnoses/${diagnosisId}`,
      { ...data, patientId },
    );
    return response.data;
  },

  deleteEntry: async (
    diagnosisId: number,
  ): Promise<DiagnosisEntryResponse> => {
    const response = await axiosConfig.delete<DiagnosisEntryResponse>(
      `/diagnoses/${diagnosisId}`,
    );
    return response.data;
  },
};