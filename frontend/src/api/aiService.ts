import axiosConfig from "./axiosConfig";

interface ExplainDiagnosisApiResponse {
  text: string;
  disclaimer?: string;
}

export const aiService = {
  explainDiagnosisById: async (
    patientId: number,
    diagnosisId: number,
  ): Promise<ExplainDiagnosisApiResponse> => {
    const response = await axiosConfig.get<ExplainDiagnosisApiResponse>(
      `/ai/${patientId}/explain-diagnosis/${diagnosisId}`,
    );

    return response.data;
  },
};
