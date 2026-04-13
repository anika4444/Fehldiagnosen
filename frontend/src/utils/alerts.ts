import { Alert, Platform } from "react-native";

export const confirmDeleteDialog = (onConfirm: () => void) => {
  if (Platform.OS === "web") {
    if (window.confirm("Möchten Sie diesen Eintrag wirklich löschen?")) {
      onConfirm();
    }
  } else {
    Alert.alert("Löschen", "Möchten Sie diesen Eintrag wirklich entfernen?", [
      { text: "Abbrechen", style: "cancel" },
      { text: "Löschen", style: "destructive", onPress: onConfirm },
    ]);
  }
};

export const showSuccessAlert = (message: string) => {
  if (Platform.OS !== "web") {
    Alert.alert("Erfolg", message);
  }
};

export const showErrorAlert = (message: string) => {
  Alert.alert("Fehler", message);
};
