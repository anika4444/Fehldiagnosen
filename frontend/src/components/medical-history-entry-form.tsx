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

    const statusMap: Record<string, ConditionStatus> = {
        "Aktiv": "Active",
        "Chronisch": "Chronical",
        "In Remission": "InRemission",
    };

    const statusOptions = Object.keys(statusMap);

    useEffect(() => {
        if (initialData) {
            setDiagnosis(initialData.Diagnosis || initialData.diagnosis || "");
            setIcd10Code(initialData.icD10Code || initialData.ICD10Code || initialData.icd10Code || "");
            setYear((initialData.Year || initialData.year)?.toString() || "");

            const rawStatus = initialData.Status !== undefined ? initialData.Status : initialData.status;
            const mappedStatus = typeof rawStatus === "number"
                ? (rawStatus === 1 ? "Chronical" : rawStatus === 2 ? "InRemission" : "Active")
                : (rawStatus || "Active");

            setStatus(mappedStatus as ConditionStatus);
            setComment(initialData.Comment || initialData.comment || "");
        } else {
            setDiagnosis("");
            setIcd10Code("");
            setYear(new Date().getFullYear().toString());
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
                selectedValue={Object.keys(statusMap).find(key => statusMap[key] === status) || "Aktiv"}
                onValueChange={(itemValue) => setStatus(statusMap[itemValue] || "Active")}
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