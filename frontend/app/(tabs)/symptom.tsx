import DateTimePicker from "@react-native-community/datetimepicker";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { symptomService } from "@/api/symptomService";
import { Card } from "@/components/card";
import { DatePickerField } from "@/components/date-picker-field";
import { HeaderView } from "@/components/header-view";
import { PrimaryButton } from "@/components/primary-button";
import { SymptomCard } from "@/components/symptom-card";
import { SymptomForm } from "@/components/symptom-form";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { useDatePicker } from "@/hooks/use-date-picker";
import {
  PatientSymptomRequest,
  PatientSymptomResponse,
  SymptomFormData,
} from "@/types/symptom-type";

const Symptom = () => {
  const { date, show, onChange, toggleDatePicker, formattedDate } =
    useDatePicker();

  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const [patientId, setPatientId] = useState<number | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [symptoms, setSymptoms] = useState<PatientSymptomResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingSymptom, setEditingSymptom] =
    useState<PatientSymptomResponse | null>(null);

  useEffect(() => {
    const loadPatientData = async () => {
      const storedId =
        Platform.OS === "web"
          ? localStorage.getItem("patientId")
          : await SecureStore.getItemAsync("patientId");

      if (storedId) {
        setPatientId(parseInt(storedId));
      }
    };
    loadPatientData();
  }, []);

  const fetchSymptoms = async () => {
    if (!patientId) return;

    setIsLoading(true);
    setError(null);
    try {
      const isoDate = date.toISOString();
      const data = await symptomService.getPatientSymptoms(patientId, isoDate);
      setSymptoms(data);
    } catch (error) {
      setError("Fehler beim Laden der Symptome.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSymptom = async (formData: SymptomFormData) => {
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

      setIsFormVisible(false);
      setEditingSymptom(null);
      fetchSymptoms();

      if (Platform.OS !== "web") {
        Alert.alert("Erfolg", "Symptom wurde gespeichert.");
      }
    } catch (error) {
      console.error("Konnte Symptom nicht speichern:", error);
      Alert.alert("Fehler", "Es gab ein Problem beim Speichern.", [
        { text: "OK" },
      ]);
    }
  };

  const handleEditSymptom = (symptom: PatientSymptomResponse) => {
    setEditingSymptom(symptom);
    setIsFormVisible(true);
  };

  const handleDeleteSymptom = async (id: number) => {
    const deleteConfirmed = async () => {
      try {
        await symptomService.deleteSymptom(id);
        fetchSymptoms();
      } catch (error) {
        Alert.alert("Fehler", "Löschen fehlgeschlagen.");
      }
    };
    if (Platform.OS === "web") {
      if (confirm("Möchten Sie diesen Eintrag wirklich löschen?")) {
        deleteConfirmed();
      }
    } else {
      Alert.alert("Löschen", "Möchten Sie diesen Eintrag wirklich entfernen?", [
        { text: "Abbrechen", style: "cancel" },
        { text: "Löschen", style: "destructive", onPress: deleteConfirmed },
      ]);
    }
  };

  useEffect(() => {
    fetchSymptoms();
  }, [date, patientId]);

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <HeaderView
        title="Symptom-Tracker"
        subtitle="Erfassen Sie Ihre täglichen Beschwerden"
      />
      <View style={styles.content}>
        <Card style={styles.mainCard}>
          <DatePickerField
            label="Datum auswählen:"
            value={formattedDate}
            onPress={toggleDatePicker}
            primaryColor={theme.primary}
            backgroundColor={theme.background}
          />
        </Card>
        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChange}
            maximumDate={new Date()}
          />
        )}

        {!isFormVisible ? (
          <PrimaryButton
            title="Neues Symptom hinzufügen"
            onPress={() => {
              setEditingSymptom(null);
              setIsFormVisible(true);
            }}
          />
        ) : (
          <SymptomForm
            selectedDate={date}
            initialData={editingSymptom}
            onSave={handleSaveSymptom}
            onCancel={() => {
              setIsFormVisible(false);
              setEditingSymptom(null);
            }}
          />
        )}
        <ThemedText type="subtitle">Symptome am {formattedDate}</ThemedText>

        {isLoading && <ActivityIndicator size="large" color={theme.primary} />}
        {error && <ThemedText style={{ color: "red" }}>{error}</ThemedText>}

        {!isLoading && !error && symptoms.length === 0 && (
          <ThemedText>Keine Symptome für dieses Datum gefunden.</ThemedText>
        )}

        {!isLoading &&
          symptoms.map((symptom) => (
            <SymptomCard
              key={symptom.id}
              symptom={symptom}
              onDelete={handleDeleteSymptom}
              onEdit={() => handleEditSymptom(symptom)}
            />
          ))}
      </View>
    </ScrollView>
  );
};

export default Symptom;

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  mainCard: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 24,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  datePickerTrigger: {
    paddingVertical: 8,
  },
  iconBadge: {
    padding: 12,
    borderRadius: 14,
    marginRight: 16,
  },
  textColumn: {
    flex: 1,
  },
});
