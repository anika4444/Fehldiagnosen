import * as signalR from "@microsoft/signalr";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { medicationService } from "@/api/medicationService";
import { FormInput } from "@/components/form-input";
import { HeaderView } from "@/components/header-view";
import { ModalCard } from "@/components/modal-card";
import { PrimaryButton } from "@/components/primary-button";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import {
  CreateMedicationRequest,
  MedicationResponse,
} from "@/types/medication-type";

interface FormData {
  name: string;
  dosage: string;
  intakeFrequency: string;
  durationInDays: string;
  indication: string;
  doctorName: string;
  notes: string;
  intakeStartDate: string;
}

interface FormErrors {
  name?: string;
  dosage?: string;
}

const emptyForm: FormData = {
  name: "",
  dosage: "",
  intakeFrequency: "",
  durationInDays: "",
  indication: "",
  doctorName: "",
  notes: "",
  intakeStartDate: "",
};

export default function Medications() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const [patientId, setPatientId] = useState<number | null>(null);
  const [medications, setMedications] = useState<MedicationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingMedication, setEditingMedication] =
    useState<MedicationResponse | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  useEffect(() => {
    const loadPatientId = async () => {
      const storedId =
        Platform.OS === "web"
          ? localStorage.getItem("patientId")
          : await SecureStore.getItemAsync("patientId");

      if (storedId && !isNaN(parseInt(storedId))) {
        setPatientId(parseInt(storedId));
      }
    };
    loadPatientId();
  }, []);

  const fetchMedications = async () => {
    if (!patientId) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await medicationService.getMedicationsByPatientId(patientId);
      setMedications(data);
    } catch {
      setError("Fehler beim Laden der Medikamente.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!patientId) return;

    fetchMedications();

    const backendUrl =
      Platform.OS === "android"
        ? "http://10.0.2.2:5238"
        : "http://localhost:5238";

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${backendUrl}/hubs/medication`)
      .build();

    connection.on("RefreshMedications", () => {
      fetchMedications();
    });

    connection.start();

    return () => {
      connection.stop();
    };
  }, [patientId]);

  const openCreateForm = () => {
    setEditingMedication(null);
    setFormData(emptyForm);
    setFormErrors({});
    setIsFormVisible(true);
  };

  const openEditForm = (medication: MedicationResponse) => {
    setEditingMedication(medication);
    setFormData({
      name: medication.name,
      dosage: medication.dosage ?? "",
      intakeFrequency: medication.intakeFrequency ?? "",
      durationInDays: medication.durationInDays?.toString() ?? "",
      indication: medication.indication ?? "",
      doctorName: medication.doctorName ?? "",
      notes: medication.notes ?? "",
      intakeStartDate: medication.intakeStartDate?.split("T")[0] ?? "", // ← neu
    });
    setFormErrors({});
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setEditingMedication(null);
    setFormData(emptyForm);
    setFormErrors({});
  };

  const validate = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.name.trim()) {
      errors.name = "Bitte geben Sie den Medikamentennamen an.";
    }
    if (!formData.dosage.trim()) {
      errors.dosage = "Bitte geben Sie die Dosierung an.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validate() || patientId === null) return;

    const payload: CreateMedicationRequest = {
      name: formData.name.trim(),
      dosage: formData.dosage.trim() || undefined,
      intakeFrequency: formData.intakeFrequency.trim() || undefined,
      durationInDays: formData.durationInDays
        ? parseInt(formData.durationInDays)
        : undefined,
      intakeStartDate: formData.intakeStartDate.trim() || undefined,
      indication: formData.indication.trim() || undefined,
      doctorName: formData.doctorName.trim() || undefined,
      notes: formData.notes.trim() || undefined,
    };

    try {
      if (editingMedication) {
        await medicationService.updateMedication(
          patientId,
          editingMedication.id,
          payload,
        );
      } else {
        await medicationService.createMedication(patientId, payload);
      }
      closeForm();
      await fetchMedications();

      if (Platform.OS !== "web") {
        Alert.alert("Erfolg", "Medikament wurde gespeichert.");
      }
    } catch (err) {
      console.log("Fehler beim Speichern:", err);
      Alert.alert("Fehler", "Medikament konnte nicht gespeichert werden.");
    }
  };

  const handleDelete = async (medicationId: number) => {
    const doDelete = async () => {
      try {
        await medicationService.deleteMedication(medicationId);
        fetchMedications();
      } catch {
        Alert.alert("Fehler", "Löschen fehlgeschlagen.");
      }
    };

    if (Platform.OS === "web") {
      if (confirm("Möchten Sie dieses Medikament wirklich löschen?")) {
        doDelete();
      }
    } else {
      Alert.alert(
        "Löschen",
        "Möchten Sie dieses Medikament wirklich entfernen?",
        [
          { text: "Abbrechen", style: "cancel" },
          { text: "Löschen", style: "destructive", onPress: doDelete },
        ],
      );
    }
  };

  // Label + Wert Zeile wie in Symptom-Karte
  const DetailRow = ({
    label,
    value,
    last = false,
  }: {
    label: string;
    value: string;
    last?: boolean;
  }) => (
    <View style={[styles.detailRow, !last && styles.detailRowBorder]}>
      <ThemedText style={styles.detailLabel}>{label}</ThemedText>
      <ThemedText style={styles.detailValue}>{value}</ThemedText>
    </View>
  );

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <HeaderView
        title="Aktuelle Medikamente"
        subtitle="Verwalten Sie Ihre medizinischen Daten"
        onBackPress={() => router.back()}
      />

      <View style={styles.content}>
        {!isFormVisible ? (
          <PrimaryButton
            title="Eintrag hinzufügen"
            icon="plus-circle-outline"
            onPress={openCreateForm}
          />
        ) : (
          <ModalCard
            title={
              editingMedication ? "Medikament bearbeiten" : "Neues Medikament"
            }
            onClose={closeForm}
            onSave={handleSave}
            saveButtonText={editingMedication ? "Aktualisieren" : "Speichern"}
          >
            <FormInput
              label="Medikamentenname"
              isRequired
              placeholder="z.B. Aspirin"
              value={formData.name}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, name: text }))
              }
              errorText={formErrors.name}
            />
            <FormInput
              label="Wirkung/Dosierung"
              isRequired
              placeholder="z.B. 100 mg"
              value={formData.dosage}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, dosage: text }))
              }
              errorText={formErrors.dosage}
            />
            <FormInput
              label="Einnahmehäufigkeit"
              placeholder="z.B. 1x täglich morgens"
              value={formData.intakeFrequency}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, intakeFrequency: text }))
              }
            />
            <FormInput
              label="Einnahmedauer (in Tagen)"
              placeholder="z.B. 30"
              value={formData.durationInDays}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, durationInDays: text }))
              }
            />
            <FormInput
              label="Einnahme Startdatum (JJJJ-MM-TT)"
              placeholder="z.B. 2025-01-15"
              value={formData.intakeStartDate}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, intakeStartDate: text }))
              }
            />
            <FormInput
              label="Indikation"
              placeholder="z.B. Diabetes Typ 2"
              value={formData.indication}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, indication: text }))
              }
            />

            <FormInput
              label="Anmerkungen"
              placeholder="Weitere Anmerkungen..."
              value={formData.notes}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, notes: text }))
              }
              multiline
              numberOfLines={3}
              style={styles.multilineInput}
            />
          </ModalCard>
        )}

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Einträge
        </ThemedText>

        {isLoading && <ActivityIndicator size="large" color={theme.primary} />}

        {error && (
          <ThemedText style={{ color: theme.closeIconColor }}>
            {error}
          </ThemedText>
        )}

        {!isLoading && !error && medications.length === 0 && (
          <ThemedText style={styles.emptyText}>
            Keine Medikamente vorhanden.
          </ThemedText>
        )}

        {!isLoading &&
          medications.map((medication) => {
            const fields: { label: string; value: string }[] = [];
            if (medication.dosage)
              fields.push({
                label: "Wirkung/Dosierung",
                value: medication.dosage,
              });
            if (medication.intakeFrequency)
              fields.push({
                label: "Einnahmehäufigkeit",
                value: medication.intakeFrequency,
              });
            if (medication.durationInDays)
              fields.push({
                label: "Dauer",
                value: `${medication.durationInDays} Tage`,
              });
            if (medication.intakeStartDate)
              fields.push({
                label: "Einnahme seit",
                value: String(medication.intakeStartDate.split("T")[0]),
              });
            if (medication.endDate)
              fields.push({
                label: "Einnahme bis",
                value: String(medication.endDate.split("T")[0]),
              });
            if (medication.indication)
              fields.push({
                label: "Indikation",
                value: medication.indication,
              });
            if (medication.doctorName)
              fields.push({
                label: "Verschrieben von",
                value: medication.doctorName,
              });
            if (medication.notes)
              fields.push({ label: "Anmerkungen", value: medication.notes });

            return (
              <ModalCard
                key={medication.id}
                title={medication.name}
                types="secondary"
                onClose={() => handleDelete(medication.id)}
                onEdit={() => openEditForm(medication)}
              >
                <View style={styles.detailContainer}>
                  {fields.map((field, index) => (
                    <DetailRow
                      key={field.label}
                      label={field.label}
                      value={field.value}
                      last={index === fields.length - 1}
                    />
                  ))}
                </View>
              </ModalCard>
            );
          })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  sectionTitle: {
    marginTop: 8,
    marginBottom: 12,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    opacity: 0.6,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  detailContainer: {
    paddingHorizontal: 4,
    paddingTop: 4,
    paddingBottom: 4,
  },
  detailRow: {
    paddingVertical: 10,
  },
  detailRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.06)",
  },
  detailLabel: {
    fontSize: 12,
    opacity: 0.55,
    marginBottom: 3,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: "500",
  },
});
