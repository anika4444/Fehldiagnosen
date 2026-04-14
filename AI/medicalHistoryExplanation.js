import express from "express";
import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

dotenv.config();

const app = express();
app.use(express.json());

const model = new ChatOpenAI({
  model: process.env.AI_MODEL_NAME,
  apiKey: process.env.AI_API_KEY,
  temperature: 0.3,
  configuration: {
    baseURL: process.env.AI_BASE_URL,
  },
  defaultHeaders: {
    "HTTP-Referer": process.env.AI_SCRIPT_URL,
    "X-Title": "adam-med-app-prototype",
  },
});

// Sprachniveau: 

const medicalPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `Du bist ein präziser medizinischer KI-Assistent. Deine Aufgabe ist es, einen Eintrag aus der Historie des Nutzers in einem kurzen, harmonischen Fließtext zu erklären.
 
SPRACHNIVEAU:
- basic: Nutze einfachste Alltagssprache ohne Fachwörter. Erkläre die Krankheit so, dass jeder sie sofort versteht.
- medium: Nutze eine Mischung aus Alltagssprache und medizinischen Grundbegriffen.
- advanced: Nutze kompakten Klinik-Jargon und medizinische Fakten.
 
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
- Erwähne nicht, dass dies eine KI-generierte Erklärung ist und es keinen Ersatz für ein persönliches Arztgespräch darstellt.`
  ],
  [
    "human",
    `Erkläre mir bitte diesen Eintrag: Diagnose {diagnosis}, ICD-Code {icd10Code}, Jahr {year}, Status {status}, Quelle {entryBy}, Anmerkung {comment}. Sprachniveau {langLevel}.`
  ]
]);

app.post("/ai/explain", async (req, res) => {
  try {
    const {
      diagnosis,
      icd10Code,
      year,
      status,
      entryBy,
      comment,
      langLevel
    } = req.body;

    if (!diagnosis) {
      return res.status(400).json({ error: "Fehlende Diagnose" });
    }

    const parser = new StringOutputParser();
    const chain = medicalPrompt.pipe(model).pipe(parser);

    const response = await chain.invoke({
      diagnosis,
      icd10Code,
      year: year || "unbekannt",
      status: status || "bestehend",
      entryBy: entryBy || "deiner Angabe",
      comment: comment || "",
      langLevel: langLevel || "standard"
    });

    const cleanResponse = response.replace(/\n+/g, ' ').trim() + ' KI-generierte Erklärung - kein Ersatz für ein persönliches Arztgespräch.';

    res.json({ text: cleanResponse });

  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ error: "KI-Service aktuell nicht erreichbar" });
  }
});

app.listen(3000, () => {
  console.log("✅ Med-AI-Service läuft auf Port 3000");
});
