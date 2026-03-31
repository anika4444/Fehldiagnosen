import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

export function usePatientId() {
  const [patientId, setPatientId] = useState<number | null>(null);
  const [isPatientIdLoaded, setIsPatientIdLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadPatientId = async () => {
      try {
        const storedId =
          Platform.OS === "web"
            ? localStorage.getItem("patientId")
            : await SecureStore.getItemAsync("patientId");

        const parsedId = storedId ? Number.parseInt(storedId, 10) : NaN;
        if (isMounted && !Number.isNaN(parsedId)) {
          setPatientId(parsedId);
        }
      } finally {
        if (isMounted) {
          setIsPatientIdLoaded(true);
        }
      }
    };

    void loadPatientId();

    return () => {
      isMounted = false;
    };
  }, []);

  return { patientId, isPatientIdLoaded };
}
