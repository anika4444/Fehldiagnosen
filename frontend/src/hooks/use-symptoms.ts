import { useCallback, useEffect, useState } from "react";

import { symptomService } from "@/api/symptomService";
import {
  PatientSymptomRequest,
  PatientSymptomResponse,
  SymptomFormData,
} from "@/types/symptom-type";

export const useSymptoms = (patientId: number | null, date: Date) => {
  const [symptoms, setSymptoms] = useState<PatientSymptomResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSymptoms = useCallback(async () => {
    if (!patientId) return;

    setIsLoading(true);
    setError(null);

    try {
      const isoDate = date.toISOString().split("T")[0];
      const data = await symptomService.getPatientSymptoms(patientId, isoDate);

      setSymptoms(data);
    } catch (err) {
      setError("Fehler beim Laden der Symptome.");
    } finally {
      setIsLoading(false);
    }
  }, [patientId, date]);

  useEffect(() => {
    fetchSymptoms();
  }, [fetchSymptoms]);

  const saveSymptom = async (
    formData: SymptomFormData,
    editingSymptomId?: number,
  ): Promise<void> => {
    if (!patientId) throw new Error("Sitzung abgelaufen.");

    const requestPayload: PatientSymptomRequest = {
      symptomName: formData.symptomName,
      occurrenceTime: formData.occurrenceTime,
      intensity: formData.intensity,
      duration: formData.duration,
      possibleTrigger: formData.possibleTriggers,
      notes: formData.notes,
      details: formData.details || {},
    };

    if (editingSymptomId) {
      await symptomService.updatePatientSymptom(
        patientId,
        editingSymptomId,
        requestPayload,
      );
    } else {
      await symptomService.createPatientSymptom(patientId, requestPayload);
    }

    await fetchSymptoms();
  };

  const deleteSymptom = async (id: number): Promise<void> => {
    await symptomService.deleteSymptom(id);
    await fetchSymptoms();
  };

  return {
    symptoms,
    isLoading,
    error,
    fetchSymptoms,
    saveSymptom,
    deleteSymptom,
  };
};
