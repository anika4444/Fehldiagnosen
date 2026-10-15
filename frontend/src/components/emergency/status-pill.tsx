import { StyleSheet, Text, View } from "react-native";

interface StatusPillProps {
  label: string;
  color: string;
  backgroundColor: string;
}

export function StatusPill({ label, color, backgroundColor }: StatusPillProps) {
  return (
    <View style={[styles.pill, { backgroundColor }]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 13,
    fontWeight: "700",
  },
});
