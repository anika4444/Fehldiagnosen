import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { login } from "@/api/userService";
import { Card } from "@/components/card";
import { HeaderView } from "@/components/header-view";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";

const LoginScreen = () => {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Eingabe fehlt", "Bitte Benutzername und Passwort eingeben.");
      return;
    }

    setLoading(true);
    try {
      const result = await login({ username, password });

      if (result.isSuccess && result.data && result.data.token) {
        const { token, expiration, patientId } = result.data;
        if (Platform.OS === "web") {
          localStorage.setItem("userToken", token);
          localStorage.setItem("tokenExpiration", expiration);
          localStorage.setItem("patientId", patientId);
        } else {
          await SecureStore.setItemAsync("userToken", String(token));
          await SecureStore.setItemAsync("tokenExpiration", String(expiration));
          await SecureStore.setItemAsync("patientId", String(patientId));
        }

        router.replace("/(tabs)");
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.errorMessage || "Prüfen Sie Ihre Zugangsdaten.";
      Alert.alert("Login fehlgeschlagen", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <HeaderView title="Willkommen" subtitle="Bitte melden Sie sich an" />

      <View style={styles.content}>
        <Card
          style={[styles.card, { borderColor: theme.surface, borderWidth: 1 }]}
        >
          <ThemedText type="subtitle" style={styles.cardTitle}>
            Login
          </ThemedText>

          <View
            style={[
              styles.inputContainer,
              { borderBottomColor: theme.surface },
            ]}
          >
            <MaterialCommunityIcons
              name="account-outline"
              size={22}
              color={theme.primary}
            />
            <TextInput
              style={[styles.input, { color: theme.text }]}
              placeholder="Benutzername"
              placeholderTextColor={theme.icon}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          <View
            style={[
              styles.inputContainer,
              { borderBottomColor: theme.surface },
            ]}
          >
            <MaterialCommunityIcons
              name="lock-outline"
              size={22}
              color={theme.primary}
            />
            <TextInput
              style={[styles.input, { color: theme.text }]}
              placeholder="Passwort"
              placeholderTextColor={theme.icon}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: theme.primary, opacity: loading ? 0.7 : 1 },
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            <ThemedText style={styles.buttonText}>
              {loading ? "Wird angemeldet..." : "Anmelden"}
            </ThemedText>
          </TouchableOpacity>

          <Link href={"/(auth)/register" as any} asChild>
            <TouchableOpacity style={styles.link}>
              <ThemedText type="smallText" style={{ color: theme.primary }}>
                Noch kein Konto?{" "}
                <ThemedText type="smallText" style={{ fontWeight: "bold" }}>
                  Jetzt registrieren
                </ThemedText>
              </ThemedText>
            </TouchableOpacity>
          </Link>
        </Card>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  card: { padding: 25, borderRadius: 20, elevation: 4 },
  cardTitle: { marginBottom: 20 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    marginBottom: 25,
    paddingBottom: 8,
  },
  input: { flex: 1, marginLeft: 12, fontSize: 16 },
  button: {
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  link: { marginTop: 25, alignItems: "center" },
});
