import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

//Die API-URL kommt aus der Datei frontend/.env.local
//Die Datei gibt es nicht im Repo, jeder legt sie selber an und trägt seine IP ein:
//EXPO_PUBLIC_API_URL=http://eigeneIP:5238/api
//Danach Expo neu starten mit: npx expo start -c
//Ohne .env.local wird der Emulator bzw. localhost verwendet
const ENV_API_URL = process.env.EXPO_PUBLIC_API_URL;

const getBaseURL = () => {
  if (ENV_API_URL) {
    return ENV_API_URL;
  }

  return Platform.OS === "android"
    ? "http://10.0.2.2:5238/api" //android emulator
    : "http://127.0.0.1:5238/api";
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

//REQUEST INTERCEPTOR: Wird vor JEDEM API-Aufruf ausgeführt
api.interceptors.request.use(
  async (config) => {
    let token: string | null = null;

    try {
      if (Platform.OS === "web") {
        // Token aus dem LocalStorage für Web
        token = localStorage.getItem("userToken");
      } else {
        // Token aus dem SecureStore für Mobile (iOS/Android)
        token = await SecureStore.getItemAsync("userToken");
      }

      if (token) {
        // Token in den Authorization Header einfügen
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Fehler beim Abrufen des Tokens für den Header:", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
