import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";

import { Card } from "@/components/card";
import { HeaderView } from "@/components/header-view";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { MENU_ITEMS } from "@/types/navigation-type";

import { useRouter } from ".expo/types/router";

const Data = () => {
  const router = useRouter();

  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

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
                <ThemedText type="smallText">{item.subtitle}</ThemedText>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={theme.primary}
              />
            </Card>
          </TouchableOpacity>
        ))}
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
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
