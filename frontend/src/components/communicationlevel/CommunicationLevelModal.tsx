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

  // State: Speichert pro Frage die ID der gewählten Antwort
  // Key: QuestionID, Value: AnswerID
  const [selections, setSelections] = useState<Record<number, number>>({});

  const handleSelect = (questionId: number, answerId: number) => {
    setSelections((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const handleSave = () => {
    const selectedIds = Object.values(selections);
    onSave(selectedIds);
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          {/* Header */}
          <View style={styles.header}>
            <ThemedText style={styles.headerTitle}>
              Kommunikationslevel
            </ThemedText>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={20} color="#F87171" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Info Box */}
            <View style={styles.infoBox}>
              <Feather name="message-square" size={18} color="#11A17A" />
              <ThemedText style={styles.infoText}>
                Beantworten Sie die folgenden Fragen ehrlich
              </ThemedText>
            </View>

            {/* Fragen-Schleife */}
            {questions.map((question) => (
              <View key={question.id} style={styles.questionContainer}>
                <ThemedText style={styles.questionText}>
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
                        style={[styles.radioOuter, { borderColor: "#0F5B4A" }]}
                      >
                        {isSelected && <View style={styles.radioInner} />}
                      </View>
                      <ThemedText style={styles.answerText}>
                        {answer.text}
                      </ThemedText>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}

            {/* Save Button */}
            <PrimaryButton
              title="Fragen speichern"
              icon="content-save"
              onPress={handleSave}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },
  container: {
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: "#11A17A",
    maxHeight: "90%",
    overflow: "hidden",
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
    fontSize: 20,
    fontWeight: "600",
    color: "#0F5B4A",
  },
  closeButton: {
    backgroundColor: "#FEE2E2",
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
    borderColor: "#11A17A",
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
  },
  infoText: {
    fontSize: 14,
    color: "#0F5B4A",
    flex: 1,
  },
  questionContainer: {
    marginBottom: 28,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F5B4A",
    marginBottom: 16,
    lineHeight: 22,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    gap: 12,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#0F5B4A",
  },
  answerText: {
    fontSize: 15,
    color: "#0F5B4A",
    flex: 1,
    lineHeight: 20,
  },
  saveButton: {
    marginTop: 8,
  },
});
