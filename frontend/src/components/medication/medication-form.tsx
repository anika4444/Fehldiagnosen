import React, { useState } from "react";
import { KnownMedicationResult } from "@/api/knownMedicationService";
import { useFormValidation } from "@/hooks/use-form-validation";
import {
  CreateMedicationRequest,
  MedicationResponse,
} from "@/types/medication-type";

import { MedicationAutocomplete } from "./medication-autocomplete";
import { FormInput } from "../ui/form-input";
import { ModalCard } from "../ui/modal-card";

interface MedicationFormProps {
  initialData?: MedicationResponse | null;
  onSave: (data: CreateMedicationRequest) => Promise<void>;
  onCancel: () => void;
}

interface FormValues {
  name: string;
  dosage: string;
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

  const mappedInitialData: FormValues | null = initialData
    ? {
        name: initialData.name,
        dosage: initialData.dosage ?? "",
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
        dosage: "",
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
        return errs;
      },
    );

  const handleMedicationSelect = (medication: KnownMedicationResult) => {
    handleChange("name", medication.name);
    handleChange("dosage", medication.staerke ?? "");
    handleChange("atcCode", medication.atcCode ?? "");
  };

  const onFinalSave = async (validatedData: FormValues) => {
    await onSave({
      name: validatedData.name.trim(),
      dosage: validatedData.dosage.trim() || undefined,
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
        label="Wirkung/Dosierung"
        value={values.dosage}
        onChangeText={(v) => handleChange("dosage", v)}
        errorText={errors.dosage}
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
