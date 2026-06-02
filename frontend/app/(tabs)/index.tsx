import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useHealthTip } from "@/hooks/use-health-tip";
import { useMedicalHistory } from "@/hooks/use-medical-history";
import { useMedications } from "@/hooks/use-medications";
import { usePatient } from "@/hooks/use-patient";
import { useSymptoms } from "@/hooks/use-symptoms";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 11) return "Guten Morgen";
  if (hour < 17) return "Guten Tag";
  return "Guten Abend";
};

const Dashboard = () => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  const { tip, isLoading: tipLoading, error } = useHealthTip();
  const { patientId, patient, isLoading: patientLoading } = usePatient();

  // today einmalig erzeugen, sonst lädt useSymptoms in einer Endlosschleife
  const today = useMemo(() => new Date(), []);

  const { medications } = useMedications(patientId);
  const { symptoms } = useSymptoms(patientId, today);
  const { entries } = useMedicalHistory(patientId);

  const firstName = patient?.firstName ?? "";
  const initial = firstName ? firstName.charAt(0).toUpperCase() : "?";

  const stats = [
    {
      icon: "medkit-outline" as const,
      value: medications.length,
      label: "Medikamente",
    },
    {
      icon: "pulse-outline" as const,
      value: symptoms.length,
      label: "Symptome heute",
    },
    {
      icon: "document-text-outline" as const,
      value: entries.length,
      label: "Diagnosen",
    },
  ];

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={{ paddingHorizontal: 0, paddingTop: 0 }}
    >
      <View
        style={[
          styles.hero,
          {
            backgroundColor: theme.primary,
            paddingTop: insets.top > 0 ? insets.top + 24 : 48,
          },
        ]}
      >
        <View style={styles.heroRow}>
          <View style={styles.heroTextBlock}>
            <ThemedText colorName="textwithbackground" style={styles.greeting}>
              {getGreeting()},
            </ThemedText>
            <ThemedText colorName="textwithbackground" style={styles.name}>
              {patientLoading ? "..." : firstName || "Willkommen"}
            </ThemedText>
            <ThemedText colorName="textwithbackground" style={styles.subline}>
              Willkommen im Gesundheits-Dashboard!
            </ThemedText>
          </View>

          <View style={[styles.avatar, { backgroundColor: theme.accent }]}>
            <ThemedText style={styles.avatarText}>{initial}</ThemedText>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.statsRow}>
          {stats.map((stat) => (
            <View
              key={stat.label}
              style={[styles.statCard, { backgroundColor: theme.surface }]}
            >
              <Ionicons name={stat.icon} size={24} color={theme.primary} />
              <ThemedText style={[styles.statValue, { color: theme.text }]}>
                {stat.value}
              </ThemedText>
              <ThemedText style={[styles.statLabel, { color: theme.text }]}>
                {stat.label}
              </ThemedText>
            </View>
          ))}
        </View>

        <View
          style={[
            styles.tipCard,
            { backgroundColor: theme.surface, shadowColor: theme.primary },
          ]}
        >
          <View style={styles.tipRow}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: theme.background },
              ]}
            >
              <Ionicons name="bulb-outline" size={28} color={theme.primary} />
            </View>
            <View style={styles.tipTextContainer}>
              <ThemedText type="defaultSemiBold" style={{ color: theme.text }}>
                Gesundheitstipp des Tages
              </ThemedText>
              <ThemedText type="smallText" style={styles.tipText}>
                {tip ||
                  (tipLoading
                    ? "Lädt Gesundheitstipp..."
                    : error
                      ? "Fehler beim Laden des Tipps."
                      : "Kein Tipp verfügbar.")}
              </ThemedText>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: 28,
    paddingBottom: 44,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 10,
  },
  heroRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroTextBlock: {
    flex: 1,
    paddingRight: 16,
  },
  greeting: {
    fontSize: 19,
    opacity: 0.9,
  },
  name: {
    fontSize: 42,
    lineHeight: 48,
    fontWeight: "800",
    marginTop: 10,
  },
  subline: {
    fontSize: 15,
    opacity: 0.85,
    marginTop: 14,
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
  avatarText: {
    fontSize: 34,
    fontWeight: "800",
    color: "#fff",
  },
  content: {
    padding: 24,
    marginTop: 10,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "800",
    marginTop: 6,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.8,
    marginTop: 2,
    textAlign: "center",
  },
  tipCard: {
    borderRadius: 24,
    padding: 26,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  tipRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    marginRight: 18,
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  tipTextContainer: {
    flex: 1,
  },
  tipText: {
    marginTop: 8,
    fontSize: 15,
    opacity: 0.85,
    lineHeight: 22,
  },
});