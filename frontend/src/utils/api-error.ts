import { isAxiosError } from "axios";

// The backend answers errors with a plain text message, the portal endpoints with { message }
export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError(error)) {
    const data = error.response?.data;
    if (typeof data === "string" && data.trim()) return data;
    if (
      data &&
      typeof data === "object" &&
      "message" in data &&
      typeof data.message === "string"
    )
      return data.message;
  }
  return fallback;
}
