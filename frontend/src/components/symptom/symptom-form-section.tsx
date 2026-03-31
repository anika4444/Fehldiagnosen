import React from "react";

import { PatientSymptomResponse, SymptomFormData } from "@/types/symptom-type";

import { PrimaryButton } from "../primary-button";
import { SymptomForm } from "./symptom-form";

interface SymptomFormSectionProps {
  isFormVisible: boolean;
  selectedDate: Date;
  editingSymptom: PatientSymptomResponse | null;
  onStartCreate: () => void;
  onSave: (data: SymptomFormData) => Promise<void>;
  onCancel: () => void;
}

export function SymptomFormSection({
  isFormVisible,
  selectedDate,
  editingSymptom,
  onStartCreate,
  onSave,
  onCancel,
}: SymptomFormSectionProps) {
  if (!isFormVisible) {
    return (
      <PrimaryButton title="Neues Symptom hinzufügen" onPress={onStartCreate} />
    );
  }

  return (
    <SymptomForm
      selectedDate={selectedDate}
      initialData={editingSymptom}
      onSave={onSave}
      onCancel={onCancel}
    />
  );
}
