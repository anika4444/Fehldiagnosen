import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { Card } from "@/components/ui/card";
import { HeaderView } from "@/components/ui/header-view";
import { Colors } from "@/constants/theme";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useDiagnosis } from "@/hooks/use-diagnosis";
import { useHealthTip } from "@/hooks/use-health-tip";
import { useMedications } from "@/hooks/use-medications";
import { usePatient } from "@/hooks/use-patient";
import { useSymptoms } from "@/hooks/use-symptoms";

type ThemeColors = (typeof Colors)["light"];

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  theme: ThemeColors;
  onPress: () => void;
}

const StatCard = ({ icon, value, label, onPress }: StatCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Pressable
      style={styles.statCardWrapper}
      onPress={onPress}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
    >
      <Card
        variant="filled"
        style={[styles.statCard, hovered && styles.statCardHover]}
      >
        <View style={styles.statIconContainer}>{icon}</View>
        <ThemedText type="title" style={styles.statValue}>
          {value}
        </ThemedText>
        <ThemedText type="smallText" style={styles.statLabel}>
          {label}
        </ThemedText>
      </Card>
    </Pressable>
  );
};

const Dashboard = () => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const router = useRouter();

  const { patientId } = usePatient();
  const { firstName } = useCurrentUser();
  const { tip, isLoading, error } = useHealthTip();

  // Datum stabil halten, damit useSymptoms nicht in einer Endlosschleife lädt
  const today = useMemo(() => new Date(), []);

  const { symptoms } = useSymptoms(patientId, today);
  const { medications } = useMedications(patientId);
  const { entries: diagnoses } = useDiagnosis(patientId);

  const greeting = firstName ? `Willkommen, ${firstName}!` : "Willkommen zurück!";
  const initials = firstName ? firstName.trim().charAt(0).toUpperCase() : "?";

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <HeaderView
        title={greeting}
        subtitle="Ihr Gesundheits-Dashboard"
        rightElement={
          <Pressable
            onPress={() => router.push("/(tabs)/data" as any)}
            style={({ pressed }) => [
              styles.avatar,
              pressed && { opacity: 0.7 },
            ]}
          >
            <ThemedText
              colorName="textwithbackground"
              style={styles.avatarText}
            >
              {initials}
            </ThemedText>
          </Pressable>
        }
      />

      <View style={styles.content}>
        <Card variant="filled">
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <AntDesign name="info-circle" size={24} color={theme.primary} />
            </View>
            <View style={styles.textContainer}>
              <ThemedText type="defaultSemiBold">
                Gesundheitstipp des Tages
              </ThemedText>
              <ThemedText type="smallText" style={styles.subtitleText}>
                {tip ||
                  (isLoading
                    ? "Lädt Gesundheitstipp..."
                    : error
                      ? "Fehler beim Laden des Tipps."
                      : "Kein Tipp verfügbar.")}
              </ThemedText>
            </View>
          </View>
        </Card>

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Übersicht
        </ThemedText>

        <View style={styles.statsGrid}>
          <StatCard
            theme={theme}
            value={symptoms.length}
            label="Symptome heute"
            icon={<Ionicons name="pulse" size={24} color={theme.primary} />}
            onPress={() => router.push("/(tabs)/symptom" as any)}
          />
          <StatCard
            theme={theme}
            value={medications.length}
            label="Medikamente"
            icon={
              <MaterialCommunityIcons
                name="pill"
                size={24}
                color={theme.primary}
              />
            }
            onPress={() => router.push("/medications" as any)}
          />
          <StatCard
            theme={theme}
            value={diagnoses.length}
            label="Diagnosen"
            icon={
              <MaterialCommunityIcons
                name="stethoscope"
                size={24}
                color={theme.primary}
              />
            }
            onPress={() => router.push("/diagnosis" as any)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  sectionTitle: {
    marginTop: 8,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    marginRight: 20,
    backgroundColor: "rgba(0, 150, 136, 0.15)",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  subtitleText: {
    marginTop: 4,
    opacity: 0.8,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "700",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCardWrapper: {
    width: "31%",
  },
  statCard: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 16,
  },
  statCardHover: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
    transform: [{ translateY: -2 }],
  },
  statIconContainer: {
    backgroundColor: "rgba(0, 150, 136, 0.15)",
    padding: 10,
    borderRadius: 12,
    marginBottom: 8,
  },
  statValue: {
    lineHeight: 34,
  },
  statLabel: {
    opacity: 0.8,
    marginTop: 2,
    textAlign: "center",
  },
});