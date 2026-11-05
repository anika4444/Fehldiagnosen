import axios from "axios";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

// Kommt aus LAN_IP in der .env im Projekt-Root (eingelesen in app.config.js). Leer = Emulator/localhost.
const LAN_IP = (Constants.expoConfig?.extra?.lanIp as string | undefined) ?? "";

const getBaseURL = () => {
  if (__DEV__ && LAN_IP && (Platform.OS === "android" || Platform.OS === "ios")) {
    return `http://${LAN_IP}:5238/api`;
  }

  return Platform.OS === "android"
    ? "http://10.0.2.2:5238/api" // android emulator
    : "http://127.0.0.1:5238/api";
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR: Wird vor JEDEM API-Aufruf ausgeführt
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
