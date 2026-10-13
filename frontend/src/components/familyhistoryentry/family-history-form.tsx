import { useFormValidation } from "@/hooks/use-form-validation";
import {
  CreateFamilyHistoryEntryRequest,
  FamilyHistoryEntryResponse,
} from "@/types/family-history-type";

import { FormInput } from "../ui/form-input";
import { ModalCard } from "../ui/modal-card";

interface FamilyHistoryFormProps {
  initialData: FamilyHistoryEntryResponse | null;
  onSave: (data: CreateFamilyHistoryEntryRequest) => Promise<void>;
  onCancel: () => void;
}

export const FamilyHistoryForm = ({
  initialData,
  onSave,
  onCancel,
}: FamilyHistoryFormProps) => {
  const { values, errors, handleChange, handleSubmit } = useFormValidation(
    initialData,
    // 1. Standardwerte (leer)
    { relative: "", diagnosis: "", comment: "" },
    // 2. Deine Validierungs-Regeln
    (vals) => {
      const errs: Record<string, string> = {};
      if (!vals.relative.trim())
        errs.relative = "Bitte geben Sie den Verwandten an.";
      if (!vals.diagnosis.trim())
        errs.diagnosis = "Bitte geben Sie die Diagnose an.";
      return errs;
    },
  );

  return (
    <ModalCard
      title={initialData ? "Eintrag bearbeiten" : "Neuer Eintrag"}
      onClose={onCancel}
      onSave={() => handleSubmit(onSave)}
      saveButtonText={initialData ? "Aktualisieren" : "Speichern"}
    >
      <FormInput
        label="Verwandter"
        isRequired
        placeholder="z. B. Vater, Mutter, Großvater"
        value={values.relative}
        onChangeText={(value) => handleChange("relative", value)}
        errorText={errors.relative}
      />
      <FormInput
        label="Diagnose"
        isRequired
        placeholder="z. B. Diabetes Typ 2"
        value={values.diagnosis}
        onChangeText={(value) => handleChange("diagnosis", value)}
        errorText={errors.diagnosis}
      />
      <FormInput
        label="Kommentar"
        placeholder="Optionale Anmerkungen"
        value={values.comment}
        onChangeText={(value) => handleChange("comment", value)}
        multiline
        numberOfLines={3}
        style={{ minHeight: 80, textAlignVertical: "top", paddingTop: 12 }}
      />
    </ModalCard>
  );
};
