import { useCallback, useEffect, useState } from "react";
import { Alert, Platform } from "react-native";

import { symptomService } from "@/api/symptomService";
import { usePatientId } from "@/hooks/use-patient-id";
import {
  PatientSymptomRequest,
  PatientSymptomResponse,
  SymptomFormData,
} from "@/types/symptom-type";

interface UseSymptomManagementArgs {
  date: Date;
}

export function useSymptomManagement({ date }: UseSymptomManagementArgs) {
  const { patientId } = usePatientId();
  const [symptoms, setSymptoms] = useState<PatientSymptomResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingSymptom, setEditingSymptom] =
    useState<PatientSymptomResponse | null>(null);

  const fetchSymptoms = useCallback(async () => {
    if (patientId === null) {
      setSymptoms([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const isoDate = date.toISOString();
      const loadedSymptoms = await symptomService.getPatientSymptoms(
        patientId,
        isoDate,
      );
      setSymptoms(loadedSymptoms);
    } catch {
      setError("Fehler beim Laden der Symptome.");
    } finally {
      setIsLoading(false);
    }
  }, [date, patientId]);

  useEffect(() => {
    fetchSymptoms();
  }, [fetchSymptoms]);

  const handleStartCreateSymptom = useCallback(() => {
    setEditingSymptom(null);
    setIsFormVisible(true);
  }, []);

  const handleEditSymptom = useCallback((symptom: PatientSymptomResponse) => {
    setEditingSymptom(symptom);
    setIsFormVisible(true);
  }, []);

  const handleCancelForm = useCallback(() => {
    setIsFormVisible(false);
    setEditingSymptom(null);
  }, []);

  const handleSaveSymptom = useCallback(
    async (formData: SymptomFormData) => {
      if (patientId === null) {
        Alert.alert(
          "Fehler",
          "Sitzung abgelaufen. Bitte loggen Sie sich neu ein.",
        );
        return;
      }

      try {
        const requestPayload: PatientSymptomRequest = {
          symptomName: formData.symptomName,
          occurrenceTime: formData.occurrenceTime,
          intensity: formData.intensity,
          duration: formData.duration,
          possibleTrigger: formData.possibleTriggers,
          notes: formData.notes,
          details: formData.details || {},
        };

        if (editingSymptom) {
          await symptomService.updatePatientSymptom(
            patientId,
            editingSymptom.id,
            requestPayload,
          );
        } else {
          await symptomService.createPatientSymptom(patientId, requestPayload);
        }

        await fetchSymptoms();
        setIsFormVisible(false);
        setEditingSymptom(null);
        if (Platform.OS !== "web") {
          Alert.alert("Erfolg", "Symptom wurde gespeichert.");
        }
      } catch (saveError) {
        console.error("Konnte Symptom nicht speichern:", saveError);
        Alert.alert("Fehler", "Es gab ein Problem beim Speichern.", [
          { text: "OK" },
        ]);
      }
    },
    [editingSymptom, fetchSymptoms, patientId],
  );

  const handleDeleteSymptom = useCallback(
    async (id: number) => {
      const deleteConfirmed = async () => {
        try {
          await symptomService.deleteSymptom(id);
          await fetchSymptoms();
        } catch {
          Alert.alert("Fehler", "Löschen fehlgeschlagen.");
        }
      };

      if (Platform.OS === "web") {
        if (confirm("Möchten Sie diesen Eintrag wirklich löschen?")) {
          void deleteConfirmed();
        }
        return;
      }

      Alert.alert("Löschen", "Möchten Sie diesen Eintrag wirklich entfernen?", [
        { text: "Abbrechen", style: "cancel" },
        { text: "Löschen", style: "destructive", onPress: deleteConfirmed },
      ]);
    },
    [fetchSymptoms],
  );

  return {
    symptoms,
    isLoading,
    error,
    isFormVisible,
    editingSymptom,
    handleStartCreateSymptom,
    handleEditSymptom,
    handleCancelForm,
    handleSaveSymptom,
    handleDeleteSymptom,
  };
}
