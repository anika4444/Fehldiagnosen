import { renderHook } from "@testing-library/react-native";

import { useFormattedDate } from "@/hooks/use-formatted-date";

const format = async (value?: string | null) => {
  const { result } = await renderHook(() => useFormattedDate(value));
  return result.current;
};

describe("useFormattedDate", () => {
  it("formatiert ein ISO-Datum mit Uhrzeit ins deutsche Format", async () => {
    expect(await format("2024-03-05T14:30:00Z")).toBe("05.03.2024");
  });

  it("formatiert ein reines Datum", async () => {
    expect(await format("2026-12-31")).toBe("31.12.2026");
  });

  it.each([undefined, null, ""])("liefert einen leeren String für %p", async (value) => {
    expect(await format(value)).toBe("");
  });

  it("gibt unbekannte Formate unverändert zurück", async () => {
    expect(await format("05.03.2024")).toBe("05.03.2024");
    expect(await format("2024-03")).toBe("2024-03");
  });

  it("berechnet das Ergebnis neu, wenn sich das Datum ändert", async () => {
    const { result, rerender } = await renderHook(
      ({ date }: { date: string }) => useFormattedDate(date),
      { initialProps: { date: "2024-01-01" } },
    );
    expect(result.current).toBe("01.01.2024");

    await rerender({ date: "2025-06-15" });

    expect(result.current).toBe("15.06.2025");
  });
});
