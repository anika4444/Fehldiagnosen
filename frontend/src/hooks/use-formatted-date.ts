import { useMemo } from "react";

export const useFormattedDate = (dateString?: string | null): string => {
  return useMemo(() => {
    if (!dateString) return "";

    const pureDate = dateString.split("T")[0];
    const parts = pureDate.split("-");

    if (parts.length !== 3) return dateString;

    const [year, month, day] = parts;
    return `${day}.${month}.${year}`;
  }, [dateString]);
};
