import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { Card } from "@/components/ui/card";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>["name"];

interface MenuRowProps {
  icon: IconName;
  title: string;
  subtitle: string;
  onPress: () => void;
  iconColor?: string;
  iconBackground?: string;
  badge?: number;
  subtitleColor?: string;
}

// Same look as the menu entries on the data tab
export function MenuRow({
  icon,
  title,
  subtitle,
  onPress,
  iconColor,
  iconBackground,
  badge,
  subtitleColor,
}: MenuRowProps) {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      accessibilityRole="button"
    >
      <Card style={styles.row}>
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: iconBackground ?? theme.background },
          ]}
        >
          <MaterialCommunityIcons
            name={icon}
            size={22}
            color={iconColor ?? theme.primary}
          />
        </View>
        <View style={styles.text}>
          <ThemedText type="defaultSemiBold">{title}</ThemedText>
          <ThemedText
            type="smallText"
            style={
              subtitleColor
                ? { color: subtitleColor, fontWeight: "600" }
                : undefined
            }
          >
            {subtitle}
          </ThemedText>
        </View>
        {badge ? (
          <View style={styles.badge}>
            <ThemedText style={styles.badgeText}>{badge}</ThemedText>
          </View>
        ) : (
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={theme.primary}
          />
        )}
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    flex: 1,
  },
  badge: {
    minWidth: 26,
    height: 26,
    borderRadius: 13,
    paddingHorizontal: 6,
    backgroundColor: "#B91C1C",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
});
