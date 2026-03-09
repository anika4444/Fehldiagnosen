import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform } from "react-native";

export const useDatePicker = (initialDate: Date = new Date()) => {
  const [date, setDate] = useState(initialDate);
  const [show, setShow] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShow(false);
    }

    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const toggleDatePicker = () => setShow(!show);

  return {
    date,
    show,
    setShow,
    onChange,
    toggleDatePicker,
    formattedDate: date.toLocaleDateString("de-DE", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    }),
  };
};
