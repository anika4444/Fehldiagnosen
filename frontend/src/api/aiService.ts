import axiosConfig from "./axiosConfig";
import { MedicationResponse } from "@/types/medication-type";

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

interface InterpretMedicationImageApiResponse {
    extracted: {
        name: string,
        dosage: string,
    };
}

interface InterpretMedicalLetterApiResponse {
  extracted: {
    title: string;
    description: string;
    icdCode: string;
    severity: string;
    sideLocalization: string;
    status: string;
    medicationText: string;
    symptoms: string;
    findings: string;
    therapeuticMeasures: string;
    note?: string;
    diagnosisDate: string;
  };
  saved?: any;
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
  interpretMedicalLetter: async (
    patientId: number | null,
    letterText: string,
  ): Promise<InterpretMedicalLetterApiResponse> => {
    const body: any = { letterText };
    if (patientId != null) body.patientId = patientId;

    const response = await axiosConfig.post<InterpretMedicalLetterApiResponse>(
      `/ai/interpret-medical-letter`,
      body,
    );

    return response.data;
  },
  interpretMedicationImage: async (
    imageBase64: string,
    mimeType: string = "image/jpeg",
  ): Promise<InterpretMedicationImageApiResponse> => {
    const body = { imageBase64, mimeType };

    const response = await axiosConfig.post<InterpretMedicationImageApiResponse>(
      `/ai/interpret-medication-image`,
      body,
    );

    return response.data;
  },
};
