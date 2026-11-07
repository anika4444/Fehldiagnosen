import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

interface Answer {
  id: number;
  text: string;
}

interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSave: (selectedAnswerIds: number[]) => void;
  questions: Question[];
}

export const CommunicationLevelModal = ({
  isVisible,
  onClose,
  onSave,
  questions,
}: Props) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const [selections, setSelections] = useState<Record<number, number>>({});

  const handleSelect = (questionId: number, answerId: number) => {
    setSelections((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const handleSave = () => {
    const selectedIds = Object.values(selections);
    onSave(selectedIds);
  };

  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <View style={styles.overlay}>
        <View
          style={[
            styles.container,
            { backgroundColor: theme.background, borderColor: theme.primary },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <ThemedText style={[styles.headerTitle, { color: theme.text }]}>
              Kommunikationslevel
            </ThemedText>
            <TouchableOpacity
              onPress={onClose}
              style={[
                styles.closeButton,
                { backgroundColor: theme.closeBgColor },
              ]}
            >
              <Feather name="x" size={20} color={theme.closeIconColor} />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Info Box */}
            <View
              style={[
                styles.infoBox,
                { backgroundColor: theme.surface, borderColor: theme.primary },
              ]}
            >
              <Feather name="info" size={20} color={theme.primary} />
              <ThemedText style={[styles.infoText, { color: theme.text }]}>
                Beantworten Sie die folgenden Fragen bitte ehrlich, damit wir
                die App perfekt auf Sie abstimmen können.
              </ThemedText>
            </View>

            {/* Fragen-Schleife */}
            {questions.map((question) => (
              <View key={question.id} style={styles.questionContainer}>
                <ThemedText
                  style={[styles.questionText, { color: theme.text }]}
                >
                  {question.text}
                </ThemedText>

                {question.answers.map((answer) => {
                  const isSelected = selections[question.id] === answer.id;
                  return (
                    <TouchableOpacity
                      key={answer.id}
                      style={styles.radioRow}
                      onPress={() => handleSelect(question.id, answer.id)}
                      activeOpacity={0.7}
                    >
                      <View
                        style={[
                          styles.radioOuter,
                          { borderColor: theme.primary },
                        ]}
                      >
                        {isSelected && (
                          <View
                            style={[
                              styles.radioInner,
                              { backgroundColor: theme.primary },
                            ]}
                          />
                        )}
                      </View>
                      <ThemedText
                        style={[styles.answerText, { color: theme.text }]}
                      >
                        {answer.text}
                      </ThemedText>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}

            {/* Save Button */}
            <View style={styles.saveButtonWrapper}>
              <PrimaryButton
                title="Antworten speichern"
                icon="content-save"
                onPress={handleSave}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Etwas dunkler für mehr Fokus
    justifyContent: "center",
    padding: 16,
  },
  container: {
    borderRadius: 24,
    borderWidth: 1,
    maxHeight: "85%",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
  },
  infoText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  questionContainer: {
    marginBottom: 32,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    lineHeight: 26,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 14,
    paddingVertical: 4,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  answerText: {
    fontSize: 16,
    flex: 1,
    lineHeight: 22,
  },
  saveButtonWrapper: {
    marginTop: 8,
  },
});
