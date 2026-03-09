import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/build/Octicons";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="symptom"
        options={{
          title: "Symptome",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="data"
        options={{
          title: "Daten",
          tabBarIcon: ({ color }) => (
            <Octicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
