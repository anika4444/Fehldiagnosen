import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

export const useCurrentUser = () => {
  const [firstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedName =
          Platform.OS === "web"
            ? localStorage.getItem("firstName")
            : await SecureStore.getItemAsync("firstName");

        if (storedName) {
          setFirstName(storedName);
        }
      } catch (error) {
        console.error("Fehler beim Laden des Vornamens:", error);
      }
    };

    loadUserData();
  }, []);

  return { firstName };
};