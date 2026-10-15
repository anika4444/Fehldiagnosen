import { StyleSheet, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

import { EmergencyColors } from "@/constants/emergency";

interface QrCodeBoxProps {
  value: string;
  size: number;
  // Read out by screen readers, says which code this is
  label: string;
}

// White quiet zone around the code, scanners need it also in dark mode
export function QrCodeBox({ value, size, label }: QrCodeBoxProps) {
  return (
    <View
      style={styles.box}
      accessibilityRole="image"
      accessibilityLabel={label}
    >
      <QRCode
        value={value}
        size={size}
        color={EmergencyColors.qrInk}
        backgroundColor="#FFFFFF"
        ecl="M"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#DCE7E2",
    alignSelf: "center",
  },
});
