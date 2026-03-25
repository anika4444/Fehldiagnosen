import axiosConfig from "./axiosConfig";
import {
  CreateFamilyHistoryEntryRequest,
  FamilyHistoryEntryResponse,
  UpdateFamilyHistoryEntryRequest,
} from "@/types/family-history-type";

export const familyHistoryService = {
  getEntriesByPatientId: async (
    patientId: number,
  ): Promise<FamilyHistoryEntryResponse[]> => {
    const response = await axiosConfig.get<FamilyHistoryEntryResponse[]>(
      `/patients/${patientId}/family-history-entries`,
    );
    return response.data;
  },

  createEntry: async (
    patientId: number,
    data: CreateFamilyHistoryEntryRequest,
  ): Promise<FamilyHistoryEntryResponse> => {
    const response = await axiosConfig.post<FamilyHistoryEntryResponse>(
      `/patients/${patientId}/family-history-entries`,
      data,
    );
    return response.data;
  },

  updateEntry: async (
    patientId: number,
    historyEntryId: number,
    data: UpdateFamilyHistoryEntryRequest,
  ): Promise<FamilyHistoryEntryResponse> => {
    const response = await axiosConfig.put<FamilyHistoryEntryResponse>(
      `/patients/${patientId}/family-history-entries/${historyEntryId}`,
      data,
    );
    return response.data;
  },

  deleteEntry: async (
    historyEntryId: number,
  ): Promise<FamilyHistoryEntryResponse> => {
    const response = await axiosConfig.delete<FamilyHistoryEntryResponse>(
      `/family-history-entries/${historyEntryId}`,
    );
    return response.data;
  },
};