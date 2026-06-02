import React from "react";

import { useFormValidation } from "@/hooks/use-form-validation";
import {
  ConditionStatus,
  EntryBy,
  MedicalHistoryEntryFormData,
} from "@/types/medical-history-entry-type";

import { FormInput } from "../ui/form-input";
import { FormPicker } from "../ui/form-picker";
import { ModalCard } from "../ui/modal-card";

interface MedicalHistoryEntryFormProps {
  initialData?: any | null;
  onSave: (data: MedicalHistoryEntryFormData) => Promise<void>;
  onCancel: () => void;
}

interface FormValues {
  diagnosis: string;
  icd10Code: string;
  year: string;
  status: ConditionStatus;
  comment: string;
  entryBy: EntryBy;
}

export function MedicalHistoryEntryForm({
  onSave,
  onCancel,
  initialData,
}: MedicalHistoryEntryFormProps) {
  const statusMap: Record<string, ConditionStatus> = {
    Aktiv: ConditionStatus.Active,
    Chronisch: ConditionStatus.Chronical,
    "In Remission": ConditionStatus.InRemission,
  };
  const statusOptions = Object.keys(statusMap);

  const entryByMap: Record<string, EntryBy> = {
    Patient: EntryBy.Patient,
    Arzt: EntryBy.Doctor,
  };
  const entryByOptions = Object.keys(entryByMap);

  // status kommt vom Backend bereits als korrekter Enum-Wert (0/1/2)
  let mappedStatus: ConditionStatus = ConditionStatus.Active;
  if (initialData) {
    const rawStatus =
      initialData.Status !== undefined
        ? initialData.Status
        : initialData.status;
    if (typeof rawStatus === "number") {
      mappedStatus =
        rawStatus === 0
          ? ConditionStatus.Chronical
          : rawStatus === 1
          ? ConditionStatus.Active
          : rawStatus === 2
          ? ConditionStatus.InRemission
          : ConditionStatus.Active;
    } else {
      const s = String(rawStatus).toLowerCase();
      if (s.includes("chron")) mappedStatus = ConditionStatus.Chronical;
      else if (s.includes("remiss")) mappedStatus = ConditionStatus.InRemission;
      else if (s.includes("active")) mappedStatus = ConditionStatus.Active;
      else mappedStatus = ConditionStatus.Active;
      mappedStatus = rawStatus as ConditionStatus;
    }
  }

  let mappedEntryBy: EntryBy = EntryBy.Patient;
  if (initialData) {
    const rawEntryBy =
      initialData.EntryBy !== undefined
        ? initialData.EntryBy
        : initialData.entryBy;
    if (typeof rawEntryBy === "number") {
      mappedEntryBy = rawEntryBy as EntryBy;
    }
  }

  const mappedInitialData: FormValues | null = initialData
    ? {
        diagnosis: initialData.Diagnosis || initialData.diagnosis || "",
        icd10Code:
          initialData.icD10Code ||
          initialData.ICD10Code ||
          initialData.icd10Code ||
          "",
        year:
          (initialData.Year || initialData.year)?.toString() ||
          new Date().getFullYear().toString(),
        status: mappedStatus,
        comment: initialData.Comment || initialData.comment || "",
        entryBy: mappedEntryBy,
      }
    : null;

  const { values, errors, handleChange, handleSubmit } =
    useFormValidation<FormValues>(
      mappedInitialData,
      {
        diagnosis: "",
        icd10Code: "",
        year: new Date().getFullYear().toString(),
        status: ConditionStatus.Active,
        comment: "",
        entryBy: EntryBy.Patient,
      },
      (vals) => {
        const errs: Record<string, string> = {};
        if (!vals.diagnosis.trim()) errs.diagnosis = "Eintrag fehlt";
        return errs;
      },
    );
  const onFinalSave = async (validatedData: FormValues) => {
    await onSave({
      diagnosis: validatedData.diagnosis,
      icd10Code: validatedData.icd10Code.trim(),
      year: parseInt(validatedData.year) || new Date().getFullYear(),
      status: validatedData.status,
      comment: validatedData.comment.trim(),
      entryBy: validatedData.entryBy,
    });
  };

  return (
    <ModalCard
      title={initialData ? "Diagnose bearbeiten" : "Neue Diagnose"}
      onClose={onCancel}
      onSave={() => handleSubmit(onFinalSave)}
      saveButtonText="Diagnose speichern"
    >
      <FormInput
        label="Erkrankung"
        isRequired
        value={values.diagnosis}
        onChangeText={(text) => handleChange("diagnosis", text)}
        errorText={errors.diagnosis && "Eintrag fehlt"}
      />
      <FormInput
        label="ICD-10 Code"
        value={values.icd10Code}
        onChangeText={(text) => handleChange("icd10Code", text)}
      />
      <FormInput
        label="Diagnosejahr"
        keyboardType="numeric"
        value={values.year}
        onChangeText={(text) => handleChange("year", text)}
      />
      <FormPicker
        label="Status"
        isRequired
        selectedValue={
          Object.keys(statusMap).find(
            (key) => statusMap[key] === values.status,
          ) || "Aktiv"
        }
        onValueChange={(itemValue) =>
          handleChange("status", statusMap[itemValue] || ConditionStatus.Active)
        }
        options={statusOptions}
      />
      <FormPicker
        label="Erfasst von"
        isRequired
        selectedValue={
          Object.keys(entryByMap).find(
            (key) => entryByMap[key] === values.entryBy,
          ) || "Patient"
        }
        onValueChange={(itemValue) =>
          handleChange("entryBy", entryByMap[itemValue] ?? EntryBy.Patient)
        }
        options={entryByOptions}
      />
      <FormInput
        label="Anmerkungen"
        value={values.comment}
        onChangeText={(text) => handleChange("comment", text)}
        multiline
        numberOfLines={3}
        style={{ minHeight: 80, textAlignVertical: "top", paddingTop: 12 }}
      />
    </ModalCard>
  );
}
