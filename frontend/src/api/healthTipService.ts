import { HealthTipResponse } from "@/types/health-tip-type";

import axiosConfig from "./axiosConfig";

export const healthTipService = {
  getHealthTip: async (): Promise<HealthTipResponse> => {
    const response =
      await axiosConfig.get<HealthTipResponse>("/health-tip/today");
    return response.data;
  },
};
