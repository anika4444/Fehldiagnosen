import type {
  AccessorInfo,
  Credentials,
  EmergencyData,
  EmergencyInsights,
  EmergencySession,
} from "../types/emergency";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "http://localhost:5238/api";
const SESSION_HEADER = "X-Emergency-Session";
const SESSION_STORAGE_KEY = "adam-emergency-session";

// Carries the HTTP status so pages can react to 401, 403 and 429 differently
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

// sessionStorage ends with the browser tab, the token never touches the URL or localStorage
export const sessionStore = {
  get(): string | null {
    try {
      return sessionStorage.getItem(SESSION_STORAGE_KEY);
    } catch {
      return null;
    }
  },
  set(token: string) {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, token);
    } catch {
      // Private mode without storage: the session simply ends on reload
    }
  },
  clear() {
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // Nothing to clear
    }
  },
};

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  // Only requests with a body need the JSON header, this saves extra CORS preflights
  if (init.body) headers.set("Content-Type", "application/json");

  const sessionToken = sessionStore.get();
  if (sessionToken) headers.set(SESSION_HEADER, sessionToken);

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { ...init, headers, cache: "no-store" });
  } catch {
    throw new ApiError(0, "Keine Verbindung zum Server. Bitte Internetverbindung prüfen.");
  }

  if (response.status === 204) return undefined as T;

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const message = (body && typeof body.message === "string" && body.message) || "Unbekannter Fehler.";
    throw new ApiError(response.status, message);
  }

  return body as T;
}

export const emergencyApi = {
  // POST /api/emergency/sessions/token or /pin
  startSession: async (credentials: Credentials, accessor: AccessorInfo): Promise<EmergencySession> => {
    const consent = { consent: true, ...accessor };

    const session =
      credentials.kind === "token"
        ? await request<EmergencySession>("/emergency/sessions/token", {
            method: "POST",
            body: JSON.stringify({ token: credentials.token, ...consent }),
          })
        : await request<EmergencySession>("/emergency/sessions/pin", {
            method: "POST",
            body: JSON.stringify({ publicId: credentials.publicId, pin: credentials.pin, ...consent }),
          });

    if (session.sessionToken) sessionStore.set(session.sessionToken);
    return session;
  },

  // GET /api/emergency/session
  getSession: () => request<EmergencySession>("/emergency/session"),

  // DELETE /api/emergency/session
  endSession: async () => {
    try {
      await request<void>("/emergency/session", { method: "DELETE" });
    } finally {
      sessionStore.clear();
    }
  },

  // GET /api/emergency/data
  getData: () => request<EmergencyData>("/emergency/data"),

  // GET /api/emergency/insights
  getInsights: () => request<EmergencyInsights>("/emergency/insights"),
};
