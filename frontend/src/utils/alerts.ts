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
  // Alert.alert macht in react-native-web nichts, Fehler würden im Browser sonst verschluckt
  if (Platform.OS === "web") {
    window.alert(`Fehler\n\n${message}`);
  } else {
    Alert.alert("Fehler", message);
  }
};

export const confirmActionDialog = (
  title: string,
  message: string,
  confirmLabel: string,
  onConfirm: () => void,
) => {
  if (Platform.OS === "web") {
    if (window.confirm(`${title}\n\n${message}`)) {
      onConfirm();
    }
  } else {
    Alert.alert(title, message, [
      { text: "Abbrechen", style: "cancel" },
      { text: confirmLabel, style: "destructive", onPress: onConfirm },
    ]);
  }
};
