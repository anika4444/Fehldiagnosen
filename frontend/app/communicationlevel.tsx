// @/screens/CommunicationLevel.tsx
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, useColorScheme, View } from "react-native";

import { CommunicationLevelModal } from "@/components/communicationlevel/CommunicationLevelModal";
import { ThemedText } from "@/components/themed-text";
import { Card } from "@/components/ui/card";
import { HeaderView } from "@/components/ui/header-view";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Colors } from "@/constants/theme";
import { useCommunicationLevel } from "@/hooks/use-communication";
import { showSuccessAlert } from "@/utils/alerts";

const CommunicationLevel = () => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const [isModalVisible, setModalVisible] = useState(false);

  // Unser neuer Hook
  const { questions, currentLevel, saveLevel, isLoading } =
    useCommunicationLevel();

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
        subtitle="Stellen Sie ihr persönliches Kommunikationslevel ein"
      />

      <View style={styles.content}>
        {/* INFO CARD */}
        <Card style={styles.infoCard}>
          <View style={styles.cardIconWrapper}>
            <Feather name="message-square" size={20} color={theme.primary} />
          </View>
          <View style={styles.textColumn}>
            <ThemedText style={styles.cardText}>
              Medizin verständlich erklärt. Wir passen unsere KI-Erklärungen an
              Ihr Vorwissen an.
            </ThemedText>
          </View>
        </Card>

        {/* STATUS CARD (Nur wenn Level bereits vorhanden) */}
        {currentLevel && (
          <Card style={[styles.statusCard, { borderColor: theme.primary }]}>
            <View style={styles.row}>
              <Feather name="check-circle" size={18} color={theme.primary} />
              <ThemedText type="defaultSemiBold">
                {" "}
                Aktuelles Level: {currentLevel.levelName}
              </ThemedText>
            </View>
            <ThemedText style={styles.recommendationText}>
              {currentLevel.actionRecommendation}
            </ThemedText>
          </Card>
        )}

        <PrimaryButton
          title={
            currentLevel ? "Level anpassen" : "Kommunikationslevel hinzufügen"
          }
          icon="plus"
          onPress={() => setModalVisible(true)}
        />
      </View>

      {/* DAS MODAL */}
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
  content: { padding: 20 },
  infoCard: {
    flexDirection: "row",
    padding: 18,
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    elevation: 3,
    gap: 12,
  },
  statusCard: {
    padding: 18,
    marginBottom: 24,
    borderRadius: 20,
    borderWidth: 1.5,
    backgroundColor: "rgba(17, 161, 122, 0.05)", // Ganz leichtes Grün
  },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  recommendationText: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: "italic",
    color: "#4A5568",
  },
  cardIconWrapper: { paddingTop: 4 },
  textColumn: { flex: 1 },
  cardText: { fontSize: 15, lineHeight: 24, fontWeight: "500" },
});

export default CommunicationLevel;
