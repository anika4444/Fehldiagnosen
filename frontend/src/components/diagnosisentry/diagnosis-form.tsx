import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform, Pressable, StyleSheet } from "react-native";

import { useDatePicker } from "@/hooks/use-date-picker";
import { useFormValidation } from "@/hooks/use-form-validation";
import {
  CreateDiagnosisEntryRequest,
  DiagnosisEntryResponse,
} from "@/types/diagnosis-type";

import { FormInput } from "../ui/form-input";
import { ModalCard } from "../ui/modal-card";

interface DiagnosisFormProps {
  initialData: DiagnosisEntryResponse | null;
  onSave: (data: CreateDiagnosisEntryRequest) => Promise<void>;
  onCancel: () => void;
}

export const DiagnosisForm = ({
  initialData,
  onSave,
  onCancel,
}: DiagnosisFormProps) => {
  const { values, errors, handleChange, handleSubmit } = useFormValidation(
    initialData,
    {
      title: "",
      description: "",
      icdCode: "",
      severity: "",
      sideLocalization: "",
      status: "",
      medicationText: "",
      symptoms: "",
      findings: "",
      therapeuticMeasures: "",
      note: "",
      diagnosisDate: initialData?.diagnosisDate
        ? initialData.diagnosisDate.split("T")[0]
        : new Date().toISOString().split("T")[0],
    },
    (vals) => {
      const errs: Record<string, string> = {};
      if (!vals.title.trim()) errs.title = "Bitte geben Sie einen Titel an.";
      if (!vals.diagnosisDate.trim())
        errs.diagnosisDate = "Bitte geben Sie das Diagnosedatum an.";
      return errs;
    },
  );

  const { date, show, onChange, toggleDatePicker, formattedDate } =
    useDatePicker(values.diagnosisDate, (newDateString) =>
      handleChange("diagnosisDate", newDateString),
    );

  return (
    <ModalCard
      title={initialData ? "Diagnose bearbeiten" : "Neue Diagnose"}
      onClose={onCancel}
      onSave={() => handleSubmit(onSave)}
      saveButtonText={initialData ? "Aktualisieren" : "Speichern"}
    >
      <FormInput
        label="Titel"
        isRequired
        placeholder="z. B. Diabetes Typ 2"
        value={values.title}
        onChangeText={(value) => handleChange("title", value)}
        errorText={errors.title}
      />
      <FormInput
        label="Beschreibung"
        placeholder="Optionale Beschreibung"
        value={values.description}
        onChangeText={(value) => handleChange("description", value)}
        multiline
        numberOfLines={3}
        style={{ minHeight: 80, textAlignVertical: "top", paddingTop: 12 }}
      />
      <FormInput
        label="ICD-Code"
        placeholder="z.B. E11"
        value={values.icdCode}
        onChangeText={(value) => handleChange("icdCode", value)}
      />
      <FormInput
        label="Schweregrad"
        placeholder="z.B. mild, moderat, schwerwiegend"
        value={values.severity}
        onChangeText={(value) => handleChange("severity", value)}
      />
      <FormInput
        label="Seite"
        placeholder="z.B. links, rechts, bilateral"
        value={values.sideLocalization}
        onChangeText={(value) => handleChange("sideLocalization", value)}
      />
      <FormInput
        label="Status"
        placeholder="z.B. aktiv, abgeschlossen"
        value={values.status}
        onChangeText={(value) => handleChange("status", value)}
      />
      <FormInput
        label="Symptome"
        placeholder="Symptome beschreiben"
        value={values.symptoms}
        onChangeText={(value) => handleChange("symptoms", value)}
        multiline
        numberOfLines={3}
        style={{ minHeight: 80, textAlignVertical: "top", paddingTop: 12 }}
      />
      <FormInput
        label="Befunde"
        placeholder="Befunde beschreiben"
        value={values.findings}
        onChangeText={(value) => handleChange("findings", value)}
        multiline
        numberOfLines={3}
        style={{ minHeight: 80, textAlignVertical: "top", paddingTop: 12 }}
      />
      <FormInput
        label="Therapiemaßnahmen"
        placeholder="Therapiemaßnahmen beschreiben"
        value={values.therapeuticMeasures}
        onChangeText={(value) => handleChange("therapeuticMeasures", value)}
        multiline
        numberOfLines={3}
        style={{ minHeight: 80, textAlignVertical: "top", paddingTop: 12 }}
      />
      <FormInput
        label="Medikamente"
        placeholder="Medikamente beschreiben"
        value={values.medicationText}
        onChangeText={(value) => handleChange("medicationText", value)}
        multiline
        numberOfLines={3}
        style={{ minHeight: 80, textAlignVertical: "top", paddingTop: 12 }}
      />
      <FormInput
        label="Notiz"
        placeholder="Optionale Notiz"
        value={values.note}
        onChangeText={(value) => handleChange("note", value)}
        multiline
        numberOfLines={3}
        style={{ minHeight: 80, textAlignVertical: "top", paddingTop: 12 }}
      />
      <Pressable onPress={toggleDatePicker}>
        <FormInput
          label="Diagnosedatum"
          isRequired
          editable={false}
          pointerEvents="none"
          value={formattedDate}
          errorText={errors.diagnosisDate}
        />
      </Pressable>
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
    </ModalCard>
  );
};

const styles = StyleSheet.create({
  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1.5,
    borderRadius: 12,
    borderStyle: "dashed",
    paddingVertical: 14,
    marginBottom: 16,
  },
  scanText: {
    fontWeight: "600",
    fontSize: 15,
  },
});
