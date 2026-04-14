import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  KnownMedicationResult,
  knownMedicationService,
} from "@/api/knownMedicationService";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSelect: (medication: KnownMedicationResult) => void;
  onValidChange?: (isValid: boolean) => void;
  errorText?: string;
}

export function MedicationAutocomplete({
  value,
  onChangeText,
  onSelect,
  onValidChange,
  errorText,
}: Props) {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const [suggestions, setSuggestions] = useState<KnownMedicationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleChangeText = async (text: string) => {
    onChangeText(text);
    setIsValid(false);
    onValidChange?.(false);

    if (text.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    const results = await knownMedicationService.search(text);
    setSuggestions(results);
    setShowSuggestions(results.length > 0);
    setIsLoading(false);
  };

  const handleSelect = (medication: KnownMedicationResult) => {
    onSelect(medication);
    setSuggestions([]);
    setIsValid(true);
    onValidChange?.(true);
    setShowSuggestions(false);
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>
        Medikamentenname <ThemedText style={styles.required}>*</ThemedText>
      </ThemedText>

      <TextInput
        style={[
          styles.input,
          {
            borderColor: theme.primary,
            color: theme.text,
            backgroundColor: theme.background,
          },
        ]}
        value={value}
        onChangeText={handleChangeText}
        placeholder="z.B. Aspirin"
        placeholderTextColor={theme.text + "80"}
      />

      {errorText && <ThemedText style={styles.error}>{errorText}</ThemedText>}

      {isLoading && <ActivityIndicator size="small" color={theme.primary} />}

      {showSuggestions && (
        <View
          style={[
            styles.dropdown,
            { backgroundColor: theme.background, borderColor: theme.primary },
          ]}
        >
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id.toString()}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleSelect(item)}
              >
                <ThemedText style={styles.suggestionName}>
                  {item.name}
                </ThemedText>
                {item.staerke && (
                  <ThemedText style={styles.suggestionDetail}>
                    {item.staerke}{" "}
                    {item.darreichungsform ? `· ${item.darreichungsform}` : ""}
                  </ThemedText>
                )}
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => (
              <View
                style={[
                  styles.separator,
                  { borderColor: theme.primary + "30" },
                ]}
              />
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    zIndex: 999,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "500",
  },
  required: {
    color: "red",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  dropdown: {
    position: "absolute",
    top: 75,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 8,
    maxHeight: 200,
    zIndex: 999,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  suggestionItem: {
    padding: 12,
  },
  suggestionName: {
    fontSize: 15,
    fontWeight: "500",
  },
  suggestionDetail: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
  },
  separator: {
    borderBottomWidth: 1,
  },
});
