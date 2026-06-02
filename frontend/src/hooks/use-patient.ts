import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

import { getPatientById, Patient } from "@/api/patientService";

export const usePatient = () => {
  const [patientId, setPatientId] = useState<number | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPatientData = async () => {
      try {
        const storedId =
          Platform.OS === "web"
            ? localStorage.getItem("patientId")
            : await SecureStore.getItemAsync("patientId");

        if (storedId) {
          const id = parseInt(storedId);
          setPatientId(id);

          const data = await getPatientById(id);
          setPatient(data);
        }
      } catch (error) {
        console.error("Fehler beim Laden der Patientendaten:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPatientData();
  }, []);

  return { patientId, patient, isLoading };
};