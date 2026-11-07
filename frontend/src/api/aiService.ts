import { ExplainDiagnosisResponse } from "@/types/ai-type";

import axiosConfig from "./axiosConfig";

interface InterpretMedicationImageApiResponse {
  extracted: {
    name: string;
    dosage: string;
  };
}

export const aiService = {
  explainDiagnosisById: async (
    patientId: number,
    diagnosisId: number,
  ): Promise<ExplainDiagnosisResponse> => {
    const response = await axiosConfig.get<ExplainDiagnosisResponse>(
      `/ai/${patientId}/explain-diagnosis/${diagnosisId}`,
    );

    return response.data;
  },
  interpretMedicationImage: async (
    imageBase64: string,
    mimeType: string = "image/jpeg",
  ): Promise<InterpretMedicationImageApiResponse> => {
    const body = { imageBase64, mimeType };

    const response =
      await axiosConfig.post<InterpretMedicationImageApiResponse>(
        `/ai/interpret-medication-image`,
        body,
      );

    return response.data;
  },
};
