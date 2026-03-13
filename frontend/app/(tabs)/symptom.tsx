import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";

import { Card } from "@/components/card";
import { DatePickerField } from "@/components/date-picker-field";
import { HeaderView } from "@/components/header-view";
import { ModalCard } from "@/components/modal-card";
import { PrimaryButton } from "@/components/primary-button";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { useDatePicker } from "@/hooks/use-date-picker";

const Symptom = () => {
  const { date, show, onChange, toggleDatePicker, formattedDate } =
    useDatePicker();

  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <HeaderView
        title="Symptom-Tracker"
        subtitle="Erfassen Sie Ihre täglichen Beschwerden"
      />
      <View style={styles.content}>
        <Card style={styles.mainCard}>
          <DatePickerField
            label="Datum auswählen:"
            value={formattedDate}
            onPress={toggleDatePicker}
            primaryColor={theme.primary}
            backgroundColor={theme.background}
          />
        </Card>
        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChange}
            maximumDate={new Date()}
          />
        )}

        {!isFormVisible ? (
          <PrimaryButton
            title="Neues Symptom hinzufügen"
            onPress={() => setIsFormVisible(true)}
          />
        ) : (
          <ModalCard
            title="Neues Symptom"
            onClose={() => setIsFormVisible(false)}
          >
            <ThemedText>Hier kommen Textfelder hin...</ThemedText>
          </ModalCard>
        )}
        <ThemedText type="subtitle">Symptome am {formattedDate}</ThemedText>
        <ModalCard title="Symptom 1" onClose={() => {}} types="secondary">
          <ThemedText>Beschreibung des Symptoms...</ThemedText>
        </ModalCard>
      </View>
    </ScrollView>
  );
};

export default Symptom;

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
  datePickerTrigger: {
    paddingVertical: 8,
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
