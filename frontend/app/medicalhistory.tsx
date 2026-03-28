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

import { medicalHistoryEntryService } from "@/api/medicalHistoryEntryService";
import { HeaderView } from "@/components/header-view";
import { PrimaryButton } from "@/components/primary-button";
import { MedicalHistoryEntryCard } from "@/components/medical-history-entry-card";
import { MedicalHistoryEntryForm } from "@/components/medical-history-entry-form";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import {
    MedicalHistoryEntryRequest,
    MedicalHistoryEntryResponse,
    MedicalHistoryEntryFormData,
} from "@/types/medical-history-entry-type";

const MedicalHistory = () => {
    const colorScheme = useColorScheme() ?? "light";
    const theme = Colors[colorScheme];

    const [patientId, setPatientId] = useState<number | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [medicalHistoryEntries, setMedicalHistoryEntries] = useState<
        MedicalHistoryEntryResponse[]
    >([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [editingMedicalHistoryEntry, setEditingMedicalHistoryEntry] =
        useState<MedicalHistoryEntryResponse | null>(null);

    useEffect(() => {
        const loadPatientData = async () => {
            const storedId =
                Platform.OS === "web"
                    ? localStorage.getItem("patientId")
                    : await SecureStore.getItemAsync("patientId");

            if (storedId) {
                setPatientId(parseInt(storedId));
            }
        };
        loadPatientData();
    }, []);

    const fetchMedicalHistoryEntries = async () => {
        if (!patientId) return;

        setIsLoading(true);
        setError(null);
        try {
            const data =
                await medicalHistoryEntryService.getMedicalHistoryEntries(patientId);
            setMedicalHistoryEntries(data);
        } catch (error) {
            setError("Fehler beim Laden der Vorerkrankungen.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveMedicalHistoryEntry = async (formData: MedicalHistoryEntryFormData) => {
        if (patientId === null) {
            Alert.alert(
                "Fehler",
                "Sitzung abgelaufen. Bitte loggen Sie sich neu ein."
            );
            return;
        }

        try {
            const requestPayload: MedicalHistoryEntryRequest = {
                icd10Code: formData.icd10Code || null,
                diagnosis: formData.diagnosis,
                year: formData.year,
                status: formData.status,
                comment: formData.comment || null,
                entryBy: formData.entryBy,
            };

            if (editingMedicalHistoryEntry) {
                await medicalHistoryEntryService.updateMedicalHistoryEntry(
                    patientId,
                    editingMedicalHistoryEntry.id,
                    requestPayload,
                );
            } else {
                await medicalHistoryEntryService.createMedicalHistoryEntry(patientId, requestPayload);
            }

            setIsFormVisible(false);
            setEditingMedicalHistoryEntry(null);
            fetchMedicalHistoryEntries();

            if (Platform.OS !== "web") {
                Alert.alert("Erfolg", "Eintrag wurde gespeichert.");
            }
        } catch (error) {
            console.error("Konnte Eintrag nicht speichern:", error);
            Alert.alert("Fehler", "Es gab ein Problem beim Speichern.", [
                { text: "OK" },
            ]);
        }
    };

    const handleEditMedicalHistoryEntry = (entry: MedicalHistoryEntryResponse) => {
        setEditingMedicalHistoryEntry(entry);
        setIsFormVisible(true);
    };

    const handleDeleteMedicalHistoryEntry = async (id: number) => {
        const deleteConfirmed = async () => {
            try {
                await medicalHistoryEntryService.deleteMedicalHistoryEntry(id);
                fetchMedicalHistoryEntries();
            } catch (error) {
                Alert.alert("Fehler", "Löschen fehlgeschlagen.");
            }
        };

        if (Platform.OS === "web") {
            if (confirm("Möchten Sie diesen Eintrag wirklich löschen?")) {
                deleteConfirmed();
            }
        } else {
            Alert.alert(
                "Löschen",
                "Möchten Sie diese Vorerkrankung wirklich entfernen?",
                [
                    { text: "Abbrechen", style: "cancel" },
                    { text: "Löschen", style: "destructive", onPress: deleteConfirmed },
                ],
            );
        }
    };

    useEffect(() => {
        fetchMedicalHistoryEntries();
    }, [patientId]);

    return (
        <ScrollView style={{ backgroundColor: theme.background }}>
            <HeaderView
                title="Vorerkrankungen"
                subtitle="Verwalten Sie Ihre medizinischen Daten"
            />

            <View style={styles.content}>
                {!isFormVisible ? (
                    <PrimaryButton
                        title="Neue Vorerkrankung hinzufügen"
                        onPress={() => {
                            setEditingMedicalHistoryEntry(null);
                            setIsFormVisible(true);
                        }}
                    />
                ) : (
                    <MedicalHistoryEntryForm
                        initialData={editingMedicalHistoryEntry}
                        onSave={handleSaveMedicalHistoryEntry}
                        onCancel={() => {
                            setIsFormVisible(false);
                            setEditingMedicalHistoryEntry(null);
                        }}
                    />
                )}

                <ThemedText type="subtitle">
                    Ihre gespeicherten Vorerkrankungen
                </ThemedText>

                {isLoading && <ActivityIndicator size="large" color={theme.primary} />}
                {error && <ThemedText style={{ color: "red" }}>{error}</ThemedText>}

                {!isLoading && !error && medicalHistoryEntries.length === 0 && (
                    <ThemedText>
                        Keine Vorerkrankungen gefunden.
                    </ThemedText>
                )}

                {!isLoading &&
                    medicalHistoryEntries.map((entry) => (
                        <MedicalHistoryEntryCard
                            key={entry.id}
                            entry={entry}
                            onDelete={handleDeleteMedicalHistoryEntry}
                            onEdit={() => handleEditMedicalHistoryEntry(entry)}
                        />
                    ))}
            </View>
        </ScrollView>
    );
};

export default MedicalHistory;

const styles = StyleSheet.create({
    content: {
        padding: 20,
    },
    mainCard: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 24,
        borderRadius: 20,
        borderWidth: 1,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconBadge: {
        padding: 12,
        borderRadius: 14,
        marginRight: 16,
    },
    textColumn: {
        flex: 1,
    },
});