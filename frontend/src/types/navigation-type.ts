import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Href } from "expo-router";

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>["name"];

export interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  icon: IconName;
  route: Href;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "meds",
    title: "Aktuelle Medikamente",
    subtitle: "2 Medikamente",
    icon: "pill",
    route: "/meds",
  },
  {
    id: "family",
    title: "Familienanamnsese",
    subtitle: "1 Eintrag",
    icon: "account-group-outline",
    route: "/familyanamnese",
  },
  {
    id: "medicalhistory",
    title: "Medizinische Vorgeschichte",
    subtitle: "3 Einträge",
    icon: "history",
    route: "/medicalhistory",
  },
];
