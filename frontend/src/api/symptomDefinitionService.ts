import api from "@/api/axiosConfig";

export interface SymptomDefinitionResult {
  id: number;
  name: string;
}

export const symptomDefinitionService = {
  search: async (name: string): Promise<SymptomDefinitionResult[]> => {
    try {
      const response = await api.get(
        `/symptoms/definition?name=${encodeURIComponent(name)}`
      );
      return response.data ?? [];
    } catch {
      return [];
    }
  },
};