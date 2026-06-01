import express from "express";
import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";

dotenv.config();

const app = express();
app.use(express.json());

const explainModel = new ChatOpenAI({
    model: process.env.AI_MODEL_NAME,
    apiKey: process.env.AI_API_KEY,
    temperature: 0.3,
    configuration: { baseURL: process.env.AI_BASE_URL },
    defaultHeaders: {
        "HTTP-Referer": process.env.AI_SCRIPT_URL,
        "X-Title": "adam-med-app-prototype",
    },
});

const diagnosisModel = new ChatOpenAI({
    model: process.env.AI_MODEL_NAME_DIAGNOSIS, // mistral-small-24b; Kompatibilität mit JSON und zod (strenger Parser für sorgfältige Strukturierung der Felder)
    apiKey: process.env.AI_API_KEY,
    temperature: 0.1,
    configuration: { baseURL: process.env.AI_BASE_URL },
    defaultHeaders: {
        "HTTP-Referer": process.env.AI_SCRIPT_URL,
        "X-Title": "adam-med-app-prototype",
    },
});

// SERVICE 1: DIAGNOSE ÜBERSETZUNG (/ai/explain)
// Erklärt eine bestehende Diagnose als Fließtext.

const medicalPrompt = ChatPromptTemplate.fromMessages([
    [
        "system",
        `Du bist ein präziser medizinischer KI-Assistent. Deine Aufgabe ist es, einen Eintrag aus der Historie des Nutzers in einem kurzen, harmonischen Fließtext zu erklären.

SPRACHNIVEAU:
{kiPrompt}

INHALT:
- Verknüpfe Diagnose, Jahr, Status, Quelle und Anmerkung zu einer Einheit.
- Gehe direkt auf die Quelle ein: Erwähne bei Patienten-Einträgen, dass es eine Eigenauskunft ist, bei Ärzten, dass es eine gesicherte Diagnose ist.
- Integriere den Status und die Anmerkung sinnvoll in den zeitlichen Ablauf seit dem Diagnosejahr.

REGELN:
- Keine Listen, keine Aufzählungspunkte, keine harten Zeilenumbrüche.
- Erfinde keine Symptome oder Medikamente.
- Keine medizinische Beratung oder Therapieempfehlungen.
- Sprich den Nutzer mit du an.
- Halte die Erklärung kurz und direkt.
- Erwähne nicht, dass dies eine KI-generierte Erklärung ist und es keinen Ersatz für ein persönliches Arztgespräch darstellt.`,
    ],
    [
        "human",
        `Erkläre mir bitte diesen Eintrag: Diagnose {diagnosis}, ICD-Code {icd10Code}, Jahr {year}, Status {status}, Quelle {entryBy}, Anmerkung {comment}. Sprachniveau {langLevel}.`,
    ],
]);

app.post("/ai/explain", async (req, res) => {
    try {
        const { diagnosis, icd10Code, year, status, entryBy, comment, langLevel, kiPrompt } = req.body;

        if (!diagnosis) {
            return res.status(400).json({ error: "Fehlende Diagnose" });
        }

        const parser = new StringOutputParser();
        const chain = medicalPrompt.pipe(explainModel).pipe(parser);

        const response = await chain.invoke({
            diagnosis,
            icd10Code,
            year: year || "unbekannt",
            status: status || "bestehend",
            entryBy: entryBy || "deiner Angabe",
            comment: comment || "",
            langLevel: langLevel || "L1",
            kiPrompt: kiPrompt || "Verwende eine einfache Sprache.",
        });

        const cleanResponse = response.replace(/\n+/g, " ").trim()
            + " KI-generierte Erklärung - kein Ersatz für ein persönliches Arztgespräch.";

        res.json({ text: cleanResponse });

    } catch (error) {
        console.error("AI Error:", error.message);
        res.status(500).json({ error: "KI-Service aktuell nicht erreichbar" });
    }
});

// SERVICE 2: ARZTBRIEF INTERPRETATION (/ai/interpret-medical-letter)
// Analysiert einen Arztbrief und extrahiert strukturierte Felder für eine neue Diagnose

const VALID_STATUSES = ["Active", "InRemission", "Chronic"];

function parseDate(raw) {
    if (!raw) return new Date().toISOString();
    const d = new Date(raw);
    if (!isNaN(d.getTime())) return d.toISOString();
    const match = String(raw).match(/(\d{4}-\d{2}-\d{2})/);
    if (match) return new Date(match[1]).toISOString();
    const yearMatch = String(raw).match(/(\d{4})/);
    if (yearMatch) return new Date(`${yearMatch[1]}-01-01`).toISOString();
    return new Date().toISOString();
}

