import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { Card } from "@/components/ui/card";
import { CATEGORY_LABELS, EmergencyTextColors } from "@/constants/emergency";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  EmergencyCategorySetting,
  EmergencyDataCategory,
} from "@/types/emergency-type";

interface CategoryMatrixProps {
  categories: EmergencyCategorySetting[];
  onToggle: (
    category: EmergencyDataCategory,
    column: "emergency" | "treatment",
  ) => void;
}

interface CheckCellProps {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onPress: () => void;
}

function CheckCell({ checked, disabled, label, onPress }: CheckCellProps) {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <Pressable
      style={styles.cell}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={label}
      hitSlop={6}
    >
      <MaterialCommunityIcons
        name={
          disabled
            ? "minus-box-outline"
            : checked
              ? "checkbox-marked"
              : "checkbox-blank-outline"
        }
        size={26}
        color={disabled ? theme.tabIconDefault : theme.primary}
      />
    </Pressable>
  );
}

// Rows are data categories, columns are the two code types
export function CategoryMatrix({ categories, onToggle }: CategoryMatrixProps) {
  const colorScheme = useColorScheme() ?? "light";
  const textColors = EmergencyTextColors[colorScheme];
  const core = categories.filter((row) => !row.isExtended);
  const extended = categories.filter((row) => row.isExtended);

  const renderRows = (rows: EmergencyCategorySetting[]) =>
    rows.map((row) => (
      <View key={row.category} style={styles.row}>
        <ThemedText style={styles.label}>
          {CATEGORY_LABELS[row.category]}
        </ThemedText>
        <CheckCell
          checked={row.emergency}
          disabled={row.isExtended}
          label={`${CATEGORY_LABELS[row.category]} im Notfallcode`}
          onPress={() => onToggle(row.category, "emergency")}
        />
        <CheckCell
          checked={row.treatment}
          label={`${CATEGORY_LABELS[row.category]} im Behandlungscode`}
          onPress={() => onToggle(row.category, "treatment")}
        />
      </View>
    ));

  return (
    <Card style={styles.card}>
      <View style={[styles.row, styles.head]}>
        <ThemedText type="smallText" style={styles.headText}>
          KERNDATEN
        </ThemedText>
        <ThemedText
          type="smallText"
          style={[
            styles.headText,
            styles.cellText,
            { color: textColors.emergency },
          ]}
          accessibilityLabel="Notfallcode"
        >
          Notfall
        </ThemedText>
        <ThemedText
          type="smallText"
          style={[
            styles.headText,
            styles.cellText,
            { color: textColors.treatment },
          ]}
          accessibilityLabel="Behandlungscode"
        >
          Behandlung
        </ThemedText>
      </View>
      {renderRows(core)}
      <View style={[styles.row, styles.head]}>
        <ThemedText type="smallText" style={styles.headText}>
          ERWEITERT
        </ThemedText>
      </View>
      {renderRows(extended)}
      <ThemedText type="smallText" style={styles.footnote}>
        Erweiterte Daten zeigt nur der Behandlungscode. Der Notfallcode bleibt
        immer auf die Kerndaten beschränkt.
      </ThemedText>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 0,
    paddingVertical: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 48,
  },
  head: {
    minHeight: 36,
    paddingTop: 12,
  },
  headText: {
    flex: 1,
    fontWeight: "700",
    letterSpacing: 0.5,
    opacity: 0.85,
  },
  cellText: {
    flex: 0,
    width: 84,
    textAlign: "center",
  },
  label: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
  },
  cell: {
    width: 84,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  footnote: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 12,
    opacity: 0.85,
  },
});
