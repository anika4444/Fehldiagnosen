import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, useColorScheme, View } from "react-native";

import { CommunicationLevelModal } from "@/components/communicationlevel/CommunicationLevelModal";
import { ThemedText } from "@/components/themed-text";
import { Card } from "@/components/ui/card";
import { HeaderView } from "@/components/ui/header-view";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Colors } from "@/constants/theme";
import { useCommunicationLevel } from "@/hooks/use-communication";
import { usePatient } from "@/hooks/use-patient";
import { showSuccessAlert } from "@/utils/alerts";

const CommunicationLevel = () => {
  const { patientId } = usePatient();
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const [isModalVisible, setModalVisible] = useState(false);

  const { questions, currentLevel, saveLevel } =
    useCommunicationLevel(patientId);

  const handleSave = async (ids: number[]) => {
    try {
      await saveLevel(ids);
      setModalVisible(false);
      showSuccessAlert("Kommunikationslevel erfolgreich gespeichert.");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <HeaderView
        title="Kommunikationstool"
        subtitle="Stellen Sie Ihr persönliches Level ein"
        onBackPress={() => router.back()}
      />

      <View style={styles.content}>
        {/* INFO CARD */}
        <Card
          style={[
            styles.infoCard,
            { backgroundColor: theme.surface, shadowColor: theme.text },
          ]}
        >
          <View style={styles.cardIconWrapper}>
            <Feather name="message-square" size={24} color={theme.primary} />
          </View>
          <View style={styles.textColumn}>
            <ThemedText style={[styles.cardText, { color: theme.text }]}>
              Medizin verständlich erklärt. Wir passen unsere KI-Erklärungen an
              Ihr Vorwissen an. Ihr Arzt erhält ebenfalls einen Hinweis auf Ihr
              gewähltes Level, damit Ihr nächster Termin auf Augenhöhe
              stattfindet und keine Fragen offen bleiben.
            </ThemedText>
          </View>
        </Card>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title={
              currentLevel ? "Level anpassen" : "Kommunikationslevel hinzufügen"
            }
            icon="cog"
            onPress={() => setModalVisible(true)}
          />
        </View>

        {/* STATUS CARD */}
        {currentLevel && (
          <Card
            style={[
              styles.statusCard,
              { borderColor: theme.primary, backgroundColor: theme.surface },
            ]}
          >
            <View style={styles.row}>
              <Feather name="check-circle" size={20} color={theme.primary} />
              <ThemedText
                type="defaultSemiBold"
                style={[styles.statusTitle, { color: theme.text }]}
              >
                Aktuelles Level: {currentLevel.levelName}
              </ThemedText>
            </View>

            <ThemedText
              style={[
                styles.descriptionText,
                { color: theme.text, paddingLeft: 30 },
              ]}
            >
              {currentLevel.levelDescription}
            </ThemedText>
          </Card>
        )}
      </View>

      {/* MODAL */}
      <CommunicationLevelModal
        isVisible={isModalVisible}
        questions={questions}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 24,
  },
  infoCard: {
    flexDirection: "row",
    padding: 20,
    marginBottom: 15,
    borderRadius: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    gap: 16,
  },
  statusCard: {
    padding: 20,
    marginBottom: 32,
    borderRadius: 24,
    borderWidth: 1.5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },
  statusTitle: {
    fontSize: 16,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: "italic",
    opacity: 0.8,
  },
  cardIconWrapper: {
    paddingTop: 2,
  },
  textColumn: {
    flex: 1,
  },
  cardText: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "500",
  },
  buttonContainer: {
    marginBottom: 15,
  },
});

export default CommunicationLevel;
