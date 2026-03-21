export interface RegisterData {
  userName: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  role: "Patient" | "Arzt";
}

export interface RegisterResponse {
  isSuccess: boolean;
  message: string;
}

export interface LoginData {
  username: string;
  password?: string;
}

export interface LoginResponse {
  isSuccess: boolean;
  data: {
    token: string;
    expiration: string;
    patientId: string;
  };
  errorMessage: string | null;
  errorType: number;
}
