import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";

import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { useFormValidation } from "@/hooks/use-form-validation";
import {
  CreateDiagnosisEntryRequest,
  DiagnosisEntryResponse,
} from "@/types/diagnosis-type";

import { FormInput } from "../ui/form-input";
import { ModalCard } from "../ui/modal-card";
import axiosConfig from "@/api/axiosConfig";

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
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const [isScanning, setIsScanning] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

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
      diagnosisDate: "",
    },
    (vals) => {
      const errs: Record<string, string> = {};
      if (!vals.title.trim())
        errs.title = "Bitte geben Sie einen Titel an.";
      if (!vals.diagnosisDate.trim())
        errs.diagnosisDate = "Bitte geben Sie das Diagnosedatum an.";
      return errs;
    },
  );

  const handleScan = async () => {
    try {
      let base64Data: string | null = null;
      let mimeType: string = "image/jpeg";

      if (Platform.OS === "web") {
        const docResult = await DocumentPicker.getDocumentAsync({
          type: ["image/*", "application/pdf"],
          copyToCacheDirectory: true,
        });

        if (docResult.canceled || !docResult.assets?.[0]) return;

        const file = docResult.assets[0];
        mimeType = file.mimeType ?? "image/jpeg";
        setFileName(file.name);

        const fetchResponse = await fetch(file.uri);
        const blob = await fetchResponse.blob();
        base64Data = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result as string;
            resolve(result.split(",")[1]);
          };
          reader.readAsDataURL(blob);
        });
      } else {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) return;

        const result = await ImagePicker.launchCameraAsync({
          quality: 1,
          base64: true,
        });

        if (result.canceled || !result.assets?.[0]?.base64) return;
        base64Data = result.assets[0].base64;
        mimeType = "image/jpeg";
        setFileName("Kamerafoto");
      }

      if (!base64Data) return;

      setIsScanning(true);

      const response = await axiosConfig.post("/ocr/scan", {
  imageBase64: base64Data,
  mimeType,
});
const data = response.data;


      if (data.title) handleChange("title", data.title);
      if (data.description) handleChange("description", data.description);
      if (data.icdCode) handleChange("icdCode", data.icdCode);
      if (data.severity) handleChange("severity", data.severity);
      if (data.sideLocalization) handleChange("sideLocalization", data.sideLocalization);
      if (data.status) handleChange("status", data.status);
      if (data.symptoms) handleChange("symptoms", data.symptoms);
      if (data.findings) handleChange("findings", data.findings);
      if (data.therapeuticMeasures) handleChange("therapeuticMeasures", data.therapeuticMeasures);
      if (data.medicationText) handleChange("medicationText", data.medicationText);
      if (data.note) handleChange("note", data.note);
      if (data.diagnosisDate) handleChange("diagnosisDate", data.diagnosisDate);

    } catch (err: any) {
      console.error("Scan fehlgeschlagen", err?.response?.data ?? err);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <ModalCard
      title={initialData ? "Diagnose bearbeiten" : "Neue Diagnose"}
      onClose={onCancel}
      onSave={() => handleSubmit(onSave)}
      saveButtonText={initialData ? "Aktualisieren" : "Speichern"}
    >
      {!initialData && (
        <TouchableOpacity
          style={[styles.scanButton, { borderColor: theme.primary }]}
          onPress={handleScan}
          disabled={isScanning}
        >
          {isScanning ? (
            <ActivityIndicator color={theme.primary} />
          ) : (
            <MaterialCommunityIcons name="camera-outline" size={22} color={theme.primary} />
          )}
          <ThemedText style={[styles.scanText, { color: theme.primary }]}>
            {isScanning
              ? "Wird gescannt..."
              : fileName
                ? fileName
                : Platform.OS === "web"
                  ? "Arztbrief hochladen (Bild oder PDF)"
                  : "Arztbrief scannen"}
          </ThemedText>
          {fileName && !isScanning && (
            <MaterialCommunityIcons name="check-circle" size={20} color={theme.primary} />
          )}
        </TouchableOpacity>
      )}

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
      <FormInput
        label="Diagnosedatum"
        isRequired
        placeholder="z. B. 2024-01-15"
        value={values.diagnosisDate}
        onChangeText={(value) => handleChange("diagnosisDate", value)}
        errorText={errors.diagnosisDate}
      />
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