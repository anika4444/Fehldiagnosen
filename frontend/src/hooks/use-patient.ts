import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

export const usePatient = () => {
  const [patientId, setPatientId] = useState<number | null>(null);

  useEffect(() => {
    const loadPatientData = async () => {
      try {
        const storedId =
          Platform.OS === "web"
            ? localStorage.getItem("patientId")
            : await SecureStore.getItemAsync("patientId");

        if (storedId) {
          setPatientId(parseInt(storedId));
        }
      } catch (error) {
        console.error("Fehler beim Laden der Patient-ID:", error);
      }
    };

    loadPatientData();
  }, []);

  return { patientId };
};
