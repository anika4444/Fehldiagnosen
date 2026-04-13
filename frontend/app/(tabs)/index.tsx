import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, useColorScheme, View } from "react-native";

import { Card } from "@/components/ui/card";
import { HeaderView } from "@/components/ui/header-view";
import { ThemedText } from "@/components/ui/themed-text";
import { Colors } from "@/constants/theme";

const Dashboard = () => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <HeaderView
        title="Willkommen zurück!"
        subtitle="Ihr Gesundheits-Dashboard"
      />
      <View style={styles.content}>
        <Card style={[styles.mainCard, { borderColor: theme.surface }]}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Heutige Zusammenfassung
          </ThemedText>
          <Card variant="filled" style={styles.innerCard}>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="clipboard-text-outline"
                  size={24}
                  color={theme.primary}
                />
              </View>
              <View style={styles.textContainer}>
                <ThemedText type="defaultSemiBold">Symptome heute</ThemedText>
                <ThemedText type="smallText" style={styles.subtitleText}>
                  Keine Symptome gemeldet
                </ThemedText>
              </View>
            </View>
          </Card>
        </Card>
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
                Trinken Sie ausreichend Wasser, um hydratisiert zu bleiben!
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
