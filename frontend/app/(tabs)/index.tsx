import { AntDesign } from "@expo/vector-icons";
import { ScrollView, StyleSheet, useColorScheme, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { Card } from "@/components/ui/card";
import { HeaderView } from "@/components/ui/header-view";
import { Colors } from "@/constants/theme";
import { useHealthTip } from "@/hooks/use-health-tip";

const Dashboard = () => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const { tip, isLoading, error } = useHealthTip();

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <HeaderView
        title="Willkommen zurück!"
        subtitle="Ihr Gesundheits-Dashboard"
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
    marginBottom: 20,
  },
  mainCard: {
    marginBottom: 24,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 4,
  },
  innerCard: {
    marginBottom: 0,
    paddingVertical: 16,
    paddingHorizontal: 16,
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
});
