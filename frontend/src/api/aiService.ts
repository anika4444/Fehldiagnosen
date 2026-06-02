import axiosConfig from "./axiosConfig";
import { MedicationResponse } from "@/types/medication-type";

interface ExplainDiagnosisApiResponse {
  text: string;
  disclaimer?: string;
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
  explainDiagnosisById: async (
    patientId: number,
    diagnosisId: number,
  ): Promise<ExplainDiagnosisApiResponse> => {
    const response = await axiosConfig.get<ExplainDiagnosisApiResponse>(
      `/ai/${patientId}/explain-diagnosis/${diagnosisId}`,
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
