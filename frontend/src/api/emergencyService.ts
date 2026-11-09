import {
  EmergencyAccessLogResponse,
  EmergencyOverviewResponse,
  EmergencyPreviewResponse,
  EmergencySettingsResponse,
  GeneratedEmergencyCode,
  PendingApprovalResponse,
  UpdateEmergencySettingsRequest,
} from "@/types/emergency-type";

import axiosConfig from "./axiosConfig";

// Code types that can be addressed in the URL
export type PermanentCodeType = "emergency" | "treatment";

const base = (patientId: number) => `/patients/${patientId}/emergency`;

export const emergencyService = {
  // GET /api/patients/{patientId}/emergency
  getOverview: async (patientId: number) => {
    const response = await axiosConfig.get<EmergencyOverviewResponse>(
      base(patientId),
    );
    return response.data;
  },

  // PUT /api/patients/{patientId}/emergency/consent
  setConsent: async (patientId: number, given: boolean) => {
    const response = await axiosConfig.put<EmergencySettingsResponse>(
      `${base(patientId)}/consent`,
      { given },
    );
    return response.data;
  },

  // POST /api/patients/{patientId}/emergency/codes/{type}/regenerate
  regenerateCode: async (patientId: number, type: PermanentCodeType) => {
    const response = await axiosConfig.post<GeneratedEmergencyCode>(
      `${base(patientId)}/codes/${type}/regenerate`,
    );
    return response.data;
  },

  // POST /api/patients/{patientId}/emergency/codes/{type}/deactivate
  deactivateCode: async (
    patientId: number,
    type: PermanentCodeType | "onetime",
  ) => {
    await axiosConfig.post(`${base(patientId)}/codes/${type}/deactivate`);
  },

  // POST /api/patients/{patientId}/emergency/one-time-link
  createOneTimeLink: async (patientId: number) => {
    const response = await axiosConfig.post<GeneratedEmergencyCode>(
      `${base(patientId)}/one-time-link`,
    );
    return response.data;
  },

  // GET /api/patients/{patientId}/emergency/settings
  getSettings: async (patientId: number) => {
    const response = await axiosConfig.get<EmergencySettingsResponse>(
      `${base(patientId)}/settings`,
    );
    return response.data;
  },

  // PUT /api/patients/{patientId}/emergency/settings
  updateSettings: async (
    patientId: number,
    data: UpdateEmergencySettingsRequest,
  ) => {
    const response = await axiosConfig.put<EmergencySettingsResponse>(
      `${base(patientId)}/settings`,
      data,
    );
    return response.data;
  },

  // GET /api/patients/{patientId}/emergency/preview?type=emergency
  getPreview: async (
    patientId: number,
    type: PermanentCodeType = "emergency",
  ) => {
    const response = await axiosConfig.get<EmergencyPreviewResponse>(
      `${base(patientId)}/preview`,
      { params: { type } },
    );
    return response.data;
  },

  // GET /api/patients/{patientId}/emergency/logs
  getLogs: async (patientId: number) => {
    const response = await axiosConfig.get<EmergencyAccessLogResponse[]>(
      `${base(patientId)}/logs`,
    );
    return response.data;
  },

  // GET /api/patients/{patientId}/emergency/approvals
  getPendingApprovals: async (patientId: number) => {
    const response = await axiosConfig.get<PendingApprovalResponse[]>(
      `${base(patientId)}/approvals`,
    );
    return response.data;
  },

  // POST /api/patients/{patientId}/emergency/approvals/{sessionId}
  decideApproval: async (
    patientId: number,
    sessionId: number,
    approve: boolean,
  ) => {
    await axiosConfig.post(`${base(patientId)}/approvals/${sessionId}`, {
      approve,
    });
  },

  // POST /api/patients/{patientId}/emergency/sessions/revoke-all
  revokeAllSessions: async (patientId: number) => {
    const response = await axiosConfig.post<{ revoked: number }>(
      `${base(patientId)}/sessions/revoke-all`,
    );
    return response.data;
  },

  // POST /api/patients/{patientId}/emergency/sessions/{sessionId}/revoke
  revokeSession: async (patientId: number, sessionId: number) => {
    await axiosConfig.post(`${base(patientId)}/sessions/${sessionId}/revoke`);
  },
};
