import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  View,
} from "react-native";

import { SymptomCard } from "@/components/symptom/symptom-card";
import { SymptomForm } from "@/components/symptom/symptom-form";
import { ThemedText } from "@/components/themed-text";
import { Card } from "@/components/ui/card";
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
      } catch {
        showErrorAlert("Löschen fehlgeschlagen.");
      }
    });
  };

  const renderHeader = () => (
    <View>
      <HeaderView
        title="Symptom-Tracker"
        subtitle="Erfassen Sie Ihre täglichen Beschwerden"
      />
      <View style={styles.headerContent}>
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
            locale="de-DE"
          />
        )}

        {!isFormVisible ? (
          <PrimaryButton
            title="Neues Symptom hinzufügen"
            icon="plus"
            onPress={openForm}
          />
        ) : (
          <SymptomForm
            selectedDate={date}
            initialData={editingItem}
            onSave={handleSave}
            onCancel={closeForm}
          />
        )}

        <ThemedText type="subtitle" style={styles.titleSpacing}>
          Symptome am {formattedDate}
        </ThemedText>
      </View>
    </View>
  );

  const renderStatusComponent = () => {
    if (isLoading) {
      return (
        <View style={styles.statusContainer}>
          <ActivityIndicator size="small" color={theme.primary} />
        </View>
      );
    }
    if (error) {
      return (
        <View style={styles.statusContainer}>
          <ThemedText style={{ color: "red" }}>{error}</ThemedText>
        </View>
      );
    }
    return (
      <View style={styles.statusContainer}>
        <ThemedText style={styles.emptyText}>
          Keine Symptome für dieses Datum gefunden.
        </ThemedText>
      </View>
    );
  };

  return (
    <FlatList
      data={symptoms}
      keyExtractor={(item: any) => item.id.toString()}
      contentContainerStyle={[
        styles.scrollContainer,
        { backgroundColor: theme.background },
      ]}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderStatusComponent}
      renderItem={({ item: symptom }) => (
        <View style={styles.listItemWrapper}>
          <SymptomCard
            symptom={symptom}
            onDelete={handleDelete}
            onEdit={() => openForm(symptom)}
          />
        </View>
      )}
    />
  );
};

export default Symptom;
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  listItemWrapper: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  titleSpacing: {
    marginTop: 20,
    marginBottom: 10,
  },
  statusContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    opacity: 0.6,
    textAlign: "center",
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
});
