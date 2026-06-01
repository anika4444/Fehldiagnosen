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
    route: "/medications" as Href,
  },
  {
    id: "family",
    title: "Familienanamnese",
    subtitle: "1 Eintrag",
    icon: "account-group-outline",
    route: "/familyhistory" as Href,
  },
  {
    id: "diagnosis",
    title: "Diagnosen",
    subtitle: "Meine Diagnosen",
    icon: "stethoscope",
    route: "/diagnosis" as Href,
  },
  {
    id: "medicalhistory",
    title: "Medizinische Vorgeschichte",
    subtitle: "3 Einträge",
    icon: "history",
    route: "/medicalhistory" as Href,
  },
  {
    id: "communication",
    title: "Kommunikationstool",
    subtitle: "Kommunikationslevel einstellen",
    icon: "message-text-outline",
    route: "/communicationlevel" as Href,
  },
];
