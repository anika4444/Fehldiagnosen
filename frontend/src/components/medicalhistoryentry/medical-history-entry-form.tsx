import React, { useEffect, useState } from "react";

import {
  ConditionStatus,
  MedicalHistoryEntryFormData,
} from "@/types/medical-history-entry-type";

import { FormInput } from "../form-input";
import { FormPicker } from "../form-picker";
import { ModalCard } from "../modal-card";

interface MedicalHistoryEntryFormProps {
  initialData?: any | null;
  onSave: (data: MedicalHistoryEntryFormData) => Promise<void>;
  onCancel: () => void;
}

export function MedicalHistoryEntryForm({
  onSave,
  onCancel,
  initialData,
}: MedicalHistoryEntryFormProps) {
  const [diagnosis, setDiagnosis] = useState("");
  const [icd10Code, setIcd10Code] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState<ConditionStatus>(ConditionStatus.Active);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const statusMap: Record<string, ConditionStatus> = {
    Aktiv: ConditionStatus.Active,
    Chronisch: ConditionStatus.Chronical,
    "In Remission": ConditionStatus.InRemission,
  };

  const statusOptions = Object.keys(statusMap);

  useEffect(() => {
    if (initialData) {
      setDiagnosis(initialData.Diagnosis || initialData.diagnosis || "");
      setIcd10Code(
        initialData.icD10Code ||
          initialData.ICD10Code ||
          initialData.icd10Code ||
          "",
      );
      setYear((initialData.Year || initialData.year)?.toString() || "");

      const rawStatus =
        initialData.Status !== undefined
          ? initialData.Status
          : initialData.status;
      const mappedStatus =
        typeof rawStatus === "number"
          ? rawStatus === ConditionStatus.Chronical
            ? ConditionStatus.Chronical
            : rawStatus === ConditionStatus.InRemission
              ? ConditionStatus.InRemission
              : ConditionStatus.Active
          : rawStatus === "Chronical"
            ? ConditionStatus.Chronical
            : rawStatus === "InRemission"
              ? ConditionStatus.InRemission
              : ConditionStatus.Active;

      setStatus(mappedStatus);
      setComment(initialData.Comment || initialData.comment || "");
    } else {
      setDiagnosis("");
      setIcd10Code("");
      setYear(new Date().getFullYear().toString());
      setStatus(ConditionStatus.Active);
      setComment("");
    }
  }, [initialData]);

  const handleSave = async () => {
    const newErrors: Record<string, boolean> = {
      diagnosis: !diagnosis.trim(),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e)) return;

    await onSave({
      diagnosis,
      icd10Code: icd10Code || "",
      year: parseInt(year) || new Date().getFullYear(),
      status,
      comment: comment || "",
    });
  };

  return (
    <ModalCard
      title={initialData ? "Vorerkrankung bearbeiten" : "Neue Vorerkrankung"}
      onClose={onCancel}
      onSave={handleSave}
      saveButtonText="Vorerkrankung speichern"
    >
      <FormInput
        label="Erkrankung"
        isRequired
        value={diagnosis}
        onChangeText={setDiagnosis}
        errorText={errors.diagnosis && "Eintrag fehlt"}
      />
      <FormInput
        label="ICD-10 Code"
        value={icd10Code}
        onChangeText={setIcd10Code}
      />
      <FormInput
        label="Diagnosejahr"
        keyboardType="numeric"
        value={year}
        onChangeText={setYear}
      />
      <FormPicker
        label="Status"
        isRequired
        selectedValue={
          Object.keys(statusMap).find((key) => statusMap[key] === status) ||
          "Aktiv"
        }
        onValueChange={(itemValue) =>
          setStatus(statusMap[itemValue] ?? ConditionStatus.Active)
        }
        options={statusOptions}
      />
      <FormInput
        label="Anmerkungen"
        value={comment}
        onChangeText={setComment}
        multiline
        numberOfLines={3}
        style={{ minHeight: 80, textAlignVertical: "top", paddingTop: 12 }}
      />
    </ModalCard>
  );
}
