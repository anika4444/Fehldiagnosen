import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

export const useDatePicker = (
  initialDateString?: string | null,
  onDateChange?: (formattedDate: string) => void,
) => {
  const parseInitialDate = (): Date => {
    if (!initialDateString) return new Date();
    const parsed = new Date(initialDateString);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  };
  const [date, setDate] = useState(parseInitialDate());
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (initialDateString) {
      const parsed = new Date(initialDateString);
      if (!isNaN(parsed.getTime())) {
        setDate(parsed);
      }
    }
  }, [initialDateString]);

  const toBackendFormat = (d: Date): string => {
    return d.toISOString().split("T")[0];
  };

  const formatDisplayDate = (d: Date): string => {
    return d.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShow(false);
    }

    if (selectedDate) {
      setDate(selectedDate);
      if (onDateChange) {
        onDateChange(toBackendFormat(selectedDate));
      }
    }
  };

  const toggleDatePicker = () => setShow(!show);

  return {
    date,
    show,
    setShow,
    onChange,
    toggleDatePicker,
    formattedDate: formatDisplayDate(date),
  };
};
