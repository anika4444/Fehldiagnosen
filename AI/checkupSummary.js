import { Router } from "express";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";

import { createModel } from "./modelFactory.js";

const router = Router();

const model = createModel();

const SYSTEM_PROMPT =
  "Du bist ein medizinischer Assistent, der Patienten in verständlicher Sprache hilft, ihren Gesundheitsstatus zu verstehen. Du gibst keine Diagnosen, sondern erstellst nur informative Zusammenfassungen.";

router.post("/ai/checkup-summary", async (req, res) => {
  try {
    const {
      from,
      to,
      diagnoses = [],
      medications = [],
      symptoms = [],
    } = req.body;

    const fromDate = (from ?? "").slice(0, 10);
    const toDate = (to ?? "").slice(0, 10);

    const diagnosesText =
      diagnoses.length === 0
        ? "Keine Diagnosen im Zeitraum."
        : diagnoses
            .map(
              (d) =>
                `- ${d.diagnosis} (ICD10: ${d.icd10Code ?? "-"}, Jahr: ${d.year ?? "-"}, Status: ${d.status ?? "-"}, Kommentar: ${d.comment ?? "-"})`,
            )
            .join("\n");

    const medicationsText =
      medications.length === 0
        ? "Keine Medikamente im Zeitraum."
        : medications
            .map(
              (m) =>
                `- ${m.name} (Dosis: ${m.dosage ?? "-"}, Frequenz: ${m.intakeFrequency ?? "-"}, Start: ${(m.intakeStartDate ?? "").slice(0, 10) || "-"}, Ende: ${(m.endDate ?? "").slice(0, 10) || "-"}, Indikation: ${m.indication ?? "-"}, ATC: ${m.atcCode ?? "-"})`,
            )
            .join("\n");

    const symptomsText =
      symptoms.length === 0
        ? "Keine Symptome im Zeitraum."
        : symptoms
            .map(
              (s) =>
                `- ${s.symptomName} (Zeit: ${(s.occurrenceTime ?? "").slice(0, 16).replace("T", " ")}, Intensität: ${s.intensity ?? "-"}/10, Dauer: ${s.duration ?? "-"}, Auslöser: ${s.possibleTrigger ?? "-"}, Notiz: ${s.notes ?? "-"})`,
            )
            .join("\n");

    const userPrompt = `Erstelle eine kompakte Zusammenfassung des Patienten-Checkups für den Zeitraum ${fromDate} bis ${toDate}.
Daten:
Diagnosen im Zeitraum:
${diagnosesText}
Medikamente im Zeitraum:
${medicationsText}
Symptome im Zeitraum:
${symptomsText}
Erstelle eine strukturierte Zusammenfassung mit folgenden Punkten:
1. Überblick: Welche chronischen oder aktiven Diagnosen liegen vor, welche sind in Remission.
2. Medikamentenübersicht: Welche Medikamente werden eingenommen, mögliche Nebenwirkungen pro Medikament basierend auf deinem medizinischen Wissen.
3. Zusammenhänge: Mögliche Verbindungen zwischen Diagnosen, Medikamenten und aufgetretenen Symptomen. Können Symptome Nebenwirkungen der Medikamente sein.
4. Auffälligkeiten: Was sollte der Patient mit dem Arzt besprechen.
Antworte auf Deutsch in fließendem Text. Maximal 250 Wörter. Weise am Ende kurz darauf hin, dass dies keine ärztliche Beratung ersetzt.`;

    const aiMessage = await model.invoke([
      new SystemMessage(SYSTEM_PROMPT),
      new HumanMessage(userPrompt),
    ]);

    const summary = (aiMessage.content ?? "").toString().trim();

    res.json({ summary });
  } catch (error) {
    console.error("Checkup AI Error:", error.message);
    res.status(500).json({ error: "KI-Service aktuell nicht erreichbar" });
  }
});

export default router;