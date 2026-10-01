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
    subtitle: "Meine Medikamente",
    icon: "pill",
    route: "/medications" as Href,
  },
  {
    id: "family",
    title: "Familienanamnese",
    subtitle: "Meine Familienanamnese",
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
    id: "communication",
    title: "Kommunikationstool",
    subtitle: "Kommunikationslevel einstellen",
    icon: "message-text-outline",
    route: "/communicationlevel" as Href,
  },
  {
    id: "checkup",
    title: "Digitaler Checkup",
    subtitle: "KI-Zusammenfassung Ihrer Daten",
    icon: "heart-pulse",
    route: "/checkup" as Href,
  },
];
