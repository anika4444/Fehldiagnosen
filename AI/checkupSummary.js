import { Router } from "express";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { createModel } from "./modelFactory.js";

const router = Router();
const model = createModel();

// Der System-Prompt zwingt die KI jetzt zu extrem sauberen Abständen und verzichtet auf Tabellen
const SYSTEM_PROMPT = `Du bist ein professioneller medizinischer KI-Assistent. Deine Aufgabe ist es, Gesundheitsdaten in eine extrem gut lesbare, luftige Zusammenfassung zu übersetzen.

STRIKTE MARKDOWN-REGELN FÜR DAS FRONTEND:
1. ZWEI LEERZEILEN: Du musst vor und nach JEDER Überschrift und JEDEM Absatz zwingend zwei Leerzeilen (Paragraph-Breaks) einfügen. Der Text darf niemals aneinanderkleben.
2. KEINE TABELLEN: Verwende absolut keine Markdown-Tabellen.
3. FETTDRUCK STATT TABELLEN: Nutze stattdessen Listen, bei denen die Schlüsselwörter fettgedruckt sind (z.B. "- **Diagnose:** Übergewicht | **Status:** chronisch").
4. ÜBERSCHRIFTEN: Nutze ### für deine Hauptüberschriften.
5. Keine Emojis oder Smileys.
6. Du stellst keine Diagnosen, sondern fasst nur zusammen.`;

router.post("/ai/checkup-summary", async (req, res) => {
  try {
    const {
      from,
      to,
      langLevel,
      kiPrompt,
      diagnoses = [],
      medications = [],
      symptoms = [],
    } = req.body;

    const fromDate = (from ?? "").slice(0, 10);
    const toDate = (to ?? "").slice(0, 10);

    const diagnosesData = diagnoses.length === 0
      ? "Keine Diagnosen im angegebenen Zeitraum."
      : diagnoses.map(d => `- Diagnose: ${d.diagnosis} | ICD10: ${d.icd10Code ?? "-"} | Status: ${d.status ?? "-"} | Notiz: ${d.comment ?? "-"}`).join("\n");

    const medicationsData = medications.length === 0
      ? "Keine Medikamente im angegebenen Zeitraum."
      : medications.map(m => `- Medikament: ${m.name} | Dosis: ${m.dosage ?? "-"} | Frequenz: ${m.intakeFrequency ?? "-"} | Indikation: ${m.indication ?? "-"}`).join("\n");

    const symptomsData = symptoms.length === 0
      ? "Keine Symptome dokumentiert."
      : symptoms.map(s => `- Symptom: ${s.symptomName} | Intensität: ${s.intensity ?? "-"}/10 | Dauer: ${s.duration ?? "-"} | Mögl. Auslöser: ${s.possibleTrigger ?? "-"}`).join("\n");

    const styleInstruction = kiPrompt
      ? `\nZusätzliche Anweisung zur Tonalität (Niveau: ${langLevel ?? "Standard"}): ${kiPrompt}`
      : `\nPasse die Wortwahl an ein leicht verständliches Niveau (Niveau: ${langLevel ?? "Standard"}) an.`;

    // Der User-Prompt erzwingt nun das spezifische "Key: Value" Format
    const userPrompt = `Erstelle eine strukturierte Zusammenfassung des Checkups für den Zeitraum **${fromDate} bis ${toDate}**.

Hier sind die Rohdaten des Patienten:
DIAGNOSEN:
${diagnosesData}

MEDIKAMENTE:
${medicationsData}

SYMPTOME:
${symptomsData}
${styleInstruction}

Gliedere deine Antwort EXAKT in die folgenden vier Abschnitte. Denke an die DOPPELTEN LEERZEILEN zwischen allen Elementen!

### 1. Überblick der Diagnosen
(Liste die Diagnosen im folgenden Format auf: "- **Diagnose:** [Name] | **Status:** [Status] | **ICD-10:** [Code]". Falls keine vorliegen, schreibe das in einem Satz.)

### 2. Medikamentenübersicht und Hinweise
(Liste die Medikamente im Format auf: "- **Medikament:** [Name] | **Dosis:** [Dosis] | **Nebenwirkungen:** [Mögliche Nebenwirkungen ergänzen]". Falls keine vorliegen, schreibe das in einem Satz.)

### 3. Medizinische Zusammenhänge
(Analysiere mögliche Verbindungen zwischen den Diagnosen, Medikamenten und den berichteten Symptomen in einer einfachen Bulletpoint-Liste.)

### 4. Wichtig für das nächste Arztgespräch
(Liste konkrete Punkte oder Risiken für den nächsten Arzttermin in einer einfachen Bulletpoint-Liste auf.)

---
**Hinweis:** Diese Zusammenfassung dient rein der Information und ersetzt keine professionelle ärztliche Diagnose oder Beratung.`;

    const aiMessage = await model.invoke([
      new SystemMessage(SYSTEM_PROMPT),
      new HumanMessage(userPrompt),
    ]);

    const summary = (aiMessage.content ?? "").toString().trim();

    res.json({ summary });
  } catch (error) {
    console.error("Checkup AI Error:", error.message);
    res.status(500).json({ error: "KI-Service aktuell nicht erreichbar. Bitte versuche es später erneut." });
  }
});

export default router;