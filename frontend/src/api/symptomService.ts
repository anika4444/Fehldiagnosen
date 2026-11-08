import {
  PatientSymptomRequest,
  PatientSymptomResponse,
  SymptomDefinitionResponse,
} from "@/types/symptom-type";

import axiosConfig from "./axiosConfig";

export const symptomService = {
  getPatientSymptoms: async (patientId: number, date?: string) => {
    const url = date
      ? `/patients/${patientId}/symptoms?date=${date}`
      : `/patients/${patientId}/symptoms`;
    const response = await axiosConfig.get<PatientSymptomResponse[]>(url);
    return response.data;
  },

  createPatientSymptom: async (
    patientId: number,
    data: PatientSymptomRequest,
  ) => {
    const response = await axiosConfig.post(
      `/patients/${patientId}/symptoms`,
      data,
    );
    return response.data;
  },

  updatePatientSymptom: async (
    patientId: number,
    symptomId: number,
    data: PatientSymptomRequest,
  ) => {
    const response = await axiosConfig.put(
      `/patients/${patientId}/symptoms/${symptomId}`,
      data,
    );
    return response.data;
  },

  getSymptomDefinitions: async (name: string) => {
    const response = await axiosConfig.get<SymptomDefinitionResponse[]>(
      `/symptoms/definition?name=${name}`,
    );
    return response.data;
  },

  getSymptomById: async (symptomId: number) => {
    const response = await axiosConfig.get<SymptomDefinitionResponse>(
      `/symptoms/definition/${symptomId}`,
    );
    return response.data;
  },

  deleteSymptom: async (symptomId: number) => {
    await axiosConfig.delete(`/symptoms/${symptomId}`);
  },
};
