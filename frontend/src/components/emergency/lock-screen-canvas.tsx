import { forwardRef } from "react";
import { StyleSheet, Text, View } from "react-native";

import { QrCodeBox } from "@/components/emergency/qr-code-box";
import { EmergencyColors } from "@/constants/emergency";

interface LockScreenCanvasProps {
  accessUrl: string;
  publicId: string;
  portalBaseUrl: string;
  width: number;
  height: number;
  background: string;
}

// The picture that becomes the lock screen wallpaper. Only QR and emergency id on purpose:
// anybody who picks up the phone can see it, the health data stays behind the scan.
export const LockScreenCanvas = forwardRef<View, LockScreenCanvasProps>(
  function LockScreenCanvas(
    { accessUrl, publicId, portalBaseUrl, width, height, background },
    ref,
  ) {
    const portalHost = portalBaseUrl.replace(/^https?:\/\//, "");

    return (
      <View
        ref={ref}
        collapsable={false}
        style={[styles.canvas, { width, height, backgroundColor: background }]}
      >
        {/* Upper half stays free for the clock of the lock screen */}
        <View style={styles.spacer} />

        <View style={styles.card}>
          <QrCodeBox
            value={accessUrl}
            size={Math.round(width * 0.3)}
            label="QR-Code Notfallcode"
          />
          <View style={styles.info}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>NOTFALL</Text>
            </View>
            <Text style={styles.headline}>
              QR-Code scannen für Medikation und Warnhinweise
            </Text>
            <Text style={styles.id}>
              ID {`${publicId.slice(0, 4)} ${publicId.slice(4)}`}
            </Text>
            <Text style={styles.host} numberOfLines={1}>
              {portalHost}
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Weitere Angaben ohne Entsperren über den Notfallknopf
        </Text>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  canvas: {
    paddingHorizontal: 20,
    paddingBottom: 48,
    justifyContent: "flex-end",
  },
  spacer: {
    flex: 1,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 12,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  tag: {
    alignSelf: "flex-start",
    backgroundColor: EmergencyColors.emergency,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },
  headline: {
    color: EmergencyColors.qrInk,
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 18,
  },
  id: {
    color: EmergencyColors.qrInk,
    fontSize: 14,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
  },
  host: {
    color: EmergencyColors.neutral,
    fontSize: 11,
  },
  footer: {
    marginTop: 12,
    color: "#F3F7F5",
    fontSize: 12,
    textAlign: "center",
    opacity: 0.85,
  },
});
