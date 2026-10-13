import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildCheckupUserPrompt } from "../checkupPrompt.js";

describe("buildCheckupUserPrompt", () => {
  it("kürzt die Datumswerte auf YYYY-MM-DD", () => {
    const prompt = buildCheckupUserPrompt({
      from: "2026-01-01T00:00:00",
      to: "2026-03-31T23:59:59",
    });

    assert.match(prompt, /für den Zeitraum \*\*2026-01-01 bis 2026-03-31\*\*/);
  });

  it("schreibt Hinweise statt leerer Listen", () => {
    const prompt = buildCheckupUserPrompt({ from: "2026-01-01", to: "2026-01-31" });

    assert.ok(prompt.includes("Keine Diagnosen im angegebenen Zeitraum."));
    assert.ok(prompt.includes("Keine Medikamente im angegebenen Zeitraum."));
    assert.ok(prompt.includes("Keine Symptome dokumentiert."));
  });

  it("funktioniert auch ganz ohne Daten", () => {
    const prompt = buildCheckupUserPrompt();

    assert.ok(prompt.includes("für den Zeitraum ** bis **"));
    assert.ok(prompt.includes("Keine Diagnosen im angegebenen Zeitraum."));
  });

  it("listet Diagnosen, Medikamente und Symptome mit Platzhaltern für fehlende Felder", () => {
    const prompt = buildCheckupUserPrompt({
      diagnoses: [
        { diagnosis: "Diabetes Typ 2", icd10Code: "E11.9", status: "Chronical", comment: "gut eingestellt" },
        { diagnosis: "Migräne" },
      ],
      medications: [{ name: "Metformin", dosage: "500 mg", intakeFrequency: "2x täglich", indication: "Diabetes" }],
      symptoms: [{ symptomName: "Kopfschmerzen", intensity: 6, duration: "2h" }],
    });

    assert.ok(prompt.includes("- Diagnose: Diabetes Typ 2 | ICD10: E11.9 | Status: Chronical | Notiz: gut eingestellt"));
    assert.ok(prompt.includes("- Diagnose: Migräne | ICD10: - | Status: - | Notiz: -"));
    assert.ok(prompt.includes("- Medikament: Metformin | Dosis: 500 mg | Frequenz: 2x täglich | Indikation: Diabetes"));
    assert.ok(prompt.includes("- Symptom: Kopfschmerzen | Intensität: 6/10 | Dauer: 2h | Mögl. Auslöser: -"));
    assert.ok(!prompt.includes("Keine Diagnosen"));
  });

  it("übernimmt den KI-Prompt des Kommunikationslevels", () => {
    const prompt = buildCheckupUserPrompt({ langLevel: "L3", kiPrompt: "Nutze Klinik-Jargon." });

    assert.ok(prompt.includes("Zusätzliche Anweisung zur Tonalität (Niveau: L3): Nutze Klinik-Jargon."));
    assert.ok(!prompt.includes("Passe die Wortwahl"));
  });

  it("nutzt ohne KI-Prompt eine verständliche Standard-Anweisung", () => {
    const withLevel = buildCheckupUserPrompt({ langLevel: "L1" });
    const withoutLevel = buildCheckupUserPrompt({});

    assert.ok(withLevel.includes("leicht verständliches Niveau (Niveau: L1)"));
    assert.ok(withoutLevel.includes("leicht verständliches Niveau (Niveau: Standard)"));
  });

  it("enthält alle vier Abschnitte und den Hinweis", () => {
    const prompt = buildCheckupUserPrompt({});

    for (const heading of [
      "### 1. Überblick der Diagnosen",
      "### 2. Medikamentenübersicht und Hinweise",
      "### 3. Medizinische Zusammenhänge",
      "### 4. Wichtig für das nächste Arztgespräch",
    ]) {
      assert.ok(prompt.includes(heading), `Abschnitt fehlt: ${heading}`);
    }
    assert.ok(prompt.includes("ersetzt keine professionelle ärztliche Diagnose"));
  });
});
