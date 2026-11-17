import { LoginData, LoginResponse, RegisterData } from "@/types/user-type";

import axiosConfig from "./axiosConfig";

export const userService = {
  register: async (userData: RegisterData): Promise<RegisterData> => {
    const response = await axiosConfig.post<RegisterData>(
      "/authenticate/register",
      userData,
    );
    return response.data;
  },

  login: async (loginData: LoginData): Promise<LoginResponse> => {
    const response = await axiosConfig.post<LoginResponse>(
      "/authenticate/login",
      loginData,
    );
    return response.data;
  },
};
