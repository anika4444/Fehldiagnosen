import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  SymptomDefinitionResult,
  symptomDefinitionService,
} from "@/api/symptomDefinitionService";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  errorText?: string;
}

export function SymptomAutocomplete({ value, onChangeText, errorText }: Props) {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const hasError = !!errorText;

  const [suggestions, setSuggestions] = useState<SymptomDefinitionResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChangeText = async (text: string) => {
    onChangeText(text);

    if (text.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    try {
      const results = await symptomDefinitionService.search(text);
      setSuggestions(results || []);
      setShowSuggestions(results && results.length > 0);
    } catch {
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (symptom: SymptomDefinitionResult) => {
    onChangeText(symptom.name);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>
        Symptomname{" "}
        <ThemedText style={[styles.required, { color: theme.closeIconColor }]}>
          *
        </ThemedText>
      </ThemedText>

      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            {
              color: theme.text,
              backgroundColor: theme.background,
            },
            hasError && { borderColor: theme.closeIconColor, borderWidth: 1.5 },
          ]}
          value={value}
          onChangeText={handleChangeText}
          placeholder="z.B. Kopfschmerzen"
          placeholderTextColor={theme.text + "80"}
        />
        {isLoading && (
          <ActivityIndicator
            size="small"
            color={theme.primary}
            style={styles.loadingIndicator}
          />
        )}
      </View>

      {errorText && (
        <ThemedText style={[styles.error, { color: theme.closeIconColor }]}>
          {errorText}
        </ThemedText>
      )}

      {showSuggestions && (
        <View style={[styles.dropdown, { backgroundColor: theme.background }]}>
          <ScrollView keyboardShouldPersistTaps="handled">
            {suggestions.map((item, index) => (
              <View key={item.id.toString()}>
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => handleSelect(item)}
                >
                  <ThemedText style={styles.suggestionName}>
                    {item.name}
                  </ThemedText>
                </TouchableOpacity>
                {index < suggestions.length - 1 && (
                  <View
                    style={[
                      styles.separator,
                      { borderColor: theme.surface + "50" },
                    ]}
                  />
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    zIndex: 9999,
    position: "relative",
  },
  label: { fontSize: 14, marginBottom: 8, fontWeight: "500" },
  required: { fontWeight: "bold" },
  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    paddingRight: 40,
    fontSize: 15,
  },
  loadingIndicator: {
    position: "absolute",
    right: 12,
  },
  error: { fontSize: 12, marginTop: 4 },
  dropdown: {
    position: "absolute",
    top: 76,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 12, // Angepasst auf 12
    maxHeight: 180,
    zIndex: 9999,
    elevation: 5,
  },
  suggestionItem: { padding: 12 },
  suggestionName: { fontSize: 15, fontWeight: "500" },
  separator: { borderBottomWidth: 1 },
});
