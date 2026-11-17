import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

import { Colors } from "@/constants/theme";

export default function AuthLayout() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.primary,
        headerTitleStyle: { fontWeight: "bold" },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="login"
        options={{ title: "Anmelden", headerShown: false }}
      />
      <Stack.Screen
        name="register"
        options={{ title: "Registrieren", headerShown: true }}
      />
    </Stack>
  );
}
