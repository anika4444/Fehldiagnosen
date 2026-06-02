import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { Card } from "@/components/ui/card";
import { HeaderView } from "@/components/ui/header-view";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useFamilyHistory } from "@/hooks/use-family-history";
import { useMedicalHistory } from "@/hooks/use-medical-history";
import { useMedications } from "@/hooks/use-medications";
import { usePatient } from "@/hooks/use-patient";
import { MENU_ITEMS } from "@/types/navigation-type";

const Data = () => {
  const router = useRouter();

  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const { patientId } = usePatient();
  const { medications, refetch: refetchMeds } = useMedications(patientId);
  const { entries: familyEntries, refetch: refetchFamily } =
    useFamilyHistory(patientId);
  const { entries: medicalEntries, refetch: refetchMedical } =
    useMedicalHistory(patientId);

  useFocusEffect(
    useCallback(() => {
      if (!patientId) return;
      refetchMeds();
      refetchFamily();
      refetchMedical();
    }, [patientId, refetchMeds, refetchFamily, refetchMedical]),
  );

  const getSubtitle = (item: (typeof MENU_ITEMS)[number]): string => {
    switch (item.id) {
      case "meds": {
        const n = medications.length;
        return `${n} ${n === 1 ? "Medikament" : "Medikamente"}`;
      }
      case "family": {
        const n = familyEntries.length;
        return `${n} ${n === 1 ? "Eintrag" : "Einträge"}`;
      }
      case "medicalhistory": {
        const n = medicalEntries.length;
        return `${n} ${n === 1 ? "Eintrag" : "Einträge"}`;
      }
      default:
        return item.subtitle;
    }
  };

  const handleLogout = async () => {
    const performLogout = async () => {
      try {
        if (Platform.OS === "web") {
          localStorage.removeItem("userToken");
          localStorage.removeItem("tokenExpiration");
        } else {
          await SecureStore.deleteItemAsync("userToken");
          await SecureStore.deleteItemAsync("tokenExpiration");
        }
        // Zurück zum Login und den Verlauf löschen
        router.replace("/(auth)/login");
      } catch (error) {
        console.error("Logout fehlgeschlagen", error);
      }
    };

    // Bestätigungs-Dialog (im Web als einfaches confirm)
    if (Platform.OS === "web") {
      if (confirm("Möchten Sie sich wirklich abmelden?")) {
        await performLogout();
      }
    } else {
      Alert.alert("Abmelden", "Möchten Sie sich wirklich abmelden?", [
        { text: "Abbrechen", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: performLogout },
      ]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <HeaderView
        title="Ihre Gesundheitsdaten"
        subtitle="Übersicht Ihrer eingetragenen Daten"
      />
      <View style={styles.content}>
        {MENU_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            onPress={() => router.push(item.route)}
          >
            <Card style={styles.cardRow}>
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: theme.background },
                ]}
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  size={24}
                  color={theme.primary}
                />
              </View>
              <View style={styles.textContainer}>
                <ThemedText>{item.title}</ThemedText>
                <ThemedText type="smallText">{getSubtitle(item)}</ThemedText>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={theme.primary}
              />
            </Card>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.7}
          onPress={handleLogout}
        >
          <Card
            style={[
              styles.cardRow,
              styles.logoutCard,
              { borderColor: theme.closeBgColor },
            ]}
          >
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: theme.closeBgColor },
              ]}
            >
              <MaterialCommunityIcons
                name="logout"
                size={22}
                color={theme.closeIconColor}
              />
            </View>
            <View style={styles.textContainer}>
              <ThemedText
                style={{ color: theme.closeIconColor, fontWeight: "bold" }}
              >
                Abmelden
              </ThemedText>
              <ThemedText type="smallText">Sitzung beenden</ThemedText>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Data;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    marginTop: 10,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    flexShrink: 0,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  logoutCard: {
    borderWidth: 1,
    marginTop: 8,
  },
  logoutButton: { marginTop: 20 },
});