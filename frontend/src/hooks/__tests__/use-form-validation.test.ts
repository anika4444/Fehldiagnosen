import { act, renderHook } from "@testing-library/react-native";

import { useFormValidation } from "@/hooks/use-form-validation";

type FormValues = {
  name: string;
  dosage: string;
};

const defaultValues: FormValues = { name: "", dosage: "" };

const validate = (values: FormValues) => {
  const errors: Record<string, string> = {};
  if (!values.name) errors.name = "Name ist erforderlich";
  if (!values.dosage) errors.dosage = "Dosis ist erforderlich";
  return errors;
};

const setup = (initialData: Partial<FormValues> | null = null) =>
  renderHook(
    ({ data }: { data: Partial<FormValues> | null }) =>
      useFormValidation<FormValues>(data, defaultValues, validate),
    { initialProps: { data: initialData } },
  );

describe("useFormValidation", () => {
  it("startet mit den Standardwerten und ohne Fehler", async () => {
    const { result } = await setup();

    expect(result.current.values).toEqual(defaultValues);
    expect(result.current.errors).toEqual({});
  });

  it("führt initialData mit den Standardwerten zusammen", async () => {
    const { result } = await setup({ name: "Ibuprofen" });

    expect(result.current.values).toEqual({ name: "Ibuprofen", dosage: "" });
  });

  it("aktualisiert Werte über handleChange", async () => {
    const { result } = await setup();

    await act(async () => {
      result.current.handleChange("name", "Metformin");
    });

    expect(result.current.values.name).toBe("Metformin");
  });

  it("ruft onSave bei Fehlern nicht auf und zeigt die Fehler an", async () => {
    const { result } = await setup();
    const onSave = jest.fn().mockResolvedValue(undefined);

    await act(async () => {
      await result.current.handleSubmit(onSave);
    });

    expect(onSave).not.toHaveBeenCalled();
    expect(result.current.errors).toEqual({
      name: "Name ist erforderlich",
      dosage: "Dosis ist erforderlich",
    });
  });

  it("entfernt den Fehler eines Feldes, sobald es geändert wird", async () => {
    const { result } = await setup();

    await act(async () => {
      await result.current.handleSubmit(jest.fn());
    });
    await act(async () => {
      result.current.handleChange("name", "Metformin");
    });

    expect(result.current.errors).toEqual({ dosage: "Dosis ist erforderlich" });
  });

  it("ruft onSave mit den Werten auf, wenn alles gültig ist", async () => {
    const { result } = await setup({ name: "Ibuprofen", dosage: "400 mg" });
    const onSave = jest.fn().mockResolvedValue(undefined);

    await act(async () => {
      await result.current.handleSubmit(onSave);
    });

    expect(onSave).toHaveBeenCalledWith({ name: "Ibuprofen", dosage: "400 mg" });
    expect(result.current.errors).toEqual({});
  });

  it("setzt Werte und Fehler zurück, wenn sich initialData ändert", async () => {
    const { result, rerender } = await setup();

    await act(async () => {
      await result.current.handleSubmit(jest.fn());
    });
    expect(Object.keys(result.current.errors)).toHaveLength(2);

    await rerender({ data: { name: "Aspirin", dosage: "100 mg" } });

    expect(result.current.values).toEqual({ name: "Aspirin", dosage: "100 mg" });
    expect(result.current.errors).toEqual({});
  });
});
