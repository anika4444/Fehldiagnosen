import api from "@/api/axiosConfig";

export interface KnownMedicationResult {
  id: number;
  name: string;
  wirkstoff: string | null;
  atcCode: string | null;
  staerke: string | null;
  darreichungsform: string | null;
  rezeptpflichtig: string | null;
}

export const knownMedicationService = {
  search: async (query: string): Promise<KnownMedicationResult[]> => {
    const response = await api.get(
      `/known-medications/search?q=${encodeURIComponent(query)}`,
    );
    return response.data;
  },
};
