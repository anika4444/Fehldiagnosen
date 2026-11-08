import {
  StyleSheet,
  TextInput,
  TextInputProps,
  useColorScheme,
  View,
} from "react-native";

import { Colors } from "@/constants/theme";

import { ThemedText } from "../themed-text";

interface FormInputProps extends TextInputProps {
  label: string;
  isRequired?: boolean;
  errorText?: string | boolean;
}

export function FormInput({
  label,
  isRequired = false,
  errorText,
  style,
  ...props
}: FormInputProps) {
  const theme = Colors[useColorScheme() ?? "light"];
  const hasError = !!errorText;

  return (
    <View style={styles.inputGroup}>
      <ThemedText style={styles.label}>
        {label}{" "}
        {isRequired && (
          <ThemedText
            style={[styles.requiredAsterisk, { color: theme.closeIconColor }]}
          >
            *
          </ThemedText>
        )}
      </ThemedText>
      <TextInput
        style={[
          styles.input,
          { color: theme.text, backgroundColor: theme.background },
          hasError && { borderColor: theme.closeIconColor, borderWidth: 1.5 },
          style,
        ]}
        placeholderTextColor={theme.tabIconDefault}
        {...props}
      />
      {typeof errorText === "string" && (
        <ThemedText style={[styles.errorText, { color: theme.closeIconColor }]}>
          {errorText}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  requiredAsterisk: {
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
});
