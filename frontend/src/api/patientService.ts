import api from "./axiosConfig";

export interface Patient {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender?: number;
}

export const getPatientById = async (patientId: number): Promise<Patient> => {
  const response = await api.get<Patient>(`/patients/${patientId}`);
  return response.data;
};