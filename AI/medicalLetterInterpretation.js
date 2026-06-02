import express from "express";
import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";

dotenv.config();

const app = express();
app.use(express.json());

const model = new ChatOpenAI({
    model: process.env.AI_MODEL_NAME_DIAGNOSIS,
    apiKey: process.env.AI_API_KEY,
    temperature: 0.1,
    configuration: {
        baseURL: process.env.AI_BASE_URL,
    },
    defaultHeaders: {
        "HTTP-Referer": process.env.AI_SCRIPT_URL,
        "X-Title": "adam-med-app-prototype",
    },
});

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
    title: z.string()
        .default("Unbekannte Diagnose")
        .transform((val) => val.slice(0, 200)),
    description: z.string()
        .default("")
        .transform((val) => val.slice(0, 1000)),
    icdCode: z.string()
        .default("")
        .transform((val) => val.slice(0, 20)),
    severity: z.string()
        .default("")
        .transform((val) => val.slice(0, 50)),
    sideLocalization: z.string()
        .default("")
        .transform((val) => val.slice(0, 50)),
    status: z.string()
        .default("")
        .transform((val) => {
            const trimmed = val.trim().slice(0, 50);
            return VALID_STATUSES.includes(trimmed) ? trimmed : "";
        }),
    medicationText: z.string()
        .default("")
        .transform((val) => val.slice(0, 500)),
    symptoms: z.string()
        .default("")
        .transform((val) => val.slice(0, 1000)),
    findings: z.string()
        .default("")
        .transform((val) => val.slice(0, 1000)),
    therapeuticMeasures: z.string()
        .default("")
        .transform((val) => val.slice(0, 1000)),
    note: z.string()
        .default("")
        .transform((val) => val.slice(0, 500)),
    diagnosisDate: z.string()
        .default(() => new Date().toISOString())
        .transform((val) => parseDate(val)),
});

const modelWithFields = model.withStructuredOutput(DiagnosisFields);

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
- status: Aktueller Status der Erkrankung. Verwende: 0 ("Chronical"), 1 ("Active") oder 2 ("InRemission"). Max. 50 Zeichen.
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

const chain = parsePrompt.pipe(modelWithFields);

app.post("/ai/interpret-medical-letter", async (req, res) => {
    try {
        const letterText = req.body?.letterText;

        if (!letterText || !String(letterText).trim()) {
            return res.status(400).json({ error: "Kein Arztbrief-Text übergeben." });
        }

        const extracted = await chain.invoke({ letterText });

        return res.json({ extracted });
    } catch (error) {
        console.error("AI Parse Error:", error?.message || error);
        return res.status(500).json({ error: "KI-Service aktuell nicht erreichbar." });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ Med-AI-Parse-Service läuft auf Port ${PORT}`);
});