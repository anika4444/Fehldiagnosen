import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const LAN_IP = "10.142.162.128";

const getBaseURL = () => {
  if (__DEV__) {
    // je nach dem ob Android oder iOS, muss hier das jeweilige auskommentiert werden, damit Android Emulator funktioniert
    //if (Platform.OS === "android") {
    //return `http://${LAN_IP}:5238/api`;
    //}

    if (Platform.OS === "ios") {
      return `http://${LAN_IP}:5238/api`;
    }
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
