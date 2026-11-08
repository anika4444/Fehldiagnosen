import { ActivityIndicator, View } from "react-native";

import { ThemedText } from "../themed-text";

interface DataListProps<T> {
  data: T[];
  isLoading: boolean;
  error: string | null;
  emptyMessage: string;
  themeColor: string;
  renderItem: (item: T) => React.ReactNode;
}

export const DataList = <T,>({
  data,
  isLoading,
  error,
  emptyMessage,
  themeColor,
  renderItem,
}: DataListProps<T>) => {
  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color={themeColor}
        style={{ marginTop: 20 }}
      />
    );
  }

  if (error) {
    return (
      <ThemedText style={{ color: "red", marginTop: 20 }}>{error}</ThemedText>
    );
  }

  if (data.length === 0) {
    return <ThemedText style={{ marginTop: 20 }}>{emptyMessage}</ThemedText>;
  }

  return (
    <View style={{ marginTop: 10 }}>
      {/* Hier rufen wir einfach die übergebene render-Funktion für jedes Element auf */}
      {data.map((item) => renderItem(item))}
    </View>
  );
};
