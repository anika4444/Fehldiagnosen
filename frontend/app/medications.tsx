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
import { Card } from "@/components/card";
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
import * as signalR from "@microsoft/signalr";

interface FormData {
  name: string;
  dosage: string;
  intakeFrequency: string;
  durationInDays: string;
  indication: string;
  doctorName: string;
  notes: string;
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

      console.log("storedId aus Storage:", storedId); // DEBUG

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
    debugger
    if(!patientId)
    {
      return;
    }

    fetchMedications();

    const backendUrl= Platform.OS === "android" ? "http://10.0.2.2:5238" : "http://localhost:5238" ;

    const connection = new signalR.HubConnectionBuilder().withUrl(`${backendUrl}/hubs/medication`).build();

    connection.on("NotifyMedicationsRefresh",() => 
    {
      fetchMedications();
    })

    connection.start();

    return () => 
    {
      connection.stop();

    }

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
    console.log("patientId beim Speichern:", patientId); // DEBUG

    if (!validate() || patientId === null) {
      console.log("Abbruch: patientId ist null oder Validierung fehlgeschlagen"); // DEBUG
      return;
    }

    const payload: CreateMedicationRequest = {
      name: formData.name.trim(),
      dosage: formData.dosage.trim() || undefined,
      intakeFrequency: formData.intakeFrequency.trim() || undefined,
      durationInDays: formData.durationInDays
        ? parseInt(formData.durationInDays)
        : undefined,
      indication: formData.indication.trim() || undefined,
      doctorName: formData.doctorName.trim() || undefined,
      notes: formData.notes.trim() || undefined,
    };

    console.log("payload wird gesendet:", payload); // DEBUG

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
      //fetchMedications();

      if (Platform.OS !== "web") {
        Alert.alert("Erfolg", "Medikament wurde gespeichert.");
      }
    } catch (err) {
      console.log("Fehler beim Speichern:", err); // DEBUG
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

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <HeaderView
        title="Aktuelle Medikamente"
        subtitle="Verwalten Sie Ihre medizinischen Daten"
      />

      <View style={styles.content}>
        {!isFormVisible ? (
          <PrimaryButton
            title="Medikament hinzufügen"
            icon="plus-circle-outline"
            onPress={openCreateForm}
          />
        ) : (
          <ModalCard
            title={editingMedication ? "Medikament bearbeiten" : "Neues Medikament"}
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
              label="Dauer"
              placeholder="z.B. 4 Wochen"
              value={formData.durationInDays}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, durationInDays: text }))
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
              label="Name des verschriebenden Arztes"
              placeholder="z.B. Dr. Müller"
              value={formData.doctorName}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, doctorName: text }))
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
          Medikamente
        </ThemedText>

        {isLoading && (
          <ActivityIndicator size="large" color={theme.primary} />
        )}

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
          medications.map((medication) => (
            <ModalCard
              key={medication.id}
              title={medication.name}
              types="secondary"
              onClose={() => handleDelete(medication.id)}
              onEdit={() => openEditForm(medication)}
            >
              {medication.dosage && (
                <Card variant="filled" style={styles.detailCard}>
                  <ThemedText style={styles.fieldLabel}>Dosierung</ThemedText>
                  <ThemedText style={styles.fieldValue}>
                    {medication.dosage}
                  </ThemedText>
                </Card>
              )}
              {medication.intakeFrequency && (
                <Card variant="filled" style={styles.detailCard}>
                  <ThemedText style={styles.fieldLabel}>Einnahme</ThemedText>
                  <ThemedText style={styles.fieldValue}>
                    {medication.intakeFrequency}
                  </ThemedText>
                </Card>
              )}
              {medication.indication && (
                <Card variant="filled" style={styles.detailCard}>
                  <ThemedText style={styles.fieldLabel}>Indikation</ThemedText>
                  <ThemedText style={styles.fieldValue}>
                    {medication.indication}
                  </ThemedText>
                </Card>
              )}
              {medication.doctorName && (
                <Card variant="filled" style={styles.detailCard}>
                  <ThemedText style={styles.fieldLabel}>
                    Verschrieben von
                  </ThemedText>
                  <ThemedText style={styles.fieldValue}>
                    {medication.doctorName}
                  </ThemedText>
                </Card>
              )}
              {medication.notes && (
                <Card variant="filled" style={styles.detailCard}>
                  <ThemedText style={styles.fieldLabel}>Anmerkungen</ThemedText>
                  <ThemedText style={styles.fieldValue}>
                    {medication.notes}
                  </ThemedText>
                </Card>
              )}
            </ModalCard>
          ))}
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
  detailCard: {
    marginBottom: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "600",
    opacity: 0.6,
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 15,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: "top",
    paddingTop: 12,
  },
});
