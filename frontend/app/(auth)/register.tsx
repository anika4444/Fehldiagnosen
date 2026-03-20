import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { ComponentProps, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { register } from "@/api/userService";
import { Card } from "@/components/card";
import { HeaderView } from "@/components/header-view";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { RegisterData } from "@/types/user-type";

const RegisterScreen = () => {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [formData, setFormData] = useState<RegisterData>({
    userName: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "", // Wird als YYYY-MM-DD gespeichert
    role: "Patient",
  });

  const handleRegister = async () => {
    // Einfache Validierung
    const { userName, password, email, firstName, lastName, dateOfBirth } =
      formData;
    if (
      !userName ||
      !password ||
      !email ||
      !firstName ||
      !lastName ||
      !dateOfBirth
    ) {
      Alert.alert("Fehler", "Bitte füllen Sie alle Felder aus.");
      return;
    }

    setLoading(true);
    try {
      const result = await register(formData);
      if (result) {
        Alert.alert("Erfolg", "Konto erfolgreich erstellt!", [
          {
            text: "Zum Login",
            onPress: () => router.replace("/(auth)/login" as any),
          },
        ]);
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.errorMessage || "Registrierung fehlgeschlagen.";
      Alert.alert("Fehler", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD
      setFormData({ ...formData, dateOfBirth: formattedDate });
    }
  };

  const renderInput = (
    label: string,
    icon: ComponentProps<typeof MaterialCommunityIcons>["name"],
    key: keyof RegisterData,
    secure = false,
    placeholder = "",
  ) => (
    <View style={styles.inputWrapper}>
      <ThemedText type="smallText" style={styles.label}>
        {label}
      </ThemedText>
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: theme.surface, borderColor: theme.surface },
        ]}
      >
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={theme.primary}
          style={styles.inputIcon}
        />
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder={placeholder}
          placeholderTextColor={theme.icon}
          secureTextEntry={secure}
          value={formData[key] as string}
          onChangeText={(text) => setFormData({ ...formData, [key]: text })}
          autoCapitalize="none"
        />
      </View>
    </View>
  );

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <HeaderView
        title="Registrierung"
        subtitle="Erstellen Sie Ihr Patienten-Konto"
      />

      <View style={styles.content}>
        <Card
          style={[
            styles.formCard,
            { borderColor: theme.surface, borderWidth: 1 },
          ]}
        >
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Persönliche Daten
          </ThemedText>

          {renderInput("Vorname", "account-outline", "firstName", false, "Max")}
          {renderInput(
            "Nachname",
            "account-outline",
            "lastName",
            false,
            "Mustermann",
          )}

          {/* Geburtsdatum Picker */}
          <View style={styles.inputWrapper}>
            <ThemedText type="smallText" style={styles.label}>
              Geburtsdatum
            </ThemedText>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={[
                styles.inputContainer,
                { backgroundColor: theme.surface, borderColor: theme.surface },
              ]}
            >
              <MaterialCommunityIcons
                name="calendar-range"
                size={20}
                color={theme.primary}
                style={styles.inputIcon}
              />
              <ThemedText
                style={{
                  color: formData.dateOfBirth ? theme.text : theme.icon,
                  flex: 1,
                }}
              >
                {formData.dateOfBirth || "Datum wählen"}
              </ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Account Details
          </ThemedText>

          {renderInput("Benutzername", "at", "userName", false, "benutzername")}
          {renderInput(
            "E-Mail",
            "email-outline",
            "email",
            false,
            "beispiel@mail.de",
          )}
          {renderInput(
            "Passwort",
            "lock-outline",
            "password",
            true,
            "********",
          )}

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: theme.primary, opacity: loading ? 0.7 : 1 },
            ]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <ThemedText style={styles.buttonText}>
                  Konto erstellen
                </ThemedText>
                <AntDesign name="check-circle" size={20} color="#fff" />
              </>
            )}
          </TouchableOpacity>
        </Card>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={new Date(2000, 0, 1)}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={onDateChange}
        />
      )}
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  formCard: {
    padding: 20,
    borderRadius: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 15,
    marginTop: 10,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    marginLeft: 4,
    opacity: 0.6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 15,
    height: 52,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.05)",
    marginVertical: 25,
  },
  button: {
    flexDirection: "row",
    height: 58,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
