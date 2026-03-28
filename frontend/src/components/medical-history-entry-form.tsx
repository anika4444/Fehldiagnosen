import React, { useEffect, useState } from "react";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";

import { FormInput } from "./form-input";
import { FormPicker } from "./form-picker";
import { ModalCard } from "./modal-card";
import { MedicalHistoryEntryFormData, ConditionStatus } from "@/types/medical-history-entry-type";

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
    const colorScheme = useColorScheme() ?? "light";
    const theme = Colors[colorScheme];

    const [diagnosis, setDiagnosis] = useState("");
    const [icd10Code, setIcd10Code] = useState("");
    const [year, setYear] = useState("");
    const [status, setStatus] = useState<ConditionStatus>("Active");
    const [comment, setComment] = useState("");

    const [errors, setErrors] = useState<Record<string, boolean>>({});

    // Da dein FormPicker nur ein String-Array nimmt, 
    // mappen wir die deutschen Begriffe hier direkt.
    const statusMap: Record<string, ConditionStatus> = {
        "Aktiv": "Active",
        "Chronisch": "Chronical",
        "In Remission": "InRemission",
    };

    const statusOptions = Object.keys(statusMap);

    useEffect(() => {
        if (initialData) {
            setDiagnosis(initialData.diagnosis || "");
            setIcd10Code(initialData.icd10Code || "");
            setYear(initialData.year?.toString() || "");
            setStatus(initialData.status || "Active");
            setComment(initialData.comment || "");
        } else {
            setDiagnosis("");
            setIcd10Code("");
            setYear("");
            setStatus("Active");
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
            icd10Code: icd10Code || null,
            year: parseInt(year) || new Date().getFullYear(),
            status,
            comment: comment || null,
        });
    };

    // Hilfsfunktion, um den Anzeigenamen für den aktuellen Status-String zu finden
    const getCurrentStatusLabel = () => {
        return Object.keys(statusMap).find(key => statusMap[key] === status) || "";
    };

    return (
        <ModalCard
            title={initialData ? "Vorerkrankung bearbeiten" : "Neue Vorerkrankung"}
            onClose={onCancel}
            onSave={handleSave}
            saveButtonText="Symptom speichern"
        >
            <FormInput
                label="Erkrankung"
                placeholder="z.B. Appendektomie"
                isRequired
                value={diagnosis}
                onChangeText={setDiagnosis}
                errorText={errors.diagnosis && "Eintrag fehlt"}
            />

            <FormInput
                label="ICD-10 Code"
                placeholder="z.B. E11.9"
                value={icd10Code}
                onChangeText={setIcd10Code}
            />

            <FormInput
                label="Diagnosejahr"
                placeholder="z.B. 2020"
                value={year}
                onChangeText={setYear}
            />

            <FormPicker
                label="Status"
                selectedValue={getCurrentStatusLabel()}
                onValueChange={(itemValue) => setStatus(statusMap[itemValue] || "Active")}
                options={statusOptions}
            />

            <FormInput
                label="Anmerkungen"
                placeholder="Weitere Anmerkungen..."
                value={comment}
                onChangeText={setComment}
                multiline
                style={{
                    minHeight: 80,
                }}
            />
        </ModalCard>
    );
}