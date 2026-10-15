import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

import {
  EmergencyCodeType,
  GeneratedEmergencyCode,
} from "@/types/emergency-type";

// The server keeps only hashes, so QR token and PIN live on this device only.
// Same storage split as the login token: SecureStore on mobile, localStorage on web.
// Every key contains the patient id, so a second account on the same phone never sees these codes.
const codeKey = (patientId: number, type: EmergencyCodeType) =>
  `emergencyCode_${patientId}_${type}`;
const lastSeenKey = (patientId: number) =>
  `emergencyLastSeenLogId_${patientId}`;

const CODE_TYPES: EmergencyCodeType[] = ["Emergency", "Treatment", "OneTime"];

async function read(key: string): Promise<string | null> {
  if (Platform.OS === "web") return localStorage.getItem(key);
  return SecureStore.getItemAsync(key);
}

async function write(key: string, value: string): Promise<void> {
  if (Platform.OS === "web") {
    localStorage.setItem(key, value);
    return;
  }
  await SecureStore.setItemAsync(key, value);
}

async function remove(key: string): Promise<void> {
  if (Platform.OS === "web") {
    localStorage.removeItem(key);
    return;
  }
  await SecureStore.deleteItemAsync(key);
}

// The token sits behind # so the browser never sends it to the web host
export const buildAccessUrl = (portalBaseUrl: string, token: string) =>
  `${portalBaseUrl.replace(/\/+$/, "")}/a#${token}`;

export const emergencyCodeStore = {
  get: async (
    patientId: number,
    type: EmergencyCodeType,
  ): Promise<GeneratedEmergencyCode | null> => {
    try {
      const raw = await read(codeKey(patientId, type));
      return raw ? (JSON.parse(raw) as GeneratedEmergencyCode) : null;
    } catch {
      return null;
    }
  },

  save: async (
    patientId: number,
    code: GeneratedEmergencyCode,
  ): Promise<void> => {
    await write(codeKey(patientId, code.type), JSON.stringify(code));
  },

  clear: async (patientId: number, type: EmergencyCodeType): Promise<void> => {
    await remove(codeKey(patientId, type));
  },

  clearAll: async (patientId: number): Promise<void> => {
    await Promise.all(
      CODE_TYPES.map((type) => remove(codeKey(patientId, type))),
    );
  },

  // Last access log entry the user was already told about
  getLastSeenLogId: async (patientId: number): Promise<number | null> => {
    const raw = await read(lastSeenKey(patientId));
    return raw ? Number(raw) : null;
  },

  setLastSeenLogId: async (patientId: number, id: number): Promise<void> => {
    await write(lastSeenKey(patientId), String(id));
  },
};
