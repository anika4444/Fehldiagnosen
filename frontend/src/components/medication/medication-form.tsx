import React, { useState } from "react";

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

  const mappedInitialData: FormValues | null = initialData
    ? {
        name: initialData.name,
        dosageAmount: initialDosage.amount,
        dosageUnit: initialDosage.unit,
        intakeFrequency: initialData.intakeFrequency ?? "",
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

        // Dosierung: Menge + Einheit plausibilisieren (optional, aber wenn
        // angegeben, dann konsistent).
        const amount = vals.dosageAmount.trim();
        if (amount) {
          const num = Number(amount.replace(",", "."));
          if (Number.isNaN(num) || num <= 0) {
            errs.dosageAmount = "Bitte eine gültige Menge größer als 0 angeben.";
          } else if (num > MAX_DOSAGE_AMOUNT) {
            errs.dosageAmount = "Die Menge erscheint unrealistisch hoch.";
          } else if (!vals.dosageUnit) {
            errs.dosageUnit = "Bitte eine Einheit wählen.";
          }
        } else if (vals.dosageUnit) {
          errs.dosageAmount = "Bitte auch eine Menge angeben.";
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
    await onSave({
      name: validatedData.name.trim(),
      dosage: combineDosage(validatedData.dosageAmount, validatedData.dosageUnit),
      intakeFrequency: validatedData.intakeFrequency.trim() || undefined,
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

  return (
    <ModalCard
      title={initialData ? "Medikament bearbeiten" : "Neues Medikament"}
      onClose={onCancel}
      onSave={() => handleSubmit(onFinalSave)}
      saveButtonText={initialData ? "Aktualisieren" : "Speichern"}
    >
      <MedicationAutocomplete
        value={values.name}
        onChangeText={(v) => handleChange("name", v)}
        onSelect={handleMedicationSelect}
        onValidChange={setIsMedicationValid}
        errorText={errors.name}
      />
      <FormInput
        label="Wirkung/Dosierung – Menge"
        keyboardType="decimal-pad"
        value={values.dosageAmount}
        onChangeText={(v) => handleChange("dosageAmount", v)}
        errorText={errors.dosageAmount}
        maxLength={7}
        placeholder="z. B. 500"
      />
      <FormPicker
        label="Einheit"
        selectedValue={values.dosageUnit}
        options={DOSAGE_UNITS}
        onValueChange={(v) => handleChange("dosageUnit", v)}
        errorText={errors.dosageUnit}
      />
      <FormInput
        label="Einnahmehäufigkeit"
        value={values.intakeFrequency}
        onChangeText={(v) => handleChange("intakeFrequency", v)}
      />
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
