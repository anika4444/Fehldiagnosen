import {
    MedicalHistoryEntryRequest,
    MedicalHistoryEntryResponse,
} from "@/types/medical-history-entry-type";

import axiosConfig from "./axiosConfig";

export const medicalHistoryEntryService = {
    getMedicalHistoryEntries: async (patientId: number) => {
        const response = await axiosConfig.get<
            MedicalHistoryEntryResponse[]
        >(`/patients/${patientId}/medical-history-entries`);
        return response.data;
    },

    createMedicalHistoryEntry: async (
        patientId: number,
        data: MedicalHistoryEntryRequest,
    ) => {
        const response = await axiosConfig.post(
            `/patients/${patientId}/medical-history-entries`,
            data,
        );
        return response.data;
    },

    updateMedicalHistoryEntry: async (
        patientId: number,
        entryId: number,
        data: MedicalHistoryEntryRequest,
    ) => {
        const response = await axiosConfig.put(
            `/patients/${patientId}/medical-history-entries/${entryId}`,
            data,
        );
        return response.data;
    },

    getMedicalHistoryEntryById: async (entryId: number) => {
        const response = await axiosConfig.get<MedicalHistoryEntryResponse>(
            `/medical-history-entries/${entryId}`,
        );
        return response.data;
    },

    deleteMedicalHistoryEntry: async (entryId: number) => {
        await axiosConfig.delete(`/medical-history-entries/${entryId}`);
    },
};