import axiosConfig from "./axiosConfig";

interface ExplainMedicalHistoryApiResponse {
  text: string;
  requestBody: {
    langLevel: string;
    diagnosis: string;
    icd10Code: string;
    year: string;
    status: string;
    entryBy: string;
    comment: string;
  };
}

export const aiService = {
  explainMedicalHistoryById: async (
    entryId: number,
    langLevel: "basic" | "medium" | "advanced" = "medium",
  ): Promise<ExplainMedicalHistoryApiResponse> => {
    const response = await axiosConfig.post<ExplainMedicalHistoryApiResponse>(
      `/ai/explain-medical-history/${entryId}`,
      { langLevel },
    );

    return response.data;
  },
};
