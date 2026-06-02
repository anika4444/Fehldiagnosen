import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

import { KnownMedicationResult } from "@/api/knownMedicationService";
import { useFormValidation } from "@/hooks/use-form-validation";
import {
  CreateMedicationRequest,
  MedicationResponse,
} from "@/types/medication-type";

import { FormInput } from "../ui/form-input";
import { FormPicker } from "../ui/form-picker";
import { ModalCard } from "../ui/modal-card";
import { MedicationAutocomplete } from "./medication-autocomplete";

// Erlaubte Dosierungs-Einheiten für das Dropdown.
const DOSAGE_UNITS = ["mg", "µg", "g", "ml", "I.E.", "%", "Stück", "Tropfen"];

// Plausibilitätsgrenze für die Menge (verhindert Eingaben wie "50000000000").
const MAX_DOSAGE_AMOUNT = 10000;

// Standard-Optionen für die Einnahmehäufigkeit. "Sonstiges" blendet ein
// zusätzliches Freitextfeld ein.
const INTAKE_FREQUENCY_OPTIONS = [
  "1x täglich",
  "2x täglich",
  "3x täglich",
  "alle 4 Stunden",
  "alle 6 Stunden",
  "alle 8 Stunden",
  "alle 12 Stunden",
  "1x pro Woche",
  "bei Bedarf",
  "Sonstiges",
];
const CUSTOM_FREQUENCY_OPTION = "Sonstiges";
const STANDARD_FREQUENCIES = INTAKE_FREQUENCY_OPTIONS.filter(
  (o) => o !== CUSTOM_FREQUENCY_OPTION,
);

// Offensichtlich unbrauchbare Freitext-Eingaben. Rein formale Prüfung – es wird
// KEINE medizinische Bewertung der Häufigkeit vorgenommen.
const INVALID_CUSTOM_FREQUENCIES = ["abc", "test", "123", "oft", "immer"];

// Prüft, ob ein "Sonstiges"-Freitext formal sinnvoll ist: nicht leer, 3–100
// Zeichen, nicht rein numerisch und kein offensichtlicher Platzhalter.
function isValidCustomFrequency(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length < 3 || trimmed.length > 100) return false;
  if (/^\d+$/.test(trimmed)) return false;
  if (INVALID_CUSTOM_FREQUENCIES.includes(trimmed.toLowerCase())) return false;
  return true;
}

// Zerlegt einen gespeicherten Dosierungs-String (z.B. "500 mg") in Menge + Einheit.
// Unbekannte Einheiten werden verworfen, damit der Picker einen gültigen Wert hat.
function parseDosage(dosage?: string | null): { amount: string; unit: string } {
  const trimmed = (dosage ?? "").trim();
  if (!trimmed) return { amount: "", unit: "" };

  const match = trimmed.match(/^([\d.,]+)\s*(.*)$/);
  if (!match) return { amount: "", unit: "" };

  const amount = match[1].replace(",", ".");
  const rawUnit = match[2].trim();
  const unit =
    DOSAGE_UNITS.find((u) => u.toLowerCase() === rawUnit.toLowerCase()) ?? "";

  return { amount, unit };
}

// Fügt Menge + Einheit wieder zu einem String zusammen (z.B. "500 mg").
function combineDosage(amount: string, unit: string): string | undefined {
  const trimmed = amount.trim();
  if (!trimmed) return undefined;
  return unit ? `${trimmed} ${unit}` : trimmed;
}

// Sucht im Text (z.B. Stärke-Feld oder Produktname) nach "Zahl + Einheit"-
// Mustern und gibt die Dosis als Menge + Einheit zurück.
// Wichtig: Bei Kombipräparaten mit mehreren Dosisangaben (z.B. "800 mg/480 mg")
// wird bewusst NICHTS zurückgegeben – eine einzelne Menge wäre irreführend, der
// Nutzer trägt dann selbst ein. Die volle Stärke bleibt im Medikamentennamen
// sichtbar.
function extractDosage(text?: string | null): { amount: string; unit: string } {
  const trimmed = (text ?? "").trim();
  if (!trimmed) return { amount: "", unit: "" };

  const unitPattern = DOSAGE_UNITS.map((u) => u.replace(/\./g, "\\.")).join("|");
  const regex = new RegExp(`(\\d+(?:[.,]\\d+)?)\\s*(${unitPattern})`, "gi");
  const matches = [...trimmed.matchAll(regex)];

  // 0 = keine Dosis erkannt, >1 = Kombipräparat → in beiden Fällen leer lassen.
  if (matches.length !== 1) return { amount: "", unit: "" };

  const [, rawAmount, rawUnit] = matches[0];
  const amount = rawAmount.replace(",", ".");
  const unit =
    DOSAGE_UNITS.find((u) => u.toLowerCase() === rawUnit.toLowerCase()) ?? "";
  return { amount, unit };
}

