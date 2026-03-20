import React, { useEffect, useState } from "react";

import { symptomService } from "@/api/symptomService";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import {
  PatientSymptomResponse,
  SymptomFieldResponse,
  SymptomFormData,
} from "@/types/symptom-type";

import { FormInput } from "./form-input";
import { FormPicker } from "./form-picker";
import { FormSlider } from "./form-slider";
import { FormTimePicker } from "./form-time-picker";
import { ModalCard } from "./modal-card";

interface SymptomFormProps {
  selectedDate: Date;
  initialData?: PatientSymptomResponse | null;
  onSave: (data: SymptomFormData) => Promise<void>;
  onCancel: () => void;
}

export function SymptomForm({
  selectedDate,
  onSave,
  onCancel,
  initialData,
}: SymptomFormProps) {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const [symptomName, setSymptomName] = useState("");
  const [time, setTime] = useState(new Date());
  const [intensity, setIntensity] = useState(5);
  const [duration, setDuration] = useState("");
  const [possibleTriggers, setPossibleTriggers] = useState("");
  const [notes, setNotes] = useState("");
  const [details, setDetails] = useState<Record<string, string>>({});

  const [dynamicFields, setDynamicFields] = useState<SymptomFieldResponse[]>(
    [],
  );
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (initialData) {
      setSymptomName(initialData.symptomName || "");
      setIntensity(initialData.intensity || 5);
      setDuration(initialData.duration || "");
      setPossibleTriggers(initialData.possibleTrigger || "");
      setNotes(initialData.notes || "");

      if (initialData.occurrenceTime) {
        setTime(new Date(initialData.occurrenceTime));
      }

      if (initialData.details) {
        const sanitizedDetails: Record<string, string> = {};
        Object.entries(initialData.details).forEach(([key, value]) => {
          sanitizedDetails[key] = value ?? "";
        });
        setDetails(sanitizedDetails);
      }
    } else {
      setSymptomName("");
      setTime(new Date());
      setIntensity(5);
      setDuration("");
      setPossibleTriggers("");
      setNotes("");
      setDetails({});
    }
  }, [initialData]);

  useEffect(() => {
    if (symptomName.length < 2) return setDynamicFields([]);
    const timeoutId = setTimeout(async () => {
      const defs = await symptomService.getSymptomDefinitions(symptomName);
      setDynamicFields(defs?.[0]?.fields || []);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [symptomName]);

  const handleSave = async () => {
    const newErrors: Record<string, boolean> = {
      name: !symptomName.trim(),
      duration: !duration.trim(),
    };

    dynamicFields.forEach((f) => {
      if (f.isRequired && !details[f.name]?.trim()) newErrors[f.name] = true;
    });

    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e)) return;

    const occurrenceTime = new Date(selectedDate);
    occurrenceTime.setHours(time.getHours(), time.getMinutes(), 0, 0);

    await onSave({
      symptomName,
      occurrenceTime: occurrenceTime.toISOString(),
      intensity,
      duration,
      possibleTriggers,
      notes,
      details,
    });
  };

  return (
    <ModalCard
      title={initialData ? "Symptom bearbeiten" : "Neues Symptom"}
      onClose={onCancel}
      onSave={handleSave}
      saveButtonText="Symptom speichern"
    >
      <FormInput
        label="Symptomname"
        isRequired
        value={symptomName}
        onChangeText={setSymptomName}
        errorText={errors.name && "Name fehlt"}
      />

      {dynamicFields.map((field) =>
        field.type === "select" ? (
          <FormPicker
            key={field.name}
            label={field.name}
            isRequired={field.isRequired}
            selectedValue={details[field.name] || ""}
            options={field.options || []}
            onValueChange={(v) =>
              setDetails((p) => ({ ...p, [field.name]: v }))
            }
            errorText={errors[field.name] && `${field.name} fehlt`}
          />
        ) : (
          <FormInput
            key={field.name}
            label={field.name}
            isRequired={field.isRequired}
            value={details[field.name] || ""}
            keyboardType={field.type === "number" ? "numeric" : "default"}
            onChangeText={(v) => setDetails((p) => ({ ...p, [field.name]: v }))}
            errorText={errors[field.name] && `${field.name} fehlt`}
          />
        ),
      )}

      <FormTimePicker
        label="Uhrzeit"
        isRequired
        time={time}
        onTimeChange={(_, st) => st && setTime(st)}
      />
      <FormSlider
        label="Intensität"
        isRequired
        value={intensity}
        onValueChange={setIntensity}
      />
      <FormInput
        label="Dauer"
        isRequired
        value={duration}
        onChangeText={setDuration}
        errorText={errors.duration && "Dauer fehlt"}
      />
      <FormInput
        label="Auslöser"
        value={possibleTriggers}
        onChangeText={setPossibleTriggers}
      />
      <FormInput
        label="Notizen"
        value={notes}
        onChangeText={setNotes}
        multiline
        style={{ minHeight: 80 }}
      />
    </ModalCard>
  );
}
