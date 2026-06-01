import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";

import { SymptomCard } from "@/components/symptom/symptom-card";
import { SymptomForm } from "@/components/symptom/symptom-form";
import { ThemedText } from "@/components/themed-text";
import { Card } from "@/components/ui/card";
import { DataList } from "@/components/ui/data-list";
import { DatePickerField } from "@/components/ui/date-picker-field";
import { HeaderView } from "@/components/ui/header-view";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { useDatePicker } from "@/hooks/use-date-picker";
import { useFormState } from "@/hooks/use-form-state";
import { usePatient } from "@/hooks/use-patient";
import { useSymptoms } from "@/hooks/use-symptoms";
import { PatientSymptomResponse, SymptomFormData } from "@/types/symptom-type";
import {
  confirmDeleteDialog,
  showErrorAlert,
  showSuccessAlert,
} from "@/utils/alerts";

const Symptom = () => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const { date, show, onChange, toggleDatePicker, formattedDate } =
    useDatePicker();

  const { patientId } = usePatient();

  const { symptoms, isLoading, error, saveSymptom, deleteSymptom } =
    useSymptoms(patientId, date);

  const { isFormVisible, editingItem, openForm, closeForm } =
    useFormState<PatientSymptomResponse>();

  const handleSave = async (formData: SymptomFormData) => {
    try {
      await saveSymptom(formData, editingItem?.id);
      closeForm();
      showSuccessAlert("Symptom wurde gespeichert.");
    } catch (err: any) {
      showErrorAlert(err.message || "Es gab ein Problem beim Speichern.");
    }
  };

  const handleDelete = (symptomId: number) => {
    confirmDeleteDialog(async () => {
      try {
        await deleteSymptom(symptomId);
      } catch (err) {
        showErrorAlert("Löschen fehlgeschlagen.");
      }
    });
  };

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
            icon="plus"
            onPress={() => {
              openForm();
            }}
          />
        ) : (
          <SymptomForm
            selectedDate={date}
            initialData={editingItem}
            onSave={handleSave}
            onCancel={() => {
              closeForm();
            }}
          />
        )}

        <ThemedText type="subtitle">Symptome am {formattedDate}</ThemedText>

        <DataList
          data={symptoms}
          isLoading={isLoading}
          error={error}
          emptyMessage="Keine Symptome für dieses Datum gefunden."
          themeColor={theme.primary}
          renderItem={(symptom) => (
            <SymptomCard
              key={symptom.id}
              symptom={symptom}
              onDelete={handleDelete}
              onEdit={() => {
                openForm(symptom);
              }}
            />
          )}
        />
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
