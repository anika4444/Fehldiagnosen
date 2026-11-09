import * as MediaLibrary from "expo-media-library";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  PixelRatio,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { captureRef, releaseCapture } from "react-native-view-shot";

import { LockScreenCanvas } from "@/components/emergency/lock-screen-canvas";
import { ThemedText } from "@/components/themed-text";
import { Card } from "@/components/ui/card";
import { HeaderView } from "@/components/ui/header-view";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useEmergencyAccess } from "@/hooks/use-emergency-access";
import { usePatient } from "@/hooks/use-patient";
import { showErrorAlert, showSuccessAlert } from "@/utils/alerts";
import { goBackOr } from "@/utils/navigation";

interface Background {
  color: string;
  name: string;
}

// Dark, calm grounds so the white QR card stands out on every phone
const BACKGROUNDS: Background[] = [
  { color: "#123329", name: "Dunkelgrün" },
  { color: "#1F2937", name: "Anthrazit" },
  { color: "#3B2F2A", name: "Dunkelbraun" },
  { color: "#0F2747", name: "Dunkelblau" },
];

const STEPS = Platform.select({
  ios: [
    "Fotos öffnen und das gespeicherte Bild wählen.",
    "Teilen und dann Als Hintergrundbild verwenden tippen.",
    "Nur für den Sperrbildschirm festlegen.",
  ],
  default: [
    "Galerie öffnen und das gespeicherte Bild wählen.",
    "Menü und dann Als Hintergrund festlegen tippen.",
    "Sperrbildschirm wählen.",
  ],
});

export default function EmergencyLockscreen() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const { patientId } = usePatient();
  // Same check as on the main screen: only a code that is active on the server may become a wallpaper
  const { overview, codes, isLoading, error, refresh } =
    useEmergencyAccess(patientId);

  const canvasRef = useRef<View>(null);
  const [background, setBackground] = useState(BACKGROUNDS[0]);
  const [isSaving, setIsSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  const code = codes?.Emergency;

  // Preview keeps the aspect ratio of this phone so the saved picture fits the lock screen
  const screen = Dimensions.get("screen");
  const previewWidth = Math.min(Dimensions.get("window").width - 80, 300);
  const previewHeight = Math.round(
    previewWidth * (screen.height / screen.width),
  );

  const handleSave = async () => {
    if (Platform.OS === "web") {
      showErrorAlert(
        "Im Browser kann kein Sperrbild gespeichert werden. Bitte die App auf dem Handy verwenden.",
      );
      return;
    }

    setIsSaving(true);
    let uri: string | null = null;

    try {
      const permission = await MediaLibrary.requestPermissionsAsync(true);
      if (!permission.granted) {
        showErrorAlert(
          "Ohne Zugriff auf die Fotos kann das Bild nicht gespeichert werden.",
        );
        return;
      }

      // iOS counts width and height in points and multiplies by the screen scale itself,
      // Android expects pixels. Without this the iOS picture would be nine times too large.
      const scale = Platform.OS === "ios" ? 1 : PixelRatio.get();

      uri = await captureRef(canvasRef, {
        format: "png",
        quality: 1,
        result: "tmpfile",
        width: Math.round(screen.width * scale),
        height: Math.round(screen.height * scale),
      });

      await MediaLibrary.saveToLibraryAsync(uri);
      showSuccessAlert("Das Bild liegt jetzt in Ihren Fotos.");
    } catch {
      showErrorAlert(
        "Speichern hat nicht geklappt. Sie können alternativ einen Screenshot dieser Vorschau machen.",
      );
    } finally {
      if (uri) releaseCapture(uri);
      setIsSaving(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <HeaderView
        title="Sperrbild"
        subtitle="QR-Code als Hintergrundbild"
        onBackPress={() => goBackOr("/emergency")}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {isLoading && !overview && (
          <ActivityIndicator color={theme.primary} style={{ marginTop: 24 }} />
        )}

        {error && (
          <Card style={styles.gap}>
            <ThemedText>{error}</ThemedText>
            <PrimaryButton title="Erneut versuchen" onPress={refresh} />
          </Card>
        )}

        {overview && !code?.local && (
          <Card style={styles.gap}>
            <ThemedText>
              Auf diesem Gerät ist kein gültiger Notfallcode gespeichert. Bitte
              erstellen Sie zuerst einen Notfallcode.
            </ThemedText>
            <PrimaryButton
              title="Zum Notfallzugang"
              onPress={() => goBackOr("/emergency")}
            />
          </Card>
        )}

        {overview && code?.local && code.accessUrl && (
          <>
            <ThemedText type="smallText" style={styles.intro}>
              Auf dem Sperrbild stehen nur QR-Code und Notfall-ID. Medikation
              und Warnhinweise sieht erst, wer den Code scannt. Der
              Behandlungscode kommt nie aufs Sperrbild.
            </ThemedText>

            <View style={styles.previewFrame}>
              <LockScreenCanvas
                ref={canvasRef}
                accessUrl={code.accessUrl}
                publicId={code.local.publicId}
                portalBaseUrl={overview.portalBaseUrl}
                width={previewWidth}
                height={previewHeight}
                background={background.color}
              />
            </View>

            <View style={styles.swatches} accessibilityRole="radiogroup">
              {BACKGROUNDS.map((option) => (
                <TouchableOpacity
                  key={option.color}
                  onPress={() => setBackground(option)}
                  style={[
                    styles.swatch,
                    { backgroundColor: option.color },
                    background.color === option.color && {
                      borderColor: theme.primary,
                      borderWidth: 3,
                    },
                  ]}
                  accessibilityRole="radio"
                  accessibilityState={{
                    selected: background.color === option.color,
                  }}
                  accessibilityLabel={`Hintergrund ${option.name}`}
                />
              ))}
            </View>

            <PrimaryButton
              title="In Fotos speichern"
              icon="download"
              onPress={handleSave}
              isLoading={isSaving}
              isLoadingText="Wird gespeichert..."
            />

            <Card style={styles.gap}>
              <ThemedText type="defaultSemiBold">
                Als Sperrbild festlegen
              </ThemedText>
              {STEPS.map((step, index) => (
                <ThemedText key={step} type="smallText">
                  {index + 1}. {step}
                </ThemedText>
              ))}
              <ThemedText type="smallText" style={{ opacity: 0.8 }}>
                Apps dürfen das Sperrbild nicht selbst setzen, deshalb dieser
                kurze Umweg. Wenn Sie den Notfallcode neu erzeugen, müssen Sie
                auch das Sperrbild neu erstellen.
              </ThemedText>
              <ThemedText type="smallText" style={{ opacity: 0.8 }}>
                Das Bild enthält einen dauerhaft gültigen Zugang. Wenn Ihre
                Fotos in eine Cloud oder geteilte Alben synchronisiert werden,
                landet er dort ebenfalls. Erzeugen Sie den Notfallcode bei
                Bedarf neu.
              </ThemedText>
            </Card>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 48,
    gap: 16,
  },
  gap: {
    gap: 10,
  },
  intro: {
    opacity: 0.9,
  },
  previewFrame: {
    alignSelf: "center",
    borderRadius: 28,
    overflow: "hidden",
    borderWidth: 6,
    borderColor: "#111827",
  },
  swatches: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 14,
  },
  swatch: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#DCE7E2",
  },
});
