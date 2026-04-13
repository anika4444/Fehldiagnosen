import { useEffect, useState } from "react";

export function useFormValidation<T extends Record<string, any>>(
  initialData: any | null,
  defaultValues: T,
  validate: (values: T) => Record<string, string>,
) {
  const [values, setValues] = useState<T>(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setValues({ ...defaultValues, ...initialData });
    } else {
      setValues(defaultValues);
    }
    setErrors({});
  }, [initialData]);

  const handleChange = (key: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key as string]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key as string];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (onSave: (data: T) => Promise<void>) => {
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      await onSave(values);
    }
  };

  return { values, errors, handleChange, handleSubmit };
}