interface MedicationFormProps {
  initialData?: MedicationResponse | null;
  onSave: (data: CreateMedicationRequest) => Promise<void>;
  onCancel: () => void;
}

interface FormValues {
  name: string;
  dosageAmount: string;
  dosageUnit: string;
  intakeFrequency: string;
  customFrequency: string;
  durationInDays: string;
  intakeStartDate: string;
  indication: string;
  doctorName: string;
  notes: string;
  atcCode: string;
}

export function MedicationForm({
  initialData,
  onSave,
  onCancel,
}: MedicationFormProps) {
  const [isMedicationValid, setIsMedicationValid] = useState(!!initialData);

  const initialDosage = parseDosage(initialData?.dosage);

  // Round-Trip für die Einnahmehäufigkeit: ein Standardwert wird direkt im
  // Dropdown gesetzt; ein abweichend gespeicherter Wert war ein
  // "Sonstiges"-Freitext und wird entsprechend zerlegt.
  const savedFrequency = initialData?.intakeFrequency ?? "";
  const isStandardFrequency = STANDARD_FREQUENCIES.includes(savedFrequency);

  const mappedInitialData: FormValues | null = initialData
    ? {
        name: initialData.name,
        dosageAmount: initialDosage.amount,
        dosageUnit: initialDosage.unit,
        intakeFrequency: savedFrequency
          ? isStandardFrequency
            ? savedFrequency
            : CUSTOM_FREQUENCY_OPTION
          : "",
        customFrequency:
          savedFrequency && !isStandardFrequency ? savedFrequency : "",
        durationInDays: initialData.durationInDays?.toString() ?? "",
        intakeStartDate: initialData.intakeStartDate?.split("T")[0] ?? "",
        indication: initialData.indication ?? "",
        doctorName: initialData.doctorName ?? "",
        notes: initialData.notes ?? "",
        atcCode: initialData.atcCode ?? "",
      }
    : null;

  const { values, errors, handleChange, handleSubmit } =
    useFormValidation<FormValues>(
      mappedInitialData,
      {
        name: "",
        dosageAmount: "",
        dosageUnit: "",
        intakeFrequency: "",
        customFrequency: "",
        durationInDays: "",
        intakeStartDate: "",
        indication: "",
        doctorName: "",
        notes: "",
        atcCode: "",
      },
      (vals) => {
        const errs: Record<string, string> = {};
        if (!vals.name.trim() || !isMedicationValid)
          errs.name = "Bitte wählen Sie ein Medikament aus der Liste.";

        // Dosierung ist Pflicht: Menge + Einheit müssen angegeben und die Menge
        // muss plausibel sein.
        const amount = vals.dosageAmount.trim();
        if (!amount) {
          errs.dosageAmount = "Bitte eine Menge angeben.";
        } else {
          const num = Number(amount.replace(",", "."));
          if (Number.isNaN(num) || num <= 0) {
            errs.dosageAmount = "Bitte eine gültige Menge größer als 0 angeben.";
          } else if (num > MAX_DOSAGE_AMOUNT) {
            errs.dosageAmount = "Die Menge erscheint unrealistisch hoch.";
          }
        }
        if (!vals.dosageUnit) {
          errs.dosageUnit = "Bitte eine Einheit wählen.";
        }

        // Einnahmehäufigkeit ist Pflicht; bei "Sonstiges" muss der Freitext
        // formal sinnvoll sein.
        if (!vals.intakeFrequency) {
          errs.intakeFrequency =
            "Bitte geben Sie an, wie oft das Medikament eingenommen wird.";
        } else if (
          vals.intakeFrequency === CUSTOM_FREQUENCY_OPTION &&
          !isValidCustomFrequency(vals.customFrequency)
        ) {
          errs.customFrequency =
            'Bitte geben Sie die Einnahmehäufigkeit in einem verständlichen Format ein, z. B. „1x täglich", „morgens und abends" oder „bei Bedarf".';
        }

        return errs;
      },
    );

  const handleMedicationSelect = (medication: KnownMedicationResult) => {
    // Dosis zuerst aus dem Stärke-Feld der Datenbank versuchen. Liefert das
    // keine saubere Einzeldosis – etwa weil die Einheit fehlt (DB-Stärke "500",
    // Einheit steht separat) oder weil es ein Kombipräparat ist – aus dem
    // Produktnamen extrahieren ("Aspirin 500 mg Kautabletten"). Bei echten
    // Kombis ("800 mg/480 mg") liefern beide Quellen nichts → bleibt leer.
    let dosage = extractDosage(medication.dosage);
    if (!dosage.amount) dosage = extractDosage(medication.name);

    handleChange("name", medication.name);
    handleChange("dosageAmount", dosage.amount);
    handleChange("dosageUnit", dosage.unit);
    handleChange("atcCode", medication.atcCode ?? "");
  };

  const onFinalSave = async (validatedData: FormValues) => {
    // Bei "Sonstiges" wird der eingegebene Freitext gespeichert, sonst der
    // ausgewählte Standardwert (z.B. "2x täglich").
    const finalIntakeFrequency =
      validatedData.intakeFrequency === CUSTOM_FREQUENCY_OPTION
        ? validatedData.customFrequency.trim()
        : validatedData.intakeFrequency;

    await onSave({
      name: validatedData.name.trim(),
      dosage: combineDosage(validatedData.dosageAmount, validatedData.dosageUnit),
      intakeFrequency: finalIntakeFrequency || undefined,
      durationInDays: validatedData.durationInDays
        ? parseInt(validatedData.durationInDays)
        : undefined,
      intakeStartDate: validatedData.intakeStartDate.trim() || undefined,
      indication: validatedData.indication.trim() || undefined,
      doctorName: validatedData.doctorName.trim() || undefined,
      notes: validatedData.notes.trim() || undefined,
      atcCode: validatedData.atcCode || undefined,
    });
  };

  const handleScan = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== "granted") return;

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ["images"],
    quality: 0.85,
  });

  if (result.canceled || !result.assets?.[0]) return;

  const asset = result.assets[0];

  const formData = new FormData();

