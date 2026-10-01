import React, { useEffect, useMemo, useState } from "react";

import { symptomService } from "@/api/symptomService";
import { useFormValidation } from "@/hooks/use-form-validation";
import {
  PatientSymptomResponse,
  SymptomFieldResponse,
  SymptomFormData,
} from "@/types/symptom-type";

import { DurationInput } from "../ui/duration-input";
import { FormInput } from "../ui/form-input";
import { FormPicker } from "../ui/form-picker";
import { FormSlider } from "../ui/form-slider";
import { FormTimePicker } from "../ui/form-time-picker";
import { ModalCard } from "../ui/modal-card";
import { SymptomAutocomplete } from "./symptom-autocomplete";

interface SymptomFormProps {
  selectedDate: Date;
  initialData?: PatientSymptomResponse | null;
  onSave: (data: SymptomFormData) => Promise<void>;
  onCancel: () => void;
}

interface FormValues {
  symptomName: string;
  time: Date;
  intensity: number;
  duration: string;
  possibleTriggers: string;
  notes: string;
  details: Record<string, string>;
}

export function SymptomForm({
  selectedDate,
  onSave,
  onCancel,
  initialData,
}: SymptomFormProps) {
  const [dynamicFields, setDynamicFields] = useState<SymptomFieldResponse[]>(
    [],
  );
  const mappedInitialData = useMemo(() => {
    if (!initialData) return null;

    const sanitizedDetails: Record<string, string> = {};
    if (initialData.details) {
      Object.entries(initialData.details).forEach(([key, value]) => {
        sanitizedDetails[key] = value ?? "";
      });
    }

    return {
      symptomName: initialData.symptomName || "",
      time: initialData.occurrenceTime
        ? new Date(initialData.occurrenceTime)
        : new Date(),
      intensity: initialData.intensity || 5,
      duration: initialData.duration || "",
      possibleTriggers: initialData.possibleTrigger || "",
      notes: initialData.notes || "",
      details: sanitizedDetails,
    };
  }, [initialData]);

  const defaultValues = useMemo(
    () => ({
      symptomName: "",
      time: new Date(),
      intensity: 5,
      duration: "",
      possibleTriggers: "",
      notes: "",
      details: {},
    }),
    [],
  );

  const { values, errors, handleChange, handleSubmit } =
    useFormValidation<FormValues>(mappedInitialData, defaultValues, (vals) => {
      const errs: Record<string, string> = {};
      if (!vals.symptomName || !vals.symptomName.trim())
        errs.symptomName = "Name fehlt";
      if (!vals.duration || !vals.duration.trim())
        errs.duration = "Dauer fehlt";

      dynamicFields.forEach((f) => {
        if (
          f.isRequired &&
          (!vals.details[f.name] || !vals.details[f.name].trim())
        ) {
          errs[f.name] = `${f.name} fehlt`;
        }
      });
      return errs;
    });

  useEffect(() => {
    const currentName = values?.symptomName;
    if (!currentName || currentName.length < 2) {
      setDynamicFields([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const defs = await symptomService.getSymptomDefinitions(currentName);
        const fields = defs?.[0]?.fields || [];

        setDynamicFields((prev) =>
          JSON.stringify(prev) === JSON.stringify(fields) ? prev : fields,
        );
      } catch {
        setDynamicFields([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [values?.symptomName]);

  const onFinalSave = async (validatedData: FormValues) => {
    const occurrenceTime = new Date(selectedDate);
    occurrenceTime.setHours(
      validatedData.time.getHours(),
      validatedData.time.getMinutes(),
      0,
      0,
    );

    await onSave({
      symptomName: validatedData.symptomName,
      occurrenceTime: occurrenceTime.toISOString(),
      intensity: validatedData.intensity,
      duration: validatedData.duration,
      possibleTriggers: validatedData.possibleTriggers,
      notes: validatedData.notes,
      details: validatedData.details,
    });
  };

  const handleDetailChange = (key: string, value: string) => {
    handleChange("details", { ...values.details, [key]: value });
  };

  return (
    <ModalCard
      title={initialData ? "Symptom bearbeiten" : "Neues Symptom"}
      onClose={onCancel}
      onSave={() => handleSubmit(onFinalSave)}
      saveButtonText="Symptom speichern"
    >
      <SymptomAutocomplete
        value={values.symptomName}
        onChangeText={(value) => handleChange("symptomName", value)}
        errorText={errors.symptomName}
      />

      {dynamicFields.map((field) =>
        field.type === "select" ? (
          <FormPicker
            key={field.name}
            label={field.name}
            isRequired={field.isRequired}
            selectedValue={values.details[field.name] || ""}
            options={field.options || []}
            onValueChange={(v) => handleDetailChange(field.name, v)}
            errorText={errors[field.name]}
          />
        ) : (
          <FormInput
            key={field.name}
            label={field.name}
            isRequired={field.isRequired}
            value={values.details[field.name] || ""}
            keyboardType={field.type === "number" ? "numeric" : "default"}
            onChangeText={(v) => handleDetailChange(field.name, v)}
            errorText={errors[field.name]}
          />
        ),
      )}

      <FormTimePicker
        label="Uhrzeit"
        isRequired
        time={values.time}
        onTimeChange={(_, st) => st && handleChange("time", st)}
      />
      <FormSlider
        label="Intensität"
        isRequired
        value={values.intensity}
        onValueChange={(value) => handleChange("intensity", value)}
      />
      <DurationInput
        label="Dauer"
        isRequired
        value={values.duration}
        onChangeText={(value) => handleChange("duration", value)}
        errorText={errors.duration}
      />
      <FormInput
        label="Auslöser"
        value={values.possibleTriggers}
        onChangeText={(value) => handleChange("possibleTriggers", value)}
      />
      <FormInput
        label="Notizen"
        value={values.notes}
        onChangeText={(value) => handleChange("notes", value)}
        multiline
        style={{ minHeight: 80 }}
      />
    </ModalCard>
  );
}
