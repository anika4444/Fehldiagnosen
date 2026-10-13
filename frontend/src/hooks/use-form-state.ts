import { useState } from "react";

export const useFormState = <T>() => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);

  const openForm = (item?: T) => {
    setEditingItem(item || null);
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setEditingItem(null);
    setIsFormVisible(false);
  };

  return { isFormVisible, editingItem, openForm, closeForm };
};
