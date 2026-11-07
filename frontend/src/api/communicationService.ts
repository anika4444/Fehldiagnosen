import {
  CommunicationLevelResponse,
  CommunicationQuestionResponse,
  CreateCommunicationLevelRequest,
} from "@/types/communication-type";

import api from "./axiosConfig";

export const communicationService = {
  getQuestions: async (): Promise<CommunicationQuestionResponse[]> => {
    const response = await api.get("/communication-level/questions");
    return response.data;
  },

  getByPatientId: async (
    patientId: number,
  ): Promise<CommunicationLevelResponse> => {
    const response = await api.get(
      `/patients/${patientId}/communication-level`,
    );
    return response.data;
  },

  create: async (
    patientId: number,
    data: CreateCommunicationLevelRequest,
  ): Promise<CommunicationLevelResponse> => {
    const response = await api.post(
      `/patients/${patientId}/communication-level`,
      data,
    );
    return response.data;
  },
};
