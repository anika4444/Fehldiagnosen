import {
  CreateMedicationRequest,
  MedicationResponse,
} from "@/types/medication-type";

import axiosConfig from "./axiosConfig";

export const medicationService = {
  // GET /api/medications/{id}
  getMedicationById: async (medicationId: number) => {
    const response = await axiosConfig.get<MedicationResponse>(
      `/medications/${medicationId}`,
    );
    return response.data;
  },

  // DELETE /api/medications/{id}
  deleteMedication: async (medicationId: number) => {
    await axiosConfig.delete(`/medications/${medicationId}`);
  },

  // GET /api/patients/{patientId}/medications
  getMedicationsByPatientId: async (patientId: number) => {
    const response = await axiosConfig.get<MedicationResponse[]>(
      `/patients/${patientId}/medications`,
    );
    return response.data;
  },

  // POST /api/patients/{patientId}/medications
  createMedication: async (patientId: number, data: CreateMedicationRequest) => {
    const response = await axiosConfig.post(
      `/patients/${patientId}/medications`,
      data,
    );
    return response.data;
  },

  // PUT /api/patients/{patientId}/medications
  updateMedication: async (patientId: number, medicationId: number, data: CreateMedicationRequest) => {
    const response = await axiosConfig.put(
      `/patients/${patientId}/medications/${medicationId}`,
      data,
    );
    return response.data;
  },
};