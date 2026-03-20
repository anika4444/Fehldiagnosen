import { AxiosError } from "axios";

import { LoginData, LoginResponse, RegisterData } from "@/types/user-type";

import api from "./axiosConfig";

export const register = async (
  userData: RegisterData,
): Promise<RegisterData> => {
  try {
    const response = await api.post("/authenticate/register", userData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Registrierung fehlgeschlagen:",
      axiosError.response?.data || axiosError.message,
    );
    throw axiosError;
  }
};

export const login = async (loginData: LoginData): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>(
      "/authenticate/login",
      loginData,
    );

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Login fehlgeschlagen:",
      axiosError.response?.data || axiosError.message,
    );
    throw axiosError;
  }
};
