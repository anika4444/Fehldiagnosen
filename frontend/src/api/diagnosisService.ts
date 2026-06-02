import { Platform } from "react-native";

import {
  CreateDiagnosisEntryRequest,
  DiagnosisEntryResponse,
  UpdateDiagnosisEntryRequest,
} from "@/types/diagnosis-type";

import axiosConfig from "./axiosConfig";

export const diagnosisService = {
  getEntriesByPatientId: async (
    patientId: number,
  ): Promise<DiagnosisEntryResponse[]> => {
    const response = await axiosConfig.get<DiagnosisEntryResponse[]>(
      `/patients/${patientId}/diagnoses`,
    );
    return response.data;
  },

  scanAndCreateDocument: async (
    patientId: number,
    file: { uri: string; name: string; type: string },
  ): Promise<DiagnosisEntryResponse> => {
    // Sicherheitscheck: Verhindert automatische 400er-Fehler im C#-Routing
    if (!patientId || isNaN(patientId)) {
      throw new Error(
        "Validierungsfehler: Ungültige oder fehlende Patienten-ID.",
      );
    }

    const formData = new FormData();

    if (Platform.OS === "web") {
      // LÖSUNG FÜR WEB: Der Browser benötigt ein echtes Blob-Objekt
      const fileResponse = await fetch(file.uri);
      const blob = await fileResponse.blob();

      // Parameter 1: Name im C#-Controller ("file")
      // Parameter 2: Die binären Daten (Blob)
      // Parameter 3: Der Dateiname für das Backend
      formData.append("file", blob, file.name || "arztbrief.pdf");
    } else {
      // LÖSUNG FÜR MOBILE: iOS und Android nutzen den React Native Polyfill
      formData.append("file", {
        uri: Platform.OS === "ios" ? file.uri.replace("file://", "") : file.uri,
        name: file.name || "arztbrief.jpg",
        type: file.type || "image/jpeg",
      } as any);
    }

    // WICHTIG: Prüfe, ob deine C#-Controller-Basisroute ein "/api" benötigt (z.B. `/api/diagnoses/...`)
    const response = await axiosConfig.post<DiagnosisEntryResponse>(
      `/diagnoses/${patientId}/scan`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  },

  createEntry: async (
    patientId: number,
    data: CreateDiagnosisEntryRequest,
  ): Promise<DiagnosisEntryResponse> => {
    const response = await axiosConfig.post<DiagnosisEntryResponse>(
      `/patients/${patientId}/diagnoses`,
      { ...data },
    );
    return response.data;
  },

  updateEntry: async (
    patientId: number,
    diagnosisId: number,
    data: UpdateDiagnosisEntryRequest,
  ): Promise<DiagnosisEntryResponse> => {
    const response = await axiosConfig.put<DiagnosisEntryResponse>(
      `/patients/${patientId}/diagnoses/${diagnosisId}`,
      { ...data },
    );
    return response.data;
  },

  deleteEntry: async (diagnosisId: number): Promise<DiagnosisEntryResponse> => {
    const response = await axiosConfig.delete<DiagnosisEntryResponse>(
      `/diagnoses/${diagnosisId}`,
    );
    return response.data;
  },
};
