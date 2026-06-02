import { CheckupSummaryResponse } from "@/types/checkup-type";

import axiosConfig from "./axiosConfig";

export const checkupService = {
  getCheckupSummary: async (
    patientId: number,
    from: Date,
    to: Date,
  ): Promise<CheckupSummaryResponse> => {
    const fromIso = from.toISOString();
    const toIso = to.toISOString();

    const response = await axiosConfig.get<CheckupSummaryResponse>(
      `/ai/${patientId}/checkup-summary`,
      {
        params: {
          from: fromIso,
          to: toIso,
        },
      },
    );

    return response.data;
  },
};