const DiagnosisFields = z.object({
    title: z.string().default("Unbekannte Diagnose").transform((val) => val.slice(0, 200)),
    description: z.string().default("").transform((val) => val.slice(0, 1000)),
    icdCode: z.string().default("").transform((val) => val.slice(0, 20)),
    severity: z.string().default("").transform((val) => val.slice(0, 50)),
    sideLocalization: z.string().default("").transform((val) => val.slice(0, 50)),
    status: z.string().default("").transform((val) => {
        const trimmed = val.trim().slice(0, 50);
        return VALID_STATUSES.includes(trimmed) ? trimmed : "";
    }),
    medicationText: z.string().default("").transform((val) => val.slice(0, 500)),
    symptoms: z.string().default("").transform((val) => val.slice(0, 1000)),
    findings: z.string().default("").transform((val) => val.slice(0, 1000)),
    therapeuticMeasures: z.string().default("").transform((val) => val.slice(0, 1000)),
    note: z.string().default("").transform((val) => val.slice(0, 500)),
    diagnosisDate: z.string().default(() => new Date().toISOString()).transform((val) => parseDate(val)),
});

const diagnosisModelWithFields = diagnosisModel.withStructuredOutput(DiagnosisFields);

const parsePrompt = ChatPromptTemplate.fromMessages([
    [
        "system",
        `Du bist ein medizinischer Dokumentationsassistent.
Deine Aufgabe ist es, einen deutschen Arztbrief zu analysieren und die relevanten Informationen strukturiert zu extrahieren.

Felder und ihre Bedeutung:
- title: Kurzer, prägnanter Name der Hauptdiagnose (z.B. "Essentielle Hypertonie"). Max. 200 Zeichen.
- description: Ausführliche Beschreibung der Diagnose, Krankheitsverlauf und medizinischer Kontext. Max. 1000 Zeichen.
- icdCode: ICD-10-Code der Diagnose (z.B. "I10", "E11.9"). Nur den Code, keine Beschreibung. Max. 20 Zeichen.
- severity: Schweregrad der Erkrankung auf deutsch (z.B. mild, moderat, chronisch, schwerwiegend). Max. 50 Zeichen.
- sideLocalization: Körperseite falls relevant (z.B. "links", "rechts", "bilateral"). Leer lassen wenn nicht zutreffend. Max. 50 Zeichen.
- status: Aktueller Status der Erkrankung. Verwende exakt einen dieser Werte: "Active", "InRemission" oder "Chronic".
- medicationText: Alle genannten Medikamente mit Dosierung (z.B. "Ramipril 5mg täglich"). Max. 500 Zeichen.
- symptoms: Genannte Symptome und Beschwerden des Patienten. Max. 1000 Zeichen.
- findings: Medizinische Befunde, Messwerte und Untersuchungsergebnisse (z.B. "HbA1c 8%, RR 160/90 mmHg"). Max. 1000 Zeichen.
- therapeuticMeasures: Empfohlene oder durchgeführte Therapiemaßnahmen außer Medikamente (z.B. "Blutdruckkontrolle alle 3 Monate, Ernährungsberatung"). Max. 1000 Zeichen.
- note: Sonstige relevante Hinweise oder Besonderheiten die nicht in andere Felder passen. Max. 500 Zeichen.
- diagnosisDate: Datum der Erstdiagnose im ISO-8601 Format (z.B. "2018-01-01"). Wenn nur ein Jahr genannt ist, nimm den 1. Januar dieses Jahres.

Regeln:
- Erfinde keine Informationen, die nicht im Brief stehen.
- Lasse Felder leer ("") wenn keine relevante Information vorhanden ist.
- Ignoriere Platzhalter in [] - das sind sensible Daten die nicht angezeigt werden.
- Alle Strings müssen UTF-8-konform sein.`,
    ],
    [
        "human",
        "Analysiere folgenden Arztbrief und extrahiere die Felder:\n\n{letterText}",
    ],
]);

const diagnosisChain = parsePrompt.pipe(diagnosisModelWithFields);

app.post("/ai/interpret-medical-letter", async (req, res) => {
    try {
        const letterText = req.body?.letterText;

        if (!letterText || !String(letterText).trim()) {
            return res.status(400).json({ error: "Kein Arztbrief-Text übergeben." });
        }

        const extracted = await diagnosisChain.invoke({ letterText });
        return res.json({ extracted });

    } catch (error) {
        console.error("AI Parse Error:", error?.message || error);
        return res.status(500).json({ error: "KI-Service aktuell nicht erreichbar." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Med-AI-Service läuft auf Port ${PORT}`);
    console.log(`   → POST /ai/explain`);
    console.log(`   → POST /ai/interpret-medical-letter`);
});