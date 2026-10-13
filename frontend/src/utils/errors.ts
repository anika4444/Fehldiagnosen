import axios from "axios";

type BackendError = {
  message?: string;
  title?: string;
  errors?: Record<string, string[]>;
};

//Holt die Fehlermeldung aus der Backend-Antwort
//Wenn keine brauchbare Meldung kommt, wird der Fallback-Text verwendet
export const getErrorMessage = (err: unknown, fallback: string): string => {
  if (!axios.isAxiosError(err)) return fallback;

  const data = err.response?.data as string | BackendError | undefined;

  //Backend gibt bei BadRequest, NotFound usw. den Text direkt zurück
  if (typeof data === "string" && data.trim()) return data;

  if (data && typeof data === "object") {
    //Validierungsfehler von ASP.NET (z. B. Feld zu lang)
    const firstValidationError = Object.values(data.errors ?? {}).flat()[0];
    if (firstValidationError) return firstValidationError;

    if (data.message) return data.message;
    if (data.title) return data.title;
  }

  return fallback;
};