// Web: blob aus der URI holen
const imageResponse = await fetch(asset.uri);
const blob = await imageResponse.blob();
formData.append("image", blob, "scan.jpg");

  try {
    const response = await fetch(
      "http://localhost:5238/api/medications/scan",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    console.log("Backend Antwort:", JSON.stringify(data));
  } catch (err) {
    console.error("Upload fehlgeschlagen:", err);
  }
};

  return (
    <ModalCard
      title={initialData ? "Medikament bearbeiten" : "Neues Medikament"}
      onClose={onCancel}
      onSave={() => handleSubmit(onFinalSave)}
      saveButtonText={initialData ? "Aktualisieren" : "Speichern"}
    >
      <TouchableOpacity style={styles.scanButton} onPress={handleScan}>
        <Ionicons name="camera-outline" size={20} color="#fff" />
      </TouchableOpacity>
      <MedicationAutocomplete
        value={values.name}
        onChangeText={(v) => handleChange("name", v)}
        onSelect={handleMedicationSelect}
        onValidChange={setIsMedicationValid}
        errorText={errors.name}
      />
      <FormInput
        label="Wirkung/Dosierung – Menge"
        isRequired
        keyboardType="decimal-pad"
        value={values.dosageAmount}
        onChangeText={(v) => handleChange("dosageAmount", v)}
        errorText={errors.dosageAmount}
        maxLength={7}
        placeholder="z. B. 500"
      />
      <FormPicker
        label="Einheit"
        isRequired
        selectedValue={values.dosageUnit}
        options={DOSAGE_UNITS}
        onValueChange={(v) => handleChange("dosageUnit", v)}
        errorText={errors.dosageUnit}
      />
      <FormPicker
        label="Einnahmehäufigkeit"
        isRequired
        selectedValue={values.intakeFrequency}
        options={INTAKE_FREQUENCY_OPTIONS}
        onValueChange={(v) => handleChange("intakeFrequency", v)}
        errorText={errors.intakeFrequency}
      />
      {values.intakeFrequency === CUSTOM_FREQUENCY_OPTION && (
        <FormInput
          label="Einnahmehäufigkeit (Freitext)"
          isRequired
          value={values.customFrequency}
          onChangeText={(v) => handleChange("customFrequency", v)}
          errorText={errors.customFrequency}
          maxLength={100}
          placeholder='z. B. „morgens und abends"'
        />
      )}
      <FormInput
        label="Einnahmedauer (in Tagen)"
        keyboardType="numeric"
        value={values.durationInDays}
        onChangeText={(v) => handleChange("durationInDays", v)}
      />
      <FormInput
        label="Startdatum (JJJJ-MM-TT)"
        value={values.intakeStartDate}
        onChangeText={(v) => handleChange("intakeStartDate", v)}
      />
      <FormInput
        label="Indikation"
        value={values.indication}
        onChangeText={(v) => handleChange("indication", v)}
      />
      <FormInput
        label="Verschrieben von"
        value={values.doctorName}
        onChangeText={(v) => handleChange("doctorName", v)}
      />
      <FormInput
        label="Anmerkungen"
        value={values.notes}
        onChangeText={(v) => handleChange("notes", v)}
        multiline
        numberOfLines={3}
        style={{ minHeight: 80, textAlignVertical: "top", paddingTop: 12 }}
      />
    </ModalCard>
  );
}

const styles = StyleSheet.create({
  scanButton: {
    alignSelf: "flex-end",
    backgroundColor: "#1D9E75",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
});