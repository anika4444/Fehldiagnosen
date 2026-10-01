export interface SymptomFormData {
  symptomName: string;
  occurrenceTime: string;
  intensity: number;
  duration: string;
  possibleTriggers: string;
  notes: string;
  details: Record<string, string>;
}

export interface SymptomFieldResponse {
  name: string;
  type: string;
  options: (string | null)[];
  isRequired: boolean;
}

export interface SymptomDefinitionResponse {
  id: number;
  name: string;
  aliases: string[];
  fields: SymptomFieldResponse[];
}

export interface PatientSymptomResponse {
  id: number;
  patientId: number;
  symptomId?: number | null;
  symptomName?: string | null;
  definedSymptomName?: string | null;
  occurrenceTime: string;
  intensity: number;
  duration?: string | null;
  possibleTrigger?: string | null;
  notes?: string | null;
  details: Record<string, string | null>;
  createdAt: string;
}

export interface PatientSymptomRequest {
  symptomId?: number | null;
  symptomName?: string | null;
  occurrenceTime: string;
  intensity: number;
  duration?: string | null;
  possibleTrigger?: string | null;
  notes?: string | null;
  details: Record<string, string | null>;
}
